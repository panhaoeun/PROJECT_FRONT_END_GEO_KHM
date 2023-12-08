import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
const geoLocationServices = new GeoLocationsManagementServices();

const state = {
    commune: []
}
const getters = {
    communeAll: ({commune}) => commune,
}
const mutations = {
    SET_GEO_COMMUNE_LOCATION(state, data) {
        state.commune = data ? data : ''
    },
}
const actions = {
    async getAllCommuneActions({
        commit
    }, superSSNCommuneCode) {
        try {
            const communeZipType = 'T4';
            const superSSNCommuneCodeType = superSSNCommuneCode ? superSSNCommuneCode : '';
            geoLocationServices.listGeoLocationCommune(communeZipType, superSSNCommuneCodeType).then((commune) => {
                const getAllCommune= Array.isArray(commune) ? commune.slice() : [];
                if (!commune) {
                    commit('SET_GEO_COMMUNE_LOCATION', '');
                }
                commit('SET_GEO_COMMUNE_LOCATION', getAllCommune ? getAllCommune : '');
                return getAllCommune ? getAllCommune : [];
                
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
