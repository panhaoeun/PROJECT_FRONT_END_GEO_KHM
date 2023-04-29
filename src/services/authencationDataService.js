import httpJsonRequest from "../../http-json-request";
class AuthenticationsDataService{
    // Login 
    authLogin(data){
        return httpJsonRequest.post("/auth/signIn", data);
    }
    create(data){
        return httpJsonRequest.post("/auth/signUp", data);
    }
}

export default new AuthenticationsDataService;