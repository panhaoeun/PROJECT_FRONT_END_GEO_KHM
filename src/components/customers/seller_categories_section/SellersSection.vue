<template>
    <div>
        <!-- Headers -->
        <div class="clearfix">
            <p class="h5 text-primary-700">Sellers</p>
        </div>
        <!-- Sections -->
        <div class="row gap-3 my-4">
            <template v-if="sellerShopBanner !== null">
                <template v-if="sellerShopBanner && sellerShopBanner.length > 0 && sellerShopBanner!== ''">
                    <div class="row">
                        <div class="col-md-3"  v-for="(seller, index) in sellerShopBanner" :key="index">
                            <div class="pl-2 flex justify-content-center align-content-center align-items-center">
                                <router-link 
                                 to="#" 
                                 @click="goSellerMultipleProductFilterByShop(seller?.shop_type_id)">
                                    <MazAvatar
                                       :src="`${ENV_HOST_PATH_FILE}uploads/sellers/shop_logo/${seller?.shop_logo}`"
                                        size="2rem"
                                    />
                                    <p class="text-center text-md mt-2 text-red-500">{{ seller?.shop_eng ? seller?.shop_eng : '' }}</p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>
<script>
import CommonPublicStoreServices from '../../../services/common_public/CommonPublicStoreServices';
import CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
import MazAvatar from 'maz-ui/components/MazAvatar';
import { ElNotification } from 'element-plus';
export default {
    components: {
        MazAvatar
    },
    props: {},
    data() {
        return {
            sellerShopBanner: [],
            commonCategoriesList: [],
            loadingSellerList: false,
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
            loadingProductList: false,
            filtersProductByShopList: []
        };
    },
    created() {
        this.commonPublic = new CommonPublicStoreServices();
        this.commonServices = new CommonListPublicServices();
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
                        ElNotification({
                            title: `Unsuccessfully get product shop`,
                            showClose: true,
                            type: 'error'
                        });
                    }
                }
            );
        },
        // FIlter Product By ShopId
        async goSellerMultipleProductFilterByShop(shopTypeId){
            // Filters
            this.$router.push(
                {
                    path: '/customer/search-product/filter-product-shop/shop-type-search',
                    query: {
                        sId: shopTypeId ? shopTypeId : 0
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