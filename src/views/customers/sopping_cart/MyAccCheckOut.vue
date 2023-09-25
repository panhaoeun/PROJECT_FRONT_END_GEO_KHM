<template>
   <div class="bg-white">
        <div class="breadcrumb-area bg-bluegray-100">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <ul>
                        <li>
                            <router-link to="/">Home</router-link>
                        </li>
                        <li class="active">Checkout </li>
                    </ul>
                </div>
            </div>            
        </div>
        <div class="checkout-main-area pt-10">
            <div class="container pb-4">
                <div class="checkout-wrap pt-30">
                    <div class="row">
                        <div class="col-lg-7">
                            <div class="billing-info-wrap mr-50">
                                <h3>Shipping And Billing Details</h3>
                            </div>
                            <div class="gap-3 my-2">
                                <!-- Shipping Method -->
                                <div class="my-2">
                                    <!-- Shipping Method -->
                                    <ShippingMethod/>
                                </div>
                                <div class="my-2">
                                    <!-- Shipping Address -->
                                    <AddShippingAddress 
                                        :allAddresses="shippingAddress" 
                                        :selected="selectedAddressShip"
                                        @selected="addressSelectedShipping"
                                    />
                                </div>
                               <div class="my-2">
                                    <!-- Billing Address -->
                                    <BillingAddress
                                        :allAddresses="billingAddressAll"   
                                        :selected="selectedAddressBill"
                                        @selected="addressSelectedBillingArr"
                                    />
                               </div>
                            </div>
                        </div>
                        <!-- Order Detail -->
                        <div class="col-lg-5">
                            <div class="your-order-area">
                                <h3>Your order</h3>
                                <div class="your-order-wrap gray-bg-4">
                                    <div class="your-order-info-wrap">
                                        <div class="your-order-info">
                                            <ul>
                                                <li>Product <span>Total</span></li>
                                            </ul>
                                        </div>
                                       <!-- Order Payment -->
                                       <OrderDetail/>
                                    </div>
                                    <!-- Payment Methods -->
                                    <div class="pay-top sin-payment">
                                        <transition
                                            name="shipping-form-anim"
                                            enter-active-class="animated slideInLeft faster"
                                            leave-active-class="animated slideOutLeft faster"
                                        >
                                            <!-- Payment Method -->
                                            <PaymentDetail 
                                                v-if="isSessionActive()" 
                                                :selected="selectPaymentMethod"
                                                :currentBalanceUSD="currentBalanceUSD"
                                                :currentBalanceKHR="currentBalanceKHR"
                                            />
                                        </transition>
                                    </div>
                                    <!-- Order Noted -->
                                    <div class="additional-info-wrap pt-4">
                                        <label>Order notes (Optional)</label>
                                        <textarea placeholder="Notes about your order, e.g. special notes for delivery." v-model="customerOrderNoted" name="order_noted"></textarea>
                                    </div>
                                </div>
                                <div class="Place-order" v-if="isSessionActive() && carts.length > 0">
                                    <router-link to="#" @click.prevent="handleCheckOutPayment()">Place Order</router-link>
                                </div>
                                <div v-else>
                                    <p>You need to log in first before starting checkout process</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>
<!-- Script od My account check out -->
<script>
    import { mapGetters } from 'vuex';
    import AddShippingAddress from "./my_account_checkout/AddShippingAddress.vue";
    import BillingAddress from "./my_account_checkout/AddBillingAddress.vue";
    import ShippingMethod from "./my_account_checkout/ShippingMethod.vue";
    import OrderDetail from "./my_account_checkout/OrderDetail.vue";
    import PaymentDetail from "./my_account_checkout/PaymentDetail.vue";
    import { isLoggedIn } from "@/utils/auth/auth";
    export default {
        data() {
            return {
                shippingAddress: [],
                billingAddressAll: [],
                selectedAddressShip: {},
                selectedAddressBill: {},
                paymentMethod: '',
                customerOrderNoted: '',
                shopId: null,
                vendorId: null,
                emailPhoneId: null
            }
        },          
        components: {
            AddShippingAddress,
            BillingAddress,
            ShippingMethod,
            OrderDetail,
            PaymentDetail
        },
        computed:{
            currentUser() {
                return this.currentUser ? this.currentUser : null;
            },
            ...mapGetters({
                getSelectedAddressShip: 'shippingStore/getSelectedAddress',
                selectedAddressBilling: 'billingStore/getSelectedBillingAddress',
                carts: 'cart/getCart',
                checkoutInitiated: 'cart/checkoutInitiated',
                orderDetaiL: 'cart/getCartAuthItem',
                currentUser: 'auth/currentUserAuth',
                payMethod: 'cart/getPayMethod',
                currentBalanceKHR: 'myWallet/getCurrentBalanceKHR',
                currentBalanceUSD: 'myWallet/getCurrentBalanceUSD'
            }),
            shippingMethod: {
                get() {
                    return this.$store.getters['shippingStore/shippingMethod'];
                },
                set(val) {
                    this.$store.commit('shippingStore/setShippingMethod', val);
                },
            },
            formateCurrentBalanceKHR(){
                const convertBalance = this.currentBalanceKHR.toString().replace(/[^0-9.]/g, '');
                return convertBalance ? convertBalance : 0;
            }
        },
        methods: {
            isSessionActive(){
                return isLoggedIn();
            },
            async selectPaymentMethod(selected){
                if (!this.checkoutInitiated) return;
                this.$store.commit('cart/selectPayMethodOrder', selected);
            },
            async addressSelectedShipping(selected) {
                this.$store.commit('shippingStore/addressSelected', selected);
                if (!this.checkoutInitiated) return;
                this.selectedAddressShip = selected;
            },
           async addressSelectedBillingArr(selected){
                this.$store.commit('billingStore/addressSelectedBilling', selected);
                this.selectedAddressBill = selected;
            },
            getPaymentMethod(){
                if(this.payMethod !== null){
                    return {
                        paymentMethod: this.payMethod.aliasName ? this.payMethod.aliasName : ''
                    }
                }
            },
            async handleCheckOutPayment(){
                if(this.isSessionActive() !== null){
                    if (!this.getSelectedAddressShip || !this.selectedAddressBilling ||  !this.shippingMethod) {
                        this.$notify.warning({
                            title: 'Please select shipping method first',
                            message: 'The shipping method and address should be selected first.',
                            showClose: false
                        });
                        return;
                    } 
                    console.log(this.getPayMethod)
                    // Handle Checkout Payments 
                    await this.$store.dispatch('cart/createCheckout', {
                        shopId: this.shopId ? this.shopId : 0,
                        vendorId: this.vendorId ? this.vendorId : 0,
                        emailPhoneId: this.getCurrentUser().userEmail ? this.getCurrentUser().userEmail : '',
                        phoneNumberId: this.getCurrentUser().userPhoneNumber ? this.getCurrentUser().userPhoneNumber : 0 ,
                        customerOrderNoted: this.customerOrderNoted ? this.customerOrderNoted : 0,
                        orderDetaiL: this.orderDetaiL ? this.orderDetaiL : 0,
                        getSelectedAddressShip: this.getSelectedAddressShip ? this.getSelectedAddressShip : '',
                        selectedAddressBilling: this.selectedAddressBilling ? this.selectedAddressBilling : '',
                        shippingMethod: this.shippingMethod ? this.shippingMethod : '',
                        paymentMethod: this.getPaymentMethod().paymentMethod ? this.getPaymentMethod().paymentMethod: ''
                    });
                }
            },
            getCurrentUser(){
                if(this.currentUser !== null && this.currentUser.length > 0){
                    return {
                        userPhoneNumber: this.currentUser[0].user_phonenumber ?? '',
                        userEmail: this.currentUser[0].user_email ?? ''
                    }
                }
            },  
        },
    }
</script>
