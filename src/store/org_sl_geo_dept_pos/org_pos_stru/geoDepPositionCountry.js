import ManagePermissionsGeoFencePositionPermissionsServices from "@/services/administrator/geo_admin_position_manage_permissions/GeoAdminPositionPermissionsManagementServices";
const geoDeptOrgStrServices = new ManagePermissionsGeoFencePositionPermissionsServices();

const state = {
    geoOrgPositionOrg: []
}
const getters = {
    allGeoPositionOrgStr: ({geoOrgPositionOrg}) => geoOrgPositionOrg ? geoOrgPositionOrg : [],
}
const mutations = {
    SET_LIST_GEO_POSITION_ORG_STR_COUNTRY(state, orgPos) {
        state.geoOrgPositionOrg = orgPos ? orgPos : [];
    },
}
const actions = {
    async getAllGeoPositionOrgCountryStr({
        commit
    }) {
        try {
            geoDeptOrgStrServices.listGeoLocationPositionsOrgSLGeoTreeView.then((deptPosOrg) => {
                const getAllPositionOrgStr = Array.isArray(deptPosOrg) ? deptPosOrg.slice() : [];
                if (!deptPosOrg) {
                    commit('SET_LIST_GEO_POSITION_ORG_STR_COUNTRY', []);
                }
                // remove duplicates from array 
                commit('SET_LIST_GEO_POSITION_ORG_STR_COUNTRY', getAllPositionOrgStr ? getAllPositionOrgStr : '');
                return getAllPositionOrgStr ? getAllPositionOrgStr : [];
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