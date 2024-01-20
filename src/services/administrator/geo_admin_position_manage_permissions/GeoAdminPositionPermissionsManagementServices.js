import http from "../../../../http-access-control-json";

export default class ManagePermissionsGeoFencePositionPermissionsServices {
    /**
     *@api {manage} Manage Project Name
     */
    async listProjectBaseDeptOrgStr() {
        return await http.get(`/project-management/roles-managements/all-project-management-list`)
            .then((result) => {
                if (!result) {
                    return false;
                }
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            }).catch((error) => {
                return Promise.reject(error);
            });
    }
    async getModifyProjectId(projectIdOrg) {
        return await http.get(`/project-management/roles-managements/edit-project-management-by-id/${projectIdOrg}`)
            .then((result) => {
                if (!result) {
                    return false;
                }
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            }).catch((error) => {
                return Promise.reject(error);
            });
    }
    async addNewProjectNameBaseOrgStr(projects) {
        return http.post("/project-management/roles-managements/all-project-management-add-new", projects);
    }
    async modifyProjectNameOfStrOrg(projectIdModify,projects) {
        return http.put(`/project-management/roles-managements/project-management-modify-project/${projectIdModify}`, projects);
    }
    async removeProjectNameOfStrOrg(projectIdModify,projects) {
        return http.delete(`/project-management/roles-managements/project-management-remove-project/${projectIdModify}`, projects);
    }
    /** 
     * @api {post}  Manage Departments
     *  @api (List, Modify, Add, Delete) Departments
     */
    async listGeoLocationDepartmentsOrgSLGeo(projectId, projectByCountryId, orgGeoLevelDept) {
        return await http.get(`/users-managements/geo-fence-position/list-departments?projectId=${projectId}&countryIdGeoLocal=${projectByCountryId}&orgDeptLevel=${orgGeoLevelDept}`)
            .then((result) => {
                if (!result) {
                    return false;
                }
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            }).catch((error) => {
                return Promise.reject(error);
            });
    }
    async createNewDepartmentsLocationGeoByCountryOrgStr(department) {
        return http.post("/users-managements/geo-fence-position/add-new-departments", department);
    }
    async modifyDepartmentsLocationGeoByCountryOrgStr(projectByCountryId, department) {
        return http.put(`/users-managements/geo-fence-position/modify-renew-departments-id/${parseInt(projectByCountryId) ? parseInt(projectByCountryId) : 0}`, department);
    }
    async removeDepartmentsLocationGeoByCountryOrgStr(projectByCountryId, department) {
        return http.post(`/users-managements/geo-fence-position/add-new-departments/${parseInt(projectByCountryId)  ? parseInt(projectByCountryId) : 0}`, department);
    }
    /** 
     * @api {post} 
     *  @api (Manage Departments base Positions)
     */
    async listGeoLocationPositionsOrgSLGeoTreeView() {
        return await http.get(`/users-managements/geo-fence-position-org-str/str-org-position/tree-view-position`)
            .then((result) => {
                if (!result) {
                    return false;
                }
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            }).catch((error) => {
                return Promise.reject(error);
            });
    }
    async listGeoLocationPositionsBaseDepartmentsOrgSLGeoTreeView(orgPositionId) {
        return await http.get(`/users-managements/geo-fence-position-org-str/str-org-dept-base-position=${orgPositionId}`)
            .then((result) => {
                if (!result) {
                    return false;
                }
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            }).catch((error) => {
                return Promise.reject(error);
            });
    }
    async createNewGeoOrgSLPositionDept(department) {
        return http.post("/users-managements/geo-fence-position-org-str/add-new-str-org-dept-base-position", department);
    }
}