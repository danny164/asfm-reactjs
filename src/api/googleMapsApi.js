import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyCHKl-eLm-qj7yzNFMNX1z0R8eLZM1_hjw`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
