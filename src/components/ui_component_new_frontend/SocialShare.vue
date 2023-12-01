<template>
    <div
      class="flex start mt-15 mt-sm social-share"
    >
    <span
      class="mr-10 color-lite hide-sm"
    >
      {{ $t('socialShare.share') }}:
    </span>
      <ShareNetwork
        network="facebook"
        :style="{color: '#2529d8'}"
        :url="currentURL"
        :title="metaTitle"
        :description="metaDescription"
        :quote="metaTitle"
        :hashtags="productTags"
      >
        <i
          class="icon-ms facebook-icon"
        />
        <span class="hide block-sm">
        {{ $t('socialShare.facebook') }}
      </span>
      </ShareNetwork>

      <ShareNetwork
        network="twitter"
        :url="currentURL"
        :title="metaTitle"
        :description="metaDescription"
        :quote="metaTitle"
        :hashtags="productTags"
        class="mlr-5"
      >
        <i
          class="icon-ms twitter-icon"
        />
        <span class="hide block-sm">
        {{ $t('socialShare.twitter') }}
      </span>
      </ShareNetwork>

      <ShareNetwork
        network="pinterest"
        :url="currentURL"
        :title="metaTitle"
        :description="metaDescription"
        :quote="metaTitle"
        :hashtags="productTags"
      >
        <i
          class="icon-ms pinterest-icon"
        />
        <span class="hide block-sm">
         {{ $t('socialShare.pinterest') }}
      </span>
      </ShareNetwork>
    </div>
</template>

<!-- Scripts -->
<script>
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {}
    },
    props: {
      product: {
        type: Object
      }
    },
    components: {},
    mixins: [],
    computed: {
      currentURL() {
        const baseUrl = window.location.origin
        return this.$route ? baseUrl + this.$route.path : baseUrl
      },
      metaTitle() {
        return this.product?.product_eng + '.' || this.product?.product_eng || "."
      },
      metaDescription() {
        return this.product?.shippingCompany || this.site_setting?.shippingCompany || ""
      },
      productTags() {
        return this.product?.catNameEn ?? ''
      },
      ...mapGetters('common', ['site_setting']),
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style>

</style>
