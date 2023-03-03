<template>
    <div class="layout-content">
        <div class="gird">
            <div class="col-12">
                <div class="card">
                    <h5>List Categories</h5>
                    <!-- Product List -->
                    <DataTable 
                        :paginator="true"
                        :value="proCategory"
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
                        :rowsPerPageOptions="[5,10,25]"           
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"              
                    >   
                        <!-- Data Table Header -->
                        <template #header>
                            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                <!-- Search Products -->
                                <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filtersData['global'].value" class="p-inputtext  p-component w-full" placeholder="Keyword Search" />
                                </span>
                                <!-- Button Add Products -->
                                <router-link to="/vendor/products/category/create">
                                    <Button label="Add Category" icon="pi pi-plus-circle" class="p-button-lg p-button p-component p-button-outlined w-full sm:w-auto flex-order-0 sm:flex-order-1" iconPos="right" loadingIcon="pi pi-spinner pi-spin" />
                                </router-link>
                            </div>
                        </template>
                        <!-- Empty Products -->
                        <template #empty> No products found. </template>
                        <!-- Loading Products -->
                        <template #loading> Loading products data. Please wait. </template>
                        <!--------------Columns----------->
                        <div v-if="proCategory && proCategory.length > 0 && proCategory !='' ">
                            <Column field="id" header="#" sortable style="min-width: 12rem" >
                                <template #body="{ data }">
                                    {{ data.id }}
                                </template>
                            </Column>
                            <Column field="product_category_eng" header="Name" sortable style="min-width: 12rem" >
                                <template #body="{ data }">
                                    {{ data.product_category_eng }}
                                </template>
                                <template #filter="{ filterModel }">
                                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                                </template>
                            </Column>
                            <Column headerStyle="width: 5rem; text-align: center" header="Actions" bodyStyle="text-align: center; overflow: visible">
                                    <template #body="{data}">
                                        <div class="px-2 py-2 flex justify-content-center">
                                            <Button type="button" icon="pi pi-list" class="flex-1 flex align-items-center justify-content-center"></Button>
                                            <!-- Edit -->
                                            <router-link :to='"/vendor/products/category/edit/" + data.id' >
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
        </div>
    </div>
</template>


<!-- Data Tables -->
<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { FilterMatchMode, FilterOperator } from 'primevue/api';
    import ProductCategoriesServices from '../../../services/vendors/product_categories/ProductsCategoriesServices';

    // Product Services
    const loading = ref(null);
    const proCategory = ref(null);
    const filtersData = ref(null);
    const proCategoryService = new ProductCategoriesServices();
    const selectedProduct = ref();
    onBeforeMount(() => {
        proCategoryService.getProCategory()
            .then((data) => {
                console.log(data)
                proCategory.value = data;
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

