<template>
  <li class="tree-node">
    <span class="node-data">
      <router-link
        :to="categoryLink(node)"
        :title="node?.catNameEn"
      >
       {{ node?.catNameEn }}
      </router-link>
    </span>
    <ul v-for="(subCat, index) in commonSubCategoriesList" :key="index" >
        <li class="tree-node">
            <span class="node-data">
                <router-link :to="subCategoryLink(node,subCat)" v-if="subCat.superCatId === node?.catID">
                    {{ subCat?.categoryNameEng }}
                </router-link>
            </span>
        </li>
    </ul>
  </li>
</template>

<script>
   import  CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
   import util from '@/mixin/util'

  export default {
    name: 'FooterTreeNode',
    components: {},
    props: {
      node: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        commonSubCategoriesList: null,
      };
    },
    mixins: [util],
    created() {
        this.commonServices = new CommonListPublicServices();
    },
    mounted(){
        // Common Categories
        this.getCommonCategories();
    },
    methods: {
        // Categories
        getCommonCategories(){
            this.commonServices.getCommonCategoriesSubCategories()
            .then((common)=> {
                if (!common) {
                    this.commonSubCategoriesList = Array.isArray() ?? [];
                }
                this.commonSubCategoriesList = common?.subCategory;
            })
        },
    },
    computed: {
      nodeData(){
        return this.node[this.keyName]
      },
    }

  }
</script>