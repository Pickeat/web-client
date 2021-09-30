// import "mapbox-gl/dist/mapbox-gl.css";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import React, { useRef, useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from "mapbox-gl";
//
// // Please be a decent human and don't abuse my Mapbox API token.
// // If you fork this sandbox, replace my API token with your own.
// // Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
// mapboxgl.accessToken = 'pk.eyJ1IjoicGlja2VhdCIsImEiOiJja2VzbDA0ejczMWFsMnhwaTk0MHFyY2o3In0.ejbEUU5u9zVINmEmOR81HQ';
//
//
// const ProductListMapReact = (props) => {
//     const mapContainer = useRef(null);
//     const map = useRef(null);
//     const [lng, setLng] = useState(-70.9);
//     const [lat, setLat] = useState(42.35);
//     const [zoom, setZoom] = useState(9);
//
//     useEffect(() => {
//         if (map.current) return; // initialize map only once
//         map.current = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [lng, lat],
//             zoom: zoom
//         });
//     });
//
//     return (
//         <div>
//             <div ref={mapContainer} className="map-container" />
//         </div>
//     );
// };
//
// export default ProductListMapReact;