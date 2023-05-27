import httpJsonRequest from "../../http-json-request";
class AuthenticationsDataService{
    // Login 
    authLogin(data){
        return httpJsonRequest.post("/auth/signIn", data);
    }
    create(data){
        return httpJsonRequest.post("/auth/signUp", data);
    }
    authLogout(data) {
         return httpJsonRequest.post("/auth/logout", data);
    }
}

export default new AuthenticationsDataService;