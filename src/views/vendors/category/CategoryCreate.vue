<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-3xl section section-title:before">Add Category</h2>
            <el-button type="info" size="large" @click.prevent="$router.push('/vendor/products/category/list')">
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
                                            <label for="name_en">Category Name (Eng)<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Name" type="text" class="py-3"
                                                v-model="v$.proCategoryNameEng.$model"
                                                :class="{ 'p-invalid p-error': v$.proCategoryNameEng.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.proCategoryNameEng.$invalid && submitted) || v$.proCategoryNameEng.$pending.$response"
                                                class="p-error">{{ v$.proCategoryNameEng.required.$message.replace('Value',
                                                    'Name') || v$.proCategoryNameEng.$params.min }}</small>
                                        </div>
                                    </div>
                                    <!-- Editor -->
                                    <div class="col-12 field">
                                        <Editor v-model="proCategoryDesEng" placeholder="Descriptions *"
                                            editorStyle="height: 320px" />
                                    </div>
                                    <div class="col-12 field">
                                        <!--Category Logo -->
                                        <div class="field">
                                            <label for="name_en">Category Logo <span class="p-error">*</span> </label>
                                            <!-- Upload Files -->
                                            <el-upload action="#" 
                                                    list-type="picture-card" 
                                                    :on-preview="handlePictureCardPreview"
                                                    :on-remove="handleRemove" 
                                                    :auto-upload="false" :on-change="handleChange" 
                                                    :class="objClass"
                                                    :file-list="fileList" 
                                                    v-model="file"
                                                    ref="file"
                                                    :limit="1">
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
                                            <label for="proKh">Category Name (KH) <span class="p-error">*</span> </label>
                                            <InputText id="proKh" placeholder="Name" type="text" class="py-3"
                                                v-model="proCategoryNameKh" />
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
                        <Button icon="pi pi-times" class="p-button-lg py-3 w-10rem mr-3" label="Cancel" />
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
// import axios from 'axios';

export default {
    setup: () => ({ v$: useVuelidate() }),
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
            fromList: {
                proCategoryNameEng: '',
                file: null,
            },
            file: null,
            notifmsg: ''
        }
    },
    components() {
        Plus
    },
    created() {
        this.proCategoryService = new ProductCategoriesServices();
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
    methods: {
        //============Uploads Files================
        handleChange(file) {
            console.log(file)
            this.file = file.raw;
            //Check Upload File
            this.beforeAvatarUpload(file.raw);
            this.objClass.upLoadHide = true;//上传图片后置upLoadHide为真，隐藏上传框
            this.objClass.upLoadShow = false;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
            this.objClass.upLoadShow = true;//删除图片后显示上传框
            this.objClass.upLoadHide = false;
        },
        // 点击预览图的放大按钮后会触发handlePictureCardPreview
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
        uploadFile() {
            console.log(this.$refs.file.files[0])
            this.file = this.$refs.file.files[0];
            // this.createBase64Image(this.$refs.file.files[0]);
        },
        createBase64Image(fileObject) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.file = e.target.result;
            };
            reader.readAsDataURL(fileObject);
        },
        async handleCategorySubmit(isFormValidCategorySub) {
            try {
                // console.log(this.v$.proCategoryNameEng.required.$message.replace('Val)
                this.submitted = true;
                if (!isFormValidCategorySub) {
                    ElMessage.error('Name is required!');
                    return;
                }
                if (!this.proCategoryNameEng != "" || this.proCategoryNameEng !== null) {
                    // Data Response
                    const data = {
                        productCatEng: this.proCategoryNameEng,
                        file: this.file,
                    }
                    console.log(data)
                    this.proCategoryService.createProCategory(data).then((response) => {
                        if(response.data.success == true){
                            ElMessage.success(response.data.message);
                            // Push Router
                            this.$router.push("/vendor/products/category/list");
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        ElMessage.error(error);
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
            this.proCategoryNameEng = '',
            this.proCategoryNameKh = '',
            this.submitted = false
        },
    }
}
</script>
  
<style>
/*当upLoadShow为true时，启用如下样式，即上传框的样式，若为false则不启用该样式*/
.upLoadShow .el-upload {
    width: 20rem !important;
    height: 20rem !important;
    line-height: 20rem !important;
}

    /*当upLoadHide为true时，启用如下样式，即缩略图的样式，若为false则不启用该样式*/
.upLoadHide .el-upload-list--picture-card .el-upload-list__item {
    width: 20rem !important;
    height: 20rem !important;
    line-height: 20rem !important;
}
    /*当upLoadHide为true时，启用如下样式，即上传框的样式，若为false则不启用该样式*/
.upLoadHide .el-upload {
    display: none;
}
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}

</style>