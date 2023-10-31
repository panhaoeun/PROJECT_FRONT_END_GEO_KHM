<template>
  <account-layout
    active-route="addresses"
    @clicked-addresses="loadData"
    class="mb-5"
  >
    <template v-slot:rightArea>
        <div>
          <transition
            name="fade"
            mode="out-in"
          >
            <address-popup
              v-if="addressPopup"
              :address="editingAddress"
              @close="closingPopup"
            />
          </transition>
          <button
            aria-label="submit"
            class="primary-btn plr-20 mb-15"
            @click.prevent="adding"
          >
                Add new address
          </button>
          <user-address
            ref="userAddress"
            @editing="editing"
          />
        </div>
    </template>
  </account-layout>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '@/mixin/util'
//   import LazyImage from '~/components/LazyImage'
  import AddressPopup from '@/components/ui_component_new_frontend/AddressPopup'
  import UserAddress from '@/components/ui_component_new_frontend/UserAddress'
  import AccountLayout from '@/components/ui_component_new_frontend/AccountLayout'

  import addressHelper from '@/mixin/addressHelper'
  import productHelper from '@/mixin/productHelper'
  export default {
    middleware: ['common-middleware', 'auth'],
    head() {
      return {
        title: 'Address',
        meta: []
      }
    },
    data() {
      return {
        editingAddress: null,
        addressPopup: false,
        deactivate: true
      }
    },
    watch: {
    },
    components: {
    //   LazyImage,
      AddressPopup,
      AccountLayout,
      UserAddress
    },
    mixins: [util, productHelper, addressHelper],
    computed: {
      ...mapGetters('common', ['currencyIcon', 'setting'])
    },
    methods: {
      loadData() {
        this.$refs.userAddress.loadData()
      },
      closingPopup() {
        this.addressPopup = false
      },
      adding() {
        this.addressPopup = true
        this.editingAddress = null
      },
      editing(value) {
        this.addressPopup = true
        this.editingAddress = value
      },
      ...mapActions('common', ['fetchLocation', 'setToastMessage', 'setToastError']),
    },
    async mounted() {
    },
  }
</script>

<style>

</style>
