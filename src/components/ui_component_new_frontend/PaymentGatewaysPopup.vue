<template>
   <div
    class="pos-rel"
  >
    <!-- Payment with wallets dialogs-->
    <transition name="fade" mode="out-in">
      <pop-over
        v-if="showWalletPayments"
        title="Pay by wallet"
        @close="showWalletPayments = false"
        elem-id="cart-pop-over"
        :layer="true"
        class="popup-top-auto"
      >
      <!-- E-Wallet Payments -->
       <template
          v-slot:content
        >
            <new-e-wallet-popup-payment
                :shipping-address="shippingAddress"
                @success="orderPlaced('success', $event)"
                @close="closingPopup"
            />
        </template>
      </pop-over>
    </transition>
   

    <!-- Loading -->
    <transition
        name="fade"
        mode="out-in"
        >
        <div
            class="spinner-wrapper flex justify-content-center flex-wrap layer-white"
            v-if="loading"
        >
            <spinner
            :radius="100"
            />
        </div>
    </transition>
    <!-- Validation No Choose Payments -->
    <p
        v-if="orderError"
        class="f-13 error mb-15"
    >
        <span v-for="i in orderError" class="block" :key="i">{{ i }}</span>
    </p>
    <!-- Payment Gate Way (By Cash and Wallet) -->
    <form
        >
            <p
                v-if="noPaymentMethod"
                class="info mt-15"
            >
                 Currently no payment method is available
            </p>
            <!-- Tab choosing payment method -->
            <div
                class="heading-tab-wrapper"
            >
                <div
                class="tab-heading"
                >
                    <!-- Cash on delivery -->
                    <label
                        :class="{active: paymentType === orderMethods.CASH_ON_DELIVERY}"
                    >
                        <input
                        type="radio"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   name="payment"
                        :value="orderMethods.CASH_ON_DELIVERY"
                        v-model="paymentType"
                        >
                        <i class="icon-ms cod-icon"/>
                        <span class="text-sm">Cash on delivery</span>
                    </label>
                    <label
                        :class="{active: paymentType === orderMethods.PAY_BY_WALLET}"
                    >
                    <!-- Payment with Wallet -->
                    <input
                        type="radio"
                        name="payment"
                        :value="orderMethods.PAY_BY_WALLET"
                        v-model="paymentType"
                        >
                        <img width="21" class="pb-2" src="../../assets/img/wallets/avatar.png">
                        <span class="text-sm">Payment by wallet</span>
                    </label>
                </div>
                
                <!-- Payment order submitted complete order-->
                <div
                class="tab-content"
                >
                    <div
                        v-if="paymentType === orderMethods.CASH_ON_DELIVERY"
                    >
                        <ajax-button
                            class="primary-btn  plr-30 plr-sm-15"
                            type="button"
                            :fetching-data="placingOrder"
                            :disabled="!orderMethods"
                            text="Confirm order"
                            @clicked="confirmOrder"
                        />
                    </div>
                    <div
                        v-if="paymentType === orderMethods.PAY_BY_WALLET"
                    >
                        <ajax-button
                            class="primary-btn  plr-30 plr-sm-15"
                            type="button"
                            :fetching-data="placingOrder"
                            :disabled="!orderMethods"
                            text="Confirm order"
                            @clicked="initWalletPaymentsSubmitted"
                        />
                    </div>
                </div>
            </div>
        </form>
  </div>
</template>
<!-- Script JS -->
<script>
import util from '@/mixin/util';
import productHelper from "@/mixin/productHelper";
import paymentHelper from '@/mixin/paymentHelper'
import productPriceHelper from "@/mixin/productPriceHelper";
import {mapGetters,mapActions} from 'vuex';
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import PopOver from '@/components/ui_component_new_frontend/PopOver'
import NewEWalletPopupPayment from '../../views/customer_new_ui/checkout_payment/NewEWalletPopupPayment.vue';
export default {
    middleware: ['auth'],
    data() {
        return {
            loading: false,
            flutterwaveLoaded: false,
            paypaLoaded: false,
            showWalletPayments: false,
            showStripe: false,
            paymentType: 2,
            orderData: null,
            orderError: null,
            submitting: false,
            placingOrder: false,
            checkedProductQty: 0,
            customerOrderNoted: '',
        }
    },
    components: {
        AjaxButton,
        NewEWalletPopupPayment,
        PopOver
    },
    mixins: [util, productHelper, paymentHelper, productPriceHelper],
    props: {
        voucher: {
            type: Object,
            default() {
                return null
            }
        },
        shippingAddress:{
            type: Array,
            required: true,
            default() {
                return Array;
            }
        },
        order: {
            type: Object,
            default() {
                return null
            }
        },
        page: {
            type: String,
            default: 'checkout'
        },
        totalPrice: {
            type: Number,
            default: 0
        }
    },
    computed: {
        checkedProduct() {
            return this.getCartAuthItem;
        },
        noPaymentMethod() {
            return parseInt(this.paymentGateway?.cash_on_delivery)
        },
        ...mapGetters('cart', ['getCartAuthItem']),
        ...mapGetters('common', ['currencyIcon', 'setting', 'currency', 'currencyPosition', 'paymentGateway', 'site_setting']),
        ...mapGetters({
            getSelectedAddressShip: 'shippingStore/getSelectedAddress',
            selectedAddressBilling: 'billingStore/getSelectedBillingAddress',
            carts: 'cart/getCart',
            checkoutInitiated: 'cart/checkoutInitiated',
            orderDetaiL: 'cart/getCartAuthItem',
            currentUser: 'auth/currentUserAuth',
            payMethod: 'cart/getPayMethod',
            currentBalanceKHR: 'myWallet/getCurrentBalanceKHR',
            currentBalanceUSD: 'myWallet/getCurrentBalanceUSD',
            dynamicAmountOrder:'myWallet/getTotalAmountOrderShip',
            remainingAmountOrder: 'myWallet/getRemainingAmountOrder',
            orders: 'cart/getCartAuthItem',  
            cartTotal: 'cart/getTotal',
            subtotal: 'cart/getSubTotal',
            totalShipping: 'cart/cartTotalShipping',
        }),
        isCheckout() {
            return this.page === 'checkout'
        },
    },
    methods: {
        ...mapActions('common', ['setToastMessage', 'setToastError']),
        ...mapActions('cart', ['getCartByUser', 'subtractCartProductCount', 'emptyCartProduct']),
        closingPopup(){
            this.showWalletPayments = false
        },
        // Payment with wallet
        initWalletPaymentsSubmitted(){
            try {
                this.showWalletPayments = true;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        getCurrentUser(){
            if(this.currentUser !== null && this.currentUser.length > 0){
                return {
                    userPhoneNumber: this.currentUser[0].user_phonenumber ?? '',
                    userEmail: this.currentUser[0].user_email ?? ''
                }
            }
        }, 
        async confirmOrder() {
                return new Promise(resolve => {
                    if (this.isCheckout) {
                        if (parseInt(this.paymentType) === this.orderMethods.CASH_ON_DELIVERY) {
                            this.orderError = '';
                            this.orderPlaced('success', this.paymentType);
                            this.placeOrderCashDelivery()
                                .then(result => {
                                    const data = result?.data;
                                    if (parseInt(2) !== this.orderMethods.CASH_ON_DELIVERY) {
                                        data['total_amount_khr'] = data.totalKhRiel;
                                        data['total_amount_usd'] = data.total;
                                    }
                                    this.orderData = data
                                resolve(data)
                            })
                        }else if (parseInt(this.paymentType) === this.orderMethods.PAY_BY_WALLET) {
                            this.orderError = '';
                            this.orderPlaced('success', this.paymentType)
                            this.placeOrderByWallet()
                                .then(result => {
                                    const data = result?.data;
                                    if (parseInt(3) !== this.orderMethods.PAY_BY_WALLET) {
                                        data['total_amount_khr'] = data.totalKhRiel;
                                        data['total_amount_usd'] = data.total;
                                    }
                                    this.orderData = data
                                resolve(data)
                            })
                        }
                    }
                });
            },
            // Pay By Cash Delivery
            async placeOrderCashDelivery() {
                const params = []
                if (this.checkedProduct.length) {
                    this.checkedProduct.forEach(async (obj) => {
                        let shippingPrice = 0
                        if (parseInt(obj.shipping_type) === 1) {
                            shippingPrice = parseInt(obj?.productPriceKHR)
                        } else if (parseInt(obj.shipping_type) === 2) {
                            shippingPrice = parseInt(obj?.productPriceKHR)
                        }
                        params.push({
                            emailPhoneId: this.getCurrentUser().userEmail,
                            phoneNumberId: this.getCurrentUser().userPhoneNumber,
                            shopId: obj?.shopId,
                            vendorId: obj?.vendorId,
                            expressPriceKHR: obj?.expressPriceKHR,
                            expressPriceUSD: obj?.expressPriceUSD,
                            productInStock: obj?.productInStock,
                            shippingPrice: shippingPrice
                        })
                    });
                    this.loading = true;
                    // Handle Checkout Payments 
                    await this.$store.dispatch('cart/createCheckout', {
                        shopId: 0,
                        vendorId: 0,
                        emailPhoneId: this.getCurrentUser().userEmail ? this.getCurrentUser().userEmail : '',
                        phoneNumberId: this.getCurrentUser().userPhoneNumber ? this.getCurrentUser().userPhoneNumber : 0 ,
                        customerOrderNoted: this.customerOrderNoted ? this.customerOrderNoted : 0,
                        orderDetaiL: this.orderDetaiL ? this.orderDetaiL : 0,
                        getSelectedAddressShip: this.getSelectedAddressShip ? this.getSelectedAddressShip : '',
                        selectedAddressBilling: this.getSelectedAddressShip ? this.getSelectedAddressShip : '',
                        shippingMethod: this.shippingMethod ? this.shippingMethod : '',
                        paymentMethods: 'CashOnDelivery'
                    });
                }
            },
            // Pay by wallets
            async placeOrderByWallet() {
                const params = []
                if (this.checkedProduct.length) {
                    this.checkedProduct.forEach(async (obj) => {
                        let shippingPrice = 0
                        if (parseInt(obj.shipping_type) === 1) {
                            shippingPrice = parseInt(obj?.productPriceKHR)
                        } else if (parseInt(obj.shipping_type) === 2) {
                            shippingPrice = parseInt(obj?.productPriceKHR)
                        }
                        params.push({
                            emailPhoneId: this.getCurrentUser().userEmail,
                            phoneNumberId: this.getCurrentUser().userPhoneNumber,
                            shopId: obj?.shopId,
                            vendorId: obj?.vendorId,
                            expressPriceKHR: obj?.expressPriceKHR,
                            expressPriceUSD: obj?.expressPriceUSD,
                            productInStock: obj?.productInStock,
                            shippingPrice: shippingPrice
                        })
                    });
                    this.loading = true;
                    // Handle Checkout Payments 
                    await this.$store.dispatch('cart/createCheckout', {
                        shopId: 0,
                        vendorId: 0,
                        emailPhoneId: this.getCurrentUser().userEmail ? this.getCurrentUser().userEmail : '',
                        phoneNumberId: this.getCurrentUser().userPhoneNumber ? this.getCurrentUser().userPhoneNumber : 0 ,
                        customerOrderNoted: this.customerOrderNoted ? this.customerOrderNoted : 0,
                        orderDetaiL: this.orderDetaiL ? this.orderDetaiL : 0,
                        getSelectedAddressShip: this.getSelectedAddressShip ? this.getSelectedAddressShip : '',
                        selectedAddressBilling: this.getSelectedAddressShip ? this.getSelectedAddressShip : '',
                        shippingMethod: this.shippingMethod ? this.shippingMethod : '',
                        paymentMethods: 'PayByWallet'
                    });
                }
            },
            orderPlaced(type = 'success', event, redirect = true, showToast = true) {
                if (type === 'success') {
                    if(showToast){
                        this.setToastMessage('Your order has been placed successfully.')
                    }
                    if (redirect) {
                        this.$router.push({path: '/user/order'})
                    }
                    this.$emit('order-status', true)
                } else if (type === 'error') {
                    this.$router.push({path: '/user/order/'})
                    this.setToastError(event)
                } else if (type === 'closed') {
                    this.$router.push({path: '/user/order/'})
                    this.$emit('order-status', false)
                }
            },
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>