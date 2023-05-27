import {
    defineStore
} from "pinia";
import {
    ref
} from "vue";
export const useAuthStoreToken = defineStore("auth", () => {
    const localStorageUser = localStorage.getItem("user");
    const localStorageToken = localStorage.getItem("token");
    const user = ref(JSON.parse(localStorageUser));
    const tokenAuth = ref(localStorageToken);
    function setAuthUser(_user) {
        user.value = _user;
    }
    function setAuthToken(_token){
        tokenAuth.value = _token;
    }
    return {
        user,
        tokenAuth,
        setAuthUser,
        setAuthToken
    }
})