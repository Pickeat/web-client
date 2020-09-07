import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Background from '../components/Background';
import backgroundSrc from '../assets/wallpaper-login.jpg';
import logo from '../assets/logo.png';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

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
    height: '100%'
  },
  productContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: '100%'
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    height: '90%'
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
    height: '20%'
  },
  contactBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: '40%',
  }
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
          <Paper className={classes.paper} style={{flexDirection: 'column'}} elevation={10}>
            <div className={classes.profilePictureContainer}>
              <img alt={"giver profile picture"} src={"https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg"}/>
            </div>
            <div className={classes.profileInfoContainer}>
              <div className="textMedium" style={{fontSize: '20px', textAlign: 'center'}}>Francois Dujardin</div>
              <div className="textRegular" style={{fontSize: '15px', textAlign: 'center'}}>Membre fondateur (01/01/2022)</div>
            </div>
            <div className={classes.profileRatingContainer}>
              <span className="textMedium" style={{fontSize: '30px'}}>4/5</span>
              <Rating name="read-only" value={4} readOnly/>
            </div>
            <div className={classes.contactBtnContainer}>
              <Button className="pickeatBtn" style={{width: '80%', height: '40px'}}>Contact the giver</Button>
            </div>
          </Paper>
        </div>
        <div className={classes.productContainer}>
          <Paper className={classes.paper} style={{flexDirection: 'column'}} elevation={10}>

          </Paper>
        </div>
      </div>
    </div>
  );
}
