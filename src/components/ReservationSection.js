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
import getProductApi from "../api/getProductApi";
import {toast} from "react-toastify";

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
    const [product, setProduct] = useState({});
    const [ownId, setOwnId] = useState("");

    useEffect(() => {
        getProductApi(props?.product?._id).then((res) => {
            console.log(res)
            if (!res.user) {
                toast.error("User no longer exist")
                return
            }
            setProduct(res)
        });
        setOwnId(props.ownId)
    }, [props, props.product, props.ownId]);

    const confirmMeetUp = (meetUpHappened) => {
        if (meetUpHappened) {
            setIsMeetUpPositiveButtonLoading(true);
            confirmExchangeApi(product._id, true).then((response) => {
                window.location.reload();
            })
        } else {
            setIsMeetUpNegativeButtonLoading(true);
            confirmExchangeApi(product._id, false).then((response) => {
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
            confirmProductReservationApi(product._id).then(success => {
                setIsReserveLoading(false);
                window.location.reload();
            });
        }

        const reserveProduct = () => {
            setIsReserveLoading(true);
            reserveProductApi(product._id).then(success => {
                setIsReserveLoading(false);
                window.location.reload();
            });
        }

        if (isEmpty(product))
            return
        //GIVER SECTION
        console.log("product: ", product);
        if (ownId && ownId === product.user._id) {
            if (product.status === 'available') {
                return;
            } else if (product.status === 'waiting-for-reservation') {
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
            } else if (product.status === 'reserved') {
                if (product?.confirmation?.giver === false) {
                console.log('Ca passe là')
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
            if (product.status === 'available') {
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
            } else if (product.status === 'waiting-for-reservation') {

            } else if (product.status === 'reserved') {
                if (product?.confirmation?.picker === false) {
                    return (
                        <>
                            {buildMeetUpButtons()}
                        </>
                    )
                } else {

                }
            } else if (product.status === 'given') {
                return (
                    <PickerRateSection productId={product._id}/>
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