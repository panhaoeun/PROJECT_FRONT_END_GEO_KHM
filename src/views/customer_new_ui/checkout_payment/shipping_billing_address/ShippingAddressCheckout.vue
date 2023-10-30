<template>
  <div class="container-fluid mtb-20 mtb-sm-15">

    <div class="product-detail">

      <div
        class="detail-left p-20 p-sm-15 area mr-20 mr-sm mb-sm-15 flex align-start gap-15"
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <div
            class="spinner-wrapper flex layer-white"
            v-if="loading"
          >
            <spinner
              :radius="100"
            />
          </div>
        </transition>

        <div class="address-wrapper">
          <user-address
            ref="shippingAddress"
            :has-radio="true"
            @editing="editAddress"
            @selected-address="selectedCurrentAddress = $event"
          />
        </div>
        <form
          class="address-form"
          @submit.prevent="savingAddressData"
        >
          <div
            v-if="countryList"
            class="input-wrap"
          >
            <label>
              Country
            </label>
            <dropdown
              :selected-key="addressData.country"
              :options="countryList"
              key-name="name"
              :searching="true"
              @clicked="selectCountry"
            />
          </div>


          <div class="flex">
            <div class="input-wrap" :class="{invalid: !addressData.name && hasAddressErrors}">
              <label>
                    Name
              </label>
              <input
                type="text"
                v-model="addressData.name"
              />
              <span
                class="error"
                v-if="!addressData.name && hasAddressErrors"
              >
                {{ $t('addressPopup.isRequired', {type: $t('addressPopup.name')}) }}
              </span>
            </div>

            <div
              v-if="phoneList"
              class="input-wrap"
              :class="{invalid: !addressData.phone && hasAddressErrors}"
            >
              <label>&nbsp;</label>
              <div class="input-text">
                  <span>
                    {{ phoneList[addressData.country] }}
                  </span>
                <input
                  type="text"
                  v-model="addressData.phone"
                />
              </div>
              <span
                class="error"
                v-if="!addressData.phone && hasAddressErrors"
              >
                  {{ $t('addressPopup.isRequired', {type: $t('addressPopup.phone')}) }}
              </span>
            </div>
          </div>

          <div
            class="input-wrap"
            :class="{invalid: !addressData.address_1 && hasAddressErrors}"
          >
            <label>
                Address
            </label>
            <input
              class="mb-10"
              type="text"
              v-model="addressData.address_1"
              placeholder="Street address or P.O. Box"
            />
            <input
              type="text"
              v-model="addressData.address_2"
              placeholder="Apt, suite, unit, building, floor, etc."
            />
            <span
              class="error"
              v-if="!addressData.address_1 && hasAddressErrors"
            >
              {{ $t('addressPopup.isRequired', {type: $t('addressPopup.address')}) }}
            </span>
          </div>

          <div class="flex block-xxs">
            <div
              class="input-wrap"
              :class="{invalid: !addressData.city && hasAddressErrors}"
            >
              <label>
                    City
              </label>
              <input
                type="text"
                v-model="addressData.city"
              />
              <span
                class="error"
                v-if="!addressData.city && hasAddressErrors"
              >
                 {{ $t('addressPopup.isRequired', {type: $t('addressPopup.city')}) }}
              </span>
            </div>

            <div
              class="input-wrap"
              :class="{invalid: !addressData.zip && hasAddressErrors}"
            >
              <label>
                    Zip Code
              </label>
              <input
                type="text"
                v-model="addressData.zip"
              />
              <span
                class="error"
                v-if="!addressData.zip && hasAddressErrors"
              >
                {{ $t('addressPopup.isRequired', {type: $t('addressPopup.zipCode')}) }}
              </span>
            </div>

            <div
              v-if="Object.keys(states).length"
              class="input-wrap"
            >
              <label>
                {{ $t('addressPopup.state') }}
              </label>
              <dropdown
                :selected-key="addressData.state"
                :options="states"
                key-name="name"
                @clicked="selectState"
              />
            </div>
          </div>

          <div class="input-wrap">
            <label>
                Delivery instruction
            </label>
            <textarea
              v-model="addressData.delivery_instruction"
            />
          </div>

          <div class="flex start mlr-0 gap-10">
            <button
              v-if="editing"
              aria-label="submit"
              class="outline-btn plr-30 plr-sm-15"
              @click.prevent="clearData"
            >
              {{ $t('addressPopup.cancel') }}
            </button>
            <ajax-button
              class="primary-btn plr-30 plr-sm-15"
              :fetching-data="submittingAddressData"
              :loading-text="$t('addressPopup.saving')"
              :text=" $t('addressPopup.thisAddress', {type: editing > 0 ? $t('addressPopup.update') : $t('addressPopup.save')})"
            />
          </div>
        </form>
      </div>


      <checkout-right
        route-link="checkout"
        :checked-product="checkedProduct"
        btn-text="Set Shipping Option"
        :disabled="fetchingAddressData || Object.keys(cartShipping).length === 0 || !selectedCurrentAddress"
        @go-next="goToShipping"
      />
    </div>

    <!-- Process Checkout -->
    <!-- <transition name="fade" mode="out-in">
      <pop-over
        v-if="cartPopOver"
        :title="$t('shipping.ordered')"
        @close="cartPopOver = false"
        elem-id="cart-pop-over"
        :layer="true"
        class="popup-top-auto"
      >
        <template
          v-slot:content
        >
          <cart-list
            :error-from-api="errorFromApi"
            :cart-products="checkedProduct"
            :cart-shipping="cartShipping"
            :checked="checked"
            :is-shipping="true"
            :address="selectedCurrentAddress"
            @shipping-changed="cartShipping = $event"
            @cart-changed="cartChanged"
          />
        </template>
        <template v-slot:pop-footer>
          <div class="flex j-end gap-10">
            <button
              aria-label="submit"
              class="outline-btn plr-30 plr-sm-15"
              @click="cartPopOver = false"
            >
              {{ $t('addressPopup.cancel') }}
            </button>
            <ajax-button
              class="primary-btn  plr-30 plr-sm-15"
              type="button"
              :fetching-data="checkingOut"
              :loading-text="$t('checkoutRight.submitting')"
              :text="$t('checkoutRight.proceedToCheckout')"
              @clicked="goToCheckout"
            />
          </div>
        </template>
      </pop-over>
    </transition> -->

  </div>
</template>
<script>
//   import CartList from '@/components/ui_component_new_frontend/CartList'
  import AjaxButton from '@/components/ui_component_new_frontend/AjaxButton'
  import Dropdown from '@/components/ui_component_new_frontend/Dropdown'
//   import PopOver from '@/components/ui_component_new_frontend/PopOver'
  import CheckoutRight from '@/components/ui_component_new_frontend/CheckoutRight'
  import util from '@/mixin/util'
  import {mapGetters, mapActions} from 'vuex'
  import UserAddress from '@/components/ui_component_new_frontend/UserAddress'
  import addressHelper from '@/mixin/addressHelper'
  import validation from "@/mixin/validation"
  import Spinner from "@/components/ui_component_new_frontend/Spinner"

  export default {
    middleware: ['common-middleware'],
    data() {
      return {
        cartShipping: {},
        checked: [],
        cartPopOver: false,
        editing: 0,
        checkingOut: false,
        states: {},
        loading: false,
        checkedProduct: [],
        hasAddressErrors: false,
        addressData: {
          id: '',
          name: '',
          phone: '',
          city: '',
          country: '',
          state: '',
          zip: '',
          address_1: '',
          address_2: '',
          delivery_instruction: ''
        },
        submittingAddressData: false,
        selectedCurrentAddress: null,
        errorFromApi: null
      }
    },
    watch: {
      /* cartProducts(){
         this.getCheckedProducts()
       },*/

      profile() {
        this.addressData.name = this.profile.name
        this.addressData.email = this.profile.email
      },
      location() {
        this.settingCountry()
      },
    },
    components: {
      Spinner,
      CheckoutRight,
      Dropdown,
      AjaxButton,
    //   CartList,
    //   PopOver,
      UserAddress
    },
    mixins: [
        util, 
        addressHelper, 
        validation
    ],
    computed: {
      invalidEmail() {
        return !this.isValidEmail(this.addressData.email)
      },
      emailValid() {
        return this.addressData.email && !this.invalidEmail
      },
      currentAddresses() {
        return this.allAddress?.data
      },
      ...mapGetters('resource', ['countryList', 'phoneList']),
      ...mapGetters('language', ['langCode']),
      ...mapGetters('shippingStore', ['allAddresses']),
      ...mapGetters('common', ['location']),
      ...mapGetters('cart', ['getCartAuthItem']),
    },
    methods: {
      initAddress() {
        this.addressData = {
          id: '',
          email: '',
          name: '',
          phone: '',
          city: '',
          country: '',
          state: '',
          zip: '',
          address_1: '',
          address_2: '',
          delivery_instruction: ''
        }
      },
      loadData() {
        this.$refs.shippingAddress.loadData()
      },
      cartChanged(evt) {
        if (evt) {
          this.getCheckedProducts()
        }
      },
      getCheckedProducts() {
        this.checked = []
        this.checkedProduct = []

        this.getCartAuthItem.forEach(obj => {
          if (parseInt(obj.selected) === 1) {
            this.checked.push(obj.id)
            this.checkedProduct.push(obj)

            this.cartShipping = {
              ...this.cartShipping, ...{
                [obj.id]: {
                  cart: obj.id,
                  shipping_place: '',
                  shipping_type: obj.shipping_type || 1,
                }
              }
            }
          }
        })
      },
      async goToCheckout() {
        let unableToShip = false

        Object.values(this.cartShipping).forEach((obj) => {
          if (!obj.shipping_place) {
            unableToShip = true
            return
          }
        })
        if (unableToShip) {
          this.setToastError(this.$t('shipping.unableShipped'))
          return
        }
        if (!this.checkedProduct.length) {
          this.cartPopOver = false
          this.setToastError(this.$t('shipping.noProductSelected'))
          this.$router.push({path: 'cart'})
          return
        }
        try {
          this.checkingOut = true
          const data = await this.updateCartShipping({
            cart: this.cartShipping,
            user_token: await this.getUserToken(),
            selected_address: this.selectedCurrentAddress?.id
          })
          this.checkingOut = false
          if (data?.status === 200) {
            this.cartPopOver = false
            this.$router.push({path: 'checkout'})
          } else {
            if (data.data?.form) {
              this.setToastError(data.data?.form[0])
            } else if (data.data?.product) {
              this.errorFromApi = data.data?.product[0]
            }
          }
        } catch (e) {
          return Promise.reject(e);
        }
      },
      goToShipping() {
        if (!this.currentAddresses.length) {
          this.setToastError(this.$t('shipping.addAddress'))
          return
        }
        if (!this.checkedProduct.length) {
          this.cartPopOver = false
          this.setToastError(this.$t('shipping.noProductSelected'))
          this.$router.push({path: 'cart'})
          return
        }
        this.cartPopOver = true
      },
      clearData() {
        this.initAddress()
        this.submittingAddressData = false
        this.editing = 0
        // this.settingCountry()
        this.hasAddressErrors = false
      },
      async savingAddressData() {
        await this.addressAction()
        if (!this.hasAddressErrors) {
          this.clearData()
        }
      },
      selectCountry(evt) {

        this.addressData = {...this.addressData, ...{country: evt.value?.code2}}
        this.states = evt.value?.states
        this.addressData.state = Object.keys(evt.value?.states).length ? Object.values(evt.value?.states)[0]?.code : ''
      },
      selectState(evt) {
        this.addressData.state = evt.value.code
      },
    //   settingCountry() {
    //     if (this.addressData) {
    //       if(this.location.countryCode && this.countryList[this.location.countryCode]){
    //         this.addressData.country = this.location.countryCode
    //       } else{

    //         this.addressData.country = Object.keys(this.countryList)[0]
    //       }

    //       this.states = this.addressData?.country ? this.countryList[this.addressData.country].states : ''
    //       this.addressData.state = this.location.region
    //     }
    //   },
      async deleting(address) {
        if (confirm(this.$t('deleteAlert.cartProductTile'))) {
          this.ajaxDeleting = address.id
          await this.addressDelete(address.id)
          this.ajaxDeleting = 0
        }
      },
      editAddress(value) {
        this.editing = value.id
        this.addressData = Object.assign({}, value)
        this.states = this.countryList[value.country].states
      },
      ...mapActions('resource', ['setCountryList', 'setPhoneList']),
      ...mapActions('user', ['userAddressAction', 'getUserToken']),
      ...mapActions('common', ['fetchLocation', 'setToastMessage', 'setToastError', 'getRequest']),
      ...mapActions('cart', ['getCartByUser', 'updateCartShipping'])
    },
    async mounted() {
      try {
        // if (!this.countryList || !this.phoneList) {
        //   this.loading = true

        //   const {data} = await this.getRequest({
        //     params: null,
        //     lang: this.langCode,
        //     api: 'countriesPhones'
        //   })
        //   this.setCountryList(data?.countries)
        //   this.setPhoneList(data?.phones)
        //   this.loading = false
        // }
        if (this.getCartAuthItem.length === 0) {
          await this.getCartByUser({
            lang: this.langCode,
            params: {
              user_token: await this.getUserToken()
            }
          })
          this.getCheckedProducts()
        } else {
          if (this.getCartAuthItem.length) {
            this.getCheckedProducts()
          }
        }
      } catch (e) {
        return Promise.reject(e);
      }
      this.initAddress()
      this.$nextTick(() => {
        if (this.profile) {
          this.addressData.name = this.profile?.name
          this.addressData.email = this.profile?.email
        }
      })
    //   if (!this.addressData.country) {
    //     this.settingCountry()
    //   }
    },
    async asyncData({store, $auth, error}) {
      try {
        if(!store.state?.common?.setting?.guest_checkout) {
          if (!$auth.loggedIn) {
            $auth.redirect('login')
            return false
          }
        }
      } catch (e) {
        error(e)
      }
    },
  }
</script>
