import React, {useEffect, useState} from 'react';
import confirmProductReservationApi from "../api/comfirmReservationProductApi";
import reserveProductApi from "../api/reserveProductApi";
import {isEmpty} from "../helpers/isEmpty";
import {Tooltip, Zoom} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import PickerRateSection from "./PickerRateSection";
import makeStyles from "@material-ui/core/styles/makeStyles";
import confirmExchangeApi from "../api/confirmExchangeApi";
import PropTypes from "prop-types";
import DispoModal from "./DispoModal";

const useStyles = makeStyles(theme => ({
    contactBtnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '30%',
    },
}));

export default function ReservationSection(props) {
    const classes = useStyles();
    const [isReserveLoading, setIsReserveLoading] = useState(false);
    const [isMeetUpPositiveButtonLoading, setIsMeetUpPositiveButtonLoading] = useState(false);
    const [isMeetUpNegativeButtonLoading, setIsMeetUpNegativeButtonLoading] = useState(false);

    useEffect(() => {
    }, []);

    const confirmMeetUp = (meetUpHappened) => {
        if (meetUpHappened) {
            setIsMeetUpPositiveButtonLoading(true);
            confirmExchangeApi(props.product._id, true).then((response) => {
                window.location.reload();
            })
        } else {
            setIsMeetUpNegativeButtonLoading(true);
            confirmExchangeApi(props.product._id, false).then((response) => {
                window.location.reload();
            })
        }
    }

    const buildMeetUpButtons = () => {
        return (
            <div className={classes.contactBtnContainer}>
                <Button className="pickeatBtn"
                        onClick={() => {
                            confirmMeetUp(true)
                        }}
                        style={{width: '45%', height: '40px'}}>
                    {(isMeetUpPositiveButtonLoading ?
                        <CircularProgress style={{color: 'white'}}/> : "L’échange a eu lieu")}
                </Button>
                <Button className="pickeatBtnRed"
                        onClick={() => {
                            confirmMeetUp(false)
                        }}
                        style={{width: '50%', height: '40px'}}>
                    {(isMeetUpNegativeButtonLoading ?
                        <CircularProgress style={{color: 'white'}}/> : "L’échange n’a pas eu lieu")}
                </Button>
            </div>
        )
    }

    const buildReservationSection = () => {
        const confirmProductReservation = () => {
            setIsReserveLoading(true);
            confirmProductReservationApi(props.product._id).then(success => {
                setIsReserveLoading(false);
                window.location.reload();
            });
        }

        const reserveProduct = () => {
            setIsReserveLoading(true);
            reserveProductApi(props.product._id).then(success => {
                setIsReserveLoading(false);
                window.location.reload();
            });
        }

        if (isEmpty(props.product))
            return
        //GIVER SECTION
        if (props.ownId && props.ownId === props.product.user._id) {
            if (props.product.status === 'available') {
                return;
            } else if (props.product.status === 'waiting-for-reservation') {
                return (
                    <div className={classes.contactBtnContainer}>
                        <Tooltip
                            TransitionComponent={Zoom}
                            title={"Once the request is accepted, we will send your number by email to the person wishing to collect your product so that you can agree on a date and time"}
                            arrow>
                            <Button className="pickeatBtn"
                                    onClick={() => {
                                        confirmProductReservation()
                                    }}
                                    style={{width: '100%', height: '40px'}}>
                                {(isReserveLoading ?
                                    <CircularProgress style={{color: 'white'}}/> : "Confirm reservation")}
                            </Button>
                        </Tooltip>
                    </div>
                );
            } else if (props.product.status === 'reserved') {
                if (props.product?.confirmation?.giver === false) {
                    return (
                        <>
                            {buildMeetUpButtons()}
                        </>
                    )
                } else {

                }
            }
        } else {
            //PICKER SECTION
            if (props.product.status === 'available') {
                return (
                    <div className={classes.contactBtnContainer}>
                        <Button className="pickeatBtn"
                                onClick={() => {
                                    reserveProduct()
                                }}
                                style={{width: '100%', height: '40px'}}>
                            {(isReserveLoading ? <CircularProgress style={{color: 'white'}}/> : "Reserve the product")}
                        </Button>
                    </div>
                )
            } else if (props.product.status === 'waiting-for-reservation') {

            } else if (props.product.status === 'reserved') {
                if (props.product?.confirmation?.picker === false) {
                    return (
                        <>
                            {buildMeetUpButtons()}
                        </>
                    )
                } else {

                }
            } else if (props.product.status === 'given') {
                return (
                    <PickerRateSection productId={props.product._id}/>
                )
            }
        }
    }

    return (
        <div>
            {buildReservationSection()}
        </div>
    );
}

ReservationSection.propTypes = {
    product: PropTypes.object,
    //This object must be the object you get with getProductApi(id)
    ownId: PropTypes.string,
};