import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
  async login(user) {
    const response = await axios
          .post(API_URL + 'signIn', {
                  userLogin : user.userLogin,
                userPassword: user.password
          });
          console.log(response)
      if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(user) {
    return axios.post(API_URL + 'signUp', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();