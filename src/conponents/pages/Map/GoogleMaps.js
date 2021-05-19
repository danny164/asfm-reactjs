import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './map.scss';

GoogleMaps.propTypes = {
    receiveLat: PropTypes.number,
    receiveLng: PropTypes.number,
    shipLat: PropTypes.number,
    shipLng: PropTypes.number,
    noiNhan: PropTypes.string,
    noiGiao: PropTypes.string,
    shipperLocation: PropTypes.object
};

GoogleMaps.defaultProps = {
    receiveLat: 0,
    receiveLng: 0,
    shipLat: 0,
    shipLng: 0,
    noiNhan: '',
    noiGiao: '',
    shipperLocation: null
};

const mapStyles = {
    width: '100%',
    height: '100vh',
};

const defaultCenter = {
    lat: 16.057723868641794,
    lng: 108.20189873237138,
};

let count = 0;
export default function GoogleMaps(props) {
    const { receiveLat, receiveLng, shipLat, shipLng, noiNhan, noiGiao, shipperLocation } = props;

    const [response, setResponse] = useState(null);

    const locations = [
        {
            name: 'Điểm nhận',
            location: {
                lat: receiveLat,
                lng: receiveLng,
            },
        },
        {
            name: 'Điểm giao',
            location: {
                lat: shipLat,
                lng: shipLng,
            },
        },
    ];

    const directionsCallback = (result) => {
        count += 1;
        if (result !== null && count === 2) {
            if (result.status === 'OK') {
                setResponse(result);
            } else {
                console.log('response: ', response);
            }
        }
    };

    console.log(shipperLocation);

    return (
        <LoadScript googleMapsApiKey="AIzaSyCPzJaXB1GobQ72Y6-L2QstmnJdlkDPAPE" language="vi">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
                options={{ disableDefaultUI: true, fullscreenControl: true, zoomControl: true, scaleControl: true }}
            >
                {locations.map((item) => {
                    return <Marker key={item.name} position={item.location} />;
                })}

                {/* hiển thị vị trí shipper */}
                {shipperLocation !== null &&
                    <Marker position={shipperLocation} />}
                {
                    <DirectionsService
                        options={{
                            origin: noiNhan,
                            destination: noiGiao,
                            travelMode: 'DRIVING',
                        }}
                        callback={directionsCallback}
                        onLoad={(directionsService) => {
                            console.log('DirectionsService onLoad', directionsService);
                        }}
                        onUnmount={(directionsService) => {
                            count = 0;
                            console.log('DirectionsService onUnmount', directionsService);
                        }}
                    />
                }

                {response !== null && (
                    <DirectionsRenderer
                        options={{
                            directions: response,
                        }}
                        onLoad={(directionsRenderer) => {
                            console.log('DirectionsRenderer onLoad', directionsRenderer);
                        }}
                        onUnmount={(directionsRenderer) => {
                            console.log('DirectionsRenderer onUnmount', directionsRenderer);
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
}
