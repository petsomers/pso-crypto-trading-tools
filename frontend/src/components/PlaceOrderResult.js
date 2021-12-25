import {React} from 'react';

import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const PlaceOrderResult = ({state, dispatch}) => {

return (

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
)};

const inputPanelStyle= {
    display:"flex",
    flexDirection: "column",
    padding: 10,
    margin: 5,
}

export default PlaceOrderResult;