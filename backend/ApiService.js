require('dotenv').config();
const { LinearClient  } = require('bybit-api');
const { appendLog } = require('./TradeLogService');

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

setupApi = (app) => {
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
        const symbol = req.body.symbol;
        const leverage = req.body.leverage;
        // switch to isolated and set leverage
        console.log("setting isolated margin and set leverate to "+leverage);
        await client.setMarginSwitch({symbol: symbol, is_isolated: true, buy_leverage: leverage, sell_leverage:leverage});
        console.log("placeActiveOrder req",req.body);
        const result = await client.placeActiveOrder(req.body);
        console.log("placeActiveOrder resp",result);
        appendLog(result);
        res.json(result);
    })

    app.post('/api/bybit-place-conditional-order', async(req, res) => {
        console.log("placeConditionalOrder req",req.body);
        const result = await client.placeConditionalOrder(req.body);
        console.log("placeConditionalOrder resp",result);
        appendLog(result);
        res.json(result);
    })


    app.get('/api/bybit-get-leverage-info', async(req, res) => {
        
    })

    app.post('/api/bybit-change-leverage', async(req, res) => {
        const symbol = req.body.symbol;
        const leverage = req.body.leverage;
        // switch to isolated and set leverage
        console.log("setting isolated margin and set leverate to "+leverage);
        await client.setMarginSwitch({symbol: symbol, is_isolated: true, buy_leverage: leverage, sell_leverage:leverage});
    })

}
// all error codes:
// https://bybit-exchange.github.io/docs/linear/#t-errors


exports.setupApi=setupApi;