// import { ElNotification } from 'element-plus';
import { CartService } from "@/services/customers/add_to_cart/CartCustomerService";
import CustomerOrderCheckOutServices from "@/services/customers/order_payments/CustomerOrdersServices.js";
import OrderDTO from "../../services/dto/Order.json";
import _ from "lodash";
import { ElMessageBox, ElNotification } from "element-plus";
const customerOrderCart = new CustomerOrderCheckOutServices();
import { isLoggedIn } from "@/utils/auth/auth";
import router from "../../routes/routes";

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
    selectPayMethod: null,
    totalShippingUSD: 0,
    totalShippingKHR: 0,
    totalUSD: 0,
    totalKHR: 0,
};
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
        state.cartItem.forEach((item) => {
            total += parseInt(item.quantity);
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
    getProductsInCart: (state) => state.cart,
    cartTotalAmount: (state) => {
        let totalAmount = 0;
        state.cart.forEach((proItem) => {
            totalAmount += proItem.price * proItem.quantity;
            if (totalAmount) return totalAmount.toFixed(2);
            else {
                return 0;
            }
        });
        return totalAmount;
    },
    getSubTotal(state) {
        // let totalAmount = 0;
        let totalSubtotal = 0;
        // let totalOrderItemKHR = 0;
        let totalSubtotalKHR = 0;
        state.cartItem.forEach((cart) => {
            totalSubtotalKHR += cart.totalKhRiel * parseInt(cart.quantity);
            totalSubtotal += cart.total * parseInt(cart.quantity);
        });
        if (totalSubtotal && totalSubtotalKHR) {
            return {
                subTotalUSD: totalSubtotal,
                subTotalKHR: totalSubtotalKHR,
            };
        } else {
            return 0;
        }
    },
    cartSubTotal: (state) => {
        let totalSubTotal = 0;
        state.cart.forEach((proItem) => {
            totalSubTotal += proItem.price * proItem.quantity;
            if (totalSubTotal) return totalSubTotal.toFixed(2);
            else {
                return 0;
            }
        });
        return totalSubTotal;
    },
    cartTotalOrder: (state) => {
        return state.totalOrder;
    },
    cartTotalShipping: (state) => {
        let totalQuantity = 0;
        let totalShippingDayPrice = 0;
        let totalMaxOrder = 0;
        let totalDayAmount = 0;
        let totalDayAmountKHR = 0;
        let totalAmountDayPrice = 0;
        let totalAmountDayPriceKHR = 0;
        state.cartItem.forEach((cart) => {
            totalQuantity += cart.quantity;
            totalMaxOrder += cart.maxOrder;
            totalDayAmount += cart.expressPriceUSD;
            totalDayAmountKHR += cart?.expressPriceKHR;
        });
        // Total Shipping
        totalShippingDayPrice = totalQuantity / totalMaxOrder;
        // Calculate the number of packages that can be shipped
        totalAmountDayPrice = totalShippingDayPrice * totalDayAmount;
        totalAmountDayPriceKHR = totalShippingDayPrice * totalDayAmountKHR;

        if (totalShippingDayPrice > 0) {
            // Calculate the number of packages that can be shipped
            totalAmountDayPrice = totalShippingDayPrice * totalDayAmount;
            totalAmountDayPriceKHR = totalShippingDayPrice * totalDayAmountKHR;
        }
        return {
            shippingAmountUSD: totalAmountDayPrice ? totalAmountDayPrice : 0,
            shippingAmountKHR: totalAmountDayPriceKHR
                ? totalAmountDayPriceKHR
                : 0,
        };
    },
};
// actions
const actions = {
    async totalOrder({ commit }, { shippingPrice }) {
        if (shippingPrice !== null) {
            commit("setTotalOderItem", shippingPrice);
        }
    },
    async getCartByCurrentCustomer({ commit }) {
        if (!isLoggedIn() && state.cartItem.length > 0) {
            state.cartItem = [];
        } else {
            state.cartItem.splice(0, state.cartItem.length);
            await customerOrderCart
                .getCartOrderListCurrentCustomer()
                .then((cart) => {
                    if (cart) {
                        commit("setCart", cart);
                    } else throw new Error(cart);
                })
                .catch((error) => {
                    console.log(error);
                    throw new Error(error);
                });
        }
    },
    // Check Out Payments
    async createCheckout(
        { commit },
        {
            emailPhoneId,
            phoneNumberId,
            getSelectedAddressShip,
            selectedAddressBilling,
            shippingMethod,
            paymentMethods,
            orderDetaiL,
            customerOrderNoted,
        }
    ) {
        const reqData = {
            shippingMethod: shippingMethod,
            selectedAddressBilling: selectedAddressBilling,
            getSelectedAddressShip: getSelectedAddressShip,
            orderDetaiL: orderDetaiL,
            customerOrderNoted: customerOrderNoted,
            paymentMethods: paymentMethods,
            emailPhoneId: emailPhoneId,
            phoneNumberId: phoneNumberId,
        };
        try {
            const productDetails = [];
            if (reqData !== null) {
                // Order Details
                reqData.orderDetaiL.filter(function (el) {
                    const expressPriceUSD = el?.expressPriceUSD ? el?.expressPriceUSD : 0;
                    const expressPriceKHR = el?.expressPriceKHR ? el?.expressPriceKHR : 0
                    const productId = el?.product_id;
                    const productPrice = el?.productPrice;
                    const productQty = el?.quantity;
                    const productName = el?.product_eng;
                    const productCode = el?.product_code;
                    const productSpec = el?.variantName;
                    productDetails.push({
                        vendorId: el?.vendorId ? el?.vendorId : 0,
                        shopId: el.shopId ? el?.shopId : 0,
                        productId: productId ? productId : 0,
                        quantity: productQty ? productQty : 0,
                        deliveryPriceUSD: expressPriceUSD ? expressPriceUSD : 0,
                        deliveryPriceKHR: expressPriceKHR ? expressPriceKHR : 0,
                        price: productPrice ? productPrice : 0,
                        productSpec: productSpec ? productSpec : 0,
                        productName: productName ? productName : 0,
                        productCode: productCode ? productCode : 0,
                    });
                });
                // Customer Orders
                const customerShippingAddr =
                        getSelectedAddressShip?.shipAdd01 +
                        "," +
                        getSelectedAddressShip?.shipAdd02 +
                        "," +
                        getSelectedAddressShip?.shipAddrCity +
                        "," +
                        getSelectedAddressShip?.shipAddrZipCode +".";
                const customerBillingAddr =
                        selectedAddressBilling?.billAdd01 +
                        "," +
                        selectedAddressBilling?.billAdd02 +
                        "," +
                        selectedAddressBilling?.billCity +
                        "," +
                        selectedAddressBilling?.billZipCode +".";

                const customerOrder = {
                    emailPhoneId: emailPhoneId ? emailPhoneId : "",
                    phoneNumberId: phoneNumberId ? phoneNumberId : "",
                    productDetails: productDetails ? productDetails : [],
                    shippingCompanyId: 1,
                    paymentMethod: reqData.paymentMethods ? reqData.paymentMethods : "CashOnDelivery",
                    shippingAddress: customerShippingAddr ? customerShippingAddr : '',
                    billingAddress: customerBillingAddr ? customerBillingAddr : '',
                    shippingPhoneNumber: getSelectedAddressShip?.phone_number_contact,
                    shippingName: getSelectedAddressShip?.contact_name,
                    billingName: selectedAddressBilling?.contact_name,
                    billingPhoneNumber: selectedAddressBilling?.phone_number_contact,
                    otherNoted: customerOrderNoted ? customerOrderNoted : "",
                };
                await customerOrderCart.createCustomerOrderCheckOut(customerOrder)
                    .then((result) => {
                        if (result){
                            if (result.data.success === true) {
                                commit('setCheckoutInitiated', true);
                                // Checkout with id
                                commit('setCheckoutId', result.data.result.resultStatus.order?.order_id);
                                router.push('/customer/my-account/checkout-complete');

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
                        console.log(error)
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
        } catch (error) {
            throw new Error(error);
        }
    },
    addToCart: (context, payload) => {
        const cart = CartService.addItem(
            payload.productId,
            payload.product,
            payload.quantity,
            payload.productSpec,
            payload.unitPrice
        );
        context.commit("SET_CART_ITEMS", cart);
    },
    addToTheCart: async ({ state, commit }, products) => {
        // Checks if the session is active. If not, it means that the user is not logged in. So, just do things locally.
        if (!isLoggedIn() && products.length > 0) {
            const foundIndex = _.findIndex(state.cartItem, (pr) =>
                _.isEqual(pr.product, products[0])
            );
            console.log(foundIndex);
            console.log(
                "Add to cart is not possible because you are not logged in"
            );
            return;
        }
        const toSend = _.map(products, (p) => ({
            shipCompanyId: p.shipCompanyId,
            vendorId: p.vendorId,
            shopId: p.shopId,
            productId: p.productId,
            productQty: p.productQty === 0 ? 1 : p.productQty,
            productPrice: p.productPrice,
            productVariantName: p.productVariantName,
            type: p.type,
            expressDeliveryPriceUSD: parseFloat(
                products?.expressDeliveryPriceUSD
            ),
            expressDeliveryPriceKHR: parseFloat(products?.expressPriceKHR),
        }));
        try {
            await customerOrderCart
                .createCartOrderItemCustomer(products)
                .then((result) => {
                    if (result.data.success === true) {
                        // Notification
                        ElNotification.success({
                            title: "Added to Cart Successfully",
                        });
                        commit("setCart", result.data.result.resultStatus);
                        return Promise.resolve(toSend);
                    }
                    return true;
                })
                .catch((error) => {
                    if (error) {
                        ElNotification.error({
                            title: "Couldn't be added for some reason. Please try again later",
                            message: error.response.data.message,
                            showClose: false,
                        });
                    }
                    // Validation Error
                    if (error.response.data.error.error.errors) {
                        for (
                            let index = 0;
                            index <
                            error.response.data.error.error.errors.length;
                            index++
                        ) {
                            const messageValidation =
                                error.response.data.error.error.errors[index]
                                    .message ?? "";
                            ElNotification.error({
                                title: "Couldn't be added for some reason. Please try again later",
                                message: messageValidation,
                                showClose: true,
                            });
                        }
                    }
                });
        } catch (err) {
            throw new Error(err);
        }
    },
    updateCartQuantity: ({ state, commit }, payloadArray) => {
        // Checks if the session is active. If not, it means that the user is not logged in. So, just do things locally.
        if (!isLoggedIn()) {
            // These commits don't do anything but are necessary because they help persist.
            const updatedItem =
                payloadArray.length > 0 ? payloadArray[0] : null;
            if (updatedItem) {
                updatedItem.aggregatedPrice.amount =
                    parseInt(updatedItem.quantity) *
                    parseFloat(updatedItem.productPrice);
                updatedItem.aggregatedPrice.amount =
                    updatedItem.aggregatedPrice.amount.toFixed(2);
                commit("setLocalCart");
                return true;
            }
            console.log(
                "Cannot send the request because the user is not logged in"
            );
            return false;
        }
        state.cartItem.forEach(async (item) => {
            if (item?.productInStock >= item?.quantity) {
                // const updatedPrice = parseInt(item?.quantity) * parseFloat(item?.productPrice);
                const orders = {
                    productId: item?.product_id,
                    productQty: parseInt(item.quantity),
                    productPrice: parseFloat(item?.productPrice),
                    expressDeliveryPriceUSD: parseFloat(
                        item?.expressDeliveryPriceUSD
                    ),
                    expressDeliveryPriceKHR: parseFloat(item?.expressPriceKHR),
                    type: "new",
                };
                try {
                    await customerOrderCart
                        .createCartOrderItemCustomer(orders)
                        .then((result) => {
                            if (result.data?.success === true) {
                                commit(
                                    "setCart",
                                    result.data.result.resultStatus
                                );
                                return Promise.resolve(orders);
                            }
                        })
                        .catch((error) => {
                            if (error) {
                                ElNotification.error({
                                    title: "Cart could not be updated at the moment. Please try again later.",
                                    message:
                                        error.response.data.message ??
                                        "Cart could not be updated at the moment. Please try again later.",
                                    showClose: false,
                                });
                            }
                            // Validation Error
                            if (error.response.data.error.error.errors) {
                                for (
                                    let index = 0;
                                    index <
                                    error.response.data.error.error.errors
                                        .length;
                                    index++
                                ) {
                                    const messageValidation =
                                        error.response.data.error.error.errors[
                                            index
                                        ].message ?? "";
                                    ElNotification.error({
                                        title: "Cart could not Updated Shipping at the moment",
                                        message:
                                            messageValidation ??
                                            "Cart could not be updated at the moment. Please try again later.",
                                        showClose: true,
                                    });
                                }
                            }
                        });
                } catch (error) {
                    console.log(error);
                    throw new Error(error);
                }
            }
        });
    },
    async deleteCustomerCartOrder({ state, commit }, cartItems) {
        const deletedIds = _.map(cartItems, "id");
        // Checks if the session is active. If not, it means that the user is not logged in. So, just do things locally.
        if (!isLoggedIn()) {
            console.log(
                _.remove(
                    state.cartItem,
                    (order) => deletedIds.indexOf(order.id) >= 0
                )
            );
            commit("setLocalCart");
            return;
        }
        try {
            ElMessageBox.confirm("Remove item from cart?", "Remove product", {
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                type: "info",
                cancelButtonClass:
                    "surface-hover font-bold hover:surface-300 w-7rem",
                confirmButtonClass:
                    "bg-red-500 border-none font-bold hover:surface-300 w-7rem",
                beforeClose: (action, instance, done) => {
                    if (action === "confirm") {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = "Loading...";
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 1000);
                    } else {
                        done();
                    }
                },
            })
                .then(async () => {
                    await customerOrderCart
                        .deletedCartOrderItemCustomer(deletedIds)
                        .then((result) => {
                            if (result.data.success === true) {
                                ElNotification.success({
                                    title: "Successfully deleted item from cart",
                                    showClose: true,
                                });
                                commit(
                                    "setCart",
                                    result.data.result.resultStatus
                                );
                            }
                        })
                        .catch((error) => {
                            if (error) {
                                ElNotification.error({
                                    title: "Unscesffully deleted item from cart",
                                    message:
                                        error.response.data.message ??
                                        "Unscesffully deleted item from cart",
                                    showClose: false,
                                });
                            }
                            // Validation Error
                            if (error.response.data.error.error.errors) {
                                for (
                                    let index = 0;
                                    index <
                                    error.response.data.error.error.errors
                                        .length;
                                    index++
                                ) {
                                    const messageValidation =
                                        error.response.data.error.error.errors[
                                            index
                                        ].message ?? "";
                                    ElNotification.error({
                                        title: "Unscesffully deleted item from cart",
                                        message:
                                            messageValidation ??
                                            "Unscesffully deleted item from cart",
                                        showClose: true,
                                    });
                                }
                            }
                        });
                })
                .catch(() => {
                    ElNotification.info({
                        type: "info",
                        message: "Delete canceled",
                    });
                    return false;
                });
        } catch (error) {
            throw new Error(error);
        }
    },
    removeCartItem: (context, payload) => {
        const cartItems = CartService.removeItem(payload);
        context.commit("SET_CART_ITEMS", cartItems);
    },
};

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
        let totalShipping = 0;
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
            return (state.totalPrice = total.toFixed(2, 4));
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
            const qty = product.quantity + quantity;
            const stock = product.stock;
            if (stock < qty) {
                return false;
            }
            return true;
        }
        state.cart.find((items, index) => {
            if (items.id === payload.product.id) {
                const qty = state.cart[index].quantity + payload.qty;
                const stock = calculateStockCounts(
                    state.cart[index],
                    payload.qty
                );
                if (qty !== 0 && stock) {
                    state.cart[index].quantity = qty;
                } else {
                    console.log(state.cart[index].quantity);
                }
                return true;
            }
        });
    },
    removeCartItem: (state, payload) => {
        const index = state.cart.indexOf(payload);
        state.cart.splice(index, 1);
    },
    setLocalCart(state) {
        state.cartItem = [...state.cartItem];
        let amount = 0;
        state.cartItem.forEach((item) => {
            amount += parseFloat(item.aggregatedPrice.amount);
        });
        amount = amount.toFixed(2);
        state.total = {
            amount,
        };
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
