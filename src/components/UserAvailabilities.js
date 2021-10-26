import React, {useEffect, useState} from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import {Paper} from "@material-ui/core";
import {isEmpty} from "../helpers/isEmpty";

const useStyles = makeStyles(theme => ({
    main: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    content: {
        width: '30%',
    },
    row: {
        padding: '5px 0px',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        fontFamily: 'colfax-regular'
    }
}));

export default function UserAvailabilities(props) {
    const classes = useStyles();
    const [data] = useState(props.data);

    useEffect(() => {
        console.log(isEmpty(data));
    }, []);

    const buildContent = () => {
        let elements = [];
        for (const [key, value] of Object.entries(data)) {
            elements.push((
                <div key={key} className={classes.row}>
                    <div>{key}</div>
                    <div>{value.start} - {value.end}</div>
                </div>
            ));
        }
        return elements;
    };

    return (
        <Paper elevation={24} className={classes.main}>
            {!isEmpty(data) &&
            <>
                <div style={{fontFamily: 'colfax-medium', fontSize: '30px', height: '70px'}}>
                    Availabilities
                </div>
                <div className={classes.content}>
                    {buildContent()}
                </div>
            </>
            }
            {isEmpty(data) &&
            <div className="textMedium" style={{fontSize: '20px'}}>
                Le Giver n'a pas donné ses disponibilités
            </div>
            }
        </Paper>
    );
}
