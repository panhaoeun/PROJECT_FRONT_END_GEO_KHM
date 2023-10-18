<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-3xl section section-title:before">Edit My Shop</h2>
            <el-button type="info" size="large" @click.prevent="$router.push('/vendor/sellers/shop/my_shop_vendor')">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">BACK</span>
                </div>
            </el-button>
        </div>
        <!--Create Products-->
        <el-card class="box-card px-6 py-6">
            <!-- Toast Alert -->
            <Toast />
            <!-- Tabs -->
            <el-tabs v-model="activeName" class="demo-tabs text-xl">
                <form enctype="multipart/form-data" @submit.prevent="handleCategorySubmit(!v$.$invalid)">
                    <!--Form Submitted-->
                   <Message severity="error" v-for="(errorArray, index) in notifmsg" :key="index">
                        {{ errorArray }} 
                   </Message>
                    <el-tab-pane label="English(EN)" name="english-tabs">
                        <!-- English -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                    <div class="col-12 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en">Shop Name (Eng)<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Name" type="text" class="py-3 border-round-lg"
                                                v-model="updateMyShopArrDataShop.shop_eng" />
                                        </div>
                                    </div>
                                    <!--=========User Address===========-->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en">Building Address<span class="p-error">*</span></label>
                                            <InputText 
                                                id="userAddress01" 
                                                placeholder="Building Address" 
                                                type="text"
                                                class="py-3 border-round-lg" v-model="updateMyShopArrDataLocation.buildingAddress" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en">Address 01<span class="p-error">*</span></label>
                                            <InputText 
                                                id="userAddress01" 
                                                placeholder="Address 01" 
                                                type="text"
                                                class="py-3 border-round-lg" v-model="updateMyShopArrDataLocation.shopAddr01" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en">Address 02<span class="p-error">*</span></label>
                                            <InputText 
                                                id="userAddress02" 
                                                placeholder="Address 02" 
                                                type="text"
                                                class="py-3 border-round-lg" v-model="updateMyShopArrDataLocation.shopAddr02" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en">City<span class="p-error">*</span></label>
                                            <InputText 
                                                id="userAddrCity" 
                                                placeholder="City" 
                                                type="text"
                                                class="py-3 border-round-lg" v-model="updateMyShopArrDataLocation.shop_city" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en">Zip Code<span class="p-error">*</span></label>
                                            <InputText 
                                                id="userAddrZipCode" 
                                                placeholder="Zip Code" 
                                                type="text"
                                                class="py-3 border-round-lg" v-model="updateMyShopArrDataLocation.shop_zipcode" />
                                        </div>
                                    </div>
                                <!--=========User Address===========-->
                                    <!-- Editor -->
                                    <div class="col-12 field">
                                        <Editor v-model="updateMyShopArrDataLocation.shopLocationNoted" placeholder="Descriptions *"
                                            editorStyle="height: 320px" />
                                    </div>
                                    <!-- Logo -->
                                    <div class="col-12 field">
                                        <!--Category Logo -->
                                        <div class="field">
                                            <label for="name_en">Shop Logo <span class="p-error">*</span> </label>
                                            <!-- Upload Files -->
                                            <div>
                                                <el-upload action="#" 
                                                    list-type="picture-card" 
                                                    :on-preview="handlePictureCardPreview"
                                                    :on-remove="handleRemove" 
                                                    :show-file-list="true"
                                                    :auto-upload="false"
                                                    :on-change="handleChange" 
                                                    accept=".jpg, .png, .jpeg"
                                                    :class="objClass"
                                                    :file-list="fileShopLogoList" 
                                                    v-model="file"
                                                    ref="file"
                                                    :limit="1">
                                                    <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                    <!-- Preview Image -->
                                                    <el-dialog v-model="dialogVisible">
                                                        <img w-ful class="w-full" :src="this.dialogImageUrl"
                                                            alt="Preview Image" />
                                                    </el-dialog>
                                                </el-upload>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Banner -->
                                    <div class="col-12 field">
                                        <div class="field">
                                            <label for="name_en">Shop Banner <span class="p-error">*</span> </label>  
                                            <el-upload action="#" 
                                                    list-type="picture-card" 
                                                    :on-preview="handlePictureCardPreviewBanner"
                                                    :on-remove="handleRemoveBannerShop" 
                                                    :show-file-list="true"
                                                    :auto-upload="false"
                                                    :on-change="handleChangeShopBanner" 
                                                    accept=".jpg, .png, .jpeg"
                                                    :class="objClassBannerShop"
                                                    :file-list="fileShopLogoList" 
                                                    v-model="fileShopBanner"
                                                    ref="fileShopBanner"
                                                    :limit="1">
                                                    <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                    <!-- Preview Image -->
                                                    <el-dialog v-model="dialogImageUrlBanner">
                                                        <img w-ful class="w-full" :src="dialogVisibleBanner"
                                                            alt="Preview Image" />
                                                    </el-dialog>
                                                </el-upload>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!--Tab Panel KHMER-->
                    </el-tab-pane>
                    <el-tab-pane label="Khmer(KH)" name="khmer-tab">
                        <!-- Khmer -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                    <div class="col-12 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="proKh">Shop Name (KH) <span class="p-error">*</span> </label>
                                            <InputText id="proKh" placeholder="Name" type="text" class="py-3 border-round-lg"
                                                v-model="updateMyShopArrDataShop.shop_kh" />
                                        </div>
                                    </div>
                                    <!-- Editor -->
                                    <div class="col-12 field">
                                        <Editor v-model="editMyShopDesEng" placeholder="Descriptions *"
                                            editorStyle="height: 320px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!-- Buttons Submits -->
                    <div class="col-12 flex justify-content-end mt-4">
                        <!--Buttons-->
                        <Button icon="pi pi-check" 
                            type="submit"
                            :disabled="isProcessingSubmit" :label='isProcessingSubmit ? "Process..." : "Save"'
                            class="p-button-lg py-3 p-button-outlined w-10rem mr-3" />
                    </div>
                </form>
            </el-tabs>
        </el-card>
    </div>
</template>
  
  <!-- Scripts Category -->
<script>
import { Plus } from '@element-plus/icons-vue';
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
  import ShopManagementsServices from '../../../services/vendors/shop_management/ShopManagementInforServices';
import { ElMessage } from 'element-plus';
// import axios from 'axios';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            activeName: 'english-tabs',
            activetab: 1,
            preview: null,
            image: null,
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
            myShopEditNameEng: '',
            proCategoryNameKh: '',
            editMyShopDesEng: '',
            proCategoryDesKh: '',
            proCatImgFileURL: null,
            submitted: false,
            message_pro_type: [],
            showUpload: true,
            messages: [],
            loading: [false, false, false],
            //Upload Files
            imageUrl: '',
            fileList: [],
            objClass: {
                upLoadShow: true,
                upLoadHide: false,
            },
            objClassBannerShop: {
                upLoadShoBanner: true,
                upLoadHideBanner: false,
            },
            fromList: {
                myShopEditNameEng: '',
                file: null,
            },
            file: null,
            notifmsg: '',
            updateMyShopArrDataShop: [],
            updateMyShopArrDataLocation: [],
            fileShopLogoList: [],
            fileShopBannerList: [],
            fileLogoRef: null,
            dialogImageUrl: null,
            dialogVisible: false,
            dialogImageUrlBanner: null,
            dialogVisibleBanner: false,
            fileShopBanner: null
        }
    },
    components() {
        Plus
    },
    created() {
        this.shopMGServices = new ShopManagementsServices();
    },
    mounted(){
        const myShopByVendor = new ShopManagementsServices();
        myShopByVendor.myShopByID().then((shop) => {
           if (!Array.isArray(shop) || !shop.length > 0) {
                this.updateMyShopArrDataShop = [];
                this.updateMyShopArrDataLocation = [];
            }
            if (!Array.isArray(shop) || shop !== undefined || shop !== null) {
                this.updateMyShopArrDataShop = shop?.shop;
                this.updateMyShopArrDataLocation = shop?.location;
                // Logo Img
                this.reListShopLogo(this.updateMyShopArrDataShop?.shop_logo);
                this.reListShopBanner(this.updateMyShopArrDataShop?.sh_banner);
            }
           
        });
    },
    //Validations
    validations() {
        return {
            myShopEditNameEng: {
                required,
                minLength: minLength(3)
            }
        }
    },
    methods: {
        //============Uploads Files Logo================
        async reListShopLogo(logo){
             const shopLogoImg = `${this.ENV_HOST_PATH_FILE}uploads/sellers/shop_logo/${logo ? logo : ''}`;
            // Push Logo
            this.fileShopLogoList.push({
                name: logo ?logo :  '',
                url: shopLogoImg ? shopLogoImg : ''
            });
        },
        async reListShopBanner(banner){
            const shopBannerImg = `${this.ENV_HOST_PATH_FILE}uploads/sellers/shop_banner/${banner ? banner : ''}`;
            // Push Banner
            this.fileShopBannerList.push({
                name: banner ? banner :  '',
                url: shopBannerImg ? shopBannerImg : ''
            });
        },
        handleChange(file) {
            this.file = file.raw;
            //Check Upload File
            this.beforeAvatarUpload(file.raw);
            this.objClass.upLoadHide = true
            this.objClass.upLoadShow = false;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
            this.objClass.upLoadShow = true;
            this.objClass.upLoadHide = false;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(rawFile) {
            if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
                ElMessage.error('Picture must be JPG or PNG format!')
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error('Picture size can not exceed 2MB!');
                return false
            }
            return true
        },
        // =====Shop Banner========
        handlePictureCardPreviewBanner(file){
            this.dialogImageUrlBanner = file.url;
            this.dialogVisibleBanner = true;
        },
        handleRemoveBannerShop(){
            this.objClassBannerShop.upLoadShoBanner = true;
            this.objClassBannerShop.upLoadHideBanner = false;
        },
        handleChangeShopBanner(file) {
            this.fileShopBanner = file.raw;
            //Check Upload File
            this.beforeAvatarUpload(file.raw);
            this.objClassBannerShop.upLoadShoBanner = false;
            this.objClassBannerShop.upLoadHideBanner = true;
        },
        async handleCategorySubmit(isFormValidCategorySub) {
            try {
                this.submitted = true;
                if (!isFormValidCategorySub) {
                    ElMessage.error('Name is required!');
                    return;
                }
                if (!this.myShopEditNameEng != "" || this.myShopEditNameEng !== null) {
                    // Data Response
                    const data = {
                        productCatEng: this.myShopEditNameEng,
                        file: this.file,
                    }
                    this.proCategoryService.createProCategory(data).then((response) => {
                        if(response.data.success == true){
                            ElMessage.success(response.data.message);
                            // Push Router
                            this.$router.push("/vendor/sellers/shop/my_shop_vendor");
                        }
                    })
                    .catch(error => {
                        this.notifmsg = error.response.data;
                        return false;
                    });
                }
            } catch (error) {
                //  Toast Alert 
               ElMessage.error(error);
            }
        },
        resetForm() {
            this.myShopEditNameEng = '',
            this.proCategoryNameKh = '',
            this.submitted = false
        },
    }
}
</script>
  
<style>
/* Shop */
.upLoadShow .el-upload {
    width: 20rem !important;
    height: 20rem !important;
    line-height: 20rem !important;
}
.upLoadHide .el-upload-list--picture-card .el-upload-list__item {
    width: 20rem !important;
    height: 20rem !important;
    line-height: 20rem !important;
}
.upLoadHide .el-upload {
    display: none;
}
/* Banner */
.upLoadShoBanner .el-upload {
    width: 20rem !important;
    height: 20rem !important;
    line-height: 20rem !important;
}
.upLoadHideBanner .el-upload-list--picture-card .el-upload-list__item {
    width: 20rem !important;
    height: 20rem !important;
    line-height: 20rem !important;
}
.upLoadHideBanner .el-upload {
    display: none;
}
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}

</style>