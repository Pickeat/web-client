import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import {useHistory} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    main: {
        position: 'absolute',
        top: '10px',
        left: '10px'
    },
}));

export default function BackArrow(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.main}>
            <IconButton onClick={() => {
                history.goBack()
            }}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
        </div>
    );
}
