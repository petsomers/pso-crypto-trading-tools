const process = require('process');
require('dotenv').config();
const { performTradeLogSetup, appendLog } = require('./TradeLogService');
const { shutdownDb } = require ('./TradeLogDbService');
const { setupApi } = require('./ApiService');

const express = require('express')
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.static(__dirname + '/frontend_build'));
setupApi(app);
performTradeLogSetup();

const server = app.listen(port, () => {
    console.log(`PSO Bybit Client listening at http://localhost:${port}`)
})

 

function handleShutdownGracefully() {
    console.info("----------------------------");
    console.info("Closing server gracefully...");
    shutdownDb();
    server.close(() => {
      console.info("Server closed.");
      // close db connections here or
      // any other clean if required
      process.exit(0); // if required
    });
  }
  process.on("SIGINT", handleShutdownGracefully);
  process.on("SIGTERM", handleShutdownGracefully);
  process.on("SIGHUP", handleShutdownGracefully);