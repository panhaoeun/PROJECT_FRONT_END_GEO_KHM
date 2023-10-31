<template>
  <div class="container-fluid mtb-20 mtb-sm-15">
    <div class="product-detail">
      <div
        class="detail-left  p-20 p-sm-15 area mr-20 mr-sm mb-sm-15 flex justify-content-center align-start gap-15"
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <div
            class="spinner-wrapper flex justify-content-center flex-wrap align-items-center layer-white"
            v-if="loading"
          >
            <spinner
              :radius="100"
            />
          </div>
        </transition>
        <!-- Shipping Address -->
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
          <!-- Phone Number -->
            <div
              class="input-wrap input-text"
              :class="{invalid: !addressData.phone_number_contact && hasAddressErrors}"
            >
                <label>
                    Phone Number
                </label>
                <input
                  type="text"
                  v-model="addressData.phone_number_contact"
                  @keypress="isNumber($event)"
                />
              <span
                class="error"
                v-if="!addressData.phone_number_contact && hasAddressErrors"
              >
                  {{ $t('addressPopup.isRequired', {type: $t('addressPopup.phone')}) }}
              </span>
            </div>
          <div class="flex">
            <div class="input-wrap" :class="{invalid: !addressData.contact_name && hasAddressErrors}">
              <label>
                    Name
              </label>
              <input
                type="text"
                v-model="addressData.contact_name"
              />
              <span
                class="error"
                v-if="!addressData.contact_name && hasAddressErrors"
              >
                {{ $t('addressPopup.isRequired', {type: $t('addressPopup.name')}) }}
              </span>
            </div>
          </div>

          <div
            class="input-wrap"
            :class="{invalid: !addressData.shipAdd01 && hasAddressErrors}"
          >
            <label>
                Address
            </label>
            <input
              class="mb-10"
              type="text"
              v-model="addressData.shipAdd01"
              placeholder="Street address or P.O. Box"
            />
            <input
              type="text"
              v-model="addressData.shipAdd02"
              placeholder="Apt, suite, unit, building, floor, etc."
            />
            <span
              class="error"
              v-if="!addressData.shipAdd01 && hasAddressErrors"
            >
              {{ $t('addressPopup.isRequired', {type: $t('addressPopup.address')}) }}
            </span>
          </div>

          <div class="flex block-xxs">
            <div
              class="input-wrap"
              :class="{invalid: !addressData.shipCity && hasAddressErrors}"
            >
              <label>
                    City
              </label>
              <input
                type="text"
                v-model="addressData.shipCity"
              />
              <span
                class="error"
                v-if="!addressData.shipCity && hasAddressErrors"
              >
                 {{ $t('addressPopup.isRequired', {type: $t('addressPopup.city')}) }}
              </span>
            </div>

            <div
              class="input-wrap"
              :class="{invalid: !addressData.shipZipCode && hasAddressErrors}"
            >
              <label>
                    Zip Code
              </label>
              <input
                type="text"
                v-model="addressData.shipZipCode"
              />
              <span
                class="error"
                v-if="!addressData.shipZipCode && hasAddressErrors"
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

          <!-- <div class="input-wrap">
            <label>
                Delivery instruction
            </label>
            <textarea
              v-model="addressData.delivery_instruction"
            />
          </div> -->

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
      <!-- Checkout Right -->
      <checkout-right
        route-link="checkout"
        :checked-product="checkedProduct"
        btn-text="Set Shipping Option"
        :loading-text="$t('checkoutRight.submitting')"
        :text="$t('checkoutRight.proceedToCheckout')"
        :disabled="fetchingAddressData || Object.keys(cartShipping).length === 0 || !selectedCurrentAddress"
        @go-next="goToShipping"
      />
    </div>

    <!-- Process Checkout -->
    <transition name="fade" mode="out-in">
      <pop-over
        v-if="cartPopOver"
        title="Ordered Products"
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
            :cart-products="getCartAuthItem"
            :cart-shipping="cartShipping"
            :checked="checked"
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
                Cancel
            </button>
            <ajax-button
              class="primary-btn  plr-30 plr-sm-15"
              type="button"
              :fetching-data="checkingOut"
              loading-text="Submitting"
              text="Proceed to checkout"
              @clicked="goToCheckout"
            />
          </div>
        </template>
      </pop-over>
    </transition>

  </div>
</template>
<script>
  import CartList from '@/components/ui_component_new_frontend/CartList';
  import AjaxButton from '@/components/ui_component_new_frontend/AjaxButton'
  import Dropdown from '@/components/ui_component_new_frontend/Dropdown'
  import PopOver from '@/components/ui_component_new_frontend/PopOver'
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
      CartList,
      PopOver,
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
        return this.allAddresses;
      },
      ...mapGetters('resource', ['countryList', 'phoneList']),
      ...mapGetters('language', ['langCode']),
      ...mapGetters('shippingStore', ['allAddresses']),
      ...mapGetters('common', ['location']),
      ...mapGetters('cart', ['getCartAuthItem']),
    },
    methods: {
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
      initAddress() {
        this.addressData = {
          id: '',
          email: '',
          contact_name: '',
          phone_number_contact: '',
          shipCity: '',
          country: '',
          state: '',
          shipZipCode: '',
          shipAdd01: '',
          shipAdd02: '',
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
          if (obj) {
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
            //Shipping
            // let unableToShip = false
            if (!this.selectedCurrentAddress) {
                // unableToShip = true;
                this.setToastError('Product is unable to be shipped.')
                return
            }
            if (!this.getCartAuthItem.length) {
                this.cartPopOver = false
                this.$router.push({path: 'cart'});
                this.setToastError("You don't have any product selected. Please a select a product first.")
                return
            }
            try {
                this.checkingOut = true
                // CheckOut Payments
                setTimeout(() => {
                    this.$router.push({path: '/customer/checkout-payment/payment-method'});
                    this.checkingOut = false
                }, 1000);
            } catch (e) {
                return Promise.reject(e);
            }
      },
      goToShipping() {
        if (!this.currentAddresses.length) {
          this.setToastError('Add new address')
          return
        }
        // if (!this.checkedProduct.length) {
        //   this.cartPopOver = false
        //   this.setToastError("You don't have any product selected. Please a select a product first.")
        // //   this.$router.push({path: 'cart'})
        //   return
        // }
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
        // this.states = this.countryList[value.country].states
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
