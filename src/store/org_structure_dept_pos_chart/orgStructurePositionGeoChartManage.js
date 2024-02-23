import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
const geoDeptOrgStrServices = new ManageOrgChartStructureGeoProjectServices();

const state = {
    geoStrDeptGeo: [],
    geoStrDeptChartLevel02: [],
    geoStrDeptChartLevel03: [],
    geoStrDeptChartLevel04: [],
    geoStrDeptChartLevel05: [],
    orgBoardMgtStr: [],
    orgJobDescProId: [],
    orgPosJobDescProId: []
}
const getters = {
    allOrgBoardDeptStructureChart: ({
        geoStrDeptGeo
    }) => geoStrDeptGeo ? geoStrDeptGeo : [],
     allOrgPosJobDescriptionBaseProject: ({
         orgPosJobDescProId
     }) => orgPosJobDescProId ? orgPosJobDescProId : {},
}
const mutations = {
    // Get Hierarchy data for Structure Base Project or Country
    SET_HIERARCHY_DATA_ORG_STRUCTURE_BOARD_MGT(state, orgBoardMgtStr){
        state.orgBoardMgtStr = orgBoardMgtStr ? orgBoardMgtStr : [];
    },
    // Job Descriptions 
    SET_JOB_DESC_DATA_BOARD_MGT_PRO(state, orgJobDescProId){
        state.orgJobDescProId = orgJobDescProId ? orgJobDescProId : [];
    }
}
const actions = {
    async getAllGeoPositionDeptManageChart({
        commit
    }, params) {
        try {
            const orgStrChartLevelAc = params?.orgStrChartLevel ? params?.orgStrChartLevel : 'SL01';
            const orgStrCountryIdAc = parseInt(params?.orgStrChartCountryId) ? parseInt(params?.orgStrChartCountryId) : 0;
            const orgStrProjectIdAc = parseInt(params?.orgStrChartProjectId) ? parseInt(params?.orgStrChartProjectId) : 0;
            geoDeptOrgStrServices.listOrgStructureLevelProjectGeo(orgStrChartLevelAc, orgStrCountryIdAc, orgStrProjectIdAc).then((deptOrg) => {
                console.log(deptOrg)
                const getAllDeptOrgStrChart = Array.isArray(deptOrg) ? deptOrg.slice() : [];
                if (!deptOrg) {
                    commit('SET_ORG_STR_GEO_DEPT_POS', []);
                }
                if (orgStrChartLevelAc !== undefined || !orgStrChartLevelAc && typeof orgStrChartLevelAc !== 'string') {
                    if (orgStrChartLevelAc === 'SL01'){
                        commit('SET_ORG_STR_GEO_DEPT_POS', getAllDeptOrgStrChart ? getAllDeptOrgStrChart : []);
                    } else if (orgStrChartLevelAc === 'SL02') {
                        commit('SET_ORG_STR_GEO_DEPT_POS_CHART_LEVEL_02', getAllDeptOrgStrChart ? getAllDeptOrgStrChart : []);
                    } else if (orgStrChartLevelAc === 'SL03') {
                        commit('SET_ORG_STR_GEO_DEPT_POS_CHART_LEVEL_03', getAllDeptOrgStrChart ? getAllDeptOrgStrChart : []);
                    } else if (orgStrChartLevelAc === 'SL04') {
                        commit('SET_ORG_STR_GEO_DEPT_POS_CHART_LEVEL_04', getAllDeptOrgStrChart ? getAllDeptOrgStrChart : []);
                    } else if (orgStrChartLevelAc === 'SL05') {
                        commit('SET_ORG_STR_GEO_DEPT_POS_CHART_LEVEL_05', getAllDeptOrgStrChart ? getAllDeptOrgStrChart : []);
                    }else{
                        commit('SET_ORG_STR_GEO_DEPT_POS', []);
                    }
                }
                commit('SET_ORG_STR_GEO_DEPT_POS', getAllDeptOrgStrChart ? getAllDeptOrgStrChart : []);
                return getAllDeptOrgStrChart ? getAllDeptOrgStrChart : [];
            }).catch((error) => {
                throw Error(error);
            });
        } catch (error) {
           throw Error(error);
        }

    },
    /**
     * @Hierarchy Data Chart Structure Base Project Board Manager
    */
   async setDepartmentDataByCountryProjectId({commit}, payload){    
       const getProjectId  = payload?.getProjectId;
       const getCountryId = payload?.getCountryId;
       console.log(getCountryId)
       let projectIdOrgStr;
       let countryIdOrgStr;
       if (getProjectId !== null && !isNaN(Number(getProjectId)) || getProjectId !== '') {
            projectIdOrgStr =  parseInt(getProjectId) ? parseInt(getProjectId) : 0;
       }else{
            projectIdOrgStr = 0;
       }
       if (getCountryId !== null && getCountryId !== '' || getCountryId !== 'number' || typeof orgStrChartLevelAc !== 'string') {
            countryIdOrgStr = parseInt(getCountryId) ? parseInt(getCountryId) : 0;
       }else{
            countryIdOrgStr = 0;
       }
       geoDeptOrgStrServices.hierarchyDataOrgStructureGeoProject(projectIdOrgStr, countryIdOrgStr).then((orgDeptStr) => {
            const getAllHierarchyData = Array.isArray(orgDeptStr) ? orgDeptStr.slice() : [];
            if (!orgDeptStr) {
                commit('SET_HIERARCHY_DATA_ORG_STRUCTURE_BOARD_MGT', []);
            }else{
                commit('SET_HIERARCHY_DATA_ORG_STRUCTURE_BOARD_MGT', getAllHierarchyData ? getAllHierarchyData : [])
            } 
       });
   },
    /**
     * @Job Description base org-structures
    */
   async setJobDescriptionBaseOrgStrId({
           commit
       }, payload) {
        const getOrgStrId  = payload?.getOrgStrId;
        const getJobType = payload?.getJobDescType;
        let orgStrDecId;
        if (getOrgStrId !== null && !isNaN(Number(getOrgStrId)) || getOrgStrId !== '') {
            orgStrDecId = parseInt(getOrgStrId) ? parseInt(getOrgStrId) : 0;
        } else {
            orgStrDecId = 0;
        }
        geoDeptOrgStrServices.listJobDescriptionBaseOrgStrId(orgStrDecId, getJobType).then((orgDeptStr) => {
            const getAllJobDescription = Array.isArray(orgDeptStr) ? orgDeptStr.slice() : [];
            if (!orgDeptStr) {
                commit('SET_JOB_DESC_DATA_BOARD_MGT_PRO', []);
            } else {
                commit('SET_JOB_DESC_DATA_BOARD_MGT_PRO', getAllJobDescription ? getAllJobDescription : [])
            }
        });
   }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}