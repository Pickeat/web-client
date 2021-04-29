import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PickerRateSection from "../components/PickerRateSection";
import makeStyles from "@material-ui/core/styles/makeStyles";
import getProductApi from "../api/getProductApi";
import DefaultProductPicture from "../assets/wallpaper-login.jpg";
import {Paper} from "@material-ui/core";
import Background from "../components/Background";

const useStyles = makeStyles(theme => ({
    main: {
        position: 'relative',
        paddingTop: '5rem',
        boxSizing: 'border-box',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productInfo: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    pickerRateSection: {
        height: 'auto',
        width: '50%',
        marginTop: '20px',
        padding: '20px'
    },
    productPictureContainer: {
        maxWidth: '50%',
        maxHeight: '300px'
    },
    productTitleContainer: {

    }
}));

export default function RateYourGiver(props) {
    const {id} = useParams();
    const classes = useStyles();
    const [data, setData] = useState({});


    useEffect(() => {
        getProductApi(id).then((res) => {
            setData(res);
        });
    }, []);

    return (
        <div className={classes.main}>
            <Background/>
            <Paper className={classes.productInfo}>
                <div className={classes.productPictureContainer}>
                    <img style={{maxWidth: '100%', maxHeight: '100%'}} alt={'pickeat product'}
                         src={(data?.image ? `https://minio.pickeat.fr/minio/download/products/${data?.image}?token=` : DefaultProductPicture)}/>
                </div>
                <span className="textMedium" style={{fontSize: '20px'}}>{data.title}</span>
            </Paper>
            <Paper className={classes.pickerRateSection}>
                <PickerRateSection redirect={'/product-list'} productId={id}/>
            </Paper>
        </div>
    );
}