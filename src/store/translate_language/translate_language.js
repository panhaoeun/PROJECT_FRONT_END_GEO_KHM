// import TranslateLanguageManagementServices from "@/services/administrator/translate_language_managements/TranslateLanguageManagementServices";

// const tranlateLanguageServices = new TranslateLanguageManagementServices();

// const state = {
//     tranlate: []
// }
// const getters = {
//     tranlateAll: ({ tranlate }) => tranlate,
// }
// const mutations = {
//     SET_TRANSLATE_lANGUAGE(state, data) {
//         state.tranlate = data ? data : ''
//     },
// }
// const actions = {
//     async getAllCountryActions({translate}) {
//         try {
//             const countryZipTypeCountry = 'T2';
//             const superSSNCountryCode = "";
//             TranslateLanguageManagementServices.listTranslateLanguage(countryZipTypeCountry, superSSNCountryCode).then((country) => {
//                 const getAllCountry = Array.isArray(country) ? country.slice() : [];
//                 if (!country) {
//                     commit('SET_GEO_COUNTRY_LOCATION', '');
//                 }
//                 this.loadingCountry = false;
//                 commit('SET_GEO_COUNTRY_LOCATION', getAllCountry ? getAllCountry : '');
//                 return getAllCountry ? getAllCountry : [];
//             }).catch((error) => {
//                 return Promise.reject(error.message || []);
//             });
//         } catch (error) {
//             return Promise.reject(error.message || []);
//         }
//     },
// }

// export default {
//     namespaced: true,
//     state,
//     getters,
//     actions,
//     mutations           
// }
