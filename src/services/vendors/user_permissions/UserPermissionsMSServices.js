import { ElMessage } from "element-plus";
import http from "../../../../http-common";
import httpJson from "../../../../http-json-request";

export default class UserPermissionsMSServices {
    /**
     * @Users Managements
     * @List Users
     * @Create Users
     * @Updated Users
     * @Delete Users
    * **/    
    async getListUserData(data){
            return await http.get("/vendors/users_management/users/list", data)
                .then((result) => {
                    if(result.status == '201'){
                        if(result.data.success == true){
                        return result.data.result.resultStatus;
                        }   
                    }
                })
                .catch((error) => {
                ElMessage.error(error);
            });
    }
    async createUserMS(data){
        return http.post("/vendors/users_management/users/created", data);
    }
    async editedUserMSByID(userID){
        return http.get(`/vendors/users_management/users/get-list/${userID}`);
    }
    async updateUserMS(userID, updateUser){
        return http.put(`/vendors/users_management/users/updated/${userID}`, updateUser);
    }
    async deleteUserMS(userID){
        return httpJson.delete(`/vendors/users_management/users/delete/${userID}`);
    }
    /**
     * @Permissions Managements
     * @List Permissions
     * @Create Permissions
     * @Updated Permissions
     * @Delete Permissions
     * **/    
    async getListPermissions(data){
            return await http.get("/vendors/users_management/permissions/list", data)
                .then((result) => {
                    if(result.status == '201'){
                        if(result.data.success == true){
                        return result.data.result.resultStatus;
                        }   
                    }
                })
                .catch((error) => {
                ElMessage.error(error);
            });
    }
    async createPermissionMS(data){
        return http.post("/vendors/users_management/permissions/created-perm", data);
    }
    async editedPermMSByID(userID){
        return http.get(`/vendors/users_management/permissions/edit-perm/${userID}`);
    }
    async updatePermMSByID(userID,updatePerm){
        return http.get(`/vendors/users_management/permissions/updated-perm/${userID}`, updatePerm);
    }
    async deletePerMS(userID){
        return http.get(`/vendors/users_management/permissions/delete-perm/${userID}`);
    }

}