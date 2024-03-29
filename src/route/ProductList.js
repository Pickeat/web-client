import React, {useEffect, useState} from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import ProductCard from '../components/ProductCard';
import Grid from '@material-ui/core/Grid';
import getProductListApi from '../api/getProductList';
import CircularProgress from '@material-ui/core/CircularProgress';
import KmSlider from '../components/KmSlider';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom';
import Rater from "../components/Rater";
import DateFilter from "../components/DateFilter";
import Pagination from '@material-ui/lab/Pagination';
import SearchProduct from "../components/SearchProduct";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Map from "../components/Map";
import MapProductList from "../components/MapProductList";

const useStyles = makeStyles(theme => ({
    main: {
        position: 'relative',
        //height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '70px 50px'
    },
    paramsSectionContainer: {
        display: 'flex',
        //justifyContent: 'center',
        //alignItems: 'center',
        width: '400px',
        height: '600px',
    },
    paramsSection: {
        width: '360px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '50px 20px',
        margin: '0px auto',
//        paddingTop: '90px',
//        boxSizing: 'border-box',
        backgroundColor: 'white',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '90%',
        height: 'auto',
        padding: '0px 50px'
        // backgroundColor: 'black',
    },
    productListSectionContainer: {
        display: 'flex',
//        justifyContent: 'center',
//        alignItems: 'center',
        height: '590px',
        flexDirection: 'column',
        width: '100%',
    },
    pagination: {
        marginTop: '10px'
    },
    toggleViewProductModeButton: {
        display: 'flex',
        height: '5%',
        paddingBottom: '1%'
    },
    filterContainer: {
        margin: '10px',
        width: '100%',
    },
    gridContainer: {
        maxWidth: '100%',
        height: '100%',
        maxHeight: '100%',
        overflowY: 'auto',
    },
    nothingToShow: {
        fontFamily: 'Colfax-Medium',
        fontSize: '25px',
        textAlign: 'center',
        color: '#1b1b1b',
    },
    productCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50%',
        // minWidth: '250px',
        height: '50%',
        width: '20%',
        minWidth: '200px'
    },
    productCard: {
        height: '100%',
        width: '100%',
    },
    productMapContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
}));

export default function ProductList(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [location, setLocation] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [sliderValue, setSliderValue] = useState(3);
    const [minRate, setMinRate] = useState(0);
    const [maxDate, setMaxDate] = useState(null);
    const [page, setPage] = useState(1);
    const [pageNb, setPageNb] = useState(1);
    const history = useHistory();
    const [viewProductMode, SetViewProductMode] = React.useState('list');

    const getProductList = (params) => {
        setIsLoading(true);
        let search = params.search;
        if (params.search === undefined)
            search = searchValue
        getProductListApi(10, page - 1, search, params.km || sliderValue, location, params.rate || minRate, params.date || maxDate).then((response) => {
            setProductList(response.docs);
            setPageNb(response.totalPages);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                setLocation({lng: location?.coords?.longitude, lat: location?.coords?.latitude});
            });
        } else {
            toast.error('Geolocation is not supported by this browser.');
            setLocation(-1);
        }
        setIsLoading(true);
        getProductList({km: sliderValue});
    }, []);

    useEffect(() => {
        getProductList({});
    }, [location, page, viewProductMode]);

    const handleSliderChange = (event, newValue) => {
        event.preventDefault();
        setIsLoading(true);
        setSliderValue(newValue);
    };

    const handleKmChange = (event) => {
        setIsLoading(true);
        if (event.target.value < 0) {
            setSliderValue(0);
        } else if (event.target.value > 35) {
            setSliderValue(35);
        }
        setSliderValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleRaterChange = (newValue) => {
        setMinRate(newValue);
        getProductList({rate: newValue});
    };

    const handleSearchChange = (newValue) => {
        setSearchValue(newValue);
        getProductList({search: (newValue.length === 0 ? "" : newValue)})
    };

    const handleDateChange = (newValue) => {
        setMaxDate(newValue);
        getProductList({date: newValue});
    };

    const handleViewProductMode = (event, newMode) => {
        if (newMode)
            SetViewProductMode(newMode);
    };

    const handleBlur = () => {
        if (sliderValue < 0) {
            setSliderValue(0);
        } else if (sliderValue > 35) {
            setSliderValue(35);
        }
    };

    const buildGrid = () => {
        if (isLoading) {
            return (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress/>
                </div>
            );
        } else if (!isLoading && productList?.length === 0) {
            return (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div className={classes.nothingToShow}>
                        Désolé, il n'y a pas de produit à cette distance... 😥 <br/>
                        Essayez d'élargir votre champ de recherche !
                    </div>
                </div>
            );
        } else {
            return productList?.map((product, index) => {
                return (
                    <Grid item key={'product-' + index} className={classes.productCardContainer}>
                        <div className="h-full w-full">
                            <ProductCard location={location} data={product}/>
                        </div>
                    </Grid>
                );
            });
        }
    };

    const BuildProductList = () => {
        if (viewProductMode === 'list') {
            return (
                <>
                    <Grid container spacing={2} className={classes.gridContainer}>
                        {buildGrid()}
                    </Grid>
                </>
            )
        } else {
            return (
                <div className={classes.productMapContainer}>
                    <MapProductList location={location} productList={productList} zoom={17}/>
                </div>
            )
        }
    }

    const BuildParams = () => {
        return (
        <div className={classes.paramsSectionContainer}>

            <Paper elevation={3} className={classes.paramsSection}>
                <div className={classes.filterContainer}>
                    <SearchProduct label={"Recherche"} handleInputChange={handleSearchChange}/>
                </div>
                <div className={classes.filterContainer}>
                    <KmSlider getProductList={getProductList} value={sliderValue} handleBlur={handleBlur}
                              handleInputChange={handleKmChange} handleSliderChange={handleSliderChange}/>
                </div>
                <div className={classes.filterContainer}>
                    <Rater label={"Note minimale"} value={minRate} handleInputChange={handleRaterChange}/>
                </div>
                <div className={classes.filterContainer}>
                    <DateFilter label={"Date d\'expiration maximale"} handleInputChange={handleDateChange}/>
                </div>
            </Paper>
        </div>
        )
    }

    const BuildToggleButton = () => {
            return (
                <ToggleButtonGroup
                    value={viewProductMode}
                    exclusive
                    onChange={handleViewProductMode}
                    aria-label="view product mode"
                    className={classes.toggleViewProductModeButton}
                >
                    <ToggleButton value="list" aria-label="list">
                        Liste
                    </ToggleButton>
                    <ToggleButton value="map" aria-label="map">
                        Carte
                    </ToggleButton>
                </ToggleButtonGroup>
            )
    }

    return (
        <div className={classes.main}>
            {BuildToggleButton()}
            <div className="flex">
                {BuildParams()}
                <div className={classes.rightSection}>
                    <div className={classes.productListSectionContainer}>
                        {BuildProductList()}
                    </div>
                    {(productList?.length && viewProductMode === 'list') &&
                    <div className={classes.pagination}>
                        <Pagination page={page} onChange={(event, value) => {
                            setPage(value)
                        }} count={pageNb} variant="outlined" style={{color: 'white'}}/>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}
