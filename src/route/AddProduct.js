import React, {useEffect, useState} from 'react';

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
import {startScanner, stopScanner} from "../helpers/scanner";
import Modal from "../components/Modal";
import getProductWithBarCode from "../api/getProductWithBarCode";
import {CropFree} from "@material-ui/icons";
import OpenFoodFactInput from "../components/OpenFoodFactInput";

const useStyles = makeStyles(theme => ({
    main: {
        position: 'relative',
        paddingTop: '50px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '700px',
        height: '100%',
        paddingTop: '70px'
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
    const [scanModalOpen, setScanModalOpen] = React.useState(false);
    const history = useHistory();

    useEffect(() => {
        if (scanModalOpen) {
            startScanner((res) => {
                console.log(res.codeResult.code);
                stopScanner();
                setScanModalOpen(false);
                getProductWithBarCode(res.codeResult.code).then((product) => {
                    console.log(product);
                    if (product) {
                        setTitle(product?.title);
                        setLabels(product?.labels);
                    }
                })
            });
        }
    }, [scanModalOpen])

    const handleChange = (event) => {
        setLabels(event.target.value);
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

    const handleOffChange = (product) => {
        getProductWithBarCode(product.value).then((product) => {
            console.log(product);
            if (product) {
                setTitle(product?.title);
                setLabels(product?.labels);
            }
        })
    }

    return (
        <div className={classes.main}>
            <Modal show={scanModalOpen} width={"700px"} title={"Scannez votre produit"} onClose={() => {
                stopScanner();
                setScanModalOpen(false)
            }
            }>
                <div id="scanner-container"/>
            </Modal>
            <Paper className={classes.content} elevation={12}>
                <BackArrow/>
                <button
                    type="button"
                    className="absolute top-4 right-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => setScanModalOpen(true)}
                >
                    Scan
                    <CropFree className="ml-3 -mr-1 h-5 w-5" aria-hidden="true"/>
                </button>
                <form className={classes.form}>
                    <OpenFoodFactInput autoFocus handleChange={handleOffChange}/>
                    <PickeatTextField
                        variant="outlined"
                        margin="normal"
                        style={{margin: '20px'}}
                        required
                        fullWidth
                        id="title"
                        label="Nom"
                        name="title"
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
                            label="Image"
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
                        <InputLabel style={{marginLeft: '10px'}}>Date d'expiration</InputLabel>
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
                    <Button onClick={submitNewProduct} style={{width: '200px', margin: '20px'}} className="pickeatBtn h-10">Donner mon produit</Button>
                </form>
            </Paper>
        </div>
    );
}
