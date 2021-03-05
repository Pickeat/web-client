import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Background from '../components/Background';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import EventIcon from '@material-ui/icons/Event';
import RoomIcon from '@material-ui/icons/Room';
import * as moment from 'moment';
import {isEmpty} from '../helpers/isEmpty';
import CircularProgress from '@material-ui/core/CircularProgress';
import Map from '../components/Map';
import {getDistance} from 'geolib';
import {toast} from 'react-toastify';
import getProductApi from '../api/getProductApi';
import DefaultProfilePicture from '../assets/unknow_picture_user.jpg'
import DefaultProductPicture from '../assets/wallpaper-login.jpg'
import {Modal, Tooltip, Zoom} from "@material-ui/core";
import UserAvailabilities from "../components/UserAvailabilities";
import getUserMeApi from "../api/getUserMeApi";
import TextField from "@material-ui/core/TextField";
import reserveProductApi from "../api/reserveProductApi";
import confirmProductReservationApi from "../api/comfirmReservationProductApi";
import StatusIndicator from "../components/StatusIndicator";

const useStyles = makeStyles(theme => ({
    main: {
        paddingTop: '5rem',
        boxSizing: 'border-box',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    headerContainer: {
        height: '200px',
        width: '100%',
        display: 'flex',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '180px',
        height: '100%',
    },
    logoBackground: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: '30px',
    },
    contentContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: '100%',
    },
    productContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: '100%',
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '90%',
        height: '90%',
    },
    profilePictureContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '30%',
    },
    profileInfoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '50%',
        height: '10%',
    },
    profileRatingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '20%',
    },
    statusContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    contactBtnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '40%',
    },
    contactBtnContainerButton: {
        position: 'absolute',
        bottom: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    productDataContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        height: '55%',
    },
    productPictureContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: '100%',
    },
    productInfoContainer: {
        width: '70%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto'
    },
    productTitleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '15%',
        width: '100%',
    },
    productLittleInfoContainer: {
        height: '85%',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    productLittleInfoBlock: {
        height: '25%',
    },
    productLittleInfoLabel: {
        height: '20%',
        width: '100%',
        fontSize: '20px',
    },
    productLittleInfoContent: {
        paddingLeft: '20px',
        boxSizing: 'border-box',
        height: '80%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    productLittleInfoImageLabelContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '20px',
        width: '50px',
        height: '100%',
    },
    productMapContainer: {
        position: 'relative',
        width: '90%',
        height: '35%',
    },
}));

export default function Product(props) {
    const classes = useStyles();
    const {id} = useParams();
    const [data, setData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [OwnId, setOwnId] = useState("");
    const [productDistance, setProductDistance] = useState(-1);
    const [availabilitiesModalIsOpen, setAvailabilitiesModalIsOpen] = useState(false);
    const [productTitle, setProductTitle] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productExpirationDate, setProductExpirationDate] = useState("");
    const [isReserveLoading, setIsReserveLoading] = useState(false);

    useEffect(() => {
        getProductApi(id).then((res) => {
            setData(res);
            setProductTitle(res?.title);
            setProductDescription(res?.description);
            setProductExpirationDate(res?.expiration_date);
        });
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                if (!isEmpty(data) && props.location) {
                    const userLat = location?.coords?.latitude;
                    const userLng = location?.coords?.longitude;
                    if (!data?.location)
                        return;
                    const productLng = data?.location[0];
                    const productLat = data?.location[1];


                    if (userLat && userLng && productLng && productLat) {
                        setProductDistance(getDistance(
                            {latitude: userLat, longitude: userLng},
                            {latitude: productLat, longitude: productLng}));
                    }
                } else {
                    setProductDistance(-1);
                }
            });
        } else {
            toast.error('Geolocation is not supported by this browser.');
            setProductDistance(-1);
        }
    }, [data]);

    const isUserOwner = () => {
        getOwnUserNameCall();
        if (!isEmpty(data) && OwnId && OwnId === data.user._id && !isEditMode) {
            return (
                <div className={classes.contactBtnContainerButton}>
                    <Button onClick={() => {
                        setIsEditMode(true)
                    }} className="pickeatBtn" style={{width: '100%', height: '40px'}}>Edit Product</Button>
                </div>
            )
        } else if (!isEmpty(data) && OwnId && OwnId === data.user._id && isEditMode) {
            return (
                <div className={classes.contactBtnContainerButton}>
                    <Button onClick={() => {
                        setIsEditMode(false)
                    }} className="pickeatBtn" style={{width: '100%', height: '40px'}}>Validate changes</Button>
                </div>
            )
        }
    }

    const titleBlock = () => {
        if (isEditMode) {
            return (
                <div className={classes.productTitleContainer}>
                    <TextField
                        inputProps={{style: {textAlign: "center"}}}
                        className={classes.titleField}
                        margin="normal"
                        fullWidth
                        id="title"
                        label="title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        value={productTitle}
                        onChange={(event => setProductTitle(event.target.value))}
                    />
                </div>
            )
        } else {
            return (
                <div className={classes.productTitleContainer}>
                    <span className="textMedium" style={{fontSize: '20px'}}>{productTitle}</span>
                </div>
            )
        }
    }

    const descriptionBlock = () => {
        if (isEditMode) {
            return (
                <div className={classes.productLittleInfoBlock}>
                    <div
                        className={clsx('textMedium', classes.productLittleInfoLabel)}>Description
                    </div>
                    <div className={classes.productLittleInfoContent}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="description"
                            label="description"
                            name="description"
                            autoComplete="description"
                            autoFocus
                            value={productDescription}
                            onChange={(event => setProductDescription(event.target.value))}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className={classes.productLittleInfoBlock}>
                    <div
                        className={clsx('textMedium', classes.productLittleInfoLabel)}>Description
                    </div>
                    <div className={classes.productLittleInfoContent}>
                          <span className="textRegular"
                                style={{marginLeft: '10px'}}>
                            {productDescription}
                          </span>
                    </div>
                </div>
            )
        }
    }

    const expirationDateBlock = () => {
        if (isEditMode) {
            return (
                <div className={classes.productLittleInfoBlock}>
                    <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Expiry
                        date
                    </div>
                    <div className={classes.productLittleInfoContent}>
                        <TextField
                            id="expirationDate"
                            label="Expiration Date"
                            type="date"
                            defaultValue={productExpirationDate}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className={classes.productLittleInfoBlock}>
                    <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Expiry
                        date
                    </div>
                    <div className={classes.productLittleInfoContent}>
                        <EventIcon fontSize={'large'}/>
                        <span className="textRegular"
                              style={{marginLeft: '10px'}}>
                            {moment(productExpirationDate).format('DD/MM/YYYY')}
                          </span>
                    </div>
                </div>
            )
        }
    }

    const labelBlock = () => {
        return (
            <div className={classes.productLittleInfoBlock}>
                <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Labels</div>
                <div className={classes.productLittleInfoContent}>
                    {
                        data?.labels?.map((label) => {
                            return (
                                <div title={label} key={label}
                                     className={classes.productLittleInfoImageLabelContainer}>
                                    <img style={{maxWidth: '100%', maxHeight: '100%'}}
                                         alt={'product label'}
                                         src={`/assets/food-label/${label}.png`}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }

    const distanceBlock = () => {
        return (
            <div className={classes.productLittleInfoBlock}>
                <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Distance
                </div>
                <div className={classes.productLittleInfoContent}>
                    <RoomIcon fontSize={'large'}/>
                    <span className="textRegular"
                          style={{marginLeft: '10px'}}>
                        {buildProductDistance()}
                      </span>
                </div>
            </div>
        )
    }

    const confirmMeetUp = (meetUpHappened) => {
        console.log("heyyyyyyy")
        if (meetUpHappened) {
            setIsMeetUpPositiveButtonLoading(true);
        } else {
            setIsMeetUpNegativeButtonLoading(true);
        }

    }

    const getOwnUserNameCall = () => {
        getUserMeApi().then((response) => {
            setOwnId(response._id);
        });
    }

    const buildMeetUpButtons = () => {
        return(
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
        return (
            <>
                {buildMeetUpButtons()}
            </>
        )
    }

    const buildProductDistance = () => {
        if (productDistance === -1)
            return ('Sorry we had a problem computing the distance');
        return productDistance + 'm';
    };

    if (isEmpty(data))
        return (
            <div className={classes.main} style={{justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress/>
            </div>
        );

    const buildReservationSection = () => {
        function confirmProductReservation() {
            setIsReserveLoading(true);
            confirmProductReservationApi().then(success => {
                setIsReserveLoading(false);
            });
        }

        const reserveProduct = () => {
            setIsReserveLoading(true);
            reserveProductApi(id).then(success => {
                setIsReserveLoading(false);
                window.location.reload();
            });
        }

        if (isEmpty(data))
            return
        if (OwnId && OwnId === data.user._id) {
            if (data.status === 'available')
                return;
            else if (data.status === 'waiting-for-reservation') {
                return (
                    <div className={classes.contactBtnContainer}>
                        <Tooltip
                            TransitionComponent={Zoom}
                            title={"Une fois la demande acceptée, nous enverrons votre numéro par mail à la personne souhaitant " +
                            "récupérer votre produit pour que vous puissiez convenir d’une date et d’une horaire"}
                            arrow>
                            <Button className="pickeatBtn"
                                    onClick={() => {
                                        confirmProductReservation()
                                    }}
                                    style={{width: '100%', height: '40px'}}>
                                {(isReserveLoading ?
                                    <CircularProgress style={{color: 'white'}}/> : "Confirmer la reservation")}
                            </Button>
                        </Tooltip>
                    </div>
                );
            }
        } else {
            if (data.status === 'available')
                return (
                    <div className={classes.contactBtnContainer}>
                        <Button className="pickeatBtn"
                                onClick={() => {
                                    reserveProduct()
                                }}
                                style={{width: '100%', height: '40px'}}>
                            {(isReserveLoading ? <CircularProgress style={{color: 'white'}}/> : "Reserver le produit")}
                        </Button>
                    </div>
                )
            else if (data.status === 'waiting-for-reservation') {
                return;
            }
        }
    }

    return (
        <div className={classes.main}>
            <Background/>
            <div className={classes.contentContainer}>
                <div className={classes.userContainer}>
                    <Paper className={classes.paper} style={{flexDirection: 'column'}} elevation={10}>
                        <div className={classes.profilePictureContainer}>
                            <img style={{maxWidth: '100%', maxHeight: '100%'}}
                                 alt={'giver profile picture'}
                                 src={(data?.user?.profile_image ? data?.user?.profile_image : DefaultProfilePicture)}/>
                        </div>
                        <div className={classes.profileInfoContainer}>
                            <div className="textMedium"
                                 style={{fontSize: '20px', textAlign: 'center'}}>{data?.user?.name}</div>
                            <div className="textRegular"
                                 style={{fontSize: '15px', textAlign: 'center'}}>{data?.user?.level} member<br/>
                                ({moment(data?.user?.created_at).format('DD/MM/YYYY')})
                            </div>
                        </div>
                        <div className={classes.profileRatingContainer}>
              <span className="textMedium"
                    style={{fontSize: '30px'}}>{(data?.user?.note ? `${data?.user?.note}/5` : 'No note yet')}</span>
                            <Rating name="read-only" value={data?.user?.note} readOnly/>
                        </div>
                        <div style={{width: '80%', height: '40%'}}>
                            <div className={classes.statusContainer}>
                                <StatusIndicator status={data.status}
                                                 isOwner={!isEmpty(data) && OwnId && OwnId === data.user._id}/>
                            </div>
                            <div className={classes.contactBtnContainer}>
                                <Button className="pickeatBtn" onClick={() => {
                                    setAvailabilitiesModalIsOpen(true)
                                }} style={{width: '100%', height: '40px'}}>Giver availabilities</Button>
                            </div>
                            <Modal
                                open={availabilitiesModalIsOpen}
                                onClose={() => setAvailabilitiesModalIsOpen(false)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{width: '800px', height: '500px'}}>
                                    <UserAvailabilities data={{
                                        "Monday": {
                                            "start": 8.00,
                                            "end": 20.00
                                        },
                                        "Tuesday": {
                                            "start": 8.00,
                                            "end": 20.00
                                        },
                                        "Wednesday": {
                                            "start": 8.00,
                                            "end": 20.00
                                        },
                                        "Thursday": {
                                            "start": 8.00,
                                            "end": 20.00
                                        },
                                        "Friday": {
                                            "start": 8.00,
                                            "end": 20.00
                                        },
                                        "Saturday": {
                                            "start": 8.00,
                                            "end": 20.00
                                        },
                                        "Sunday": {
                                            "start": 8.00,
                                            "end": 20.00
                                        },
                                    }}/>
                                </div>
                            </Modal>
                            {buildReservationSection()}
                        </div>
                    </Paper>
                </div>
                <div className={classes.productContainer}>
                    <Paper className={classes.paper} style={{flexDirection: 'column'}} elevation={10}>
                        <div className={classes.productDataContainer}>
                            <div className={classes.productPictureContainer}>
                                <img style={{maxWidth: '100%', maxHeight: '100%'}} alt={'pickeat product'}
                                     src={(data?.image ? `https://minio.pickeat.fr/minio/download/products/${data?.image}?token=` : DefaultProductPicture)}/>
                            </div>
                            <div className={classes.productInfoContainer}>
                                {titleBlock()}
                                <div className={classes.productLittleInfoContainer}>
                                    {descriptionBlock()}
                                    {expirationDateBlock()}
                                    {labelBlock()}
                                    {distanceBlock()}
                                </div>
                            </div>
                        </div>
                        <Paper elevation={4} className={classes.productMapContainer}>
                            {data?.location &&
                            <Map lat={data?.location[1]} lng={data?.location[0]} zoom={17}/>
                            }
                            {isUserOwner()}
                        </Paper>
                    </Paper>
                </div>
            </div>
        </div>
    );
}
