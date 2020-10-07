import React, { useEffect, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import isAuth from '../helpers/isAuth';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logout from '../helpers/logout';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    zIndex: '100',
    top: '0',
    width: '100%',
    height: '5rem',
    backgroundColor: 'rgba(255, 255, 255)',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '30%',
  },
  link: {
    color: '#202020',
    textTransform: 'none',
    fontFamily: 'Colfax-Medium',
    fontSize: '1.1rem',
  },
  selected: {
    textDecoration: 'underline',
  },
  powerOffContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
  },
}));

export default function NavigationBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = useState(isAuth());

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setAuth(isAuth());
      if (window.location.hash.substring(2) === 'sign-in'
        || window.location.hash.substring(2) === 'sign-up')
        setAuth(false);
    });
  }, []);

  const buildToolbar = () => {
    if (!auth) {
      return (
        <>
            <div className={classes.linkContainer} style={{width: '20%'}}>
                <Link to={'/sign-in'}>
                    <Button className={classes.link}>
                        Sign In
                    </Button>
                </Link>
                <Link to={'/sign-up'}>
                    <Button className={classes.link}>
                        Sign Up
                    </Button>
                </Link>
            </div>
        </>
      );
    } else {
      return (
        <>
          <div className={classes.linkContainer}>
            <Link to={'/profile'}>
              <Button className={classes.link}>
                Profile
              </Button>
            </Link>
            <Link to={'/main'}>
              <Button className={classes.link}>
                Main
              </Button>
            </Link>
            <Link to={'/settings'}>
              <Button className={classes.link}>
                Settings
              </Button>
            </Link>
          </div>
          <div className={classes.powerOffContainer}>
            <IconButton onClick={() => logout()} aria-label="logout">
              <PowerSettingsNewIcon/>
            </IconButton>
          </div>
        </>
      );
    }
  };

  return (
    <Paper elevation={5} className={classes.bar}>
      {buildToolbar()}
    </Paper>
  );
}
