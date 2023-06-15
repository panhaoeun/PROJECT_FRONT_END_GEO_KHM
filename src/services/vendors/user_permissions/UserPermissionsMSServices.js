import { ElMessage } from "element-plus";
import http from "../../../../http-common";
import httpAccessControl from "../../../../http-access-control";
import httpJson from "../../../../http-json-request";
import httpAccessJson from "../../../../http-access-control-json";
import authHeader from "../../authencations/AuthHeader";

export default class UserPermissionsMSServices {
    /**
     * @Users Managements
     * @List Users
     * @Create Users
     * @Updated Users
     * @Delete Users
     * **/
    async getListUserData(data) {
        return await http
            .get(
                "/vendors/users_management/users/list",
                { headers: authHeader() },
                data
            )
            .then((result) => {
                console.log(result);
                if (result.status == "201") {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
    }
    async createUserMS(data) {
        return httpAccessControl.post(
            "/vendors/users_management/users/created",
            data
        );
    }
    async editedUserMSByID(userID) {
        return httpJson.get(
            `/vendors/users_management/users/get-list/${userID}`,
            {
                headers: authHeader(),
            },
            userID
        );
    }
    async updateUserMS(userID, updateUser) {
        return httpAccessControl.put(
            `/vendors/users_management/users/updated/${userID}`,
            updateUser
        );
    }
    async deleteUserMS(userID) {
        return httpJson.delete(
            `/vendors/users_management/users/delete/${userID}`,
            {
                headers: authHeader(),
            }
        );
    }
    /**
     * @Permissions Managements
     * @List Permissions
     * @Create Permissions
     * @Updated Permissions
     * @Delete Permissions
     * **/
    async getListPermissions(data) {
        return await http
            .get(
                "/vendors/users_management/permissions/list",
                {
                    headers: authHeader(),
                },
                data
            )
            .then((result) => {
                if (result.status == "201") {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
    }
    async createPermissionMS(data) {
        return http.post(
            "/vendors/users_management/permissions/created-perm",
            {
                headers: authHeader(),
            },
            data
        );
    }
    async editedPermMSByID(userID, functionID) {
        return http
            .get(
                `/vendors/users_management/permissions/edit-perm/${userID}/${functionID}`,
                {
                    headers: authHeader(),
                }
            )
            .then((result) => {
                if (result.status == "201") {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
    }
    async updatePermMSByID(userID, updatePerm) {
        return http.put(
            `/vendors/users_management/permissions/updated-perm/${userID}`,
            {
                headers: authHeader(),
            },
            updatePerm
        );
    }
    async deletePerMS(userID) {
        return http.get(
            `/vendors/users_management/permissions/delete-perm/${userID}`,
            {
                headers: authHeader(),
            }
        );
    }
    /**
     * @Save Permissions Managers
     *
     * **/
    async updateSavePermIdMG(permId, updateSavePerm) {
        return httpAccessJson.put(
            `/vendors/users_management/permissions/check-permission/${permId}`,
            updateSavePerm
        );
    }
}
