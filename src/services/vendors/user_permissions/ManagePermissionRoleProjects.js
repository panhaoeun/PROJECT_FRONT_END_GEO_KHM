import http from "../../../../http-access-control-json";
import authHeader from "../../authencations/AuthHeader";

export default class ManagePermissionsRoleBaseProject {
    /**`            
     * @Projects Managements
    ***/
    async getAllProject(project) {
        return await http.get(`/project-management/roles-managements/all-project-management-list`, {
            headers: authHeader()
        },project)
        .then((result) => {
            if (result?.status == 200) {
                if (result.data?.success == true) {
                    return result.data.result?.resultStatus;
                }
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    }

    /**`            
     * @Permissions Managements
    * **/
   async getAllRolesBaseProject(projectId) {
        return await http.get(`/roles-managements/all-roles-permission-list?projectId=${parseInt(projectId)}`)
        .then((result) => {
            if (result?.status == 200) {
                if (result.data?.success == true) {
                    return result.data.result?.resultStatus;
                }
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    }
    async getAllPermissionAddByProjects(project) {
        return await http.get(`/roles-managements/get-all-permission-list`, {
            headers: authHeader()
        },project)
        .then((result) => {
            if (result?.status == 200) {
                if (result.data?.success == true) {
                    return result.data.result?.resultStatus;
                }
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    }

}
