import http from "../../http-common";
class AuthenticationsDataService{
    // Login 
    authLogin(data){
        return http.post("/auth/signIn", data);
    }
    create(data){
        return http.post("/auth/signUp", data);
    }
}

export default new AuthenticationsDataService;