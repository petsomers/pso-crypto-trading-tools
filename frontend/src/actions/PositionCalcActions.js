
export const calcPosition=(state) => {
    const maxAmount = parseFloat(state.maxAmount);
    const price = parseFloat(state.price);
    const tp = parseFloat(state.tp);
    const sl = parseFloat(state.sl);
    const risk = parseFloat(state.risk);

    const coinsWithoutLeverage=maxAmount / price;
    console.log("coinsWithoutLeverage",coinsWithoutLeverage);
    const lossWithoutLeverage = maxAmount - sl * coinsWithoutLeverage;
    console.log("lossWithoutLeverage",lossWithoutLeverage);
    const maxLoss = maxAmount * risk / 100.0;
    console.log("maxLoss",maxLoss);
    const leverageWithMaxLoss = maxLoss / lossWithoutLeverage;
    console.log("leverageWithMaxLoss",leverageWithMaxLoss);
    const coinsWithLeverage = coinsWithoutLeverage * leverageWithMaxLoss;
    console.log("coinsWithLeverage",coinsWithLeverage);
    const priceWithLeverage = coinsWithLeverage * price;
    console.log("priceWithLeverage",priceWithLeverage);
    const profit = coinsWithLeverage * tp - priceWithLeverage;
    console.log("profit",profit);
    const loss = priceWithLeverage - coinsWithLeverage * sl;
    console.log("loss",loss);

    const long = price < tp;
    const leverage = long?leverageWithMaxLoss:-leverageWithMaxLoss;
    
    const result =  {
        type: long?"LONG":"SHORT",
        coins: (long?coinsWithLeverage:-coinsWithLeverage).toFixed(5),
        realAmount: (long?priceWithLeverage:-priceWithLeverage).toFixed(2),
        maxLoss: loss.toFixed(2),
        maxProfit: profit.toFixed(2),
        leverage: (leverage<1.0?1.0:leverage).toFixed(2),
    }

    console.log("Result", result);

    return result;
}