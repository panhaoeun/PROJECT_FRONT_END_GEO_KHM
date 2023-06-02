import products from '../../data/products';
import ProductCustomerServices from '../../services/customers/ProductsCustomerServices';
const state = {
    productList: products.data,
    products: products.data,
    shuffleProducts: products.data,
    wishlist: [],
    compare: [],
    searchProduct: [],
    productMoreLoveList: [],
    productByIDMoreLove: 0
}

// getters 
const getters = {
    getCollectionProduct: (state) => {
        return state.products.filter((product) => {
            return product.collection;
        })
    },
    getProductById: (state) => {
        return id => state.products.find((product) => {
            return product.id === +id
        })
    },
    wishlistItems: (state) => {
        return state.wishlist
    },
    compareItems: (state) => {
        return state.compare
    }
    /**
     * @More Products 
     * **/
 
}

// mutations 
const mutations = {
    /**
     * @More Products Mutations
    * **/
    SET_PRODUCT_COLLECT_LIST(state, productList) {
        state.productMoreLoveList = productList;
    },
    addToWishlist: (state, payload) => {
        const product = state.products.find( item => item.id === payload.id )
        const wishlistItems = state.wishlist.find( item => item.id === payload.id )
        if (wishlistItems) {
            console.log(wishlistItems)
        } else {
            state.wishlist.push({
                ...product
            })
        }
    },
    removeWishlistItem: ( state, payload ) => {
        const index = state.wishlist.indexOf(payload)
        state.wishlist.splice(index, 1)
    },
    addToCompare: (state, payload) => {
        const product = state.products.find(item => item.id === payload.id)
        const compareItems = state.compare.find(item => item.id === payload.id)
        if (compareItems) {
            console.log(compareItems)
        } else {
            state.compare.push({
                ...product
            })
        }
    },
    removeCompareItem: (state, payload) => {
        const index = state.compare.indexOf(payload)
        state.compare.splice(index, 1)
    },
    searchProduct: (state, payload) => {
        payload = payload.toLowerCase()
        state.searchProduct = []
        if (payload.length) {
            state.products.filter((product) => {
                if (product.title.toLowerCase().includes(payload)) {
                    state.searchProduct.push(product)
                }
            })
        }
    },
    shuffleProduct: (state, payload) => {
        state.shuffleProducts = payload
    },
    getallProduct: (state, payload) => {
        state.shuffleProducts = products.data;
        console.log(payload)
    }
}

// actions 
const actions = {
    async setProductCollListMoreLove({
        commit
    }) {
        try {
            const servicesProductList = new ProductCustomerServices();
            await servicesProductList.getCustomerProducts().then((productList) => {
                commit('SET_PRODUCT_COLLECT_LIST', productList);
            });
        } catch (error) {
            console.log(error);
        }
    },
    async getProductCollListMoreLoveData({state, dispatch }) {
        if (state.productMoreLoveList && state.productMoreLoveList == 0) {
            await dispatch('setProductCollListMoreLove');
        }
        return state.productMoreLoveList;
    },
    addToWishlist: (context, payload) => {
        context.commit( 'addToWishlist', payload)
    },
    removeWishlistItem: ( context, payload ) => {
        context.commit( 'removeWishlistItem', payload )
    },
    addToCompare: (context, payload) => {
        context.commit('addToCompare', payload)
    },
    removeCompareItem: (context, payload) => {
        context.commit('removeCompareItem', payload)
    },
    searchProduct: (context, payload) => {
        context.commit('searchProduct', payload)
    },
    shuffleProduct: (context, payload) => {
        context.commit('shuffleProduct', payload)
    },
    getallProduct: (context) => {
        context.commit('getallProduct')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}