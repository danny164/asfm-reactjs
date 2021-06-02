import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { realtime } from '../../../firebase';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Start from 'assets/media/start.png';
import End from 'assets/media/end.png';
import Shipper from 'assets/media/shipper.png';

GoogleMaps.propTypes = {
    noiNhan: PropTypes.string,
    noiGiao: PropTypes.string,
    status: PropTypes.string,
    shipperLocation: PropTypes.object,
    receiveLat: PropTypes.number,
    receiveLng: PropTypes.number,
    shipLat: PropTypes.number,
    shipLng: PropTypes.number,
};

GoogleMaps.defaultProps = {
    status: '',
    noiNhan: '',
    noiGiao: '',
    shipperInfor: {
        lat: 16.057723868641794,
        lng: 108.20189873237138,
    },
    receiveLat: 16.057723868641794,
    receiveLng: 108.20189873237138,
    shipLat: 16.057723868641794,
    shipLng: 108.20189873237138,
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
    const { status, noiNhan, noiGiao, shipperInfor, receiveLat, receiveLng, shipLat, shipLng } = props;
    const [shipperLocation, setShipperLocation] = useState();
    const [response, setResponse] = useState(null);

    const directionsCallback = (result) => {
        count += 1;
        if (result !== null && count < 3) {
            if (result.status === 'OK') {
                setResponse(result);
            } else {
                console.log('response: ', response);
            }
        }
    };

    console.log(shipLat, shipLng, receiveLat, receiveLng);

    useEffect(() => {
        console.log(count);
        const shipperLatLng = async () => {
            try {
                await realtime.ref('Location_Shipper/' + shipperInfor.id).on('value', (snapshot) => {
                    if (snapshot !== null) {
                        setShipperLocation(snapshot.val());
                    }
                });
            } catch (e) {
                console.log(e);
            }
        };

        shipperLatLng();
    }, [shipperInfor, status]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyC2RtdqIgIoymEhykJUECpI48J2nMl2Sn4" language="vi">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={shipperLocation !== null ? 18 : 12}
                center={shipperLocation !== null ? shipperLocation : defaultCenter}
                options={{ disableDefaultUI: true, fullscreenControl: true, zoomControl: true, scaleControl: true }}
            >
                {/* hiển thị vị trí shipper */}
                <Marker
                    position={shipperLocation}
                    visible={shipperLocation !== null && status !== '3'}
                    icon={Shipper}
                />

                <Marker
                    position={{ lat: receiveLat, lng: receiveLng }}
                    visible={shipperLocation !== null && status !== '3'}
                    icon={Start}
                    title={noiNhan}
                />

                <Marker
                    position={{ lat: shipLat, lng: shipLng }}
                    visible={shipperLocation !== null && status !== '3'}
                    icon={End}
                    title={noiGiao}
                />

                {status === '0' && (
                    <>
                        <DirectionsService
                            options={{
                                origin: noiNhan,
                                destination: noiGiao,
                                travelMode: 'DRIVING',
                            }}
                            callback={directionsCallback}
                            onLoad={(directionsService) => {
                                if (status === '0') {
                                    count = 0;
                                }
                                console.log('DirectionsService onLoad', directionsService);
                            }}
                            onUnmount={(directionsService) => {
                                setResponse(null);
                                console.log('DirectionsService onUnmount', directionsService);
                            }}
                        />
                    </>
                )}

                {response !== null && status === '0' && (
                    <DirectionsRenderer
                        options={{
                            directions: response,
                        }}
                        onLoad={(directionsRenderer) => {
                            console.log('DirectionsRenderer onLoad', directionsRenderer);
                        }}
                        onUnmount={(directionsRenderer) => {
                            count = 0;
                            setResponse(null);
                            console.log('DirectionsRenderer onUnmount', directionsRenderer);
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
}
