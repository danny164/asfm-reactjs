import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyBhpijPsGa6gWXTdXmpYyEt5Za8KnPTkWk`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
