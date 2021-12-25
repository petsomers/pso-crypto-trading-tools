import axios from "axios"

export const callApiTest = async () => {
    try {
        const result = await axios.get("/api/bybit-test");
        return result;
    } catch (e) {
        console.log("Error calling /api/bybit-test", e);
        return "ERROR";
    }
}
export const fetchInfoAndCoinList = async() => {
    try {
        const result = await axios.get("/api/bybit-get-info-and-symbols");
        return result.data;
    } catch (e) {
        console.log("Error calling /api/bybit-test", e);
        return "ERROR";
    }
}

export const placeOrder = async(state) => {
    let endPoint="";
    try {
        let req = {
            side: state.position.type==="LONG"?"Buy":"Sell",
            symbol: state.coin.name,
            order_type: "Limit",
            qty: state.position.coins,
            price: state.position.price,
            time_in_force: "GoodTillCancel",
            take_profit: state.position.tp,
            stop_loss: state.position.sl,
            reduce_only: false,
            close_on_trigger: false,
        }
        if (state.conditional) {
            const tickSize = parseFloat(state.coin.price_filter.tick_size);
            const stop_px = parseFloat(state.position.triggerPrice);
            const base_price = state.triggerPriceAscending?(stop_px - tickSize):(stop_px + tickSize)
            req = {
                ...req, 
                stop_px, base_price,
                trigger_by: 'LastPrice',
            };
        }
        endPoint = state.conditional?"/api/bybit-place-conditional-order":"/api/bybit-place-order";
        const result = await axios.post(endPoint, req,{
            headers: {
              // 'application/json' is the modern content-type for JSON, but some
              // older servers may use 'text/json'.
              // See: http://bit.ly/text-json
              'content-type': 'application/json;charset=utf-8'
            }
          });
        console.log("placeOrder result", result);
        return result.data;
    } catch (e) {
        console.log("Error calling "+endPoint, e);
        return "ERROR";
    }
}