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
                            <template #header>
                                <div class="card-header">
                                    <span>Shop name : 6valley CMS</span>
                                </div>
                            </template>
                            <ul class="orders">
                                <div class="row">
                                    <li>
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
                                            <div class="order-desc pb-10">
                                                <span class="font-bold text-md pt-4"> {{ item?.product_eng ? item?.product_eng : '' }} </span>
                                                <br/>
                                                <template v-if="item?.variantName">
                                                    <template v-if="item?.variantName.length> 0 && item?.variantName !== ''">
                                                        <div 
                                                            style="font-size: 12px"
                                                            v-for="custom of JSON.parse(item?.variantName)"
                                                            :key="custom.variantId"
                                                        >
                                                            <span>
                                                                <label :for="custom.item" class="font-bold"> {{ custom.item ?? '' }}: </label>
                                                                <template v-if="custom.additional">
                                                                    <template v-for="additionalItem in custom.additional" :key="additionalItem.itemId">
                                                                        {{ customDisplay(additionalItem.item) ?? '' }}
                                                                    </template>
                                                            </template>
                                                            </span>
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
                                                aria-describedby="qtyFeedback"
                                                v-model="item.quantity"
                                                @change.capture="updateCartItem(item)"
                                                class="mb-3"
                                            ></b-form-input>
                                            <b-form-invalid-feedback v-if="editMode" id="qtyFeedback">0</b-form-invalid-feedback> 
                                        </div>
                                        <div class="col">
                                           <div class="flex flex-column" style="padding-left: 5rem;">
                                                <span class="font-bold text-lg" style="color: #1455ac;"> ៛ {{ item ? parseFloat(item?.productPriceKHR).toFixed(2,4) : 0}}</span>
                                                <span class="text-md text-lg"> ($ {{ item ? item?.productPrice : 0 }})</span>
                                           </div>
                                        </div>
                                        <div class="col">
                                            <div class="flex flex-column" >
                                                <span class="font-bold text-lg" style="color: #1455ac;"> ៛ {{ item ? parseFloat(item?.totalKhRiel).toFixed(2,4) : 0}}</span>
                                                <span class="text-md text-lg"> ($ {{ item ? item?.total : 0 }})</span>
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
                            <div class="total-line" v-if="getCartAuthItem && getCartAuthItem.length > 0">
                                <div class="row" v-if="getTotalItems !== null">
                                    <div class="col-md-10 align-right">
                                        <strong>Total Quantity: </strong>
                                    </div>
                                    <div class="col-md-2 align-right">
                                        <span class="font-bold text-md" style="color: #e22f35;">{{ getTotalItems }} Item</span>
                                    </div>
                                </div>
                       
                                <div class="row" v-if="getSubTotal !== null">
                                    <div class="col-10 align-right">
                                        <strong>Sub Total: </strong>
                                    </div>
                                    <div class="col-2 align-right">
                                        <div class="flex flex-column" >                                     
                                            <span class="font-bold text-md" style="color: #1455ac;"> 
                                                ៛         
                                                {{ parseFloat(getSubTotal?.subTotalKHR).toFixed(2,4) }}
                                            </span>
                                            <span class="text-md font-bold"> ($ {{ parseFloat(getSubTotal?.subTotalUSD).toFixed(2,4) }})</span>
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
                                <b-button @click="gotoDealPage()" class="primary-button">Go Get Orderin</b-button>
                                </div>
                            </div>
                        </div>
                </div>
                <!-- Cart Empty -->
                <template v-else>
                    <EmptyAddTOCart/>
                </template>
            </div>
        </div>
   </div>
</template>

<script>
import EmptyAddTOCart from "./empty_add_to_cart/EmptyAddToCart.vue";
import {mapGetters, mapActions} from "vuex";
import {CartService} from "@/services/customers/add_to_cart/CartCustomerService";
import {isLoggedIn} from '@/utils/auth/auth';
import  CustomerOrderCheckOutServices from "@/services/customers/CustomerOrdersServices.js";
export default {
    name: 'ViewCart',
    components: {
        EmptyAddTOCart
    },
    computed: {
        ...mapGetters('cart', [
            'getProductsInCart',
            'cartTotalAmount',
            'cartSubTotal',
            'getCartAuthItem',
            'getSubTotal',
            'getTotalItems'
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
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE
        }
    },
    created() {
        this.countOptions = Array.from(Array(200).keys(), val => val + 1);
        this.getCurrentCartItem = new CustomerOrderCheckOutServices();
    },
    methods: {
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
       async updateCartItem(cartItem){
            // const quantity = parseInt(event.target.value) ?? 0;
            // const productItemId = cartItem?.productId ?? 0;
            // const productSpecItem = cartItem?.productSpec ?? '';
            // const productPrice = cartItem?.unitPrice ?? 0;
             this.$nextTick(async () => {
                if(cartItem?.productInStock <= Number(cartItem?.quantity)){
                    this.$notify.warning({
                        title: 'Product limited on stock',
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
        }
    },
    filters: {
        customDisplay(val) {
            console.log(val)
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

  .orders {
    list-style-type: none;
    padding: 0px;
    width: 100%;

    .order-desc {
      cursor: pointer;
    }

    .checkbox-item {
      padding-top: 20px;
    }

    li {
      padding: 10px;
      margin-bottom: 10px;
      width: 100%;

      &:nth-child(even) {
        background: #eeeeee;
      }
    }
  }
}
</style>
