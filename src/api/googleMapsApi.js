import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyB1JukrZ89kBwGp-MKknVxrJXAMN9cIb-I`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
