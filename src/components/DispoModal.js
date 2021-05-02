import React, {useEffect, useState} from 'react';
import Modal from "./Modal";
import PropTypes from "prop-types";
import {Button, CircularProgress, TextField} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import getUserPublicInfoApi from "../api/getUserPublicInfoApi";
import setUserPublicInfoApi from "../api/setUserPublicInfoApi";


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
    const [loading, setLoading] = useState(true);

    const [startMonday, setStartMonday] = useState("");
    const [endMonday, setEndMonday] = useState("");

    const [startTuesday, setStartTuesday] = useState("");
    const [endTuesday, setEndTuesday] = useState("");

    const [startWednesday, setStartWednesday] = useState("");
    const [endWednesday, setEndWednesday] = useState("");

    const [startThursday, setStartThursday] = useState("");
    const [endThursday, setEndThursday] = useState("");

    const [startFriday, setStartFriday] = useState("");
    const [endFriday, setEndFriday] = useState("");

    const [startSaturday, setStartSaturday] = useState("");
    const [endSaturday, setEndSaturday] = useState("");

    const [startSunday, setStartSunday] = useState("");
    const [endSunday, setEndSunday] = useState("");

    useEffect(() => {
        getUserPublicInfoApi().then((res) => {
            setLoading(false);
            setStartMonday(res?.availability?.monday?.start)
            setEndMonday(res?.availability?.monday?.end)
            setStartTuesday(res?.availability?.tuesday?.start)
            setEndTuesday(res?.availability?.tuesday?.end)
            setStartWednesday(res?.availability?.wednesday?.start)
            setEndWednesday(res?.availability?.wednesday?.end)
            setStartThursday(res?.availability?.thursday?.start)
            setEndThursday(res?.availability?.thursday?.end)
            setStartFriday(res?.availability?.friday?.start)
            setEndFriday(res?.availability?.friday?.end)
            setStartSaturday(res?.availability?.saturday?.start)
            setEndSaturday(res?.availability?.saturday?.end)
            setStartSunday(res?.availability?.sunday?.start)
            setEndSunday(res?.availability?.sunday?.end)
        });
    }, []);

    const confirmNewAvailabilities = (closeModal) => {
        const data = {}
        if (startMonday && endMonday)
            data['monday'] = { start: (startMonday ? startMonday : ""), end: (endMonday ? endMonday : "")};
        if (startTuesday && endTuesday)
            data['tuesday'] = { start: (startTuesday ? startTuesday : ""), end: (endTuesday ? endTuesday : "")};
        if (startWednesday && endWednesday)
            data['wednesday'] = { start: (startWednesday ? startWednesday : ""), end: (endWednesday ? endWednesday : "")};
        if (startThursday && endThursday)
            data['thursday'] = { start: (startThursday ? startThursday : ""), end: (endThursday ? endThursday : "")};
        if (startFriday && endFriday)
            data['friday'] = { start: (startFriday ? startFriday : ""), end: (endFriday ? endFriday : "")};
        if (startSaturday && endSaturday)
            data['saturday'] = { start: (startSaturday ? startSaturday : ""), end: (endSaturday ? endSaturday : "")};
        if (startSunday && endSunday)
            data['sunday'] = { start: (startSunday ? startSunday : ""), end: (endSunday ? endSunday : "")};


        setUserPublicInfoApi("", "", data).then((res) => {
            console.log(res);
            closeModal();
        });
    }

    function buildModalContent() {
        if (loading) {
            return (
                <CircularProgress/>
            );
        }
        return (
            <div className={classes.inputList}>
                <div className={classes.inputElement}>
                    <div className={classes.dayContainer}>Monday:</div>
                    <div className={classes.inputSection}>
                        <TextField value={startMonday} onChange={(event) => {setStartMonday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        <span className="textMedium"> - </span>
                        <TextField value={endMonday} onChange={(event) => {setEndMonday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                    </div>
                </div>
                <div className={classes.inputElement}>
                    <div className={classes.dayContainer}>Tuesday:</div>
                    <div className={classes.inputSection}>
                        <TextField value={startTuesday} onChange={(event) => {setStartTuesday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        <span className="textMedium"> - </span>
                        <TextField value={endTuesday} onChange={(event) => {setEndTuesday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                    </div>

                </div>
                <div className={classes.inputElement}>
                    <div className={classes.dayContainer}>Wednesday:</div>
                    <div className={classes.inputSection}>
                        <TextField value={startWednesday} onChange={(event) => {setStartWednesday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        <span className="textMedium"> - </span>
                        <TextField value={endWednesday} onChange={(event) => {setEndWednesday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                    </div>

                </div>
                <div className={classes.inputElement}>
                    <div className={classes.dayContainer}>Thursday:</div>
                    <div className={classes.inputSection}>
                        <TextField value={startThursday} onChange={(event) => {setStartThursday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        <span className="textMedium"> - </span>
                        <TextField value={endThursday} onChange={(event) => {setEndThursday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                    </div>

                </div>
                <div className={classes.inputElement}>
                    <div className={classes.dayContainer}>Friday:</div>
                    <div className={classes.inputSection}>
                        <TextField value={startFriday} onChange={(event) => {setStartFriday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        <span className="textMedium"> - </span>
                        <TextField value={endFriday} onChange={(event) => {setEndFriday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                    </div>

                </div>
                <div className={classes.inputElement}>
                    <div className={classes.dayContainer}>Saturday:</div>
                    <div className={classes.inputSection}>
                        <TextField value={startSaturday} onChange={(event) => {setStartSaturday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        <span className="textMedium"> - </span>
                        <TextField value={endSaturday} onChange={(event) => {setEndSaturday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                    </div>

                </div>
                <div className={classes.inputElement}>
                    <div className={classes.dayContainer}>Sunday:</div>
                    <div className={classes.inputSection}>
                        <TextField value={startSunday} onChange={(event) => {setStartSunday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                        <span className="textMedium"> - </span>
                        <TextField value={endSunday} onChange={(event) => {setEndSunday(event.target.value)}} type="time" className={classes.textField}
                                   InputLabelProps={{shrink: true}} inputProps={{step: 300}}/>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <Modal
            show={props.show}
            width={'50%'}
            title={"Choose your responsibilities"}
            onClose={props.onClose}
        >
            <div className={classes.modalContent}>
                {buildModalContent()}
            </div>
            <div className={classes.modalFooter}>
                <Button style={{marginRight: '20px'}} onClick={props.onClose} className={classes.closeBtn}>
                    Close
                </Button>
                <Button onClick={() => {confirmNewAvailabilities(props.onClose)}} className={"pickeatBtn"}>
                    Apply
                </Button>
            </div>
        </Modal>
    );
}

DispoModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
