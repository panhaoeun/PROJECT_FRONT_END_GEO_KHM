<template>
    <div class="your-order-middle">
        <ul >
            <li v-for="(item, itemIndex) in orders" v-bind:key="itemIndex">
                <div class="text-sm">
                    {{item.product_eng ? item.product_eng : '' }}
                    <label class="font-bold text-red-500"> (x{{ item?.quantity }})</label>
                    <span class="text-sm">{{currencyFormattedKHRiel(item?.productPriceKHR)}}  ({{ currencyFormattedUSD(item.productPrice ? item.productPrice : 0) }})</span>
                    <!-- <input type="text" :value="getConvertExchangeToRiel(item?.productPrice ? item?.productPrice : 0)" hidden/> -->
                </div>
            </li>
        </ul>
    </div>
    <!-- Sub total and total -->
    <template v-if="orders && orders.length > 0">
        <div class="your-order-info order-subtotal">
            <ul>
                <li>
                    Subtotal 
                    <!-- <input type="text" :value="getConvertExchangeToRielSubtotal(subtotal ? subtotal : 0)" hidden/> -->
                    <span>
                       {{ currencyFormattedKHRiel(subtotal?.subTotalKHR) ? currencyFormattedKHRiel(subtotal?.subTotalKHR) : 0 }}  
                       ({{ currencyFormattedUSD(subtotal?.subTotalUSD) ? currencyFormattedUSD(subtotal?.subTotalUSD) : 0 }})
                    </span>
                </li>
            </ul>
        </div>
        <div class="your-order-info order-shipping">
            <ul v-if="totalShipping !== null">
                <li>
                    Shipping 
                    <span class="font-bold text-md" style="color: #e22f35;">
                        {{ currencyFormattedKHRiel(totalShipping.shippingAmountKHR) ?? 0 }}
                        {{ currencyFormattedUSD(totalShipping?.shippingAmountUSD) ?? 0}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="your-order-info order-total">
            <ul v-if="cartTotal !== null">
                <li>
                    Total 
                    <!-- <input type="text" :value="getConvertExchangeToRielTotal(cartTotal ? cartTotal : 0)" hidden/> -->
                    <span>
                        {{ currencyFormattedKHRiel(cartTotal.totalKHR) ?? 0 }}
                        ({{ currencyFormattedUSD(cartTotal?.totalUSD) ?? 0}})
                    </span>
                </li>
            </ul>
        </div>
    </template>
</template>
<!-- Script -->
<script>
    import convertUSDToRiel from '../../../../utils/convertUSDTORiel';
    // import convertRielToUSDAmount from '../../../../utils/convertRielToUSD';
    import { mapGetters } from 'vuex';
    export default{
        name: 'OrderDetail',
        data() {
            return {
                countOptions: [],
                exchangeRateRiel: null,
                exchangeRateUSD: null,
                exchangeRateRielSubtotal: 0,
                exchangeRateRielShip: 0,
                exchangeRateRielTotal: 0
            };
        },
        created() {
            this.totalWithShippingPrice();
        },
        computed: {
            ...mapGetters({
                orders: 'cart/getCartAuthItem',  
                cartTotal: 'cart/getTotal',
                subtotal: 'cart/getSubTotal',
                totalShipping: 'cart/cartTotalShipping',
            }),
            shippingMethod: {
                get() {
                    return this.$store.getters['shippingStore/shippingMethod'];
                }
            },
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
            // async getConvertExchangeToRiel(exchangeRiel){
            //     try {
            //         const baseChangeToRiel = parseInt(exchangeRiel) ? parseInt(exchangeRiel) : 0;
            //         this.exchangeRateRiel = await convertUSDToRiel(baseChangeToRiel) ?? 0;
            //     } catch (error) {
            //         console.error('Error:', error.message);
            //     }
            // },
            // async getConvertExchangeToUSD(exchangeUSD){
            //     try {
            //         this.exchangeRateUSD = await convertRielToUSDAmount(exchangeUSD) ?? 0;
            //     } catch (error) {
            //         console.error('Error:', error.message);
            //     }
            // },
            // async getConvertExchangeToRielSubtotal(exchangeRielSubTotal){
            //     try {
            //         const baseChangeToRiel = parseInt(exchangeRielSubTotal) ? parseInt(exchangeRielSubTotal) : 0;
            //         this.exchangeRateRielSubtotal = await convertUSDToRiel(baseChangeToRiel) ?? 0;
            //     } catch (error) {
            //         console.error('Error:', error);
            //     } 
            // },
            async getConvertExchangeToRielTotal(exchangeRielTotal){
                try {
                    const baseChangeToRielTotal = parseInt(exchangeRielTotal) ? parseInt(exchangeRielTotal) : 0;
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
            async getConvertExchangeToRielShipping(exchangeRielShip){
                try {
                    const baseChangeToRiel = parseInt(exchangeRielShip) ? parseInt(exchangeRielShip) : 0;
                    this.exchangeRateRielShip = await convertUSDToRiel(baseChangeToRiel) ?? 0;
                } catch (error) {
                    console.error('Error:', error);
                } 
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
            }
        }
    }
</script>