<template>
    <div>
        <form
            action=""
            method="post"
            id="payment-form"
            class="stripe-form"
        >
            <!-- Your current balance -->
            <div
                class="input-wrap input-text"
            >
                <label>
                    Your current balance
                </label>
                <input
                    type="text"
                    disabled
                    v-if="getCurrentBalance !== undefined"
                    v-model="getCurrentBalance"
                />
            </div>
            <!-- Order amount -->
            <div
                class="input-wrap input-text"
            >
                <label>
                    Order amount
                </label>
                <input
                    type="text"
                    disabled
                    v-if="getTotalAmount !== undefined"
                    v-model="getTotalAmount"
                />
            </div>
            <!-- Remaining balance -->
            <div
                class="input-wrap input-text"
            >
                <label>
                    Remaining balance
                </label>
                <input
                    disabled
                    type="text"
                    v-if="getCurrentBalance !== undefined"
                    v-model="getRemainingAmountBalanceWallet"
                />
            </div>
            <span class="error">{{ remainingAmountOrder?.balanceAccountMS }}</span>
            <!-- Used to display Element errors. -->
            <div
                id="card-errors"
                role="alert"
            />
            <p class="error">
                {{ errorText }}
            </p>
        </form>
        <!-- Check  Current Balance Wallet-->
        <template v-if="cartTotal.totalKHR !==0 && orderDetaiLCart.length > 0 && checkBalanceWallet === true">
                <ajax-button
                    class="primary-btn w-100"
                    :type="'button'"
                    :fetching-data="submitting"
                    @clicked="confirmToPaymentByWallet"
                    :loading-text="$t('stripePayment.placing')"
                    :text="payBtnText"
                />
        </template>
       
    </div>
</template>
<!-- Script of JS -->
<script>
import {mapGetters} from 'vuex'
import paymentHelper from '@/mixin/paymentHelper'
import util from '@/mixin/util'
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import { ElMessageBox, ElNotification } from "element-plus";
import { isLoggedIn } from "@/utils/auth/auth";

export default {
    components: {
        AjaxButton
    },
    mixins: [util, paymentHelper],
    props: {
      orderId: {
        type: Number,
        default: 0
      },
      stripeKey: {
        type: String,
        default: ''
      },
      currency: {
        type: String,
        default: 'USD'
      },
      amount: {
        type: Number,
        default: 0
      },
      userName: {
        type: String,
        default: ''
      },
      siteName: {
        type: String,
        default: ''
      },
      userEmail: {
        type: String,
        default: ''
      },
      userPhone: {
        type: Number,
        default: 0
      },
      orderPayNoted: {
        type: String,
        default: ''
      },
      shippingAddress: {
        type: String,
        default: ''
      },
      orderDetaiL: {
        type: Array,
        required: true,
        default() {
            return Array;
        }
      }
    },
    computed: {
        getCurrentBalance(){
            return this.currentBalanceKHR + '' + '(' + this.currentBalanceUSD + ')';
        },
        payBtnText(){
            return 'Pay now';
        },
        formattedPrice(){
            return this.priceFormat(this.currencyPosition, this.currencyIcon, this.amount, this.setting)
        },
        getTotalAmount(){
            return this.currencyFormattedKHRiel(this.dynamicAmountOrder?.amountTotalKHR) +' '+ '('+ this.currencyFormattedUSD(this.dynamicAmountOrder?.amountTotalUSD) +')';
        },
        getRemainingAmountBalanceWallet(){
            return '៛' + this.remainingAmountOrder.remainingMoneyKHR  +  ' ' + '(' + '$'+ this.remainingAmountOrder.remainingMoneyUSD + ')'  
        }, 
        ...mapGetters('language', ['langCode']),
        ...mapGetters('common', ['currencyIcon', 'currencyPosition', 'setting']),
        ...mapGetters({
            dynamicAmountOrder:'myWallet/getTotalAmountOrderShip',
            remainingAmountOrder: 'myWallet/getRemainingAmountOrder',
            checkBalanceWallet: 'myWallet/checkRemainingAccSubmit',
            getSelectedAddressShip: 'shippingStore/getSelectedAddress',
            selectedAddressBilling: 'billingStore/getSelectedBillingAddress',
            carts: 'cart/getCart',
            checkoutInitiated: 'cart/checkoutInitiated',
            orderDetaiLCart: 'cart/getCartAuthItem',
            currentUser: 'auth/currentUserAuth',
            payMethod: 'cart/getPayMethod',
            currentBalanceKHR: 'myWallet/getCurrentBalanceKHR',
            currentBalanceUSD: 'myWallet/getCurrentBalanceUSD',
            cartTotal: 'cart/getTotal',
            subtotal: 'cart/getSubTotal',
            totalShipping: 'cart/cartTotalShipping',
        }),
    },
    data() {
        return {
            showPopup: true,
            frmPaymentMethod: {
                currentBalance: this.currentBalanceKHR ? this.currentBalanceKHR : 0,
                orderAmount: 0,
                remainingBalance: 0
            },
            dialogVisibleOpenWallet: false,
            loader: true,
            submitting: false,
            errorText: '',
        };
    },
    created() {
        this.dialogOpenMyWallet();
        this.totalWithShippingPrice();
        this.totalOrderAmountPayGateway();  
    },
    methods: {
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
        totalWithShippingPrice(){
            if(this.totalShipping !== null){
                return this.$store.dispatch('cart/totalOrderWithSipping', {
                    shippingPriceKHR: this.totalShipping.shippingAmountKHR ? this.totalShipping.shippingAmountKHR: 0,
                    shippingPriceUSD: this.totalShipping.shippingAmountUSD ? this.totalShipping.shippingAmountUSD: 0,
                    subTotalKHR: this.subtotal.subTotalKHR ? this.subtotal.subTotalKHR : 0,
                    subTotalUSD: this.subtotal.subTotalUSD ? this.subtotal.subTotalUSD : 0,
                });
            }
        },
        async totalOrderAmountPayGateway(){
            try {
                // Total order to wallets
                return this.$store.dispatch('myWallet/orderAmountTotal', {
                    amountTotalKHR: this.cartTotal.totalKHR ? this.cartTotal.totalKHR : 0,
                    amountTotalUSD: this.cartTotal.totalUSD ? this.cartTotal.totalUSD : 0
                });
            } catch (error) {
                return Promise.reject(error);
            } 
        },
        currencyFormattedKHRiel: function (value) {
            return new Intl.NumberFormat("km-KH", {
                style: "currency",
                currency: "KHR",
                currencyDisplay: "symbol",
            })
                .format(value ? value : 0)
                .replace(/\b(\w*KHR\w*)\b/, "៛");
        },
        currencyFormattedUSD: function (value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
        closePopOver(){
            this.showPopup = false
        },
        async dialogOpenMyWallet() {
            this.dialogVisibleOpenWallet = true;
            // Get Current Balance
            await this.$store.dispatch('myWallet/myWalletCurrentBalance');
            await this.$store.dispatch('myWallet/remainingBalanceToOrder', {
                currentBalanceKHR: this.currentBalanceKHR ? this.currentBalanceKHR : 0,
                currentBalanceUSD: this.currentBalanceUSD ? this.currentBalanceUSD : 0,
                balanceUSD: this.dynamicAmountOrder?.amountTotalUSD ? this.dynamicAmountOrder?.amountTotalUSD : 0, 
                balanceKHR: this.dynamicAmountOrder?.amountTotalKHR ?  this.dynamicAmountOrder?.amountTotalKHR : 0
            });
        },
        confirmToPaymentByWallet: function(){
            ElMessageBox.confirm('Are you confirm to payment by wallet?', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'info',
                cancelButtonClass: "surface-hover font-bold hover:bg-pink-500 w-7rem",
                confirmButtonClass: "bg-red-500 border-none font-bold hover:bg-teal-700 w-10rem",
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = 'Waiting...';
                        // Clear Loading
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 1500);
                    } else {
                        instance.confirmButtonLoading = false
                        done();
                    }
            }}).then(async() => {
                if(this.isSessionActive()){
                    // Subtract Amount Order
                    const confirmOrderPaymentWallet = {
                        remainingAmountBalanceKHR: this.remainingAmountOrder?.remainingMoneyKHR ?? 0,
                        remainingAmountBalanceUSD: this.remainingAmountOrder?.remainingMoneyUSD ?? 0,
                        orderAmountKHR: this.dynamicAmountOrder?.amountTotalKHR ?? 0,
                        orderAmountUSD: this.dynamicAmountOrder?.amountTotalUSD ?? 0
                    };
                    this.submitting = true;
                    // Payments with Wallets
                    await this.$store.dispatch('myWallet/confirmWithdrawMoneyOrderPayment', { confirmOrderPaymentWallet });
                    // Handle Checkout Orders
                    await this.$store.dispatch('cart/createCheckout', {
                        shopId: 0,
                        vendorId: 0,
                        emailPhoneId: this.getCurrentUser().userEmail ? this.getCurrentUser().userEmail : '',
                        phoneNumberId: this.getCurrentUser().userPhoneNumber ? this.getCurrentUser().userPhoneNumber : 0,
                        customerOrderNoted: this.orderPayNoted ? this.orderPayNoted : 0,
                        orderDetaiL: this.orderDetaiLCart ? this.orderDetaiLCart : '',
                        getSelectedAddressShip: this.shippingAddress ? this.shippingAddress : '',
                        selectedAddressBilling: this.shippingAddress ? this.shippingAddress : '',
                        shippingMethod: '',
                        paymentMethods:'PayByWallet'
                    });
                    this.dialogVisibleOpenWallet = false;
                    this.submitting = false
                }
            }).catch(() => {
                ElNotification.warning({
                    title: 'Unsuccessfully to payment by e-wallet',
                    message: 'You are cancel to payment by e-wallet',
                });
                this.submitting = false
            })
        }
    },
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>