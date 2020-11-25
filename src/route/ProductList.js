import React, { useEffect, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import ProductCard from '../components/ProductCard';
import Grid from '@material-ui/core/Grid';
import getProductList from '../api/getProductList';
import CircularProgress from '@material-ui/core/CircularProgress';
import KmSlider from '../components/KmSlider';

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: '#a8eeaa',
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
    width: '20%',
    height: '90%',
  },
  paramsSection: {
    width: '95%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  productListSectionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '90%',
  },
  sliderContainer: {
    width: '80%',
  },
  gridContainer: {
    maxWidth: '80%',
    height: '100%',
    maxHeight: '90%',
    overflowY: 'scroll',
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
    minWidth: '400px',
    height: '300px',
    width: '400px',
  },
  productCard: {
    height: '100%',
    width: '100%',
  },
}));

export default function ProductList(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState(1);

  const getProductListByKm = (km) => {
    setIsLoading(true);
    getProductList(km).then((response) => {
      setProductList(response);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getProductListByKm(1);
  }, []);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleInputChange = (event) => {
    if (event.target.value < 0) {
      setSliderValue(0);
    } else if (event.target.value > 35) {
      setSliderValue(35);
    }
    setSliderValue(event.target.value === '' ? '' : Number(event.target.value));
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
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress/>
        </div>
      );
    } else if (!isLoading && productList?.length === 0) {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
              <ProductCard data={product}/>
            </Paper>
          </Grid>
        );
      });
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.paramsSectionContainer}>
        <Paper elevation={5} className={classes.paramsSection}>
          <div className={classes.sliderContainer}>
            <KmSlider getProductListByKm={getProductListByKm} value={sliderValue} handleBlur={handleBlur}
                      handleInputChange={handleInputChange} handleSliderChange={handleSliderChange}/>
          </div>
        </Paper>
      </div>
      <div className={classes.productListSectionContainer}>
        <Grid container spacing={3} className={classes.gridContainer}>
          {buildGrid()}
        </Grid>
      </div>
    </div>
);
}
