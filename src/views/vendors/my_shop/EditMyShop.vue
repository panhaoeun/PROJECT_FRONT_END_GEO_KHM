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
                                    <div class="col-12 col-lg-6 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en">Shop Name (Eng)<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Name" type="text" class="py-3 border-round-lg"
                                                v-model="updateMyShopArrDataShop.shop_eng" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-6 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en">Shop Type<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Name" type="text" class="py-3 border-round-lg"
                                                v-model="updateMyShopTypeArrDataShop.shopEn" />
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
                                            <label for="name_en">Shop Logo (500 x 500 px)<span class="p-error">*</span> </label>
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
                                                    :on-exceed="handleExceedEditShop" 
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
                                            <label for="name_en">Shop Banner (9000 x 3000px) <span class="p-error">*</span> </label>  
                                            <el-upload action="#" 
                                                    list-type="picture-card"
                                                    class="avatar-uploader-cover"
                                                    :on-preview="handlePictureCardPreviewBanner"
                                                    :on-remove="handleRemoveBannerShop" 
                                                    :show-file-list="true"
                                                    :auto-upload="false"
                                                    :on-change="handleChangeShopBanner" 
                                                    accept=".jpg, .png, .jpeg"
                                                    :on-exceed="handleExceedEditShop" 
                                                    :class="objClassBannerShop"
                                                    :file-list="fileShopBannerList" 
                                                    v-model="fileShopBanner"
                                                    ref="fileShopBanner"
                                                    :limit="1">
                                                    <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                    <!-- Preview Image -->
                                                    <el-dialog v-model="dialogVisibleBanner">
                                                        <img w-ful class="w-full" :src="dialogImageUrlBanner"
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
                                        <Editor v-model="updateMyShopArrDataShop.sh_noted" placeholder="Descriptions *"
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
            updateMyShopTypeArrDataShop: [],
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
                this.updateMyShopTypeArrDataShop = [];
            }
            if (!Array.isArray(shop) || shop !== undefined || shop !== null) {
                this.updateMyShopArrDataLocation = shop?.location;
                this.updateMyShopArrDataShop = shop?.shop;
                this.updateMyShopTypeArrDataShop = shop?.shopType;
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
        handleExceedEditShop(files, fileList) {
            this.$message.warning(
                `Currently, 01 pictures are limited to be selected.
                        This time, it is selected ${files.length} 
                        Pictures selected ${files.length + fileList.length
                } Pictures`
            );
        },
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
            let fileBuffer = Array.from(file);
            fileBuffer.splice(fileList, 1);
            this.file = null;
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
        handleRemoveBannerShop(file, fileList){
            let fileBuffer = Array.from(file);
            fileBuffer.splice(fileList, 1);
            this.fileShopBanner = null;

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
        // Updated My Shop
        async handleCategorySubmit(isFormValidCategorySub) {
            try {
                this.submitted = true;
                if (!this.myShopEditNameEng != "" || this.myShopEditNameEng !== null) {
                    // Data Response
                    const dataMyShopInfo = {
                        shopNameEng: this.updateMyShopArrDataShop?.shop_eng ? this.updateMyShopArrDataShop?.shop_eng : '',
                        shopNameKh: this.updateMyShopArrDataShop?.shop_kh ? this.updateMyShopArrDataShop?.shop_kh : '',
                        shopTypeNameEng: this.updateMyShopTypeArrDataShop?.shopEn ? this.updateMyShopTypeArrDataShop?.shopEn: '',
                        shopTypeNameKh: this.updateMyShopTypeArrDataShop?.shopKh ? this.updateMyShopTypeArrDataShop?.shopKh : '',
                        billingAddressShop: this.updateMyShopArrDataLocation?.buildingAddress ? this.updateMyShopArrDataLocation?.buildingAddress : '',
                        address01Shop: this.updateMyShopArrDataLocation?.shopAddr01 ? this.updateMyShopArrDataLocation?.shopAddr01 : '',
                        address02Shop: this.updateMyShopArrDataLocation?.shopAddr02 ? this.updateMyShopArrDataLocation?.shopAddr02 : '',
                        addressCityShop: this.updateMyShopArrDataLocation?.shop_city ? this.updateMyShopArrDataLocation?.shop_city : '',
                        addressZipShop: this.updateMyShopArrDataLocation?.shop_zipcode ? this.updateMyShopArrDataLocation?.shop_zipcode : '',
                        shopNoted: this.updateMyShopArrDataShop?.sh_noted ? this.updateMyShopArrDataShop?.sh_noted : '',
                        myShopLogo: this.file ? this.file : null,
                        myShopBanner: this.fileShopBanner ? this.fileShopBanner : '',
                    }
                    this.shopMGServices.updatedShopInformation(dataMyShopInfo).then(() => {
                        this.$notify.success({
                            title: 'Successful updated shop information',
                            showClose: true
                        });
                        // Push Router
                        this.$router.push("/vendor/sellers/shop/my_shop_vendor");
                    })
                    .catch(error => {
                        this.$notify.error({
                            title: 'Unsuccessfully updated shop information',
                            message: error.response.data.error?.message,
                            showClose: true
                        });  
                        if(error.response.data.error.error.errors){
                            for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                this.$notify.error({
                                    title: 'Unsuccessfully updated shop information',
                                    message: messageValidation ? messageValidation : '',
                                    showClose: true
                                });   
                            }
                        } 
                    });
                }
                // Validations
                if (!isFormValidCategorySub) {
                    return;
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
    aspect-ratio: 3/1;
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