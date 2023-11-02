<template>
  <div class="store-info">
    <div class="btn-wrap">
      <div class="w-100">
        <p class="store-name">{{store.shop_eng}}</p>
        <h6 class="store-date">Member since <b class="block">{{storeDate}}</b></h6>
      </div>

      <div class="action-btn">
        <slot
          name="followBtn"
        />

        <router-link
          class="visit-btn ajax-btn bg-red-500 font-bold text-white"
          :to="storeLink(store)"
        >
            Visit Store
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import moment from "moment";
  import util from "@/mixin/util";
//   import AjaxButton from "./AjaxButton";
//   import FollowBtn from "./FollowBtn";

  export default {
    name: 'StoreTile',
    data() {
      return {
        ajaxing: false
      }
    },
    components: {
    //   FollowBtn,
    //   AjaxButton
    },
    props: {
      store: {
        type: Object
      },
    },
    mixins: [util],
    computed: {
      storeDate(){
        return moment(this.store?.created_at).format('MMM DD, YYYY')
      },
    },
    methods: {
    },
    async mounted() {


    },
  }
</script>

<style>

</style>
