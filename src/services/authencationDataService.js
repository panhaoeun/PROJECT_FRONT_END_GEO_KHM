import httpJsonRequest from "../../http-json-request";
class AuthenticationsDataService{
    // Login 
    authLogin(data){
        return httpJsonRequest.post("/auth/signIn", data);
    }
    create(data){
        return httpJsonRequest.post("/auth/signUp", data);
<<<<<<< HEAD
=======
    }
    authLogout(data) {
         return httpJsonRequest.post("/auth/logout", data);
>>>>>>> main
    }
}

export default new AuthenticationsDataService;