<template>
    <div class="px-2 py-2">
            <!-- Titles -->
                <div class="flex justify-content-between my-4 px-4 py-4">
                    <h2 class="relative text-black text-xl section section-title:before">Products List</h2>
                    <template v-if="user?user[1].typeUser == 'Vendor' : '7Day-Vendor' == true && user[1].typeUser !== 'Admin'">
                        <el-button type="info" size="large" class="btn btn-primary" @click.prevent="$router.push('/vendor/products/create')" v-permission="[{functionName: 'product_module', moduleName: 'fun_create'}]">
                            <div class="button">
                                <i class="pi pi-plus" style="font-size: 1rem"></i>
                                <span class="pl-2">Create</span>
                            </div>
                        </el-button>
                    </template>
                </div>
                <!-- Hidden -->
                <input v-model="productListFilterArr" hidden />
                <!-- DataTables -->
                <div class="gird">
                    <div class="col-12">
                    <!-- Product List -->
                    <el-card class="box-card py-2 px-2 text-sm">
                        <div class="px-2">
                            <DataTable 
                                :paginator="true"
                                :value="products"
                                class="p-datatable-scrollable text-sm"
                                :rows="10"
                                dataKey="id"
                                :rowHover="true"
                                contextMenu
                                v-model:filters="filtersData"
                                filterDisplay="menu"
                                :loading="loadingProductList"
                                :filters="filtersData"
                                responsiveLayout="scroll"
                                :globalFilterFields="['representative.product_eng', 'product_eng', 'product_unit_price', 'product_qty']"
                                v-model:selection="selectedProduct" 
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                                :rowsPerPageOptions="[5, 10, 25,50,100]"           
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"              
                            >   
                                <!-- Data Table Header -->
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                        <!-- Filters Product By Category and Sub Categories -->
                                        <h4 class="m-0 flex">
                                            <!-- Categories -->
                                            <div class="flex">
                                                <Dropdown 
                                                    :options="catListSelectOptProList" 
                                                    filter 
                                                    v-model="selectedProCatFilter" 
                                                    inputId="catID"
                                                    optionLabel="catNameEn" 
                                                    placeholder="Select a Categories" 
                                                    aria-describedby="dd-error"
                                                    class="md:w-14rem border-round-lg text-sm">
                                                    <template #value="slotProps">
                                                        <div v-if="slotProps.value" class="flex align-items-center">
                                                            <div>{{ slotProps.value?.catNameEn }}</div>
                                                        </div>
                                                        <span v-else>
                                                            {{ slotProps?.placeholder }}
                                                        </span>
                                                    </template>
                                                    <template #option="slotProps">
                                                        <div class="flex align-items-center">
                                                            <div>{{ slotProps.option?.catNameEn }}</div>
                                                        </div>
                                                    </template>
                                                </Dropdown>
                                            </div>
                                            <!-- Sub Categories -->
                                            <div class="pl-2">
                                                <Dropdown 
                                                    :options="subCatListSelectOptProList" 
                                                    filter 
                                                    v-model="selectedProSubCatProFilter" 
                                                    @click="getSubCategoriesOptSelect(selectedProCatFilter)"
                                                    inputId="catID"
                                                    optionLabel="categoryNameEng" 
                                                    placeholder="Select a Sub Categories" 
                                                    aria-describedby="dd-error"
                                                    class="md:w-14rem border-round-lg text-sm">
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
                                            </div>
                                        </h4>
                                        <!-- Search Products -->
                                        <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filtersData['global'].value" class="p-inputtext  p-component w-full text-sm" placeholder="Keyword Search" />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty Products -->
                                <template #empty> No products found... </template>
                                <!-- Loading Products -->
                                <template #loading> Loading products data. Please wait... </template>
                                <!--------------Columns----------->
                                <div v-if="products && products.length > 0 && products != ''">
                                    <Column field="id" header="Product Name"  filterField="product_eng" sortField="product_eng" sortable  >
                                        <template #body="{ data }">
                                            <div class="flex flex-column">
                                                <span class="flex">
                                                    <Avatar :image="`${ENV_HOST_PATH_FILE}uploads/products_img/thumbnail/${data?.product_picture}`" class="mr-2" shape="circle" :data-id="data"/>
                                                    {{truncateLongText(data?.product_eng,20, '\b') }}
                                                </span>
                                            </div>
                                        </template>
                                        <!-- Filter Products -->
                                        <template #filter="{ filterModel }">
                                            <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by product name" />
                                        </template>
                                    </Column>

                                    <Column field="id" header="Purchase Price" sortField="product_unit_price"  sortable >
                                        <template #body="{ data }">
                                            {{ data?.product_unit_price }}
                                        </template>
                                    </Column>
                                    <Column field="id" header="Qty"  sortField="product_qty" sortable>
                                        <template #body="{ data }">
                                            {{ data?.product_qty }}
                                        </template>
                                    </Column>
                                    <Column headerStyle="width: 15rem; text-align: center; alignment-item:center;" header="Actions" bodyStyle="text-align: center; overflow: visible">
                                            <template #body="{ data }">
                                                <div class="flex flex-wrap gap-2">
                                                    <Button icon="pi pi-search" outlined rounded class="mr-2" @click.prevent="$router.push(`/vendor/products/view-detail/${parseInt(data?.proId) ?? ''}`)" v-permission="[{functionName: 'product_module', moduleName: 'fun_view'}]"/>
                                                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click.prevent="$router.push(`/vendor/products/product_list/edit/${parseInt(data?.proId)}`)" v-permission="[{functionName: 'product_module', moduleName: 'fun_edit'}]"/>
                                                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(parseInt(data?.proId) ?? '')" v-permission="[{functionName: 'product_module', moduleName: 'fun_deleted'}]"/>
                                                </div>
                                            </template> 
                                    </Column>
                                </div>
                            </DataTable>
                            <!-- Dialog -->
                            <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                                <div class="confirmation-content">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Are you sure you want to delete</span>
                                </div>
                                <template #footer>
                                    <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
                                    <Button label="Yes" icon="pi pi-check" text @click="deleteProductSuccess()"/>
                                </template>
                            </Dialog>
                        </div>
                    </el-card>              
            </div>
        </div>
    </div> 
</template>


<!-- Data Tables -->
<script setup>
    import { ref, onBeforeMount, computed} from 'vue';
    import { FilterMatchMode, FilterOperator } from 'primevue/api';
    import ProductService from '../../../services/vendors/products/ProductServices';
    import ProductCategoriesServices from '../../../services/vendors/product_categories/ProductsCategoriesServices';
    import { ElMessage } from 'element-plus';
    import { storeToRefs } from 'pinia';
    import { useAuthStoreToken } from '../../../utils/auth/AuthStoreTokenJWT';
    const { user } = storeToRefs(useAuthStoreToken());
    // Product Services
    const loadingProductList = ref(true);
    const products = ref(null);
    const filtersData = ref(null);
    const productService = new ProductService();
    const proCategory = new ProductCategoriesServices();
    const selectedProduct = ref();
    const selectedProCatFilter = ref();
    const catListSelectOptProList = ref(null);
    const selectedProSubCatProFilter = ref(null);
    const subCatListSelectOptProList = ref(null);
    const deleteProductDialog = ref(false);
    const productId = ref();
    const ENV_HOST_PATH_FILE = process.env.VUE_APP_PATH_FILE;
    // Smart Way to truncate long string to short      
    const truncateLongText = ((str, length, useWordBoundary) => {
        if (str.length <= length) { return str; }
        const subString = str.slice(0, length-1); // the original check
        return (useWordBoundary 
            ? subString.slice(0, subString.lastIndexOf(" ")) 
            : subString) + "...";
    });
    onBeforeMount(() => {
        //Get Product Categories
        getSelectOptCategoriesFilter();
        // Filters
        initFilterData();
    });
    // Initial Filter Data
    const initFilterData = () => {
        filtersData.value = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            product_eng: {
                operator: FilterOperator.AND,
                constraints: [
                    { value: null, matchMode: FilterMatchMode.IN },
                ],
            }
        }
    }
    const getSelectOptCategoriesFilter = () => {
        proCategory.getProCategory().then((data) => {
            if(!Array.isArray(data)){
                ElMessage.error("Not Font Product Categories...");
            }
            catListSelectOptProList.value = Array.isArray(data) ? data.slice() : [];
        });
    }
    const getSubCategoriesOptSelect = (parentCatID) => {
        // Function Filter Product Categories
        filterProductByCategoriesById();
        if(!Array.isArray(parentCatID) || !parentCatID.length > 0){
            selectedProSubCatProFilter.value = null;
            subCatListSelectOptProList.value = [];
        }
        try {
            if(!Array.isArray(parentCatID) || parentCatID?.catID !== undefined || parentCatID?.catID !== null){
                proCategory.querySubProCategoryBySuperCatID(parentCatID?.catID).then((datSubCatId) => {
                    if (!datSubCatId) {
                        subCatListSelectOptProList.value = Array.isArray() ?? [];
                        ElMessage.error("Not Found Sub Categories...");
                    }   
                    const queryCatIDSupCatId =  datSubCatId.filter(categories => Array.isArray(categories?.superCatId) ===  Array.isArray(parentCatID?.catID));
                    subCatListSelectOptProList.value = Array.isArray(queryCatIDSupCatId) ? queryCatIDSupCatId.slice() : [];
                }).catch((err) => {
                    ElMessage.error(err.message);
                });
            }
        } catch (error) {
            ElMessage.error(error.message);
        }
    }
    // Search Filter Product Categories 
    const productListFilterArr = computed(() => {
        return listFilterEmptyProductByCatID();
    });
    const filterProductByCategoriesById = () => {
        const categories = selectedProSubCatProFilter.value;
        if(categories !== null && categories !== undefined){
            const categoriesId = categories?.catID  ?? '';
            return routerFilterProductCategories(categoriesId);
        }
    }
    const routerFilterProductCategories = (catId) => {
        try{         
            productService.searchFilterProductByCate(catId).then((product) => {
                if (!product) {
                    products.value = [];
                }
                products.value = Array.isArray(product) ? product.slice() : [];
            }).catch((error) => {
                ElMessage.error(error.message || []);
            });
        }catch(error){
            console.log(error)
            ElMessage.error(error?.message || []);
        }
    }
    const listFilterEmptyProductByCatID = () => {
        try{         
            productService.getDataProducts()
                .then((data) => {
                    try{
                        products.value = Array.isArray(data) ? data.slice() : [];
                        loadingProductList.value = false;
                    }catch(error){
                        ElMessage.error(`Fail Product Service: ${error.response.data?.message}`);
                    }
                }    
        );
        }catch(error){
            console.log(error)
            ElMessage.error(error?.message || []);
        }
    }
    // Deleted
    const confirmDeleteProduct = (id) => {
        productId.value = id;
        deleteProductDialog.value = true;
    }
    const deleteProductSuccess =() => {
        if(!productId.value){
            ElMessage.error("Product Category Not Found...");
        }
        productService.deleteProByID(productId.value).then((del)=> {
            this.$toast.add({severity:'success', summary: 'Successful', detail: del.data.message, life: 3000});
            deleteProductDialog.value = false;
        }).catch((error) => {
            ElMessage.error(error);
        });
    }
</script>

