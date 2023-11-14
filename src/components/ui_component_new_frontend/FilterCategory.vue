<template>
  <div class="category-wrapper">
    <ul class="table-tree" style="padding-left:0px;">
      <tree-node
        v-for="value in categories"
        :node="value"
        :title-categories="titleCategories"
        :key="value?.id"
      />
    </ul>


  </div>
</template>

<script>
  import util from '@/mixin/util'
  import TreeNode from "./TreeNode";

    export default {
      name: "FilterCategory",
      props: {
        titleCategories: {
            type: String,
            default: ''
        },
        categories: {
          type: Array,
           default: () => []
        },
      },
      data() {
        return {

        }
      },
      components: {
        TreeNode
      },
      mixins: [util],
      computed: {
        categorySlug(){
          return this.$route.params?.category || null
        },
      },
      mounted() {
      },
      methods: {

      },
    }
</script>

<style scoped>

</style>
