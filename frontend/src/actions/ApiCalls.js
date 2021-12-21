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
export const fetchCoinList = async() => {
    try {
        const result = await axios.get("/api/bybit-get-symbols");
        return result;
    } catch (e) {
        console.log("Error calling /api/bybit-test", e);
        return "ERROR";
    }
}

export const placeOrder = async() => {
    try {
        const result = await axios.get("/api/bybit-test");
        return result;
    } catch (e) {
        console.log("Error calling /api/bybit-test", e);
        return "ERROR";
    }
}