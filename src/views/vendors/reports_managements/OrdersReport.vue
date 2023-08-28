<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between px-4 py-4">
            <h2 class="relative text-black text-3xl section section-title:before">Order Report</h2>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card slot="header" class="box-card">
                    <div class="relative pb-3 text-black text-sm section section-title:before">
                        <p class="h6">Filter Data</p>
                    </div>
                    <div class="formgrid grid">
                        <div class="col-4 lg:col-6 field">
                            <label for="name_en" class="text-sm font-semibold">Shop</label>
                            <Dropdown 
                                v-model="selectedAllShop" 
                                :options="getOptSellerShopsArr" 
                                optionLabel="shop_eng" 
                                placeholder="Select a Shop" 
                                class="w-full text-sm" 
                                inputId="shopEng"
                                aria-describedby="dd-error"
                            >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center">
                                        <div class="text-sm">{{ slotProps.value?.shop_eng ?? '' }}</div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center text-sm">
                                        <div class="text-sm">{{ slotProps.option?.shop_eng ?? '' }} ({{ slotProps.option?.venNameEng ?? '' }})</div>
                                    </div>
                                </template>
                            </Dropdown>  
                        </div>
                        <div class="col-4 lg:col-6 field">
                            <label for="name_en" class="text-sm font-semibold">Date Range</label>
                            <Calendar 
                                id="endDateFilter" class="w-full text-sm" 
                                v-model="orderReportListStartFilter"
                                selectionMode="range" 
                                :manualInput="false"
                                inputId="endDateOrder" 
                                showIcon
                                hourFormat="24" 
                                showButtonBar
                            />
                        </div>
                       <div class="col-12 lg:col-6 field">
                           <Button icon="pi pi-filter" class="btn btn-primary h-3rem w-10rem" label="Filters" />
                        </div>
                    </div>
                </el-card>
            </div>
            <!-- Data Table Orders Report -->
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                            <DataTable 
                              ref="dt" 
                                :value="ordersReportMSArr" 
                                v-model:selection="selectedCategoriesList"
                                dataKey="id"
                                :paginator="true" :rows="10" 
                                :filters="filters"
                                class="p-datatable-scrollable"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5, 10, 25]"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
                                <!-- Header -->
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                        <!-- Filter Date Order -->
                                        <h4 class="m-0"></h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters['global'].value" :placeholder="$t('route.search')"/>
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty Users -->
                                <template #empty> No Orders report found... </template>
                                <!-- Loading Users -->
                                <template #loading> Loading Orders report data. Please wait... </template>
                                <!--------------Check Existed Data ----------->
                                <div v-if="ordersReportMSArr && ordersReportMSArr.length > 0 && ordersReportMSArr != ''">
                                    <!-- Columns -->
                                    <Column field="full_latin_name" header="Order ID" sortable style="min-width:20rem"></Column>
                                    <Column field="user_id" header="Total Amount" sortable style="min-width:20rem"></Column>
                                </div>
                            </DataTable>
                        </div>
                        <!-- ===============Dialog Delete Product Category======================= -->
                        <Dialog 
                            v-model:visible="deleteUsersDialog" 
                            :style="{ width: '450px' }"
                            header="Confirm"
                            :modal="true"
                        >
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span>Are you sure you want to delete?</span>
                            </div>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deleteUsersDialog = false" />
                                <Button label="Yes" icon="pi pi-check" text @click="deleteUserMSByID" />
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
import { FilterMatchMode } from 'primevue/api';
import SellerServices from '../../../services/vendors/seller_managements/SellerServices';
import { ElMessage } from 'element-plus';
export default {
    data() {
        return {
            ordersReportMSArr: [],
            orderListEndFilter: '',
            selectedAllShop: '',
            orderReportListStartFilter: '',
            orderReportListEndFilter: '',
            getOptSellerShopsArr:null,
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        }
    },
    created() {
        this.sellersShopServices = new SellerServices();
    },
    mounted() {
       this.getSellerShopOptArr();
    },
    methods: {
        confirmDeleteUserMS(userId) {
            this.usersID = userId;
            this.deleteUsersDialog = true;
        },
        async getSellerShopOptArr(){
            this.sellersShopServices.getListSellerAcc().then((seller) => {
            if(!Array.isArray(seller)){
                ElMessage.error("Not found sellers...");
            }
            this.getOptSellerShopsArr = Array.isArray(seller) ? seller.slice() : [];
        });
        }
    }
}
</script>
