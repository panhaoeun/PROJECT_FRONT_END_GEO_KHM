<template>
   <div class="layout-content">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
                <h2 class="relative text-black text-3xl section section-title:before">Add Product</h2>
                <el-button type="info" size="large" @click.prevent="$router.push('/vendor/products/list')">
                    <div class="flex justify-between pl-2">
                        <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                        <span class="pl-2">BACK</span>
                    </div>
                </el-button>
        </div>
        <!-- Form Submited -->
       <form class="p-fluid" method="POST" enctype="multipart/form-data"  role="form">    
            <!-- Toast Alert -->
            <Toast />
            <!--Create Products-->
            <div class="card card px-6 py-6">
                <span class="block text-900 font-bold text-xl mb-4">Create Product</span>
                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">     
                    <div class="col-12 lg:col-12">
                    <!--==========Tabs===============-->
                    <el-tabs v-model="activeTabs" class="demo-tabs">
                        <!--============Tabs Panel of Eng ================-->
                        <el-tab-pane label="English(EN)" name="eng-tabs">
                            <!-- Form Layouts -->
                            <div class="grid formgrid">
                                <div class="col-12 field">
                                    <!-- Name Product -->
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Name (EN) <span class="p-error">*</span></label>
                                        <InputText id="product_name" placeholder="New Products"  v-model="v$.proNameEn.$model" :class="{ 'p-invalid p-inputtext-lg p-error': v$.proNameEn.$invalid && submitted }" type="text" class="text-xl"/>
                                         <small v-if="(v$.proNameEn.$invalid && submitted) || v$.proNameEn.$pending.$response" class="p-error text-lg">{{ v$.proNameEn.required.$message.replace('Value', 'Name') }}</small>
                                    </div>
                                </div>
                                <!-- Product Code -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Product Code</label>
                                        <InputText class="p-inputtext p-component text-xl" type="text" v-model="proCode" placeholder="Product Code" />
                                    </div>
                                </div>
                                <!-- Measure -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Measure</label>
                                        <InputText class="p-inputtext p-component text-xl" type="text" v-model="measureUnit" placeholder="Measure" />
                                    </div>
                                </div>
                                <!-- Discount Type  and Discount -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Discount</label>
                                        <InputText class="p-inputtext p-component text-xl" type="text" v-model="discountNum" placeholder="Discount" />
                                    </div>
                                </div>
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="discountType" class="text-xl font-semibold">Discount Type</label>
                                        <Dropdown v-model="discountType" placeholder="Select Discount Type" optionLabel="disType"  class="text-xl" :options="disTypesOption" :showClear="true"/>
                                    </div>
                                </div>
                                <!-- Product Prices -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Unit Price</label>
                                        <InputNumber mode="decimal" placeholder="Unit Price" inputClass="text-xl"  v-model="v$.proUnitPice.$model" :class="{ 'p-invalid p-inputtext-lg p-error': v$.proUnitPice.$invalid && submitted }"/>
                                         <small v-if="(v$.proUnitPice.$invalid && submitted) || v$.proUnitPice.$pending.$response" class="p-error text-lg">{{ v$.proUnitPice.required.$message.replace('Value', 'Unit Price') }}</small>
                                    </div>
                                </div>
                                <!-- Product Qty -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Total Quality</label>
                                        <InputNumber mode="decimal" placeholder="Unit Price" inputClass="text-xl"  v-model="v$.proQty.$model" :class="{ 'p-invalid p-inputtext-lg p-error': v$.proQty.$invalid && submitted }"/>
                                         <small v-if="(v$.proQty.$invalid && submitted) || v$.proQty.$pending.$response" class="p-error text-lg">{{ v$.proQty.required.$message.replace('Value', 'Total Quantity') }}</small>
                                    </div>
                                </div>
                                <!-- Discount -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Discount</label>
                                        <InputNumber mode="decimal" placeholder="Unit Price" inputClass="text-xl"  v-model="proDiscount"/>
                                    </div>
                                </div>
                                <!-- Product Category -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Category</label>
                                        <Dropdown v-model="proCatID" placeholder="Select Category" class="text-xl" :showClear="true"/>
                                    </div>
                                </div>
                                <!-- Sub Category -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Sub Category</label>
                                        <Dropdown v-model="subCatID" placeholder="Select Sub Category" class="text-xl" :showClear="true"/>
                                    </div>
                                </div>
                                <!--========Variations=======-->
                                <div class="col-12 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Spec</label>
                                        <MazInputTags
                                            v-model="proSpectags"
                                            placeholder="Enter Spec"
                                            color="primary"
                                            class="text-xl"
                                            size="xl"
                                        />
                                    </div>
                                </div>
                        
                                <!-- Description Product -->
                                <div class="col-12 lg:col-12">
                                        <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Description (EN)</label>
                                        <Editor v-model="desProEn" editorStyle="height: 320px" class="text-xl"/>
                                    </div>  
                                </div>
                            </div> 
                             <!--=======Product Details=========-->
                            <div class="card  px-6 py-6 my-4">
                                <span class="block text-900 font-bold text-xl mb-4">Product Details</span>
                                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                                    <div class="col-12 lg:col-12">
                                        <!-- Form Layouts -->
                                        <div class="grid formgrid">
                                            <!-- Link Video -->
                                            <div class="col-12 lg:col-12">
                                                    <div class="field">
                                                    <label for="name_en" class="text-xl">Youtube Video Link</label>
                                                    <InputText id="product_name" placeholder="New Products" type="text" class="text-xl"/>
                                                </div>  
                                            </div>
                                            <!-- Upload Imag Multiple Product and Thumbnail -->
                                            <div class="col-12 lg:col-7 px-2 py-2">
                                                <div class="field card">
                                                    <label for="name_en" class="text-xl font-semibold">Upload Product Images <span class="">*</span> </label>
                                                    <!-- Upload Filed -->
                                                    <el-upload action="#" list-type="picture-card" 
                                                        :auto-upload="false" 
                                                        v-model="proImgMultiple"
                                                        accept="image/jpeg,image/png"
                                                        :on-change="handelOnChange"
                                                    >
                                                        <!-- Icons -->
                                                        <el-icon><Plus /></el-icon>
                                                        <!-- Files -->
                                                        <template #file="{ file }">
                                                            <div>
                                                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                                                <span class="el-upload-list__item-actions">
                                                                <span
                                                                    class="el-upload-list__item-preview"
                                                                    @click="handlePictureCardPreview(file)"
                                                                >
                                                                    <!-- Zoom In -->
                                                                    <el-icon><ZoomIn /></el-icon>
                                                                </span>
                                                                <span
                                                                    v-if="!disabled"
                                                                    class="el-upload-list__item-delete"
                                                                    @click="handleDownload(file)"
                                                                >
                                                                    <el-icon><Download /></el-icon>
                                                                </span>
                                                                <span
                                                                    v-if="!disabled"
                                                                    class="el-upload-list__item-delete"
                                                                    @click="handleRemove(file)"
                                                                >
                                                                    <el-icon><Delete/></el-icon>
                                                                </span>
                                                                </span>
                                                            </div>
                                                        </template>
                                                    </el-upload>
                                                        <!-- Preview Image -->
                                                        <el-dialog v-model="dialogVisible">
                                                            <img w-ful class="w-full" :src="this.dialogImageUrl" alt="Preview Image" />
                                                        </el-dialog>
                                                    </div> 
                                            </div>
                                            <!-- Upload Thumbnail -->
                                            <div class="col-12 lg:col-5 px-2 py-2">
                                                <div class="field card">
                                                    <label for="name_en" class="text-xl font-semibold">Upload Thumbnail <span>*</span></label>
                                                    <el-upload
                                                            class="avatar-uploader"
                                                            action=""
                                                            :show-file-list="false"
                                                            :on-success="handleAvatarSuccess"
                                                            :before-upload="beforeAvatarUpload"
                                                            v-model="proProThumbnail"
                                                        >
                                                            <img v-if="this.imageUrl" :src="this.imageUrl" class="avatar" />
                                                            <el-icon v-else class="avatar-uploader-icon">
                                                                <Plus />
                                                            </el-icon>
                                                    </el-upload>
                                                </div>  
                                            </div>

                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <!--=========Tab Panel of Kh =============-->
                        <el-tab-pane label="Khmer(KH)" name="kh-tabs">
                            <div class="grid formgrid">
                                <!-- Product Name -->
                                <div class="col-12 field">
                                    <!-- Name Product KH -->
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Name (KH)</label>
                                        <InputText id="product_name" v-model="proNameKh" placeholder="New Products" type="text" class="text-xl font-semibold"/>
                                    </div>
                                </div>
                                <!-- Descriptions KH-->
                                <div class="col-12 lg:col-12">
                                        <div class="field">
                                            <label for="name_en" class="text-xl font-semibold">Description (KH)</label>
                                            <Editor v-model="proDesKh" editorStyle="height: 320px"/>
                                        </div>  
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <!--==========Tabs===============-->
                    </div>
                </div>
                <!-- Buttons Submits -->
                <div class="col-12 flex justify-content-end mt-4">
                    
                    <!--Buttons-->
                    <Button icon="pi pi-times"
                        @click.prevent="submitFormProCreate(!v$.$invalid)"
                        :disabled="isProcessingSubmit" :label='isProcessingSubmit ? "Process..." : "Save"'
                        class="p-button-lg py-3 p-button-outlined w-10rem mr-3" />
                    <Button label="Save" icon="pi pi-check" class="p-button-lg py-3 w-10rem" onclick=""/>
                </div>
            </div>
        </form>
   </div>
</template>

<!-- Script Product Create  -->
<script>
    import ProductServices from "../../../services/vendors/products/ProductServices";
    import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue';
    import { ElMessage } from 'element-plus';
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';
    // import LoadingButton from '../../../components/buttons/LoadingButton.vue';
    export default {
        setup() {
          return { v$: useVuelidate() }
        },
        components:{
            Plus,
            ZoomIn,
            Download,
            Delete,
            // LoadingButton
        },
        created() {
            this.productSerClass = new ProductServices();
        },
        validations() {
            return {
                proNameEn: { required },
                proUnitPice: {required},
                proQty: {required},
            }
        },  
        data() {
            return {
                // Form Submits
                proNameEn: '',
                imagFilesList: [],
                proCode: '',
                submitted: false,
                proSpectags: '',
                proCatID : '',
                subCatID : '',
                desProEn : '',
                proImgMultiple : '',
                proProThumbnail : '',
                proNameKh : '',
                proDesKh : '',
                proUnitPice: '',
                proQty: '',
                measureUnit: '',
                proDiscount: '',
                isProcessingSubmit: false,
                discountNum: '',
                discountType: null,
                //Active Tabs
                activeTabs: 'eng-tabs',
                active: 2,
                //Upload Files  
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                imageUrl: '',
                disTypesOption: [
                    { id: 1,disType: 'Flat'},
                    { id: 2, disType: 'Percent' },
                ]
            }
        },
        methods: {
            //============Upload Files Multiple===========
            handlePictureCardPreview(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file){
               console.log(file)
            },
            handleRemove(file,fileList){
                console.log(file, fileList)
            },
            handelOnChange(file){
                const isLt100M = file.zize /1024 / 1024 < 1024;
                if(!isLt100M){
                    console.log("Error")
                }  
            },
            //============Upload Files Single===========
            beforeAvatarUpload(rawFile){
                if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg') {
                    ElMessage.error('Product picture must be JPG/PNG format!')
                    return false;
                }else if(rawFile.size / 1024 / 1024 > 2){
                    ElMessage.error('Avatar picture size can not exceed 2MB!')
                    return false
                }
                return true;
            },
            handleAvatarSuccess(response, uploadFile){
                 this.imageUrl = URL.createObjectURL(uploadFile.raw);
                 console.log(this.imageUrl)
            },
            //========Form Submit===========
            submitFormProCreate(isFormValid){
                this.submitted = true;
                if (!isFormValid) {    
                    return;
                }
                if(!this.proNameEng || !this.proUnitPice){
                    this.isProcessingSubmit = true;
                    const dataPro = {
                            proCategoryID: 1,
                            proTypeID: 1,
                            proUnit: "kg",
                            proNameEng: this.proNameEn,
                            proNameKh: this.proNameKh,
                            productSpec: this.proSpectags,
                            proUnitPrice: this.proUnitPice,
                            proQty: this.proQty,
                            proDiscount: this.proDiscount,
                            proAvailableNum: "10",
                            proDiscountType: "percent",
                            proDesEng: this.desProEn,
                            proDesKh: this.proDesKh,
                            createdBy: 1,
                            createdDate: "2023-02-24",
                            proImg: "image.png",
                            proThumbnail: "image.png",
                            proVideo: ""
                    }
                    this.productSerClass.createProduct(dataPro).then((response) => { 
                    if (response.data.status === true) {
                         this.submitted = true;
                         this.isProcessingSubmit = true;
                            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: response.data.message, life: 3000 });
                            // Push Router
                            setTimeout(() => {
                                this.isProcessingSubmit = false;
                                this.$router.push("/vendor/products/list");
                            }, 3000);
                        }
                     })
                    .catch(error => {
                        console.log(error)
                        if (error.response.status == '401') {
                            //  Toast Alert 
                            this.message_pro_type = [
                                { severity: 'error', content: error.response.data.error },
                            ]
                            this.$toast.add({ severity: 'error', summary: error.response.data.message, detail: error.response.data.error, life: 3000 });
                        }

                    });
                }
            },
            resetForm(){
                this.proCode = '';
                this.submitted = false;
                this.isProcessingSubmit = false;
            }
        }
    }
</script>


<!-- Config Style -->
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
/* Multiple Upload File */
.el-upload.el-upload--picture-card{
  width: 200px;
  height: 200px;
  text-align: center;
}
/* Single Upload File */
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    padding: 10px;
}
.el-upload-list--picture-card .el-upload-list__item{
    width: 200px;
    height:200px;
}
.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 180px;
    text-align: center;
}
</style>