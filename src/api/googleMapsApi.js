import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyChg2aE0I7jl7kKq-hdRke9qYJFuqSxGf8`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
