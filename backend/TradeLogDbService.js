const sqlite3 = require('sqlite3').verbose();


const TRADES_DB = process.env.TRADES_DB;

class TradeLogDbServce {
    
    constructor() {
        // open database in memory
        this.db = new sqlite3.Database(TRADES_DB, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to SQlite database '+TRADES_DB);
        });

    }

    async init() {
        // create the tables
        await this.run(
            `CREATE TABLE IF NOT EXISTS trades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT);
            `, []).then(() => {
            console.log("TALBES CREATED");
        });
    }

    shutdownDb () {
        console.log('Closing the database connection.');
        // close the database connection
        this.db.close((err) => {
            if (err) {
                return console.error("ERROR:" + err.message);
            }
        });
        console.log('Closing the database connection. DONE');
    }

    getTradesFromDb (max=10, from=0) {
        return {};
    }


    run(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.run(sql, params, function (err) {
            if (err) {
              console.log('Error running sql ' + sql)
              console.log(err)
              reject(err)
            } else {
              resolve({ id: this.lastID })
            }
          })
        })
      }
    
}

// singleton export
exports.tradeLogDbServce=new TradeLogDbServce();
