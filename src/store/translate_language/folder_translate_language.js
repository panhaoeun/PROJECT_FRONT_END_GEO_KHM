import FolderTranslateManagementServices from "@/services/administrator/translate_language_managements/TranslateLanguageManagementServices";
const FolderTranslateServices = new FolderTranslateManagementServices();

const state = {
    folder: []
}
const getters = {
    folderAll: ({folder}) => folder,
}
const mutations = {
    SET_FOLDER_TRANSLATE(state, data) {
        state.folder = data ? data : ''
    },
}
const actions = {
    async getAllFolderActions({
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
