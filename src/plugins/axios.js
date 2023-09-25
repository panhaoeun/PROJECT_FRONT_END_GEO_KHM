import axios from 'axios';
import Cookies from "js-cookie";
const token = Cookies.get('token');

const baseURL = process.env.VUE_APP_URL;

const apiClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
     headers: {
      "Authorization": "Bearer " + token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Content-Type': 'application/json',
    },
    proxy: true
});
apiClient.interceptors.request.use(
    conf => {
        // this.$emit('before-request');
        return conf;
    },
    error => {
        return Promise.reject(error);
    }
);
apiClient.interceptors.response.use(
    response => {
        // console.log(response.request.responseURL)
        // const len = response.request.responseURL.length;
        // const url = response.request.responseURL.substring(baseURL.length - 1, len);
        // this.$emit('after-response');
        return response;
    },
    error => {
        console.log(error)
        return Promise.reject(error);
    }
);
// Add the Axios instance to Vue's prototype
export default apiClient;