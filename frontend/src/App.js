import React, { useReducer } from 'react';
import {reducer, initialState} from './state/AppState';
import TitleBar from './components/TitleBar'
import OrderScreen from './components/OrderScreen'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <TitleBar state={state} dispatch={dispatch}/>
      <OrderScreen state={state} dispatch={dispatch}/>
    </>
  );
}

export default App;
