import Service from '../../services';

const state = {
    categories: null
}
const getters = {
    categories: ({
        categories
    }) => categories,
}
const mutations = {
    SET_CATEGORIES(state, data) {
        state.categories = data ? data : ''
    },
    EMPTY_CATEGORIES(state) {
        state.categories = null
    }
}

const actions = {
    emptyCategories({
        commit
    }) {
        commit('EMPTY_CATEGORIES')
    },
    async fetchCategories({
        commit
    }) {
        let data = null
        data = await Service.categories();
        if (data?.status === 200) {
            commit('SET_CATEGORIES', data.data.result.resultStatus?.categories ? data.data.result.resultStatus?.categories : []);
        } else {
            return Promise.reject({
                statusCode: data?.status,
                message: data?.message
            });
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
