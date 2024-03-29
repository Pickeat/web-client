import React, {useEffect, useState} from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import RoomIcon from '@material-ui/icons/Room';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import * as moment from 'moment';
import {isEmpty} from '../helpers/isEmpty';
import {getDistance} from 'geolib';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory} from 'react-router-dom';
import defaultImage from '../assets/wallpaper-login.jpg';
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    main: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiButton-label': {
            flexDirection: 'column',
        },
        position: 'relative'
    },
    productImgContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '70%',
        height: '70%',
        backgroundColor: 'pink'
    },
    banner: {
        position: 'absolute',
        top: '0px',
        width: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        height: "10%",
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '30%',
        backgroundColor: '#f5f5f5',
    },
    userAvatar: {
        width: '50px',
        height: '50px',
        border: 'solid 2px white',
        marginTop: '-20px',
    },
    cardBottom: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
}));

export default function ProductCard(props) {
    const classes = useStyles();
    const [data, setData] = useState({});
    const [productDistance, setProductDistance] = useState(-1);
    const history = useHistory();

    useEffect(() => {
        setData(props.data);
    }, []);


    useEffect(() => {
        if (!isEmpty(data) && props.location) {
            const userLat = props?.location?.lat;
            const userLng = props?.location?.lng;
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
    }, [data, props.location]);

    const buildBanner = () => {
        if (data.status === "available") {
            return (
                <div style={{backgroundColor: 'rgba(63, 191, 76, 0.90)'}} className={classes.banner}>
                    <span className="textRegular" style={{color: 'white'}} >disponible</span>
                </div>
            )
        } else if (data.status === "reserved") {
            return (
                <div style={{backgroundColor: 'rgba(62, 174, 187, 0.90)'}} className={classes.banner}>
                    <span className="textRegular" style={{color: 'white'}}>reservé</span>
                </div>
            )
        } else if (data.status === "waiting-for-reservation") {
            return (
                <div style={{backgroundColor: 'rgba(187, 74, 62, 0.9)'}} className={classes.banner}>
                    <span className="textRegular" style={{color: 'white'}}>en attente de réservation</span>
                </div>
            )
        } else if (data.status === "given") {
            return (
                <div style={{backgroundColor: 'rgba(74, 62, 187, 0.9)'}} className={classes.banner}>
                    <span className="textRegular" style={{color: 'white'}}>donné</span>
                </div>
            )
        } else if (data.status === "noted") {
            return (
                <div style={{backgroundColor: 'rgba(218, 246, 8, 0.9)'}} className={classes.banner}>
                    <span className="textRegular" style={{color: 'white'}}>noté</span>
                </div>
            )
        }

    }

    const buildProductCard = () => {
        if (isEmpty(data)) {
            return (
                <div className={classes.main} style={{justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress/>
                </div>
            );
        } else {
            return (
                <div onClick={() => {
                    history.push(`/product/${data?._id}`);
                }} className={clsx(classes.main, "transition duration-200 ease-in-out shadow hover:shadow-lg")}>
                    {buildBanner()}
                    <div className={classes.productImgContainer}>
                        <img alt={'product_image'}
                             src={(data.image ? `https://minio.pickeat.fr/minio/download/products/${data?.image}?token=` : defaultImage)}
                             style={{
                                 width: '100%',
                                 maxHeight: '100%',
                                 height: '100%',
                                 maxWidth: '100%',
                                 objectFit: 'cover'
                             }}/>
                    </div>
                    <div className={classes.infoContainer}>
                        <Avatar alt="user_picture"
                                src={(data.user?.image ? `https://minio.pickeat.fr/minio/download/users/${data?.user?.image}?token=` : defaultImage)}
                                className={classes.userAvatar}/>
                        <div className={classes.cardBottom}>
                            <div className="textMedium" style={{lineHeight: '22px'}}>{data.title}</div>
                        </div>
                        <div style={{marginTop: '10px'}} className={classes.cardBottom}>
                            {productDistance !== -1 &&
                            <div style={{display: 'flex'}}><RoomIcon/>
                                <div style={{lineHeight: '22px'}}>{(productDistance/1000).toFixed(1)} Km</div>
                            </div>
                            }
                            {data.expiration_date &&
                            <div style={{display: 'flex'}}><EventAvailableIcon/>
                                <div style={{
                                    lineHeight: '22px',
                                    marginLeft: '5px',
                                }}>{moment(data?.expiration_date).format('DD/MM/YYYY')}</div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            );
        }
    };

    return buildProductCard();
}
