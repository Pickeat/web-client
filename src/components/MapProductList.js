import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, {useState, useRef, useCallback, useEffect} from 'react'
import {render} from 'react-dom'
import MapGL, {Layer, Source} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import ReactMapGL, {Marker, NavigationControl, GeolocateControl, Popup} from 'react-map-gl';
import style from "./MapProductList.css"
import makeStyles from "@material-ui/core/styles/makeStyles";
import getProductListApi from "../api/getProductList";
import CircularProgress from "@material-ui/core/CircularProgress";
import defaultImage from "../assets/wallpaper-login.jpg";
import Avatar from "@material-ui/core/Avatar";
import logo from "../assets/logo.png"
import {useHistory} from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const MAPBOX_TOKEN = 'pk.eyJ1IjoicGlja2VhdCIsImEiOiJja2VzbDA0ejczMWFsMnhwaTk0MHFyY2o3In0.ejbEUU5u9zVINmEmOR81HQ'

const useStyles = makeStyles(theme => ({
    markerIcon: {
        width: '32px',
        height: '32px',
    },
    userAvatar: {
        width: '50px',
        height: '50px',
        border: 'solid 2px white',
        marginTop: '-20px',
    },
}))


const MapProductList = (props) => {
    const classes = useStyles();
    const geocoderContainerRef = useRef()
    const mapRef = useRef()
    const markerOffset = 0.00005;
    const history = useHistory();
    const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), [])
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [searchRadius, setSearchRadius] = useState(props.searchRadius);
    const [location, setLocation] = useState({lng: 3.0617, lat: 50.6350});
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const [viewport, setViewport] = useState({
        latitude: 50.6350,
        longitude: 3.0617,
        zoom: 13
    })

    const getProductList = () => {
        // setIsLoading(true);
        if (props.productList === undefined) {
        } else {
            // setIsLoading(false);
            setProductList(props.productList);
        }

    };

    useEffect(() => {
        getProductList()
    }, []);

    useEffect(() => {
        getProductList()
    }, [props.productList]);

    useEffect(() => {
        setSearchRadius(props.searchRadius)
    }, [props.searchRadius]);

    const navControlStyle = {
        right: 10,
        top: 50,
    };
    const geolocateControlStyle = {
        right: 10,
        top: 10
    };

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = {transitionDuration: 500}
            props.getProductList({size : 100, location: location});
            setLocation({lng: newViewport.longitude, lat :newViewport.latitude})
            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            })
        },
        [handleViewportChange]
    )

    const BuildMarkers = () => {
        return (
            Object.keys(productList).map((productKey, index) =>
                <CustomMarker
                    key={`marker-${index}`}
                    index={index}
                    product={productList[index]}
                />
            )
        )
    }

    const RandomiseOffset = (offset, seed) => {
        if (seed < 0)
            return (Math.sin(seed) * offset)
        else
            return (Math.cos(seed) * offset)

    }

    const closePopup = () => {
        setIsPopUpOpen(false)
        setSelectedIndex(null)
    };

    const openPopup = (index) => {
        setIsPopUpOpen(true)
        setSelectedIndex(index)
    }

    const CustomPopup = ({index, product, closePopup}) => {
        return (
            <Popup
                latitude={product.location[1] + RandomiseOffset(markerOffset, 0 - index)}
                longitude={product.location[0] + RandomiseOffset(markerOffset, index)}
                onClose={closePopup}
                closeButton={true}
                closeOnClick={false}
                offsetTop={-4}
            >
                <img alt={'product_image'}
                     src={(product.image ? `https://minio.pickeat.fr/minio/download/products/${product?.image}?token=` : defaultImage)}
                     style={{
                         maxWidth: '200px',
                         objectFit: 'cover',
                     }}
                     onClick={() => {
                         history.push(`/product/${productList[index]?._id}`)
                     }}
                />
                <Avatar alt="user_picture"
                        src={(product.user?.image ? `https://minio.pickeat.fr/minio/download/users/${product?.user?.image}?token=` : defaultImage)}
                        className={classes.userAvatar}/>
                <p style={{
                    textAlign: 'center',
                }}>{product.title}</p>
            </Popup>
        )
    };

    const CustomMarker = ({index, product}) => {
        return (
            <Marker
                longitude={product.location[0] + RandomiseOffset(markerOffset, index)}
                // longitude={product.longitude }
                latitude={product.location[1] + RandomiseOffset(markerOffset, 0 - index)}>
                {/*latitude={product.latitude + RandomiseOffset(0.00005)}>*/}
                <div className="marker" onClick={() => openPopup(index)}>
                    <img
                        alt="marker"
                        src={logo}
                        style={{
                            width: '32px',
                            height: '32px',
                        }}/>
                </div>
            </Marker>
        )
    };


    const createGeoJSONCircle = (center, radiusInKm, points) => {
        if (!points) points = 64;

        let coords = {
            latitude: center.lat,
            longitude: center.lng
        };

        let km = radiusInKm;

        let ret = [];
        let distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
        let distanceY = km / 110.574;

        let theta, x, y;
        for (let i = 0; i < points; i++) {
            theta = (i / points) * (2 * Math.PI);
            x = distanceX * Math.cos(theta);
            y = distanceY * Math.sin(theta);

            ret.push([coords.longitude + x, coords.latitude + y]);
        }
        ret.push(ret[0]);

        return {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [ret]
                }
            }]
        };
    };

    const geojson = {
        type: 'FeatureCollection',
        features: [
            {type: 'Feature', geometry: {type: 'Point', coordinates: location}}
        ]
    };

    const layerStyle = {
        id: 'point',
        type: 'fill',
        paint: {
            "fill-color": "#007cbf",
            "fill-opacity": 0.2,
        }
    };


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
    } else {
        return (
            <div style={{height: '100vh'}}>
                <div/>
                <MapGL
                    ref={mapRef}
                    {...viewport}
                    width="100%"
                    height="65%"
                    onViewportChange={handleViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}>
                    <NavigationControl style={navControlStyle}/>
                    <GeolocateControl
                        style={geolocateControlStyle}
                        positionOptions={{enableHighAccuracy: true}}
                        trackUserLocation={true}
                    />
                    <Geocoder
                        mapRef={mapRef}
                        containerRef={geocoderContainerRef}
                        onViewportChange={handleGeocoderViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        position="top-left"
                    />
                    <Source id="my-data" type="geojson" data={createGeoJSONCircle(location, searchRadius)}>
                        <Layer {...layerStyle} />
                    </Source>
                    {BuildMarkers()}
                    {
                        selectedIndex !== null &&
                        <CustomPopup
                            index={selectedIndex}
                            product={productList[selectedIndex]}
                            closePopup={closePopup}
                        />
                    }
                </MapGL>
            </div>
        )
    }
}

export default MapProductList;
