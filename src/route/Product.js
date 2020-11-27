import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Background from '../components/Background';
import backgroundSrc from '../assets/wallpaper-login.jpg';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import EventIcon from '@material-ui/icons/Event';
import RoomIcon from '@material-ui/icons/Room';
import * as moment from 'moment';
import { isEmpty } from '../helpers/isEmpty';
import CircularProgress from '@material-ui/core/CircularProgress';
import Map from '../components/Map';
import { getDistance } from 'geolib';
import { toast } from 'react-toastify';
import getProductApi from '../api/getProductApi';
import DefaultProfilePicture from '../assets/unknow_picture_user.jpg'
import DefaultProductPicture from '../assets/wallpaper-login.jpg'

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
  contactBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: '40%',
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
    height: '30%',
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
  const { id } = useParams();
  const [data, setData] = useState({});
  const [productDistance, setProductDistance] = useState(-1);

  useEffect(() => {
    getProductApi(id).then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log(location);
        if (!isEmpty(data))
          setProductDistance(getDistance(
            { latitude: location.coords.latitude, longitude: location.coords.longitude },
            { latitude: data?.product.location.lat, longitude: data?.product.location.lng }));
      });
    } else {
      toast.error('Geolocation is not supported by this browser.');
      setProductDistance(-1);
    }
  }, [data]);

  const buildProductDistance = () => {
    if (productDistance === -1)
      return ('Sorry we had a problem computing the distance');
    return productDistance + 'm';
  };

  if (isEmpty(data))
    return (
      <div className={classes.main} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress/>
      </div>
    );
  return (
    <div className={classes.main}>
      <Background src={backgroundSrc}/>
      <div className={classes.contentContainer}>
        <div className={classes.userContainer}>
          <Paper className={classes.paper} style={{ flexDirection: 'column' }} elevation={10}>
            <div className={classes.profilePictureContainer}>
              <img style={{ maxWidth: '100%', maxHeight: '100%' }}
                   alt={'giver profile picture'}
                   src={(data?.user?.profile_image ? data?.user?.profile_image : DefaultProfilePicture)}/>
            </div>
            <div className={classes.profileInfoContainer}>
              <div className="textMedium" style={{ fontSize: '20px', textAlign: 'center' }}>{data?.user?.name}</div>
              <div className="textRegular" style={{ fontSize: '15px', textAlign: 'center' }}>{data?.user?.level} member<br/>
                ({moment(data?.user?.created_at).format('DD/MM/YYYY')})
              </div>
            </div>
            <div className={classes.profileRatingContainer}>
              <span className="textMedium"
                    style={{ fontSize: '30px' }}>{(data?.user?.note ? `${data?.user?.note}/5` : 'No note yet')}</span>
              <Rating name="read-only" value={data?.user?.note} readOnly/>
            </div>
            <div className={classes.contactBtnContainer}>
              <Button className="pickeatBtn" style={{ width: '80%', height: '40px' }}>Contact the giver</Button>
            </div>
          </Paper>
        </div>
        <div className={classes.productContainer}>
          <Paper className={classes.paper} style={{ flexDirection: 'column' }} elevation={10}>
            <div className={classes.productDataContainer}>
              <div className={classes.productPictureContainer}>
                <img style={{ maxWidth: '100%', maxHeight: '100%' }} alt={'pickeat product'}
                     src={(data?.product_image ? data?.product_image : DefaultProductPicture)}/>
              </div>
              <div className={classes.productInfoContainer}>
                <div className={classes.productTitleContainer}>
                  <span className="textMedium" style={{ fontSize: '20px' }}>{data?.title}</span>
                </div>
                <div className={classes.productLittleInfoContainer}>
                  <div className={classes.productLittleInfoBlock}>
                    <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Description</div>
                    <div className={classes.productLittleInfoContent}>
                      <span className="textRegular"
                            style={{ marginLeft: '10px' }}>
                        {data.description}
                      </span>
                    </div>
                  </div>
                  <div className={classes.productLittleInfoBlock}>
                    <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Expiry date</div>
                    <div className={classes.productLittleInfoContent}>
                      <EventIcon fontSize={'large'}/>
                      <span className="textRegular"
                            style={{ marginLeft: '10px' }}>
                        {moment(data?.expiration_date).format('DD/MM/YYYY')}
                      </span>
                    </div>
                  </div>
                  <div className={classes.productLittleInfoBlock}>
                    <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Labels</div>
                    <div className={classes.productLittleInfoContent}>
                      {
                        data?.labels?.map((label) => {
                          return (
                            <div title={label} key={label} className={classes.productLittleInfoImageLabelContainer}>
                              <img style={{ maxWidth: '100%', maxHeight: '100%' }}
                                   alt={'product label'}
                                   src={`/assets/food-label/${label}.png`}
                              />
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                  <div className={classes.productLittleInfoBlock}>
                    <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Distance</div>
                    <div className={classes.productLittleInfoContent}>
                      <RoomIcon fontSize={'large'}/>
                      <span className="textRegular"
                            style={{ marginLeft: '10px' }}>
                        {buildProductDistance()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Paper elevation={4} className={classes.productMapContainer}>
              <Map lat={data?.product?.location.lat} lng={data?.product?.location.lng} zoom={17}/>
            </Paper>
          </Paper>
        </div>
      </div>
    </div>
  );
}
