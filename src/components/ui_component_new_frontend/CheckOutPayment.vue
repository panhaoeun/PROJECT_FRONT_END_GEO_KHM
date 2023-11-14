<template>
    <div class="area pt-10 plr-20 plr-sm-15 pb-20 pb-sm-15">
      <h5 class="bold b-b pb-10 mb-15">
         Checkout
      </h5>
     <!-- Cart Total CheckOut -->
     <div class="flex sided mb-15 gap-10" v-if="getSubTotal">
        <h5 class="fw-400 text-sm text-bluegray-900">
            Shipping Company: 
        </h5>
        <h5 class="price text-sm text-right">
          Pickup Freight
        </h5>
    </div>
    <!-- Shipping -->
    <div
        v-if="cartTotalShipping"
        class="flex sided pb-10 gap-10">
        <h5 class="fw-400 text-sm text-bluegray-900">Shipping</h5>
        <h5 class="price text-sm text-right">
            {{ currencyFormattedKHRiel(cartTotalShipping.shippingAmountKHR) ?? 0 }}
            ({{ currencyFormattedUSD(cartTotalShipping?.shippingAmountUSD) ?? 0}})
        </h5>
    </div>
    <div class="flex sided mb-15 gap-10" v-if="getSubTotal">
        <h5 class="fw-400 text-sm w-full text-bluegray-900">
            Sub Total 
        </h5>
        <h5 class="price text-sm text-right">
           {{ currencyFormattedKHRiel(getSubTotal?.subTotalKHR) }}
           ({{ currencyFormattedUSD(getSubTotal?.subTotalUSD) }})
        </h5>
    </div>
    <!-- Total With Shipping -->
    <div class="flex sided mb-20 mb-sm-15 b-t pt-10">
        <h6 class="fw-400 text-md">Total</h6>
        <h4 class="price text-sm text-right">
            {{ currencyFormattedKHRiel(totalPriceKHR) }}
            ({{ currencyFormattedUSD(totalPriceUSD) }})
        </h4>
    </div>
     <!-- Button Check Out Payments -->
      <ajax-button
        v-if="!hideBtn"
        class="primary-btn w-100"
        type="button"
        :fetching-data="submitting"
        loading-text="Submitting"
        :text="btnText"
        :disabled="disabled"
        @clicked="$emit('go-next')"
      />
      <slot
        name="checkout"
      />
    </div>
</template>

<script>
  import util from '@/mixin/util'
  import { mapGetters } from 'vuex'
  import productHelper from "@/mixin/productHelper"
  import productPriceHelper from "@/mixin/productPriceHelper"
  import AjaxButton from './AjaxButton'

  export default {
    name: 'CheckoutRight',
    data() {
      return {
        voucher: ''
      }
    },
    watch: {},
    props: {
      checkedProduct: {
        type: Array
      },
      btnText: {
        type: String,
        default: function () {
          return 'Proceed To Checkout'
        }
      },
      hasShipping: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      submitting: {
        type: Boolean,
        default: false,
      },
      hideBtn: {
        type: Boolean,
        default: false,
      },
      voucherResult: {
        type: Object,
        default: () => {
          return null
        }
      }
    },
    components: {
      AjaxButton
    },
    computed: {
       ...mapGetters('common', ['currencyIcon', 'setting']),
       ...mapGetters('cart', [
            'getProductsInCart',
            'cartTotalAmount',
            'cartSubTotal',
            'getCartAuthItem',
            'getSubTotal',
            'getTotalItems',
            'cartTotalShipping',
            'getTotal'
        ]),
        // Total With Shipping
        totalPriceKHR(){
            return this.getSubTotal?.subTotalKHR + this.cartTotalShipping.shippingAmountKHR;
        },
        totalPriceUSD(){
            return this.getSubTotal?.subTotalUSD + this.cartTotalShipping.shippingAmountUSD;
        }
    },
    mixins: [util, productHelper, productPriceHelper],
    created() {
        this.totalWithShippingPriceCheckOut();
    },
    methods: {
        currencyFormattedKHRiel: function(value) {
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD: function(value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
        // Total With Shipping Price
        totalWithShippingPriceCheckOut(){
            return this.$store.dispatch('cart/totalOrderWithSipping', {
                shippingPriceKHR: this.cartTotalShipping.shippingAmountKHR ? this.cartTotalShipping.shippingAmountKHR: 0,
                shippingPriceUSD: this.cartTotalShipping.shippingAmountUSD ? this.cartTotalShipping.shippingAmountUSD: 0,
                subTotalKHR: this.getSubTotal.subTotalKHR ? this.getSubTotal.subTotalKHR : 0,
                subTotalUSD: this.getSubTotal.subTotalUSD ? this.getSubTotal.subTotalUSD : 0,
            });
        }
    }
  }
</script>