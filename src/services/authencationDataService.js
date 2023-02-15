import http from "../../http-common";
class AuthenticationsDataService{
    create(data){
        return http.post("/auth/signUp", data);
    }
}

export default new AuthenticationsDataService;