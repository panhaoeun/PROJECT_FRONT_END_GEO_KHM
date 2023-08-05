<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-xl section section-title:before">Add Sub Category</h2>
            <el-button class="btn btn-primary" @click.prevent="$router.push('/vendor/products/sub-category/list')">
                <div class="flex justify-between pl-2 ">
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
                <form method="POST">
                    <!--Form Submitted-->
                   <Message severity="error" v-for="(errorArray, index) in notifmsg" :key="index">
                        {{ errorArray[0] }} 
                   </Message>
                    <el-tab-pane label="English(EN)" name="english-tabs">
                        <!-- English -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                     <div class="col-6 field">
                                        <label for="name_en">
                                            Category
                                            <span class="p-error">*</span>
                                        </label>
                                        <div class="border border-round-lg" style="padding: 11px !important;">
                                            {{ getCurrentCategorySelect }} {{ selectedCategories?.catNameEn }}
                                        </div>
                                    </div>
                                    <!-- Name Sub Category -->
                                    <div class="col-6 field">
                                        <label for="name_en">Sub Category Name (Eng)<span class="p-error">*</span></label>
                                        <InputText id="product_name" placeholder="Name" type="text" class="py-3  border-round-lg"
                                            v-model="v$.proSubCategoryNameEng.$model"
                                            :class="{ 'p-invalid p-error': v$.proSubCategoryNameEng.$invalid && submitted }" />
                                        <small
                                            v-if="(v$.proSubCategoryNameEng.$invalid && submitted) || v$.proSubCategoryNameEng.$pending.$response"
                                            class="p-error">{{ v$.proSubCategoryNameEng.required.$message.replace('Value','Name') 
                                            || v$.proSubCategoryNameEng.$params.min }}
                                        </small>   
                                    </div>                                   
                                    <!-- Editor -->
                                    <div class="col-12 field">
                                        <Editor v-model="proSubCategoryDesEng" placeholder="Descriptions *"
                                            editorStyle="height: 320px" />
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
                                            <InputText id="proKh" placeholder="Name" type="text" class="py-3  border-round-lg"
                                                v-model="proSubCategoryNameKh" />
                                        </div>
                                    </div>
                                    <!-- Editor -->
                                    <div class="col-12 field">
                                        <Editor v-model="proSubCategoryDesKh" placeholder="Descriptions *"
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
                            @click.prevent="handleSubCategorySubmit(!v$.$invalid)"
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
import ProductCategoriesServices from '../../../../services/vendors/product_categories/ProductsCategoriesServices';
import { ElMessage } from 'element-plus';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            activeName: 'english-tabs',
            activetab: 1,
            preview: null,
            selectedCategories: null,
            isProcessingSubmit: false,
            catSubListDropDown: [],
            listCategories: [],
            file: null,
            notifmsg: '',
            loading: false,
            submitted: false,
            proSubCategoryNameEng: '',
            proSubCategoryNameKh: '',
            proSubCategoryDesEng: '',
            proSubCategoryDesKh: ''
        }
    },
    components() {
        Plus
    },
    created() {
        this.proSubCategoryService = new ProductCategoriesServices();
    },
    //Validations
    validations() {
        return {
            proSubCategoryNameEng: {
                required,
                minLength: minLength(3)
            },
        }
    },
    computed: {
        getCurrentCategorySelect(){
            const listCategories = this.getCurrentListCatView();
            return listCategories;
        }
    },
    methods: {
        getCurrentListCatView(){
            this.proSubCategoryService.getProCategory().then((currentCat) => {
                    if (currentCat === undefined || currentCat === null) {
                        return { role_name: '', childrenModule: [] };
                    }
                const currentNameCat =  currentCat.find(cat =>cat?.catID === parseInt(this.$route.params.superCatID));
                this.selectedCategories = currentNameCat ?? [];
                return currentNameCat;
            });
        },
        async handleSubCategorySubmit(isFormValidCategorySub) {
            try {
                this.submitted = true;
                this.isProcessingSubmit = false;
                if (!isFormValidCategorySub) {
                    ElMessage.error('Validations is required!');
                    return;
                }
                if (!this.proSubCategoryNameEng != "" || this.proSubCategoryNameEng !== null) {
                    // Data Response
                    const data = {
                        superSubCatID: this.$route.params.superCatID,
                        productSubCatEng: this.proSubCategoryNameEng,
                        productSubCatKh: this.proSubCategoryNameKh
                    }
                    this.proSubCategoryService.createSubProCategory(data).then((response) => {
                        this.isProcessingSubmit = true;
                        if(response.data.success == true){
                            ElMessage.success(response.data.message);
                            // Push Router
                            this.$router.push("/vendor/products/sub-category/list");
                        }
                    })
                    .catch(error => {
                        ElMessage.error(error.message);
                        this.notifmsg = error.response.data.error.error;
                        return false;
                    });
                }
            } catch (error) {
                //  Toast Alert 
               ElMessage.error(error);
            }
        },
        resetForm() {
            this.proSubCategoryNameEng = '',
            this.proCategoryNameKh = '',
            this.submitted = false
        },
    }
}
</script>
  