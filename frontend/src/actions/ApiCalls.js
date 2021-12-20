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