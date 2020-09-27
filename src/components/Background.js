import React, { useEffect } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  backgroundContainer: {
    zIndex: '-1',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    overflowY: 'hidden',
  },
  background: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
  },
}));

export default function Background(props) {
  const classes = useStyles();

  useEffect(() => {
  }, []);

  return (
    <div className={classes.backgroundContainer}>
      <img className={classes.background}
           src={props.src}
           alt={'background'}/>
    </div>
  );
}

Background.propTypes = {
  src: PropTypes.string.isRequired,
};
