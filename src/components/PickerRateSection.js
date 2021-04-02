import React, {useEffect, useState} from 'react';
import Rater from "./Rater";
import {Button} from "@material-ui/core";
import rateGiverApi from "../api/rateGiverApi";
import PropTypes from "prop-types";

export default function PickerRateSection(props) {
    const [rate, setRate] = useState(0);
    useEffect(() => {
    }, []);

    const inputHandler = (newValue) => {
        setRate(newValue);
    }

    const rateGiver = (rate) => {
        rateGiverApi(props.productId, rate).then((status) => {
            if (status)
                window.location.reload();
        })
    }

    return (
        <div style={{width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{width: '40%'}}>
                <Rater value={rate} label={"Rate the giver"} handleInputChange={inputHandler}/>
            </div>
            <div style={{width: '100%', height: 'auto', display: 'flex', justifyContent: 'flex-end', marginTop: '30px'}}>
                <Button style={{width: '33%'}} className="pickeatBtn" onClick={() => {rateGiver(rate)}}>Send !</Button>
            </div>
        </div>
    );
}

PickerRateSection.propTypes = {
    productId: PropTypes.string.isRequired,
};
