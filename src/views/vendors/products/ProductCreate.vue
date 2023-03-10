<template>
   <div class="layout-content card">
      <el-form :model="ruleFormRef" ref="ruleFormRef" label-width="120px">
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
                                        <label for="name_en" class="text-xl">Name (EN)</label>
                                        <InputText id="product_name" placeholder="New Products" type="text" class="py-4 text-xl"/>
                                    </div>
                                </div>
                                    <!-- Product Code -->
                                    <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl">Product Code</label>
                                        <InputText class="p-inputtext p-component py-4 text-xl" type="text" v-model="ruleFormRef.proCode" placeholder="Product Code" />
                                    </div>
                                </div>
                                <!-- Product Prices -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl">Unit Price</label>
                                        <InputNumber mode="decimal" placeholder="Unit Price" inputClass="py-4 text-xl"  v-model="unitPriceEng"/>
                                    </div>
                                </div>
                                <!-- Product Category -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl">Category</label>
                                        <Dropdown v-model="productTypeEng" placeholder="Select Category" class="py-3 text-xl" :showClear="true"/>
                                    </div>
                                </div>
                                <!-- Sub Category -->
                                <div class="col-12 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl">Sub Category</label>
                                        <Dropdown v-model="productTypeEng" placeholder="Select Sub Category" class="py-3 text-xl" :showClear="true"/>
                                    </div>
                                </div>
                                <!--========Variations=======-->
                                <div class="col-12 field">
                                    <div class="field">
                                        <label for="name_en" class="text-xl">Spec</label>
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
                                        <label for="name_en" class="text-xl">Description (EN)</label>
                                        <Editor v-model="valueEditorPro" editorStyle="height: 320px" class="text-xl"/>
                                    </div>  
                                </div>
                            </div> 
                             <!-- Product Details -->
                            <div class="card  px-6 py-6">
                                <span class="block text-900 font-bold text-xl mb-4">Product Details</span>
                                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                                    <div class="col-12 lg:col-12">
                                        <!-- Form Layouts -->
                                        <div class="grid formgrid">
                                            <!-- Link Video -->
                                            <div class="col-12 lg:col-12">
                                                    <div class="field">
                                                    <label for="name_en" class="text-xl">Youtube Video Link</label>
                                                    <InputText id="product_name" placeholder="New Products" type="text" class="py-4 text-xl"/>
                                                </div>  
                                            </div>
                                            <!-- Upload Imag Multiple Product and Thumbnail -->
                                            <div class="col-12 lg:col-7 px-2 py-2">
                                                <div class="field card">
                                                    <label for="name_en" class="text-xl">Upload Product Images <span class="">*</span> </label>
                                                    <!-- Upload Filed -->
                                                    <el-upload action="#" list-type="picture-card" 
                                                        :auto-upload="false" 
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
                                                            <img w-full :src="this.dialogImageUrl" alt="Preview Image" />
                                                        </el-dialog>
                                                    </div> 
                                            </div>
                                            <!-- Upload Thumbnail -->
                                            <div class="col-12 lg:col-5 px-2 py-2">
                                                <div class="field card">
                                                    <label for="name_en" class="text-xl">Upload Thumbnail <span>*</span></label>
                                                    <el-upload
                                                            class="avatar-uploader"
                                                            action=""
                                                            :show-file-list="false"
                                                            :on-success="handleAvatarSuccess"
                                                            :before-upload="beforeAvatarUpload"
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
                                        <label for="name_en" class="text-xl">Name (KH)</label>
                                        <InputText id="product_name" placeholder="New Products" type="text" class="py-4 text-xl"/>
                                    </div>
                                </div>
                                <!-- Descriptions KH-->
                                <div class="col-12 lg:col-12">
                                        <div class="field">
                                            <label for="name_en" class="text-xl">Description (KH)</label>
                                            <Editor v-model="valueEditorPro" editorStyle="height: 320px"/>
                                        </div>  
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <!--==========Tabs===============-->
                    </div>
                </div>
            </div>
           
             <!-- Buttons Submits -->
            <div class="col-12 flex justify-content-end mt-4">
                <!--Buttons-->
                 <!-- <LoadingButton :loading="true" title="Save"></LoadingButton> -->
                <Button label="Cancel" icon="pi pi-times" class="p-button-lg py-3 p-button-outlined w-10rem mr-3" />
                <Button label="Save" icon="pi pi-check" class="p-button-lg py-3 w-10rem"  @click.prevent="submitFormProCreate(ruleFormRef)"/>
            </div>
     </el-form>       
   </div>
</template>

<!-- Script Product Create  -->
<script>
    import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue';
    import { ElMessage } from 'element-plus';
    // import LoadingButton from '../../../components/buttons/LoadingButton.vue';
    export default {
        components:{
            Plus,
            ZoomIn,
            Download,
            Delete,
            // LoadingButton
        },
        data() {
            return {
                // Form Submits
                proSpectags: '',
                ruleFormRef: {
                    imagFilesList: [],
                    proCode: ''
                },
                activeTabs: 'eng-tabs',
                active: 2,
                productTypeEng: '',
                valueEditorPro: '',
                unitPriceEng: '',  
                //Upload Files  
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                imageUrl: ''
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
            submitFormProCreate(formEl){
                console.log(formEl.proCode)
            }
        },
        setup(){

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
  width: 300px;
  height: 325px;
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
    width: 300px;
    height: 300px;
}
.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 280px;
    height: 300px;
    text-align: center;
}
</style>