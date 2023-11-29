<template>
   <router-link
     v-if="isPublic"
      to="/customer/site-map-slug-error-page/not-found-error"
     class="block flex banner-wrapper"
     @click.capture="$emit('clicked')"
   >
     <img
       :src="imageBannerProductURL(banner)"
       :alt="banner.title"
       class="bg-cover w-full"
       height="240"
       width="100%"
     >
     <button
       v-if="closable"
       aria-label="close"
       class="btn-banner-close"
       @click.prevent="$emit('close')"
     >
       <i class="icon-ms close-icon"/>
     </button>
   </router-link>
</template>
<!-- Script -->
<script>
  import util from '@/mixin/util'
  export default {
    name: 'Banner',
    data() {
      return {
      }
    },
    watch: {
    },
    props: {
      banner: {
        type: Object,
        default() {
          return null
        },
      },
    },
    computed: {
      isPublic(){
        return parseInt(this.banner?.status) === this.status.PUBLIC
      },
      closable(){
        return parseInt(this.banner?.closable) === this.status.PUBLIC
      }
    },
    mixins: [util],
    methods: {

    },
    created() {
    },
    async mounted() {
    }
  }
</script>

