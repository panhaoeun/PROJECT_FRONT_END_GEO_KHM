<template>
    <div class="pos-rel">
        <!-- Proper Dialog Wallet -->
        <ewallet-payment-digital
            v-if="showWalletPayments"
            :order-id="orderId"
            :amount="parseFloat(amount)"
            :currency="currencyData"
            :name="userName"
            :site-name="site_setting.siteName"
            :email="getCurrentUser().userEmail"
            :phone="getCurrentUser().userPhoneNumber"
            :shipping-address="getSelectedAddressShip"
            :order-detail="orderDetaiL"
            @success="orderPlaced('success', $event)"
            @closed="orderPlaced('closed', $event)"
        />
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
                        <span>Cash on delivery</span>
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
                        <i class="icon-ms cod-icon"/>
                        <span>Payment By Wallet</span>
                    </label>
                </div>
                <!-- Payment order -->
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
                            text="Confirm Order and pay now"
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
                            text="Confirm Order and pay now"
                            @clicked="initWallerPayments"
                        />
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<!-- Script of  payment gateway -->
<script>
    import convertUSDToRiel from '@/utils/convertUSDTORiel';
    import { isLoggedIn } from "@/utils/auth/auth";
    import util from '@/mixin/util'
    import {mapGetters} from 'vuex'
    import productHelper from "@/mixin/productHelper"
    import productPriceHelper from "@/mixin/productPriceHelper"
    import paymentHelper from '@/mixin/paymentHelper'
    import Spinner from "@/components/ui_component_new_frontend/Spinner";
    import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
    import EwalletPaymentDigital from "./EWalletPaymentDigital";
    export default{
        middleware: ['auth'],
        data() {
            return {
                loading: false,
                flutterwaveLoaded: false,
                paypaLoaded: false,
                showRazorpay: false,
                showStripe: false,
                paymentType: 2,
                orderData: null,
                orderError: null,
                submitting: false,
                placingOrder: false,
                checkedProductQty: 0,
                customerOrderNoted: '',
                showWalletPayments: false
            }
        },
        created() {
            this.getConvertExchangeToRielTotal();
        },
        props: {
            voucher: {
                type: Object,
                default() {
                return null
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
        watch: {},
        components: {
            AjaxButton,
            Spinner,
            EwalletPaymentDigital
        },
        mixins: [util, productHelper, paymentHelper, productPriceHelper],
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
             async getConvertExchangeToRielTotal(){
                try {
                    const getTotalItem = this.cartTotal ? this.cartTotal: '';
                    const baseChangeToRielTotal = parseInt(getTotalItem) ? parseInt(getTotalItem) : 0;
                    const exchangeRate = await convertUSDToRiel(baseChangeToRielTotal) ?? 0;
                    this.exchangeRateRielTotal = exchangeRate ? exchangeRate : 0;
                    // Total order to wallets
                    return this.$store.dispatch('myWallet/orderAmountTotal', {
                        amountTotalKHR: this.cartTotal.totalKHR ? this.cartTotal.totalKHR : 0,
                        amountTotalUSD: this.cartTotal.totalUSD ? this.cartTotal.totalUSD : 0
                    });
                } catch (error) {
                    console.error('Error:', error);
                } 
            },
            currentUser() {
                return this.currentUser ? this.currentUser : null;
            },
            getCurrentUser(){
                if(this.currentUser !== null && this.currentUser.length > 0){
                    return {
                        userPhoneNumber: this.currentUser[0].user_phonenumber ?? '',
                        userEmail: this.currentUser[0].user_email ?? ''
                    }
                }
            },  
            isSessionActive(){
                return isLoggedIn();
            },
            async initWallerPayments() {
                try {
                    console.log(this.showWalletPayments)
                    // await this.confirmOrder()
                    this.showWalletPayments = true
                } catch (e) {
                    return Promise.reject(e);
                }
            },
            async confirmOrder() {
                return new Promise(resolve => {
                    if (this.isCheckout) {
                        if (parseInt(this.paymentType) === this.orderMethods.CASH_ON_DELIVERY) {
                            this.orderError = ''
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
                            this.orderError = ''
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
                        this.$router.push({path: '/user/order/' + event})
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
    
    }
</script>