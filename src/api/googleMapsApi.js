import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyASWbYzzz4_apfsWyQbBu6tbYduJzum5_M`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
