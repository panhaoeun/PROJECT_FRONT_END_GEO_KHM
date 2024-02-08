import http from "../../../../http-access-control-json";

export default class ManageOrgChartStructureGeoProjectServices {
    /** 
     * @api {post} 
     *  @api (Org-Structure API endpoints) /addOrganizationStructure/ Add Organization Structure Information
     */
    async listOrgStructureLevelProjectGeo(orgStrChartLevel, orgStrChartCountryId, orgStrChartProjectId, orgChartStrSuperId) {
        return await http.get(`/admin/geo-location-route/list-new-multi-level/org-chart-structures?orgChartStrLevel=${orgStrChartLevel}&orgChartStrGeoDeptCountryId=${orgStrChartCountryId}&orgChartStrGeoDeptProId=${orgStrChartProjectId}&orgChartStrSuperId=${orgChartStrSuperId}`).then((result) => {
            if (!result) {
                return false;
            }
            if (result.status == 200) {
                if (result.data.success == true) {
                    return result.data.result.resultStatus.rows;
                }
            }
        }).catch((error) => {
            throw Error(error || error.message);
        });
    }
    async createNewOrgStructureGeoProjectGeo(countryGeo) {
        return http.post("/admin/geo-location-route/add-new-multi-level/org-chart-structures", countryGeo);
    }
    async modifyNewOrgStructureGeoProjectGeo(orgChartStrId, stateGeo) {
        return http.put(`/admin/geo-location-route/modify-new-multi-level/org-chart-structures/${orgChartStrId}`, stateGeo);
    }
    async removeNewOrgStructureGeoProjectGeo(orgChartStrId, stateGeo) {
        return http.delete(`/admin/geo-location-route/remove-new-multi-level/org-chart-structures/${orgChartStrId}`, stateGeo);
    }
    async hierarchyDataOrgStructureGeoProject(orgChartProId, orgChartCountryId, orgDataStrChart) {
        return http.get(`/admin/geo-location-route/generate-multi-level/org-chart-structures?orgChartDeptProId=${orgChartProId}&orgChartDeptCountryId=${orgChartCountryId}}`, orgDataStrChart ? orgDataStrChart : {}).then((result) => {
            if (!result) {
                return false;
            }
            if (result.status == 200) {
                if (result.data.success == true) {
                    return result.data.result.resultStatus;
                }
            }
        }).catch((error) => {
            throw Error(error);
        });
    }
    /** 
     * @api {post} 
     *  @api (Org-Structure Position API endpoints) /addOrganizationStructure/ Add Organization Structure Information
     */
    async listOrgStructureLevelDeptPositionGeo(parentDeptPosId, orgChartStrSuperId, getOrgPosStrLevel) {
        return await http.get(`/admin/geo-location-route/list-position-dept-filter/org-chart-structures?orgPosDeptParentId=${parentDeptPosId}&orgChartStrSuperId=${orgChartStrSuperId}&orgDepPosStrLevel=${getOrgPosStrLevel}`).then((result) => {
            if (!result) {
                return false;
            }
            if (result.status == 200) {
                if (result.data.success == true) {
                    return result.data.result.resultStatus;
                }
            }
        }).catch((error) => {
            throw Error(error || error.message);
        });
    }
    async createNewOrgStrDeptPositionGeoProject(deptPos) {
        return http.post("/admin/geo-location-route/add-position-dept-filter/org-chart-structures", deptPos);
    }
    async modifyNewOrgStrDeptPositionGeoProject(deptProId, deptPos) {
        return http.put(`/admin/geo-location-route/modify-position-dept-filter/org-chart-structures/${deptProId}`, deptPos);
    }
    async removedNewOrgStrDeptPositionGeoProject(deptProId, deptPos) {
        return http.delete(`/admin/geo-location-route/remove-position-dept-filter/org-chart-structures/${deptProId}`, deptPos);
    }
}