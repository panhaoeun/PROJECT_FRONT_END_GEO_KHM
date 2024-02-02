import http from "../../../../http-access-control-json";

export default class ManageOrgChartStructureGeoProjectServices {
    /** 
     * @api {post} 
     *  @api (Org-Structure API endpoints) /addOrganizationStructure/ Add Organization Structure Information
     */
    async listOrgStructureLevelProjectGeo(orgStrChartLevel, orgStrChartCountryId, orgStrChartProjectId) {
        return await http.get(`/admin/geo-location-route/list-new-multi-level/org-chart-structures?orgChartStrLevel=${orgStrChartLevel}&orgChartStrGeoDeptCountryId=${orgStrChartCountryId}&orgChartStrGeoDeptProId=${orgStrChartProjectId}`).then((result) => {
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
    async createNewOrgStructureGeoProjectGeo(countryGeo) {
        return http.post("/admin/geo-location-route/add-new-multi-level/org-chart-structures", countryGeo);
    }
    async modifyNewOrgStructureGeoProjectGeo(orgChartStrId, stateGeo) {
        return http.post(`/admin/geo-location-route/modify-new-multi-level/org-chart-structures/${orgChartStrId}`, stateGeo);
    }
    async removeNewOrgStructureGeoProjectGeo(orgChartStrId, stateGeo) {
        return http.post(`/admin/geo-location-route/remove-new-multi-level/org-chart-structures/${orgChartStrId}`, stateGeo);
    }
    /** 
     * @api {post} 
     *  @api (Org-Structure Position API endpoints) /addOrganizationStructure/ Add Organization Structure Information
    */
    async listOrgStructureLevelDeptPositionGeo(parentDeptPosId) {
        return await http.get(`/admin/geo-location-route/list-position-dept-filter/org-chart-structures?orgPosDeptParentId=${parentDeptPosId}`).then((result) => {
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
}