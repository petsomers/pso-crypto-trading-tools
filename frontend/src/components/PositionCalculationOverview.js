import {React} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';


const PositionCalculationOverview = ({state, dispatch}) => {

    return (

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

)}

const inputPanelStyle= {
    display:"flex",
    flexDirection: "column",
    padding: 10,
    margin: 5,
}

export default PositionCalculationOverview;