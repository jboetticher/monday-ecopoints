# Monday EcoPoints
Infuse carbon conciousness into your workplace by pledging to remove carbon with every task.  
EcoPoints makes it easy for teams on Monday.com to take steps towards becoming carbon neutral by 
seamlessly connecting them to the carbon credits market.

## Project Setup
Project still in development.

### Board
Contains the board view for EcoPoints. Deploy on monday.com to set up.  
To use ngrok, first run `npm run start` and then in a separate console run `npm run expose`.

### Server
Contains the backend server for EcoPoints (user data, carbon credits processing, payment processing).  
Uses firebase for database & endpoints.  

#### secrets.ts
Server requires a `secrets.ts` within the src folder, which hasn't been uploaded for security. It 
exports the following strings:  
- privateKey: an ethereum wallet's private key (should be funded with testnet/production MATIC).
- rpcProvider: an rpc provider for testnet/production MATIC.
- stripeKey: the API key for Stripe, a credit card processor.
- stripeWebhook: the webhook secret from Stripe.

Here is an example of how it is set up to distinguish between development and production:
```javascript
const isProduction = process.env.NODE_ENV === "production";

const privateKey = isProduction ? "PROD PRIVATE KEY" : "TEST PRIVATE KEY";
const rpcProvider = isProduction ? "PROD RPC" : "TEST RPC";
const stripeKey = isProduction ? "PROD STRIPE KEY" : "TEST STRIPE KEY";
const stripeWebhook = "STRIPE WEB HOOK SECRET";

export {
    privateKey,
    rpcProvider,
    stripeKey,
    stripeWebhook
};
```

### Widget
Contains the widget view for EcoPoints. Deploy on monday.com to set up.  
To use ngrok, first run `npm run start` and then in a separate console run `npm run expose`.