
import axios from 'axios';
import { Date } from 'core-js';

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
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('userId', JSON.stringify(response.data.userId));
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