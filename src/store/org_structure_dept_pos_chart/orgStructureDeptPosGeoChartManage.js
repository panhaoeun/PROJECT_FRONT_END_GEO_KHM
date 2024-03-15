import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
const geoDeptOrgStrServices = new ManageOrgChartStructureGeoProjectServices();

const state = {
    geoStrDeptGeo: [],
    geoStrDeptChartLevel02: [],
    geoStrDeptChartLevel03: [],
    geoStrDeptChartLevel04: [],
    geoStrDeptChartLevel05: [],
    orgBoardMgtStr: [],
    positionDeptOrgBoardMgt: [],
    orgJobDescProId: [],
    orgPosJobDescProId: []
}
const getters = {
    allOrgBoardDeptStructureChart: ({
        geoStrDeptGeo
    }) => geoStrDeptGeo ? geoStrDeptGeo : [],
    allOrgBoardDeptStructure02LevelChart: ({
         geoStrDeptChartLevel02
    }) => geoStrDeptChartLevel02 ? geoStrDeptChartLevel02 : [],
    allOrgBoardDeptStructure03LevelChart: ({
          geoStrDeptChartLevel03
    }) => geoStrDeptChartLevel03 ? geoStrDeptChartLevel03 : [],
    allOrgBoardDeptStructure04LevelChart: ({
         geoStrDeptChartLevel04
    }) => geoStrDeptChartLevel04 ? geoStrDeptChartLevel04 : [],
    allOrgBoardDeptStructure05LevelChart: ({
        geoStrDeptChartLevel05
    }) => geoStrDeptChartLevel05 ? geoStrDeptChartLevel05 : [],
    /**
     * @Hierarchy Data base Org - Structure Chart - Position Management Structure
     * */ 
    allOrgBoardHierarchyStructure: ({
        orgBoardMgtStr
    }) => orgBoardMgtStr ? orgBoardMgtStr : {},
    // Get Position Based on Management Board Department
    allOrgBoardPositionBaseDeptBoardHierarchyStructure: ({
        positionDeptOrgBoardMgt
    }) => positionDeptOrgBoardMgt ? positionDeptOrgBoardMgt : {},

    // Job Descriptions
    allOrgJobDescriptionAssignDepartmentAssign: ({
        orgJobDescProId
    }) => orgJobDescProId ? orgJobDescProId : {},
    allOrgJobPositionDescriptionAssign: ({
        orgPosJobDescProId
    }) => orgPosJobDescProId ? orgPosJobDescProId : {},
}
const mutations = {
    SET_ORG_STR_GEO_DEPT_POS(state, orgDeptPos) {
        state.geoStrDeptGeo = orgDeptPos ? orgDeptPos : [];
    },
    SET_ORG_STR_GEO_DEPT_POS_CHART_LEVEL_02(state, geoStrDeptChartLevel02) {
        state.geoStrDeptChartLevel02 = geoStrDeptChartLevel02 ? geoStrDeptChartLevel02 : [];
    },
    SET_ORG_STR_GEO_DEPT_POS_CHART_LEVEL_03(state, geoStrDeptChartLevel03) {
        state.geoStrDeptChartLevel03 = geoStrDeptChartLevel03 ? geoStrDeptChartLevel03 : [];
    },
    SET_ORG_STR_GEO_DEPT_POS_CHART_LEVEL_04(state, geoStrDeptChartLevel03) {
        state.geoStrDeptChartLevel04 = geoStrDeptChartLevel03 ? geoStrDeptChartLevel03 : [];
    },
    SET_ORG_STR_GEO_DEPT_POS_CHART_LEVEL_05(state, geoStrDeptChartLevel03) {
        state.geoStrDeptChartLevel05 = geoStrDeptChartLevel03 ? geoStrDeptChartLevel03 : [];
    },
    /**
     * @Hierarchy Data base Org - Structure Chart - Position Management Structure
    * */
    SET_HIERARCHY_DATA_ORG_STRUCTURE_BOARD_MGT(state, orgBoardMgtStr){
        state.orgBoardMgtStr = orgBoardMgtStr ? orgBoardMgtStr : {};
    },
    // Get Relist Position of Department base project or country
    SET_POSITION_DEPT_ORG_STR_GEO_LEVEL(state, positionDeptOrgBoardMgt) {
        state.positionDeptOrgBoardMgt = positionDeptOrgBoardMgt ? positionDeptOrgBoardMgt : {};
    },
    // Job Descriptions 
    SET_JOB_DESC_DATA_BOARD_DEPARTMENT(state, orgJobDescProId) {
        state.orgJobDescProId = orgJobDescProId ? orgJobDescProId : [];
    },
    SET_JOB_POST_DESC_DATA_POSITION(state, orgPosJobDescProId) {
        state.orgPosJobDescProId = orgPosJobDescProId ? orgPosJobDescProId : [];
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
            // Super Chart Id
            const orgStrSuperChartIdAcc = params?.orgStrSuperChartId ? params?.orgStrSuperChartId : 0;
            geoDeptOrgStrServices.listOrgStructureLevelProjectGeo(orgStrChartLevelAc, orgStrCountryIdAc, orgStrProjectIdAc, orgStrSuperChartIdAcc).then((deptOrg) => {
                const getAllDeptOrgStrChart = deptOrg ? deptOrg : {};
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
                console.log(error)
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
        const checkHierarchyType = payload?.typeHierarchy ? payload?.typeHierarchy : '';
       let projectIdOrgStr;
       let countryIdOrgStr;
       projectIdOrgStr = parseInt(getProjectId) ? parseInt(getProjectId) : 0;
       countryIdOrgStr = parseInt(getCountryId) ? parseInt(getCountryId) : 0;
       geoDeptOrgStrServices.hierarchyDataOrgStructureGeoProject(projectIdOrgStr, countryIdOrgStr, checkHierarchyType).then((orgDeptStr) => {
            const getAllHierarchyData = Array.isArray(orgDeptStr) ? orgDeptStr.slice() : {};
            if (!orgDeptStr) {
                commit('SET_HIERARCHY_DATA_ORG_STRUCTURE_BOARD_MGT', {});
            }else{
                commit('SET_HIERARCHY_DATA_ORG_STRUCTURE_BOARD_MGT', getAllHierarchyData ? getAllHierarchyData : {})
            } 
       });
   },
    /**
     * @Data Chart Position of the chart manager (department of position of the chart)
    */
   async setRelistPositionDataByDepartment({commit}, payload) {
        try{
            const getParentOrgStrId = payload?.getParentPosOrgId;
            const getParentSuperPosOrgStrId = payload?.getSuperOrgPosId;
            const getOrgPosStrLevel = payload?.getOrgPosLevel;
            let parentOrgPosSuperId;
            if (getParentSuperPosOrgStrId !== null || getParentSuperPosOrgStrId !== '') {
                parentOrgPosSuperId = getParentSuperPosOrgStrId ? getParentSuperPosOrgStrId : 0;
            } else {
                parentOrgPosSuperId = 0;
            }
            geoDeptOrgStrServices.listOrgStructureLevelDeptPositionGeo(getParentOrgStrId, parentOrgPosSuperId, getOrgPosStrLevel).then((orgDeptPosStr) => {
                const getAllPositionBaseOrgStr = Array.isArray(orgDeptPosStr) ? orgDeptPosStr.slice() : {};
                if (!orgDeptPosStr) {
                    commit('SET_POSITION_DEPT_ORG_STR_GEO_LEVEL', {});
                } else {
                    commit('SET_POSITION_DEPT_ORG_STR_GEO_LEVEL', getAllPositionBaseOrgStr ? getAllPositionBaseOrgStr : {})
                }
            });
        }catch(error){
            throw Error(error);
        }
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
                commit('SET_JOB_DESC_DATA_BOARD_DEPARTMENT', []);
                commit('SET_JOB_POST_DESC_DATA_POSITION', []);
            } else {
                if (getJobType === "Department") {
                    commit('SET_JOB_DESC_DATA_BOARD_DEPARTMENT', getAllJobDescription ? getAllJobDescription : [])
                } else if (getJobType === "Position" ){
                    commit('SET_JOB_POST_DESC_DATA_POSITION', getAllJobDescription ? getAllJobDescription : [])
                }else{ 
                    commit('SET_JOB_DESC_DATA_BOARD_DEPARTMENT', []);
                    commit('SET_JOB_POST_DESC_DATA_POSITION', []);
                }
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