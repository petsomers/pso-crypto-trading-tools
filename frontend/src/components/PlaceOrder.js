import {React} from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

import {placeOrder} from '../actions/ApiCalls'

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "250px",
    },
    
}));

const PlaceOrder = ({state, dispatch}) => {
    const classes = useStyles();

return (
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
        <ToggleButtonGroup
            color="primary"
            value={state.triggerPriceAscending?"asc":"desc"}
            exclusive
            onChange={() =>  dispatch({type: "setPositionInput", item:"triggerPriceAscending", value:!state.triggerPriceAscending})}
            >
            <ToggleButton value="asc">Ascending</ToggleButton>
            <ToggleButton value="desc">Descendingc</ToggleButton>
        </ToggleButtonGroup>
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

)}

const inputPanelStyle= {
    display:"flex",
    flexDirection: "column",
    padding: 10,
    margin: 5,
}

const doPlaceOrder = async(state, dispatch) => {
    if (state.placingOrder) return; // already ongoing
    dispatch({type: "setPlacingOrder", value: true});
    dispatch({type: "setPlaceOrderResult", value: null});
    const result= await placeOrder(state);
    dispatch({type: "setPlacingOrder", value: false});
    dispatch({type: "setPlaceOrderResult", value: result});
}


export default PlaceOrder;