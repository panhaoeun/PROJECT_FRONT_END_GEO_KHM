<template>
  <header
    :class="{'no-banner': (topBannerLoaded && isTopBannerClosed) || !isPublic}"
  >
      <banner
        v-if="!isTopBannerClosed"
        class="top-banner"
        :banner="topBanner"
        @close="topBannerClosed"
      />

    <div class="top-wrapper">
      <div class="container-fluid">

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
                class="icon email-icon"
              />
                <span>
                    Mail:
                </span>
                <span>
                    e-24market@gmail.com
                </span>
            </a>

            <template>
              <span>|</span>
              <a
                :href="`tel:${phone}`"
                class="flex gap-5"
              >
                <i
                  class="icon phone-icon"
                />
                <span><span>Helpline:</span> 016387467</span>
              </a>
            </template>

          </div>

          <div class="flex right text-upper">

            <div
              class="flex gap-2"
              v-if="!isLoggedIn"
            >
              <router-link
                to="/auth/login"
                class="flex gap-2"
              >
                <i
                  class="icon login-icon"
                />
                Login
              </router-link>
              <span>|</span>
              <router-link
                to="/auth/register"
                class="flex gap-2"
              >
                <i
                  class="icon register-icon"
                />
                {{ $t('header.register') }}
              </router-link>
            </div>

            <router-link
              v-else
              to="/user/profile"
              class="flex gap-2"
            >
              <i
                class="icon user-icon"
              />
              {{ $t('header.profile') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid flex pos-rel">
      <div class="left-area">
        <router-link
          to="/"
          class="logo"
        >
          <img
            src="../../../../assets/company_logo/ecommerce_logo.png"
            alt="E-24market"
            height="60"
            width="139"
          >
        </router-link>
      </div>

      <form
        class="search-input grow"
        @submit.prevent="search"
      >
        <input
          @focus="openSearchPopup"
          @blur="blurSearchInput"
          type="text"
          :placeholder="$t('header.searchHere')"
          v-model="searchedText"
        >
        <button
          aria-label="submit"
          type="submit"
          class="flex"
        >
          <i
            class="icon search-icon"
          />
        </button>

        <search-popup
          v-if="searchPopup"
          :searched-text="searchedText"
          @close="closeSearchPopup"
        />
      </form>

      <div class="right-area flex gap-15 right">
        <div
          class="pos-rel"
          v-outside-click="closeDropdown"
        >
          <button
            aria-label="submit"
            class="flex gap-10"
            @click="dropdown = !dropdown"
          >
            {{ $t('header.account') }}
            <i
              class="icon arrow-down black"
            />
          </button>
          <div
            class="dropdown"
            :class="{active: dropdown}"
          >
            <router-link
              to="/user/orders"
            >
              {{ $t('header.orders') }}
            </router-link>
            <router-link
              to="/user/wishlists"
            >
              {{ $t('header.wishList') }}
            </router-link>
            <router-link
              to="/user/compared"
            >
              {{ $t('header.comparedList') }}
            </router-link>
            <router-link
              to="/user/vouchers"
            >
              {{ $t('header.vouchers') }}
            </router-link>
            <button
              aria-label="Logout"
              v-show="isLoggedIn"
              class="clear-btn"
              @click.prevent="loggingOut"
            >
              {{ $t('header.logout') }}
            </button>
          </div>
        </div>
        <router-link
          to="/cart"
          class="cart-btn flex pos-rel h-40x gap-1"
        >
          <span
            v-if="cartCount"
            class="cart-badge">
            {{ cartCount }}
          </span>
          <i
            class="icon cart-icon black"
          />
          <span class="title">Cart</span>
        </router-link>
      </div>
    </div>
    <div class="bottom-area text-nowrap">
      <div class="container-fluid">
        <div class="flex sided">
          <div>

            <router-link
              v-for="(item, index) in headerLeft"
              :key="index"
              :to="getUrl(item)"
            >
              <span>
                {{ getTitle(item) }}
              </span>
            </router-link>
          </div>

          <div>

            <router-link
              v-for="(item, index) in headerRight"
              :key="index"
              :to="getUrl(item)"
            >
              <span>
                {{ getTitle(item) }}
              </span>
            </router-link>

          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import outsideClick from '@/directive/outside-click'
  import util from '@/mixin/util'
  import { mapGetters, mapActions} from 'vuex'
  import SearchPopup from "@/components/ui_component_new_frontend/SearchPopup";
  import Banner from "@/components/ui_component_new_frontend/Banner";
//   import Dropdown from "@/components/ui_component_new_frontend/Dropdown";

  export default {
    data() {
      return {
        topBannerLoaded: false,
        isTopBannerClosed: true,
        dropdown: false,
        searchPopup: false,
        searchFocused: false,
        searchedText: ''
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
        return this.$auth?.loggedIn || false
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
      ...mapGetters('cart', ['cartCount'])
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
    methods: {
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
      search(){
        if(this.searchedText && (this.searchedText !== this.searched || this.$route.name !== 'search')){
          this.$router.push({ path: `/search?q=${this.searchedText}`})
          this.updateSearch(this.searchedText)
        }
      },
      async loggingOut(){
        try {
          this.$auth.logout()
          this.closeDropdown()
          //this.emptyCartProduct()
        } catch (e) {
          return this.$nuxt.error(e)
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
    }
  }
</script>