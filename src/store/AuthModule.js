import AuthService from '../services/authencations/AuthServices';
import router from '../routes/routes';

//Expires In 
const expiresIn = JSON.parse(localStorage.getItem('expiresIn'));
<<<<<<< HEAD
const tokenAuth = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

const user = localStorage.getItem('user');
const initialState = user
  ? { status: { loggedIn: true }, user }: { status: { loggedIn: false }, user: null };
=======
const user = JSON.parse(localStorage.getItem('user'));
>>>>>>> main

export const auth = {
  namespaced: true,
  state:{
<<<<<<< HEAD
    initialState,
    idToken: null,
    userId: null
},
=======
    token: "",
    idToken: null,
    userId: null,
    userArr: user,
    currentUser: null,
    userLoggedIn: false
  },
>>>>>>> main
  actions: {
    login({ commit, dispatch}, user) {
      return AuthService.login(user).then(
        user => {
<<<<<<< HEAD
            commit('authUserToken', {
                token: tokenAuth,
                userId: userId
            });
=======
               /*
            @Auth Store Token
            */
            document.cookie = `tokenJWT=${user.token}`;
>>>>>>> main
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
<<<<<<< HEAD
          commit('registerFailure');
          console.log("Error---:", error)
=======
        //   console.log("Error---:", error)
>>>>>>> main
          return Promise.reject(error);
        }
      );
    },
<<<<<<< HEAD
=======
    setCurrentUser({
        commit
    }, currentUser) {
        commit("SET_CURRENT_USER", currentUser);
    },
    setToken({
        commit
    }, token) {
        commit("SET_TOKEN", token);
    },
>>>>>>> main
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
  getters: {
     isUserArr: state => {
        state.userArr = user;
     }
  },
  mutations: {
<<<<<<< HEAD
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    // Logout =>  on Logout clear all token
    autoExpiryTokenLogout(state) {
        console.log(state.initialState)
=======
    SET_TOKEN(state, token) {
        state.token = token;
        if (token != "") {
            state.userLoggedIn = true;
        } else {
            state.userLoggedIn = false;
        }
    },
    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
     },
    // Logout =>  on Logout clear all token
    autoExpiryTokenLogout() {
>>>>>>> main
      //Remove local token 
      localStorage.removeItem('token');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiry');
<<<<<<< HEAD
    },
    registerSuccess(state) {
      state.status.initialState.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
=======
    }
>>>>>>> main
  },
};