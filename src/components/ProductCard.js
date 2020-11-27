import React, { useEffect, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import RoomIcon from '@material-ui/icons/Room';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import * as moment from 'moment';
import { isEmpty } from '../helpers/isEmpty';
import { getDistance } from 'geolib';
import { toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import defaultImage from '../assets/wallpaper-login.jpg'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiButton-label': {
      flexDirection: 'column',
    },
  },
  productImgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '70%',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  userAvatar: {
    width: '50px',
    height: '50px',
    border: 'solid 2px white',
    marginTop: '-40px',
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log(location);
        if (!isEmpty(data))
          setProductDistance(getDistance(
            { latitude: location.coords.latitude, longitude: location.coords.longitude },
            { latitude: data?.location?.lat, longitude: data?.location?.lng }));
      });
    } else {
      toast.error('Geolocation is not supported by this browser.');
      setProductDistance(-1);
    }
  }, [data]);

  const buildProductCard = () => {
    if (isEmpty(data)) {
      return (
        <div className={classes.main} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress/>
        </div>
      );
    } else {
      return (
        <Button onClick={() => {
          history.push(`/product/${data?._id}`);
        }} className={classes.main}>
          <div className={classes.productImgContainer}>
            <img alt={'product_image'} src={(data.product_image ? data?.product_image : defaultImage)}
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
          <div className={classes.infoContainer}>
            <Avatar alt="user_picture" src={data?.user?.profile_image} className={classes.userAvatar}/>
            <div className={classes.cardBottom}>
              {productDistance !== -1 &&
                <div style={{ display: 'flex' }}><RoomIcon/>
                  <div style={{ lineHeight: '22px' }}>{productDistance}m</div>
                </div>
              }
              {data.expiration_date &&
              <div style={{ display: 'flex' }}><EventAvailableIcon/>
                <div style={{
                  lineHeight: '22px',
                  marginLeft: '5px',
                }}>{moment(data?.expiration_date).format('DD/MM/YYYY')}</div>
              </div>
              }
            </div>
          </div>
        </Button>
      );
    }
  };

  return buildProductCard();
}
