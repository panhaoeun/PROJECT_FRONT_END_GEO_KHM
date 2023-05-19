import { createStore } from "vuex";
import { auth } from "./AuthModule";
import products from "../store/modules/products";
import carts from "../store/modules/carts";

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

const store = createStore({
    // getters: {
    //     getLoginStatus: state => {
    //         return state.idToken !== null;
    //     },
    //     getCollectionProduct: (state) => {
    //         console.log(state)
    //         return state.products.filter((product) => {
    //             return product.collection;
    //         });
    //     },
    //     getProductById: (state) => {
    //         return id => state.products.find((product) => {
    //             return product.id === +id
    //         })
    //     },
    //     wishlistItems: (state) => {
    //         return state.wishlist
    //     },
    //     compareItems: (state) => {
    //         return state.compare
    //     }
    // },
    // mutations: {
    //     addToWishlist: (state, payload) => {
    //         const product = state.products.find( item => item.id === payload.id )
    //         const wishlistItems = state.wishlist.find( item => item.id === payload.id )
    //             if (wishlistItems) {
    //                 console.log(wishlistItems)
    //             } else {
    //                 state.wishlist.push({
    //                     ...product
    //                 })
    //             }
    //     },
    //     removeWishlistItem: ( state, payload ) => {
    //         const index = state.wishlist.indexOf(payload)
    //         state.wishlist.splice(index, 1)
    //     },
    //     addToCompare: (state, payload) => {
    //         const product = state.products.find(item => item.id === payload.id)
    //         const compareItems = state.compare.find(item => item.id === payload.id)
    //         if (compareItems) {
    //             console.log(compareItems)
    //         } else {
    //             state.compare.push({
    //                 ...product
    //             })
    //         }
    //     },
    //     removeCompareItem: (state, payload) => {
    //         const index = state.compare.indexOf(payload)
    //         state.compare.splice(index, 1)
    //     },
    //     searchProduct: (state, payload) => {
    //         payload = payload.toLowerCase()
    //         state.searchProduct = []
    //         if (payload.length) {
    //             state.products.filter((product) => {
    //                 if (product.title.toLowerCase().includes(payload)) {
    //                     state.searchProduct.push(product)
    //                 }
    //             })
    //         }
    //     },
    //     shuffleProduct: (state, payload) => {
    //         state.shuffleProducts = payload
    //     },
    //     getallProduct: (state, payload) => {
    //         state.shuffleProducts = products.data;
    //         console.log(payload)
    //     }
    // },
    // actions: {
    //     addToWishlist: (context, payload) => {
    //         context.commit( 'addToWishlist', payload)
    //     },
    //     removeWishlistItem: ( context, payload ) => {
    //         context.commit( 'removeWishlistItem', payload )
    //     },
    //     addToCompare: (context, payload) => {
    //         context.commit('addToCompare', payload)
    //     },
    //     removeCompareItem: (context, payload) => {
    //         context.commit('removeCompareItem', payload)
    //     },
    //     searchProduct: (context, payload) => {
    //         context.commit('searchProduct', payload)
    //     },
    //     shuffleProduct: (context, payload) => {
    //         context.commit('shuffleProduct', payload)
    //     },
    //     getallProduct: (context) => {
    //         context.commit('getallProduct')
    //     }
    // },
    modules: {
        auth,
        products: products,
        cart: carts,
    },
});
// Load all modules.
function loadModules() {
  const context = require.context("./modules", false, /([a-z_]+)\.js$/i)

  const modulesModule = context
    .keys()
    .map((key) => ({ key, name: key.match(/([a-z_]+)\.js$/i)[1] }))
    .reduce(
      (modules, { key, name }) => ({
        ...modules,
        [name]: context(key).default
      }),
      {}
    )
  return { context, modulesModule }
}
const { context } = loadModules();
if(module.hot){
    // Whenever any Vuex module is updated...
    module.hot.accept([
        '../store/modules/products.js',
        context.id
    ], () => {
        // Enforce store modules
        resolveStoreModules(require('../store/modules/products.js'), 'module/products.js')
        // Hot reload whenever any module changes.
        const { modulesModule } = loadModules()
       // Update `root.modules` with the latest definitions.
       store();
       // Trigger a hot update in the store.
       const updatedModule = require('../store/modules/products')
       // swap in the new modules and mutations
       store.hotUpdate({
         modulesModule,
         modules: updatedModule,
       });
    });
}


function resolveStoreModules (moduleData, filename) {
    moduleData = moduleData.default || moduleData
    // Remove store src + extension (./foo/index.js -> foo/index)
    const namespace = filename.replace(/\.(js|mjs)$/, '')
    const namespaces = namespace.split('/')
    let moduleName = namespaces[namespaces.length - 1]
    const filePath = `store/${filename}`

    moduleData = moduleName === 'state'
        ? normalizeState(moduleData, filePath)
        : normalizeModule(moduleData, filePath)

    // If src is a known Vuex property
    if (VUEX_PROPERTIES.includes(moduleName)) {
        const property = moduleName
        const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

        // Replace state since it's a function
        mergeProperty(propertyStoreModule, moduleData, property)
        return
    }

    // If file is foo/index.js, it should be saved as foo
    const isIndexModule = (moduleName === 'index')
    if (isIndexModule) {
        namespaces.pop()
        moduleName = namespaces[namespaces.length - 1]
    }

    const storeModule = getStoreModule(store, namespaces)

    for (const property of VUEX_PROPERTIES) {
        mergeProperty(storeModule, moduleData[property], property)
    }

    if (moduleData.namespaced === false) {
        delete storeModule.namespaced
    }
    }
    function normalizeState (moduleData, filePath) {
    if (typeof moduleData !== 'function') {
        console.warn(`${filePath} should export a method that returns an object`)
        const state = Object.assign({}, moduleData)
        return () => state
    }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}

export default store;
