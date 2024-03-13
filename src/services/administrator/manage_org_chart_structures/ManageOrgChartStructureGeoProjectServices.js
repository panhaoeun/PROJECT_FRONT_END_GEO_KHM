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
    async hierarchyDataOrgStructureGeoProject(orgChartProId, orgChartCountryId, checkTypeOrgStr, orgDataStrChart) {
        return http.get(`/admin/geo-location-route/generate-multi-level/org-chart-structures?orgChartDeptProId=${orgChartProId}&orgChartDeptCountryId=${orgChartCountryId}&checkTypeHierarchyStr=${checkTypeOrgStr}`, orgDataStrChart ? orgDataStrChart : {}).then((result) => {
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
    async createStoreEmpOrgDeptPosition(orgStrPosId) {
        return http.post("/admin/geo-location-route/add-new-multi-level/org-chart-structures", orgStrPosId ? orgStrPosId : {});
    }
    async assignStoreEmpDeptForOrgStructure(assignEmpOrgId, orgStrPosData) {
        return http.put(`/admin/geo-org-structures-dept-assign-employee-manager/${assignEmpOrgId}`, orgStrPosData ? orgStrPosData : {});
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
    async modifyOrgStructureAssignEmpPos(orgChartStrId, checkAssignTypeOrgChart, orgAssignData) {
        return http.put(`/admin/geo-location-route/assign-level-manage-emp-pos/org-chart-structures?orgChartStrId=${orgChartStrId}&checkAssignTypeOrgChart=${checkAssignTypeOrgChart}`, orgAssignData);
    }
    /** 
     * @api {post} 
     *  @api (Job Descriptions API endpoints) 
     */
    async listJobDescriptionBaseOrgStrId(orgStrId, jobDescType) {
        return await http.get(`/admin/geo-location-route/org-chart-structures/list-job-dec-pos-dept?orgIdJobDesc=${orgStrId}&jobDescType=${jobDescType}`).then((result) => {
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
    async createNewJobDescBaseOrStrId(jobDescription) {
        return http.post("/admin/geo-location-route/org-chart-structures/add-new-job-dec-pos-dept", jobDescription ? jobDescription : {});
    }
    async modifyNewOrgStructureJobDescriptions(jobDecId, data) {
        return http.put(`/admin/geo-location-route/org-chart-structures/modify-job-dec-pos-dept/${jobDecId}`, data);
    }
    async removeNewOrgStructureJobDesc(jobDesId, data) {
        return http.delete(`/admin/geo-location-route/org-chart-structures/remove-job-dec-pos-dept/${jobDesId}`, data);
    }

    // Employee
    async listStoreEmpOrgDept(orgStrPosId) {
        return http.get("/admin/get-employee-list-by-dept-org", orgStrPosId ? orgStrPosId : {}).then((result) => {
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
    async createStoreEmpOrg(orgStrPosId) {
        return http.post("/admin/get-employee-add-new-by-dept-org", orgStrPosId ? orgStrPosId : {});
    }
}