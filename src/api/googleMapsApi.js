import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyBx-Vn56Cm1znXyC4d-SNbQidogpazq3cI`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
