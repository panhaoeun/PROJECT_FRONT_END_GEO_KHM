<template>
  <div>
    <transition name="fade" mode="out-in">
      <div
        class="spinner-wrapper flex justify-content-center flex-wrap"
        v-if="fetchingCartData || ajaxing"
      >
        <spinner
          :radius="100"
        />
      </div>
      <div v-else>
      <cart-product-tile
          v-for="(value) in cartProducts"
          :key="value?.id"
          :cart="value"
          :checked="checked"
          :is-shipping="isShipping"
          :cart-shipping="cartShipping"
          :address="address"
          :error="dataFromObject(errorFromApi, value.id, null)"
          @cb-changed="cbChangedFn"
          @deleting="deleting"
          @quantity="valueChanged"
          @update-cart-shipping="updateCartShipping"
        />
    </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import util from '@/mixin/util'
  import CartProductTile from "./CartProductTile";
  import Spinner from "./Spinner";

  export default {
    name: 'CartList',
    data() {
      return {
        fetchingCartData: false,
        ajaxDeleting: 0,
      }
    },
    watch: {
    },
    props: {
      cartProducts: {
        type: Array
      },
      checked: {
        type: Array
      },
      cartShipping: {
        type: Object,
        default() {
          return null
        }
      },
      isShipping: {
        type: Boolean,
        default: false
      },
      ajaxing: {
        type: Boolean,
        default: false
      },
      errorFromApi: {
        type: Object,
        default(){
          return null
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
      Spinner,
      CartProductTile
    },
    computed: {
      ...mapGetters('language', ['langCode']),
    },
    mixins: [util],
    methods: {
        ...mapActions('common', ['setToastMessage', 'setToastError']),
      updateCartShipping(){
        this.$emit('shipping-changed', this.cartShipping)
      },
      async valueChanged({ product, inventory, direction}){
        try {
            console.log(inventory)
            // Trick
            this.$nextTick(async () => {
                if(product.productInStock <= direction){
                    this.$notify.warning({
                        title: `Product limited on stock on stock ${product?.productInStock} : ${direction} `,
                        showClose: true
                    });   
                }else{
                    if (product?.productInStock >= direction){
                        try{
                            await this.$store.dispatch('cart/updateCartQuantity', {
                                quantity: direction ? direction : 1, 
                                productInStock: product?.productInStock,
                                product_id: product?.product_id,
                                productPriceKHR: product?.productPriceKHR,
                                shippingCompanyDay: product?.shippingCompanyDay,
                                expressPriceKHR: product?.expressPriceKHR,
                                expressPriceUSD: product?.expressPriceUSD
                            });
                            this.setToastMessage('The cart has been successfully updated');
                        }catch(error){
                            this.setToastError(`!!! Cart could not be updated at the moment. Please try again later..,${error}`)
                            return
                        }
                    }   
                }
            });
        //   await this.cartAction({
        //     payload: {
        //       apiVal:{
        //         user_token: await this.getUserToken(),
        //         product_id: product.id,
        //         inventory_id: inventory.id,
        //         quantity: direction
        //       },
        //       storeVal:{
        //         product: product,
        //         inventory: inventory,
        //         quantity: direction,
        //         selected: '1'
        //       },
        //       isBundle: !!bundleDeal
        //     },
        //     lang: this.langCode
        //   })
        }catch (e) {
            throw new Error(e);
        }
      },
      async deleting(evt){

        try {
          await this.cartDelete({
            payload: evt,
          })
        }catch (e) {
            throw new Error(e);
        }
      },
      async cbChangedFn(evt){
        const cbChecked = this.checked
        if(evt.checked.target.checked){
          cbChecked.push(evt.id)
        }else {
          const index = this.checked.findIndex((obj)=>{
            return parseInt(obj) === parseInt(evt.id)
          })
          delete cbChecked[index]
        }

        await this.cartChanged({
          lang: this.langCode,
          payload: {
            checked: cbChecked
          }
        })
        this.$emit('cart-changed', true)
      },
      ...mapActions('user', ['getUserToken']),
      ...mapActions('cart', ['cartDelete', 'cartAction', 'cartChanged'])
    },
    created() {
    },
    mounted() {
    }
  }
</script>


