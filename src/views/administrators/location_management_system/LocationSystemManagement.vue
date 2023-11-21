<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class=" font-primary text-3xl  font-medium ">Locations</h2>
           <el-button type="info" size="large" class="btn btn-primary"  @click="$router.push('/admin/locations/management_location_system/create-location')">
                <div class="" v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_create' }]">
                    <i class="pi pi-plus"></i>
                    <span class="pl-2">
                        Create New
                    </span>
                </div>
            </el-button>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                                <DataTable 
                                    scrollable
                                    ref="dt" 
                                    :value="deliveryProductToCustomerList" 
                                    v-model:selection="selectedVendorConfirmDelivery"
                                    dataKey="id"
                                    :paginator="true" :rows="10" 
                                    :filters="filters"
                                    class="p-datatable-scrollable text-sm"
                                    :globalFilterFields="['representative.orderDate', 'name_eng', 'invoiceNo', 'order_status', 'store']"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    :rowsPerPageOptions="[5, 10, 25]"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
                                    <!-- Header -->
                                    <template #header>
                                        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                            <!-- Filter Date Order -->
                                            <h4 class="m-0">
                                                
                                            </h4>
                                            <span class="p-input-icon-left">
                                                <i class="pi pi-search" />
                                                <InputText v-model="filters['global'].value" :placeholder="$t('route.search')" />
                                            </span>
                                        </div>
                                    </template>
                                    <!-- Empty Users -->
                                    <template #empty> {{ $t('message.noHaveData') }}</template>
                                    <!-- Loading Users -->
                                    <template #loading> {{ $t('message.dataLoading') }}</template>
                                    <!--------------Check Existed Data ----------->
                                    <template v-if="deliveryProductToCustomerList && deliveryProductToCustomerList.length > 0 && deliveryProductToCustomerList != ''">
                                        <!-- Columns -->
                                        <Column field="invoiceNo" header="Invoice No" sortable></Column>
                                        <Column field="orderDate" header="Order Date" sortable></Column>
                                        <Column field="id" header="Shop" sortable>
                                            <template #body="slotProps">
                                                <div class="justify-content-center">
                                                    <p class="font-bold text-sm"> {{slotProps.data?.store}}</p>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column field="id" header="Customer Info" sortable>
                                            <template #body="slotProps">
                                                <div class="justify-content-center">
                                                    <p class="font-bold text-sm"> {{slotProps.data?.name_eng}}</p>
                                                    <span>{{ slotProps.data?.user_email }}</span>
                                                    <span>{{ slotProps.data?.user_phonenumber }}</span>
                                                </div>
                                            </template>
                                        </Column>
                                    </template>
                                </DataTable>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Script of Delivery -->
<script>
    import { FilterMatchMode } from 'primevue/api';
    import DeliveryTrackingServices from "@/services/delivery_tracking/DeliveryTrackingService";
    export default{
        data(){
            return {
                deliveryProductToCustomerList: [],  
                selectedVendorConfirmDelivery: null,
                filters: {
                    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
                }
            }
        },
        created(){
            this.deliveryTracking = new DeliveryTrackingServices();
        },
        mounted() {
            this.deliveryProductList();
        },
        methods: {
            deliveryProductList(){
                try{         
                    this.deliveryTracking.getVendorConfirmToDeliveryCompanyCustomer().then((delivery) => {
                            if (!delivery) {
                                this.deliveryProductToCustomerList = [];
                            }
                            console.log(delivery)
                            this.deliveryProductToCustomerList = Array.isArray(delivery) ? delivery.slice() : [];
                        }).catch((error) => {
                            return Promise.reject(error.message || []);
                        });
                }catch(error){
                    return Promise.reject(error.message || []);
                }
            },
        }
    }
</script>