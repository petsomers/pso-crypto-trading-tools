import {React} from 'react';
import CoinSelection from './CoinSelection';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "250px",
    },
}));

const PositionInput = ({state, dispatch}) => {
    const classes = useStyles();
    return (
<Paper elevation={3} style={inputPanelStyle}>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Position Input
        <br /> SHOULD BE POST_ONLY!<br />
        Otherwise limit order will be market orders!!!
    </Typography>
    
    {state.coinList && (
        <CoinSelection state={state} dispatch={dispatch} coinList={state.coinList} />
    )}
    {state.fetchingCoinList && (
        <Typography variant="p" component="div" sx={{ padding: 2 }}>
            <i>Fetching coin list</i>
        </Typography>
    )}

    <TextField
        id = "maxAmount"
        className={classes.formControl}
        label="Maxium Investement"
        margin="dense"
        variant="outlined"
        value={state.maxAmount}
        onChange={(v) => dispatch({type: "setPositionInput", item:"maxAmount", value:v.target.value})}
        InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }}
    />
    <TextField
        id = "risk"
        className={classes.formControl}
        label="Risk"
        margin="dense"
        variant="outlined"
        value={state.risk}
        onChange={(v) => dispatch({type: "setPositionInput", item:"risk", value:v.target.value})}
        InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
    />
    <TextField
        id = "price"
        className={classes.formControl}
        label="Order Price"
        margin="dense"
        variant="outlined"
        value={state.price}
        onChange={(v) => dispatch({type: "setPositionInput", item:"price", value:v.target.value})}
        InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }}
    />
    <TextField
        id = "tp"
        className={classes.formControl}
        label="Take Profit Price"
        margin="dense"
        variant="outlined"
        value={state.tp}
        onChange={(v) => dispatch({type: "setPositionInput", item:"tp", value:v.target.value})}
        InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }}
    />
    <TextField
        id = "sl"
        className={classes.formControl}
        label="Stop Loss Price"
        margin="dense"
        variant="outlined"
        value={state.sl}
        onChange={(v) => dispatch({type: "setPositionInput", item:"sl", value:v.target.value})}
        InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }}
    />
</Paper>
)};

const inputPanelStyle= {
    display:"flex",
    flexDirection: "column",
    padding: 10,
    margin: 5,
}


export default PositionInput;