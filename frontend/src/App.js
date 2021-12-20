import React, { useReducer } from 'react';
import {reducer, initialState} from './state/AppState';
import TitleBar from './components/TitleBar'
import PositionCalculator from './components/PositionCalculator'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <TitleBar state={state} dispatch={dispatch}/>
      <PositionCalculator state={state} dispatch={dispatch}/>
    </>
  );
}

export default App;
