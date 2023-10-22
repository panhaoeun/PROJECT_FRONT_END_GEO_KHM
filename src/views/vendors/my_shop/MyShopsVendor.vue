<template>
    <div class="px-4 py-">
     <b-row>
        <b-col lg="12">
            <b-card 
                header="My shop info"
            >
                <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="d-flex flex-wrap align-items-center">
                        <div class="px-2 py-2 profile-logo1">
                            <div class="flex-column justify-center align-items-center">
                                <Avatar
                                 :image="`${ENV_HOST_PATH_FILE}uploads/sellers/shop_logo/${myShopArrDataShop?.shop_logo}`"
                                 class="mr-4 flex align-items-center" style="width: 300px; height: 300px;" shape="circle" size="xlarge" />
                            </div>
                        </div>
                        <div class="flex-column align-items-center mb-3 mb-sm-0 px-2 py-2 my-2">
                            <p class="me-2 h3 mb-2">Shop Name :  {{ myShopArrDataShop?.shop_eng }}</p>
                            <span class="me-2 h5 mb-2">Shop Type :  {{ myShopArrDataShopType?.shopEn }}</span>
                            <div class="px-2 py-2"> 
                                Address :
                                <span>
                                    {{ myShopArrDataLocation?.shopAddr01}}
                                </span>, 
                               <span>
                                    {{ myShopArrDataLocation?.shopAddr02 }}
                               </span>,
                               <span>
                                 {{ myShopArrDataLocation?.shop_city }}
                               </span>,
                               <span>
                                 {{ myShopArrDataLocation?.shop_zipcode }}
                               </span>
                            </div>
                            <div class="d-flex align-items-center gap-3 px-2 py-2">
                                <router-link to="/vendor/sellers/shop/my_shop_vendor/edit_my_shop" class="text-center btn btn-primary d-flex gap-2">
                                <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                    Edit Shop
                                </router-link>
                            </div>
                        </div>
                    </div> 
                </div>
            </b-card>
        </b-col>
    </b-row>
   </div>
</template>

<!-- Script of JS -->
<script>
  import ShopManagementsServices from '../../../services/vendors/shop_management/ShopManagementInforServices';
  export default{
    data() {
        return {
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
            myShopArrDataShop: [],
            myShopArrDataLocation: [],
            myShopArrDataShopType: []
        }
    },
    created() {
        this.shopMGServices = new ShopManagementsServices();
    },
    mounted(){
        const myShopByVendor = new ShopManagementsServices();
        myShopByVendor.myShopByID().then((shop) => {
            console.log(shop)
            if (!Array.isArray(shop) || !shop.length > 0) {
                this.myShopArrDataShop = [];
                this.myShopArrDataShopType = [];
                 this.myShopArrDataLocation = [];
            }
            if (!Array.isArray(shop) || shop !== undefined || shop !== null) {
                this.myShopArrDataShop = shop?.shop;
                this.myShopArrDataShopType = shop?.shopType;
                this.myShopArrDataLocation = shop?.location;
            }
           
        });
    }
  }
</script>