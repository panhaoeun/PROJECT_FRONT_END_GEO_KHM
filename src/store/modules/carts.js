// import { ElNotification } from 'element-plus';
import {CartService} from "@/services/customers/add_to_cart/CartCustomerService";
import CustomerOrderCheckOutServices from "@/services/customers/CustomerOrdersServices.js";
import OrderDTO from '../../services/dto/Order.json';
import _ from "lodash";
import { ElNotification } from "element-plus";
const customerOrderCart = new CustomerOrderCheckOutServices();

const state = {
    cart: [],
    cartItem: [],
    checkoutInitiated: false,
    totalPrice: {},
    totalOrder: 0,
    subTotalPrice: {},
    serviceCharge: {},
    shippingPrice: {},
    tariffPrice: {},
    checkoutID: null,
    selectPayMethod: null
}
// getters
const getters = {
    getCart(state) {
      return state.cart;
    },
    getPayMethod(state) {
        return state.selectPayMethod;
    },
    getCartAuthItem(state) {
        return state.cartItem;
    },
    getTotal(state) {
      return state.totalPrice;
    },
    getTotalItems(state) {
      let total = 0;
      state.cart.forEach(item => {
        total += parseInt(item.counts);
      });
      return total;
    },
    getShippingPrice(state) {
      return state.shippingPrice;
    },
    checkoutInitiated(state) {
      return state.checkoutInitiated;
    },
    checkoutId(state) {
      return state.checkoutID;
    },
    getProductsInCart: state => state.cart,
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
    getSubTotal(state) {
        let totalQty = 0;
        let totalAmount = 0;
        let totalOrderItem = 0;
        let totalSubtotal = 0;
        state.cartItem.forEach((cart) => {
            totalQty += +cart.quantity;
            totalAmount += +cart.total;
        });
        totalOrderItem  =+ totalAmount / totalQty;
        totalSubtotal = +totalOrderItem * totalQty;
        if (totalSubtotal){
            return totalSubtotal.toFixed(2,4);
        }else{
            return 0;
        }
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
    },
    cartTotalOrder: (state) => {
       return state.totalOrder;
    },
}
// actions
const actions = {
    async totalOrder({commit}, {shippingPrice} ){
        if (shippingPrice !== null){
            commit('setTotalOderItem', shippingPrice);
        }
     },
    async getCartByCurrentCustomer({commit}){
        state.cartItem.splice(0, state.cartItem.length);
        await customerOrderCart.getCartOrderListCurrentCustomer()
        .then((cart) => {
            if(cart){
                commit('setCart', cart);
            } else throw new Error(cart);
        })
        .catch((error) => {
            console.log(error)
            throw new Error(error);
        });
    },
    async createCheckout({
            commit
        }, {
            vendorId,
            shopId,
            emailPhoneId,
            phoneNumberId,
            getSelectedAddressShip,
            selectedAddressBilling,
            shippingMethod,
            paymentMethod,
            orderDetaiL,
            customerOrderNoted
        }) {
        const reqData = {
            vendorId: vendorId,
            shopId: shopId,
            shippingMethod: shippingMethod,
            selectedAddressBilling: selectedAddressBilling,
            getSelectedAddressShip: getSelectedAddressShip,
            orderDetaiL: orderDetaiL,
            customerOrderNoted: customerOrderNoted,
            paymentMethod: paymentMethod,
            emailPhoneId: emailPhoneId,
            phoneNumberId: phoneNumberId,
        };
        try{    
            const productDetails = [];
            if(reqData !== null){
                reqData.orderDetaiL.filter(function(el) {
                    const productId = el?.product_id;
                    const productPrice = el?.productPrice;
                    const productQty = el?.quantity;
                    const productName = el?.product_eng;
                    const productCode = el?.product_code;
                    const productSpec = el?.variantName;
                    productDetails.push({
                        productId: productId ? productId : 0,
                        quantity: productQty ? productQty : 0,
                        price: productPrice ? productPrice : 0,
                        productSpec: productSpec ? productSpec : 0,
                        productName: productName ? productName : 0,
                        productCode: productCode ? productCode : 0,
                    });
                });
                const customerOrder = {
                    emailPhoneId: emailPhoneId ? emailPhoneId : '',
                    phoneNumberId: phoneNumberId ? phoneNumberId : '',
                    shippingPrice: reqData.shippingMethod?.const_price ? reqData.shippingMethod?.const_price : 0,
                    productDetails: productDetails ? productDetails : [],
                    shippingCompanyId: reqData.shippingMethod?.ship_id ? reqData.shippingMethod?.ship_id : 0,
                    shopId: shopId ? shopId : 0,
                    vendorId: vendorId ? vendorId : 0,
                    paymentMethod: reqData.paymentMethod ? reqData.paymentMethod : '',
                    shipAddr01: "",
                    shipAddr02: "",
                    shipAddrCity: "",
                    shipAddrZipCode: "",
                    otherNoted: customerOrderNoted ? customerOrderNoted : ''
                }
                await customerOrderCart.createCartOrderItemCustomer(customerOrder)
                .then((result) => {
                    if (result){
                        if (result.data.success === true) {
                            commit('setCheckoutInitiated', true);
                            // Checkout with id
                            commit('setCheckoutId', result.data.result.resultStatus.order?.order_id);
                            ElNotification({
                                title: 'Your order has been placed successfully! !',
                                message: result.data?.message ? result.data?.message : '',
                                type: 'success',
                            });
                            return true;
                        }
                    }else{
                        commit('setCheckoutInitiated', false);
                        commit('setCheckoutId', null);
                    }
                })
                .catch((error) => {
                    if (error){
                        commit('setCheckoutInitiated', false);
                        ElNotification({
                            title: 'Unsuccessfully to order detail',
                            message: error.response.data.error.message ?? 'Unsuccessfully for create address',
                            showClose: false,
                            type: 'error'
                        });
                    }
                    throw new Error(error);
                });
            }
            
        }catch(error){
            throw new Error(error);
        }
    },
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
  selectPayMethodOrder(state, address) {
     state.selectPayMethod = address;
   },
  setCheckoutInitiated(state, val) {
      state.checkoutInitiated = val;
  },
  setCheckoutId(state, payload) {
      state.checkoutID = payload;
  },
  setCart(state, allCarts) {
    state.cartItem.splice(0, state.cartItem.length);
    const transformed = [];
    state.totalPrice = allCarts.total ? allCarts.total : null;
    for (let i = 0; i < allCarts.length; i += 1) {
        const itemId = allCarts[i];
        transformed.push(_.assign(_.cloneDeep(OrderDTO), itemId));
    }
    state.cartItem.push(...transformed);
  },
  setTotalOderItem(state, shipPrice) {
      let total = 0;
      let totalShipping =  0;
      let totalQty = 0;
      let totalAmount = 0;
      let totalOrderItem = 0;
      let totalSubtotal = 0;
      state.cartItem.forEach((cart) => {
          totalQty += +cart.quantity;
          totalAmount += +cart.total;
      });
      totalOrderItem = +totalAmount / totalQty;
      totalSubtotal = +totalOrderItem * totalQty;
      totalShipping += Math.round(shipPrice * 100) / 100;
      total += totalShipping + totalSubtotal;
      if (total) {
        return state.totalPrice = total.toFixed(2,4);
      } else {
          return 0;
      }
  },    
  resetOrders(state) {
      state.cartItem = [];
      state.totalWeight = {};
      state.subTotalPrice = {};

      state.totalPrice = {};
      state.serviceCharge = {};
      state.shippingPrice = {};
      state.tariffPrice = {};
      state.checkoutInitiated = false;
      state.checkoutID = null;
  },
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