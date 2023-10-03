import axios from "axios";
const token = localStorage.getItem('token');

export default axios.create({
     baseURL: process.env.VUE_APP_URL,
     headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": "Bearer " + token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept,Upgrade-Insecure-Requests',
      'Access-Control-Allow-Credentials': true
    },
    proxy: true,
    // withCredentials: true,
});