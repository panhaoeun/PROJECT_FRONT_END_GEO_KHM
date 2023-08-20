<template>
   <div class="main-menu menu-color--black menu-hover-color--golde font-bold text-lg">
        <nav>
            <ul>
                <li class="has-dropdown"  v-for="(catSup, index) in categoryList" :key="index">
                    <a href="#" @mouseover="setSubCategory(catSup)">{{ String(catSup?.catNameEn) }} <i class="fa fa-angle-down"></i></a>
                    <!-- Sub Menu -->
                    <ul class="sub-menu" v-for="(subCat, index) in getSubNameByCatId" :key="index">
                        <li>
                            <router-link to="/">{{ subCat?.categoryNameEng }}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            categoryList: [],
            subCatIdBySuperID: 0,
            getSubNameByCatId: ""
        };
    },
    async mounted() {
        this.categoryList = await this.$store.dispatch("categories/setCategoriesList");
        this.getSubNameByCatId = await this.$store.dispatch("categories/getSubCategoriesName", this.subCatIdBySuperID);
        console.log(this.subCatIdBySuperID)
    },
    created() {},
    methods: {
        setSubCategory(category){
            this.subCatIdBySuperID = category.catID;
        }
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>