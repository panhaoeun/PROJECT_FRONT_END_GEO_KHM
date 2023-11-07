<template>
    <div class="area area-slider home-section">
        <template v-if="itemList && itemList.length">
            <div class="flex sided title">
                <h6>Sellers</h6>
            </div>
            <div class="area-content">
                <image-slider
                    :image-count="itemList.length"
                    :per-view="10"
                    :gap="15"
                    :responsive="sliderOptions.responsive"
                >
                <template v-slot:content>
                    <li
                        v-for="(value, index) in itemList"
                        :key="index"
                        class="center-text"
                    >
                        <!-- Seller Title -->
                        <SellerTitle
                            :index="index"
                            :brand="value"
                        />
                    </li>
                </template>     
                </image-slider>
            </div>
        </template>
    </div>
</template>
<script>
import ImageSlider from '../ImageSlider';
import SellerTitle from "./SellerTitle.vue";
export default {
    components: {
        ImageSlider,
        SellerTitle
    },
    computed: {
        sliderOptions(){
            if(this.hasFeaturedBanner){
              return {
                perView: 3,
                responsive: [5, 5, 4, 3, 2]
              }
            }
            return {
              perView: 20,
              responsive: [6, 5, 4, 3, 2]
            }
        },
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        itemList: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {};
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>