<template>
    <div class="product-area pt-115 pb-120">
    <div class="container">
        <div class="section-title-btn-wrap border-bottom-3 mb-50 pb-20">
            <div class="section-title-deal-wrap">
                <div class="section-title-3">
                    <h2>More Love</h2>
                </div>
            </div>
            <div class="btn-style-7">
                <a href="#">All Product</a>
            </div>
        </div> 
        <div class="row" >
            <span v-if="isLoading">Loading...</span>
            <span v-else-if="isError">Error: {{ error.message }}</span>
           <!-- Product Flash Deal-->
            <template 
                v-else-if="data" 
                v-for="(page, index) in data?.pages"
                :key="index"
            >
                <!-- Fetching Data -->
                <span v-if="isFetching && !isFetchingNextPage">Fetching...</span>
                <product-card
                    v-for="product in page?.pageData"
                    :productId="parseInt(product?.productId) ?? 1"
                    :key="product"
                    :imageUrl="product?.product_picture ?? []"
                    :productName="product?.product_eng ?? []"
                    currency="KHR"
                    :productPrice="product?.product_unit_price ?? []"
                    :productPriceKHR="product?.product_unit_price_khr ?? []"
                    :inStock="product?.product_qty ?? []"
                />
            </template>
        </div>
        <div class="more-product-btn text-center">
            <!-- More Products -->
            <router-link 
                to="#"
                @click="nextPage()"
               :disabled="!hasNextPage || isFetchingNextPage"
            >
                <span v-if="isFetchingNextPage">Loading more...</span>
                <span v-else-if="hasNextPage">Load More...</span>
                <span v-else>Nothing more to load...</span>
            </router-link >
        </div>
    </div>
</div>
</template>
<!-- Script -->
<script setup>
    import { ref } from 'vue';
    import ProductServices from '../../../../services/vendors/products/ProductServices'; 
    // import ProductPreloader from "../../../../components/preloaders/ProductPreloader.vue";
    import ProductCard from './card_module_products/ProductCard.vue';
    import { ElMessage } from 'element-plus';
    import {useInfiniteQuery} from "@tanstack/vue-query";
    const totalPage = ref(0);
    const productMoreLove = ref([]);
    const productServicesMS = new ProductServices();
    // const pageNumber = ref(1);
    /**
     * 
     * @param page - reactive variable
    */
    const getProductFlashDeal = async ({pageParam = 10 }) => {    
        try{
            await productServicesMS.getCustomerProductsData(pageParam)
                .then(async(proResult) => {
                    if(!Array.isArray(proResult) || !proResult.length > 0){
                        totalPage.value = [];
                        productMoreLove.value = [];
                    }
                    productMoreLove.value = Array.isArray(proResult?.products) ? proResult?.products.slice() : [];
                    totalPage.value = proResult.pages?.totalPages ?? [];
                }    
            );
            // sent the cursor/page value and the results
            // set max to 3 pages of data
            return {
                pageData: productMoreLove.value ?? [],
                cursor: pageParam === 3 ? undefined : pageParam + 1,
            };
        }catch(error){
           ElMessage.error(`Some Error Entries More Product Suggestion: ${error.message}`);
        }
    } 
    
    const {data,error,isLoading,isFetching,isFetchingNextPage,hasNextPage,isError,fetchNextPage} = useInfiniteQuery({
        queryKey: ["productsMoreLove"],
        queryFn: getProductFlashDeal,
        getNextPageParam: (lastPage) => {
            if(!lastPage){
                return false;
            }
            return lastPage.cursor;
        },
    });
    /**
        * function to ge the next page of data
    */
    const nextPage = () => {
        fetchNextPage();
    };
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>