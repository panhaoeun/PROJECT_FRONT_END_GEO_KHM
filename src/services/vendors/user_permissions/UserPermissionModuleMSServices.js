import {
    ElMessage
} from "element-plus";
import http from "../../../../http-common";
import httpAccessJson from "../../../../http-access-control-json";
import authHeader from "../../authencations/AuthHeader";

export default class UserPermissionsModuleMSServices {
    /**
     * @Permissions Managements
    * **/
   async getUserInfoMSByAuth(data){
        return await http
            .get(
                "/auth/token_auth/users_management/user_info/user_data_auth", {
                    headers: authHeader(),
                },
                data
            )
            .then((result) => {
                if (result.status == 201) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
   }
    /**
     * @Permissions Managements
     * @List Permissions
     * @Create Permissions
     * @Updated Permissions
     * @Delete Permissions
    * **/
    async getListPermissionsModuleRole(data) {
        return await http
            .get(
                "/authentication/protect_mal/permission/module_list/functions", {
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
    async getDetailModuleRoleFunctionByRoleId(roleId) {
        return http
            .get(
                `/authentication/protect_mal/permission/module_detail_by_role_list/functions/${roleId}`, {
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
            `/vendors/users_management/permissions/updated-perm/${userID}`, {
                headers: authHeader(),
            },
            updatePerm
        );
    }
    async deletePerMS(userID) {
        return http.get(
            `/vendors/users_management/permissions/delete-perm/${userID}`, {
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
/**
 * @Check Role and Permission user can access
 * **/
async checkPermissionsModuleCanAccess(functionAliasName, moduleFunAcc) {
    return await http
        .get(
            `/auth/user_management/module_access/check_permission/${functionAliasName}/${moduleFunAcc}`, {
                headers: authHeader(),
            },
            // moduleCanAccResult
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

}
