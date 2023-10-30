<template>
  <div
    class="gap-20 flex sided align-start b-b pb-15 mb-10 cart-product-tile"
    v-if="product"
  >
      <div class="flex gap-15">
        <!-- <input
          type="checkbox"
          :value="cartId"
          v-model="cbChecked"
          class="cp"
          @change="$emit('cb-changed', {id: cart.id, checked: $event})"
        > -->
        <router-link
          class="w-120x img-wrapper"
          :to="productLink(product)"
          :title="title"
        >
          <lazy-image
            :data-src="getThumbImageURLThumbnail(product?.thumbnailImage)"
            :title="title"
            :alt="title"
          />
        </router-link>
      </div>
      <div class="flex align-start grow block-sm gap-15">
        <div class="grow">
          <div>
            <h5 class="semi-bold mb-5 text-black font-bold">
              <router-link
                class="ellipsis-1 text-black font-bold text-md"
                :to="productLink(product)"
                :title="title"
              >
                {{ title }}
              </router-link>
            </h5>
            <h5>
            <span class="mr-15" v-for="i in currentAttr" :key="i">
              <span class="mr-10">{{i[0]}}</span> : {{i[1]}}
            </span>
            </h5>
            <p
              v-if="hasBundleDeal"
              class="ellipsis-1"
            >
              <span>{{ $t('cartProductTile.bundleOffer') }}: </span>
              {{ bundleDeal.title }}
            </p>
          </div>

          <form
            v-if="isShipping"
          >
            <p v-if="!currentShipRule" class="error">{{ noShipMessage }}</p>
            <p v-else-if="error && error.length" class="error">
              <span class="block" v-for="e in error" :key="e">{{ e }}</span>
            </p>
            <div v-else-if="cartShipping[cart.id]">
              <label class="mr-15 cp">
                <input
                  class="mt-5 cp"
                  type="radio"
                  :value="shippingTypeIn.location"
                  :name="`shipping_${cartId}_type`"
                  @change="updateCartShipping"
                >
                {{ $t('cartProductTile.fromLocation') }}(
                <price-format
                  :price="currentShipRule.price"
                />)
              </label>
                <!-- v-model="cartShipping[cartId].shipping_type" -->
              <label
                v-if="parseInt(currentShipRule.pickup_point) === 1"
                class="mr-15 cp">
                <input
                  class="mt-5 cp"
                  type="radio"
                  :value="shippingTypeIn.pickup"
                  :name="`shipping_${cartId}_type`"
                  @change="updateCartShipping"
                >
                {{ $t('cartProductTile.fromPickupPlace') }}(
                <price-format
                  :price="currentShipRule.pickup_price"
                />)
              </label>
            </div>
          </form>
          <div
            v-else
            class="flex gap-10 start wrap mt-10"
          >
            <quantity-nav
              class="mtb-5"
              :quantity="parseInt(productQuantity)"
              :product-inventory="cart.updated_inventory"
              :max="maxQuantity"
              @value-changed="valueChanged"
            />
            <ajax-button
              class="outline-btn plr-20 mtb-5"
              type="button"
              text="Delete"
              color="primary"
              @clicked="deleting"
            />
          </div>
        </div>

        <div class="mt-sm-10 mn-w-90x right-text">
          <h5 class="price inl-b-sm">
            <price-format
              :price="productPrice"
            />
          </h5>
          <p class="inl-b-sm">x {{ productQuantity }}</p>
          <p class="inl-b-sm" v-if="hasBundleDeal">(-) x {{ bundleDeal.free }}</p>
        </div>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LazyImage from './LazyImage'
  import util from '@/mixin/util'
  import QuantityNav from './QuantityNav'
  import productPriceHelper from '@/mixin/productPriceHelper'
  import PriceFormat from "./PriceFormat"
  import AjaxButton from "./AjaxButton"

  export default {
    name: 'CartProductTile',
    data() {
      return {
        ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
        cbChecked: this.checked
      }
    },
    watch: {
      checked(){
        this.cbChecked = this.checked
      }
    },
    props: {
      checked: {
        type: Array
      },
      cart: {
        type: Object
      },
      isShipping: {
        type: Boolean,
        default: false
      },
      cartShipping: {
        type: Object,
        default() {
          return null
        }
      },
      error: {
        type: Array,
        default() {
          return []
        }
      },
      address: {
        type: Object,
        default(){
          return null
        }
      },
    },
    components: {
      AjaxButton,
      PriceFormat,
      QuantityNav,
      LazyImage
    },
    computed: {
      hasBundleDeal(){
        return (this.productQuantity >= this.bundleDeal?.buy)
      },
      bundleDeal(){
        return this.product?.bundle_deal
      },
      cartId(){
        return this.cart?.id
      },
      product(){
        return this.cart;
      },
      productInventory(){
        return this.cart?.variantName;
      },
      productPrice() {
        if (this.productInventory?.inventory_attributes?.length > 0 && this.productInventory?.price > 0) {
          return this.productInventory?.price
        }
        return this.product.price > 0
          ? this.product.price : this.product.offered > 0
            ? this.product.offered : this.product.selling
      },
      currentShipRule(){
        let matched = null
        if(this.address){
          this.product?.shipping_rule?.shipping_places.forEach((obj) => {
            if(obj.country === this.address.country){
              if(obj.state === this.address.state){
                matched = obj
                return
              }else if(obj.state === 'ALL'){

                matched = obj
              }
            }else if(obj.country === 'ALL') {
              if(!matched){
                matched = obj
              }
            }
          })
        }
        if(matched && this.cartShipping[this.cart?.id]){
        //   this.cartShipping[this.cart?.id].shipping_place = matched
          this.updateCartShipping()
        }
        return matched
      },
      inventoryAttributes(){
        return this.productInventory?.variantName
      },
      currentAttr(){
        console.log(this.inventoryAttributes)
        return this.inventoryAttributes?.map(i => {
            console.log(i)
        //   return [i?.attribute_value?.attribute?.title, i?.attribute_value?.title]
        })
      },
      title(){
        return this.product?.product_eng || ''
      },
      maxQuantity(){
        return parseInt(this.productInventory?.quantity)
      },
      productQuantity(){
        return parseInt(this.cart?.quantity)
      },
      noShipMessage(){
        const state = this.address.stateTitle ? `${this.address.stateTitle},` : ''
        return this.$t('cartProductTile.noShipMessage', { state: state, country: this.address.countryTitle})
      },
      ...mapGetters('common', ['currencyIcon', 'setting']),
    },
    mixins: [util, productPriceHelper],
    methods: {
      getThumbImageURLThumbnail(pathName){
        if (typeof pathName !== undefined) {
                return `${this.ENV_HOST_PATH_FILE}uploads/products_img/thumbnail/${pathName}`
            } else {
                return '';
            }
      },
      updateCartShipping(){
        this.$emit('shipping-changed', this.cartShipping)
      },
      deleting(){
        if (confirm(this.$t('cartProductTile.deleteAlert'))) {
          this.$emit('deleting', {id: this.cartId, isBundle: !!this.bundleDeal})
        }
      },
      valueChanged(evt){
        this.$emit('quantity', {
          bundleDeal: this.bundleDeal,
          product: this.product,
          inventory: this.productInventory,
          direction: evt.direction}
          )
      }
    },
    created() {
    },
    mounted() {
    }
  }
</script>


