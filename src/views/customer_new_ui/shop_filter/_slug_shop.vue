<template>
  <div>
    <div class="store-container mb-30 mb-sm-15">
      <div class="container-fluid">
        <div class="store-info">
          <div class="left-area">
            <div class="img-wrap">
              <img
                :src="getProductImageURLThumbnail(store?.shop_logo)"
                :alt="store?.shop_eng"
                width="200"
                height="100"
                class="align-content-center bg-center w-full h-full"
              >
            </div>
            <!-- Store Contents -->
            <div class="store-content flex align-items-center justify-content-center">
              <div >
                <h4 class="bold" style="margin-bottom: 0px;">{{store?.shop_eng}}</h4>
              </div>
              <div>
                <p class="opacity-8 f-9">
                   Member since
                </p>
                <h6>
                    <b>{{storeDate}}</b>
                </h6>
              </div>

            </div>
          </div>
          <!-- <div class="right-area">

            <follow-btn
              class="primary-btn w-150x"
              :following="following"
              :store-id="storeId"
              @change-following="following = !following"
            />
          </div> -->
        </div>
      </div>
    </div>
    <!-- Image Contents -->
    <div class="container-fluid mb-50 mb-sm-20">
      <div class="flex sided mb-15">
        <breadcrumb
          class="mtb-0"
          :page="store?.shop_eng"
        />  
        <!-- <sort-by
          @fetching-data="shortByChanged"
        /> -->
      </div>

      <div class="main-content">
        <div
          v-if="fetchingProductData"
          class="tile-container"
        >
          <div class="shimmer-wrapper">
            <tile-shimmer
              v-for="index in 20"
              :key="index"
            />
          </div>
        </div>
        
        <div class="pos-rel" v-else>
          <div
            v-if="(currentItems && !currentItems.length)"
            class="info-msg"
          >
                No product found.
          </div>

          <div
            class="tile-container"
          >
            <product-tile
              v-for="(value, index) in currentItems"
              :key="index"
              :product="value"
            />
          </div>
          <!-- Pagination -->
          <div class="flow-hidden">
            <pagination
              class="mt-30"
              ref="productPagination"
              :total-page="totalPage"
              @fetching-data="fetchingData"
            />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<!-- Script Of Javascript -->
<script>
import {mapGetters, mapActions} from 'vuex'
import util from '@/mixin/util'
import metaHelper from '@/mixin/metaHelper'
import Pagination from "@/components/ui_component_new_frontend/Pagination";
import Breadcrumb from "@/components/ui_component_new_frontend/Breadcrumb";
import TileShimmer from "@/components/ui_component_new_frontend/TileShimmer";
//   import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import listingParams from "@/mixin/listingParams";
import moment from "moment-timezone";
// import SortBy from "@/components/ui_component_new_frontend/SortBy";
import ProductTile from "@/components/ui_component_new_frontend/ProductTile";
//   import FollowBtn from "@/components/ui_component_new_frontend/FollowBtn";
import CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
import CommonPublicStoreServices from '../../../services/common_public/CommonPublicStoreServices';

  export default {
    middleware: ['common-middleware'],
    data() {
      return {
        result: null,
        fetchingProductData: false,
        ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
        shopLocationSeller: [],
        filtersProductByShopList: [],
        filtersProductByShopBrand: []
      }
    },
    created(){
        this.commonPublic = new CommonPublicStoreServices();
        this.commonServices = new CommonListPublicServices();
        // Common Categories
        this.getCommonCategoriesFIlter();
        // ProductList
        this.getSellerProductTypeByShopFilter();
    },
    components: {
    //   FollowBtn,
      ProductTile,
    //   SortBy,
    //   AjaxButton,
      TileShimmer,
      Breadcrumb,
      Pagination
    },
    head() {
      return {
        title: this.store?.meta_title,
        meta: [
          this.generatingMeta('description', this.store?.meta_description),
          this.generatingMeta('og:image', this.imageURL(this.store)),
          this.generatingMeta('og:title', this.store?.meta_title),
          this.generatingMeta('og:description', this.store?.meta_description)
        ]
      }
    },
    mixins: [util, metaHelper, listingParams],
    computed: {
      storeProductList(){
        return this.filtersProductByShopList ?? [];
      },  
      store(){
        return this.filtersProductByShopBrand ?? [];
      }, 
      storeId(){
        return this.shop?.id
      },
      storeDate() {
        return moment(this.filtersProductByShopBrand?.createdAt).format('MMM DD, YYYY')
      },
      currentItems() {
        return this.filtersProductByShopList || null
      },
      totalPage() {
        return this.filtersProductByShopList.length ;
      },
      ...mapGetters('language', ['langCode']),
    },
    methods: {
        getProductImageURLThumbnail(pathName) {
            if (typeof pathName !== undefined) {
                return `${this.ENV_HOST_PATH_FILE}uploads/sellers/shop_logo/${pathName}`
            } else {
                return '';
            }
        },
        shortByChanged(filtered){
            this.$refs.productPagination?.resettingRoute(filtered)
        },
        async fetchingData() {
            this.fetchingProductData = true
            const self = this
            try {
            setTimeout(async () => {
                // const data = await this.getRequest({
                    // params: {
                    //     slug: this.$route?.params?.slug,
                    //     sortby: this.sortByData,
                    //     page: this.pageData,
                    // },
                    // api: 'store',
                    // lang: this.langCode,
                // })
                self.products = this.currentItems ? this.currentItems : [];
                self.fetchingProductData = false
            }, 100)

            } catch (e) {
            return Promise.reject(e);
            }
        },
        ...mapActions('common', ['ssrGetRequest', 'getRequest', 'postRequest']),
         // Categories
        getCommonCategoriesFIlter(){
            this.commonServices.getCommonCategoriesSubCategories()
            .then((common)=> {
                if (!common) {
                    this.commonCategoriesFilterList = Array.isArray() ?? [];
                    this.commonSubCategoriesFilterList = Array.isArray() ?? [];
                }
                this.commonCategoriesFilterList = common?.categories;
                this.commonSubCategoriesFilterList = common?.subCategory;
            })
        },
        // Get Seller By Product Type
        async getSellerProductTypeByShopFilter(){
            const shopTypeIdFilter = this.$route.params.shopId ? this.$route.params.shopId : 0;
            // Filter Id
            this.commonPublic.searchProductByShopCategoriesSeller(shopTypeIdFilter)
                .then((sellerProduct) => {
                    if (!Array.isArray(sellerProduct) || !sellerProduct.length > 0) {
                        this.filtersProductByShopList = [];
                        this.filtersProductByShopBrand = [];
                    }
                    
                    try {
                        this.fetchingProductData = true
                        const self = this
                        setTimeout(async () => {
                            if (!Array.isArray(sellerProduct) || sellerProduct !== undefined || sellerProduct !== null) {
                                this.filtersProductByShopList = sellerProduct.productFilter ? sellerProduct.productFilter : '';
                                this.filtersProductByShopBrand = sellerProduct.shop ? sellerProduct.shop : '';
                                this.shopLocationSeller = sellerProduct.locationShop ? sellerProduct.locationShop : '';
                                this.loadingProductList = false;
                            }
                        },100);
                        self.products = this.currentItems ? this.currentItems : [];
                        self.fetchingProductData = false
                    }catch(e){
                        return Promise.reject(e);
                    }
                });
        }
    }
  }
</script>

<style>

</style>