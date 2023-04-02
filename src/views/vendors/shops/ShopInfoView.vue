<template>
    <div class="container-fluid p-0">
       <div class="card">
          <!-- Product List -->
           <h5>List Shops</h5>
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
                    <Column headerStyle="width: 5rem; text-align: center" header="Actions" bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <div class="px-2 py-2 flex justify-content-center">
                                <Button type="button" icon="pi pi-list" class="flex-1 flex align-items-center justify-content-center"></Button>
                                <!-- Edit -->
                                <router-link :to='"/vendor/shop/edit/" + data.id' >
                                    <Button type="button" icon="pi pi-file-edit" class="p-button-help flex-1 flex align-items-center justify-content-center"></Button>
                                </router-link>
                                <Button type="button" icon="pi pi-delete-left" class="p-button-danger flex-1 flex align-items-center justify-content-center"></Button>
                            </div>
                    
                        </template>
                    </Column>
                </div>
            </DataTable>
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

