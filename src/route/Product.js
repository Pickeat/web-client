import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Background from '../components/Background';
import backgroundSrc from '../assets/wallpaper-login.jpg';
import fresh from '../assets/fresh.png'
import veggy from '../assets/veggy.png'
import logo from '../assets/logo.png';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import EventIcon from '@material-ui/icons/Event';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles(theme => ({
  main: {
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
    backgroundColor: 'white',
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
    fontSize: '20px'
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
    height: '100%'
  },
  productMapContainer: {
    width: '90%',
    height: '35%',
    backgroundColor: 'red',
  },
}));

export default function Product(props) {
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
  }, []);

  return (
    <div className={classes.main}>
      <Background src={backgroundSrc}/>
      <div className={classes.headerContainer}>
        <div className={classes.logoContainer}>
          <div className={classes.logoBackground}><img alt={'pickeat logo'} src={logo} style={{ width: '80%' }}/></div>
        </div>
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.userContainer}>
          <Paper className={classes.paper} style={{ flexDirection: 'column' }} elevation={10}>
            <div className={classes.profilePictureContainer}>
              <img alt={'giver profile'}
                   src={'https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg'}/>
            </div>
            <div className={classes.profileInfoContainer}>
              <div className="textMedium" style={{ fontSize: '20px', textAlign: 'center' }}>Francois Dujardin</div>
              <div className="textRegular" style={{ fontSize: '15px', textAlign: 'center' }}>Membre fondateur
                (01/01/2022)
              </div>
            </div>
            <div className={classes.profileRatingContainer}>
              <span className="textMedium" style={{ fontSize: '30px' }}>4/5</span>
              <Rating name="read-only" value={4} readOnly/>
            </div>
            <div className={classes.contactBtnContainer}>
              <Button className="pickeatBtn" style={{ width: '80%', height: '40px' }}>Contacter le giver</Button>
            </div>
          </Paper>
        </div>
        <div className={classes.productContainer}>
          <Paper className={classes.paper} style={{ flexDirection: 'column' }} elevation={10}>
            <div className={classes.productDataContainer}>
              <div className={classes.productPictureContainer}>
                <img style={{ maxWidth: '100%', maxHeight: '100%' }} alt={'pickeat product'}
                     src={'https://static.openfoodfacts.org/images/products/761/303/633/7342/front_fr.4.full.jpg'}/>
              </div>
              <div className={classes.productInfoContainer}>
                <div className={classes.productTitleContainer}>
                  <span className="textMedium" style={{ fontSize: '20px' }}>Pavé gourmand HERTA</span>
                </div>
                <div className={classes.productLittleInfoContainer}>
                  <div className={classes.productLittleInfoBlock}>
                    <div className={clsx("textMedium", classes.productLittleInfoLabel)}>Expiry date</div>
                    <div className={classes.productLittleInfoContent}>
                      <EventIcon fontSize={"large"}/><span className="textRegular" style={{marginLeft: '10px'}}>16/05/2018</span>
                    </div>
                  </div>
                  <div className={classes.productLittleInfoBlock}>
                    <div className={clsx("textMedium", classes.productLittleInfoLabel)}>Labels</div>
                    <div className={classes.productLittleInfoContent}>
                      <div className={classes.productLittleInfoImageLabelContainer}>
                        <img style={{ maxWidth: '100%', maxHeight: '100%' }} alt={"product label"} src={fresh}/>
                      </div>
                      <div className={classes.productLittleInfoImageLabelContainer}>
                        <img style={{ maxWidth: '100%', maxHeight: '100%' }} alt={"product label"} src={veggy}/>
                      </div>
                    </div>
                  </div>
                  <div className={classes.productLittleInfoBlock}>
                    <div className={clsx("textMedium", classes.productLittleInfoLabel)}>Distance</div>
                    <div className={classes.productLittleInfoContent}>
                      <RoomIcon fontSize={"large"}/><span className="textRegular" style={{marginLeft: '10px'}}>750m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.productMapContainer}>

            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
