const sqlite3 = require('sqlite3').verbose();


const TRADES_DB = process.env.TRADES_DB;

class TradeLogDbServce {
    
    constructor() {
        // open database in memory
        this.db = new sqlite3.Database(TRADES_DB, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(`Error opening SQlite database file ${TRADES_DB}: ${err.message}`);
            }
            console.log(`Opening SQlite database file ${TRADES_DB}`);
        });

    }

    async init() {
        // create the tables
        await this.run(
            `
            CREATE TABLE IF NOT EXISTS trades (
            trade_id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            ret_code INTEGER,
            ret_message TEST,
            user_id INTEGER,
            order_id TEXT,
            symbol TEXT,
            side TEXT,
            order_type TEXT,
            trigger_price REAL,
            price REAL,
            time_in_force TEXT,
            reduce_only TEXT, -- YES/NO
            take_profic REAL,
            stop_loss REAL,
            order_value REAL,
            order_status TEXT,
            created_time TEXT,
            updated_time TEXT,
            comment TEXT,
            image BLOB);
            `, []);
        await this.run(
            `
            CREATE TABLE IF NOT EXISTS trade_attachments (
            trade_id INTEGER,
            attachment_id INTEGER,
            file_name TEXT,
            attachment BLOB,
            constraint trade_attachments_pk primary key (trade_id, attachment_id),
            constraint trade_attachments_fk1 foreign key (trade_id) references trades(trade_id) on delete cascade
            )
            `, []);
        console.log("TABLES CREATED");
    }

    async saveNewTrade(tradeData) {
        const r = tradeData;
        const output = [getTimeStamp(), r.ret_code, r.ret_msg];
        if (r.result) {
            const res = r.result;
            output.push(res.order_id);
            output.push(res.user_id);
            output.push(res.symbol);
            output.push(res.side==="Buy"?"LONG":"SHORT");
            output.push(res.order_type);
            output.push(res.trigger_price?res.trigger_price:"");
            output.push(res.price);
            output.push(res.qty);
            output.push(res.time_in_force);
            output.push(res.take_profit);
            output.push(res.stop_loss);
            output.push(res.qty * res.price);
        }
        await this.run(
            `
            INSERT INTO trades (
            "timestamp", ret_code, ret_message, order_id, user_id, symbol, side, order_type, 
            trigger_price, price, time_in_force, reduce_only, take_profic, stop_loss, 
            order_value, order_status, created_time, updated_time, comment, image
            ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `, output);
        console.log("Data is inserted");

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


const getTimeStamp = () => {
    var d = new Date();
    return d.getFullYear()
        +"-"
        +("0"+(d.getMonth()+1)).slice(-2)
        +"-"
        +("0"+d.getDate()).slice(-2)
        +" "
        +("0"+d.getHours()).slice(-2)
        +":"
        +("0"+d.getMinutes()).slice(-2)
        +":"
        +("0"+d.getSeconds()).slice(-2);
}


// singleton export
exports.tradeLogDbServce=new TradeLogDbServce();
