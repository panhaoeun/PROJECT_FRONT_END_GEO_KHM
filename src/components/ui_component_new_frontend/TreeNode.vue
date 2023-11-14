<template>
  <li class="tree-node">
    <span class="node-data"> 
      <router-link
        class="text-black font-bold"
        :to="allCategoryLink(node)"
        :title="titleCategories"
      >
         {{ titleCategories }}
      </router-link>
    </span>
    <!-- Tree node -->
    <ul  v-for="childNode in node" :key="childNode">
        <li class="tree-node">
            <span class="node-data">
                <router-link
                    :to="allSubCategoryLink(childNode)"
                    class="text-gray">
                    {{ childNode?.catNameEn }}
                </router-link>
            </span>
        </li>
    </ul>
  </li>
</template>

<script>
  import util from '@/mixin/util'

  export default {
    name: 'TreeNode',
    components: {},
    props: {
        titleCategories: {
            type: String,
            default: ''
        },
        node: {
            type: Object,
            required: true,
        }
    },
    data() {
      return {
      };
    },
    mixins: [util],
    methods: {
    },
    computed: {
      nodeData(){
        return this.node[this.keyName]
      },
    }

  }
</script>
