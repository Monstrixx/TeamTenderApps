import axios from 'axios';

export const createCancelToken = () => {
    return axios.CancelToken.source();
};

export const isCancel = axios.isCancel;
