import axios from "axios";
import store from './redux/store'
const api = axios.create({
});

api.interceptors.request.use((config) => {
    const token = store.getState().user.accessToken;
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, (error) => {
    alert(`Error: ${error.message}`)
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, function (error) {
    alert(`Error: ${error.message}`);
    return Promise.reject(error);
});

export default api;