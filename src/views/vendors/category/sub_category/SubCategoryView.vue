<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="relative text-black text-3xl section section-title:before">Sub Category Lists</h2>
            <div v-if="selectOptValueCat !== null">
                <el-button type="info" size="large" class="py-4" @click="$router.push(`/vendor/products/sub-category/create/${selectOptValueCat}`)"   v-permission="[{functionName: 'sub_categories', moduleName: 'fun_create'}]">
                    <div class="flex justify-between pl-2">
                        <i class="pi pi-plus" style="font-size: 1rem"></i>
                        <span class="pl-2">Add Sub Categories</span>
                    </div>
                </el-button>
            </div>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                            <DataTable ref="dt" :value="catSubList" v-model:selection="selectedSubCategoriesList" dataKey="id"
                                :paginator="true" :rows="10" :filters="filters" class="p-datatable-scrollable"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5, 10, 25]"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                                <!-- Header -->
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                        <!-- Select Sub Categories -->
                                        <h4 class="m-0">
                                            <el-select 
                                                v-permission="[{functionName: 'sub_categories', moduleName: 'fun_view'}]"
                                                @change="getCurrentOptCat"
                                                v-model="selectOptValueCat" 
                                                filterable  
                                                placeholder="Select">
                                                <el-option 
                                                    selected
                                                    v-for="item in catSubListDropDownView" 
                                                    :value="item.catID" 
                                                    :label="item.catNameEn"
                                                    :key="item.catID"        
                                                ></el-option>
                                            </el-select>
                                        </h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty Products -->
                                <template #empty> No Categories found. </template>
                                <!-- Loading Products -->
                                <template #loading> Loading Categories data. Please wait. </template>
                                <!--------------Check Existed Data ----------->
                                <div v-if="catSubList && catSubList.length > 0 && catSubList != ''">
                                    <!-- Columns -->
                                    <Column field="categoryNameEng" header="Sub Category Name" sortable style="min-width:20rem"></Column>
                                    <Column :exportable="false" header="Options" style="min-width:8rem">
                                        <template #body="slotProps">
                                            <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                                                v-permission="[{functionName: 'sub_categories', moduleName: 'fun_edit'}]"
                                                @click="$router.push({ path: `/vendor/products/sub-category/edit/${slotProps.data.catID}` })" />
                                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                                v-permission="[{functionName: 'sub_categories', moduleName: 'fun_deleted'}]"
                                                @click="confirmDeleteProduct(slotProps.data.catID)" />
                                        </template>
                                    </Column>
                                </div>
                            </DataTable>
                        </div>
                        <!-- ===============Dialog Delete Product Category======================= -->
                        <Dialog v-model:visible="deleteCatDialog" :style="{ width: '450px' }" header="Confirm"
                            :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span>Are you sure you want to delete?</span>
                            </div>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deleteCatDialog = false" />
                                <Button label="Yes" icon="pi pi-check" text @click="deleteCatByID" />
                            </template>
                        </Dialog>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>


<!-- Data Tables -->
<script>
// import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from 'primevue/api';
import ProductCategoriesServices from '../../../../services/vendors/product_categories/ProductsCategoriesServices';
import { ElMessage } from 'element-plus';
export default {
    data() {
        return {
            superCatID: '',
            catSubList: '',
            statusShopSwitch: '',
            deleteCatDialog: false,
            product: '',
            selectedSubCategoriesList: null,
            selectOptValueCat: null,
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            },
            selectedCategories: '',
            catSubListDropDownView: [],
        }
    },
    created() {
        this.proCategoryService = new ProductCategoriesServices();
    },
    mounted() {
        this.proCategoryService.getProCategory().then((data) => {
            if (!data) {
                ElMessage.error("Internal Error...");
            }
            this.catSubListDropDownView = data;
        });
    },
    computed: {
        computedQuerySubByCatID(){
            return this.catSubList;
        }
    },
    methods: {
        getCurrentOptCat(catID){
            if(!catID){
                ElMessage.error('Please select categories...');
                this.catSubList = {};
            }
            try {
                // const catID = this.selectOptValueCat;
                this.proCategoryService.querySubProCategoryBySuperCatID(this.selectOptValueCat).then((datCatId) => {
                    if (!datCatId) {
                        ElMessage.error("Internal Error...");
                    }   
                    this.catSubList = datCatId;
                }).catch((err) => {
                    console.log(err)
                    ElMessage.error(err);
                });
            } catch (error) {
                ElMessage.error(error);
            }
        },
        confirmDeleteProduct(superCatID) {
            this.superCatID = superCatID;
            this.deleteCatDialog = true;
        },
        deleteCatByID() {
            if (!this.superCatID) {
                ElMessage.error("Product Category Not Found...");
            }
            this.proCategoryService.deleteSubProCategory(this.superCatID).then((del) => {
                ElMessage.success(del.data.message);
                this.deleteCatDialog = false;
            }).catch((error) => {
                ElMessage.error(error);
            });
        }
    }
}
</script>
