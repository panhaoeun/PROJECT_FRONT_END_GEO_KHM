import ManagePermissionsGeoFencePositionPermissionsServices from "@/services/administrator/geo_admin_position_manage_permissions/GeoAdminPositionPermissionsManagementServices";
const geoDeptOrgStrServices = new ManagePermissionsGeoFencePositionPermissionsServices();

const state = {
    geoStrDeptGeo: []
}
const getters = {
    allOrgBoardDeptStructureChart: ({
        geoStrDeptGeo
    }) => geoStrDeptGeo ? geoStrDeptGeo : [],
}
const mutations = {
    SET_ORG_STR_GEO_DEPT_POS(state, orgDeptPos) {
        state.geoStrDeptGeo = orgDeptPos ? orgDeptPos : [];
    },
}
const actions = {
    async getAllGeoPositionDeptManageChart({
        commit
    }, {
        orgStrChartLevel,
        orgStrChartCountryId,
        orgStrChartProjectId
    }) {
        try {
            const orgStrChartLevelAc = orgStrChartLevel ? orgStrChartLevel : 'SL01';
            const orgStrCountryIdAc = parseInt(orgStrChartCountryId) ? parseInt(orgStrChartCountryId) : 0;
            const orgStrProjectIdAc = parseInt(orgStrChartProjectId) ? parseInt(orgStrChartProjectId) : 0;
            geoDeptOrgStrServices.listOrgStructureLevelProjectGeo(orgStrChartLevelAc, orgStrCountryIdAc, orgStrProjectIdAc).then((deptOrg) => {
                const getAllDeptOrgStrChart = Array.isArray(deptOrg) ? deptOrg.slice() : [];
                if (!deptOrg) {
                    commit('SET_ORG_STR_GEO_DEPT_POS', []);
                }
                commit('SET_ORG_STR_GEO_DEPT_POS', getAllDeptOrgStrChart ? getAllDeptOrgStrChart : []);
                return getAllDeptOrgStrChart ? getAllDeptOrgStrChart : [];
            }).catch((error) => {
                return Promise.reject(error.message || []);
            });
        } catch (error) {
            return Promise.reject(error.message || []);
        }

    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}