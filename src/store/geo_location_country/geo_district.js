import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
const geoLocationServices = new GeoLocationsManagementServices();

const state = {
    district: []
}
const getters = {
    districtAll: ({district}) => district,
}
const mutations = {
    SET_GEO_DISTRICT_LOCATION(state, data) {
        state.district = data ? data : [];
    },
}
const actions = {
    async getAllDistrictActions({
        commit
    }, superSSNDistrictCode) {
        try {
            const districtZipType = 'T3';
            const superSSNCountryCode = superSSNDistrictCode ? superSSNDistrictCode : '';
            geoLocationServices.listGeoLocationDistrict(districtZipType, superSSNCountryCode).then((district) => {
                const getAllDistrict = Array.isArray(district) ? district.slice() : [];
                if (!district) {
                    commit('SET_GEO_DISTRICT_LOCATION', '');
                }
                commit('SET_GEO_DISTRICT_LOCATION', getAllDistrict ? getAllDistrict : []);
                return getAllDistrict ? getAllDistrict : [];
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
