import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
const geoLocationServices = new GeoLocationsManagementServices();

const state = {
    villages: []
}
const getters = {
    communeAll: ({villages}) => villages,
}
const mutations = {
    SET_GEO_VILLAGES_LOCATION(state, data) {
        state.villages = data ? data : ''
    },
}
const actions = {
    async getAllVillagesActions({
        commit
    }, superSSNCommuneCode) {
        try {
            const districtZipType = 'T3';
            const superSSNCountryCode = superSSNCommuneCode ? superSSNCommuneCode : '';
            geoLocationServices.listGeoLocationDistrict(districtZipType, superSSNCountryCode).then((villages) => {
                const getAllCommune = Array.isArray(villages) ? villages.slice() : [];
                if (!villages) {
                    commit('SET_GEO_VILLAGES_LOCATION', '');
                }
                commit('SET_GEO_VILLAGES_LOCATION', getAllCommune ? getAllCommune : '');
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
