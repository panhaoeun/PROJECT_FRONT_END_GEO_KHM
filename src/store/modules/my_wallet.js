import CustomerDepositedToWalletService from '@/services/my_wallets/deposited/CustomersDepositedServices';
const customerDepositedWithDrawService = new CustomerDepositedToWalletService();
import {isLoggedIn} from '@/utils/auth/auth';
const state = {
    walletBalanceKHR: null,
    walletBalanceUSD: null,
    ballanceInAccount: [],
    totalAmountOrder: {},
    remainingBalanceUSD: 0,
    remainingBalanceKHR: 0,
    currentBalanceKHRNum: 0,
    currentBalanceUSDNum: 0,
    balanceAccountMS: '',
    calRemainingCurrentBalanceAmount: {},
    checkRemainingBalance: false
}   
// getters
const getters = {
    getCurrentBalanceKHR(state) {
        return state.walletBalanceKHR ? state.walletBalanceKHR : 0;
    },
    getCurrentBalanceUSD(state) {
        return state.walletBalanceUSD ? state.walletBalanceUSD : 0;
    },
    getTotalAmountOrderShip(state) {
        return state.totalAmountOrder;
    },
    getRemainingAmountOrder(state){
        return state.calRemainingCurrentBalanceAmount ? state.calRemainingCurrentBalanceAmount : {};
    },
    checkRemainingAccSubmit(state){
        return state.checkRemainingBalance ? state.checkRemainingBalance : false;
    }
}
// actions
const actions = {
    async myWalletCurrentBalance({commit}){
       try{
        if (isLoggedIn()){
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
    async orderAmountTotal({commit}, {amountTotalKHR, amountTotalUSD}){
        try {
            commit('setTotalAmountOrder', {amountTotalKHR, amountTotalUSD});
        } catch (error) {
          throw new Error(error);
        }
    },
    async remainingBalanceToOrder({
            commit
        }, {
            currentBalanceKHR,
            currentBalanceUSD,
            balanceUSD,
            balanceKHR
        }) {
        try {
            commit('setRemainingBalanceOrder', {
                currentBalanceKHR,
                currentBalanceUSD,
                balanceUSD,
                balanceKHR
            });
        } catch (error) {
          throw new Error(error);
        }
    },
    async confirmWithdrawMoneyOrderPayment({commit}, {confirmOrderPaymentWallet}){
        console.log(commit, confirmOrderPaymentWallet)
    }
}
// mutations
const mutations = {
    setCurrentBalanceAccount(state, payload) {
        if (!payload) {
            state.walletBalanceKHR = 0;
            state.walletBalanceUSD = 0;
        }else{
            state.walletBalanceKHR = payload?.balanceKHR ? payload?.balanceKHR : 0;
            state.walletBalanceUSD = payload?.balanceUSD ? payload?.balanceUSD : 0;
            state.ballanceInAccount = payload;
        }
    },
    setTotalAmountOrder(state, payload){
        if (!payload){
            state.totalAmountOrder = {};
        }else{
            state.totalAmountOrder = {
                amountTotalKHR: payload?.amountTotalKHR,
                amountTotalUSD: payload?.amountTotalUSD
            };
        }
    },
    setRemainingBalanceOrder(state, payload) {
        let totalBalanceRemainingUSD = 0;
        let totalBalanceRemainingKHR = 0;
        // Formate Money
        function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
                const negativeSign = amount < 0 ? "-" : "";
                let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;

                return negativeSign +
                    (j ? i.substr(0, j) + thousands : '') +
                    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
                    (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
            } catch (e) {
                console.log(e)
            }
        }

        if (Number.isNaN(payload.balanceUSD && payload.balanceKHR)) {
            state.remainingBalanceKHR = 0;
            state.remainingBalanceUSD = 0;
            state.currentBalanceKHRNum = 0;
            state.currentBalanceUSDNum = 0;
            state.calRemainingCurrentBalanceAmount = {};
        }
        if (typeof payload.balanceUSD && payload.balanceKHR !== 'number') {
            state.remainingBalanceKHR = 0;
            state.remainingBalanceUSD = 0;
            state.currentBalanceKHRNum = 0;
            state.currentBalanceUSDNum = 0;
            state.calRemainingCurrentBalanceAmount = {};
        }
        if (payload.balanceUSD >= 0){
            state.balanceAccountMS = 'Insufficient balance';
        }
        const balanceCurrentUSD = payload.currentBalanceUSD.toString().replace(/[^0-9.]/g, '') ?? 0;
        const balanceCurrentKHR = payload.currentBalanceKHR.toString().replace(/[^0-9.]/g, '') ?? 0;
        const amountCurrentOrderUSD = payload.balanceUSD ? payload.balanceUSD : 0;
        const amountCurrentOrderKHR = payload.balanceKHR ? payload.balanceKHR : 0;
        if (amountCurrentOrderUSD <= balanceCurrentUSD) {
            totalBalanceRemainingUSD =+ balanceCurrentUSD -amountCurrentOrderUSD;
            totalBalanceRemainingKHR = +balanceCurrentKHR- amountCurrentOrderKHR;
            const remainingBalanceUSD = Number(parseFloat(totalBalanceRemainingUSD)).toFixed(2, 4);
            const balanceUSD = formatMoney(remainingBalanceUSD) ? formatMoney(remainingBalanceUSD) : 0;
            const remainingBalanceKHR = Number(parseFloat(totalBalanceRemainingKHR)).toFixed(2, 4);
            const balanceKHR = formatMoney(remainingBalanceKHR) ? formatMoney(remainingBalanceKHR) : 0;
            state.remainingBalanceKHR = balanceUSD ? balanceUSD : 0;
            state.remainingBalanceUSD = balanceKHR ? balanceKHR : 0;
            // Current Amount Orders
            state.calRemainingCurrentBalanceAmount = {
                remainingMoneyKHR: balanceKHR ? balanceKHR : 0,
                remainingMoneyUSD: balanceUSD ? balanceUSD : 0,
                balanceAccountMS: 'Balance is sufficient. You can place the order.'
            }  
            state.balanceAccountMS = 'Balance is sufficient. You can place the order.';
            state.checkRemainingBalance = true;
        } else {
            totalBalanceRemainingUSD =+ balanceCurrentUSD - amountCurrentOrderUSD;
            totalBalanceRemainingKHR =+ balanceCurrentKHR - amountCurrentOrderKHR;
            const remainingBalanceUSD = Number(parseFloat(totalBalanceRemainingUSD)).toFixed(2, 4);
            const balanceUSD = formatMoney(remainingBalanceUSD) ? formatMoney(remainingBalanceUSD) : 0;
            const remainingBalanceKHR = Number(parseFloat(totalBalanceRemainingKHR)).toFixed(2, 4);
            const balanceKHR = formatMoney(remainingBalanceKHR) ? formatMoney(remainingBalanceKHR) : 0;
            state.remainingBalanceKHR = balanceUSD ? balanceUSD : 0;
            state.remainingBalanceUSD = balanceKHR ? balanceKHR : 0;
            // Current Remaining Order Sub Strace Amount 
            state.calRemainingCurrentBalanceAmount = {
                remainingMoneyKHR: balanceKHR ? balanceKHR : 0,
                remainingMoneyUSD: balanceUSD ? balanceUSD : 0,
                balanceAccountMS: 'You do not have sufficient balance for pay this order!!',
            }   
            state.checkRemainingBalance = false;
            state.balanceAccountMS = 'You do not have sufficient balance for pay this order!!';
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