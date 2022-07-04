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
Server requires a `secrets.ts` within the src folder, which hasn't been uploaded for security. It 
exports the following strings:  
- testPrivateKey: a wallet's private key to use for testing.
- prodPrivateKey: a wallet's private key to use for production.
- rpcProvider: an rpc provider for a polygon mainnet node.
- stripeKey: the API key for Stripe, a credit card processor.

### Widget
Contains the widget view for EcoPoints. Deploy on monday.com to set up.  
To use ngrok, first run `npm run start` and then in a separate console run `npm run expose`.