<template>
  <header
    :class="{'no-banner': (topBannerLoaded && isTopBannerClosed) || !isPublic}"
    class="bg-purple-50"
  >
    <!-- Banner -->
    <banner
        v-if="!isTopBannerClosed"
        class="top-banner"
        :banner="topBanner"
        @close="topBannerClosed"
    />

    <!-- Top Email -->
    <div class="top-wrapper bg-gray-100">
      <div class="container-fluid ">
        <div class="wrap flex sided">
          <div class="left wrap flex gap-1">
            <!-- <dropdown
              v-if="Object.keys(languages).length > 1"
              :selected-key="currentLanguage.code"
              :options="languages"
              key-name="name"
              class="lang-dropdown"
              @clicked="selectedLanguage"
            /> -->

            <a
              :href="`mailto:${email}`"
              class="flex gap-1"
              style="color: #222222;"
            >
              <i
                class="icon-ms email-icon"
              />
                <span>
                    Mail:
                </span>
                <span>
                    e-24market@gmail.com
                </span>
            </a>
            <template class="font-bold">
              <span>|</span>
              <a
                :href="`tel:${phone}`"
                class="flex gap-5"
              >
                <i
                  class="icon-ms phone-icon"
                />
                <span><span>Helpline:</span> 016387467</span>
              </a>
            </template>

          </div>

          <div class="flex right text-upper">
            <!-- Login -->
            <div
              class="flex gap-2 font-bold text-black"
              v-if="!isLoggedIn"
            >
              <router-link
                to="/auth/login"
                class="flex gap-2 font-bold text-black"
              >
                <i
                  class="icon-ms login-icon"
                />
                Login
              </router-link>
              <span>|</span>
              <router-link
                to="/auth/register"
                class="flex gap-2 font-bold text-black"
              >
                <i
                  class="icon-ms register-icon"
                />
                {{ $t('header.register') }}
              </router-link>
            </div>
            <!-- User Profile -->
            <!-- Vendor Or Admin -->
            <template v-if="customerRole !== 'Customer' && customerRole === 'Admin' || customerRole === 'Vendor'">
                    <router-link
                        to="/vendor-dashboard/default-layouts"
                        class="flex gap-2 font-bold text-black"
                    >
                    <i
                        class="icon-ms user-icon"
                    />
                        <template v-if="customerRole === 'Admin'">
                            <label>Web Page</label>
                        </template>
                        <template v-if="customerRole === 'Vendor'">
                            <label>My Shop</label>
                        </template>
                    </router-link>
            </template>
            <!-- Customer -->
            <template v-if="customerRole === 'Customer' && customerRole !== 'Admin' && customerRole !== 'Vendor'">
                    <router-link
                        to="/vendor-dashboard/default-layouts"
                        class="flex gap-2 fold-bold text-black"
                    >
                    <i
                        class="icon-ms user-icon"
                    />
                        {{ $t('header.profile') }}
                    </router-link>
            </template>
           
          </div>
        </div>
      </div>
    </div>
    <!-- Search and Filter Product by Categories -->
    <div class="container-fluid flex align-items-center justify-content-center pos-rel">
      <div class="left-area">
        <router-link
          to="/"
          class="logo"
        >
          <img
            src="../../../../assets/company_logo/ecommerce_logo.png"
            alt="E-24market"
            height="100"
            width="109"
          >
        </router-link>
      </div>
      <!-- Form Search -->
      <form
        class="search-input-customer grow"
        @submit.prevent="searchCatProName"
      >
        <input
          @focus="openSearchPopup"
          @blur="blurSearchInput"
          type="text"
          class="border-1 "
          :placeholder="$t('header.searchHere')"
          v-model="searchedText"
        >
        <button
          aria-label="submit"
          type="submit"
          class="flex align-items-center justify-content-center"
        >
          <i
            class="icon-ms search-icon"
          />
        </button>   
        <!-- Search Popup -->
        <search-popup
          v-if="searchPopup"
          :searched-text="searchedText"
          @close="closeSearchPopup"
        />
      </form>
      <!-- My Accounts -->
      <div class="right-area flex gap-15 right">
        <div
          class="pos-rel font-bold text-black"
          v-outside-click="closeDropdown"
        >
          <button
            aria-label="submit"
            class="flex gap-10"
            @click="dropdown = !dropdown"
          >
            {{ $t('header.account') }}
            <i
              class="icon-ms arrow-down black"
            />
          </button>
          <div
            v-if="isLoggedIn"
            class="dropdown"
            :class="{active: dropdown}"
          >
            <router-link
              class="font-bold text-black gap-2 white-space-nowrap"
              to="/user/addresses"
            >
                My Shipping Address
            </router-link>
            <router-link
              class="font-bold text-black white-space-nowrap"
              to="/user/orders"
            >
                Orders
            </router-link>
            <button
              aria-label="Logout"
              v-show="isLoggedIn"
              class="clear-btn font-bold text-black white-space-nowrap"
              @click.prevent="loggingOut"
            >
                Logout
            </button>
          </div>
        </div>
        <!-- Carts -->
        <router-link
          to="/customer/shopping-cart/new-custom-cart-item-order"
          class="cart-btn flex pos-rel h-40x gap-1 flex justify-content-center"
        >
          <span
            v-if="isLoggedIn && getCartAuthItem.length >=1"
            class="cart-badge">
              {{ getCartAuthItem.length ? getCartAuthItem.length : 0  }}
          </span>
          <i
            class="flex align-items-center icon-ms cart-icon black"
          />
          <span class="title pl-2">Cart</span>
        </router-link>
      </div>
    </div>
    <!-- Bottom Header -->
    <div class="bottom-area text-nowrap gap-10">
      <div class="container-fluid">
        <div class="sided justify-content-between">
            <!--Section Categories and Sub Categories-->
            <!-- <home-categories-section/> -->
          <!-- <div>

            <router-link
              v-for="(item, index) in headerLeft"
              :key="index"
              :to="getUrl(item)"
            >
              <span>
                {{ getTitle(item) }}
              </span>
            </router-link>
          </div> -->

          <!-- <div>

            <router-link
              v-for="(item, index) in headerRight"
              :key="index"
              :to="getUrl(item)"
            >
              <span>
                {{ getTitle(item) }}
              </span>
            </router-link>

          </div> -->
        </div>
      </div>
    </div>
  </header>
</template>
<script>
//   import HomeCategoriesSection from "@/components/ui_component_new_frontend/home_categories_filter/HomeCategoriesSection.vue";
  import outsideClick from '@/directive/outside-click';
  import { isLoggedIn } from "@/utils/auth/auth";
  import util from '@/mixin/util'
  import { mapGetters, mapActions} from 'vuex'
  import SearchPopup from "@/components/ui_component_new_frontend/SearchPopup";
  import Banner from "@/components/ui_component_new_frontend/Banner";
  import AuthenticationsDataService from '@/services/authencationDataService';
  import axios from 'axios'
//   import Dropdown from "@/components/ui_component_new_frontend/Dropdown";

  export default {
    data() {
      return {
        topBannerLoaded: false,
        isTopBannerClosed: true,
        dropdown: false,
        searchPopup: false,
        searchFocused: false,
        searchedText: '',
        customerRole: null
      }
    },
    computed: {
      headerLeft() {
        return this.headerLinks?.left || []
      },
      headerRight() {
        return this.headerLinks?.right || []
      },
      isPublic(){
        return parseInt(this.topBanner?.status) === this.status.PUBLIC
      },
      isLoggedIn(){
        return isLoggedIn() || false
      },
      cartCountCom(){
        return this.$auth?.user?.cart_count
      },
      username(){
        return this.$auth?.user?.name?.split(' ')[0]
      },
      email(){
        return this.setting?.email
      },
      phone(){
        return this.setting?.phone
      },
    //   ...mapGetters('language', ['languages', 'currentLanguage']),
      ...mapGetters('common', ['site_setting', 'setting', 'topBanner', 'headerLinks']),
      ...mapGetters('listing', ['searched']),
      ...mapGetters('cart', ['getCartAuthItem'])
    },
    watch: {
      cartCountCom(value){
        this.setCartCount(value)
      },
      '$route'() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        this.setQFromRoute()
        this.closeDropdown()
      },
      searchedText(){
        if(!this.searchPopup && this.searchFocused){
          this.emptySearchedSuggestion()
          this.openSearchPopup()
        }
      }
    },
    directives: {outsideClick},
    components: {Banner, SearchPopup},
    mixins: [util],
    created(){
         // Login
        if(isLoggedIn()){
            this.initiateApp();
        }else{
            this.$store.commit('shippingStore/resetAddresses');
            this.$store.commit('cart/resetOrders');
        }
    },
    methods: {
        // Current Customer Cart
        async initiateApp(){
            try{
               if(isLoggedIn()){
                 await this.$store.dispatch('cart/getCartByCurrentCustomer');
               }
            }catch(error){
                return Promise.reject(error);
            }
        },
        // Logout
        currentCustomerLogout(){
            AuthenticationsDataService.authLogout().then((response) => {
                this.$toast.add({ severity: 'Logout Successfully', summary: 'Info', detail: response.data.message, life: 3000 });
                localStorage.clear('token');
                localStorage.clear('tokenExpiry');
                localStorage.clear('expiresIn')
                localStorage.clear('user');
                localStorage.clear('userId');
                this.$router.push("/auth/login");
                window.location.reload();
                /**
                 * Delete Cookies
                 * */
                this.deleteAllCookies();
                // Remove token
                axios.defaults.headers.common['Authorization'] = ''
                const token = localStorage.getItem('token');
                localStorage.removeItem(token);
            }).catch((error) => {
                Promise.reject(error);
            });
        },
        deleteAllCookies() {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + `=;expires=${new Date(
                    0
                ).toUTCString()}`;
            }
        },
        // User Type
        customerRoleType(){
            if(isLoggedIn()){
                const userRoleAuth = localStorage.getItem('userRole');
                if (JSON.parse(userRoleAuth) !== 'Vendor' && JSON.parse(userRoleAuth) !== 'Admin' && JSON.parse(userRoleAuth) === "Customer"){
                    this.customerRole = JSON.parse(userRoleAuth) ? JSON.parse(userRoleAuth) : '';
                }else{
                    this.customerRole = JSON.parse(userRoleAuth) ? JSON.parse(userRoleAuth) : '';
                }
            }
        },
      async selectedLanguage(data){
        document.cookie = 'currentLanguage=' + data.key + '; path=/; expires=' + 365 * 60 * 60 * 24
        location.reload()
      },
      topBannerClosed(){
        localStorage.setItem('topBannerClosed', true)
        this.isTopBannerClosed = true
      },
      openSearchPopup(){
        if(this.searchedText.length > 0){
          this.searchPopup = true
        }
        this.searchFocused = true
      },
      blurSearchInput(){
        this.searchFocused = false
        this.closeSearchPopup()
      },
      closeSearchPopup(){
        setTimeout(() => {
          this.searchPopup = false
        }, 100)
      },
      setQFromRoute(){
        this.searchedText = this.$route?.query?.q || ''
      },
      searchCatProName(){
        if(this.searchedText && (this.searchedText !== this.searched || this.$route.name !== 'search')){
            this.$router.push({ path: '/customer/filter-search/product-categories-name', query: {
                q: this.searchedText
            }});
            this.updateSearch(this.searchedText)
        }
      },
      async loggingOut(){
        try {
          this.closeDropdown();
          this.currentCustomerLogout();
          //this.emptyCartProduct()
        } catch (e) {
          return Promise.reject(e);
        }
      },
      closeDropdown() {
        this.dropdown = false
      },
      ...mapActions('language', ['setDefaultLanguage', 'getLangData']),
      ...mapActions('cart', ['emptyCartProduct', 'setCartCount']),
      ...mapActions('listing', ['updateSearch', 'emptySearchedSuggestion']),
    },
    deactivated() {
    },
    activated() {

    },
    mounted() {
        // Role
        this.customerRoleType();
        this.setQFromRoute()
        this.updateSearch(this.searchedText)
        if(this.cartCountCom){
            this.setCartCount(this.cartCountCom)
        }

      const self = this
      this.$nextTick(() => {
        if(localStorage.getItem('topBannerClosed') !== null){
          self.isTopBannerClosed = localStorage.getItem('topBannerClosed')
          self.topBannerLoaded = true
        } else {
          self.isTopBannerClosed = false
          self.topBannerLoaded = true
        }
      })
    },
  }
</script>