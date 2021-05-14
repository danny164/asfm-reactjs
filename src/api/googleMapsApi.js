import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyCPzJaXB1GobQ72Y6-L2QstmnJdlkDPAPE`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
