<template>
  <category-listing-layout
    :sub-categories-map="categories"
    type="subCategory"
  />
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import CategoryListingLayout from "@/components/ui_component_new_frontend/CategoryListingLayout";
  export default {
    middleware: ['common-middleware'],
    components: {
      CategoryListingLayout
    },
    head(){
      return {
      }
    },
    data() {
      return {
      }
    },
    mixins: [],
    computed: {
      ...mapGetters('common', ['subCategoriesMap']),
      ...mapGetters('category', ['categories'])
    },
    methods: {
      ...mapActions('common', ['setSubCatMap', 'getRequest'])
    },
    async mounted() {
      if(!this.subCategoriesMap){
        this.setSubCatMap(this.categories)
      }
    }
  }
</script>
