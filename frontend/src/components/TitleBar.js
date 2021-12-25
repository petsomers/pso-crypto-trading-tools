import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
}));

const TitleBar = ({state, dispatch}) => {
    const classes = useStyles();
    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                PSO Crypto Position Calculation
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
    );

}


export default TitleBar;