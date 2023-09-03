<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between mb-3">
            <h2 class="flex relative text-black text-xl section section-title:before">
                <img class="flex align-items-center justify-content-center " src="../../../../src/assets/img/product_icons/customer_icons.jpeg" alt="Image" width="50"/>
                <span class="flex align-items-center justify-content-center pl-2">Customer Details</span>
            </h2>
            <el-button class="btn btn-primary text-sm"  type="info" size="large" @click="$router.push('/vendor/user/list/admin/seller_lists')">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">Back</span>
                </div>
            </el-button>
        </div>
        <!-- Customer Order Info -->
        <div class="flex flex-column pl-2">
            <h6 class="h5 pb-2"> Customer ID #9</h6>
            <div class="mb-4 d-flex align-items-center gap-2">
                <i class="pi pi-calendar" style="font-size: 1.5rem"></i>
                <span class="h6">Joined At : 12 Oct 2022 05:11:12</span>
            </div>
        </div>
        <!-- Contents of View Products -->
        <div class="grid">
            <div class="col-8">
                <el-card class="box-card">
                    <DataTable
                        :value="customerDetailOrder" 
                        tableStyle="min-width: 50rem"
                        class="p-datatable-scrollable text-sm"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25]"
                        dataKey="id"
                        :globalFilterFields="['representative.name', 'order_id']"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    >
                            <template #header>
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <span class="text-xl text-900 font-bold">Customer Orders</span>
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search" />
                                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                                    </span>
                                </div>
                            </template>
                            <!-- Empty Users -->
                            <template #empty> No customer order found... </template>
                            <!-- Loading Users -->
                            <template #loading> Loading customer order data. Please wait... </template>
                            <!--------------Check Existed Data ----------->
                            <div v-if="customerDetailOrder && customerDetailOrder.length > 0 && customerDetailOrder != ''">
                                <Column field="id" header="Order ID" sortable style="min-width:20rem">
                                    <template #body="body">
                                       <span>
                                        <router-link :to="`/vendor/order_managements/customer_detail/customer_order/order_detail/${parseInt(body.data?.orderId ?? '')}`">
                                             {{ body?.data?.orderId }}
                                        </router-link>
                                       </span>
                                    </template>
                                </Column>
                                <Column field="id" header="Total" sortable style="min-width:20rem">
                                    <template #body="body">
                                        {{ body?.data?.total_price }}
                                    </template>
                                </Column>
                                <Column headerStyle="width: 15rem; text-align: center; alignment-item:center;" header="Actions" bodyStyle="text-align: center; overflow: visible">
                                    <template #body="{ data }">
                                        <div class="flex flex-wrap gap-2">
                                            <Button icon="pi pi-search" outlined rounded class="mr-2" @click.prevent="$router.push(`/vendor/order_managements/customer_detail/customer_order/order_detail/${parseInt(data?.orderId) ?? ''}`)"/>
                                        </div>
                                    </template> 
                                </Column>
                            </div>
                        </DataTable>
                </el-card>
            </div>
            <!-- <div class="col-4">
                <el-card class="box-card">
                    <div class="flex justify-content-between flex flex-wrap gap-3">
                        <div class="relative text-black text-sm section section-title:before">
                            <p class="h6">Customer</p>
                        </div>
                    </div>
                    <div class="py-2">
                        <div class="mb-4 d-flex align-items-center gap-2">
                              <img  src="../../../../src/assets/img/product_icons/customer_icon_default_order.png" class="circle" alt="Image" width="50"/>
                            <div class="px-2">
                                {{ customerDetailOrder }}
                            </div>
                        </div>
                    </div>
                </el-card>
            </div> -->
        </div>
    </div>
</template>

<!-- Script -->
<script>
    import { FilterMatchMode } from 'primevue/api';
    import CustomerServices from '../../../services/administrator/customers/CustomerServices';
    export default{
        data(){
            return{
                customerDetailOrder: [],
                filters: {
                    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
                }
            }
        },
        created() {
            this.customerServicesMS = new CustomerServices();
        },
        mounted() {
            const customerOrderID = this.$route.params.customerId ?? '';
            this.customerServicesMS.getCustomerListDetailByOrder(customerOrderID).then((data) => {
                if (!data) {
                    this.customerDetailOrder = [];
                }
                this.customerDetailOrder = Array.isArray(data) ? data.slice() : [];
            });
        }
    }
</script>