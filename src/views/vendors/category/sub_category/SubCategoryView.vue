<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="relative text-black text-xl section section-title:before">{{ $t('category.subGategoryList') }}</h2>
            <div v-if="selectOptValueCat !== null">
                <el-button type="info" size="large" class="btn btn-primary"
                    @click="$router.push(`/vendor/products/sub-category/create/${parseInt(computedQuerySubByCatID)}`)"
                    v-permission="[{ functionName: 'sub_categories', moduleName: 'fun_create' }]">
                    <div class="flex justify-between pl-2 text-sm">
                        <i class="pi pi-plus" style="font-size: 1rem"></i>
                        <span class="pl-2">{{ $t('route.addNew') }}</span>
                    </div>
                </el-button>
            </div>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card class="box-card py-2 px-2 text-sm">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                            <DataTable ref="dt" :value="catSubList" v-model:selection="selectedSubCategoriesList"
                                dataKey="id" :paginator="true" :rows="10" :filters="filters"
                                class="p-datatable-scrollable text-sm"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5, 10, 25]"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                                <!-- Header -->
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                        <!-- Select Sub Categories -->
                                        <h4 class="m-0">
                                            <Dropdown @change="getCurrentOptCat" :options="catSubListDropDownView" filter
                                                v-model="selectOptValueCat"
                                                v-permission="[{ functionName: 'sub_categories', moduleName: 'fun_view' }]"
                                                inputId="catID" optionLabel="catNameEn"
                                                :placeholder="$t('category.selectCategory')" aria-describedby="dd-error"
                                                class="w-full border-round-lg md:w-14rem">
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
                                        </h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters['global'].value"
                                                :placeholder="$t('route.search')" />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty Products -->
                                <template #empty>{{ $t('message.noHaveData') }} </template>
                                <!-- Loading Products -->
                                <template #loading>{{ $t('message.dataLoading') }}</template>
                                <!--------------Check Existed Data ----------->
                                <div v-if="catSubList && catSubList.length > 0 && catSubList != ''">
                                    <!-- Columns -->
                                    <Column field="categoryNameEng" :header="$t('category.subGategoryName')" sortable
                                        style="min-width:20rem"></Column>
                                    <Column :exportable="false" :header="$t('route.option')" style="min-width:8rem">
                                        <template #body="slotProps">
                                            <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                                                v-permission="[{ functionName: 'sub_categories', moduleName: 'fun_edit' }]"
                                                @click="$router.push({ path: `/vendor/products/sub-category/edit/${slotProps.data.catID}/${computedQuerySubByCatName ?? ''}` })" />
                                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                                v-permission="[{ functionName: 'sub_categories', moduleName: 'fun_deleted' }]"
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
        computedQuerySubByCatID() {
            return this.selectOptValueCat?.catID ?? [];
        },
        computedQuerySubByCatName() {
            return this.selectOptValueCat?.catNameEn ?? [];
        }
    },
    methods: {
        getCurrentOptCat(catID) {
            if (!Array.isArray(catID) || !catID.length) {
                this.proCategoryService.querySubProCategoryBySuperCatID(catID.value?.catID).then((datSubCatId) => {
                    if (!datSubCatId) {
                        this.catSubList = Array.isArray() ?? [];
                        ElMessage.error("Not Found Sub Categories...");
                    }
                    this.catSubList = Array.isArray(datSubCatId) ? datSubCatId.slice() : [];
                }).catch((err) => {
                    ElMessage.error(err.message);
                });
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
