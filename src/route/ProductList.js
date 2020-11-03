import React, { useEffect, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import ProductCard from '../components/ProductCard';
import Grid from '@material-ui/core/Grid';
import getProductList from '../api/getProductList';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: '#a8eeaa',
    paddingTop: '5rem',
    boxSizing: 'border-box',
    height: '100vh',
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    width: '64%',
    height: '90%',
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

  useEffect(() => {
    getProductList().then((response) => {
      setProductList(response);
      setIsLoading(false);
    });
  }, []);

  const buildGrid = () => {
    if (isLoading) {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress/>
        </div>
      );
    } else if (!isLoading && productList.length === 0) {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className={classes.nothingToShow}>
            Sorry there is no product in this range... 😥 <br/>
            Try to increase your search range !
          </div>
        </div>
      );
    } else {
      return productList.map((product, index) => {
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
      <Grid container spacing={3} className={classes.gridContainer}>
        {buildGrid()}
      </Grid>
    </div>
  );
}
