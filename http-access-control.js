import axios from "axios";
import { getCookie } from "./src/utils/cookies";


export default axios.create({
     baseURL: process.env.VUE_APP_URL,
     headers: {
      "Authorization": "Bearer " + getCookie('token'),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Content-Type': 'multipart/form-data',
    },
    proxy: true
});
