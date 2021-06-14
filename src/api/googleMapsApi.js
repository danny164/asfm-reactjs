import axiosClient from './axiosClient';

const googleMapsApi = {
    getAll(startPoint, endPoint) {
        const url = `directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyA8TRDZTRz3LmOze1EIv56NMMi_QDGkeBQ`;
        return axiosClient.get(url);
    },
};

export default googleMapsApi;
