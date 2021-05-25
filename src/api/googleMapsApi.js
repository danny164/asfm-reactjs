import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyDrQ-7I9q51ldl65KwVow579kNFwgGMPbY`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
