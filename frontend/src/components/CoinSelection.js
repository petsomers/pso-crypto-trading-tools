import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CoinSelection = ({state, dispatch}) => {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={state.coinList}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Coin pair" />}
        getOptionLabel={option => option.name}
        value={state.coin}
        onChange={(event, v) => dispatch({type: "setPositionInput", item:"coin", value:v})}
      />
    );
  }


  export default CoinSelection;