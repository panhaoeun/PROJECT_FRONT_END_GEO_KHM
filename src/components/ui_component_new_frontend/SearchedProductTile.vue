<template>
  <router-link
    :to="productLinkURLSearch(product)"
    class="page-link center-text item"
  >
    <div class="item-inner">
      <div
        class="img-container"
      >
        <div class="img-wrapper">
          <lazy-image
            :data-src="thumbImageURL(product)"
            :title="product?.product_eng"
            :alt="product?.product_eng"
            height="50"
            width="50"
          />
        </div>
      </div>
      <div class="title-wrap">
      
        <div class="pos-rel flex flex-column">
            <h6
            class="ellipsis ellipsis-1 mb-1"
            >
                {{product?.product_eng}}
            </h6>
          <p>
            <span
              v-if="product.product_unit_price_khr"
            >
              <span>{{ currencyFormattedKHRiel(product.product_unit_price_khr) }}</span>
            </span>
            <span>
               ( <span>{{ currencyFormattedUSD(product.product_unit_price) }}</span>)
            </span>
          </p>
        </div>
      </div>
    </div>

  </router-link>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '@/mixin/util'
  import productPriceHelper from '@/mixin/productPriceHelper'
  import compareHelper from '@/mixin/compareHelper'
  import LazyImage from "./LazyImage";
//   import PriceFormat from "./PriceFormat";


  export default {
    name: 'SearchedProductTile',
    components: {
        // PriceFormat,
        LazyImage
    },
    directives: {},
    props: {
      product: {
        type: Object,
        default() {
          return null
        },
      },

    },
    mixins: [util, productPriceHelper, compareHelper],
    computed: {
      ...mapGetters('common', ['currencyIcon', 'setting']),
    },
    methods: {
        ...mapActions('common', ['postRequest', 'setToastMessage', 'setToastError']),
        // Convert Currency Amount
        currencyFormattedKHRiel(value){
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD(value){
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
    }
  }
</script>