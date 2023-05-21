<template>
    <b-row>
        <b-col sm="12">
            <div class="coa">
                <!-- Titles -->
                <div class="flex justify-content-between my-4 px-4 py-4">
                    <h2 class="relative text-black text-3xl section section-title:before">Products</h2>
                    <el-button type="info" size="large" class="py-4" @click.prevent="$router.push('/vendor/products/create')">
                        <div class="flex justify-between pl-2">
                            <i class="pi pi-plus" style="font-size: 1rem"></i>
                            <span class="pl-2">Create</span>
                        </div>
                    </el-button>
                </div>
               <!-- DataTables -->
               <div class="card-body px-0">
                    <!-- Product List -->
                    <div class="table-responsive">
                                            <DataTable 
                            :paginator="true"
                            :value="products"
                            class="p-datatable-gridlines text-lg font-semibold"
                            :rows="10"
                            dataKey="id"
                            :rowHover="true"
                            contextMenu
                            v-model:filters="filtersData"
                            filterDisplay="menu"
                            :loading="loading"
                            :filters="filtersData"
                            responsiveLayout="scroll"
                            :globalFilterFields="['representative.name', 'title']"
                            v-model:selection="selectedProduct" 
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                            :rowsPerPageOptions="[5, 10, 25]"           
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"              
                        >   
                            <!-- Data Table Header -->
                            <template #header>
                                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                    <h4 class="m-0">Manage Product</h4>
                                    <!-- Search Products -->
                                    <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                                        <i class="pi pi-search" />
                                        <InputText v-model="filtersData['global'].value" class="p-inputtext  p-component w-full text-xl" placeholder="Keyword Search" />
                                    </span>
                                </div>
                            </template>
                            <!-- Empty Products -->
                            <template #empty> No products found. </template>
                            <!-- Loading Products -->
                            <template #loading> Loading products data. Please wait. </template>
                            <!--------------Columns----------->
                            <div v-if="products && products.length > 0 && products != ''">
                                <Column field="id" header="Product Name" sortable style="min-width: 20rem" >
                                    <template #body="{ data }">
                                        <Avatar :image="`${ENV_HOST_PATH_FILE}uploads/products_img/list_img_products/${data.product_picture}`" class="mr-2" size="large" shape="circle" :data-id="data"/>
                                        <div class="flex flex-column">
                                            <span class="flex"> {{ data.product_eng }}</span>
                                        </div>
                                    </template>
                                </Column>
                
                                <Column field="id" header="Unit Price" sortable style="min-width: 13rem" >
                                    <template #body="{ data }">
                                        {{ data.product_unit_price }}
                                    </template>
                                </Column>
                                <Column field="id" header="Qty" sortable style="min-width: 12rem" >
                                    <template #body="{ data }">
                                        {{ data.product_qty }}
                                    </template>
                                </Column>
                                <!--  -->
                                <Column field="active_status" header="Active Status" sortable style="min-width: 12rem" >
                                    <template #body>
                                            <el-switch
                                            v-model="inputSwitchPro"
                                            size="large"
                                        />
                                    </template>
                                    </Column>
                                <Column headerStyle="width: 15rem; text-align: center; alignment-item:center;" header="Actions" bodyStyle="text-align: center; overflow: visible">
                                        <template #body="{ data }">
                                            <div class="flex flex-wrap gap-2">
                                                <Button icon="pi pi-search" outlined rounded class="mr-2" @click.prevent="$router.push(`/vendor/products/product_list/view/${data.id}`)" />
                                                <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click.prevent="$router.push(`/vendor/products/product_list/edit/${data.id}`)" />
                                                <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteCatPro()" />
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
                                <Button label="Yes" icon="pi pi-check" text />
                            </template>
                        </Dialog>
                    </div>
               </div>
            </div>          
        </b-col>
    </b-row>
</template>


<!-- Data Tables -->
<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { FilterMatchMode, FilterOperator } from 'primevue/api';
    import ProductService from '../../../services/vendors/products/ProductServices';
    // Product Services
    const loading = ref(true);
    const products = ref(null);
    const filtersData = ref(null);
    const productService = new ProductService();
    const selectedProduct = ref();
    const inputSwitchPro = ref(false);
    const ENV_HOST_PATH_FILE = process.env.VUE_APP_PATH_FILE;

    onBeforeMount(() => {
        productService.getDataProducts()
            .then((data) => {
                try{
                    products.value = data;
                    loading.value = false;
                }catch(error){
                    console.log(error);
                }
            }    
        );
        // Filters
        initFilterData();
    });
    // Initial Filter Data
    const initFilterData = () => {
        filtersData.value = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
        }
    }
</script>

