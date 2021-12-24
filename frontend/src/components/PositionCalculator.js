import {React, useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CoinSelection from './CoinSelection';
import {fetchCoinList, placeOrder} from '../actions/ApiCalls'

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "250px",
    },
    
}));

const PositionCalculator = ({state, dispatch}) => {
    const classes = useStyles();
    const coinList = state.coinList;

    useEffect(() => {
        doFetchCoinList({state, dispatch});
    }, []);

    return (
    <div style={mainPanelStyle}>
        <Paper elevation={3} style={inputPanelStyle}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Position Input
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
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
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

{state.position.calculated && (
        <Paper elevation={3} style={inputPanelStyle}>
        <TableContainer component={Paper}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Position Calculation
            </Typography>
            <Table size="small" aria-label="a dense table">
            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">Coin</TableCell>
                    <TableCell component="th" scope="row" style={{width: "200px"}}>{state.coin?state.coin.name:""}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Type</TableCell>
                    <TableCell component="th" scope="row" style={{color: "white", backgroundColor:state.position.type==="LONG"?"green":"red"}}>{state.position.type}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Leverage</TableCell>
                    <TableCell component="th" scope="row">{state.position.leverage}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Order Price</TableCell>
                    <TableCell component="th" scope="row">{state.position.price} $</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">QTY</TableCell>
                    <TableCell component="th" scope="row">{state.position.coins}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Take Profit</TableCell>
                    <TableCell component="th" scope="row">{state.position.tp} $</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Stop Loss</TableCell>
                    <TableCell component="th" scope="row">{state.position.sl} $</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Order Value</TableCell>
                    <TableCell component="th" scope="row">{state.position.realAmount.toFixed(2)} $</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Max Loss</TableCell>
                    <TableCell component="th" scope="row">{state.position.maxLoss.toFixed(2)} $</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Max Profit</TableCell>
                    <TableCell component="th" scope="row">{state.position.maxProfit.toFixed(2)} $</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
        <i>Step/tick sizes are taken into account</i>
        </Paper>
)}
        <Paper elevation={3} style={inputPanelStyle}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{width: 250}}>
                Place Order
            </Typography>
            <FormControlLabel 
                control={<Checkbox checked={state.conditional} 
                onChange={(v) => dispatch({type: "setPositionInput", item:"conditional", value:!state.conditional})}/>} label="Conditional" />
            {state.conditional && (
                <>
                <TextField
                    id = "triggerPrice"
                    className={classes.formControl}
                    label="Trigger Price"
                    margin="dense"
                    variant="outlined"
                    value={state.triggerPrice}
                    onChange={(v) => dispatch({type: "setPositionInput", item:"triggerPrice", value:v.target.value})}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">$</InputAdornment>,
                    }}
                />
                With step size: {state.position.triggerPrice} $
                </>
            )}
            <br /><br />
            <Button
                variant="contained"
                
                className={classes.button}
                startIcon={<PlayCircleFilledWhiteIcon />}
                onClick={() => doPlaceOrder(state, dispatch)}
            >Place Order with Bybit</Button>
        </Paper>
    </div>
    );

  }

const doPlaceOrder = async(state, dispatch) => {
    const result= await placeOrder(state);
}

const doFetchCoinList = async({state, dispatch}) => {
    dispatch({type: "setFetchingCoinList", value: true});
    const coinListResp = await fetchCoinList();
    const cointlist = coinListResp.data.result;
    dispatch({type: "setPositionInput", item:"coinList", value:cointlist});
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

const inputPanelStyle= {
    display:"flex",
    flexDirection: "column",
    padding: 10,
    margin: 5,
}

  export default PositionCalculator;