import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
/* global google */

GoogleMaps.propTypes = {
    receiveLat: PropTypes.number,
    receiveLng: PropTypes.number,
    shipLat: PropTypes.number,
    shipLng: PropTypes.number,
};

GoogleMaps.defaultProps = {
    receiveLat: 0,
    receiveLng: 0,
    shipLat: 0,
    shipLng: 0,
}


export default function GoogleMaps(props) {
    const { receiveLat, receiveLng, shipLat, shipLng } = props;

    let [directions, setDirections] = useState("");

    useEffect(() => {
        var DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
            origin: new google.maps.LatLng(receiveLat, receiveLng),
            destination: new google.maps.LatLng(shipLat, shipLng),
            travelMode: google.maps.TravelMode.DRIVING,
        },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            })
    }, [])



    function GoogleMapss() {
        return <GoogleMap defaultZoom={12} defaultCenter={{ lat: 16.057723868641794, lng: 108.20189873237138 }} >
            <Marker position={{ lat: receiveLat, lng: receiveLng }} title="Điểm nhận" />
            <Marker position={{ lat: shipLat, lng: shipLng }} title="Điểm giao" />
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>;
    }

    const MapWrapped = withScriptjs(withGoogleMap(GoogleMapss));

    return (
        <div style={{ width: '55vw', height: '90vh' }}>
            <MapWrapped
                googleMapURL={
                    'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCPzJaXB1GobQ72Y6-L2QstmnJdlkDPAPE'
                }
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                onMouse={true}
            />
        </div>
    );
}
