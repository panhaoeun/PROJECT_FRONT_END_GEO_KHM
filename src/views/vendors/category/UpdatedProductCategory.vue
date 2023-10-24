qµ˜÷<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-xl section section-title:before">Update Category</h2>
            <el-button class="btn btn-primary" type="info" size="large" @click.prevent="$router.push('/vendor/products/category/list')">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{$t("route.routeBack")}}</span>
                </div>
            </el-button>
        </div>
        <!--Create Products-->
        <el-card class="box-card px-6 py-6">
            <!-- Toast Alert -->
            <Toast />
            <!-- Tabs -->
            <el-tabs v-model="activeName" class="demo-tabs text-xl">
                <form enctype="multipart/form-data" @submit.prevent="handleCategoryUpdated()" class="py-4">
                    <el-tab-pane label="English(EN)" name="english-tabs">
                        <!-- English -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                    <div class="col-12 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Category Name (Eng)<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Name" type="text" class="py-3 text-sm  border-round-lg"
                                                v-model="dataCatEdit.catNameEn"/>
                                        </div>
                                    </div>
                                    <!-- Editor -->
                                    <div class="col-12 field">
                                        <Editor v-model="proCategoryDesEng" placeholder="Descriptions *"
                                            editorStyle="height: 320px"  class="text-xl"/>
                                    </div>
                                    <div class="col-12 field">
                                        <!--Category Logo -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Category Logo <span class="p-error">*</span> </label>
                                            <!-- Upload Files -->
                                            <el-upload 
                                                    action="#" 
                                                    list-type="picture-card" 
                                                    :on-preview="handlePictureCardPreviewUpdate"
                                                    :on-remove="handleRemoveCat" 
                                                    :auto-upload="false" 
                                                    accept=".jpg, .png, .jpeg"
                                                    :on-change="handleChangeUpdateCat" 
                                                    :class="objClassUpdateCat"
                                                    :file-list="fileListCat" 
                                                    ref="fileUpload"
                                                    :limit="1"
                                                    >
                                                <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                            </el-upload>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


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
                                            <label for="proKh" class="text-sm">Category Name (KH) <span class="p-error">*</span> </label>
                                            <InputText id="proKh" placeholder="Name" type="text" class="py-3 text-sm  border-round-lg"
                                                v-model="dataCatEdit.catNameKh" />
                                        </div>
                                    </div>
                                    <!-- Editor -->
                                    <div class="col-12 field">
                                        <Editor v-model="proCategoryDesEng" placeholder="Descriptions *"
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
import ProductCategoriesServices from "../../../services/vendors/product_categories/ProductsCategoriesServices";
import { ElMessage } from 'element-plus';

export default {
    setup: () => ({ v$: useVuelidate() }),
    created() {
        this.proCategoryService = new ProductCategoriesServices()
    },
    //Validations
    validations() {
        return {
            proCategoryNameEng: {
                required,
                minLength: minLength(3)
            }
        }
    },
    data() {
        return {
            activeName: 'english-tabs',
            activetab: 1,
            preview: null,
            image: null,
            proCategoryNameEng: '',
            proCategoryNameKh: '',
            proCategoryDesEng: '',
            proCategoryDesKh: '',
            isProcessingSubmit: false,
            message_pro_type: [],
            messages: [],
            submitted: false,
            loading: [false, false, false],
            //Upload Files
            fileListCatUpdated: '',
            fileListCat: [],
            fileUpload: '',
            dataCatEdit: {
                catNameEn: '',
                catNameKh: '',
                catLogo: ''
            },
            objClassUpdateCat: {
                upLoadShowCat: true,
                upLoadHideCat: false,
            },
            dataCatEditUpdated: null,
            notifmsgCatUpdated: ''
        }
    },
    mounted() {
        this.editDataCategories(this.$route.params.id);
    },
    components() {
        Plus
    },
    methods: {
        async reListProductCat(logoCat){
            const productImg = `${this.ENV_HOST_PATH_FILE}uploads/${logoCat}`;
            // Push Thumbnail
            this.fileListCat.push({
                name: logoCat ? logoCat :  '',
                url: productImg
            });
        },
        // Show Category Data
        async editDataCategories(id){
            this.proCategoryService.editedProCategory(id)
                .then((data) => {
                    try {
                        const { catNameEn, catNameKh, catLogo }= data.data?.data;
                        this.dataCatEditUpdated = data.data.data;
                        this.dataCatEdit.catNameEn = catNameEn;
                        this.dataCatEdit.catNameKh = catNameKh;
                        this.reListProductCat(catLogo);
                    } catch (error) {
                       ElMessage.error(error);
                    }
                }
            );
        },
        async handleCategoryUpdated() {
            try {
                this.submitted = true;
                const dataUpdateCat = {
                    proCategoryEng: this.dataCatEdit.catNameEn,
                    productCategorykh: this.dataCatEdit.catNameKh,
                    file: this.fileUpload
                }
                this.proCategoryService.updateProCategory(dataUpdateCat, this.$route.params.id).then(response => {
                    if (response.data.success == true) {
                        ElMessage.success(response.data.message);
                        // Push Router
                        this.$router.push("/vendor/products/category/list");
                    }
                }).catch((error) => {
                    // this.no
                     this.$notify.error({
                        title: 'Unsuccessfully updated category',
                        message: error.response.data.error.message ?? 'Unsuccessfully updated category',
                        showClose: false
                    });  
                    if(error.response.data.error.error.errors){
                        for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                            const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                            this.$notify.error({
                                title: 'Unsuccessfully updated category',
                                message: messageValidation ?? 'Unsuccessfully updated category',
                                showClose: true
                            });   
                        }
                    } 
                });
            }catch(error){
                ElMessage.error(error);
            }
        },
        resetForm() {
            this.proCategoryNameEng = '',
            this.proCategoryNameKh = '',
            this.submitted = false
        },
       //============Uploads Files================
        handleChangeUpdateCat(file) {
            this.fileUpload = file.raw;
            //Check Upload File
            this.beforeAvatarUpload(file.raw);
            this.objClassUpdateCat.upLoadHideCat = true;//上传图片后置upLoadHideCat为真，隐藏上传框
            this.objClassUpdateCat.upLoadShowCat = false;
        },
        handleRemoveCat(file, fileListCatUpdated) {
            console.log(file, fileListCatUpdated)
            this.objClassUpdateCat.upLoadShowCat = true;//删除图片后显示上传框
            this.objClassUpdateCat.upLoadHideCat = false;
        },
        // 点击预览图的放大按钮后会触发handlePictureCardPreviewUpdate
        handlePictureCardPreviewUpdate(file) {
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
    }
}
</script>