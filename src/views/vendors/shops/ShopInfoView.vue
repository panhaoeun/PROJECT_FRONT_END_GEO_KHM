<template>
    <div class="layout-content">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="relative text-black text-3xl section section-title:before">Shop Lists</h2>
            <el-button type="info" size="large" class="py-4" @click="$router.push('/vendor/shop/create')">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-plus" style="font-size: 1rem"></i>
                    <span class="pl-2">Add Shop</span>
                </div>
            </el-button>
        </div>
        <div class="grid">
            <div class="col-12">
                <el-card class="box-card py-2 px-2">
                    <div>
                    <DataTable 
                        :paginator="true"
                        :value="shopVal"
                        class="p-datatable-gridlines"
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
                                <!-- Search Products -->
                                <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filtersData['global'].value" placeholder="Keyword Search"/>
                                </span>
                                <!-- Button Add Products -->
                            </div>
                        </template>
                        <!-- Empty Products -->
                        <template #empty> No products found. </template>
                        <!-- Loading Products -->
                        <template #loading> Loading products data. Please wait. </template>
                        <!--------------Columns----------->
                        <div v-if="shopVal && shopVal.length > 0 && shopVal != ''">
                            <Column field="id" header="#" sortable style="min-width: 12rem" >
                                <template #body="{ data }">
                                    {{ data.id }}
                                </template>
                            </Column>
                            <Column field="shop_log" header="Image" sortable style="min-width: 12rem" >
                                <template #body="{ data }">
                                    {{ data.shop_logo }}
                                </template>
                                <template #filter="{ filterModel }">
                                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                                </template>
                            </Column>
                            <Column field="shop_name" header="Name" sortable style="min-width: 12rem" >
                                <template #body="{ data }">
                                    {{ data.shop_eng }}
                                </template>
                                <template #filter="{ filterModel }">
                                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                                </template>
                            </Column>
                            <!-- Actions -->
                            <Column :exportable="false" header="Options" style="min-width:8rem">
                                <template #body="slotProps">
                                    <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                                        @click="$router.push({path: `/vendor/products/category/edit/${slotProps.data.catID}`})" />
                                    <Button icon="pi pi-trash" outlined rounded severity="danger"
                                        @click="confirmDeleteProduct(slotProps.data.catID)" />
                                </template>
                            </Column>
                        </div>
                    </DataTable>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>


<!-- Data Tables -->
<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { FilterMatchMode, FilterOperator } from 'primevue/api';
    import ShopManagementsServices from '../../../services/vendors/shop_management/ShopManagementInforServices';

    // Product Services
    const loading = ref(null);
    const shopVal = ref(null);
    const filtersData = ref(null);
    const shopInforSer = new ShopManagementsServices();
    const selectedProduct = ref();
    onBeforeMount(() => {
        shopInforSer.getShops()
            .then((data) => {
                console.log(data)
                shopVal.value = data;
                loading.value = false;
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

