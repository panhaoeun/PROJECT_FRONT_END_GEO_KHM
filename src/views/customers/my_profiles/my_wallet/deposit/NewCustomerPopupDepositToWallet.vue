<template>
  <form @submit.prevent="savingDepositWalletData">
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


    <pop-over
      title="Deposit to Wallet"
      @close="$emit('close')"
      v-if="popupWalletDepositData"
      elem-id="user-address-pop-over"
      :layer="true"
      class="address-popup popup-top-auto"
    >
      <template
        v-slot:content
      >
        <div>
            
            <!-- Enter Amount -->
            <div
                class="input-wrap mlr-5"
                :class="{invalid: !popupWalletDepositData.enterAmountWalletKHR && hasAddressErrors}"
                >
                <label>
                        Enter Amount
                </label>
                <input
                    type="number"
                    v-model="popupWalletDepositData.enterAmountWalletKHR"
                />
                <span
                    class="error"
                    v-if="!popupWalletDepositData.enterAmountWalletKHR && hasAddressErrors"
                >
                    {{ $t('addressPopup.isRequired', {type: $t('addressPopup.city')}) }}
                </span>
            </div>
            <!-- Deposited Timed -->
            <div
                class="input-wrap mlr-5"
                :class="{invalid: !popupWalletDepositData.enterDepositedDateTime && hasAddressErrors}"
                >
                <label>
                        Enter Deposited Time
                </label>
                <el-date-picker
                    arrow-control
                    style="width: 100%; outline: none;border: none;" 
                    :action="fileUploadUrl"
                    v-model="popupWalletDepositData.enterDepositedDateTime"
                    type="datetime"
                    placeholder="Pick a day"
                    autocomplete="off"  
                />
                <span
                    class="error"
                    v-if="!popupWalletDepositData.enterDepositedDateTime && hasAddressErrors"
                >
                    {{ $t('addressPopup.isRequired', {type: $t('addressPopup.city')}) }}
                </span>
            </div>
            <!-- Deposited Noted -->
            <div
                class="input-wrap mlr-5"
                >
                <label>
                        Deposited Noted
                </label>
                <textarea
                    type="text"
                    v-model="popupWalletDepositData.enterDepositedNoted"
                />
            </div>
        </div>
      </template>

      <template v-slot:pop-footer>
        <div class="flex j-end gap-10">
          <button
            class="outline-btn border-round plr-30 plr-sm-15 border-1"
            aria-label="Address cancel"
            @click.prevent="$emit('close')"
          >
             {{ $t('addressPopup.cancel') }}
          </button>
          <ajax-button
            class="primary-btn  plr-30 plr-sm-15"
            :fetching-data="submittingDepositAmountData"
            :loading-text="$t('addressPopup.saving')"
            text="Upload Receipt"
          />
        </div>
      </template>
    </pop-over>
  </form>

</template>

<script>
  import util from '@/mixin/util'
  import validation from '@/mixin/validation'
  import PopOver from '../../../../../components/ui_component_new_frontend/PopOver'
//   import Dropdown from '../../../../../components/ui_component_new_frontend/Dropdown'
  import {mapGetters, mapActions} from 'vuex'
  import addressHelper from '@/mixin/addressHelper'
  import AjaxButton from "../../../../../components/ui_component_new_frontend/AjaxButton"
  import Spinner from "../../../../../components/ui_component_new_frontend/Spinner";

  export default {
    name: 'AddressPopup',
    data() {
      return {
        states: {},
        popupWalletDepositData: null,
        loading: false,
        hasAddressErrors: false,
        dropdownOpen: false,
        submittingDepositAmountData: false
      }
    },
    watch: {
      location() {
        this.settingCountry()
      },
      profile() {
        this.popupWalletDepositData.name = this.profile.name
        this.popupWalletDepositData.email = this.profile.email
      },
    },
    props: {
      depositedWallet: {
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
        return !this.isValidEmail(this.popupWalletDepositData?.email)
      },
      emailValid() {
        return this.popupWalletDepositData.email && !this.invalidEmail
      },
      phoneCode() {
        return this.phoneList[this.popupWalletDepositData?.country]
      },
      editing() {
        return this.popupWalletDepositData && this.popupWalletDepositData.id
      },
      ...mapGetters('user', ['profile']),
      ...mapGetters('language', ['langCode']),
      ...mapGetters('resource', ['countryList', 'phoneList']),
      ...mapGetters('common', ['location'])
    },
    mixins: [util, validation, addressHelper],
    methods: {
      async savingDepositWalletData() {
        // Updated Module 
        // Has Error 
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
        // Wallet List Deposited
        if(this.depositedWallet){
            this.popupWalletDepositData = {...this.popupWalletDepositData, ...this.depositedWallet}
        }else{
            this.popupWalletDepositData = {
                id: '',
                bankCharge: '',
                enterAmountWalletKHR: 0,
                enterDepositedNoted: '',
                enterDepositedDateTime: ''
            }
        }
    }
  }
</script>

