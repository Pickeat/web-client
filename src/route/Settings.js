import React, { useEffect, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: '5rem',
    boxSizing: 'border-box',
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSection: {
    height: '100%',
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    borderRight: 'solid 1px #d6d6d6',
  },
  menuSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  rightSection: {
    height: '100%',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContentSection: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  menuButtonContainer: {
    width: '100%',
    height: '75px',
  },
  menuButton: {
    border: 'solid 1px #d6d6d6',
    borderTop: 'none',
    borderRight: 'none',
    width: '100%',
    height: '100%',
    textTransform: 'none',
    fontFamily: 'Colfax-Regular',
    fontSize: '14px',
    justifyContent: 'normal',
  },
  menuButtonText: {
    fontFamily: 'Colfax-Medium',
    position: 'absolute',
    left: '22%',
    lineHeight: '0px',
  },
  menuButtonSelected: {
    position: 'absolute',
    left: '85%',
    width: '7%',
  },
}));

export default function Settings(props) {
  const classes = useStyles();
  const [activePage, setActivePage] = useState(0);
  const componentList = [
    { key: 0, component: <div style={{ width: '100%', height: '100%' }}>TOTOT</div> },
    { key: 1, component: <div style={{ width: '100%', height: '100%' }}>TATAT</div> },
    { key: 2, component: <div style={{ width: '100%', height: '100%' }}>TiTiT</div> },
    { key: 3, component: <div style={{ width: '100%', height: '100%' }}>TOUTOUM</div> },
  ];

  useEffect(() => {
  }, []);

  const buildMainContent = () => {
    const elem = componentList.find((elem) => elem.key === activePage);
    if (!elem)
      return <div>ERROR</div>;
    return elem.component;
  };

  return (
    <div className={classes.main}>
      <div className={classes.leftSection}>
        <div className={classes.menuSection}>
          <div className={classes.menuButtonContainer}>
            <Button onClick={() => setActivePage(0)} className={classes.menuButton}>
              <div className={classes.menuButtonText}>Change password</div>
            </Button>
          </div>
          <div className={classes.menuButtonContainer}>
            <Button onClick={() => setActivePage(1)} className={classes.menuButton}>
              <div className={classes.menuButtonText}>Change mail</div>
            </Button>
          </div>
          <div className={classes.menuButtonContainer}>
            <Button onClick={() => setActivePage(2)} className={classes.menuButton}>
              <div className={classes.menuButtonText}>Change phone number</div>
            </Button>
          </div>
          <div className={classes.menuButtonContainer}>
            <Button onClick={() => setActivePage(3)} className={classes.menuButton}>
              <div className={classes.menuButtonText}>Delete account</div>
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.rightSection}>
        <div className={classes.mainContentSection}>
          {buildMainContent()}
        </div>
      </div>
    </div>
  );
}
