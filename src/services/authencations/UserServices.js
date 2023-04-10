// import authHeader from './AuthHeader';
import http from '../../../http-common';

class UserService {
  getCurrentUserByTokenId() {
    let token =localStorage.getItem('token');
    console.log(token)
    return http.get("/customers/my_account/overview/view-my-account", {header: {Authorization: 'Bearer ' + token }});
  }

}

export default new UserService();