import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ProductCard from './ProductCard';
import makeStyles from '@material-ui/core/styles/makeStyles';

mapboxgl.accessToken =
  'pk.eyJ1IjoicGlja2VhdCIsImEiOiJja2VzbDA0ejczMWFsMnhwaTk0MHFyY2o3In0.ejbEUU5u9zVINmEmOR81HQ';

const useStyles = makeStyles((theme) => ({
  popUpMap: {
    maxHeight: '400px',
    maxWidth: '250px',
  },
}));

const ProductListMap = (props) => {
  const mapContainerRef = useRef(null);

  // const useStyles = makeStyles(theme => ({
  //     marker: {
  //         backgroundImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/1334px-Map_marker.svg.png',
  //         backgroundSize: 'cover',
  //         width: '50px',
  //         height: '50px',
  //         borderRadius: '50%',
  //         cursor: 'pointer',
  //     },
  //     mapContainer: {
  //         // height: '400px'
  //     }
  // }));
  const classes = useStyles();
  const [zoom, setZoom] = useState(props.zoom);
  const history = useHistory();

  // Initialize map when component mounts
  useEffect(() => {
    if (!props.productList) {
      return;
    }
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      // center: [geoPosition.coords.longitude, geoPosition.coords.latitude], // starting position
      center: [props.location?.lng, props.location?.lat], // starting position
      zoom: zoom,
    });
    map.on('load', function () {
      map.resize();
    });
    if (props.lng && props.lat) {
      new mapboxgl.Marker().setLngLat([props.lng, props.lat]).addTo(map);
    }

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    // map.on('move', () => {
    //     setLng(map.getCenter().lng.toFixed(4));
    //     setLat(map.getCenter().lat.toFixed(4));
    //     setZoom(map.getZoom().toFixed(2));
    // });

    /*Add btn to geolocate user*/
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );

    const BuildPopUp = (index) => {
      return (
        '<h4>' +
        props.productList[index].title +
        // '<a href="https://app.pickeat.fr/#/product/'+ props.productList[index]._id +'" target="_blank">' +
        '<img style="height: 150px" src=' +
        'https://minio.pickeat.fr/minio/download/products/' +
        props.productList[index].image +
        '?token=' +
        '>' +
        // '</a>' +
        '</h4>'
      );
    };

    for (const index in props.productList) {
      const popUp = new mapboxgl.Popup({ className: classes.popUpMap }).setHTML(BuildPopUp(index));

      const newMarker = new mapboxgl.Marker()
        .setLngLat([props.productList[index].location[0], props.productList[index].location[1]])
        .setPopup(popUp)
        .addTo(map);

      const markerDiv = newMarker.getElement();

      markerDiv.addEventListener('mouseenter', () => newMarker.togglePopup());
      markerDiv.addEventListener('mouseleave', () => newMarker.togglePopup());
      markerDiv.addEventListener('click', () => {
        history.push(`/product/${props.productList[index]?._id}`);
      });
    }
    // for (props.lng && props.lat) {
    //     new mapboxgl.Marker()
    //         .setLngLat([props.lng, props.lat])
    //         .addTo(map);
    // }
    // Clean up on unmount
    return () => map.remove();
  }, [props.productList, props.location]);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default ProductListMap;
