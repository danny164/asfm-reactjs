import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

GoogleMaps.propTypes = {};

function GoogleMaps(props) {
    return <GoogleMap defaultZoom={14} defaultCenter={{ lat: 16.057723868641794, lng: 108.20189873237138 }} />;
}

const MapWrapped = withScriptjs(withGoogleMap(GoogleMaps));

export default function App2() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <MapWrapped
                googleMapURL={
                    'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAZh8iua6hndIGaIWcodmhUEHmX2-QBjrg'
                }
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}
