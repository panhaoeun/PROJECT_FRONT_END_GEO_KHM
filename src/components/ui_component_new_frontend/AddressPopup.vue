<template>
    <form @submit.prevent="savingAddressData">
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
        <!-- Pop Over Dialogs -->
        <pop-over
        v-if="addressData"
        title="User Address"
        @close="$emit('close')"
        elem-id="user-address-pop-over"
        :layer="true"
        class="address-popup popup-top-auto"
        >
        <template
            v-slot:content
        >
            <div>
                <div
                    class="input-wrap mlr-5"
                    :class="{invalid: !addressData.contact_name && hasAddressErrors}"
                >
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
                <!-- Phone number -->
                <div
                    class="input-wrap mlr-5"
                    :class="{invalid: !addressData.phone_number_contact && hasAddressErrors}"
                >
                    <label>
                        Phone Number
                    </label>
                    <div class="input-text">
                    <span>
                        +855
                    </span>
                    <input
                        type="text"
                        v-model="addressData.phone_number_contact"
                    />
                    </div>

                    <span
                    class="error"
                    v-if="!addressData.phone_number_contact && hasAddressErrors"
                    >
                        {{ $t('addressPopup.isRequired', {type: $t('addressPopup.phone')}) }}
                    </span>
                </div>

                <div
                    class="input-wrap"
                    :class="{invalid: !addressData.shipAdd01 && hasAddressErrors}"
                >
                    <label>
                    {{ $t('addressPopup.address') }}
                    </label>
                    <input
                    class="mb-10"
                    type="text"
                    v-model="addressData.shipAdd01"
                    :placeholder="$t('addressPopup.addressPlaceholder')"
                    />
                    <input
                    type="text"
                    v-model="addressData.shipAdd02"
                    :placeholder="$t('addressPopup.addressPlaceholder')"
                    />
                    <span
                    class="error"
                    v-if="!addressData.shipAdd01 && hasAddressErrors"
                    >
                    {{ $t('addressPopup.isRequired', {type: $t('addressPopup.address')}) }}
                    </span>
                </div>

                <div class="flex start mlr--5">
                    <div
                    class="input-wrap mlr-5"
                    :class="{invalid: !addressData.shipCity && hasAddressErrors}"
                    >
                    <label>
                        {{ $t('addressPopup.city') }}
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
                    class="input-wrap mlr-5"
                    :class="{invalid: !addressData.shipZipCode && hasAddressErrors}"
                    >
                    <label>
                        {{ $t('addressPopup.zipCode') }}
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
                </div>
            </div>
        </template>

        <template v-slot:pop-footer>
            <div class="flex j-end gap-10">
            <button
                class="outline-btn plr-30 plr-sm-15"
                aria-label="Address cancel"
                @click.prevent="$emit('close')"
            >
                {{ $t('addressPopup.cancel') }}
            </button>
            <ajax-button
                class="primary-btn  plr-30 plr-sm-15"
                :fetching-data="submittingAddressData"
                :loading-text="$t('addressPopup.saving')"
                :text=" $t('addressPopup.thisAddress', {type: editing > 0 ? $t('addressPopup.update') : $t('addressPopup.save')})"
            />
            </div>
        </template>
        </pop-over>
    </form>
</template>

<script>
  import util from '@/mixin/util'
  import validation from '@/mixin/validation'
  import PopOver from './PopOver'
//   import Dropdown from './Dropdown'
  import {mapGetters, mapActions} from 'vuex'
  import addressHelper from '@/mixin/addressHelper'
  import AjaxButton from "./AjaxButton"
  import Spinner from "./Spinner";

  export default {
    name: 'AddressPopup',
    data() {
      return {
        states: {},
        addressData: null,
        loading: false,
        hasAddressErrors: false,
        dropdownOpen: false,
        submittingAddressData: false
      }
    },
    watch: {
      profile() {
        this.addressData.name = this.profile.name
        this.addressData.email = this.profile.email
      },
    },
    props: {
      address: {
        type: Object,
        default() {
          return null
        }
      }
    },
    components: {
      Spinner,
      AjaxButton,
      PopOver,
    //   Dropdown
    },
    computed: {
      invalidEmail() {
        return !this.isValidEmail(this.addressData?.email)
      },
      emailValid() {
        return this.addressData.email && !this.invalidEmail
      },
    //   phoneCode() {
    //     return this.phoneList[this.addressData?.country]
    //   },
      editing() {
        return this.addressData && this.addressData.id
      },
      ...mapGetters('user', ['profile']),
      ...mapGetters('language', ['langCode']),
      ...mapGetters('resource', ['countryList', 'phoneList']),
      ...mapGetters('common', ['location'])
    },
    mixins: [util, validation, addressHelper],
    methods: {
      async savingAddressData() {
        await this.addressAction()

        if (!this.hasAddressErrors) {
          this.$emit('close')
        }
      },
      ...mapActions('resource', ['setCountryList', 'setPhoneList']),
      ...mapActions('user', ['userAddressAction', 'getUserToken']),
      ...mapActions('common', ['fetchLocation', 'setToastMessage', 'setToastError', 'getRequest']),
      ...mapActions('order', ['ratingReviewAction', 'ratingReviewFind']),
    },
    created() {
    },
    async mounted() {
      if(this.address){
        this.addressData = {...this.addressData, ...this.address}
      } else {
        this.addressData = {
          id: '',
          contact_name: '',
          phone_number_contact: '',
          shipZipCode: '',
          shipAdd01: '',
          shipAdd02: '',
          shipCity: ''
        }

        this.$nextTick(() => {
          if (this.profile) {
            this.addressData.name = this.profile.name
            this.addressData.email = this.profile.email
          }
        })
      }
    }


  }
</script>