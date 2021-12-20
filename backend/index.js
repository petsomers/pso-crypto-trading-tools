const process = require('process');
require('dotenv').config();
const { LinearClient  } = require('bybit-api');

const express = require('express')
const app = express();
const port = process.env.SERVER_PORT;
const apiKey = process.env.BYBIT_API_KEY;
const apiSecret = process.env.BYBIT_API_SECRET;

const client = new LinearClient (
    apiKey,
    apiSecret,
    // optional, uses testnet by default. Set to 'true' to use livenet.
    false, //useLivenet
    // restClientOptions,
    // requestLibraryOptions
);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/bybit-test', async(req, res) => {
    const apiKeyInfo = await client.getApiKeyInfo();
    res.json(apiKeyInfo);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


const callBybitTestNet = async (apiKey, apiSecret) => {
    /*
    const restClientOptions = {
        // override the max size of the request window (in ms)
        recv_window?: number;
        
        // how often to sync time drift with bybit servers
        sync_interval_ms?: number | string;
        
        // Default: false. Disable above sync mechanism if true.
        disable_time_sync?: boolean;
        
        // Default: false. If true, we'll throw errors if any params are undefined
        strict_param_validation?: boolean;
        
        // Optionally override API protocol + domain
        // e.g 'https://api.bytick.com'
        baseUrl?: string;
        
        // Default: true. whether to try and post-process request exceptions.
        parse_exceptions?: boolean;
    };¨
    */

    
    
    try {
        const apiKeyInfo = await client.getApiKeyInfo();
        console.log("apiKey result: ", apiKeyInfo);
        const orderBook = await client.getOrderBook({ symbol: 'BTCUSDT' });
        console.log("getOrderBook inverse result: ", orderBook);
    } catch (e) {
        console.log("ERROR",e);
    }
}