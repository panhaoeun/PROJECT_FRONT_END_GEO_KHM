import axios from 'axios'
import json from './config.json';
const apiBase = !process.env.VUE_APP_URL.trim() ? window.location.origin + '/' : process.env.VUE_APP_URL;
const apiClient = axios.create({
    baseURL: apiBase,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default{
    search(params, lang = null) {
        if (lang) {
            apiClient.defaults.headers.common['Language'] = lang
        }
        return apiClient.get(json.api.search, {
            params: params
        })
    },
}   