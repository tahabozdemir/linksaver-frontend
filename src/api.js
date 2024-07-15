import axios from "axios";
import store from './redux/store'


const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use((config) => {
    const token = store.getState().token.token;
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, (error) => {
    alert(`Error: ${error.message}`)
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, function (error) {
    alert(`Error: ${error.response.data.error.message || error.message}`);
    return Promise.reject(error);
});

export default api;