import Service from "../../services"
import ProductServices from '@/services/vendors/products/ProductServices';
const productServicesMS = new ProductServices();

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
        state.product = data ? data : ''
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
        state.suggested = data ? data : '';
    },
    EMPTY_SUGGESTED_PRODUCTS(state) {
        state.suggested = null
    }
}

const actions = {
    async fetchProduct ({ commit }, {params}) {
        try {
           await productServicesMS.getCustomerProductsDetailByID(parseInt(params?.id))
                .then(async(proResult) => {
                    if (!Array.isArray(proResult) || !proResult.length > 0) {
                        state.product = [];
                    }
                    const productDetail = Array(proResult) ? Array(proResult) : [];
                    commit('SET_PRODUCT', productDetail);
                }    
            );            
        } catch (e) {
            return Promise.reject({
                message: e.message
            })
        }
    },
    emptySuggestedProducts({
          commit
      }) {
          commit('SET_SUGGESTED_PRODUCTS')
    },
    async fetchSuggestedProducts ({ commit }, {id, page, lang}) {
        const {data} = await Service.suggestedProducts(id, page, lang);

        if (data.result?.statusCode === 200) {
            commit('SET_SUGGESTED_PRODUCTS', data.result.resultStatus?.result)
        }else {
            return Promise.reject({statusCode: data?.status, message: data?.message })
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