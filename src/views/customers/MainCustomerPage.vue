<template>
    <div>
        <div class="container-fluid">
            <!-- Home Slide Banner -->
            <home-hero
                :slider="sliderContent"
                class="home-section"
            />
            <!--Section Categories and Sub Categories-->
            <!-- Seller -->
            <div
            class="brands-wrapper full-screen"
            >
                <div
                    class="brands-inner"
                    >
                    <FeatureSeller
                        class="featured-brands"
                        :item-list="sellerShopBanner"
                    />
                </div>
            </div>
            <!-- Featured Categories -->
            <featured-categories 
                class="category-wrapper"
                :title="$t('searchPopup.categories')"
                type="subCategory"
                :item-list="commonCategoriesList"
            />
            <!-- Daily discover - More Love -->
            <lazy-area
                v-slot:default="{renderArea}"
                class="mn-h-400x"
            >
                <daily-discover-more-love v-if="renderArea"/>
            </lazy-area>
           
        </div>
    </div>
    <!-- <div class="main-wrapper bg-white">
        <HeroSectionBanner/>
        <SectionSellerSection/>
        <MoreLoveSuggestion/>
    </div> -->
</template>
<script>
// import HeroSectionBanner from "@/components/customers/home_frontend_component/banner_home/HeroSectionBanner.vue";
// // import AdvertSection from "@/components/customers/home_frontend_component/banner_home/AdvertSection.vue";
// import SectionSellerSection from "@/components/customers/seller_categories_section/SellerCategoriesSection.vue";
// import MoreLoveSuggestion from "@/components/customers/home_frontend_component/section_content_home_customer/MoreLoveSuggestion.vue";
import HomeHero from '@/components/ui_component_new_frontend/HomeHero.vue'
import {mapGetters} from 'vuex';
import util from '@/mixin/util';
import FeatureSeller from '@/components/ui_component_new_frontend/feature_seller/FeatureSeller.vue';
import FeaturedCategories from '@/components/ui_component_new_frontend/feature_categories/FeatureCategories';
import CommonPublicStoreServices from '@/services/common_public/CommonPublicStoreServices';
import CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
// More Loved
import LazyArea from "@/components/ui_component_new_frontend/LazyArea.vue";
import DailyDiscoverMoreLove from "@/components/ui_component_new_frontend/daily_discover_morelove/DailyDiscoverMoreLove.vue";

export default {
    components: {HomeHero,FeatureSeller,FeaturedCategories,DailyDiscoverMoreLove,LazyArea},
    mixins: [util],
    props: {},
    middleware: ['common-middleware'],
    data() {
        return {
            sellerShopBanner: [],
            commonCategoriesList: [],
            loadingSellerList: false,
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
            loadingProductList: false,
            filtersProductByShopList: [],
            sliderContent: [
                {
                    id: 1,
                    imagePath: require('@/assets/img/banner/banner_01.jpg'),
                    title: 'Special Offer',
                    subTitle: 'NEW TRANDING',
                    description: 'Brown Minimalist Fashion Sale Banner',
                    right_top: {
                        imagePath: require('@/assets/img/banner/banner_01.jpg'),
                        title: 'Special Offer',
                        subTitle: 'NEW TRANDING',
                    }
                },
                {
                    id: 2,
                    imagePath: require('@/assets/img/banner/banner_02.jpg'),
                    title: 'Time to go shopping',
                    subTitle: 'NEW TRANDING',
                    description: '+123-456-7890 / www.reallygreatsite.com / @reallygreatsite',
                },
                {
                    id: 3,
                    imagePath: require('@/assets/img/banner/banner_03.jpg'),
                    title: 'Online Store',
                    subTitle: 'NEW TRANDING',
                    description: 'Flash Sale 9.9 Promotion',
                    right_bottom: {
                        imagePath: require('@/assets/img/banner/banner_01.jpg'),
                        title: 'Special Offer',
                        subTitle: 'NEW TRANDING',
                    }
                },
            ]
        }
    },  
    created() {
        this.commonPublic = new CommonPublicStoreServices();
        this.commonServices = new CommonListPublicServices();
    },
    computed: {
      heroMain() {
        return this.slider.main[0]
      },
      heroRightTop() {
        return this.slider.right_top
      },
      heroRightBottom() {
        return this.slider.right_bottom
      },
      banner5() {
        return this.bannerData?.banner5
      },
      banner6() {
        return this.bannerData?.banner6
      },
      featuredBanner() {
        return this.bannerData?.banner1
      },
      productCollection() {
        const col = [...this.collections]
        col.pop()
        return col
      },
      collectionLinkObj() {
        return {
          title: this.productGrid?.title,
          id: this.productGrid?.id
        }
      },
      productGrid() {
        return this.collections.slice(-1).pop()
      },
      bannerData() {
        let banner = {
          banner1: null,
          banner2: null,
          banner3: null,
          banner4: null,
          banner5: null,
          banner6: null
        }
        this.banners.forEach(i => {
          banner['banner' + this.bannerType['BANNER_' + i.type]] = i
        })
        return banner
      },
      ...mapGetters('home', ['featuredCategories', 'flashSales', 'collections',
        'featuredBrands', 'slider', 'banners'])
    },
    head() {
      return {
        link: [
          {
            rel: 'preload',
            as: 'image',
            href: this.imageURL(this.heroMain)
          },
          {
            rel: 'preload',
            as: 'image',
            href: this.imageURL(this.heroRightTop)
          },
          {
            rel: 'preload',
            as: 'image',
            href: this.imageURL(this.heroRightBottom)
          },
        ],
      }
    },
    mounted() {
        this.getCommonCategories();
        // ProductList
        this.getCommonSellerPublic();
    },
    methods: {
        getCommonCategories(){
            this.commonServices.getCommonCategoriesSubCategories()
            .then((common)=> {
                if (!common) {
                    this.commonCategoriesList = Array.isArray() ?? [];
                    this.commonSubCategoriesList = Array.isArray() ?? [];
                }
                this.commonCategoriesList = common?.categories ? common?.categories : '';
            })
        },
        getCommonSellerPublic(){
            this.commonPublic.getCommonSellerCategories()
                .then((data) => {
                    try {
                        if (!Array.isArray(data) || !data.length > 0) {
                            this.sellerShopBanner = [];
                        }
                        if (!Array.isArray(data) || data !== undefined || data !== null) {
                            this.sellerShopBanner = data ? data : '';
                            this.loadingSellerList = false;
                        }
                    } catch (error) {
                       return Promise.reject(error);
                    }
                }
            );
        },
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>