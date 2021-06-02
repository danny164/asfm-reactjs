import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyC2RtdqIgIoymEhykJUECpI48J2nMl2Sn4`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
