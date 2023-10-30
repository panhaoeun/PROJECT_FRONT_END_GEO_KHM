<template>
    <client-only>
    <div class="container-fluid mtb-20 mtb-sm-15">
      <div class="product-detail">
        <div
          class="detail-left ptb-10 plr-20 plr-sm-15 mr-sm area mr-20 mb-sm-15"
        >   
            <!-- Select All -->
            <div class="b-b pb-10 mb-10 flex sided">
                <h5 class="bold">
                    Shopping cart
                </h5>
                <!-- Check Item -->
                <!-- <p v-if="!checked.length">
                    {{ $t('cart.noSelected') }}
                    <button
                        aria-label="submit"
                        class="link ml-10 f-9"
                        @click.prevent="selectAllItems"
                    >
                        {{ $t('cart.selectItems') }}
                    </button>
                    </p>
                    <p v-else>
                    <button
                        aria-label="submit"
                        class="link f-9"
                        @click.prevent="deselectAllItems"
                    >
                        {{ $t('cart.deselectItems') }}
                    </button>
                </p> -->
               

            </div>
             <!-- Cart List Item -->
            <cart-list
                :cart-products="cart"
                :ajaxing="ajaxing"
                :checked="checked"
            />
          </div>
        </div>
      </div>
    </client-only>
</template>
<script>
import { mapGetters } from "vuex";
import util from '@/mixin/util'
import productHelper from "@/mixin/productHelper";
import CartList from '@/components/ui_component_new_frontend/CartList';
import {isLoggedIn} from '@/utils/auth/auth';
// import AjaxButton from '@/components/ui_component_new_frontend/AjaxButton'
export default {
    middleware: ['common-middleware'],
    components: {
        CartList,
        // AjaxButton
    },
    props: {},
    mixins: [util, productHelper],
    data() {
        return {
            preventGoing: true,
            checked: [],
            ajaxing: false,
            isMounting: false,
            hasBundle: false,
            cartPrice: {
                totalItems: 0,
                totalPriceWithOffer: 0,
                totalPrice: 0,
            }
        };
    },
    computed: {
        ...mapGetters({
            cart: 'cart/getCartAuthItem',  
            cartTotal: 'cart/getTotal',
            subtotal: 'cart/getSubTotal',
            totalShipping: 'cart/cartTotalShipping',
        }),
    },
    async mounted() {
        this.fetchingData();
    },
    methods: {
         // Check login
        isLoggedIn() {
            return isLoggedIn();
        },
        async fetchingData() {
            if(isLoggedIn()){
                this.ajaxing = true
                try{
                    await this.cart ? this.cart : [];
                }catch(e){
                    throw new Error(e);
                }
                this.ajaxing = false
            }
           
        }
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>