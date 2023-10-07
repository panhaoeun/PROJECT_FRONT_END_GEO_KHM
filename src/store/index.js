import { createStore, createLogger} from "vuex";
import { auth } from "./AuthModule";
import products from "../store/modules/products";
import carts from "../store/modules/carts";
import {categoriesModule} from "../store/ecommerce/categories";
import setting from './setting';
import app from './modules/app';
import usersPerm from './modules/usersPerm';
import { getLanguage } from "../lang";
import ShippingStore from './ecommerce/shipping';
import BillingStore from './ecommerce/billing';
import MyWalletStore from "./modules/my_wallet";
const debug = process.env.NODE_ENV !== 'production';
// const VUEX_PROPERT   IES = ['state', 'getters', 'actions', 'mutations'];

const store = createStore({
    namespaced: true,
    state: {
        id: null,
        name: [],
        shareOffcanvas: false,
        userAuth: null,
        language: getLanguage(),
        listWallet: []
    },
    getters: {
        shareOffcanvas: (state) => state.shareOffcanvas,
        language: (state) => state.language,
        getDepositWallet(state) {
            return state.listWallet;
        }
    },
    mutations: {
        loginUser(state, payload) {
            
            state.userAuth = payload;
        },
        openBottomCanvasCommit(state, payload) {
            state[payload.name] = payload.value
        },
        updatedListWallet(state, listWallet) {
            state.listWallet = listWallet;
        }
    },
    actions: {
        set_user(context, payload) {
            context.commit("loginUser", payload);
        },
        openBottomCanvasAction({ commit }, payload) {
            commit('openBottomCanvasCommit', payload)
        },
        updatedListDeposited({commit}, payload){
            commit('updatedListWallet', payload)
        }
    },
    plugins: debug ? [createLogger()] : [],
    modules: {
        auth,
        products: products,
        categories: categoriesModule,
        cart: carts,
        myWallet: MyWalletStore,
        setting: setting,
        app: app,
        users: usersPerm,
        shippingStore: ShippingStore,
        billingStore: BillingStore
    },
});


export default store;
