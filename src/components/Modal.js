import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'block',
        position: 'fixed', /* Stay in place */
        zIndex: '4', /* Sit on top */
        left: '0',
        top: '0',
        width: '100%', /* Full width */
        overflow: 'auto', /* Enable scroll if needed */
        backgroundColor: 'rgba(0,0,0,0.4)' /* Black w/ opacity */
    },

    /* Modal Content/Box */
    modalBox: {
        borderRadius: '10px',
        backgroundColor: '#fefefe',
        margin: '10% auto', /* 15% from the top and centered */
        paddingLeft: '40px',
        paddingRight: '40px',
        border: '1px solid #888',
        width: '80%', /* Could be more or less, depending on screen size */
    },
    modalHeader: {
        width: '100%',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: 'solid 1px #c1c1c1'
    },
    modalFooter: {
        display: 'flex',
        width: '100%',
        height: '70px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTop: 'solid 1px #c1c1c1'
    },
}));


export default function Modal(props) {
    const classes = useStyles();

    useEffect(() => {
    }, []);

    if (!props.show)
        return null;
    return (
        <div id="myModal" className={classes.modal}>
            <div className={classes.modalBox} style={{width: (props.width ? props.width : '80%')}}>
                {props.title &&
                <div className={classes.modalHeader}>
                    <div className="textMedium">{props.title}</div>
                </div>
                }
                {props.children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    width: PropTypes.string
};