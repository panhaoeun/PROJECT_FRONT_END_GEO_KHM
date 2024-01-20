import ManagePermissionsGeoFencePositionPermissionsServices from "@/services/administrator/geo_admin_position_manage_permissions/GeoAdminPositionPermissionsManagementServices";
const geoDeptOrgStrServices = new ManagePermissionsGeoFencePositionPermissionsServices();

const state = {
    geoOrgProjectNameOrg: []
}
const getters = {
    allGeoProjectNameOrg: ({
        geoOrgProjectNameOrg
    }) => geoOrgProjectNameOrg ? geoOrgProjectNameOrg : [],
}
const mutations = {
    SET_LIST_GEO_PROJECT_ORG_STR(state, orgPos) {
        state.geoOrgProjectNameOrg = orgPos ? orgPos : [];
    },
}
const actions = {
    async getAllProjectBaseOrgStr({
        commit
    }) {
        try {
            geoDeptOrgStrServices.listProjectBaseDeptOrgStr().then((projectName) => {
                const getAllDeptProjectsOrgStr = Array.isArray(projectName) ? projectName.slice() : [];
                if (!projectName) {
                    commit('SET_LIST_GEO_PROJECT_ORG_STR', []);
                }
                // remove duplicates from array 
                commit('SET_LIST_GEO_PROJECT_ORG_STR', getAllDeptProjectsOrgStr ? getAllDeptProjectsOrgStr : {});
                return getAllDeptProjectsOrgStr ? getAllDeptProjectsOrgStr : [];
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