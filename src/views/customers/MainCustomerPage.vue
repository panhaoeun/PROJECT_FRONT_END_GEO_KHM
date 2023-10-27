<template>
    <div>
        <div class="container-fluid">
            <home-hero
                :slider="sliderContent"
                class="home-section"
            />
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
import util from '@/mixin/util'

export default {
    components: {HomeHero},
    mixins: [util],
    props: {},
    middleware: ['common-middleware'],
    data() {
        return {
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
    methods: {},
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>