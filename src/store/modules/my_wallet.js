import CustomerDepositedToWalletService from '@/services/my_wallets/deposited/CustomersDepositedServices';
const customerDepositedWithDrawService = new CustomerDepositedToWalletService();
import {isLoggedIn} from '@/utils/auth/auth';
const state = {
    walletBalanceKHR: null,
    walletBalanceUSD: null,
    ballanceInAccount: [],
}
// getters
const getters = {
    getCurrentBalanceKHR(state) {
        return state.walletBalanceKHR ? state.walletBalanceKHR : 0;
    },
    getCurrentBalanceUSD(state) {
        return state.walletBalanceUSD ? state.walletBalanceUSD : 0;
    },
}
// actions
const actions = {
    async myWalletCurrentBalance({commit}){
       try{
        if (isLoggedIn()){
            state.ballanceInAccount.splice(0, state.ballanceInAccount.length);
            await customerDepositedWithDrawService.getCustomerDepositedBalanceInCurrent()
                .then((balance) => {
                    if (balance) {
                        commit('setCurrentBalanceAccount', balance);
                    } else throw new Error(balance);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }else{
            state.ballanceInAccount = [];
        }
       }catch(error){
          throw new Error(error);
       }
    },
    async orderAmountTotal({commit}, amountTotalKHR, amountTotalUSD){
        try {
            const totalAmountTotal = {
                amountTotalKHR: amountTotalKHR ? amountTotalKHR : '',
                amountTotalUSD: amountTotalUSD ? amountTotalUSD : ''
            }
            commit('setTotalAmountOrder', totalAmountTotal ? totalAmountTotal : '');
        } catch (error) {
          throw new Error(error);
        }
    }
}
// mutations
const mutations = {
    setCurrentBalanceAccount(state, payload) {
        console.log(payload)
        if (!payload) {
            state.walletBalanceKHR = '';
            state.walletBalanceUSD = '';
        }else{
            state.walletBalanceKHR = payload?.balanceKHR ? payload?.balanceKHR : '';
            state.walletBalanceUSD = payload?.balanceUSD ? payload?.balanceUSD : '';
            state.ballanceInAccount = payload;
        }
    },
    setTotalAmountOrder(state, payload){
        console.log(state, payload)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}