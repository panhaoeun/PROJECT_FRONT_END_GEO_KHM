<template>
  <div
    class="home-section"
  >
    <div class="area">
      <h4 class="title">
            More Love
      </h4>
      <div
        class="area-content"
      >
        <div class="tile-container">
          <transition name="fade" mode="out-in">
            <div
              class="shimmer-wrapper"
              v-if="loading"
              key="shimmer"
            >
              <tile-shimmer
                v-for="index in 15"
                :key="index"
              />
            </div>
            <div
              v-else
              class="flex wrap align-start discover-area"
              key="products"
            >
              <product-tile
                v-for="(value, index) in currentItems"
                :key="index"
                :product="value"
              />
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div
      class="center-text mt-20 mt-sm-15"
    >
      <router-link
        :to="listingLink({slug: 'daily-discover'})"
        class="w-100 br-primary outline-btn btn-lg plr-35 plr-sm-20 font-bold text-black"
      >
        Show More
      </router-link>
    </div>
  </div>
</template>
<!-- Scripts -->
<script>
import {mapActions, mapGetters} from 'vuex';
import TileShimmer from "./TileShimmer";
import ProductTile from "./ProductTile";
import util from '@/mixin/util'
export default {
    components: {
        TileShimmer,
        ProductTile
    },
    props: {},
    computed: {
      ...mapGetters('language', ['langCode']),
      ...mapGetters('home', ['products'])
    },
    data() {
        return {
            currentItems: [],
            loading: true
        };
    },
    mixins: [util],
    methods: {
        ...mapActions('home', ['fetchProducts']),
    },
    async mounted() {
        if(!this.products){
           try{
                this.loading = true
                const proResult = await this.fetchProducts({
                    payload: {
                        page: 10,
                        size: 10
                    }
                });
                this.currentItems = this.products ? this.products : []
                this.loading = false;
                return proResult;
           }catch(e){
              return Promise.reject(e);
           }
        }else{
            this.currentItems = this.products ? this.products : [];
            this.loading = false
        }
       
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>