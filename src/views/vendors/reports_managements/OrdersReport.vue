<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between px-4 py-4">
            <h2 class="relative text-black text-3xl section section-title:before">Order Report</h2>
        </div>
        <div class="gird">
            <!-- <div class="col-12">
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
            </div> -->
            <!-- Data Table Orders Report -->
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                            <DataTable 
                              ref="dt" 
                                :value="sellerOrderReport" 
                                v-model:selection="selectedOrderReportList"
                                dataKey="id"
                                :paginator="true" :rows="10" 
                                :filters="filters"
                                class="p-datatable-scrollable"
                                :globalFilterFields="['representative.orderId', 'totalsAmount', 'subTotal', 'shopName','orderDate','paymentStatus']"
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
                                <div v-if="sellerOrderReport && sellerOrderReport.length > 0 && sellerOrderReport != ''">
                                    <!-- Columns -->
                                    <Column field="orderId" sortField="orderId" header="Order ID" sortable style="min-width:10rem"></Column>
                                    <Column field="shopName" sortField="shopName" header="Store" sortable style="min-width:10rem"></Column>
                                    <Column field="customerName" sortField="customerName" header="Customer Name" sortable style="min-width:10rem"></Column>
                                    <Column field="orderDate" sortField="orderDate" header="Order Date" sortable style="min-width:15rem"></Column>
                                    <Column field="total" sortField="total" header="Sub Total" sortable style="min-width:15rem">
                                        <template #body="{ data }">
                                            <p> {{ currencyFormattedKHRiel(data?.subTotal) }}</p>
                                            <!-- (<span>{{ currencyFormattedUSD(data?.totalsAmount) }}</span>) -->
                                        </template>
                                    </Column>
                                    <Column field="deliveryCost" sortField="deliveryCost" header="Shipping Charge" sortable style="min-width:15rem">
                                        <template #body="{ data }">
                                            <p> {{ currencyFormattedKHRiel(data?.deliveryCost) }}</p>
                                            <!-- (<span>{{ currencyFormattedUSD(data?.deliveryCost) }}</span>) -->
                                        </template>
                                    </Column>
                                    <Column field="totalsAmount" sortField="totalsAmount" header="Total Amount" sortable style="min-width:15rem">
                                        <template #body="{ data }">
                                            <p> {{ currencyFormattedKHRiel(data?.totalsAmount) }}</p>
                                            <!-- (<span>{{ currencyFormattedUSD(data?.totalsAmount) }}</span>) -->
                                        </template>
                                    </Column>
                                    <Column field="paymentStatus" sortField="paymentStatus" header="Order Status" sortable style="min-width:15rem">
                                        <template #body="{data}">
                                                <div class="justify-content-center">
                                                    <Tag :value="data?.paymentStatus" class="text-white" :severity="getSeverityPaymentStatus(data?.paymentStatus)" />
                                                </div>
                                        </template>
                                    </Column>
                                </div>
                            </DataTable>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>


<!-- Data Tables -->
<script>
import { FilterMatchMode } from 'primevue/api';
import SellerServices from '../../../services/vendors/reports_managements/OrdersReportService';
import { ElMessage } from 'element-plus';
// import covertKHRToUSDExchangeRate from "../../../utils/exchangeMoneyKHRUSD";
export default {
    data() {
        return {
            selectedOrderReportList: null,
            sellerOrderReport: [],
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
    computed: {
        // convertExchangeUSDToRiel(){
        //     // return covertKHRToUSDExchangeRate(10);
        // }
    },
    created() {
        this.sellersShopOrderServices = new SellerServices();
    },
    mounted() {
       this.getSellerShopOptArr();
    },
    methods: {
        // Convert Currency Amount
        currencyFormattedKHRiel(value){
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD(value){
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
        confirmDeleteUserMS(userId) {
            this.usersID = userId;
            this.deleteUsersDialog = true;
        },
        async getSellerShopOptArr(){
            this.sellersShopOrderServices.getSaleOrderReportList().then((orderReport) => {
            if(!Array.isArray(orderReport)){
                ElMessage.error("Not found sellers...");
            }
                this.sellerOrderReport = Array.isArray(orderReport) ? orderReport.slice() : [];
            });
        },
        getSeverityPaymentStatus(payStatus){
            switch (payStatus) {
                case 'Complete':
                    return 'success';
                case 'Processing':
                    return 'warning';
                case 'Padding':
                    return 'warning';
                case 'Incomplete':
                    return 'info';
                case 'Declined':
                    return 'danger';

                default:
                    return null;
            }
        }
    }
}
</script>
