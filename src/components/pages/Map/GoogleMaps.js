import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './map.scss';
import { realtime } from '../../../firebase';

GoogleMaps.propTypes = {
    noiNhan: PropTypes.string,
    noiGiao: PropTypes.string,
    status: PropTypes.string,
    shipperLocation: PropTypes.object,
};

GoogleMaps.defaultProps = {
    status: '',
    noiNhan: '',
    noiGiao: '',
    shipperInfor: {
        lat: 16.057723868641794,
        lng: 108.20189873237138,
    },
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
    const { status, noiNhan, noiGiao, shipperInfor } = props;
    const [shipperLocation, setShipperLocation] = useState();
    const [response, setResponse] = useState(null);

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

    useEffect(() => {
        realtime.ref('Location_Shipper/' + shipperInfor.id).on('value', (snapshot) => {
            if (snapshot !== null) setShipperLocation(snapshot.val());
        });
    }, [shipperInfor]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyCPzJaXB1GobQ72Y6-L2QstmnJdlkDPAPE" language="vi">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
                options={{ disableDefaultUI: true, fullscreenControl: true, zoomControl: true, scaleControl: true }}
            >
                {/* hiển thị vị trí shipper */}
                {shipperLocation !== null && status !== '3' && <Marker position={shipperLocation} />}

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
