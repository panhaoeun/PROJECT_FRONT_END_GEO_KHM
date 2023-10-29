const state = {
    product: null,
    suggested: null,
}
const getters = {
    product: ({
        product
    }) => product,
    suggested: ({
        suggested
    }) => suggested,
}
const mutations = {
    SET_PRODUCT(state, data) {
        state.product = data?.data
    },
    UPDATE_WISHLIST(state, data) {
        state.product = {
            ...state.product,
            ...{
                wishlisted: data?.data ? 1 : null
            }
        }
    },
    SET_SUGGESTED_PRODUCTS(state, data) {
        state.suggested = data?.data
    },
    EMPTY_SUGGESTED_PRODUCTS(state) {
        state.suggested = null
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}