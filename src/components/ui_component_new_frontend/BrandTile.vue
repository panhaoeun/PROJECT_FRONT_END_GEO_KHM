.<template>
  <router-link
    class="block page-link"
    :to="brandLink(brand)"
    :title="brand.title"
  >
    <div class="img-wrapper">
      <lazy-image
        :data-src="thumbImageURL(brand)"
        :title="brand.title"
        :alt="brand.title"
      />
    </div>
    <h5 class="item-title ellipsis ellipsis-1">
      {{brand.title}}
    </h5>
  </router-link>
</template>

<script>
  import LazyImage from './LazyImage'
  import util from '@/mixin/util'

  export default {
    name: 'BrandTile',
    props: {
      brand: {
        type: Object,
        default() {
          return null
        },
      },
    },
    data() {
      return {
      }
    },
    components: {
      LazyImage
    },
    mixins: [util],
    computed: {
    },
    mounted() {
    },
    methods: {
    },
  };
</script>

