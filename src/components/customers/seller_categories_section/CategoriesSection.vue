<template>
    <div>
        <!-- Headers -->
        <div class="clearfix">
            <p class="h5 text-primary-700">Categories</p>
        </div>
        <!-- Sections -->
        <div class="row gap-3 my-4">
            <template v-if="commonCategoriesList !== null">
                <template v-if="commonCategoriesList && commonCategoriesList.length > 0 && commonCategoriesList!== ''">
                    <div class="row gap-6">
                        <div class="col-md-3"  v-for="(category, index) in commonCategoriesList" :key="index">
                            <div class="justify-content-center align-content-center align-items-center">
                                <router-link to="#" class="">
                                    <MazAvatar
                                       :src="`${ENV_HOST_PATH_FILE}uploads/${category?.catLogo}`"
                                        size="2rem"
                                    />
                                    <p class="text-center text-md mt-2 text-blue-500">{{ category.catNameEn ? category.catNameEn : '' }}</p>
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
import  CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
import MazAvatar from 'maz-ui/components/MazAvatar';
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
        };
    },
    created() {
        this.commonPublic = new CommonPublicStoreServices();
        this.commonServices = new CommonListPublicServices();
    },
    mounted() {
        // Categories
        this.getCommonCategories();
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
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>