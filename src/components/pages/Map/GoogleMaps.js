import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

GoogleMaps.propTypes = {
    receiveLat: PropTypes.number,
    receiveLng: PropTypes.number,
    shipLat: PropTypes.number,
    shipLng: PropTypes.number,
    noiNhan: PropTypes.string,
    noiGiao: PropTypes.string,
};

GoogleMaps.defaultProps = {
    receiveLat: 0,
    receiveLng: 0,
    shipLat: 0,
    shipLng: 0,
    noiNhan: '',
    noiGiao: '',
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
    const { receiveLat, receiveLng, shipLat, shipLng, noiNhan, noiGiao } = props;

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

        // {
        //     name: 'Shipper',
        //     location: {
        //         lat: 16.03704735630194,
        //         lng: 108.21968661187451,
        //     },
        // },
    ];

    const directionsCallback = useCallback(
        (result) => {
            if (result !== null) {
                if (result.status == 'OK') {
                    setResponse(result);
                } else {
                    console.log('response: ', response);
                }
            }
            console.log(count++);
        },
        [response]
    );


    return (
        <LoadScript googleMapsApiKey="AIzaSyCPzJaXB1GobQ72Y6-L2QstmnJdlkDPAPE">
            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
                {locations.map((item) => {
                    return <Marker key={item.name} position={item.location} />;
                })}

                {/* <Marker key="shipper" position={{ lat: 16.03704735630194, lng: 108.21968661187451 }} /> */}
                
                {
                    <DirectionsService
                        options={{
                            origin: noiNhan,
                            destination: noiGiao,
                            travelMode: 'DRIVING',
                        }}
                        callback={directionsCallback}
                        onLoad={(directionsService) => {
                            console.log('DirectionsService onLoad directionsService: ', directionsService);
                        }}
                        onUnmount={(directionsService) => {
                            console.log('DirectionsService onUnmount directionsService: ', directionsService);
                        }}
                    />
                }

                {response !== null && (
                    <DirectionsRenderer
                        options={{
                            directions: response,
                        }}
                        onLoad={(directionsRenderer) => {
                            console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer);
                        }}
                        onUnmount={(directionsRenderer) => {
                            console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer);
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
}
