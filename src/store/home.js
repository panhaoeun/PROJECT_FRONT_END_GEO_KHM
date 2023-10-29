import ProductServices from '@/services/vendors/products/ProductServices';
const productServicesMS = new ProductServices();

const state = {
  slider: null,
  banners: null,
  collections: null,
  featured_categories: null,
  featured_brands: null,
  flash_sales: null,
  products: null,
  hasHomeData: false
}
const getters = {
  hasHomeData: ({ hasHomeData }) => hasHomeData,
  slider: ({ slider }) => slider,
  collections: ({ collections }) => collections,
  banners: ({ banners }) => banners,
  featuredCategories: ({ featured_categories }) => featured_categories,
  featuredBrands: ({ featured_brands }) => featured_brands,
  flashSales: ({ flash_sales }) => flash_sales,
  products: ({ products }) => products
}
const mutations = {
  SET_FLASH_SALES(state, data){
    state.flash_sales =  data
  },
  SET_HOME_DATA(state, data){
    const home = data.data
    state.slider = home?.slider
    state.hasHomeData = true
    state.banners =  home?.banners
    state.collections =  home?.collections
    state.featured_categories =  home?.featured_categories
    state.featured_brands =  home?.featured_brands
    state.flash_sales =  home?.flash_sales
  },
  SET_PRODUCTS(state, proResult) {
    state.products = proResult ? proResult : [];
  }
}   
const actions = {
  async fetchProducts ({ commit }, {payload}) {
    try {
        await productServicesMS.getCustomerProductsData(payload)
        .then(async (proResult) => {
                if (!Array.isArray(proResult) || !proResult.length > 0) {
                    state.products = [];
                }
                const result = Array.isArray(proResult?.products) ? proResult?.products.slice() : [];
                commit('SET_PRODUCTS', result);
                commit('common/SET_LOADING', false, {root: true})
                return result;
        })
        .catch((data) => {
             return Promise.reject({
                 statusCode: data.status,
                 message: data.message
             })
        })
    }catch (e) {
      return Promise.reject({
        message: e.message
      })
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