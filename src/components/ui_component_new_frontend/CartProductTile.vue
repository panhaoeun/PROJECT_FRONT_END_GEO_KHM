<template>
  <div
    class="gap-20 flex sided align-start b-b pb-1 mb-10 cart-product-tile"
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
          class="w-70x img-wrapper gap-5"
          :to="productListCartLink(product)"
          :title="title"
        >
          <lazy-image
            :data-src="getThumbImageURLThumbnail(product?.thumbnailImage)"
            :title="title"
            :alt="title"
          />
        </router-link>
      </div>
      <div class="flex align-start grow block-sm">
        <div class="grow gap-5">
          <div>
            <h6 class="semi-bold  text-blue-800 font-bold cursor-pointer">
                <div
                    class="ellipsis-1 text-blue-800 font-bold text-sm"
                    @click.prevent="productLink(product)"
                    :title="title"
                >
                    {{ truncateLongText(title,40, '\b') }}
                </div>
            </h6>
            <!-- Product Variant Name -->
            <h6 class="mr-15 text-md gap-10 font-bold text-sm  mt-2 mb-2" v-for="([key, value], index) in currentAttr" :key="index">
                <span>{{key}}</span>: {{ value }}
            </h6>
          </div>

          <form
            class="flex flex-column mt-2 mb-2"
          >
            <!-- <label class="mr-5 cp">
                <span class="text-pink-600">Shipping Company: </span>
                <span class="pl-2 font-bold"> {{ product.shippingCompanyDay }}</span>
            </label> -->
            <label class="mr-5 cp text-sm">
                <span class="text-indigo-700 font-bold">Shipping Cost: </span>
                <span class="pl-2 font-bold text-danger"> {{ currencyFormattedKHRiel(product.expressPriceKHR) }}</span>
                <span class="text-black">({{ currencyFormattedUSD(product.expressPriceUSD) }})</span>
            </label>
          </form>
          <div
            class="flex gap-10 start wrap mt-10"
            v-if="isShipping"
          >
            <quantity-nav
              class="mtb-5 border-round"
              :quantity="parseInt(productQuantity)"
              :product-inventory="cart"
              :max="maxQuantity"
              @value-changed="valueChanged"
              @blur="checkQuantity(index, $event)" 
            />
            <ajax-button
              class="outline-btn plr-20 mtb-5 border-round"
              type="button"
              text="Delete"
              color="primary"
              @clicked="deleting(cart)"
            />
          </div>
        </div>
        <!-- Price -->
        <div class="mt-sm-10 mn-w-90x right-text">
          <h6 class="price inl-b-sm">
            {{ currencyFormattedKHRiel(productPrice) }}
            ({{ currencyFormattedUSD(productPriceUSD) }})
          </h6>
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
         return this.cart?.productPriceKHR;
      },
      productPriceUSD(){
        return this.cart?.productPrice;
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
        return this.productInventory;
      },
      currentAttr(){
        return Object.entries(this.inventoryAttributes);        
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
        truncateLongText(str, length, useWordBoundary){
            if (str.length <= length) { return str; }
            const subString = str.slice(0, length - 1); // the original check
            return (useWordBoundary
                ? subString.slice(0, subString.lastIndexOf(" "))
                : subString) + "...";
        },
        // Currency Formate
        currencyFormattedKHRiel: function(value) {
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD: function(value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
        // Thumbnail URL Image
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
        //Deleted on Cart 
        async deleting(productItem){
            try {
                await this.$store.dispatch('cart/deleteCustomerCartOrder', [productItem]);
            } catch (err) {
                Promise.reject(err);
            }
        },
        //Value Change Input Quantity
        valueChanged(evt){
                this.$emit('quantity', {
                    product: this.product,
                    inventory: this.productInventory,
                    direction: evt?.value
                }
            )
        },
        //Check Value in stock 
        checkQuantity(index, event) {
                if (event.target.value === "") {
                    const product = this.cart[index];
                    product.quantity = 1;
                }
            },
    },
    created() {
    },
    mounted() {
    }
  }
</script>


