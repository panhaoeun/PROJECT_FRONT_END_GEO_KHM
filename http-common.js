import axios from "axios";

export default axios.create({
     baseURL: process.env.VUE_APP_URL,
     headers: {
       "Content-Type": "multipart/form-data",
    },
    proxy: true
});