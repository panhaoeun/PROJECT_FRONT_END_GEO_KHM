<template>
    <div class="your-order-middle">
        <ul >
            <li v-for="(item, itemIndex) in orders" v-bind:key="itemIndex">
                {{item.product_eng ? item.product_eng : '' }}
                <label for="" class="font-bold text-red-500"> (x{{ item?.quantity }})</label>
                <span>៛ {{ exchangeRateRiel ? exchangeRateRiel : 0}}  (${{ item.productPrice ? item.productPrice : 0 }})</span>
                <input type="text" :value="getConvertExchangeToRiel(item?.productPrice ? item?.productPrice : 0)" hidden/>
            </li>
        </ul>
    </div>
    <!-- Sub total and total -->
    <template v-if="orders && orders.length > 0">
        <div class="your-order-info order-subtotal">
            <ul>
                <li>
                    Subtotal 
                    <input type="text" :value="getConvertExchangeToRielSubtotal(subtotal ? subtotal : 0)" hidden/>
                    <span>
                       ៛ {{ exchangeRateRielSubtotal ? exchangeRateRielSubtotal : 0 }}  
                       (${{ parseFloat(subtotal).toFixed(2) ? parseFloat(subtotal).toFixed(2) : 0 }})
                    </span>
                </li>
            </ul>
        </div>
        <div class="your-order-info order-shipping">
            <ul>
                <li>
                    Shipping 
                    <span>
                        ៛ {{ exchangeRateRielShip ? exchangeRateRielShip: 0 }}
                       (${{ priceShipping() ? priceShipping() : 0 }})
                        <input type="text" hidden :value="getConvertExchangeToRielShipping(priceShipping() ? priceShipping() : 0)">
                    </span>
                </li>
            </ul>
        </div>
        <div class="your-order-info order-total">
            <ul>
                <li>Total 
                    <input type="text" :value="getConvertExchangeToRielTotal(cartTotal ? cartTotal : 0)" hidden/>
                    <span>
                        ៛ {{ exchangeRateRielTotal ? exchangeRateRielTotal: 0 }}
                        (${{ cartTotal ? cartTotal : 0 }})
                    </span>
                </li>
            </ul>
        </div>
    </template>
</template>
<!-- Script -->
<script>
    import convertUSDToRiel from '../../../../utils/convertUSDTORiel';
    import convertRielToUSDAmount from '../../../../utils/convertRielToUSD';
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
        },
        computed: {
            ...mapGetters({
                orders: 'cart/getCartAuthItem',  
                cartTotal: 'cart/getTotal',
                subtotal: 'cart/getSubTotal',
                totalShipping: 'cart/cartTotalOrder'
            }),
            shippingMethod: {
                get() {
                    return this.$store.getters['shippingStore/shippingMethod'];
                }
            },
        },
        methods: {
            async getConvertExchangeToRiel(exchangeRiel){
                try {
                    const baseChangeToRiel = parseInt(exchangeRiel) ? parseInt(exchangeRiel) : 0;
                    this.exchangeRateRiel = await convertUSDToRiel(baseChangeToRiel) ?? 0;
                } catch (error) {
                    console.error('Error:', error.message);
                }
            },
            async getConvertExchangeToUSD(exchangeUSD){
                try {
                    this.exchangeRateUSD = await convertRielToUSDAmount(exchangeUSD) ?? 0;
                } catch (error) {
                    console.error('Error:', error.message);
                }
            },
            async getConvertExchangeToRielSubtotal(exchangeRielSubTotal){
                try {
                    const baseChangeToRiel = parseInt(exchangeRielSubTotal) ? parseInt(exchangeRielSubTotal) : 0;
                    this.exchangeRateRielSubtotal = await convertUSDToRiel(baseChangeToRiel) ?? 0;
                } catch (error) {
                    console.error('Error:', error);
                } 
            },
            async getConvertExchangeToRielTotal(exchangeRielTotal){
                try {
                    const baseChangeToRielTotal = parseInt(exchangeRielTotal) ? parseInt(exchangeRielTotal) : 0;
                    this.exchangeRateRielTotal = await convertUSDToRiel(baseChangeToRielTotal) ?? 0;
                    // Total order to wallets
                    if(baseChangeToRielTotal){
                        console.log(baseChangeToRielTotal)
                    }
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
            priceShipping(){
                if(this.shippingMethod !== null){
                    return this.shippingMethod.const_price ?? 0;
                }else{
                    return 0;
                }    
            }
        }
    }
</script>