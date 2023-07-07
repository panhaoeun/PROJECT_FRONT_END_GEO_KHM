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
       <form class="p-fluid" method="POST" enctype="multipart/form-data"  role="form" @submit.prevent="submitFormProCreate(!v$.$invalid)">    
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
                                <div class="col-6 field">
                                    <!-- Name Product -->
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Name (EN) <span class="p-error">*</span></label>
                                        <InputText id="product_name" placeholder="New Products"  v-model="v$.proNameEn.$model" :class="{ 'p-invalid p-inputtext-lg p-error': v$.proNameEn.$invalid && submitted }" type="text" class="text-xl"/>
                                         <small v-if="(v$.proNameEn.$invalid && submitted) || v$.proNameEn.$pending.$response" class="p-error text-lg">{{ v$.proNameEn.required.$message.replace('Value', 'Name') }}</small>
                                    </div>
                                </div>
                                <!-- Product Category -->
                                <div class="col-6 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Category</label>
                                        <select 
                                            class="form-select text-md p-dropdown-item  border-round-lg"
                                            v-model="v$.proCatID.$model"
                                            @click="getCategoriesSelect()">
                                            <option value="" disabled> Select an application</option>
                                            <option v-for="(result, index) in catSubListDropDownPro" 
                                                    :key="index" 
                                                    :value="result.catID" 
                                                class="p-dropdown-item">
                                                    {{ result.catNameEn }}    
                                            </option>  
                                        </select>
                                    </div>
                                </div>
                                <!-- Sub Product Category -->
                                <div class="col-6 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Sub Category</label>
                                        <select 
                                            class="form-select text-md p-dropdown-item  border-round-lg"
                                            v-model="v$.proCatID.$model"
                                            @click="getCategoriesSelect()">
                                            <option value="" disabled> Select an application</option>
                                            <option v-for="(result, index) in catSubListDropDownPro" 
                                                    :key="index" 
                                                    :value="result.catID" 
                                                class="p-dropdown-item">
                                                    {{ result.catNameEn }}    
                                            </option>  
                                        </select>
                                    </div>
                                </div>
                                <!-- Product Code -->
                                <div class="col-6 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">
                                            Product Code
                                            <span class="p-error">*</span>
                                            <span class="pl-2 underline text-blue-600 cursor-pointer disabled" @click="generateProductCode()">Generate Code</span>
                                        </label>
                                        <InputText class="p-inputtext p-component text-xl" type="text" v-model="proCode" placeholder="Product Code" />
                                    </div>
                                </div>
                                <!-- Measure -->
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Measure</label>
                                        <InputText class="p-inputtext p-component text-xl" type="text" v-model="measureUnit" placeholder="Measure" />
                                    </div>
                                </div>
                                <!-- Discount Type  and Discount -->
                                <!-- Discount -->
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Discount</label>
                                        <InputNumber mode="decimal" placeholder="Unit Price" inputClass="text-xl"  v-model="proDiscount"/>
                                    </div>
                                </div>
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="discountType" class="text-xl font-semibold">Discount Type</label>
                                        <Dropdown v-model="discountType" placeholder="Select Discount Type" optionLabel="disType"  class="text-xl p-1" :options="disTypesOption" :showClear="true"/>
                                    </div>
                                </div>
                                <!-- Product Prices -->
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Unit Price</label>
                                        <InputNumber mode="decimal" placeholder="Unit Price" inputClass="text-xl"  v-model="v$.proUnitPice.$model" :class="{ 'p-invalid p-inputtext-lg p-error': v$.proUnitPice.$invalid && submitted }"/>
                                         <small v-if="(v$.proUnitPice.$invalid && submitted) || v$.proUnitPice.$pending.$response" class="p-error text-lg">{{ v$.proUnitPice.required.$message.replace('Value', 'Unit Price') }}</small>
                                    </div>
                                </div>
                                <!-- Product Qty -->
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Total Quality</label>
                                        <InputNumber mode="decimal" placeholder="Unit Price" inputClass="text-xl"  v-model="v$.proQty.$model" :class="{ 'p-invalid p-inputtext-lg p-error': v$.proQty.$invalid && submitted }"/>
                                         <small v-if="(v$.proQty.$invalid && submitted) || v$.proQty.$pending.$response" class="p-error text-lg">{{ v$.proQty.required.$message.replace('Value', 'Total Quantity') }}</small>
                                    </div>
                                </div>
                                <!--========Variations Type of Spec - Start=======-->
                                <div class="col-12 field">
                                    <div class="field">
                                     <label for="name_en" class="text-xl font-bold">Spec</label>
                                      <!-- Dynamic Input Base Spec -->
                                        <el-card class="box-card">
                                                <el-row :gutter="20">
                                                    <el-col :span="12">
                                                        <!-- Button a new spec -->
                                                        <div class="px-2 py-2 w-5">
                                                             <Button label="Add new spec"  icon="pi pi-plus" class="font-bold" @click="addNewSpecItem(index)"/>
                                                        </div>
                                                       <!-- Variant Type-->
                                                       <div v-for="(sectionSpecPro, index) in sectionSpecPro" :key="index">
                                                            <!-- Add new items -->
                                                            <div class="flex item-center px-2 py-2">
                                                                <div class="flex-initial flex align-items-center justify-content-center bg-blue-500 font-bold text-white px-2 py-2 border-round" @click="addNewSubItemSpecByIdx(index)">
                                                                    <i class="pi pi-plus-circle" style="font-size: 2rem"></i>
                                                                </div>
                                                                <!-- Add Sub spec -->
                                                                <InputText v-model="sectionSpecPro.item" type="text" class="p-inputtext-lg" placeholder="Variant" />
                                                                <!-- Remove Input  -->
                                                                <div class="px-2 py-2">
                                                                    <Button icon="pi pi-times" class="p-error text-md" severity="danger" text rounded aria-label="Cancel" v-if="sectionSpecPro.length != 1" @click="btnRemoveSubSpec(index)"/>
                                                                </div>
                                                            </div>
                                                            <!-- Input of sub spec -->
                                                            <div class="flex flex-column ml-6">
                                                                <div class="flex align-items-center justify-content-center font-bold text-white border-round m-2" v-for="(addition, index) in sectionSpecPro.additional" :key="index">
                                                                    <h4 class="m-2 text-sm"> {{ index + 1 }}</h4 >
                                                                    <InputText v-model="addition.item" type="text" class="p-inputtext-lg" placeholder="Add sub item of spec" />                                
                                                                    <!-- Remove Input  -->
                                                                    <div class="px-2 py-2">
                                                                        <Button icon="pi pi-times" class="p-error border-yellow-700 bg-red-600 border-circle text-md" severity="danger" text rounded aria-label="Cancel" v-if="sectionSpecPro.additional.length != 1" @click="btnRemoveSubSpec(index)"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                       </div>         
                                                    </el-col>
                                                </el-row>
                                        </el-card>
                                    </div>
                                </div>
                                <!--========Variations Type of Spec - Start=======-->                       
                                <!-- Description Product -->
                                <div class="col-12 lg:col-12">
                                        <div class="field">
                                        <label for="name_en" class="text-xl font-semibold">Description (EN)</label>
                                        <Editor v-model="desProEn" editorStyle="height: 320px" class="text-xl"/>
                                    </div>  
                                </div>
                            </div> 
                             <!--=======Product Details=========-->
                            <div class="bg-white">
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
                                            <div class="col-6 lg:col-7 px-2 py-2">
                                                <div class="field card">
                                                    <label for="name_en" class="text-xl font-semibold">
                                                         Product Images 
                                                        (Available 10 Image Uploads)
                                                        <span class="p-error">*</span>
                                                     </label>
                                                    <!-- Upload Filed -->
                                                    <el-upload action="#" list-type="picture-card" 
                                                        :auto-upload="false" 
                                                        :limit="10"
                                                        ref="proImgMultiple"
                                                        v-model="proImgMultiple"
                                                        accept=".jpg, .png, .jpeg"
                                                        :on-exceed="handleExceed"
                                                        :on-change="handleChangeFileMalUpload"
                                                        :file-list="formUploadArr.resourceList"
                                                        :before-upload="beforeUploadMulImg"
                                                        :http-request="handleFileSuccess"
                                                        :on-success="onSuccessMalFileUpload"
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
                                                                    @click="handelOnChange(file)"
                                                                >
                                                                    <el-icon><EditPen/></el-icon>
                                                                </span>
                                                                <span
                                                                    v-if="!disabled"
                                                                    class="el-upload-list__item-delete"
                                                                    @click="handleRemoveMultiple(file)"
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
                                            <div class="col-6 lg:col-5 px-2 py-2">
                                                <div class="field card">
                                                    <label for="name_en" class="text-xl font-semibold">Thumbnail (Available 1 Image Uploads)  <span class="p-error">*</span> </label>
                                                    <el-upload action="#" 
                                                        list-type="picture-card" 
                                                        :on-preview="handlePictureCardPreview"
                                                        :on-remove="handleRemoveThumbnail" 
                                                        :auto-upload="false" 
                                                        :on-change="handleChange" 
                                                        accept=".jpg, .png, .jpeg"
                                                        :file-list="fileList" 
                                                        v-model="proThumbnail"
                                                        ref="proThumbnail"
                                                        :limit="1">
                                                        <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
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
                                        <label for="name_en" class="text-xl font-semibold">Product Name (KH)</label>
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
                    <Button 
                        icon="pi pi-times"
                        label="Cancel"
                        class="p-button-lg py-3 p-button-outlined w-10rem mr-3" />
                    <Button 
                        icon="pi pi-check" 
                        class="p-button-lg py-3 w-10rem"
                        type="submit"
                        label="Save"
                    />
                </div>
            </div>
        </form>
        <!-- :label='isProcessingSubmit ? "Process..." :  -->
   </div>
</template>


<!-- Script Product Create  -->
<script>
    import ProductServices from "../../../services/vendors/products/ProductServices";
    import ProductCategoriesServices from '../../../services/vendors/product_categories/ProductsCategoriesServices';
    import { Plus, ZoomIn, EditPen, Delete } from '@element-plus/icons-vue';
    import { ElMessage } from 'element-plus';
    import { useVuelidate } from '@vuelidate/core';
    import { minLength, required } from '@vuelidate/validators';
    // import LoadingButton from '../../../components/buttons/LoadingButton.vue';
    export default{
        setup() {
          return { v$: useVuelidate() }
        },
        components:{
            Plus,
            ZoomIn,
            EditPen,
            Delete,
            // LoadingButton
        },
        created() {
            this.productSerClass = new ProductServices();
            this.proSubCategoryService = new ProductCategoriesServices();
        },
        validations() {
            return {
                proNameEn: { required },
                proUnitPice: {required},
                proQty: {required},
                proCatID: {
                    required,
                    minLength: minLength(3)
                }
            }
        },  
        data() {
            return {
                // Form Submits
                proNameEn: '',
                proCode: '',
                submitted: false,
                proSpectags: '',
                proCatID : null,
                catSubListDropDownPro: [],
                subCatID : '',
                desProEn : '',
                proImgMultiple : null,
                proThumbnail : null,
                imagFilesList: '',
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
                //Upload Files
                imageUrl: '',
                fileList: [],
                fileAttachments: [],
                fileListArrUpload:null,
                imageList: [],
                objClass: {
                    upLoadShow: true,
                    upLoadHide: false,
                },
                fromList: {
                    proCategoryNameEng: '',
                    file: null,
                },
                disTypesOption: [
                    { id: 1,disType: 'Flat'},
                    { id: 2, disType: 'Percent' },
                ],
                formUploadArr: {
                    resourceList: [],
                    deleteIds: [],
                },
                //Multiple Spec of products
                sectionSpecPro: [
                    {
                        item: "",
                        additional: []
                    }
                ]
            }
        },
        methods: {
            /**
             * Generate Product Code
             * */ 
            getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            generateProductCode(){
                console.log(this.formUploadArr.resourceList)
                const productToken = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                const chars = 5;
                const segments = 4;
                let keyString = "";
                for (var i = 0; i < segments; i++) {
                    var segment = "";
                    for (var j = 0; j < chars; j++) {
                        var k = this.getRandomInt(0, 35);
                        segment += productToken[k];
                    }
                    keyString += segment;
                    return this.proCode = keyString;
                }
            },
            onLazyLoad() {
                //  const { first, last } = event;
                const _items = [...this.catSubListDropDownPro];
                for (let i = 0; i < this.catSubListDropDownPro.length; i++) {
                    console.log(_items[i].catID)
                    _items[i] = { label: _items[i], value: i };
                }
                this.catSubListDropDownPro = _items;
                this.loading = false;
            },
            async getCategoriesSelect(){
                    this.proSubCategoryService.getProCategory().then((data) => {
                        if (data.success == true) {
                            this.catSubListDropDownPro = data.result.resultStatus;
                        }
                    });
            },
            /**
             @Add Multiple Spec
             @Add Spec
             @Add Sub Spec
             @Remove Spec
             @Remove Sub Spec
            */
            addNewSpecItem(){
                this.sectionSpecPro.push({
                    item: '',
                    additional: []
                });
            },
            addNewSubItemSpecByIdx(id){
                this.sectionSpecPro[id].additional.push({
                    item: ''
                });
            },
            btnRemoveSpec(id) {
                this.sectionSpecPro.slice(id).pop({
                    item: ''
                })
            },
            btnRemoveSubSpec(id){
                this.sectionSpecPro[id].additional.splice(id,1);
            },
            //============Upload Files Multiple===========
            handleChangeFileMalUpload(file, fileList){
                ElMessage.success(file.name);
                if(!fileList.length){
                    return false;
                }
                for(let i = 0;i<fileList.length;i++){
                    this.fileAttachments.push(fileList[i].raw);
                }
                // this.fileAttachments.push(file.raw);
            },  
            handlePictureCardPreview(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemoveMultiple(file){
               this.$refs.proImgMultiple.handleRemove(file,-1);
            },
            handelOnChange(file){
                /**
                 *  @Dialog Confirm replace picture uploads
                 *  @Limited Size Uploads
                 */ 
                this.$confirm("This action will replace the picture with a new one, Continue?", "Tips", {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "cancel",
                    type: "warning",
                }).then(() => {
                    // Delete picture first
                    let index = 0;
                    this.formUploadArr.deleteIds.push(file.id);
                    for (let i = 0; i < this.formUploadArr.resourceList.length; i++) {
                        if (this.formUploadArr.resourceList[i].id === file.id) {
                            // Splice (index, length, substitute content) replaces the data of the specified id
                            this.formUploadArr.resourceList.splice(i, 1)
                            index = i;
                        }
                    }
                    // Then select a new picture
                    this.$refs["proImgMultiple"].$refs["uploadRef"].upload() //The upload picture interface appears
                    this.form.resourceList.splice(index, 1, file)
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "Picture editing canceled",
                    })
                });
                const isLt100M = file.size /1024 / 1024 < 1024;
                if(!isLt100M){
                   ElMessage.error('Limit Size File Upload...');
                }  
            },
            // The number of files exceeds the specified number
            handleExceed(files, fileList) {
                // this.imagFilesList.push(fileList[i].raw);
                this.$message.warning(
                    `Currently, 10 pictures are limited to be selected.
                        This time, it is selected ${files.length} 
                        Pictures selected ${files.length + fileList.length
                    } Pictures`
                )
            },
            handleFileSuccess(file){
                console.log(file)
            },
            beforeUploadMulImg(file){
                console.log(file)
            },
            onSuccessMalFileUpload(file, fileList){
                console.log(file,fileList)
            },
            //============Upload Files Single===========
            handleChange(file) {
                this.proThumbnail = file.raw;
                //Check Upload File
                this.beforeAvatarUpload(file.raw);
                this.objClass.upLoadHide = true;//上传图片后置upLoadHide为真，隐藏上传框
                this.objClass.upLoadShow = false;
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
                this.file = this.$refs.file.files[0];
                // this.createBase64Image(this.$refs.file.files[0]);
            },
            handleRemoveThumbnail(file){
                ElMessage.success(`Remove Successfully... ${file}`)
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
                            shopTypeID: 1,
                            proImgListID: '',
                            proNameEng: this.proNameEn,
                            proNameKh: this.proNameKh,
                            proCode: this.proCode,
                            proMeasure: this.measureUnit,
                            proQty: this.proQty,
                            proThumbnail: this.proThumbnail,
                            proImgMalUpload: [this.fileAttachments],
                            proUnitPrice: this.proUnitPice,
                            proSpecJson: this.sectionSpecPro,
                            proDiscount: this.proDiscount,
                            proDiscountType: this.discountType.disType,
                            proDisEng: this.desProEn,
                            proDisKH: this.proDesKh,
                         }
                         console.log(dataPro)
                         this.productSerClass.createProduct(dataPro).then((response) => { 
                            console.log(response)
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
<style>
.el-upload-list--picture-card .el-upload-list__item-actions{
    font-size: 12px;
}
.avatar-uploader .avatar {
    width: 200px;
    height: 200px;
    display: block;
}
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
    width: 180px;
    height: 180px;
    text-align: center;
}
.upLoadShow .el-upload {
    width: 15rem !important;
    height: 14rem !important;
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
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}
</style>