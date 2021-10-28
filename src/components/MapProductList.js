import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useRef, useCallback } from 'react'
import { render } from 'react-dom'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import ReactMapGL, {NavigationControl, GeolocateControl} from 'react-map-gl';
import style from "./MapProductList.css"


const MAPBOX_TOKEN = 'pk.eyJ1IjoicGlja2VhdCIsImEiOiJja2VzbDA0ejczMWFsMnhwaTk0MHFyY2o3In0.ejbEUU5u9zVINmEmOR81HQ'

const MapProductList = () => {
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    })
    const geocoderContainerRef = useRef()
    const mapRef = useRef()
    const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), [])


    const navControlStyle= {
        right: 10,
        top: 115,
    };

    const geolocateControlStyle= {
        right: 10,
        top: 85
    };

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 }

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            })
        },
        [handleViewportChange]
    )

    return (
        <div style={{ height: '100vh' }}>
            <div  />
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="65%"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}>
                <NavigationControl style={navControlStyle} />
                <GeolocateControl
                    style={geolocateControlStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                    auto
                />
                <Geocoder
                    mapRef={mapRef}
                    containerRef={geocoderContainerRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position="top-left"
                />
            </MapGL>
        </div>
    )
}

export default MapProductList;


// import React, {PureComponent} from 'react';
// import ReactMapGL from 'react-map-gl';
// import Geocoder from 'react-mapbox-gl-geocoder';
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
//
// const mapStyle = {
//     width: '100%',
//     height: 600
// }
//
// const mapboxApiKey = 'pk.eyJ1IjoicGlja2VhdCIsImEiOiJja2VzbDA0ejczMWFsMnhwaTk0MHFyY2o3In0.ejbEUU5u9zVINmEmOR81HQ'
//
// const params = {
//     country: "fr"
// }
//
// class MapProductList extends PureComponent {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             viewport: {
//                 latitude: 45.50884,
//                 longitude: -73.58781,
//                 zoom: 15
//             }
//         };
//
//     }
//
//     onSelected = (viewport, item) => {
//         this.setState({
//             viewport
//         })
//     }
//
//     render() {
//         const {viewport} = this.state;
//         return (
//             <div>
//                 <ReactMapGL
//                     mapboxApiAccessToken={mapboxApiKey}
//                     mapStyle="mapbox://styles/mapbox/streets-v11"
//                     {...viewport}
//                     {...mapStyle}
//                     onViewportChange={(viewport) => this.setState({viewport})}
//                 >
//                     <Geocoder
//                         mapboxApiAccessToken={mapboxApiKey}
//                         onSelected={this.onSelected}
//                         viewport={viewport}
//                         hideOnSelect={true}
//                         value=""
//                         queryParams={params}
//                     />
//                 </ReactMapGL>
//
//             </div>
//         );
//     }
// }
//
// export default MapProductList;