import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
const geoLocationServices = new GeoLocationsManagementServices();

const state = {
    province: []
}
const getters = {
    provinceAll: ({
        province
    }) => province,
}
const mutations = {
    SET_GEO_PROVINCE_LOCATION(state, data) {
        state.province = data ? data : ''
    },
}
const actions = {
    async getAllProvinceActions({commit}, superSSNStateCode) {
        try {
            const countryZipTypeProvince = 'T2';
            const superSSNCountryCode = superSSNStateCode ? superSSNStateCode : '';
            geoLocationServices.listGeoLocationProvinceState(countryZipTypeProvince, superSSNCountryCode).then((province) => {
                const getAllProvince = Array.isArray(province) ? province.slice() : [];
                if (!province) {
                    commit('SET_GEO_PROVINCE_LOCATION', '');
                }
                this.loadingProvince = true;
                commit('SET_GEO_PROVINCE_LOCATION', getAllProvince ? getAllProvince : '');
                return getAllProvince ? getAllProvince : [];
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
