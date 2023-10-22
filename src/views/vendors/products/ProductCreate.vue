<template>
   <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-xl section section-title:before">Add Product</h2>
            <el-button type="info" size="large" class="btn btn-primary" @click.prevent="$router.push('/vendor/products/list')">
                <div class="pl-2 justify-content-center">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{$t("route.routeBack")}}</span>
                </div>
            </el-button>
        </div>
        <!-- Form Submitted -->
        <form method="POST">    
            <!-- Toast Alert -->
            <Toast />
            <!--Create Products-->
            <div class="card card px-6 py-6">
                <span class="block text-900 font-bold text-md mb-4">Create Product</span>
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
                                        <label for="name_en" class="text-sm font-semibold">Name (EN) <span class="p-error">*</span></label>
                                        <InputText id="product_name" placeholder="New Products"  :input="v$.proNameEn.$touch"  v-model="v$.proNameEn.$model" :class="{ 'p-invalid border-round-lg p-error': v$.proNameEn.$invalid && submitted }" type="text" class="text-sm border-round-lg"/>
                                        <small v-if="(v$.proNameEn.$invalid && submitted) || v$.proNameEn.$pending.$response" class="p-error text-lg">{{ v$.proNameEn.required.$message.replace('Value', 'Name') }}</small>
                                    </div>
                                </div>
                                <!-- Product Code -->
                                <div class="col-6 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-sm font-semibold">
                                            Product Code
                                            <span class="p-error">*</span>
                                            <span class="pl-2 underline text-blue-600 cursor-pointer h5 disabled" @click="generateProductCode()">Generate Code</span>
                                        </label>
                                        <InputText class="border-round-lg text-sm" type="text" v-model="v$.proCode.$model" :class="{ 'p-invalid border-round-lg p-error': v$.proCode.$invalid && submitted }" placeholder="Product Code" />
                                        <small v-if="(v$.proCode.$invalid && submitted) || v$.proCode.$pending.$response" class="p-error text-lg">{{ v$.proCode.required.$message.replace('Value', 'Product Code') }}</small>
                                    </div>
                                </div>
                                <!--========== Product Category and Sub Categories =======-->
                                <div class="col-4 lg:col-6 field">
                                    <!-- Categories -->
                                    <div class="field">
                                        <label for="name_en" class="text-sm font-semibold">Category</label>
                                        <Dropdown 
                                                :options="catListSelectOpt" 
                                                filter 
                                                v-model="v$.selectedProCat.$model" 
                                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.selectedProCat.$invalid && submitted }"
                                                inputId="catID"
                                                optionLabel="catNameEn" 
                                                placeholder="Select a Categories" 
                                                aria-describedby="dd-error"
                                                class="w-full border-round-lg text-sm">
                                                <template #value="slotProps">
                                                    <div v-if="slotProps.value" class="flex align-items-center">
                                                        <div>{{ slotProps.value?.catNameEn }}</div>
                                                    </div>
                                                    <span v-else>
                                                        {{ slotProps.placeholder }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div class="flex align-items-center">
                                                        <div>{{ slotProps.option?.catNameEn }}</div>
                                                    </div>
                                                </template>
                                        </Dropdown>
                                        <small v-if="(v$.selectedProCat.$invalid && submitted) || v$.selectedProCat.$pending.$response" class="p-error text-lg">{{ v$.selectedProCat.required.$message.replace('Value', 'Categories') }}</small>
                                    </div>
                                </div>
                                <!-- Sub Product Category -->
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="subCategories" class="text-sm font-semibold">Sub Category</label>
                                        <Dropdown 
                                                @click="getSubCategoriesOptSelect(selectedProCat)"
                                                :options="catSubListDropDownPro" 
                                                filter 
                                                v-model="v$.selectedProSubCat.$model" 
                                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.selectedProSubCat.$invalid && submitted }"
                                                inputId="catID"
                                                optionLabel="categoryNameEng" 
                                                placeholder="Select a Sub Categories" 
                                                aria-describedby="dd-error"
                                                class="w-full border-round-lg text-sm">
                                                <template #value="slotProps">
                                                    <div v-if="slotProps.value" class="flex align-items-center">
                                                        <div>{{ slotProps.value?.categoryNameEng }}</div>
                                                    </div>
                                                    <span v-else>
                                                        {{ slotProps.placeholder }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div class="flex align-items-center">
                                                        <div>{{ slotProps.option?.categoryNameEng }}</div>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                            <small v-if="(v$.selectedProSubCat.$invalid && submitted) || v$.selectedProSubCat.$pending.$response" class="p-error text-lg">{{ v$.selectedProSubCat.required.$message.replace('Value', 'Sub Categories') }}</small>
                                    </div>
                                </div>
                                <!--========== Product Category and Sub Categories =======-->
                                <!-- Measure -->
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-sm font-semibold">Measure</label>
                                        <InputText class="p-inputtext p-component border-round-lg text-sm" type="text" v-model="v$.measureUnit.$model" placeholder="Measure" :class="{ 'p-invalid border-round-lg p-error': v$.measureUnit.$invalid && submitted }" />
                                    <small v-if="(v$.measureUnit.$invalid && submitted) || v$.measureUnit.$pending.$response" class="p-error text-lg">{{ v$.measureUnit.required.$message.replace('Value', 'Measure') }}</small>
                                    </div>
                                </div>
                                <!-- Discount Type  and Discount -->
                                <!-- Discount -->
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-sm font-semibold">Discount</label>
                                        <InputNumber mode="decimal" placeholder="Discount" inputClass="border-round-lg text-sm" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5"  v-model="proDiscount"/>
                                    </div>
                                </div>
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="discountType" class="text-sm font-semibold">Discount Type</label>
                                        <Dropdown v-model="discountType" placeholder="Select Discount Type" optionLabel="disType"  class="border-round-lg text-sm" :options="disTypesOption" :showClear="true"/>
                                    </div>
                                </div>
                                <!-- Product Prices -->
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-sm font-semibold">Unit Price (៛)</label>
                                        <InputNumber mode="decimal" placeholder="Unit Price" :minFractionDigits="2" :maxFractionDigits="5"  inputClass="border-round-lg text-sm"  v-model="v$.proUnitPice.$model" :class="{ 'p-invalid border-round-lg p-error': v$.proUnitPice.$invalid && submitted }"/>
                                         <small v-if="(v$.proUnitPice.$invalid && submitted) || v$.proUnitPice.$pending.$response" class="p-error text-sm">{{ v$.proUnitPice.required.$message.replace('Value', 'Unit Price') }}</small>
                                    </div>
                                </div>
                                <!-- Product Qty -->
                                <div class="col-4 lg:col-6 field">
                                    <div class="field">
                                        <label for="name_en" class="text-sm font-semibold">Total Quality</label>
                                        <InputNumber mode="decimal" placeholder="Unit Price" inputClass="border-round-lg text-sm"  v-model="v$.proQty.$model" :class="{ 'p-invalid border-round-lg p-error': v$.proQty.$invalid && submitted }"/>
                                        <small v-if="(v$.proQty.$invalid && submitted) || v$.proQty.$pending.$response" class="p-error text-sm">{{ v$.proQty.required.$message.replace('Value', 'Total Quantity') }}</small>
                                    </div>
                                </div>
                                <!-- =============Product Feature Package Shipping Price============== -->
                                <div class="col-8 xl:col-12 lg:col-12 field">
                                    <el-card class="box-card" shadow="hover" header="Shipping Information">
                                        <div class="grid">
                                            <!-- Delivery Company -->
                                            <div class="col-4">
                                                <div class="field">
                                                    <label for="name_en" class="text-sm font-semibold">Delivery Company</label>
                                                        <Dropdown 
                                                            :options="deliveryShippingCompanyList" 
                                                            filter 
                                                            v-model="v$.selectedDeliveryCompany.$model" 
                                                            :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.selectedDeliveryCompany.$invalid && submitted }"
                                                            inputId="ship_id"
                                                            optionLabel="ship_company" 
                                                            placeholder="Select a Delivery Company" 
                                                            aria-describedby="dd-error"
                                                            class="w-full border-round-lg text-sm">
                                                            <template #value="slotProps">
                                                                <div v-if="slotProps.value" class="flex align-items-center">
                                                                    <div>{{ slotProps.value?.ship_company }}</div>
                                                                </div>
                                                                <span v-else>
                                                                    {{ slotProps.placeholder }}
                                                                </span>
                                                            </template>
                                                            <template #option="slotProps">
                                                                <div class="flex align-items-center">
                                                                    <div>{{ slotProps.option?.ship_company }}</div>
                                                                </div>
                                                            </template>
                                                        </Dropdown>
                                                    <small v-if="(v$.selectedDeliveryCompany.$invalid && submitted) || v$.selectedDeliveryCompany.$pending.$response" class="p-error text-sm">{{ v$.selectedDeliveryCompany.required.$message.replace('Value', 'Delivery Company') }}</small>
                                                </div>
                                            </div>
                                            <!--Express Delivery -->
                                            <div class="col-4">
                                                <div class="field">
                                                    <label for="name_en" class="text-sm font-semibold">Express Delivery (៛)</label>
                                                    <InputNumber mode="decimal" placeholder="Express Delivery" inputClass="border-round-lg text-sm" :minFractionDigits="2" :maxFractionDigits="5"   v-model="v$.expressDeliveryShipping.$model" :class="{ 'p-invalid border-round-lg p-error': v$.expressDeliveryShipping.$invalid && submitted }"/>
                                                    <small v-if="(v$.expressDeliveryShipping.$invalid && submitted) || v$.expressDeliveryShipping.$pending.$response" class="p-error text-sm">{{ v$.expressDeliveryShipping.required.$message.replace('Value', 'Express Delivery') }}</small>
                                                </div>
                                            </div>
                                            <!--Normal Delivery -->
                                            <div class="col-4">
                                                <div class="field">
                                                    <label for="name_en" class="text-sm font-semibold">Normal Delivery (៛)</label>
                                                    <InputNumber mode="decimal" placeholder="Normal Delivery" inputClass="border-round-lg text-sm"  :minFractionDigits="2" :maxFractionDigits="5"  v-model="v$.normalDeliveryShipping.$model" :class="{ 'p-invalid border-round-lg p-error': v$.normalDeliveryShipping.$invalid && submitted }"/>
                                                    <small v-if="(v$.normalDeliveryShipping.$invalid && submitted) || v$.normalDeliveryShipping.$pending.$response" class="p-error text-sm">{{ v$.normalDeliveryShipping.required.$message.replace('Value', 'Normal Delivery') }}</small>
                                                </div>
                                            </div>
                                            <!--Maximins Order Product -->
                                            <div class="col">
                                                <div class="field">
                                                    <label for="name_en" class="text-sm font-semibold">Maximins</label>
                                                    <InputNumber mode="decimal" placeholder="Maximins" inputClass="border-round-lg text-sm"  v-model="v$.maximinsOrderProduct.$model" :class="{ 'p-invalid border-round-lg p-error': v$.maximinsOrderProduct.$invalid && submitted }"/>
                                                    <small v-if="(v$.maximinsOrderProduct.$invalid && submitted) || v$.maximinsOrderProduct.$pending.$response" class="p-error text-sm">{{ v$.maximinsOrderProduct.required.$message.replace('Value', 'Maximin Order') }}</small>
                                                </div>
                                            </div>
                                            <!-- Packing Type -->
                                             <div class="col">
                                                <div class="field">
                                                    <label for="name_en" class="text-sm font-semibold">Packing Type</label>
                                                    <InputText placeholder="Packing Type" inputClass="border-round-lg text-sm"  v-model="v$.packingTypeShip.$model" :class="{ 'p-invalid border-round-lg p-error': v$.packingTypeShip.$invalid && submitted }"/>
                                                    <small v-if="(v$.packingTypeShip.$invalid && submitted) || v$.packingTypeShip.$pending.$response" class="p-error text-sm">{{ v$.packingTypeShip.required.$message.replace('Value', 'Package Type') }}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </el-card>
                                </div>
                                <!--========Variations Type of Spec - Start=======-->
                                <div class="col-12 field">
                                    <div class="field">
                                     <label for="name_en" class="text-md font-bold">Spec</label>
                                      <!-- Dynamic Input Base Spec -->
                                       <el-row :gutter="20">
                                            <el-col :span="12">
                                                    <!-- Button a new spec -->
                                                    <div class="px-2 py-2 w-5 md:w-5">
                                                        <Button label="Add new spec" icon="pi pi-plus" class="font-bold btn btn-outline-primary" @click="addNewSpecItem(index)"/>
                                                    </div>
                                                    <!-- Variant Type-->
                                                    <div v-for="(sectionSpecPro, index) in sectionSpecPro" :key="index">
                                                        <!-- Add new items -->
                                                        <div class="flex item-center justify-content-center">
                                                            <div class="flex-initial p-2 flex align-items-center text-sm text-danger cursor-pointer justify-content-center font-bold" @click="addNewSubItemSpecByIdx(index)">
                                                                <i class="pi pi-plus-circle" style="font-size: 1.5rem"></i>
                                                            </div>
                                                            <!-- Add Sub spec -->
                                                            <InputText v-model="sectionSpecPro.item" size="small" type="text" class="text-sm p-inputtext border-round-lg" placeholder="Variant" />
                                                            <!-- Remove Input  -->
                                                            <div class="px-2 py-2">
                                                                <Button icon="pi pi-times" class="p-error text-sm" severity="danger" text rounded aria-label="Cancel" v-if="sectionSpecPro.length != 1" @click="btnRemoveSubSpec(index)"/>
                                                            </div>
                                                        </div>
                                                        <!-- Input of sub spec -->
                                                        <div class="flex flex-column ml-6">
                                                            <div class="flex align-items-center text-sm justify-content-center font-bold text-white border-round m-2" v-for="(addition, index) in sectionSpecPro?.additional" :key="index">
                                                                <h4 class="m-2 text-sm"> {{ index + 1 }}</h4 >
                                                                <InputText v-model="addition.item" size="small" type="text" class="border-round-lg text-sm" placeholder="Add sub item of spec" />                                
                                                                <!-- Remove Input  -->
                                                                <div class="px-2 py-2">
                                                                    <Button icon="pi pi-trash" outlined rounded class="mr-2 text-sm" v-if="sectionSpecPro.additional.length != 1" @click="btnRemoveSubSpec(index)" severity="danger" text aria-label="Cancel" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>         
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <!--========Variations Type of Spec - Start=======-->                       
                                <!-- Description Product -->
                                <div class="col-12 lg:col-12">
                                        <div class="field">
                                        <label for="name_en" class="text-sm font-semibold">Description (EN)</label>
                                        <Editor v-model="desProEn" editorStyle="height: 320px" class="text-sm"/>
                                    </div>  
                                </div>
                            </div> 
                             <!--=======Product Details=========-->
                            <div class="bg-white">
                                <span class="block text-900 font-bold text-sm mb-4">
                                    Product Details
                                </span>
                                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                                    <div class="col-12 lg:col-12">
                                        <!-- Form Layouts -->
                                        <div class="grid formgrid">
                                           
                                            <!-- Upload Imag Multiple Product and Thumbnail -->
                                            <!---Uploads 10 Files--->
                                            <div class="col-6 lg:col-7 px-2 py-2">
                                                <div class="field">
                                                    <label for="name_en" class="text-sm font-semibold pl-3">
                                                        Product Images 
                                                        (600 x 600px)
                                                        (Available 10 Image Uploads)
                                                        <span class="p-error">*</span>
                                                     </label>
                                                    <!-- Upload Filed -->
                                                    <el-upload 
                                                        class="text-sm pl-3"
                                                        action="#" 
                                                        list-type="picture-card" 
                                                        :auto-upload="true" 
                                                        :limit="10"
                                                        ref="fileInputMultiFile"
                                                        :show-file-list="true"
                                                        accept=".jpg, .png, .jpeg"
                                                        :on-exceed="handleExceed"
                                                        :file-list="formUploadArr.resourceList"
                                                        :http-request="handleFileSuccess"
                                                    >
                                                        <!-- Icons -->
                                                        <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                        <!-- Files -->
                                                        <template #file="{ file }">
                                                            <div>
                                                                <img class="el-upload-list__item-thumbnail" :src="file?.url" :alt="file?.name" style="width: 100%;"/>
                                                                <span class="el-upload-list__item-actions">
                                                                <span
                                                                    class="el-upload-list__item-preview"
                                                                    @click="handlePictureCardPreview(file)"
                                                                >
                                                                    <!-- Zoom In -->
                                                                    <el-icon class="text-md"><ZoomIn /></el-icon>
                                                                </span>
                                                                <span
                                                                    v-if="!disabled"
                                                                    class="el-upload-list__item-delete"
                                                                    @click="handelOnChangeMultipleUpload(file)"
                                                                >
                                                                    <el-icon class="text-md"><EditPen/></el-icon>
                                                                </span>
                                                                <span
                                                                    v-if="!disabled"
                                                                    class="el-upload-list__item-delete text-sm"
                                                                    @click="handleRemoveMultiple(file)"
                                                                >
                                                                    <i class="pi pi-trash text-sm"></i>
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
                                                <div class="field">
                                                    <label for="name_en" class="text-sm font-semibold">Thumbnail  (500 x 500px) (Available 1 Image Uploads)  <span class="p-error">*</span> </label>
                                                    <el-upload action="#" 
                                                        list-type="picture-card" 
                                                        :on-preview="handlePictureCardPreview"
                                                        :on-remove="handleRemoveThumbnail" 
                                                        :auto-upload="false" 
                                                        :on-change="handleChange" 
                                                        accept=".jpg, .png, .jpeg"
                                                        :on-exceed="handleExceedThumbnail"
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
                                        <label for="name_en" class="text-sm font-semibold">Product Name (KH)</label>
                                        <InputText id="product_name" v-model="proNameKh" placeholder="New Products" type="text" class="text-sm border-round-lg"/>
                                    </div>
                                </div>
                                <!-- Descriptions KH-->
                                <div class="col-12 lg:col-12">
                                        <div class="field">
                                            <label for="name_en" class="text-sm font-semibold">Description (KH)</label>
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
                        icon="pi pi-check" 
                        class="p-button-lg btn btn-primary py-3 w-10rem"
                        type="submit"
                        label="Save"
                        @click.prevent="submitFormProductCreate(!v$.$invalid)"
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
    import DeliveryTrackingServices from '../../../services/delivery_tracking/DeliveryTrackingService';
    import { ZoomIn, EditPen } from '@element-plus/icons-vue';
    import { ElMessage } from 'element-plus';
    import { useVuelidate } from '@vuelidate/core';
    import { minLength, required } from '@vuelidate/validators';
    // import LoadingButton from '../../../components/buttons/LoadingButton.vue';
    export default{
        setup() {
          return { v$: useVuelidate() }
        },
        components:{
            ZoomIn,
            EditPen
        },
        created() {
            this.productServicesClass = new ProductServices();
            this.proSubCategoryService = new ProductCategoriesServices();
            this.deliveryTrackShippingCompany = new DeliveryTrackingServices();
        },
        validations() {
            return {
                measureUnit: {required},
                selectedDeliveryCompany: {required},
                expressDeliveryShipping: {required},
                normalDeliveryShipping: {required},
                maximinsOrderProduct: {required},
                packingTypeShip: {required},
                selectedProSubCat: {required},
                selectedProCat: {required},
                proNameEn: { required },
                proUnitPice: {required},
                proQty: {required},
                proCode: {
                    required
                },
                proCatID: {
                    required,
                    minLength: minLength(3)
                }
            }
        },  
        data() {
            return {
                //Unique Validation
                numbersNumber: [],
                validating: false,
                proNameEn: '',
                proCode: '',
                submitted: false,
                proSpecTags: '',
                catListSelectOpt:null,
                deliveryShippingCompanyList: null,
                selectedProSubCat: null,
                selectedProCat: null,
                proCatID : null,
                catSubListDropDownPro: null,
                subCatID : '',
                desProEn : '',
                proImgMultiple : [],
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
                fileListArrUploadMulti:[],
                imageList: [],
                errorValidateFile: [],
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
                ],
                selectedDeliveryCompany: null,
                expressDeliveryShipping: '',
                normalDeliveryShipping: '',
                maximinsOrderProduct: '',
                packingTypeShip: ''
            }
        },
        mounted() {
           this.getSelectOptCategories();
           this.getDeliveryTrackingShippingCompany();
        },  
        methods: {
            randomNumberID(maxVal){
                const number = Math.floor((Math.random() * maxVal) + 1);
                if (!this.numbersNumber.includes(number)) {
                    this.numbersNumber.push(number);
                    return number;
                } else if (this.numbersNumber.length - 1 !== maxVal) {
                    this.randomNumberID(maxVal);
                }
            },
            // Select Shipping Company
            async getDeliveryTrackingShippingCompany(){
                this.deliveryTrackShippingCompany.getListDeliveryTracking().then((shipping) => {
                    if (!shipping && !Array.isArray(shipping)) {
                        this.deliveryShippingCompanyList = [];
                    }
                    this.deliveryShippingCompanyList = shipping;
                });
            },
            // Select Categories and Sub Categories
            async getSelectOptCategories(){
                this.proSubCategoryService.getProCategory().then((data) => {
                    if (!data) {
                        ElMessage.error("Not Font Product Categories...");
                    }
                    this.catListSelectOpt = data;
                });
            },
            async getSubCategoriesOptSelect(parentCatID){
                if(!Array.isArray(parentCatID) || !parentCatID.length > 0){
                    this.selectedProSubCat = null;
                    this.catSubListDropDownPro = [];
                }
                try {
                  if(!Array.isArray(parentCatID) || parentCatID?.catID !== undefined || parentCatID?.catID !== null){
                    this.proSubCategoryService.querySubProCategoryBySuperCatID(parentCatID?.catID).then((datSubCatId) => {
                        if (!datSubCatId) {
                            this.catSubListDropDownPro = Array.isArray() ?? [];
                            ElMessage.error("Not Found Sub Categories...");
                        }   
                        const queryCatIDSupCatId =  datSubCatId.filter(categories => Array.isArray(categories?.superCatId) ===  Array.isArray(parentCatID?.catID));
                        this.catSubListDropDownPro = Array.isArray(queryCatIDSupCatId) ? queryCatIDSupCatId.slice() : [];
                    }).catch((err) => {
                        ElMessage.error(err.message);
                    });
                  }
                } catch (error) {
                    ElMessage.error(error);
                }
            },
            /**
             * Generate Product Code
             * */ 
            getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            generateProductCode(){
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
                });
            },
            btnRemoveSubSpec(id){
                this.sectionSpecPro[id].additional.splice(id,1);
            },
            //============Upload Files Multiple===========
            handleChangeFileMalUpload(file, fileList){
                 console.log(file, "file");
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
                this.formUploadArr.deleteIds.push(file.uid);
                for (let i = 0; i < this.formUploadArr.resourceList.length; i++) {
                    if (this.formUploadArr.resourceList[i].uid === file.uid) {
                        // Splice (index, length) deletes the data with the specified id    
                        this.formUploadArr.resourceList.splice(i, 1);
                    }
                }
            },
            handelOnChangeMultipleUpload(file){
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
                    this.formUploadArr.deleteIds.push(file.uid);
                    for (let i = 0; i < this.formUploadArr.resourceList.length; i++) {
                        if (this.formUploadArr.resourceList[i].uid === file.uid) {
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
                this.$message.warning(
                    `Currently, 10 pictures are limited to be selected.
                        This time, it is selected ${files.length} 
                        Pictures selected ${files.length + fileList.length
                    } Pictures`
                )
            },
            handleExceedThumbnail(files, fileList){
                this.$message.warning(
                    `Currently, 01 pictures are limited to be selected.
                        This time, it is selected ${files.length} 
                        Pictures selected ${files.length + fileList.length
                    } Pictures`
                );
            },
            handleFileSuccess(file){
                if(!Array.isArray(file) || file !== null){
                    this.formUploadArr.resourceList.push(file.file) ?? [];
                    for (var index = 0; index < this.formUploadArr.resourceList.length; index++) {
                       const reader = new FileReader();
                       reader.readAsDataURL(this.formUploadArr.resourceList[index]);
                       this.fileListArrUploadMulti.push(this.formUploadArr.resourceList[index]);
                    }
                    this.$message.success(`Gallery image upload successfully - ${this.formUploadArr.resourceList.length} picture are select`);
                }else{
                    this.fileListArrUploadMulti = [];
                }
            },
            //============Upload Files Single===========
            handleChange(file) {
                this.proThumbnail = file.raw;
                //Check Upload File
                this.beforeAvatarUpload(file.raw);
                this.objClass.upLoadHide = true;
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
                ElMessage.success(`Remove Successfully... ${file.name}`)
            },
            //========Form Submit===========
            async submitFormProductCreate(isFormValid){
                try{
                    this.submitted = true;
                    this.isProcessingSubmit = true;
                    if(
                        !this.proNameEn  !== ''
                        && !this.proUnitPice || !this.proCode 
                        && this.discountType !== undefined 
                        && this.discountType !== null
                        && this.selectedProSubCat !== null
                        &&  this.selectedDeliveryCompany !== null
                    ){
                        const validation = await this.v$.$validate();
                        if(validation === false){
                            const errorValidation = this.v$.$errors;
                            this.$notify.error({
                                    title: 'Please input filed in required',
                                    message: errorValidation[0]?.$message ? errorValidation[0]?.$message : '' ,
                                    showClose: true
                            });
                        }
                    }else{
                        if(this.v$.$invalid === true){
                            const dataPro = {
                                shippingCompany : parseInt(this.selectedDeliveryCompany?.ship_id) ?? 1,
                                expressPriceDelivery: this.expressDeliveryShipping ?? 0,
                                normalPriceDelivery: this.normalDeliveryShipping ?? 0,
                                maximinsOrder: this.maximinsOrderProduct ?? 1,
                                packingType: this.packingTypeShip ?? '',
                                proCategoryID: this.selectedProSubCat?.catID,
                                proImgListID:  Math.floor((Math.random() * 1) + 1),
                                proNameEng: this.proNameEn,
                                proNameKh: this.proNameKh,
                                proCode: this.proCode,
                                proMeasure: this.measureUnit,
                                proTotalQty: this.proQty,
                                proThumbnail: this.proThumbnail ?? '',
                                proImgMalUpload:this.formUploadArr.resourceList ?? [],
                                proUnitPrice: this.proUnitPice ?? '',
                                proSpecJson: this.sectionSpecPro ?? '',
                                proDiscount: this.proDiscount ?? 0,
                                proDiscountType: this.discountType?.disType ?? '',
                                proDisEng: this.desProEn,
                                proDisKH: this.proDesKh,
                            }
                            this.productServicesClass.createProduct(dataPro).then((response) => { 
                                if (response.data.success === true) {
                                    this.submitted = false;
                                    this.errorValidateFile = [];
                                    this.isProcessingSubmit = true;
                                    this.$notify.success({
                                            title: 'Successful crate product',
                                            message: response.data?.message ? response.data?.message : '' ,
                                            showClose: false
                                    });
                                    // Push Router
                                    this.$router.push("/vendor/products/list");
                                }
                            })
                            .catch(error => {
                                this.$notify.error({
                                        title: 'Unsuccessfully create product',
                                        message: error.response.data.error.message ?? 'Unsuccessfully create product',
                                        showClose: false
                                    });  
                                    if(error.response.data.error.error.errors){
                                        for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                            const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                            this.$notify.error({
                                                title: 'Unsuccessfully create product',
                                                message: messageValidation ?? 'Unsuccessfully create product',
                                                showClose: true
                                            });   
                                        }
                                    } 
                            });
                        }
                    }
                    this.v$.$touch();
                    if (!isFormValid) {    
                        return;
                    }
                    
                }catch(error){
                    ElMessage.error(error.message);
                    this.validationError = error.response.data.error.error;
                    return false;
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