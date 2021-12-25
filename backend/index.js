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

app.get('/api/bybit-get-symbols', async(req, res) => {
    // https://bybit-exchange.github.io/docs/inverse/#t-publictradingrecords
    const symbols = await client.getSymbols();
    return res.json(symbols);
})



app.post('/api/bybit-place-order', async(req, res) => {
    // https://bybit-exchange.github.io/docs/linear/#t-placeactive
    // TODO -> SWITCH TO ISOLATED 
    // https://bybit-exchange.github.io/docs/inverse/#t-
    client.setSwitchMode()
    // -> call /v2/private/position/switch-isolated
    console.log("placeActiveOrder req",req.body);
    const result = await client.placeActiveOrder(req.body);
    console.log("placeActiveOrder resp",result);
    res.json(result);
    //{ side: string; symbol: string; order_type: string; qty: number; price?: number; time_in_force: string; take_profit?: number; stop_loss?: number; tp_trigger_by?: string; sl_trigger_by?: string; reduce_only?: boolean; close_on_trigger?: boolean; order_link_id?: string; }
})

app.post('/api/bybit-place-conditional-order', async(req, res) => {
    // https://bybit-exchange.github.io/docs/linear/#t-placeactive
    // side: "Buy" or "Sell"
    // order_type: "Limit" or "Market"
    // time_in_force:"GoodTillCancel"
    //const result = await client.placeConditionalOrder(req.body);
    //res.json(result);
    //{ side: string; symbol: string; order_type: string; qty: number; price?: number; time_in_force: string; take_profit?: number; stop_loss?: number; tp_trigger_by?: string; sl_trigger_by?: string; reduce_only?: boolean; close_on_trigger?: boolean; order_link_id?: string; }
})


