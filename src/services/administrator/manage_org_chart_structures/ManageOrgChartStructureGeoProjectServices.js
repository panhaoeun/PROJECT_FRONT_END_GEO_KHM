import http from "../../../../http-access-control-json";
import httpFormData from "../../../../http-access-control";

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
        return http.delete(`/admin/geo-location-route/remove-new-multi-level/org-chart-structures/${orgChartStrId}`, stateGeo).then((result) => {
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
        return httpFormData.put(`/admin/geo-org-structures-dept-assign-employee-manager/${assignEmpOrgId}`, orgStrPosData ? orgStrPosData : {});
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
     *  @api (Department Job Descriptions API endpoints) 
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
        return httpFormData.post("/admin/geo-location-route/org-chart-structures/add-new-job-dec-pos-dept", jobDescription ? jobDescription : {});
    }
    async modifyNewOrgStructureJobDescriptions(jobDecId, data) {
        return httpFormData.put(`/admin/geo-location-route/org-chart-structures/modify-job-dec-pos-dept/${jobDecId}`, data);
    }
    async removeNewOrgStructureJobDesc(jobDesId, data) {
        return http.delete(`/admin/geo-location-route/org-chart-structures/remove-job-dec-pos-dept/${jobDesId}`, data);
    }
    /** 
     * @api {post} 
     *  @api (Position Job Descriptions API endpoints) 
     */
    async listJobPositionDescriptionBaseOrgStrId(positionId) {
        return await http.get(`/admin/geo-location-route/org-chart-structures/list-position-dept-des?positionId=${positionId}`).then((result) => {
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
    async createNewPositionJobDescBaseOrStrId(jobPosDescription) {
        return httpFormData.post("/admin/geo-location-route/org-chart-structures/add-new-position-dept-des", jobPosDescription ? jobPosDescription : {});
    }
    async modifyNewOrgStructurePositionJobDescriptions(jobPosDecId, data) {
        return httpFormData.put(`/admin/geo-location-route/org-chart-structures/modify-position-dept-des/${jobPosDecId}`, data);
    }
    async removeNewOrgStructurePositionJobDesc(jobPosDesId, data) {
        return http.delete(`/admin/geo-location-route/org-chart-structures/remove-position-dept-des/${jobPosDesId}`, data);
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
    async removeEmpOrgDept(jobDesId, data) {
        return http.delete(`/admin/geo-location-route/org-chart-structures/remove-job-dec-pos-dept/${jobDesId}`, data);
    }
    /**
     * Assign Employee to the org-chart 
     * */
    async getAllListEmpOrgStructuresDeptAssignData(parentOrgPosSuperId, data) {
        return http.get(`/admin/geo-location-route/org-chart-structures-department-employee/list-dept-org-emp?orgStrDeptId=${parentOrgPosSuperId}`, data ? data : {}).then((result) => {
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
    async addNewAssignEmployeeOrgStructure(orgEmpId, assignEmpDataOrg) {
        return httpFormData.put(`/admin/geo-location-route/org-chart-structures-department-employee/add-dept-org-emp/${orgEmpId}`, assignEmpDataOrg ? assignEmpDataOrg : {});
    }
    /**
     * History Work 
    * */ 
   async getAllListHistoryOfEmpPosDept(empDeptHistory, data) {
       return http.get(`/admin/get-history-employee-list-get-dept-org/history-emp-dept-officer?historyEmpDeptId=${empDeptHistory}`, data ? data : {}).then((result) => {
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
   async getViewDetailByOfficeEmpPosDeptByEmpId(getHistoryOfficerId, officerHistoryData) {
       return http.get(`/admin/get-store-history-employee-by-dept-org/get-history-emp-dept-officer-by-dept?getHistoryOfficerId=${getHistoryOfficerId}`, officerHistoryData ? officerHistoryData : {}).then((result) => {
           if (!result) {
               return false;
           }
           if (result.status == 200) {
               if (result.data.success == true) {
                   return result.data.result?.resultStatus;
               }
           }
       }).catch((error) => {
           throw Error(error || error.message);
       });
   }
    /**
     * Employee Resign Working
    * */
   // Get list employee resigned
   async getAllEmployeeResignDataByDeptOrgId(empResignId, empResignData) {
       return http.get(`/admin/get-resign-employee-list-get-dept-org/resign-emp-dept-officer?orgResignDeptOrgId=${empResignId}`, empResignData ? empResignData : {}).then((resign) => {
           if (!resign) {
               return false;
           }
           if (resign?.status == 200) {
               if (resign?.data.success == true) {
                   return resign?.data.result.resultStatus;
               }
           }
       }).catch((error) => {
           throw Error(error || error.message);
       });
   }
   async addNewEmpResignDataBYDept(orgStrPosId) {
       return httpFormData.post("/admin/get-employee-resign-by-dept-org-add-history-job-working", orgStrPosId ? orgStrPosId : {});
   }
   async approvedEmpResignDataBYDept(resignOfficerEmpId, orgStrPosId) {
       return http.put(`/admin/approved-status-employee-resign-by-dept-org-approved-history-job-working/resignOfficerEmpId/${resignOfficerEmpId}`, orgStrPosId ? orgStrPosId : {});
   }
    /**
     * @Change Position 
    */
    //Change Positions
    async employeeChangePositionEmployee(orgStrPosId) {
        return http.post("/admin/change-position-employee-resign-by-dept-org-add-position-job-working", orgStrPosId ? orgStrPosId : {});
    }
}