<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black section section-title:before text-md">{{ $t('category.updateSubCategory') }}</h2>
            <el-button class="btn btn-primary"  type="info" size="large" @click.prevent="$router.push('/vendor/products/sub-category/list')">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-arrow-left text-sm" style="font-size: 1rem"></i>
                    <span class="pl-2">{{$t("route.routeBack")}}</span>
                </div>
            </el-button>
        </div>
        <!--Create Products-->
        <el-card class="box-card px-6 py-6">
            <!-- Toast Alert -->
            <Toast />
            <!-- Tabs -->
            <el-tabs v-model="activeName" class="demo-tabs">
                <form @submit.prevent="handleCategoryUpdated()" class="py-4">
                    <el-tab-pane label="English(EN)" name="english-tabs">
                        <!--Form Submitted-->
                        <Message severity="error" v-for="(errorArray, index) in notifmsgCatUpdated" :key="index">
                            {{ errorArray }} 
                       </Message>
                        <!-- English -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                     <div class="col-6 field">
                                            <label for="name_en" class="text-sm">{{ $t('category.category') }}<span class="p-error">*</span></label>
                                            <div class="p-3 border border-round-lg text-sm">
                                                {{ getCurrentCategorySelect }} {{ getCurrentCategorySelect }}
                                            </div>
                                    </div>
                                    <div class="col-6 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm">{{$t('category.category')}} Name (Eng)<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Name" type="text" class="py-3 text-sm border-round-lg"
                                                v-model="dataSubCatEdit.catNameEn"/>
                                        </div>
                                    </div>
                                    <!-- Editor -->
                                    <div class="col-12 field">
                                        <Editor v-model="proCategoryDesEng" placeholder="Descriptions *"
                                            editorStyle="height: 320px"  class="text-xl"/>
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
                                            <InputText id="proKh" placeholder="Name" type="text" class="py-3 text-sm"
                                                v-model="dataSubCatEdit.catNameKh" />
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
import ProductCategoriesServices from "../../../../services/vendors/product_categories/ProductsCategoriesServices";
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
            fileUpload: '',
            dataSubCatEdit: {
                catNameEn: '',
                catNameKh: '',
                catLogo: ''
            },
            selectedCategories: null,
            dataCatEditUpdated: null,
            catSubListDropDown: [],
            notifmsgCatUpdated: ''
        }
    },
    mounted() {
        this.editDataCategories(this.$route.params.id);
    },
    computed: {
        getCurrentCategorySelect(){
            const listCategories = this.$route.params.catName;
            return listCategories;
        }
    },
    components() {
        Plus
    },
    methods: {
        // Show Category Data
        async editDataCategories(id){
              this.proCategoryService.editedSubProCategory(id)
                .then((data) => {
                    try {
                        const { catNameEn,catNameKh }= data.data.data;
                        this.dataSubCatEdit.catNameEn = catNameEn;
                        this.dataSubCatEdit.catNameKh = catNameKh;
                    } catch (error) {
                        console.log(error)
                    }
                }
                );
        },
        async handleCategoryUpdated() {
            try {
                this.submitted = true;
                const dataUpdateCat = {
                    superSubCatID: this.selectedCategories,
                    productSubCatEng: this.dataSubCatEdit.catNameEn,
                    productSubCatKh: this.dataSubCatEdit.catNameKh,
                }
                this.proCategoryService.updateSubProCategory(dataUpdateCat, this.$route.params.id).then(response => {
                    if (response.data.success == true) {
                        ElMessage.success(response.data.message);
                        // Push Router
                        this.$router.push("/vendor/products/sub-category/list");
                    }
                }).catch((error) => {
                    this.notifmsgCatUpdated = error.response.data;
                });
            }catch(error){
                ElMessage.error(error);
            }
        },
        resetForm() {
            this.proCategoryNameEng = '',
            this.proCategoryNameKh = '',
            this.submitted = false
        }
    }
}
</script>
