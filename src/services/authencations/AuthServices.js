
import axios from 'axios';
import { Date } from 'core-js';
import {
    useAuthStoreToken
} from '../../utils/auth/AuthStoreTokenJWT';
// const {setAuthUser} = useAuthStoreToken();s

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
            localStorage.setItem('user', JSON.stringify(response.data.userResult));
            localStorage.setItem('userId', JSON.stringify(response.data.userId));
            localStorage.setItem('userRole', JSON.stringify(response.data.userType));
            /*
            @Auth Store Token
            */ 
           document.cookie = `token=${response.data.token}`;
           const userAuthData = response.data.userResult;
           useAuthStoreToken().setAuthUser(userAuthData);
          
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