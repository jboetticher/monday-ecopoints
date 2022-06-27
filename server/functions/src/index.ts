import * as functions from "firebase-functions";
import {testPrivateKey, prodPrivateKey, rpcProvider} from "./secrets";
import {OffsetHelperABI} from "./abi";
import {ethers} from "ethers";

const isProduction = true;// process.env.NODE_ENV === "production";
const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
const signer = new ethers.Wallet(isProduction ? prodPrivateKey : testPrivateKey, provider);
const offsetHelperContract = new ethers.Contract(contract("OffsetHelper"), OffsetHelperABI, signer);

// Returns an address based on whether or not in production
function contract(symbol: "USDC" | "NCT" | "OffsetHelper", forceProduction = false) : string {
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
      case "OffsetHelper": return "0x30dC279166DCFB69F52C91d6A3380dCa75D0fCa7";
    }
  }
}

async function pricePerTon() : Promise<number | undefined> {
  // 1. Get NCT price
  console.log(contract("USDC", true), contract("NCT", true));
  const nctPrice = await offsetHelperContract.calculateNeededTokenAmount(
      contract("USDC", true),
      contract("NCT", true),
      "1000000000000000000"
  );
  const adjustedPrice = nctPrice / 1000000;

  // 2. Markup: market volitility (5%), credit card charge (3.5%), gas fees (1%), profit (7.5%)
  // 7.5% profit? Well hey, we gotta pay for servers. Plus other markets charge 15%, so...
  return 1.17 * adjustedPrice;
}

export const getCarbonCreditPrice = functions.https.onRequest(async (request, response) => {
  const price = await pricePerTon();

  if (price === undefined) response.status(400).json({success: false});
  else response.status(200).json({success: true, price});
});

export const burnTokens = functions.https.onRequest(async (request, response) => {
    const amount = parseInt(request.body.amount);
    if(isNaN(amount) || amount < 0 || amount > 10) {
        response.status(400).json({ success: false, reason: "Invalid amount." });
        return;
    }

    // Redeem NCT for carbon CAPTURE credit & redeem the carbon capture credit
    // We're using the offset helper contract so that we don't need 2 transactions
    const ethResponse = await offsetHelperContract.autoOffsetUsingToken(
        contract('USDC'), 
        contract('NCT'), 
        amount + "000000000000000000"
    );

    response.status(200).json({ success: true, ethResponse });
  });
