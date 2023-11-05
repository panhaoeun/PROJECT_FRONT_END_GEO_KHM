const state = () => ({
  userToken: null,
  profile: null,
  vouchers: null,
  allAddress: []
})
const getters = {
  userToken: ({userToken}) => userToken,
  profile: ({profile}) => profile,
  vouchers: ({vouchers}) => vouchers,
  allAddress: ({allAddress}) => allAddress
}
const mutations = {
  SET_USER_TOKEN(state, userToken) {
    localStorage.setItem('user_token', userToken)
    state.userToken = userToken
  },
  EMPTY_VOUCHER(state) {
    state.vouchers = null
  },
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
}

const actions = {
  getUserToken({state, commit}) {
    if (!state.userToken) {
      let token = localStorage.getItem('token', null)
      if(!token) {
        token = Math.random().toString(36).slice(2, 5) + (+new Date * Math.random()).toString(36).substring(0, 12) +
          Math.random().toString(36).slice(2, 5)
      }
      commit('SET_USER_TOKEN', token)
    }
    return state.userToken
  },

  emptyVoucher({commit}) {
    commit('EMPTY_VOUCHER')
  },
}

export {
  state,
  getters,
  mutations,
  actions
}
