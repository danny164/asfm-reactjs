import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyAY_kSdaiEWmqo1FNrxC5mSdlgnmnI7wkg`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
