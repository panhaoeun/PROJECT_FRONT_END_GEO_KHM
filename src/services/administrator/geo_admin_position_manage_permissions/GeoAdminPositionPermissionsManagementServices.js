import http from "../../../../http-access-control-json";

export default class ManagePermissionsGeoFencePositionPermissionsServices {
    /** 
      * @api {post}  Manage Departments
      *  @api (List, Modify, Add, Delete) Departments
    */
    async listGeoLocationDepartments() {
        return await http.get(`/users-managements/geo-fence-position/list-departments`).then((result) => {
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
    /** 
     * @api {post} 
     *  @api (Manage Departments)
    */
    async createNewDepartmentsLocationGeoByCountry(department) {
        return http.post("/users-managements/geo-fence-position/add-new-departments", department);
    }
    async modifyDepartmentsLocationGeoByCountry(projectByCountryId, department) {
        return http.put(`/users-managements/geo-fence-position/modify-renew-departments-id/${parseInt(projectByCountryId) ? parseInt(projectByCountryId) : 0}`, department);
    }
    async removeDepartmentsLocationGeoByCountry(projectByCountryId,department) {
        return http.post(`/users-managements/geo-fence-position/add-new-departments/${parseInt(projectByCountryId)  ? parseInt(projectByCountryId) : 0}`, department);
    }
}