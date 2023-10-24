<template>
   <div class="bg-white">
      <div class="breadcrumb-area bg-bluegray-100">
            <div class="container">
                <!-- Breadcrumb -->
                <div class="breadcrumb-content text-center">
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li class="active">Cart Page </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="cart-main-area pt-70 pb-120">
            <div class="container">
                <!-- Cart Item -->
                <div v-if="getCartAuthItem.length > 0 && getCartAuthItem !== null">
                    <div class="order-detail">
                        <!-- Title -->
                        <h3>
                            Shopping Cart
                        </h3>
                        <hr>
                        <el-card class="box-card">
                            <!-- Today Exchange Rate -->
                            <template #header>
                                <div class="flex justify-content-between align-items-center">
                                    <input :value="convertTodayExchangeRateUSDToRiel()" hidden/>
                                    <span>
                                        Exchange Rate : 
                                       {{ currencyFormattedUSD(1) ? currencyFormattedUSD(1) : 0 }}  = ៛{{ todayExchangeRate ? todayExchangeRate : 0 }}
                                    </span>
                                    <!-- Source -->
                                    <el-popover
                                        placement="top-start"
                                        :width="500"
                                    >
                                        <!-- Default Exchange  -->
                                        <template #default >
                                            <p >
                                                API Exchange Rate: 
                                                <a target="_blank" href="https://github.com/fawazahmed0/currency-api#free-currency-rates-api" class="font-bold text-red-500">Free Currency Rates API</a>
                                            </p>
                                            <p>
                                                Follow Exchange Rate: 
                                                <a target="_blank" href="https://www.xe.com/currencyconverter/convert/?Amount=4143&From=KHR&To=USD" class="font-bold text-red-500">XE Currency Converter</a>
                                            </p>
                                        </template>
                                        <template #reference>
                                            <el-button class="m-2 hover:bg-red-500">Exchange Rate Source</el-button>
                                        </template>
                                    </el-popover>
                                </div>
                            </template>
                            <ul class="orders">
                                <div class="row">
                                    <li class="border-bottom-2"> 
                                        <div class="row font-bold">
                                            <div class="col font-bold align-center text-center">
                                                 <div class="justify-content-center font-bold">
                                                     Product details
                                                 </div>
                                            </div>
                                            <div class="col align-center text-center">
                                                <div class="justify-content-center font-bold">
                                                    Qty
                                                </div>
                                            </div>
                                            <div class="col align-center text-center">
                                                <div class="justify-content-center">
                                                    Unit Price
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="justify-content-center">
                                                    Price
                                                </div>
                                            </div>
                                            <div class="col-2"></div>
                                        </div>
                                    </li>
                                </div>
                                <li v-for="(item, itemIndex) in getCartAuthItem" v-bind:key="itemIndex">
                                   <div class="my-3">
                                        <!-- Shop Name  -->
                                        <div class="font-bold">
                                            <label class="text-purple-900"> {{ item?.shopName ? item?.shopName : '' }}</label>
                                            <p class="text-primary-600">{{ item?.shippingCompanyDay ? item?.shippingCompanyDay : '' }}</p>
                                        </div>
                                        <!-- Shipping Price -->
                                        <div class="shipping-price">
                                            <span class="text-red-500">Shipping cost:</span>
                                            <span class="pl-2">{{ currencyFormattedKHRiel(item?.expressPriceKHR) ? currencyFormattedKHRiel(item?.expressPriceKHR) : 0 }}</span>
                                            <span>({{ currencyFormattedUSD(item?.expressPriceUSD) ? currencyFormattedUSD(item?.expressPriceUSD) : 0  }})</span>
                                        </div>
                                   </div>
                                    <div class="row">
                                        <div class="col-1">
                                            <div  
                                                class="order-img order-desc"
                                                v-if="item.thumbnailImage != null"
                                                @click="gotoProductPage(item?.product_id,item?.product_eng)"
                                                :style="orderPicture(getProductImageURLThumbnail(item.thumbnailImage))"
                                            >
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <!-- Variant Name -->
                                            <div class="order-desc pb-10">
                                                <span class="font-bold text-md pt-4"> {{ item?.product_eng ? item?.product_eng : '' }} </span>
                                                <br/>
                                                <template v-if="item?.variantName && item?.variantName !== ''">
                                                    <template v-for="([key, value], index) in Object.entries(item?.variantName)" :key="index">
                                                        <div class="flex flex-column">
                                                            <p class="text-blue-600">{{ key }} : {{value}}</p>
                                                        </div>
                                                    </template>
                                                </template>
                                            </div>
                                        </div>
                                        <div class="col align-center text-center px-2 py-2">
                                            <b-form-input
                                                size="sm"
                                                type="number"
                                                min="1"
                                                step="1" 
                                                :max="item.quantity"
                                                aria-describedby="qtyFeedback"
                                                v-model="item.quantity"
                                                @change.capture="updateCartItem(item,itemIndex, $event)"
                                                class="mb-3"
                                                @input="updateQuantityAddToCart(itemIndex, $event)" 
                                                @blur="checkQuantity(itemIndex, $event)" 
                                            ></b-form-input>
                                            <b-form-invalid-feedback v-if="editMode" id="qtyFeedback">0</b-form-invalid-feedback> 
                                        </div>
                                        <div class="col">
                                           <div class="flex flex-column" style="padding-left: 5rem;">
                                                <span class="font-bold text-lg" style="color: #1455ac;"> {{ item ? currencyFormattedKHRiel(item?.productPriceKHR) : 0}}</span>
                                                <span class="text-md text-lg"> ({{ item ? currencyFormattedUSD(item?.productPrice) : 0 }})</span>
                                           </div>
                                        </div>
                                        <div class="col">
                                            <div class="flex flex-column" >
                                                <span class="font-bold text-lg" style="color: #1455ac;"> {{ item ? currencyFormattedKHRiel(item?.totalKhRiel) : 0}}</span>
                                                <span class="text-md text-lg"> ( {{ item ? currencyFormattedUSD(item?.total) : 0 }})</span>
                                           </div>
                                        </div>
                                        <div class="col my-4">
                                            <span class="delete pt-10 pl-20 " @click="deleteSelectedCartOrder(item)">
                                                <el-button class="hover:bg-red-500 w-10rem" round>Delete</el-button>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            </el-card>
                            <!-- Total Customer Cart -->
                            <hr/>
                            <div class="row">
                                    <div class="col-lg-3 col-md-6">
                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                    </div>
                                    <div class="col-lg-6 col-md-12"  v-if="getCartAuthItem && getCartAuthItem.length > 0">
                                        <div class="grand-totall">
                                            <div class="title-wrap">
                                                <h4 class="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
                                            </div>
                                            <h5 v-if="getTotalItems !== null">
                                                Total products 
                                                <span class="font-bold text-md" style="color: #e22f35;">{{ getTotalItems ? getTotalItems : 0 }} Item</span>
                                            </h5>
                                            <h5 v-if="cartTotalShipping !== null">
                                                Shipping 
                                                <span class="font-bold text-md" style="color: #e22f35;">
                                                    {{ currencyFormattedKHRiel(cartTotalShipping.shippingAmountKHR) ?? 0 }}
                                                    {{ currencyFormattedUSD(cartTotalShipping?.shippingAmountUSD) ?? 0}}
                                                </span>
                                            </h5>
                                            <h5 v-if="getSubTotal !== null">
                                                Sub Total 
                                                  <span class="font-bold text-md" style="color: #e22f35;">
                                                    {{ currencyFormattedKHRiel(getSubTotal?.subTotalKHR) }}
                                                    <label> ({{ currencyFormattedUSD(getSubTotal?.subTotalUSD) }})</label>
                                                </span>
                                            </h5>
                                        <router-link to="#" class="bg-red-500 text-white" @click="createCheckOutOrderProduct()">Proceed to Checkout</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <!-- Empty Cart -->
                <div v-if="getCartAuthItem && getCartAuthItem.length <= 0" class="order-empty">
                    <div class="content">
                        <div>You have not ordered yet.
                        <br>
                        <br>
                            <b-button @click="$router.push('/')" class="primary-button">Go Get Order In</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
// import EmptyAddTOCart from "./empty_add_to_cart/EmptyAddToCart.vue";
import {mapGetters, mapActions} from "vuex";
import {CartService} from "@/services/customers/add_to_cart/CartCustomerService";
import {isLoggedIn} from '@/utils/auth/auth';
import  CustomerOrderCheckOutServices from "@/services/customers/CustomerOrdersServices.js";
import convertUSDToRiel from "@/utils/convertUSDTORiel";
// import _ from "lodash";

export default {
    name: 'ViewCart',
    components: {
    },
    computed: {
        ...mapGetters('cart', [
            'getProductsInCart',
            'cartTotalAmount',
            'cartSubTotal',
            'getCartAuthItem',
            'getSubTotal',
            'getTotalItems',
            'cartTotalShipping',
            'getTotal'
        ]),
        // Check product item cart in  api
        currentCartAuthToken(){
            return this.getCurrentOrderItemAuthLog()
        },
        quantityState() {
            return qty => qty >= 1;
        },
    },
    data() {
        return {
            form: {
                variant: {
                attributes: [],
                },
                variants: [],
            },
            productQtyOrder: 1,
            editMode: false,
            countOptions: [],
            title: 'Checkout',
            productVariantName: [],
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
            todayExchangeRate: 0
        }
    },
    created() {
        this.countOptions = Array.from(Array(200).keys(), val => val + 1);
        this.getCurrentCartItem = new CustomerOrderCheckOutServices();
    },
    methods: {
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
        async convertTodayExchangeRateUSDToRiel() {
            try {
                const usdAmountExchange = parseInt(1) ? parseInt(1) : 0;
                const todayExchangeRate = parseInt(usdAmountExchange)
                    ? parseInt(usdAmountExchange)
                    : 0;
                this.todayExchangeRate =  (await convertUSDToRiel(todayExchangeRate)) ?? 0;
                const resultExchangeRate = await Promise.resolve(todayExchangeRate);
                return resultExchangeRate;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        getProductSpecOwn(productSpec){
            if(productSpec !== ''){
                let variantsName = ''
                let variantSpec = '';
                for (var prop in productSpec) {
                    if (Object.prototype.hasOwnProperty.call(productSpec, prop)) {
                        variantsName = prop ? prop : '';
                        variantSpec = productSpec[prop] ? productSpec[prop] : '';
                        console.log(variantsName,variantSpec)
                        // return `${variantsName ? variantsName : ''}: ${variantSpec ? variantSpec : ''}`;
                    }
                }
            }
        },
        currencyFormattedKHRiel: function(value) {
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD: function(value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
        customDisplay(val) {
            return val.indexOf('|') >= 0 ? val.split('|')[0] : val;
        },
        editOrder() {
            this.editMode = true;
        },
        gotoProductPage(productId, productName){
            if (!productId && !productName) return;
            this.$router.push(
                {
                    path: '/customer/product-details/product/view-product-detail',
                    query: {
                        pid: productId ? productId : 0,
                        pname:encodeURIComponent(productName ? productName : '').replace(/[!'()]/g, escape).replace('\'', '%27')
                    }
                }
            );
        },
        gotoDealPage() {
             this.$router.push('/');
        },
        orderPicture(img) {
            return {
                'background-image': `url(${img})`,
                width: '100%',
                height: '90px',
                'background-size': 'contain',
                'background-repeat': 'no-repeat',
            };
        },
        ...mapActions('cart', {
            updateQuantity: 'updateCartQuantity',
            removeProductFromCart: 'removeCartItem'
        }),
        getProductCurrentStorage(){
            return CartService.getCart();
        },
        hasProduct(){
            if(!Array.isArray(this.getProductsInCart) || !this.getProductsInCart.length > 0){
                return [];
            }
        },
        getProductImageURLThumbnail(pathName) {
            if (typeof pathName !== undefined) {
                return `${this.ENV_HOST_PATH_FILE}uploads/products_img/thumbnail/${pathName}`
            } else {
                return '';
            }
        },
        updateQuantityAddToCart(index, event){
            // const valueInt = parseInt(event);
            const product = this.getCartAuthItem[index];
            if(isNaN(event) || event === ""){
                product.quantity = event;
            }
        },
        checkQuantity(index, event) {
            if (event.target.value === "") {
                const product = this.getCartAuthItem[index];
                product.quantity = 1;
            }
        },
        async updateCartItem(cartItem, index,event){
            // const productItemId = cartItem?.productId ?? 0;
            // const productSpecItem = cartItem?.productSpec ?? '';
            // const productPrice = cartItem?.unitPrice ?? 0;
             this.$nextTick(async () => {
                if(cartItem?.productInStock <= Number(cartItem?.quantity)){
                    const product = this.getCartAuthItem[index];
                    const quantity = parseInt(event.target.value) ?? 0;
                    product.quantity = cartItem?.productInStock;
                    this.$notify.warning({
                        title: `Product limited on stock on stock ${cartItem?.productInStock} : ${quantity} `,
                        showClose: true
                    });   
                }else{
                    if (cartItem.quantity > 0 && cartItem?.productInStock >= Number(cartItem?.quantity)){
                        try {
                            await this.$store.dispatch('cart/updateCartQuantity', [cartItem]);
                            this.$notify.success({
                                title: `The cart has been successfully updated.`,
                                showClose: true
                            });
                        } catch (error) {
                            this.$notify.error({
                                title: 'Cart could not be updated at the moment. Please try again later.',
                                showClose: true
                            });   
                        }
                    }
                }
                
             });
        },
        async deleteSelectedCartOrder(productItem){
            try {
                await this.$store.dispatch('cart/deleteCustomerCartOrder', [productItem]);
            } catch (err) {
                Promise.reject(err);
            }
        },
        // Get current order auth login
        getCurrentOrderItemAuthLog(){
            if(isLoggedIn()){
                this.getCurrentCartItem.getCartOrderListCurrentCustomer().then((cartItem) => {
                    if(!cartItem){
                        return [];
                    }
                    if(cartItem.length >0 && cartItem !== null){
                        return cartItem? cartItem : [];
                    }
                }).catch((error) => {
                    Promise.reject(error);
                });
            }
        },
        // Confirm To Process to check out payments
        createCheckOutOrderProduct(){
            if(isLoggedIn()){
                this.$confirm('Are you confirm to process to checkout?', 'Process to checkout', {
                    confirmButtonText: 'Check Out',
                    cancelButtonText: 'Cancel',
                    cancelButtonClass: 'surface-hover font-bold hover:surface-300 w-7rem',
                    confirmButtonClass: 'bg-red-500 border-none font-bold hover:surface-300 w-15rem',
                    type: 'info',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = 'Process to checkout...';
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 1000);
                        } else {
                                done();
                        }
                    }
                }).then(() => {
                    // Confirm To Process to check out payments
                    this.$router.push('/customer/my-account/shopping-cart/orders/checkout');
                }).catch(() => {
                    this.$notify.warning({
                        title: "Cancel to process check out order",
                        showClose: true
                    });
                    return false;
                });
             }
            
        }   
    },
    filters: {
        customDisplay(val) {
            return val.indexOf('|') >= 0 ? val.split('|')[0] : val;
        },
    },
}
</script>

<!-- Style CSS -->
<style lang="scss" scoped>
@import '@/assets/scss/global.scss';

.edit-bag {
  font-size: 18px;
  margin-left: 20px;
  color: #bdbdbd;
  cursor: pointer;
}


.total-line {
  padding: 10px;
}
.order-detail {
  margin-top: 30px;
  .order-empty {
    height: 500px;
    line-height: 500px;
    color: #bdbdbd;
    font-size: 1.5em;
    text-align: center;

    .content {
      display: inline-block;
      vertical-align: middle;
      line-height: normal;
    }
  }
}
</style>
