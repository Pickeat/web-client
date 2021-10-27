import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import axios from "axios";

export default function OpenFoodFactInput(props) {
    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: '9999'
        }),
        control: (provided, state) => ({
            ...provided,
            height: '56px',
            border: '1px solid black',
            boxShadow: `0 0 0 1px ${() => {
                if (state.isSelected)
                    return 'green'
                else
                    return 'black'
            }}`,
            '&:hover': {
                boxShadow: `0 0 0 1px green`
            },
            borderRadius: '5px'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            marginLeft: '10px',
        }),
        input: (provided, state) => ({
            ...provided,
            marginLeft: '10px',
        }),
    }
    const [productSuggestion, setProductSuggestion] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {

    }, []);

    const handleInputChange = (_inputValue, opt) => {
        // Prevents resetting our input after option has been selected
        setInputValue(_inputValue);
        if (opt.action === 'input-change') {
            axios.get("https://world.openfoodfacts.org/cgi/search.pl", {
                params: {
                    search_terms: _inputValue,
                    search_simple: 1,
                    action: 'process',
                    json: 1
                },
            }).then((_productSuggestion) => {
                const mapProductSuggestion = _productSuggestion.data.products.map((product) => {
                    return {
                        label: product['product_name_fr'],
                        value: product['code']
                    }
                })
                setProductSuggestion(mapProductSuggestion);
            })
        }
    }

    return (
        <div className="w-full">
            <Select
                styles={customStyles}
                value={inputValue}
                onChange={props.handleChange}
                placeholder={"Chercher un produit..."}
                onInputChange={handleInputChange}
                width="100%"
                options={productSuggestion}
            />
        </div>
    )
}