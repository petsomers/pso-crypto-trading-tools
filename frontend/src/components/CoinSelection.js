import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CoinSelection = ({state, dispatch}) => {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={state.coinList}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Coin" />}

        value={state.coin}
        onChange={(v) => dispatch({type: "setPositionInput", item:"coin", value:v.target.value.toUpperCase()})}
      />
    );
  }


  export default CoinSelection;