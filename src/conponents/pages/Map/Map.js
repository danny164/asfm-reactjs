import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import './map.scss';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

Map.propTypes = {
    longitude: PropTypes.number,
    latitude: PropTypes.number,
};

Map.defaultProps = {
    longitude: '',
    latitude: '',
};

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoidGhhbmdodXluaCIsImEiOiJja255ZWloNGUwaWlxMndyeHhjc3Q1YXBwIn0.kmAV6SShMjF1Pieq7kxtKQ';

// DirectionRoute,LocationUpdate

// Polylines

//api geoJSON: https://api.mapbox.com/geocoding/v5/mapbox.places/32%20Ho%C3%A0ng%20Th%E1%BA%BF%20Thi%E1%BB%87n,%20Ph%C6%B0%E1%BB%9Dng%20H%C3%B2a%20Xu%C3%A2n,%20Qu%E1%BA%ADn%20C%E1%BA%A9m%20L%E1%BB%87,%20Th%C3%A0nh%20ph%E1%BB%91%20%C4%90%C3%A0%20N%E1%BA%B5ngStreet.json?types=address&access_token=pk.eyJ1IjoidGhhbmdodXluaCIsImEiOiJja255ZWloNGUwaWlxMndyeHhjc3Q1YXBwIn0.kmAV6SShMjF1Pieq7kxtKQ
function Map(props) {
    const mapContainer = useRef();
    const [lng, setLng] = useState(108.20623);
    const [lat, setLat] = useState(16.047079);
    const [zoom, setZoom] = useState(14);

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving-traffic',
    });

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
        });

        new mapboxgl.Marker({
            color: 'blue',
            draggable: true,
        })
            .setLngLat([108.19, 16])
            .addTo(map);

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

        new mapboxgl.Marker({
            color: 'green',
            draggable: false,
        })
            .setLngLat([108.2135, 16.0483])
            .addTo(map);

        new mapboxgl.Marker({
            color: 'lightblue',
            draggable: false,
        })
            .setLngLat([108.2204, 16.0491])
            .addTo(map);

        map.addControl(new MapboxDirections(directions), 'top-left');

        return () => map.remove();
    }, []);

    const handleClick = () => {
        setLng(lng + 0.001);
        setLat(lat + 0.001);
    };
    return (
        <div>
            <div className="sidebar-map">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                <button onClick={handleClick}>Change</button>
            </div>
            <div className="map-container" ref={mapContainer} />
        </div>
    );
}

export default Map;
