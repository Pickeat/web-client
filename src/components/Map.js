import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicGlja2VhdCIsImEiOiJja2VzbDA0ejczMWFsMnhwaTk0MHFyY2o3In0.ejbEUU5u9zVINmEmOR81HQ';


const Map = (props) => {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(props.lng);
    const [lat, setLat] = useState(props.lat);
    const [zoom, setZoom] = useState(props.zoom);

    // Initialize map when component mounts
    useEffect(() => {
        if (!lng || !lat || !zoom)
            return;
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        if (props.lng && props.lat) {
            new mapboxgl.Marker()
                .setLngLat([props.lng, props.lat])
                .addTo(map);
        }
        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        /*Add btn to geolocate user*/
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );

        // Clean up on unmount
        return () => map.remove();
    }, []);
    // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className='map-container' ref={mapContainerRef}/>
        </div>
    );
};

export default Map;
