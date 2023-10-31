<template>
    <client-only>
        <div class="container-fluid mtb-20 mtb-sm-15">

        <div class="product-detail">
            <div
            class="area detail-left pt-10 plr-20 plr-sm-15 pb-20 pb-sm-15 mr-20 mr-sm mb-sm-15"
            >
            <h5
                class="b-b pb-10 mb-15 bold"
            >
                Select payment method
            </h5>

            <payment-gateways
                ref="paymentGateways"
                :total-price="cartTotal"
                :voucher="voucherResult"
            />
            </div>
            <!-- Check out Payments -->
            <checkout-right
            route-link="checkout"
            :checked-product="checkedProduct"
            :has-shipping="true"
            :voucher-result="voucherResult"
            :hide-btn="true"
            @calculated-price="calculatedPrice"
            >
            <!-- <template v-slot:checkout>
                <div :class="{invalid: !!voucherError}">
                <form
                    class="mt-15 btn-input"
                >
                    <input
                    class="pl-15 pr-80"
                    :placeholder="$t('checkout.voucherCode')"
                    type="text"
                    v-model="voucher">

                    <ajax-button
                    class="primary-btn plr-15"
                    type="button"
                    :fetching-data="submitting"
                    loading-text=""
                    :disabled="!voucher || !!voucherError || !!voucherResult"
                    :text="$t('checkout.apply')"
                    @clicked="checkVoucher"
                    />
                </form>
                </div>
                <span
                v-if="voucherError"
                class="error"
                >
                {{ voucherError }}
            </span>
            </template> -->
            </checkout-right>
        </div>
        </div>
    </client-only>
</template>
<script>
import CheckoutRight from '@/components/ui_component_new_frontend/CheckoutRight'
import PaymentGateways from "./PaymentsGateWays";
// import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import productPriceHelper from "@/mixin/productPriceHelper"
import paymentHelper from '@/mixin/paymentHelper';
import productHelper from "@/mixin/productHelper"
import util from '@/mixin/util';
import {mapGetters} from 'vuex'
export default {
    middleware: ['common-middleware'],
    mixins: [util, productHelper, paymentHelper, productPriceHelper],
    components: {
        PaymentGateways,
        // AjaxButton,
        CheckoutRight
    },
    computed: {
        productPrice() {
            return this.cartPrice;
        },
        checkedProduct() {
            return this.getCartAuthItem.filter(obj => {
                return parseInt(obj.selected) === 1
            })
        },
        totalPrice() {
            if (this.productPrice) {
                return this.productPrice - this.cartPrice.voucher
            }
            return 0
        },
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
        ...mapGetters('cart', ['getCartAuthItem']),
    },
    props: {},
    data() {
        return {
            loading: false,
            paypaLoaded: false,
            voucher: '',
            voucherError: null,
            voucherResult: null,
            submitting: false,
            placingOrder: false,
            cartPrice: 0,
            checkedProductQty: 0
        };
    },
    created() {},
    methods: {
        calculatedPrice(evt) {
            this.cartPrice = evt
        },

    },
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>