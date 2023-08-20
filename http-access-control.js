import axios from "axios";
const tokenCookie = localStorage.getItem('token');


export default axios.create({
     baseURL: process.env.VUE_APP_URL,
     headers: {
      "Authorization": "Bearer " + tokenCookie,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Content-Type': 'multipart/form-data',
    },
    proxy: true
});
