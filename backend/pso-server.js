const process = require('process');
require('dotenv').config();
const { performTradeLogSetup, appendLog } = require('./TradeLogService');
const { setupApi } = require('./ApiService');

const express = require('express')
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

setupApi(app);

app.use(express.static('frontend_build'));
app.listen(port, () => {
    performTradeLogSetup();
    console.log(`PSO Bybit Client listening at http://localhost:${port}`)
    appendLog({ret_code: '00', ret_msg: 'Server Started'});
})
  


