const fs = require('fs');
const tradesLogDir = process.env.TRADES_LOG_DIR;


const makeTradesLogDir = async () => {
    if (!fs.existsSync(tradesLogDir)) {
        return fs.promises.mkdir(tradesLogDir, { recursive: true });
    }
}

const performTradeLogSetup = async() => {
    await makeTradesLogDir();
}

const appendLog = async (bybitResponse) => {
    const r = bybitResponse;
    const output = [getTimeStamp(), r.ret_code, r.ret_msg];
    if (r.result) {
        const res = r.result;
        output.push(res.created_time);
        output.push(res.userId);
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
    const txt = output.join("\t");
    return fs.promises.appendFile(tradesLogDir+"/" + getYearAndWeekNumber()+".txt", txt+"\r\n");
}

const readFile = async (weekNumber=-1) => {
    if (weekNumber===-1) weekNumber=getCurrentWeekNumber();
    return fs.promises.readFile(f);
}

const getYearAndWeekNumber = () => {
    // ISO8601 standard
    //var tdt = new Date(dt.valueOf());
    var tdt = new Date();
    var dayn = (tdt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
        tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    const weekNumber = 1 + Math.ceil((firstThursday - tdt) / 604800000);
    const weekNumberFormatted = ("0"+weekNumber).slice(-2);
    return tdt.getFullYear() + "-" + weekNumberFormatted;
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


exports.appendLog=appendLog;
exports.performTradeLogSetup=performTradeLogSetup;