<template>
  <div
    class="flex wrap static-container home-section mb-30"
  >
    <div class="static-area flex">
      <i
        class="icon-ms shipping-icon "
      />
      <div>
        <h6 class="bold">{{ $t('home.rapid_shipping') }}</h6>
        <span class="color-lite ">{{ $t('home.shortPeriod') }}</span>
      </div>
    </div>

    <div class="static-area flex">
      <i
        class="icon-ms card-icon"
      />
      <div>
        <h6 class="bold">{{ $t('home.secureTransaction') }}</h6>
        <span class="color-lite">{{ $t('home.checkoutSecurely') }}</span>
      </div>
    </div>

    <div class="static-area flex">
      <i
        class="icon-ms support-icon "
      />
      <div>
        <h6 class="bold">{{ $t('home.support') }}</h6>
        <span class="color-lite">{{ $t('home.pickupCalls') }}</span>
      </div>
    </div>

    <div class="static-area flex">
      <i
        class="icon-ms bundle-icon "
      />
      <div>
        <h6 class="bold">{{ $t('home.bundleOffer') }}</h6>
        <span class="color-lite">{{ $t('home.onProducts') }}</span>
      </div>
    </div>

  </div>

</template>
<!-- Static Section -->
<script>
  export default {
    name: 'StaticSection',
    data() {
      return {

      }
    },
    watch: {


    },
    props: {

    },
    components: {

    },
    computed: {

    },
    mixins: [],
    methods: {

    },
    created() {
    },
    async mounted() {
    }
  }
</script>

