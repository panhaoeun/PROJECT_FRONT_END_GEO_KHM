<template>
    <div class="area home-section">
        <template v-if="itemList && itemList.length">
            <!-- Title -->
            <div class="flex sided title">
                <h6>Featured Categories</h6>
                <router-link
                    class="link"
                    to="/categories"
                >
                    Show All
                </router-link>
            </div>
            <!-- Categories List -->
            <div class="area-content">
                <image-slider
                    :image-count="itemList.length"
                    :per-view="9"
                    :gap="15"
                    :responsive="[7, 5, 4, 3, 2]"
                >
                    <template v-slot:content>
                        <li
                            v-for="(value, index) in itemList"
                            :key="index"
                            class="center-text"
                        >
                            <sub-category-tile
                            :category="value"
                            :sub-category="value"
                            />
                    </li>
                    </template>
                </image-slider>
            </div>

        </template>
    </div>
</template>
<!-- Script Categories -->
<script>
import util from '@/mixin/util';
import ImageSlider from '../ImageSlider';
import SubCategoryTile from './SubCategoryTile';
export default {
    components: {
        ImageSlider,
        SubCategoryTile
    },
    mixins: [util],
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