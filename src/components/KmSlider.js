import React, { useEffect } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({}));

export default function KmSlider(props) {
  const classes = useStyles();

  useEffect(() => {
  }, []);

  return (
    <div style={{width: '100%', height: '100%'}}>
      <Typography id="input-slider" gutterBottom>
        Distance
      </Typography>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
      }}>
        <div style={{ width: '10%' }}>
          <RoomIcon/>
        </div>
        <div style={{ width: '60%' }}>
          <Slider
            style={{ color: 'white' }}
            value={props.value}
            max={35}
            onChange={props.handleSliderChange}
            aria-labelledby="input-slider"
            onChangeCommitted={(event, value) => {
              props.getProductListByKm(value);
            }}
          />
        </div>
        <form onSubmit={(event) => {
          event.stopPropagation();
          props.getProductListByKm(props.value);
        }} style={{ width: '20%' }}>
          <input onBlur={props.handleBlur} title={'Press enter to validate'} type={'number'} style={{ width: '100%' }}
                 value={props.value}
                 onChange={props.handleInputChange}/>
        </form>
      </div>
    </div>
  );
}

KmSlider.propTypes = {
  value: PropTypes.number.isRequired,
  getProductListByKm: PropTypes.func.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};
