import Cookies from "js-cookie";
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
    const isUserLoggedIn = ref(false);
    function setAuthUser(_user) {
        user.value = _user;
    }
    function setAuthToken(_token){
        tokenAuth.value = _token;
    }
    function checkIsAuthToken(){
        if (tokenAuth.value != "") {
            isUserLoggedIn.value = true;
        } else {
            isUserLoggedIn.value = false;
        }
    }
    return {
        user,
        tokenAuth,
        checkIsAuthToken,
        setAuthUser,
        setAuthToken
    }
})

export function removeToken() {
    return Cookies.remove();
}