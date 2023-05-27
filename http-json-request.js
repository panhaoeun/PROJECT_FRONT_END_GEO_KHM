import axios from "axios";
export default axios.create({
     baseURL: process.env.VUE_APP_URL,
     headers: {
       'Content-Type': 'application/json'
    },
    // withCredentials: true,
    proxy: true
});
