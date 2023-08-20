import axios from "axios";
<<<<<<< HEAD

=======
>>>>>>> main
export default axios.create({
     baseURL: process.env.VUE_APP_URL,
     headers: {
       'Content-Type': 'application/json'
    },
<<<<<<< HEAD
=======
    // withCredentials: true,
>>>>>>> main
    proxy: true
});
