import {CartService} from "@/services/customers/add_to_cart/CartCustomerService";
const state = {
  cart: []
}
// getters
const getters = {
  getProductsInCart: state => state.cart,
   CLEAR_CART: (state) => {
        state.cartItems = [];
    },
   cartTotalAmount: (state) => {
       let totalAmount = 0;
        state.cart.forEach((proItem) => {
           totalAmount += proItem.price * proItem.quantity;
           if (totalAmount)
               return totalAmount.toFixed(2);
           else {
               return 0
           }
       });
        return totalAmount;
    },
    cartSubTotal: (state) => {
        let totalSubTotal = 0;
        state.cart.forEach((proItem) => {
            totalSubTotal += proItem.price * proItem.quantity;
            if (totalSubTotal)
                return totalSubTotal.toFixed(2);
            else {
                return 0
            }
        });
        return totalSubTotal;
    }
}
// actions
const actions = {
  addToCart: (context, payload) => {
    const cart = CartService.addItem(payload.productId, payload.product, payload.quantity, payload.productSpec,payload.unitPrice);
    context.commit('SET_CART_ITEMS', cart);
  },
  updateCartQuantity: (context, payload) => {
    context.dispatch('addToCart', {
        productId: payload.productItemId,
        product: payload.cartItem,
        quantity: payload.quantity,
        productSpec: payload.productSpec,
        price: payload.productPrice
    });
  },
  removeCartItem: (context, payload) => {
    const cartItems = CartService.removeItem(payload);
    context.commit('SET_CART_ITEMS', cartItems);
  }
}

// mutations
const mutations = {
  SET_CART_ITEMS: (state, cart) => {
    state.cart = cart;
  },
  updateCartQuantity: (state, payload) => {
    // Calculate Product Stock Counts
    function calculateStockCounts(product, quantity) {
      const qty = product.quantity + quantity
      const stock = product.stock
      if (stock < qty) {
        return false
      }
      return true
    }
    state.cart.find((items, index) => {
      if (items.id === payload.product.id) {
        const qty = state.cart[index].quantity + payload.qty
        const stock = calculateStockCounts(state.cart[index], payload.qty)
        if (qty !== 0 && stock) {
          state.cart[index].quantity = qty
        } else {
            console.log(state.cart[index].quantity)
        }
        return true
      }
    })
  },
  removeCartItem: (state, payload) => {
      const index = state.cart.indexOf(payload)
      state.cart.splice(index, 1)
  }

}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}