import Service from '../.../../../services'

const state = {
  location: { countryCode: 'AF', region:'BDS' },
  site_setting: {},
  setting: {
    currency: 'USD',
    currency_icon_riel: '៛',
    currency_icon: '$',
    decimal_format: 'en-US',
    currency_position: 1,
    phone: '',
    email: '',
  },
  subCategoriesMap: null,

  categories: null,
  topBanner: null,
  popupBanner: null,
  headerLinks: {
    left: [],
    right: [],
  },
  services: null,
  about: null,
  payment: null,
  social: null,
  toastMessage: "",
  toastMessageStatus: false,
  toastError: false
}
const getters = {
  location: ({location}) => location,
  headerLinks: ({ headerLinks }) => headerLinks,
  site_setting: ({ site_setting }) => site_setting,
  setting: ({ setting }) => setting,
  topBanner: ({ topBanner }) => topBanner,
  popupBanner: ({ popupBanner }) => popupBanner,
  currencyPosition: ({ setting }) => setting.currency_position,
  currencyIconRiel: ({ setting }) => setting.currency_icon_riel,
  currencyIcon: ({ setting }) => setting.currency_icon,
  currency: ({ setting }) => setting.currency,
  categories: ({ categories }) => categories,

  subCategoriesMap: ({ subCategoriesMap }) => subCategoriesMap,
  services: ({ services }) => services,
  about: ({ about }) => about,
  payment: ({ payment }) => payment,
  paymentGateway: ({ paymentGateway }) => paymentGateway,
  social: ({ social }) => social,
  toastMessage:({ toastMessage }) => toastMessage,
  toastError:({ toastError }) => toastError,
  toastMessageStatus:({ toastMessageStatus }) => toastMessageStatus
}
const mutations = {
  SET_PAYMENT_GATEWAY(state, paymentGateway) {
    state.paymentGateway = paymentGateway
  },
  SET_LOCATION (state, location) {
    state.location = JSON.parse(location)
  },
  SET_TOAST_MESSAGE(state, toastMessage = 'Success') {
    state.toastError = false
    state.toastMessageStatus = true
    state.toastMessage = toastMessage
  },
  SET_TOAST_ERROR (state, toastMessage) {
    state.toastError = true
    state.toastMessageStatus = true
    state.toastMessage = toastMessage
  },
  HIDE_TOAST(state) {
    state.toastMessageStatus = false
    state.toastError = false
    state.toastMessage = ''
  },
  SET_LOADING: (state, payload) => (state.loading = payload),
  SET_SUB_CAT_DATA(state, categories){
    const subCategoriesMap = {}
    categories?.forEach(i => {
      i?.public_sub_categories?.forEach(j => {
        subCategoriesMap[j.id] = {title: i.id, slug: i.slug}
      })
    })
    state.subCategoriesMap = subCategoriesMap
  },

  SET_COMMON_DATA(state, data){
    const common = data.data

    if(common?.setting){
      state.setting = common?.setting
    }

    if(common?.site_setting){
      state.site_setting = common?.site_setting
    }

    state.headerLinks = common?.header_links
    state.popupBanner = common?.popup_banner
    state.topBanner = common?.top_banner
    state.categories = common?.categories

    state.services =  common?.services
    state.about =  common?.about
    state.payment =  common?.payment
    state.social =  common?.social
  }
}

const actions = {
  async getRequest ({commit},{params, api, requiredToken, lang}) {
    try {
      const {data} = await Service.getRequest(params, api, requiredToken ? this.$auth.strategy.token.get(): null, lang);
      if (data?.success) {
        commit('SET_LOADING', data?.result.resultStatus);
        return data?.result.resultStatus;
      } else {
        return Promise.reject({
          message: "API is down."
        });
      }
    }catch (e) {

      return Promise.reject({
        message: e.message
      })
    }

  },
  setToastMessage ({ commit }, message) {
    commit('SET_TOAST_MESSAGE', message)
  },
  setToastError ({ commit }, message) {
    commit('SET_TOAST_ERROR', message)
  },
  hideToast ({ commit }) {
    commit('HIDE_TOAST')
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}