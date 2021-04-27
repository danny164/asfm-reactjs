import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import './style/map.css'

Map.propTypes = {
    longitude: PropTypes.number,
    latitude: PropTypes.number
}

Map.defaultProps = {
    longitude: '',
    latitude: ''
}

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoidGhhbmdodXluaCIsImEiOiJja255ZWloNGUwaWlxMndyeHhjc3Q1YXBwIn0.kmAV6SShMjF1Pieq7kxtKQ';

// DirectionRoute,LocationUpdate

// Polylines

function Map(props) {

    const mapContainer = useRef();
    const [lng, setLng] = useState(108.206230);
    const [lat, setLat] = useState(16.047079);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        new mapboxgl.Marker({
            color: "red",
            draggable: true
        }).setLngLat([108.2171, 16.0522]).addTo(map)

        new mapboxgl.Marker({
            color: "red",
            draggable: true
        }).setLngLat([108.2157, 16.0629]).addTo(map)

        new mapboxgl.Marker({
            color: "blue",
            draggable: true
        }).setLngLat([108.2242, 16.0215]).addTo(map)

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        )

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        map.on('change', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        return () => map.remove();
    }, []);


    const handleClick = () => {
        setLng(lng + 0.001)
        setLat(lat + 0.001)

    }
    return (
        <div>
            <div className="sidebar-map">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                <button onClick={handleClick} >Change</button>
            </div>
            <div className="map-container" ref={mapContainer} />
        </div>
    );
}

export default Map;