import {
    LocalStorageService
} from "../../local/base/local-storage.service";

const CART_KEY = 'cart';

export const CartService = {

    itemTotal() {
        if (typeof window !== 'undefined') {
            if (LocalStorageService.get()) {
                return JSON.parse(LocalStorageService.get('cart')).length
            }
        }
        return 0
    },

    /**
     * Adds an item or updates the quantity, if the cart item is in the cart, the new quantity will be
     * set to the given quantity param.
     * @param product
     * @param quantity
    * @returns {Array}
     */
    addItem(productId, product, quantity, productSpec, price) {
        let cartItems = JSON.parse(LocalStorageService.get(CART_KEY)) || [];
        let cartItem = cartItems.find(ci => ci.productId === productId);
        if ((cartItem && cartItem.quantity !== quantity) || !cartItem) {
            if (cartItem) {
                cartItem.quantity = quantity;
            } else {
                // or take what we need and build a new object
                const {
                    productId,
                    catNameEn,
                    product_eng,
                    thumbnail
                } = product[0];
                let productURL; 
                // Check URL Not found
                if (typeof thumbnail !== "undefined")
                     productURL = `${process.env.VUE_APP_PATH_FILE}uploads/products_img/thumbnail/${thumbnail}`
                    else    
                    productURL = '';
                // Push item to local storage
                cartItem = {
                    productId,
                    catNameEn,
                    product_eng,
                    productURL,
                    quantity,
                    productSpec,
                    price
                };
                // console.log(cartItem)
                cartItems.push(cartItem);
            }
            localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        }
        return cartItems;
    },
    getCart() {
        if (typeof window !== "undefined") {
            if (LocalStorageService.get(CART_KEY)) {
                const cart = JSON.parse(LocalStorageService.get(CART_KEY));
                return cart;
            }
        }
        return []
    },
    removeItem(product) {
        if (LocalStorageService.get(CART_KEY)) {
            let cartItems = JSON.parse(LocalStorageService.get(CART_KEY));
            /*
            const index = cartItems.findIndex(ci => ci.id === product.id);
            cartItems.splice(index, 1);
            */
            // or even better:
            cartItems = cartItems.filter(ci => ci.productId !== product.productId);
            LocalStorageService.set(CART_KEY, JSON.stringify(cartItems));
            return cartItems
        }
        // this should never happen actually
        // debugger;
        return [];
    },
    emptyCart() {
        if (typeof window !== 'undefined') {
            LocalStorageService.remove(CART_KEY);
        }
    },
};