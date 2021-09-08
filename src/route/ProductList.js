import React, {useEffect, useState} from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import ProductCard from '../components/ProductCard';
import Grid from '@material-ui/core/Grid';
import getProductListApi from '../api/getProductList';
import CircularProgress from '@material-ui/core/CircularProgress';
import KmSlider from '../components/KmSlider';
import {toast} from 'react-toastify';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from 'react-router-dom';
import Background from "../components/Background";
import Rater from "../components/Rater";
import DateFilter from "../components/DateFilter";
import Pagination from '@material-ui/lab/Pagination';
import SearchProduct from "../components/SearchProduct";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
    paramsSectionContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '400px',
        height: '90%',
    },
    paramsSection: {
        width: '360px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '90px',
        boxSizing: 'border-box',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    productListSectionContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '80%',
        height: '90%',
    },
    filterContainer: {
        margin: '10px',
        width: '80%',
    },
    gridContainer: {
        maxWidth: '98%',
        height: '90%',
        maxHeight: '90%',
        overflowY: 'auto',
    },
    nothingToShow: {
        fontFamily: 'Colfax-Medium',
        fontSize: '25px',
        textAlign: 'center',
        color: 'white',
    },
    productCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        minWidth: '370px',
        height: '300px',
        width: '370px',
    },
    productCard: {
        height: '100%',
        width: '100%',
    },
}));

export default function ProductList(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [location, setLocation] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [sliderValue, setSliderValue] = useState(1);
    const [minRate, setMinRate] = useState(0);
    const [maxDate, setMaxDate] = useState(null);
    const [page, setPage] = useState(1);
    const [pageNb, setPageNb] = useState(1);
    const history = useHistory();
    const [viewProductMode, SetViewProductMode] = React.useState('list');

    const getProductList = (params) => {
        setIsLoading(true);
        getProductListApi(8, page - 1, params.search || searchValue, params.km || sliderValue, location, params.rate || minRate, params.date || maxDate).then((response) => {
            console.log(response);
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
        getProductList({km: sliderValue});
    }, []);

    useEffect(() => {
        getProductList({});
    }, [location, page]);

    const handleSliderChange = (event, newValue) => {
        event.preventDefault();
        setSliderValue(newValue);
    };

    const handleKmChange = (event) => {
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
        getProductList({search: newValue});
    };

    const handleDateChange = (newValue) => {
        setMaxDate(newValue);
        getProductList({date: newValue});
    };

    const handleViewProductMode = (event, newMode) => {
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
                        Sorry there is no product in this range... 😥 <br/>
                        Try to increase your search range !
                    </div>
                </div>
            );
        } else {
            return productList?.map((product, index) => {
                return (
                    <Grid item key={'product-' + index} className={classes.productCardContainer}>
                        <Paper elevation={2} className={classes.productCard}>
                            <ProductCard location={location} data={product}/>
                        </Paper>
                    </Grid>
                );
            });
        }
    };

    const BuildProductList = () => {
        if (viewProductMode === 'list') {
        return (
            <div>
                <Grid container spacing={3} className={classes.gridContainer}>
                    {buildGrid()}
                </Grid>
                <div style={{height: '10%', paddingTop: '30px'}}>
                    <Pagination page={page} onChange={(event, value) => {
                        setPage(value)
                    }} count={pageNb} variant="outlined" style={{color: 'white'}}/>
                </div>
            </div>
        )
        } else {
            return (
                <div>
                    maaaaaap
                </div>
            )
        }
    }

    return (
        <div className={classes.main}>
            <Background/>
            <div className={classes.paramsSectionContainer}>
                <Paper elevation={5} className={classes.paramsSection}>
                    <div className={classes.filterContainer}>
                        <SearchProduct label={"Search"} handleInputChange={handleSearchChange}/>
                    </div>
                    <div className={classes.filterContainer}>
                        <KmSlider getProductList={getProductList} value={sliderValue} handleBlur={handleBlur}
                                  handleInputChange={handleKmChange} handleSliderChange={handleSliderChange}/>
                    </div>
                    <div className={classes.filterContainer}>
                        <Rater label={"Minimal rate"} value={minRate} handleInputChange={handleRaterChange}/>
                    </div>
                    <div className={classes.filterContainer}>
                        <DateFilter label={"Maximal expiration date"} handleInputChange={handleDateChange}/>
                    </div>
                </Paper>
            </div>
            <div className={classes.productListSectionContainer}>
                <ToggleButtonGroup
                    value={viewProductMode}
                    exclusive
                    onChange={handleViewProductMode}
                    aria-label="view product mode"
                    style={{}}
                >
                    <ToggleButton value="list" aria-label="list">
                        List
                    </ToggleButton>
                    <ToggleButton value="map" aria-label="map">
                        Map
                    </ToggleButton>
                </ToggleButtonGroup>
                {BuildProductList()}
            </div>
            <div style={{position: 'absolute', right: '40px', bottom: '40px'}}>
                <Fab onClick={() => {
                    history.push('/add-product')
                }} style={{backgroundColor: 'white', color: '#40ee49'}} aria-label="add">
                    <AddIcon/>
                </Fab>
            </div>
        </div>
    );
}
