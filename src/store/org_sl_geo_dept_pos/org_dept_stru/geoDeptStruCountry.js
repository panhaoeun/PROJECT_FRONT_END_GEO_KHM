import ManagePermissionsGeoFencePositionPermissionsServices from "@/services/administrator/geo_admin_position_manage_permissions/GeoAdminPositionPermissionsManagementServices";
const geoDeptOrgStrServices = new ManagePermissionsGeoFencePositionPermissionsServices();

const state = {
    geoOrgDept: []
}
const getters = {
    allGeoDeptOrg: ({geoOrgDept}) => geoOrgDept ? geoOrgDept : [],
}
const mutations = {
    SET_LIST_GEO_DEPT_ORG_STR_COUNTRY(state, orgDept) {
        state.geoOrgDept = orgDept ? orgDept : [];
    },
}
const actions = {
    async getAllGeoDeptOrgCountryStr({
        commit
    }, {
        deptOrgProjectId,
        countryOrgIdGeo
    }) {
        try {
            geoDeptOrgStrServices.listGeoLocationDepartmentsOrgSLGeo(deptOrgProjectId, countryOrgIdGeo).then((deptOrg) => {
                const getAllDeptOrgStr = Array.isArray(deptOrg) ? deptOrg.slice() : [];
                if (!deptOrg) {
                    commit('SET_LIST_GEO_DEPT_ORG_STR_COUNTRY', []);
                }
                commit('SET_LIST_GEO_DEPT_ORG_STR_COUNTRY', getAllDeptOrgStr ? getAllDeptOrgStr : '');
                return getAllDeptOrgStr ? getAllDeptOrgStr : [];
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