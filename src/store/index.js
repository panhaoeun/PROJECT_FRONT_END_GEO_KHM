import { createStore } from "vuex";
import { auth } from "./AuthModule";

const store = createStore({
    getters: {
        getLoginStatus: state => {
            return state.idToken !== null;
        }
    },
    modules: {
        auth,
    },
});


export default store;
