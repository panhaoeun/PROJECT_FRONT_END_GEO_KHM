<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
<<<<<<< HEAD
            <h2 class="relative text-black text-3xl section section-title:before">Category Lists</h2>
            <el-button type="info" size="large" class="py-4" @click="$router.push('/vendor/products/category/create')">
                <div class="flex justify-between pl-2">
=======
            <h2 class="relative text-black text-xl section section-title:before">Category Lists</h2>
            <el-button class="btn btn-primary"  type="info" size="large" @click="$router.push('/vendor/products/category/create')">
                <div class="flex justify-between pl-2" v-permission="[{functionName: 'categories_module', moduleName: 'fun_create'}]">
>>>>>>> main
                    <i class="pi pi-plus" style="font-size: 1rem"></i>
                    <span class="pl-2">Add Categories</span>
                </div>
            </el-button>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                            <DataTable ref="dt" :value="catList" v-model:selection="selectedCategoriesList" dataKey="id"
<<<<<<< HEAD
                                    :paginator="true" :rows="10" :filters="filters" class="p-datatable-scrollable"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    :rowsPerPageOptions="[5, 10, 25]"
=======
                                    :paginator="true" :rows="10" :filters="filters" class="p-datatable-scrollable text-sm"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    :rowsPerPageOptions="[5, 10, 25]"
                                    :metaKeySelection="false"
>>>>>>> main
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                                <!-- Header -->
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                        <h4 class="m-0"></h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                                        </span>
                                    </div>
                                </template>
<<<<<<< HEAD
                                <!-- Empty Products -->
                                <template #empty> No Categories found. </template>
                                <!-- Loading Products -->
                                <template #loading> Loading Categories data. Please wait. </template>
                            <!--------------Check Existed Data ----------->
                             <div v-if="catList && catList.length > 0 && catList != ''">
                                <!-- Columns -->
                                    <Column field="Logo" header="Category Image" sortable style="min-width:15rem">
                                        <template #body>
                                            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="xlarge" shape="circle" />
                                        </template>
                                    </Column>
                                    <Column field="catNameEn" header="Name" sortable style="min-width:20rem"></Column>
                                    <Column field="category" header="Category Status" sortable style="min-width:10rem">
                                        <template #body>
                                            <div class="font-bold">
                                                <el-switch v-model="statusShopSwitch" />
=======
                            <!-- Empty Products -->
                            <template #empty> No Categories found. </template>
                            <!-- Loading Products -->
                            <template #loading> Loading Categories data. Please wait. </template>
                            <!--------------Check Existed Data ----------->
                             <div v-if="catList && catList.length > 0 && catList != ''">
                                <!-- Columns -->
                                    <Column field="id" header="Category Image" sortable style="min-width:15rem">
                                        <template #body="{data}">
                                            <div class="flex flex-column">
                                              <div class="flex px-2 py-2">
                                                <router-link :to="{path: '/vendor/products/sub-category/list', id: data.catID }" class="flex px-1 py-1">
                                                      <Avatar :image="`${envVueHost}uploads/${data.catLogo}`" class="mr-2" shape="circle" :data-id="data"/>
                                                    {{ data.catNameEn }}
                                                </router-link>
                                              </div>
>>>>>>> main
                                            </div>
                                        </template>
                                    </Column>
                                    <Column :exportable="false" header="Options" style="min-width:8rem">
                                        <template #body="slotProps">
                                            <Button icon="pi pi-pencil" outlined rounded class="mr-2"
<<<<<<< HEAD
                                                @click="$router.push({path: `/vendor/products/category/edit/${slotProps.data.catID}`})" />
                                            <Button icon="pi pi-trash" outlined rounded severity="danger"
=======
                                                v-permission="[{functionName: 'categories_module', moduleName: 'fun_edit'}]"
                                                @click="$router.push({path: `/vendor/products/category/edit/${slotProps.data.catID}`})" />
                                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                                v-permission="[{functionName: 'categories_module', moduleName: 'fun_deleted'}]"
>>>>>>> main
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
    import ProductCategoriesServices from '../../../services/vendors/product_categories/ProductsCategoriesServices';
<<<<<<< HEAD
import { ElMessage } from 'element-plus';
    export default{
=======
    import { ElMessage } from 'element-plus';
     export default{
>>>>>>> main
        data(){
            return {
                catID: '',
                catList: '',
                statusShopSwitch: '',
                deleteCatDialog: false,
                product: '',
                selectedCategoriesList: '',
                filters: {
                    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
<<<<<<< HEAD
                }
=======
                },
                envVueHost: process.env.VUE_APP_PATH_FILE
>>>>>>> main
            }
        },
        created() {
            this.proCategoryService = new ProductCategoriesServices();
        },
        mounted(){
            const proCatService = new ProductCategoriesServices();
            proCatService.getProCategory().then((data) => {
<<<<<<< HEAD
                if (data.success == true) {
                    this.catList = data.result.resultStatus;
                }
=======
                if (!data) {
                    ElMessage.error("Internal Error...");
                }
                this.catList = data;
>>>>>>> main
            });
        },
        computed: {
             dataUrl(preImg) {
                return 'data:image/jpeg;base64,' + btoa(
                    new Uint8Array(preImg)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
            }
        },
        methods: {
            confirmDeleteProduct(catId){
                this.catID = catId;
                this.deleteCatDialog = true;
            },
            deleteCatByID(){
               if(!this.catID){
                 ElMessage.error("Product Category Not Found...");
               }
               this.proCategoryService.deleteProCategory(this.catID).then((del)=> {
                   ElMessage.success(del.data.message);
                   this.deleteCatDialog = false;
               }).catch((error) => {
                  ElMessage.error(error);
               });
<<<<<<< HEAD
            }
=======
            },
>>>>>>> main
        }
    }
</script>
