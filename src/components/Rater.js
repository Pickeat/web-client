import React, {useEffect} from 'react';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

export default function Rater(props) {
    useEffect(() => {
    }, []);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <Typography id="input-slider" gutterBottom>
                Minimal rate
            </Typography>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
            }}>
                <Rating value={props.value} onChange={(event, newValue) => {
                    props.handleInputChange(newValue)
                }} name="half-rating" precision={1}/>
            </div>
        </div>
    );
}

Rater.propTypes = {
    value: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func,
};
