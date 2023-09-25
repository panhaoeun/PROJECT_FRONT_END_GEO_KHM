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
                        {{ cart }}
                        <li class="active">Cart Page </li>
                    </ul>
                </div>
            </div>
        </div>
        {{ currentCartAuthToken }}
        <div class="cart-main-area pt-70 pb-120">
            <div class="container">
                <!-- Cart Item -->
                <div v-if="getProductsInCart.length > 0 && getProductsInCart !== null">
                    <h3 class="cart-page-title">Your cart items</h3>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <form action="#">
                                <div class="table-content table-responsive cart-table-content">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Until Price</th>
                                                <th>Qty</th>
                                                <th>action</th>
                                            </tr>
                                        </thead>
                                        <tbody v-for="(productItem, index) in getProductsInCart"  :key="index">
                                            <tr>
                                                <td class="product-thumbnail">
                                                    <a href="#">
                                                        <!-- Thumbnail -->
                                                        <img 
                                                            :src="productItem?.productURL 
                                                                && productItem?.productURL.length>0
                                                                ? productItem?.productURL 
                                                                : 'https://img.business.com/rc/816x500/aHR0cHM6Ly93d3cuYnVzaW5lc3NuZXdzZGFpbHkuY29tL2ltYWdlcy9pLzAwMC8wMTcvMDg0L29yaWdpbmFsL21hY2Jvb2stcHJvLTE4LnBuZw==?_ga=2.200130154.557404650.1551883694-765115885.1551883694'
                                                                " 
                                                            alt=""
                                                            width="100"
                                                        />
                                                    </a>
                                                </td>
                                                <td class="product-name">
                                                    <a href="#">{{ productItem?.product_eng ?? '' }}</a>
                                                </td>
                                                <td class="product-price-cart">
                                                    <span class="amount">{{ parseFloat(productItem?.price).toFixed(2,10) ?? '0.00' }} ៛</span>
                                                </td>
                                                <td class="product-quantity pro-details-quality">
                                                    <div class="cart-plus-minus">
                                                        <!-- Update TY -->
                                                        <input 
                                                            :class="productItem?.price"
                                                            type="number"
                                                            min="1"
                                                            :value="parseInt(productItem?.quantity ?? 0)"
                                                            @change="updateCartItem($event,productItem)"
                                                        >
                                                    </div>
                                                </td>
                                                <td class="product-remove">
                                                    <a href="#" @click="removeCartItem(productItem)"><i class="icon_close"></i></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="cart-shiping-update-wrapper">
                                            <div class="cart-shiping-update">
                                                <router-link to="/" class="text-900 hover:text-white">Continue Shopping</router-link>
                                            </div>
                                            <div class="cart-shiping-update bg-red">
                                                <router-link to="/customer/my-account/shopping-cart/orders/checkout" class="bg-red-500 text-white">Check Out</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Cart Empty -->
                <template v-else>
                    <EmptyAddTOCart />
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
            'cartSubTotal'
        ]),
        // Check product item cart in  api
        currentCartAuthToken(){
            return this.getCurrentOrderItemAuthLog()
        }
    },
    data() {
        return {
            title: 'Checkout',
        }
    },
    created() {
        this.getCurrentCartItem = new CustomerOrderCheckOutServices();
    },
    methods: {
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
            if (typeof pathName !== "undefined") {
                return `${process.env.ENV_HOST_PATH_FILE}uploads/products_img/thumbnail/${pathName}`
            } else {
                return '';
            }
        },
        updateCartItem(event, cartItem){
            const quantity = parseInt(event.target.value) ?? 0;
            const productItemId = cartItem?.productId ?? 0;
            const productSpecItem = cartItem?.productSpec ?? '';
            const productPrice = cartItem?.unitPrice ?? 0;
            this.updateQuantity({productItemId,cartItem,quantity,productSpecItem,productPrice});
        },
        removeCartItem(productItem){
            this.removeProductFromCart(productItem);
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
    }
}
</script>