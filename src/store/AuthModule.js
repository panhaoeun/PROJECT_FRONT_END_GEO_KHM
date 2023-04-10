import AuthService from '../services/authencations/AuthServices';
import router from '../routes/routes';

//Expires In 
const expiresIn = JSON.parse(localStorage.getItem('expiresIn'));
const tokenAuth = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

const user = localStorage.getItem('user');
const initialState = user
  ? { status: { loggedIn: true }, user }: { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state:{
    initialState,
    idToken: null,
    userId: null
},
  actions: {
    login({ commit, dispatch}, user) {
      return AuthService.login(user).then(
        user => {
            commit('authUserToken', {
                token: tokenAuth,
                userId: userId
            });
          //Dispatch to autoLogout
          return Promise.resolve(user);
        },
        dispatch('actionLogoutTimer',expiresIn),
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          console.log("Error---:", error)
          return Promise.reject(error);
        }
      );
    },
    //Action Logout
    actionLogoutTimer({commit}, expirationTime) {
      setTimeout(() => {
        commit('autoExpiryTokenLogout');
      }, expirationTime * 1000);
    },
    //Auto Login 
    actionAutoLogin({commit}){
        const localToken = localStorage.getItem('token');
        if(!localToken){
            return;
        }else{
            console.log('token:',localToken);
            const tokenExpiry = localStorage.getItem('tokenExpiry');
            const now = new Date();
            if(now >= tokenExpiry){
                console.log("Token Expired");
                return;
            }else{
                const userId = localStorage.getItem('userId');
                commit('authUserToken', {
                    token: localToken,
                    userId: userId
                });
            }

        }
    },
    actionLogout({commit}){
       commit('autoExpiryTokenLogout');
       //Avoid duplicate path error
       const path = '/';
       if(router.path !== path){
         router.replace('/auth/login');
       }
    }
  },
  mutations: {
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    // Logout =>  on Logout clear all token
    autoExpiryTokenLogout(state) {
        console.log(state.initialState)
      //Remove local token 
      localStorage.removeItem('token');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiry');
    },
    registerSuccess(state) {
      state.status.initialState.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};