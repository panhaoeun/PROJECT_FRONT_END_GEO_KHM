<template>
    <client-only>
    <div class="container-fluid mtb-20 mtb-sm-15">
      <div class="product-detail">
        <div
          class="detail-left ptb-10 plr-20 plr-sm-15 mr-sm area mr-20 mb-sm-15"
        >
          <div class="b-b pb-10 mb-10 flex sided">
                <h5 class="bold">
                    Shopping cart
                </h5>
                <!-- Check Item -->
                <p v-if="!checked.length">
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
                </p>
                <!-- Cart List Item -->
                <cart-list
                    :cart-products="cartProducts"
                    :ajaxing="ajaxing"
                    :checked="checked"
                />

            </div>
          </div>
        </div>
      </div>
    </client-only>
</template>
<script>
import util from '@/mixin/util'
import productHelper from "@/mixin/productHelper";
export default {
    middleware: ['common-middleware'],
    components: {},
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
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>