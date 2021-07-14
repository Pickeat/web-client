import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import DateFilter from "./DateFilter";

export default function SearchProduct(props) {
    useEffect(() => {
    }, []);

    return (
        <div style={{width: '90%', height: '100%'}}>
            <Typography id="input-slider" gutterBottom>
                {props.label}
            </Typography>
            <div className="mt-1">
                <input
                    type="text"
                    name="search"
                    id="search-bar"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search what you're hungry for"
                    onChange={(event) => {
                        props.handleInputChange(event.target.value)
                    }}
                />
            </div>
        </div>
    );
}

SearchProduct.propTypes = {
    handleInputChange: PropTypes.func,
    label: PropTypes.string.isRequired
};
