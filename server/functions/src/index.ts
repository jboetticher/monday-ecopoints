import * as functions from "firebase-functions";
import {privateKey, rpcProvider, stripeKey, stripeWebhook} from "./secrets";
import {OffsetHelperABI} from "./abi";
import {ethers} from "ethers";
import * as fb from "firebase-admin";
import Stripe from "stripe";

const isProduction = process.env.NODE_ENV === "production";

// Ethers contract creation
const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
const signer = new ethers.Wallet(privateKey, provider);
const offsetHelperContract = new ethers.Contract(contract("OffsetHelper"), OffsetHelperABI, signer);

// Stripe payment initialization
const stripe = new Stripe(stripeKey, {apiVersion: "2020-08-27"});

// Facebook app initialization
fb.initializeApp();
const db = fb.firestore();

// Constants
const PURCHASES_COLLECTION = "purchases";
const CHECKOUT_COLLECTION = "checkout_session";
type CheckoutRecord = {
  customer?: string,
  ethTransaction?: string,
  completed?: boolean,
  board: number,
  tons: number,
  id: string
};

// Returns an address based on whether or not in production
function contract(symbol: "USDC" | "NCT" | "OffsetHelper", forceProduction = false): string {
  if (isProduction || forceProduction) {
    switch (symbol) {
      case "USDC": return "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
      case "NCT": return "0xD838290e877E0188a4A44700463419ED96c16107";
      case "OffsetHelper": return "0xFAFcCd01C395e4542BEed819De61f02f5562fAEa";
    }
  } else {
    switch (symbol) {
      case "USDC": return "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747";
      case "NCT": return "0x7beCBA11618Ca63Ead5605DE235f6dD3b25c530E";
      case "OffsetHelper": return "0xb5Ce6939E55BF02E1245553300a88E514694511F";
    }
  }
}

/*
  Returns the last carbon credit purchase for a board.
*/
export const lastPurchase = functions.https.onRequest(async (request, response) => {
  const board = Number.parseInt(request.body.board);

  console.log(typeof (board), board);
  if (typeof (board) !== "number" || isNaN(board)) {
    response.status(400).json({success: false, reason: "Board incorrect"});
    return;
  }

  const res = await db.collection(PURCHASES_COLLECTION).where("board", "==", board).orderBy("date", "desc").limit(1).get();
  response.status(200).json({success: true, ...(res.docs[0].data())});
});

/*
  Creates a Stripe checkout session for carbon credits.
*/
export const createCheckoutSession = functions.https.onRequest(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST");

  const tons = Number.parseInt(request.body.tons);
  const board = Number.parseInt(request.body.board);

  if (typeof (tons) !== "number" || isNaN(tons) || tons < 1 || tons > 10) {
    response.status(400).json({success: false, reason: "Incorrect amount of tons."});
    return;
  }

  const productId = (() => {
    if (!isProduction) {
      switch (tons) {
        case 1: return "price_1LHhB3CiQ3XpoH0BBMTF0M4I";
        case 2: return "price_1LHhBGCiQ3XpoH0BeOktl8zd";
      }
    }

    switch (tons) {
      case 1: return "price_1LHdlACiQ3XpoH0BHsC8B09p";
      case 2: return "price_1LHdnJCiQ3XpoH0BCM84zZHW";
      case 3: return "price_1LHdnaCiQ3XpoH0BGp1hLHTo";
      case 4: return "price_1LHdnvCiQ3XpoH0Bdolx5DH6";
      case 5: return "price_1LHdoBCiQ3XpoH0BLMagSUeS";
      case 6: return "price_1LHdoNCiQ3XpoH0BJosKzDk3";
      case 7: return "price_1LHdobCiQ3XpoH0BHWPFr9kz";
      case 8: return "price_1LHdowCiQ3XpoH0BlzwkOsVI";
      case 9: return "price_1LHdpECiQ3XpoH0BoA9GSBLG";
      case 10: return "price_1LHdpUCiQ3XpoH0B1wAnjGwV";
    }
    return "";
  })();
  console.log("PRODUCT ID", productId);

  console.log("STARTING SESSION CREATION");
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: productId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://ecopoints.projk.net/success",
    cancel_url: request.body.returnURL,
    automatic_tax: {enabled: true},
  });
  console.log("FINISHED SESSION CREATION");

  // Create session object in firebase
  const checkoutRecord : CheckoutRecord = {id: session.id, board, tons};
  if (session.customer != null) checkoutRecord.customer = session.customer?.toString();
  await db.collection(CHECKOUT_COLLECTION).doc(session.id).create(checkoutRecord);

  response.setHeader("Content-Type", "application/json");
  response.status(200).json({success: true, url: session.url});
});

/*
  Fulfills the stripe payment.
*/
export const stripeFulfillment = functions.runWith({
  timeoutSeconds: 300,
  memory: "1GB",
}).https.onRequest(async (request, response) => {
  const payload = request.rawBody;
  const sig = request.headers["stripe-signature"]?.toString();

  // Make sure that it's the proper webhook from Stripe
  let event: Stripe.Event;
  try {
    if (sig === undefined) throw new Error("Stripe signature is undefined.");
    event = stripe.webhooks.constructEvent(payload, sig, stripeWebhook);
  } catch (err: any) {
    console.log(err?.message);
    response.status(400).send(`Webhook Error: ${err?.message}`);
    return;
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const document = db.collection(CHECKOUT_COLLECTION).doc(session.id);
    const data = (await document.get()).data() as CheckoutRecord;

    // Redeem NCT for carbon CAPTURE credit & redeem the carbon capture credit.
    // We're using the offset helper contract so that we don't need 2 transactions.
    // The only maintenance this requires is insuring that there is enough USDC on
    // the production account.
    let hash: string;
    try {
      const ethResponse: ethers.Transaction = await offsetHelperContract.autoOffsetUsingToken(
          contract("USDC"),
          contract("NCT"),
          data.tons + "000000000000000000"
      );
      hash = ethResponse.hash ?? "ERROR";
    } catch (err) {
      hash = "ERROR";
      console.log(err);
    }

    // Update firebase
    await document.update({
      ethTransaction: hash,
      completed: true,
    });
    await db.collection(PURCHASES_COLLECTION).doc(session.id).create({
      board: data.board,
      date: Date.now(),
      tons: data.tons,
      ethTransaction: hash,
    });
  }

  response.status(200).send({success: true});
});

/*
  While this might be a better way of finding price per ton, for now it's best if we stick
  with a simple $5 per ton, since that's most simple for customers to understand + for us to
  implement.
*/
async function pricePerTon(): Promise<number | undefined> {
  // 1. Get NCT price
  console.log(contract("USDC", true), contract("NCT", true));
  const nctPrice = await offsetHelperContract.calculateNeededTokenAmount(
      contract("USDC", true),
      contract("NCT", true),
      "1000000000000000000"
  );
  const adjustedPrice = nctPrice / 1000000;

  // 2. Markup: market volitility (5%), credit card charge (3.5%), gas fees (1%), profit (7.5%)
  // 7.5% profit? Well hey, we gotta pay for servers. Plus other markets charge 15%.
  return 1.17 * adjustedPrice;
}

/*
  Returns the price of per ton of carbon.
*/
export const getCarbonCreditPrice = functions.https.onRequest(async (request, response) => {
  const price = await pricePerTon();

  if (price === undefined) response.status(400).json({success: false});
  else response.status(200).json({success: true, price});
});
