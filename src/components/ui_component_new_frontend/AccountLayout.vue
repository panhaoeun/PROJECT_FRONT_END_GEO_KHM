<template>
  <client-only>
    <div class="container-fluid mtb-20 mtb-sm-15">
      <div class="order-wrapper">
        <ul class="left-sidebar">
          <li
            :class="{active: activeRoute === 'profile'}"
          >
            <router-link
              to="/user/profile"
              class="text-black"
              @click.capture="goingNext('/user/profile')"
            >
                My Profile
            </router-link>
          </li>
          <li
            :class="{active: activeRoute === 'addresses'}"
          >
            <router-link
              to="/user/addresses"
              class="text-black"
              @click.capture="goingNext('/user/addresses')"
            >
              My address book
            </router-link>
          </li>
          <li
            :class="{active: activeRoute === 'orders'}"
          >
            <router-link
              to="/user/orders"
               class="text-black"
              @click.capture="goingNext('/user/orders')"
            >
               My Orders
            </router-link>
          </li>
            <li
            :class="{active: activeRoute === 'wallet'}"
          >
            <router-link
                to="/user/wallet-order-pay"
                class="text-black"
                @click.capture="goingNext('/user/wallet-order-pay')"
            >
               My Wallet
            </router-link>
          </li>
        </ul>
        <div class="right-area grow pos-rel">
          <slot
            name="rightArea"
          />
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
  export default {
    name: 'AccountLayout',
    data() {
      return {
      }
    },
    mixins: [],
    watch: {},
    props: {
      activeRoute:{
        type: String
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      goingNext(url){
        const clicked = url.split('/')
        this.$emit(`clicked-${clicked[clicked.length-1]}`)
      }
    },
  }
</script>
