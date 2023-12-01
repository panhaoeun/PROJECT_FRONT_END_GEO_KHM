<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="detail-right">
    <div class="sticky-right">
        <div class="content">
                <!-- Store -->
                <store-tile
                    class="mt-10"
                    :store="product"
                />
        </div>
        <!-- Social Shared -->
        <client-only>
            <social-share
                class="hide-sm mb-15"
                :product="product"
            />
        </client-only>
    </div>
    <!-- detail-right -->
  </div>
  <!-- detail-right -->
</template>

<script>
//   import moment from 'moment'
  import util from '@/mixin/util'
  import productHelper from '@/mixin/productHelper'
  import productPriceHelper from '@/mixin/productPriceHelper'
  import {mapGetters} from 'vuex'
  import StoreTile from "./StoreTile";
  import SocialShare from './SocialShare'

  export default {
    data() {
      return {
        exchangeExpressDay: 0,
        exchangeNormalDay: 0,
        expressDelivery: {},
        cartError: {
          attribute: null,
          quantity: null,
        },
        currentSelected: {},
        selectedCustomizations: {},
        productInventory: {},
        currentAttributes: [],
        attrRender: false,
        ajaxing: false,
        ajaxingWishlist: false,
        inventory: null,
        price: 0,
        selectedAttributesTitle: {},
        quantity: 1,
        pricePopOver: false,
        buyingNow: false,
        secureTrans: false,
        selectedShippingExpressDelivery: "Normal (1-2 Day)",
        expressOptionSelected: {},
        selectedCustomDeliveryExpress: {},
        customerRole: null
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      product: {
        type: Object
      }
    },
    components: {
      StoreTile,
      SocialShare
    },
    mixins: [util, productHelper, productPriceHelper],
    computed: {
      productAttributes() {
        return this.product?.product_spec.map(i => {
          return {
            ...i, ...{
              values: i.additional.reduce((a, item) => {
                a[`${item}-${item.item}`] = item
                return a;
              }, {})
            }
          }
        })
      },
      ...mapGetters('language', ['langCode']),
      ...mapGetters('common', ['currencyIcon', 'setting']),
      ...mapGetters('cart', ['cartProducts']),
    },
    mounted() {
      //Checking if the product has no attribute
      if (this.product?.inventory?.length === 1 && this.product?.inventory[0]?.inventory_attributes?.length === 0) {
        this.productInventory = this.product?.inventory[0]
      }
    },
    activated() {
      this.attrRender = true
      setTimeout(() => {
        this.attrRender = false
      }, 10)
    }
  }
</script>

<style>

</style>
