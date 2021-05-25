import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyAv_f04xmA6-1g9VWGe67V4CkyoErVj4CA`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
