import {React, useEffect} from 'react';

import {fetchInfoAndCoinList} from '../actions/ApiCalls'
import PositionInput from './PositionInput';
import PositionCalculationOverview from './PositionCalculationOverview';
import PlaceOrder from './PlaceOrder';
import PlaceOrderResult from './PlaceOrderResult';


const OrderScreen = ({state, dispatch}) => {
    useEffect(() => {
        doFetchInfoAndCoinList({state, dispatch});
    }, []);

    return (
<div style={mainPanelStyle}>
    <PositionInput state={state} dispatch={dispatch} />

{state.position.calculated && (
    <>
        <PositionCalculationOverview state={state} dispatch={dispatch} />
        <PlaceOrder state={state} dispatch={dispatch} />
    </>
)}
{state.placeOrderResult && (
    <PlaceOrderResult state={state} dispatch={dispatch} />
)}
</div>
    );

  }

const doFetchInfoAndCoinList = async({state, dispatch}) => {
    dispatch({type: "setFetchingCoinList", value: true});
    const infoAndcointlist = await fetchInfoAndCoinList();
    dispatch({type: "setPositionInput", item:"coinList", 
        value:infoAndcointlist.symbols.result?infoAndcointlist.symbols.result:null});
    dispatch({type: "setApiInfo", item:"", 
        value:infoAndcointlist.apiKeyInfo.result?infoAndcointlist.apiKeyInfo.result[0]:null});
    dispatch({type: "setFetchingCoinList", value: false});
}

const mainPanelStyle= {
    display:"flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    margin: 5,
    padding: 10,
    justifyContent:"flex-start",
}

export default OrderScreen;