import React, {useEffect, useState} from 'react';
import Modal from "./Modal";
import PropTypes from "prop-types";
import {Button, TextField} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {PickeatTextField} from "./PickeatTextField";


const useStyles = makeStyles(theme => ({
    modalFooter: {
        display: 'flex',
        width: '100%',
        height: '70px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTop: 'solid 1px #c1c1c1'
    },
    modalContent: {
        paddingTop: '20px',
        paddingBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputList: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%'
    },
    inputElement: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '60px',
        width: '100%'
    },
    dayContainer: {
        width: '30%'
    },
    inputSection: {
        width: '50%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    closeBtn: {
        fontFamily: 'Colfax-Medium, serif !important',
        textTransform: 'none !important',
        backgroundColor: 'red !important',
        color: 'white',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100px',
    }
}));

export default function DispoModal(props) {
    const classes = useStyles();

    useEffect(() => {
    }, []);

    return (
        <Modal
            show={props.show}
            width={'50%'}
            title={"Choose your responsibilities"}
            onClose={props.onClose}
        >
            <div className={classes.modalContent}>
                <div className={classes.inputList}>
                    <div className={classes.inputElement}>
                        <div className={classes.dayContainer}>Monday:</div>
                        <div className={classes.inputSection}>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                            <span className="textMedium"> - </span>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        </div>
                    </div>
                    <div className={classes.inputElement}>
                        <div className={classes.dayContainer}>Tuesday:</div>
                        <div className={classes.inputSection}>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                            <span className="textMedium"> - </span>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        </div>

                    </div>
                    <div className={classes.inputElement}>
                        <div className={classes.dayContainer}>Wednesday:</div>
                        <div className={classes.inputSection}>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                            <span className="textMedium"> - </span>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        </div>

                    </div>
                    <div className={classes.inputElement}>
                        <div className={classes.dayContainer}>Thursday:</div>
                        <div className={classes.inputSection}>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                            <span className="textMedium"> - </span>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        </div>

                    </div>
                    <div className={classes.inputElement}>
                        <div className={classes.dayContainer}>Friday:</div>
                        <div className={classes.inputSection}>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                            <span className="textMedium"> - </span>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        </div>

                    </div>
                    <div className={classes.inputElement}>
                        <div className={classes.dayContainer}>Saturday:</div>
                        <div className={classes.inputSection}>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                            <span className="textMedium"> - </span>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        </div>

                    </div>
                    <div className={classes.inputElement}>
                        <div className={classes.dayContainer}>Sunday:</div>
                        <div className={classes.inputSection}>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                            <span className="textMedium"> - </span>
                            <TextField type="time" defaultValue="07:30" className={classes.textField}
                                       InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        </div>

                    </div>
                </div>
            </div>
            <div className={classes.modalFooter}>
                <Button onClick={props.onClose} className={classes.closeBtn}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}

DispoModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};