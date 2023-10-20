<template>
    <div class="container gap-3 px-2 py-2 my-2">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24" :sm="24" :md="26" :lg="26" :xl="20">
                <el-card shadow="hover">
                    <!-- Seller -->
                    <SellerSection/>
                </el-card>
            </el-col>
            <!-- <el-col :span="12" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-card shadow="always">
                    <SellerCategoriesSection/>
                </el-card>
            </el-col> -->
        </el-row>
    </div>
</template>
<script>
// import SellerCategoriesSection from "./CategoriesSection";
import SellerSection from "./SellersSection.vue";
export default {
    components: {
        // SellerCategoriesSection,
        SellerSection
    },
    props: {},
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