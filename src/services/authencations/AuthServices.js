
import axios from 'axios';
import { Date } from 'core-js';
<<<<<<< HEAD
=======
import {
    useAuthStoreToken
} from '../../utils/auth/AuthStoreTokenJWT';
// const {setAuthUser} = useAuthStoreToken();s
>>>>>>> main

class AuthService {
  async login(user) {
    const response = await axios
          .post(process.env.VUE_APP_URL + '/auth/' + 'signIn',user);
      if (response.data.token) {
            const currentTime = new Date();
            const expiry = new Date(currentTime.getTime() + (response.data.expiresIn * 1000));
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('tokenExpiry',expiry);
            localStorage.setItem('expiresIn',response.data.expiresIn)
<<<<<<< HEAD
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('userId', JSON.stringify(response.data.userId));
=======
            localStorage.setItem('user', JSON.stringify(response.data.userResult));
            localStorage.setItem('userId', JSON.stringify(response.data.userId));
            /*
            @Auth Store Token
            */ 
           document.cookie = `token=${response.data.token}`;
           const userAuthData = response.data.userResult;
           useAuthStoreToken().setAuthUser(userAuthData);
          
>>>>>>> main
      }
      return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(user) {
    return axios.post(process.env.VUE_APP_URL +'/auth/' + 'signUp',user);
  }
}

export default new AuthService();