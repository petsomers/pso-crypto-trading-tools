const process = require('process');
require('dotenv').config();
const { performTradeLogSetup, appendLog } = require('./TradeLogService');
const { setupApi } = require('./ApiService');

const express = require('express')
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.static(__dirname +'/frontend_build'));
setupApi(app);
performTradeLogSetup();

app.listen(port, () => {
    console.log(`PSO Bybit Client listening at http://localhost:${port}`)
})
  
