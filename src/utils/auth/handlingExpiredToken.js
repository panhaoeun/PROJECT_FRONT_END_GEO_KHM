import axios from "axios";
import { ElMessage } from "element-plus";
import { useAuthStoreToken } from "./AuthStoreTokenJWT";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_PATH_FILE;

export const handlingExpiredToken = (router) => {
    axios.interceptors.response.use(function(response) {
        return response;
    }, undefined, async function (error) {
        try{
            const {
                setAuthUser
            } = useAuthStoreToken();
            if (error) {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    /**
                     *  @Clear Cache in browser store token and user data
                     *  @Clear Cookie in browser base on function set authentications user 
                     * */
                    localStorage.clear('token');
                    localStorage.clear('tokenExpiry');
                    localStorage.clear('expiresIn')
                    localStorage.clear('user');
                    localStorage.clear('userId');
                    setAuthUser(null);
                    router.push("/auth/login");
                    if(typeof(router) === undefined) {
                        ElMessage.error(error);
                        Promise.resolve(error);
                    }
                    return Promise.reject(error);
                }
            }
        } catch (error) {
            ElMessage.error(error);
        }
    });

}