const process = require('process');
require('dotenv').config();
const { LinearClient  } = require('bybit-api');

const express = require('express')
const app = express();
const port = process.env.SERVER_PORT;
const apiKey = process.env.BYBIT_API_KEY;
const apiSecret = process.env.BYBIT_API_SECRET;
app.use(express.json());
app.use(express.static('frontend_build'));
app.listen(port, () => {
    console.log(`PSO Bybit Client listening at http://localhost:${port}`)
})
  
  

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

app.get('/api/bybit-get-info-and-symbols', async(req, res) => {
    // https://bybit-exchange.github.io/docs/inverse/#t-publictradingrecords
    const symbols = await client.getSymbols();
    const apiKeyInfo = await client.getApiKeyInfo();
    return res.json({apiKeyInfo, symbols});
})



app.post('/api/bybit-place-order', async(req, res) => {
    // https://bybit-exchange.github.io/docs/linear/#t-placeactive
    // TODO -> SWITCH TO ISOLATED 
    // https://bybit-exchange.github.io/docs/inverse/#t-
    // -> call /v2/private/position/switch-isolated
    console.log("placeActiveOrder req",req.body);
    const result = await client.placeActiveOrder(req.body);
    console.log("placeActiveOrder resp",result);
    res.json(result);
})

app.post('/api/bybit-place-conditional-order', async(req, res) => {
    console.log("placeConditionalOrder req",req.body);
    const result = await client.placeConditionalOrder(req.body);
    console.log("placeConditionalOrder resp",result);
    res.json(result);
})


// all error codes:
// https://bybit-exchange.github.io/docs/linear/#t-errors

