<template>
  <div class="p-tile">
    <div
      :title="product?.product_eng"
      @click.prevent="productLink(product)"
      class="page-link"
    >
      <div
        class="block img-wrapper"
      >
        <span
          v-if="badge"
          class="badge"
        >
          {{ badge }}
        </span>
        <!-- <slot name="floating-btn">
          <button
            aria-label="submit"
            class="compare-btn"
            :title="$t('product.compare')"
            @click.prevent="addToCompare"
          >
            <i class="icon reload-icon"/>
          </button>
        </slot> -->

        <lazy-image
          v-if="isLazyImage"
          :data-src="productImgRULFormatePRODUCT(product?.product_picture)"
          :title="product?.product_eng"
          :alt="product?.product_eng"
        />
        <img
          v-else
          :src="productImgRULFormatePRODUCT(product?.product_picture)"
          :title="product?.product_eng"
          :alt="product?.product_eng"
          height="10"
          width="10"
        >
      </div>

      <div class="item-title">
        <h6
          class="ellipsis"
          :class="`ellipsis-${titleEllipsis}`"
        >
          {{product?.product_eng}}
      </h6>
        <div class="flex wrap start">
            <p class="price-wrapper">
                <span class="font-bold">
                    <label class="text-danger">{{ currencyFormattedKHRiel(product?.product_unit_price_khr) }}</label>
                    <label class="pl-2">({{ currencyFormattedUSD(product?.product_unit_price) }})</label>
                </span>
            </p>
            <span
                v-if="reducedPercent"
                class="discount ml-10"
            >
                -{{reducedPercent}}%</span>
            </div>

      </div>
    </div>
  </div>
</template>

<script>
  import LazyImage from '../LazyImage'
  import util from '@/mixin/util'
  import productPriceHelper from '@/mixin/productPriceHelper'
  import productHelper from '@/mixin/productHelper'
  import compareHelper from '@/mixin/compareHelper'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'ProductTile',
    props: {
      product: {
        type: Object,
        default() {
          return null
        },
      },
      isLazyImage: {
        type: Boolean,
        default: true
      },
      compared: {
        type: Boolean,
        default: false
      },
      titleEllipsis: {
        type: Number,
        default: 2
      },
    },
    data() {
      return {
        ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE.replace("https", "http"),
        ajaxingCompare: false
      }
    },
    components: {
      LazyImage
    },
    mixins: [util, productHelper, productPriceHelper, compareHelper],
    computed: {
      badge(){
        return this.product?.badge
      },
       ...mapGetters('common', ['currencyIcon', 'setting']),
    },
    mounted() {
    },
    methods: {
        ...mapActions('common', ['postRequest', 'setToastMessage', 'setToastError']),
        productImgRULFormatePRODUCT(thumbnailURL){
            return this.ENV_HOST_PATH_FILE + `uploads/products_img/thumbnail/` + thumbnailURL;
        },
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
    },
  };
</script>