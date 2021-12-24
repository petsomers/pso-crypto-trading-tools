
export const calcPosition=(state) => {
    if (state.coin === null) {
        return {calculated: false};
    }
    const maxAmount = parseFloat(state.maxAmount);
    const price_input = parseFloat(state.price);
    const tp_input = parseFloat(state.tp);
    const sl_input = parseFloat(state.sl);
    const risk = parseFloat(state.risk);

    if ( Number.isNaN(maxAmount) || Number.isNaN(price_input) || Number.isNaN(tp_input) || Number.isNaN(sl_input) || Number.isNaN(risk)) {
        return {calculated: false};
    }
    const tickSize=state.coin.price_filter.tick_size;
    const leverateTickSize=state.coin.leverage_filter.leverage_step;
    const qtyStep=state.coin.lot_size_filter.qty_step;
    const price=roundStep(price_input, tickSize);
    const tp=roundStep(tp_input, tickSize);
    const sl=roundStep(sl_input, tickSize);


    const coinsWithoutLeverage=maxAmount / price;
    console.log("coinsWithoutLeverage",coinsWithoutLeverage);
    const lossWithoutLeverage = maxAmount - sl * coinsWithoutLeverage;
    console.log("lossWithoutLeverage",lossWithoutLeverage);
    const maxLoss = maxAmount * risk / 100.0;
    console.log("maxLoss",maxLoss);
    const leverageWithMaxLoss = roundStepFloor(maxLoss / lossWithoutLeverage, leverateTickSize);
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
        calculated: true,
        type: long?"LONG":"SHORT",
        coins: roundStep(long?coinsWithLeverage:-coinsWithLeverage, qtyStep),
        price, tp, sl,
        realAmount: (long?priceWithLeverage:-priceWithLeverage),
        maxLoss: loss,
        maxProfit: profit,
        leverage: (leverage<1.0?1.0:leverage),
    }

    console.log("Result", result);
    return result;
}

function roundStep(qty, stepSize) {
    const stepSizeStr = stepSize.toString();
    const precision = stepSizeStr.indexOf(".")>0?stepSizeStr.split('.')[1].length || 0:0;
    return ((Math.round(qty / stepSize) | 0) * stepSize).toFixed(precision);
}

function roundStepFloor(qty, stepSize) {
    const stepSizeStr = stepSize.toString();
    const precision = stepSizeStr.indexOf(".")>0?stepSizeStr.split('.')[1].length || 0:0;
    return ((Math.floor(qty / stepSize) | 0) * stepSize).toFixed(precision);
}