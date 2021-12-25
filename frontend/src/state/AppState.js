import {calcPosition} from '../actions/PositionCalcActions';

export const initialState = {
    coin: null,
    cointList: null,
    maxAmount: '',
    risk: '1',
    price: '',
    tp: '',
    sl: '',
    triggerPrice: '',
    conditional: false,
    position: {},
    apiOutput: '',
    fetchingCoinList: false,
    placingOrder: false,
    placeOrderResult: null,
};

export const reducer = (state, action) => {
    const prevState=state;
    const newState=actualReducer(state, action);
    console.log("Reducer - Previous State:", prevState);
    console.log("Reducer - Action: "+action.type, action);
    console.log("Reducer - New state", newState);
    return newState;
}

const actualReducer = (state, action) => {
    switch (action.type) {
        case 'setPositionInput': 
            let newState = {...state, [action.item]: action.value};
            newState = {...newState, position: calcPosition(newState)};
            return newState;
        case 'setApiOutput': return {...state, apiOutput: action.value};
        case 'setPlacingOrder': return { ...state, placingOrder: action.value};
        case 'setFetchingCoinList': return {...state, fetchingCoinList: action.value};
        case 'setPlaceOrderResult': return {...state, placeOrderResult: action.value};
        default:
            throw new Error("Unsupported action type: "+action.type);
    }
  }


