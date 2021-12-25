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
import {fetchInfoAndCoinList, placeOrder} from '../actions/ApiCalls'

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "250px",
    },
    
}));

const OrderScreen = ({state, dispatch}) => {
    const classes = useStyles();

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
    <>
        <Paper elevation={3} style={inputPanelStyle}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Position Calculation
            </Typography>
        <TableContainer component={Paper}>
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
        <Paper elevation={3} style={inputPanelStyle}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{width: 250}}>
                Place Order
            </Typography>
            <Typography variant="caption">
                Bybit USDT Perpetual
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
                {state.position.triggerPrice && (
                    <Typography variant="caption">
                        Step adjustment: {state.position.triggerPrice} $
                    </Typography>
                )}
                </>
            )}
            <br /><br />
            <Button
                variant="contained"
                disabled={state.placingOrder}
                className={classes.button}
                startIcon={<PlayCircleFilledWhiteIcon />}
                onClick={() => doPlaceOrder(state, dispatch)} >Place Order with Bybit</Button>
            {state.apiInfo && (
                <Paper style={{padding: 3}}>
                <Typography variant="caption">
                    <b>User ID:</b> {state.apiInfo.user_id}<br />
                    <b>APi Key:</b> {state.apiInfo.api_key}<br />
                    <b>Note:</b> {state.apiInfo.note}
                </Typography>
                </Paper>
            )}
        </Paper>
        
        </>
)}
{state.placeOrderResult && (
        <Paper elevation={3} style={inputPanelStyle}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Place Order Result
            </Typography>
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">Message</TableCell>
                    <TableCell component="th" scope="row" style={{width: "200px"}}>{state.placeOrderResult.ret_msg}</TableCell>
                </TableRow>
                {state.placeOrderResult.ret_code !== 0 && (
                    <TableRow>
                        <TableCell component="th" scope="row">Return Code</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.ret_code}</TableCell>
                </TableRow>
                )}
                {state.placeOrderResult.result && (
                <>
                <TableRow>
                    <TableCell component="th" scope="row">User Id</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.result.user_id}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Symbol</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.result.symbol}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Created On</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.result.created_time}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Order Status</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.result.order_status}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Time in Force</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.result.time_in_force}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Side</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.result.side==="Buy"?"LONG":"SHORT"}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Price</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.result.price}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">QTY</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.result.qty}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Take Profit</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.result.take_profit}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Stop Loss</TableCell>
                    <TableCell component="th" scope="row">{state.placeOrderResult.result.stop_loss}</TableCell>
                </TableRow>
                </>
                )}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
)}
    </div>
    );

  }

const doPlaceOrder = async(state, dispatch) => {
    if (state.placingOrder) return; // already ongoing
    dispatch({type: "setPlacingOrder", value: true});
    dispatch({type: "setPlaceOrderResult", value: null});
    const result= await placeOrder(state);
    dispatch({type: "setPlacingOrder", value: false});
    dispatch({type: "setPlaceOrderResult", value: result});
}

const doFetchCoinList = async({state, dispatch}) => {
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

const inputPanelStyle= {
    display:"flex",
    flexDirection: "column",
    padding: 10,
    margin: 5,
}

  export default OrderScreen;