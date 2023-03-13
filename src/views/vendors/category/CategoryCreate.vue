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
                     <form @submit.prevent="handleCategorySubmit(!v$.$invalid)">
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
                                                    <InputText id="product_name" placeholder="Name" type="text" class="py-4" v-model="v$.proCategoryNameEng.$model" :class="{ 'p-invalid p-error': v$.proCategoryNameEng.$invalid && submitted }"/>
                                                    <small v-if="(v$.proCategoryNameEng.$invalid && submitted) || v$.proCategoryNameEng.$pending.$response" class="p-error">{{ v$.proCategoryNameEng.required.$message.replace('Value', 'Name') || v$.proCategoryNameEng.$params.min }}</small>
                                                </div>
                                            </div>
                                            <!-- Editor -->
                                            <div class="col-12 field">
                                                <Editor v-model="proCategoryDesEng" placeholder="Descriptions *" editorStyle="height: 320px" />
                                            </div>
                                            <div class="col-12 field">
                                                <!--Category Logo -->
                                                <div class="field">
                                                    <label for="name_en">Category Logo <span class="p-error">*</span> </label>
                                                    <!-- Upload Files -->
                                                    <el-upload
                                                        class="avatar-uploader"
                                                        action="https://jsonplaceholder.typicode.com/posts/"
                                                        :show-file-list="false"
                                                        :on-success="handleAvatarSuccess"
                                                        :before-upload="beforeAvatarUpload">
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
                                                <InputText id="proKh" placeholder="Name" type="text" class="py-4" v-model="proCategoryNameKh" />
                                            </div>
                                        </div>
                                        <!-- Editor -->
                                        <div class="col-12 field">
                                            <Editor v-model="proCategoryDesEng" placeholder="Descriptions *" editorStyle="height: 320px" />
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </el-tab-pane>
                          <!-- Button Submit -->
                        <div class="flex justify-content-between gap-3 float-right px-4 py-4">
                            <Button label="Submit" icon="pi pi-check" class="p-button-lg py-4 px-16" type="submit"></Button>
                        </div>
                    </form>
                </el-tabs>
            </el-card>
      </div>
  </template>
  
  <!-- Scripts Category -->
  <script>
    import { Plus } from '@element-plus/icons-vue';
    import { required,minLength} from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    import ProductCategoriesServices from "../../../services/vendors/product_categories/ProductsCategoriesServices";

    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return{
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
                imageUrl: ''
            }
        },
        components() {
            Plus
        },  
        created(){
            this.proCategoryService = new ProductCategoriesServices()
        },
        //Validations
        validations(){
            return {
                proCategoryNameEng: {
                    required,
                    minLength: minLength(3)
                }
            }
        },
        methods: {
           async handleCategorySubmit(isFormValidCategorySub){
                try{
                       
                    // console.log(this.v$.proCategoryNameEng.required.$message.replace('Val)
                        this.submitted = true;
                        if(!isFormValidCategorySub){
                            return;
                        }
                        if(!this.proCategoryNameEng != "" || this.proCategoryNameEng !== null){
                            // Data Response
                            const dataProCategory = {
                                proCategoryEng : this.proCategoryNameEng,
                                productCategorykh: this.proCategoryNameKh,
                            };
                            this.proCategoryService.createProCategory(dataProCategory).then((response) => {
                                console.log(dataProCategory,response)
                                if(response.data.status === true){
                                    this.$toast.add({severity:'success', summary: 'Success Message', detail:response.data.message, life: 3000});
                                    // Push Router
                                    this.$router.push("/vendor/products/category/list");    
                                }
                            })
                            .catch(error => {
                                console.log(error)
                                if(error.response.status == '401'){
                                    //  Toast Alert 
                                    this.message_pro_type = [
                                        {severity: 'error', content: error.response.data.error},
                                    ]
                                    this.$toast.add({severity:'error', summary: error.response.data.message, detail:error.response.data.error, life: 3000});
                                }
                            
                            });
                        }        
                }catch(error){
                        //  Toast Alert 
                        this.message_pro_type = [
                            {severity: 'error', content: error},
                        ]
                }
            },
            resetForm(){
                this.proCategoryNameEng = '',
                this.proCategoryNameKh = '',
                this.submitted =  false
            },
            //============Uploads Files================
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
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
}
</style>