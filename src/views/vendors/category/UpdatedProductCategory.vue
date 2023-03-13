<template>
    <div class="layout-content">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-3xl section section-title:before">Edit Category</h2>
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
                <form @submit.prevent="handleCategoryUpdated(!v$.$invalid)" class="py-4">
                    <el-tab-pane label="English(EN)" name="english-tabs">
                        <!--Form Submitted-->

                        <!-- English -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                    <div class="col-12 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en">Category Name (Eng)<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Name" type="text" class="py-4 text-xl"
                                                v-model="dataCatEdit.CatNameEn"/>
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
                                            <label for="name_en">Category Logo <span class="p-error">*</span> </label>
                                            <!-- Upload Files -->
                                            <el-upload class="avatar-uploader"
                                                action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
                                                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                                <img v-if="imageUrl" :src="imageUrl" id="avatar">
                                                <i v-else class="el-icon-plus avatar-uploader-icon pi pi-plus"></i>
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
                                            <InputText id="proKh" placeholder="Name" type="text" class="py-4 text-xl"
                                                v-model="dataCatEdit.CatNameKh" />
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
                    <!-- Button Submit -->
                    <div class="flex justify-content-between gap-3 float-right px-2 py-2">
                        <Button label="Submit" icon="pi pi-check" class="p-button-lg" type="submit"></Button>
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
            submitted: false,
            message_pro_type: [],
            messages: [],
            loading: [false, false, false],
            //Upload Files
            imageUrl: '',
            dataCatEdit: {}
        }
    },
    components() {
        Plus
    },
    created(){
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
    mounted() {   
        this.proCategoryService.editedProCategory(this.$route.params.id)
            .then((data) => {
                try{
                    this.dataCatEdit =  data.data.data;
                }catch(error){
                    console.log(error)
                }
            }
        );
    },
    methods: {
        // Show Category Data
        async showCatData(){

        },
        async handleCategoryUpdated() {
            try {
                const dataUpdateCat = {
                    proCategoryEng: this.dataCatEdit.CatNameEn,
                    productCategorykh: this.dataCatEdit.CatNameKh,
                }
                this.proCategoryService.updateProCategory(dataUpdateCat, this.$route.params.id).then(response => {
                    if(response.data.status == true){
                        this.$toast.add({ severity: 'info', summary: 'Info', detail: response.data.message, life: 5000 });
                    }
                }).catch((error) => {
                    if(error.response.data.status == false){
                        this.$toast.add({ severity: 'error', summary: error.response.data.message, detail: error.response.data.error, life: 5000 });
                    }   
                });
            }catch(error){
                console.log("sadsad")
                console.log(error);
            }
        },
        resetForm() {
            this.proCategoryNameEng = '',
            this.proCategoryNameKh = '',
            this.submitted = false
        },
        //============Uploads Files================
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('Avatar picture must be JPG format!');
            }
            if (!isLt2M) {
                this.$message.error('Avatar picture size can not exceed 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>
  
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 300px;
    line-height: 300px;
    text-align: center;
}

#avatar {
    width: 300px;
    height: 300px;
    display: block;
}</style>