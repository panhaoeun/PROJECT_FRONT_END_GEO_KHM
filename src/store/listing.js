import Service from '../../services.js'

const state = {
  products: null,
  allCategories: null,
  categoryData: null,
  brands: null,
  collections: null,
  shippingRules: null,
  searched: '',
  searchedSuggestion: null
}
const getters = {
  products: ({ products }) => products,
  allCategories: ({ allCategories }) => allCategories,
  categoryData: ({ categoryData }) => categoryData,
  shippingRules: ({ shippingRules }) => shippingRules,
  brands: ({ brands }) => brands,
  collections: ({ collections }) => collections,
  searched: ({ searched }) => searched,
  searchedSuggestion: ({ searchedSuggestion }) => searchedSuggestion
}
const mutations = {
  SET_SEARCHED_SUGGESTION(state, data){
    state.searchedSuggestion = data
  },
  EMPTY_SEARCHED_SUGGESTION(state){
    state.searchedSuggestion = null
  },
  UPDATE_SEARCHED(state, data){
    state.searched = data
  },
  EMPTY_PRODUCTS(state){
    state.products = null
  },
  SET_PRODUCTS(state, data){
    console.log(data)

    state.products = data?.result;


    if(data?.all_categories){
      state.allCategories = data.all_categories
    }

    if(data?.category){
      state.categoryData = data.category
    }

    if(data?.collections){
      state.collections = data.collections
    }
  }
}

const actions = {
  setProducts({ commit }, payload) {
    commit('SET_PRODUCTS', payload)
  },

  updateSearch({ commit }, payload) {
    commit('UPDATE_SEARCHED', payload)
  },
  emptySearchedSuggestion({ commit }) {
    commit('EMPTY_SEARCHED_SUGGESTION')
  },
  emptyProducts({ commit }) {
    commit('EMPTY_PRODUCTS')
  },
//   async fetchProducts ({ commit }, params) {
//     const {data} = await Service.products(params)

//     if(data?.status === 200){
//       commit('SET_PRODUCTS', data)
//     }else {
//       return Promise.reject({statusCode: data?.status, message: data?.message })
//     }
//   },
  async fetchSearchedSuggestion ({ commit }, {params, lang}) {
    const {data} = await Service.search(params, lang);

    if (data.result?.statusCode === 200) {
      commit('SET_SEARCHED_SUGGESTION', data.result?.resultStatus ? data.result?.resultStatus : [])
    }else {
      return Promise.reject({statusCode: data?.status, message: data?.message })
    }
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}