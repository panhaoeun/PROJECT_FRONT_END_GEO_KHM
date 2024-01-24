import {
    createStore
} from "vuex";
import {
    auth
} from "./AuthModule";
import products from "../store/modules/products";
import carts from "../store/modules/carts";
import {
    categoriesModule
} from "../store/ecommerce/categories";
import setting from './setting';
import app from './modules/app';
import usersPerm from './modules/usersPerm';
import {
    getLanguage
} from "../lang";
import ShippingStore from './ecommerce/shipping';
import BillingStore from './ecommerce/billing';
import MyWalletStore from "./modules/my_wallet";
import Common from "./common";
import Listing from "./listing";
import Home from "./home";
import Detail from "./details";
import Resource from "./resource";
import Categories from "./categories";
// Geo-location Country
import GeoLocationCountry from "./geo_location_country/geo_country";
import GeoLocationProvince from "./geo_location_country/geo_province";
import GeoLocationDistrict from "./geo_location_country/geo_district";
import GeoLocationCommune from "./geo_location_country/geo_commune";
import GeoLocationVillages from "./geo_location_country/geo_villages";
// const debug = process.env.NODE_ENV !== 'production';
// const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations'];

/**
 *@Org-Structures Department and Positions 
* */ 
import OrgDeptStrCountry from "./org_sl_geo_dept_pos/org_dept_stru/geoDeptStruCountry";
import OrgPosStrCountry from "./org_sl_geo_dept_pos/org_pos_stru/geoDepPositionCountry";
import ProjectNameBaseOrgStr from "./org_sl_geo_dept_pos/org_project_dept/geoDeptProjectName";
/**
 *@Org-Structures Chart 
**/
import orgChartStructure from "./org_global_str_chart/orgChartStructure";

const store = createStore({
    namespaced: true,
    state: {
        id: null,
        name: [],
        shareOffcanvas: false,
        language: getLanguage(),
        imgSrcUrl: '',
        defaultImage: '',
        thumbPrefix: '',
    },
    getters: {
        shareOffcanvas: (state) => state.shareOffcanvas,
        language: (state) => state.language,
        defaultImage: (state) => state.defaultImage,
        imgSrcUrl: (state) => state.imgSrcUrl,
        thumbPrefix: (state) => state.thumbPrefix,
    },
    mutations: {
        openBottomCanvasCommit(state, payload) {
            state[payload.name] = payload.value
        },
        SET_DEFAULT_IMAGE(state, defaultImage) {
            state.defaultImage = defaultImage
        },
        SET_IMG_SRC_URL(state, imgSrcUrl) {
            state.imgSrcUrl = imgSrcUrl
        },
        SET_THUMB_PREFIX(state, thumbPrefix) {
            state.thumbPrefix = thumbPrefix
        },
    },
    actions: {
        openBottomCanvasAction({
            commit
        }, payload) {
            commit('openBottomCanvasCommit', payload)
        },
    },
    // plugins: debug ? [createLogger()] : [],
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
        billingStore: BillingStore,
        common: Common,
        listing: Listing,
        home: Home,
        detail: Detail,
        resource: Resource,
        category: Categories,
        // Geo-location managements
        geoCountry: GeoLocationCountry,
        geoProvince: GeoLocationProvince,
        geoDistrict: GeoLocationDistrict,
        geoCommune: GeoLocationCommune,
        geoVillages: GeoLocationVillages,
        /***
         *@Geo-fence org-structures 
        * */ 
        orgDeptStrCou: OrgDeptStrCountry,
        orgPosStrCou: OrgPosStrCountry,
        orgProjectsName: ProjectNameBaseOrgStr,
        /***
         *@Manage - Org-structures Chart 
        **/
       orgStrChart: orgChartStructure

    },
});
// Load all modules.
// function loadModules() {
//     const context = require.context("./modules", false, /([a-z_]+)\.js$/i)

//     const modulesModule = context
//         .keys()
//         .map((key) => ({
//             key,
//             name: key.match(/([a-z_]+)\.js$/i)[1]
//         }))
//         .reduce(
//             (modules, {
//                 key,
//                 name
//             }) => ({
//                 ...modules,
//                 [name]: context(key).default
//             }), {}
//         )
//     return {
//         context,
//         modulesModule
//     }
// }
// const {
//     context
// } = loadModules();
// if (module.hot) {
//     // Whenever any Vuex module is updated...
//     module.hot.accept([
//         '../store/modules/products.js',
//         context.id
//     ], () => {
//         // Enforce store modules
//         resolveStoreModules(require('../store/modules/products.js'), 'module/products.js')
//         // Hot reload whenever any module changes.
//         const {
//             modulesModule
//         } = loadModules()
//         // Update `root.modules` with the latest definitions.
//         store();
//         // Trigger a hot update in the store.
//         const updatedModule = require('../store/modules/products')
//         // swap in the new modules and mutations
//         store.hotUpdate({
//             modulesModule,
//             modules: updatedModule,
//         });
//     });
// }


// function resolveStoreModules(moduleData, filename) {
//     moduleData = moduleData.default || moduleData
//     // Remove store src + extension (./foo/index.js -> foo/index)
//     const namespace = filename.replace(/\.(js|mjs)$/, '')
//     const namespaces = namespace.split('/')
//     let moduleName = namespaces[namespaces.length - 1]
//     const filePath = `store/${filename}`

//     moduleData = moduleName === 'state' ?
//         normalizeState(moduleData, filePath) :
//         normalizeModule(moduleData, filePath)

//     // If src is a known Vuex property
//     if (VUEX_PROPERTIES.includes(moduleName)) {
//         const property = moduleName
//         const propertyStoreModule = getStoreModule(store, namespaces, {
//             isProperty: true
//         })

//         // Replace state since it's a function
//         mergeProperty(propertyStoreModule, moduleData, property)
//         return
//     }

//     // If file is foo/index.js, it should be saved as foo
//     const isIndexModule = (moduleName === 'index')
//     if (isIndexModule) {
//         namespaces.pop()
//         moduleName = namespaces[namespaces.length - 1]
//     }

//     const storeModule = getStoreModule(store, namespaces)

//     for (const property of VUEX_PROPERTIES) {
//         mergeProperty(storeModule, moduleData[property], property)
//     }

//     if (moduleData.namespaced === false) {
//         delete storeModule.namespaced
//     }
// }

// function normalizeState(moduleData, filePath) {
//     if (typeof moduleData !== 'function') {
//         console.warn(`${filePath} should export a method that returns an object`)
//         const state = Object.assign({}, moduleData)
//         return () => state
//     }
//     return normalizeModule(moduleData, filePath)
// }

// function normalizeModule(moduleData, filePath) {
//     if (moduleData.state && typeof moduleData.state !== 'function') {
//         console.warn(`'state' should be a method that returns an object in ${filePath}`)

//         const state = Object.assign({}, moduleData.state)
//         // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
//         moduleData = Object.assign({}, moduleData, {
//             state: () => state
//         })
//     }
//     return moduleData
// }

// function getStoreModule(storeModule, namespaces, {
//     isProperty = false
// } = {}) {
//     // If ./mutations.js
//     if (!namespaces.length || (isProperty && namespaces.length === 1)) {
//         return storeModule
//     }

//     const namespace = namespaces.shift()

//     storeModule.modules[namespace] = storeModule.modules[namespace] || {}
//     storeModule.modules[namespace].namespaced = true
//     storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

//     return getStoreModule(storeModule.modules[namespace], namespaces, {
//         isProperty
//     })
// }

// function mergeProperty(storeModule, moduleData, property) {
//     if (!moduleData) {
//         return
//     }

//     if (property === 'state') {
//         storeModule.state = moduleData || storeModule.state
//     } else {
//         storeModule[property] = Object.assign({}, storeModule[property], moduleData)
//     }
// }

export default store;