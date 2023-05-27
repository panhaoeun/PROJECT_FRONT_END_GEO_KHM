<template>
  <div>
    <!-- Start Header Area -->
    <header class="header-section d-none d-xl-block">
      <div class="header-wrapper">
        <div
          id="header"
          class="
            header-bottom
            header-bottom-color--golden
            section-fluid
            sticky-header
            sticky-color--golden"
        >
          <div class="container">
            <div class="row">
              <div
                class="col-12 d-flex align-items-center justify-content-between"
              >
                <!-- Start Header Logo -->
                <div class="header-logo">
                  <div class="logo">
                    <router-link to="/"
                      ><img :src="require('@/assets/company_logo/ecommerce_logo.png')" alt="logo"
                    /></router-link>
                  </div>
                </div>
                <!-- End Header Logo -->

                <!-- Start Header Main Menu -->
                <div
                  class="main-menu menu-color--black menu-hover-color--golde font-bold text-lg"
                >
                  <nav>
                    <ul>
                      <li class="has-dropdown">
                        <a href="#">Home <i class="fa fa-angle-down"></i></a>
                        <!-- Sub Menu -->
                        <ul class="sub-menu">
                          <li><router-link to="/">Fashion</router-link></li>
                          <li>
                            <router-link to="/furniture">Furniture</router-link>
                          </li>
                          <li>
                            <router-link to="/electronics">Electronics</router-link>
                          </li>
                          <li>
                            <router-link to="/grocery">Grocery</router-link>
                          </li>
                          <li>
                            <router-link to="/pharmacy">Pharmacy</router-link>
                          </li>
                        </ul>
                      </li>

                      <li class="has-dropdown has-megaitem">
                        <a href="#">Shop <i class="fa fa-angle-down"></i></a>
                        <!-- Mega Menu -->
                        <div class="mega-menu">
                          <ul class="mega-menu-inner">
                            <!-- Mega Menu Sub Link -->
                            <li class="mega-menu-item">
                              <a href="#" class="mega-menu-item-title"
                                >Shop Layouts</a
                              >
                              <ul class="mega-menu-sub">
                                <li>
                                  <router-link to="/shop"
                                    >Shop Four Grid</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/shop/shop-2"
                                    >Shop Three Grid</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/shop/shop-3"
                                    >Shop List View</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/shop/shop-4"
                                    >Shop Left Sidebar</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/shop/shop-5"
                                    >Shop Right Sidebar</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/product/1"
                                    >Product Single</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/product/product-single-2"
                                    >Product Single Two</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/product/product-single-3"
                                    >Product Single Three</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/lookbook">Lookbook</router-link>
                                </li>
                              </ul>
                            </li>
                            <!-- Mega Menu Sub Link -->
                            <li class="mega-menu-item">
                              <a href="#" class="mega-menu-item-title"
                                >Other Pages</a
                              >
                              <ul class="mega-menu-sub">
                                <li>
                                  <router-link to="/cart/"
                                    >Cart View One</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/cart/cart-2"
                                    >Cart View Two
                                  </router-link>
                                </li>
                                <li>
                                  <router-link to="/cart/cart-3"
                                    >Cart View Three
                                  </router-link>
                                </li>
                                <li>
                                  <router-link to="/cart/cart-4"
                                    >Cart View Four
                                  </router-link>
                                </li>
                                <li>
                                  <router-link to="/cart/empty-cart"
                                    >Empty Cart</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/my-account/checkout-1"
                                    >Checkout View One</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/my-account/checkout-2"
                                    >Checkout View Two</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/my-account/wishlist"
                                    >Wishlist</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/my-account/compare"
                                    >Compare</router-link
                                  >
                                </li>
                                <li>
                                  <router-link to="/my-account/order-tracking"
                                    >Order Tracking</router-link
                                  >
                                </li>
                              </ul>
                            </li>

                            <!-- Mega Menu Sub Link -->
                            <li class="mega-menu-item">
                              <div class="menu-banner">
                                <router-link to="/shop" class="menu-banner-link">
                                  <img
                                    class="menu-banner-img"
                                    :src="
                                      require('@/assets/img/common/nav_banner.png')
                                    "
                                    alt="img"
                                  />
                                </router-link>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                   
                    </ul>
                  </nav>
                </div>
                <!-- End Header Main Menu Start -->

                <!-- Start Header Action Link -->
                <ul
                  class="
                    header-action-link
                    action-color--black
                    action-hover-color--golden
                  "
                >
                  <li>
                    <a v-b-toggle.offcanvas-wishlish class="offcanvas-toggle"   @click="drawerOffWishListMenu=true">
                      <i class="far fa-heart"></i>
                      <span class="item-count">{{ wishlist.length }}</span>
                    </a>
                  </li>
                  <li>
                    <a v-b-toggle.offcanvas-add-cart class="offcanvas-toggle" @click="drawerOffAddToCartMenu=true">
                      <i class="fas fa-shopping-bag"></i>
                      <span class="item-count">{{ cart.length }}</span>
                    </a>
                  </li>
                  <!-- User Drop Down -->
                  <li>
                    <!-- Check Authentications/UnAuthorization -->
                    <el-dropdown
                          v-b-toggle.search_sidebar
                          class="search_width offcanvas-toggle"
                    >
                        <span class="el-dropdown-link">
                            <icon-component type="outlined" icon-name="user" size="30"></icon-component>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu class="px-2 py-2">
                                <!-- My Profile -->
                                <el-dropdown-item v-if="isUserLoggedIn">
                                    <div class="d-flex align-items-center gap-3 py-2">
                                        <span>{{ getUserName.name_eng }}</span>
                                    </div>
                                 </el-dropdown-item>
                                <el-dropdown-item v-if="!isUserLoggedIn">
                                    <div class="d-flex align-items-center gap-3 py-2">
                                        <router-link to="/auth/register" class="text-center btn btn-primary d-flex gap-2 bg-color-standard-red-gradient border-none font-bold">
                                            Register
                                        </router-link>
                                        <router-link to="/auth/login" class="text-center btn btn-primary d-flex gap-2 bg-red-transparent text-danger border-none font-bold">
                                            Sign In
                                        </router-link>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    My Order
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    Wish List
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    My Favorite Store
                                </el-dropdown-item>
                                <!-- AutLogout -->
                                <el-dropdown-item v-if="isUserLoggedIn">
                                    <button @click="authCustomerAdLogout" class="text-center btn btn-primary d-flex gap-2 bg-color-standard-red-gradient border-none font-bold">
                                        Logout
                                    </button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                  </li>
                <li>
                    <a
                        v-b-toggle.search_sidebar
                        class="search_width offcanvas-toggle"
                    >
                        <img src="@/assets/img/svg/search.svg" alt="img" />
                    </a>
                </li>
                <li>
                    <a
                      @click="drawerOffCanMobileMenu=true"
                      v-b-toggle.offcanvas-about
                      class="offacnvas offside-about offcanvas-toggle"
                      ><i class="fas fa-bars"></i
                    ></a>
                  </li>
                </ul>
                <!-- End Header Action Link -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Start Header Area -->

    <!-- Start Mobile Header -->
    <div
      id="mobile_header"
      class="
        mobile-header
        sticky-header
        sticky-color--golden
        mobile-header-bg-color--golden
        section-fluid
        d-lg-block d-xl-none
      "
    >
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex align-items-center justify-content-between">
            <!-- Start Mobile Left Side -->
            <div class="mobile-header-left">
              <ul class="mobile-menu-logo">
                <li>
                  <router-link to="/">
                    <div class="logo">
                      <img :src="require('@/assets/company_logo/ecommerce_logo.png')" alt="logo"  class="w-3"/>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- End Mobile Left Side -->
            <!-- Start Mobile Right Side -->
            <div class="mobile-right-side">
              <ul
                class="
                  header-action-link
                  action-color--black
                  action-hover-color--golden
                "
              >
                <li>
                  <a
                    v-b-toggle.search_sidebar
                    class="search_width offcanvas-toggle"
                  >
                    <img src="@/assets/img/svg/search.svg" alt="img" />
                  </a>
                </li>
                <li>
                  <a v-b-toggle.offcanvas-wishlish class="offcanvas-toggle">
                    <i class="far fa-heart"></i>
                    <span class="item-count">{{ wishlist.length }}</span>
                  </a>
                </li>
                <li>
                  <a v-b-toggle.offcanvas-add-cart class="offcanvas-toggle">
                    <i class="fas fa-shopping-bag"></i>
                    <span class="item-count">{{ cart.length }}</span>
                  </a>
                </li>
                <li>
                  <a
                   @click="drawerOffCanMobileMenu=true"
                    v-b-toggle.offcanvas-about
                    class="offacnvas offside-about offcanvas-toggle"
                    ><i class="fas fa-bars"></i
                  ></a>
                </li>
              </ul>
            </div>
            <!-- End Mobile Right Side -->
          </div>
        </div>
      </div>
    </div>
    <!-- End Mobile Header -->
    <!-- ...:::: Start Offcanvas Mobile Menu Section:::... -->
    <el-drawer
            v-model="drawerOffCanMobileMenu"  
            id="offcanvas-about"
            class="offcanvas-mobile-about-"
        >
            <!-- Start Mobile Menu Navbar Wrap -->
            <div class="mobile-menu-navbar-wrap">
                <!-- Start Mobile Menu Nav -->
                <div class="offcanvas-menu">
                    <VueSidebarMenu :menu="menu" />
                    {{ menu }}
                </div>
                <!-- End Mobile Menu Nav -->
                <!-- Start Mobile contact Info -->
                <div class="mobile-contact-info">
                    <address class="address">
                    <img :src="require('@/assets/img/logo-white.png')" alt="logo" />
                    <span>Address: Your address goes here.</span>
                    <span>Call Us: 0123456789, 0123456789</span>
                    <span>Email: demo@example.com</span>
                    </address>

                    <ul class="social-link">
                    <li>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                    </li>
                    </ul>

                    <ul class="user-link">
                        <li><router-link to="/my-account/wishlist">Wishlist</router-link></li>
                        <li><router-link to="/cart/">Cart</router-link></li>
                        <li><router-link to="/my-account/checkout-1">Checkout</router-link></li>
                    </ul>
                </div>
                <!-- End Mobile contact Info -->
            </div>
        <!-- End Mobile Menu Navbar Wrap -->
    </el-drawer>
    <!-- ...:::: End Offcanvas Mobile Menu Section:::... -->
    <!-- Start Offcanvas Wishlist Sidebar Section -->
    <el-drawer
        id="offcanvas-wishlish"
        class="offcanvas-add-cart-section"
        v-model="drawerOffWishListMenu"
    >
        <div class="offcanvas-wishlist-wrapper font-bold">
            <h4 class="offcanvas-title pb-4 pl-3 font-bold">Wishlist</h4>
            <div v-if="wishlist.length">
            <ul class="offcanvas-wishlist" style="padding: 1rem;">
                <li
                class="offcanvas-wishlist-item-single"
                v-for="(item, index) in wishlist"
                :key="index"
                >
                <div class="offcanvas-wishlist-item-block">
                    <router-link
                    :to="{ path: '/product/' + item.id }"
                    class="offcanvas-wishlist-item-image-link"
                    >
                        <img
                            :src="getImageUrl(item.images[0].src)"
                            alt="img"
                            class="offcanvas-wishlist-image"
                        />
                    </router-link>
                    <div class="offcanvas-wishlist-item-content">
                        <router-link
                            :to="{ path: '/product/' + item.id }"
                            class="offcanvas-wishlist-item-link font-bold text-lg text-black" 
                            >{{ item.title }}</router-link
                        >
                        <div class="offcanvas-wishlist-item-details">
                            <span class="offcanvas-wishlist-item-details-quantity"
                            >{{ item.quantity }} x</span
                            >
                            <span
                            v-if="item.discount"
                            class="offcanvas-wishlist-item-details-price"
                            >${{ discountedPrice(item) }}</span
                            >
                            <span v-else class="offcanvas-wishlist-item-details-price"
                            >${{ item.price }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="offcanvas-wishlist-item-delete text-right">
                    <button
                    @click="removeWishlistItem(item)"
                    class="
                        offcanvas-wishlist-item-delete
                        bg-transparent
                        remove-btn
                    "
                    >
                    <i class="far fa-trash-alt"></i>
                    </button>
                </div>
                </li>
            </ul>
            <ul class="offcanvas-wishlist-action-button" style="padding: 1rem;">
                <li>
                <router-link
                    to="/my-account/wishlist"
                    class="theme-btn-one btn-black-overlay btn_md"
                    >View wishlist</router-link
                >
                </li>
            </ul>
            </div>
            <ul v-else class="offcanvas-wishlist text-lg font-bold">
                 <li>No Item in your wishlist!</li>
            </ul>
        </div>
    </el-drawer>
    <!-- End Offcanvas Wishlist Sidebar Section -->
    <!-- Start Offcanvas Addcart Section -->
    <el-drawer 
      v-model="drawerOffAddToCartMenu"
      id="offcanvas-add-cart"
      class="offcanvas-add-cart-section
      b-sidebar b-sidebar-right bg-light text-dark"
    >
      <div class="offcanvas-add-cart-wrapper">
        <h4 class="offcanvas-title pb-4 font-bold">Shopping Cart</h4>
        <div v-if="cart.length">
          <ul class="offcanvas-cart" style="margin-left: 0rem;">
            <li
              class="offcanvas-cart-item-single"
              v-for="(item, index) in cart"
              :key="index"
            >
              <div class="offcanvas-cart-item-block">
                <router-link
                  :to="{ path: '/product/' + item.id }"
                  class="offcanvas-cart-item-image-link"
                >
                  <img
                    :src="getImageUrl(item.images[0].src)"
                    alt="img"
                    class="offcanvas-cart-image"
                  />
                </router-link>
                <div class="offcanvas-cart-item-content text-black text-lg">
                  <router-link
                    :to="{ path: '/product/' + item.id }"
                    class="offcanvas-cart-item-link font-bold text-black"
                    >{{ item.title }}</router-link
                  >
                  <div class="offcanvas-cart-item-details">
                    <span class="offcanvas-cart-item-details-quantity text-lg"
                      >{{ item.quantity }} x</span
                    >
                    <span
                      v-if="item.discount"
                      class="offcanvas-cart-item-details-price text-lg"
                      >${{ discountedPrice(item) }}</span
                    >
                    <span v-else class="offcanvas-cart-item-details-price"
                      >${{ item.price }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="offcanvas-cart-item-delete text-right">
                <button
                  @click="removeCartItem(item)"
                  class="offcanvas-cart-item-delete bg-transparent remove-btn"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </li>
          </ul>

          <div class="offcanvas-cart-total-price">
            <span class="offcanvas-cart-total-price-text font-bold">Subtotal:</span>
            <span class="offcanvas-cart-total-price-value"
              >${{ cartTotal }}</span
            >
          </div>

          <ul class="offcanvas-cart-action-button font-bold" style="padding-left: 0rem;">
            <li>
              <router-link
                to="/customer/shopping-cart/product-list/cart-items"
                class="theme-btn-one btn-black-overlay btn_md"
                >View Cart</router-link
              >
            </li>
            <li>
              <router-link
                to="/my-account/checkout-1"
                class="theme-btn-one btn-black-overlay btn_md"
                >Checkout</router-link
              >
            </li>
          </ul>
        </div>

        <ul v-else class="offcanvas-cart">
          <li>Your cart is empty!</li>
        </ul>
      </div>
    </el-drawer>
    <!-- End  Offcanvas Addcart Section -->

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      // Mobile Menu Item Data
      menu: [
        {
          title: "Home",
          child: [
            {
              href: "/",
              title: "Fashion",
            },
            {
              href: "/furniture",
              title: "Furniture",
            },
            {
              href: "/electronics",
              title: "Electronics",
            },
          ],
        }
      ],
      products: [],
      category: [],
      cartproduct: {},
      searchString: "",
      drawerOffCanMobileMenu: false,
      drawerOffWishListMenu: false,
      drawerOffAddToCartMenu: false
    };
  },

  mounted: function () {
    // Menu Js
    this.$nextTick(function () {
      window.onscroll = function () {
        myFunction();
      };
      var header = document.getElementById("header");
      var mobile_header = document.getElementById("mobile_header");
      var sticky = header.offsetTop;

      function myFunction() {
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
          mobile_header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
          mobile_header.classList.remove("sticky");
        }
      }
    });
    // Menu End
    // this.productsArray()
  },

  computed: {
    ...mapState({
      productsList: (state) => state.products.productsList,
      searchItems: (state) => state.products.searchProduct,
    }),
    ...mapGetters({
      cart: "cart/cartItems",
      cartTotal: "cart/cartTotalAmount",
      wishlist: "products/wishlistItems",
    }),
    
  },
  methods: {
    // Image Url
    getImageUrl(path) {
      return require("@/assets/img/product-image/" + path);
    },

    // Discount Price
    discountedPrice(product) {
      const price = product.price - (product.price * product.discount) / 100;
      return price;
    },

    // For Delete/Remove Product Item
    removeCartItem: function (product) {
      this.$store.dispatch("cart/removeCartItem", product);
    },
    // For Delete/Remove wishlist Item
    removeWishlistItem: function (product) {
      this.$store.dispatch("products/removeWishlistItem", product);
    },
    searchProduct() {
      this.$store.dispatch("products/searchProduct", this.searchString);
    },
  },
};
</script>
<!-- Script SetUp -->
<script setup>
    import { computed } from "vue";
    import { storeToRefs } from "pinia";
    import { useAuthStoreToken } from "../../utils/auth/AuthStoreTokenJWT";
    import AuthenticationsDataService from '../../services/authencationDataService';
    const { tokenAuth, user } = storeToRefs(useAuthStoreToken());
    const { setAuthUser } = useAuthStoreToken();
    const router = useRouter();
    const isUserLoggedIn = computed(() => {
        return tokenAuth;
    });
    const getUserName = computed(() => {
        if (user === '') {
             return 'user';
        } else {
            return user.value[0];
        }
    });
    function authCustomerAdLogout() {
    try {
        /*
            Auto Return To Login
        */
        AuthenticationsDataService.authLogout().then((response) => {
            ElMessage.success(response.data.message);
            localStorage.clear('token');
            localStorage.clear('tokenExpiry');
            localStorage.clear('expiresIn')
            localStorage.clear('user');
            localStorage.clear('userId');
            setAuthUser(null);
            router.push("/auth/login");
            /**
             * Delete Cookies
             * */
            deleteAllCookies();
        }).catch((error) => {
            console.log(error)
            ElMessage.error(error);
        });
    } catch (error) {
        ElMessage.error(error);
    }
}
function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + `=;expires=${new Date(
            0
        ).toUTCString()}`;
    }
}
</script>
<style>
/* Mobile Menu Multi Dropdown Items Start */
.v-sidebar-menu .vsm--toggle-btn {
  display: none;
}
.v-sidebar-menu {
  position: relative;
  background-color: transparent;
}
.v-sidebar-menu.vsm_expanded .vsm--item_open .vsm--link_level-1 {
  background-color: var(--main-theme-color);
}
.v-sidebar-menu .vsm--link_level-1.vsm--link_exact-active,
.v-sidebar-menu .vsm--link_level-1.vsm--link_active {
  -webkit-box-shadow: 3px 0px 0px 0px var(--main-theme-color) inset;
  box-shadow: 3px 0px 0px 0px var(--main-theme-color) inset;
}
/* Mobile Menu Multi Dropdown Items End */
</style>