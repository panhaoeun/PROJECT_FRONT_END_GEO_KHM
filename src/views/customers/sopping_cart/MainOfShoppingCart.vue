<template>
   <div class="bg-white">
      <div class="breadcrumb-area bg-bluegray-100">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <ul>
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li class="active">Cart Page </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="cart-main-area pt-70 pb-120">
            <div class="container">
                <!-- Cart Item -->
                <div v-if="addToCart">
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
                                                <th>Subtotal</th>
                                                <th>action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="product-thumbnail">
                                                    <a href="#"><img src="assets/images/cart/cart-1.jpg" alt=""></a>
                                                </td>
                                                <td class="product-name"><a href="#">Simple Black T-Shirt</a></td>
                                                <td class="product-price-cart"><span class="amount">$260.00</span></td>
                                                <td class="product-quantity pro-details-quality">
                                                    <div class="cart-plus-minus">
                                                        <input class="cart-plus-minus-box" type="text" name="qtybutton" value="1">
                                                    </div>
                                                </td>
                                                <td class="product-subtotal">$110.00</td>
                                                <td class="product-remove">
                                                    <a href="#"><i class="icon_close"></i></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="cart-shiping-update-wrapper">
                                            <div class="cart-shiping-update">
                                                <a href="#">Continue Shopping</a>
                                            </div>
                                            <div class="cart-clear">
                                                <button>Update Cart</button>
                                                <a href="#">Clear Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="row">
                                <div class="col-7"></div>
                                <div class="col-lg-5 col-md-12">
                                    <div class="grand-totall">
                                        <div class="title-wrap">
                                            <h4 class="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
                                        </div>
                                        <h5>Total products <span>$260.00</span></h5>
                                        <div class="total-shipping">
                                            <h5>Total shipping</h5>
                                            <ul>
                                                <li><input type="checkbox"> Standard <span>$20.00</span></li>
                                                <li><input type="checkbox"> Express <span>$30.00</span></li>
                                            </ul>
                                        </div>
                                        <h4 class="grand-totall-title">Grand Total <span>$260.00</span></h4>
                                        <a href="#">Proceed to Checkout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Cart Empty -->
                <EmptyAddTOCart/>
            </div>
        </div>
   </div>
</template>

<script>
import EmptyAddTOCart from "./empty_add_to_cart/EmptyAddToCart.vue";
// import { mapState, mapActions, mapGetters } from "vuex";
export default {
    name: 'AddToCart',
    components: {
        EmptyAddTOCart
    },
    data() {
        return {
            addToCart: '',
            title: 'Checkout',
        }
    }
}
</script>