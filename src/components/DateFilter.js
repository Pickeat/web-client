import React, {useEffect} from 'react';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {InputLabel} from "@material-ui/core";
import {PickeatTextField} from "./PickeatTextField";

export default function DateFilter(props) {
    useEffect(() => {
    }, []);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <Typography id="input-slider" gutterBottom>
                {props.label}
            </Typography>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
            }}>
                <PickeatTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="date"
                    id="date"
                    name="date"
                    onChange={(event) => {props.handleInputChange(event.target.value)}}
                />
            </div>
        </div>
    );
}

DateFilter.propTypes = {
    handleInputChange: PropTypes.func,
    label: PropTypes.string.isRequired
};
