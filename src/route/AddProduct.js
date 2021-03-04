import React, {useState} from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import {PickeatTextField} from "../components/PickeatTextField";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import {Chip, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import addProductApi from "../api/addProductApi";
import BackArrow from "../components/BackArrow";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import Background from "../components/Background";

const useStyles = makeStyles(theme => ({
    main: {
        position: 'relative',
        paddingTop: '5rem',
        boxSizing: 'border-box',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '700px',
        height: '90%'
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '80%',
        height: '100%',
    },
    imageInputSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    dateInputSection: {
        margin: '20px',
        display: 'flex',
        width: '100%',
        flexDirection: "column"
    },
    labelsInputSection: {
        margin: '20px',
        display: 'flex',
        width: '100%',
        flexDirection: "column"
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
        fontFamily: 'colfax-regular',
        fontSize: '15px'
    },
}));

const labelList = [
    'fresh',
    'gluten_free',
    'halal',
    'kosher',
    'vegan',
    'veggie',
];

function getStyles(labelList, labels) {
    return {
        fontFamily:
            labelList.indexOf(labels) === -1
                ? 'Colfax-regular'
                : 'Colfax-medium',
    };
}

export default function AddProduct(props) {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageName, setImageName] = useState("");
    const [image, setImage] = useState(null);
    const [date, setDate] = useState(null);
    const [labels, setLabels] = React.useState([]);
    const history = useHistory();

    const handleChange = (event) => {
        setLabels(event.target.value);
    };

    const handleChangeMultiple = (event) => {
        const {options} = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setLabels(value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
        setImageName(event.target.files[0].name);
    }

    const submitNewProduct = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                const userLocation = {lng: location?.coords?.longitude, lat: location?.coords?.latitude};
                addProductApi(image, title, userLocation, description, date, labels).then((e) => {
                    if (e != null)
                        history.push('/product-list');
                });
            }, () => {
                toast.error('Geolocation is not supported by this browser.');
            });
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    }

    return (
        <div className={classes.main}>
            <Background/>
            <Paper className={classes.content} elevation={12}>
                <BackArrow/>
                <form className={classes.form}>
                    <PickeatTextField
                        variant="outlined"
                        margin="normal"
                        style={{margin: '20px'}}
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoFocus
                        value={title}
                        onChange={(event => setTitle(event.target.value))}
                    />
                    <PickeatTextField
                        variant="outlined"
                        rows={3}
                        margin="normal"
                        style={{margin: '20px'}}
                        fullWidth
                        multiline
                        id="description"
                        label="Description"
                        name="description"
                        value={description}
                        onChange={(event => setDescription(event.target.value))}
                    />
                    <div className={classes.imageInputSection}>
                        <PickeatTextField
                            variant="outlined"
                            margin="normal"
                            style={{width: '80%'}}
                            required
                            fullWidth
                            id="imageName"
                            label="Product image"
                            name="image"
                            value={imageName}
                        />
                        <Button style={{width: '15%', height: '55px'}} variant="contained" component="label"> <AddIcon/>
                            <input
                                onChange={handleImageChange}
                                type="file"
                                accept="image/*"
                                hidden
                            />
                        </Button>
                    </div>
                    <div className={classes.dateInputSection}>
                        <InputLabel style={{marginLeft: '10px'}}>Expiry date</InputLabel>
                        <PickeatTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={(event => setDate(event.target.value))}
                        />
                    </div>
                    <div className={classes.labelsInputSection}>
                        <InputLabel style={{marginLeft: '10px'}}>Labels</InputLabel>
                        <Select
                            style={{marginTop: '20px'}}
                            id="labels-select"
                            multiple
                            value={labels}
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip"/>}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip}/>
                                    ))}
                                </div>
                            )}
                        >
                            {labelList.map((label) => (
                                <MenuItem key={label} value={label} style={getStyles(labelList, labels)}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <Button onClick={submitNewProduct} style={{width: '200px', margin: '20px'}} className="pickeatBtn">Give
                        my product</Button>
                </form>
            </Paper>
        </div>
    );
}
