<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between px-4 py-4">
            <h2 class="relative text-black text-xl section section-title:before ">{{ $t('order.allOrder') }}</h2>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card  class="box-card">
                    <!-- Hidden -->
                    <input hidden  v-model="orderListArrComputed"/>
                    <!-- From Date to End Date -->
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <div class="flex flex-wrap gap-3 p-fluid">
                            <div class="flex-auto text-sm p-float-label">
                                <label for="startDateFilter" class="text-sm"> Start Date </label>
                                <Calendar class="text-sm" 
                                    required
                                    :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.orderListStartFilter.$invalid && isSearchLoading }"
                                    id="startDateFilter" dateFormat="mm/dd/yy" 
                                    v-model="v$.orderListStartFilter.$model"  
                                    inputId="startDateOrder"
                                    showIcon 
                                     hourFormat="12" 
                                    showButtonBar
                                />
                                <small v-if="(v$.orderListStartFilter.$invalid && isSearchLoading) || v$.orderListStartFilter.$pending.$response" class="p-error">{{v$.orderListStartFilter.required.$message.replace('Value', 'Please Select Start Date')}}</small>
                            </div>
                            <div class="flex-auto text-sm p-float-label">
                                <label for="endDateFilter" class="text-sm"> End Date </label>
                                <Calendar class="text-sm" id="endDateFilter"
                                    v-model="v$.orderListEndFilter.$model"
                                    showButtonBar
                                    :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.orderListEndFilter.$invalid && isSearchLoading }"
                                    dateFormat="mm/dd/yy" 
                                    inputId="endDateOrder"
                                    showIcon 
                                    hourFormat="24"
                                />
                                <small v-if="(v$.orderListEndFilter.$invalid && isSearchLoading) || v$.orderListEndFilter.$pending.$response" class="p-error">{{v$.orderListEndFilter.required.$message.replace('Value', 'Please Select End Date')}}</small>
                            </div>
                            <div class="flex-auto p-float-label text-sm flex align-items-center justify-content-center">
                                <Button icon="pi pi-search" class="text-sm btn btn-primary h-3rem w-10rem pl-3" :loading="isSearchLoading" @click.prevent="filterOrderItemByDateRange(!v$.$invalid)" :label="$t('order.showData')" />
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                                <DataTable 
                                    scrollable
                                    ref="dt" 
                                    :value="ordersListArr" 
                                    v-model:selection="selectedOrderList"
                                    dataKey="id"
                                    :paginator="true" :rows="10" 
                                    :filters="filters"
                                    class="p-datatable-scrollable text-sm"
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
                                    <template v-if="ordersListArr && ordersListArr.length > 0 && ordersListArr != ''">
                                        <!-- Columns -->
                                        <Column field="orderDate" header="Order Date" sortable></Column>
                                        <Column field="id" header="Customer Info" sortable>
                                            <template #body="slotProps">
                                                <div class="justify-content-center">
                                                    <p class="font-bold text-sm"> {{slotProps.data?.name_eng}}</p>
                                                    <span>{{ slotProps.data?.user_phonenumber }}</span>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column field="store" header="Store" sortable></Column>
                                        <Column field="id" header="Total Amount" sortable>
                                            <template #body="slotProps">
                                                <span>{{ slotProps.data.total_price ?? 0 }}</span>
                                            </template>
                                        </Column>
                                        <Column field="id" header="Order Status" sortable>
                                            <template #body="slotProps">
                                                <div class="justify-content-center">
                                                    <Tag :value="slotProps.data.order_status" class="text-white" :severity="getSeverityPaymentStatus(slotProps.data?.order_status)" />
                                                </div>
                                            </template>
                                        </Column>
                                        <Column :exportable="false" header="Options" style="min-width:8rem">
                                            <template #body="slotProps">
                                                <Button icon="pi pi-eye" outlined rounded class="mr-2"
                                                    @click="$router.push({ path: `/vendor/order_managements/customer_detail/customer_order/order_detail/${slotProps.data?.orderId }` })" />
                                            </template>
                                        </Column>
                                    </template>
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
import CustomerOrderMSServices from '../../../services/vendors/order_managements/OrdersManagementsServices';
import { ElMessage } from 'element-plus';
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
    setup: () => ({ v$: useVuelidate() }),
    validations() {
        return {
            orderListStartFilter: {required},
            orderListEndFilter: {required}
        }
    }, 
    data() {
        return {
            selectedOrderList: null,
            searchFilterOrder: '',
            lazyLoading: false,
            loadLazyTimeout: null,
            usersID: '',
            ordersListArr: null ,
            statusUsersSwitch: '',
            deleteUsersDialog: false,
            product: '',
            selectedRolesList: '',
            statusUserSwitch: false,
            orderListStartFilter: null,
            orderListEndFilter: null,
            isSearchLoading: false,
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        }
    },
    created() {
        this.cusMSServices = new CustomerOrderMSServices();
    },
    computed: {
        orderListArrComputed(){
            return this.listOrderEmptyFilterDate();
        },
    },
    methods: {
        /**
         * Date to timestamp
         * @param  string template
         * @param  string date
         * @return string
        * @example convertDateTimeFormate("26-02-2012",'yyyy-MM-dd hh:mm:ss') return 2023-06-23 11:07:56
        */
        todayCurrentDate(){
            let today = new Date(),
            todayDate = ('0'+today.getDate()).slice(-2),
            todayMonth = ('0'+ (today.getMonth() + 1) ).slice(-2),
            todayYear = today.getFullYear();
            // Day
            let day = '';
            day = todayYear+'-'+('0' +(todayMonth)).slice(-2)+'-'+(todayDate);
            return day;
        },
        convertDateTimeFormate(dateString, formate){
            const date = new Date(dateString);
            if (date == "Invalid Date" && isNaN(date) || typeof date == 'number' && date != 0 && !date) {
                ElMessage.error(`Invalid Formate | Please Formate Date 2023-06-23 11:07:56 :${date}:${dateString}`);
            }
            var dateFormate = {
                M: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                m: date.getMinutes(),
                s: date.getSeconds()
            };
            const replaceFormate = formate.replace(/(M+|d+|h+|m+|s+)/g, function (formate) {
                return ((formate.length > 1 ? "0" : "") + dateFormate[formate.slice(-1)]).slice(-2)
            });
            return replaceFormate.replace(/(y+)/g, function (v) {
                return date.getFullYear().toString().slice(-v.length)
            });
        },
        getTimestampOneMonthAgo(){
            const currentDate = new Date();
            // const currentDayOfMonth = currentDate.getDate();
            const syntaxFormate = {
                M: currentDate.getMonth() - 2,
                d: currentDate.getDate(),
                h: currentDate.getHours(),
                m: currentDate.getMinutes(),
                s: currentDate.getSeconds()
            }
            //Formate Date 
            const formate = "yyyy-MM-dd hh:mm:ss";
           const replaceFormate = formate.replace(/(M+|d+|h+|m+|s+)/g, function (formate) {
                return ((formate.length > 1 ? "0" : "") + syntaxFormate[formate.slice(-1)]).slice(-2)
            });
            return replaceFormate.replace(/(y+)/g, function (v) {
                return currentDate.getFullYear().toString().slice(-v.length)
            });
        },
        // Search Filter Orders 
        filterOrderItemByDateRange(validation){
            if(!validation){
                this.isSearchLoading = true;
                setTimeout(function(){
                    this.isSearchLoading = false;
                }.bind(this),1000);
                return;
            }
            try{
                if(this.orderListStartFilter !== '' && this.orderListEndFilter !== ''){
                    this.isSearchLoading = false;
                    const startDateFilter =  this.convertDateTimeFormate(this.orderListStartFilter,"yyyy-MM-dd hh:mm:ss");
                    const endDateFilter =  this.convertDateTimeFormate(this.orderListEndFilter,"yyyy-MM-dd hh:mm:ss");
                    return this.orderListManagements(startDateFilter,endDateFilter);     
                }
            }catch(err){
                ElMessage.error(err.message);
                return false;
            }
        },
        orderListManagements(fromDate,toDate){
           try{         
                const cusMSServices = new CustomerOrderMSServices();
                cusMSServices.getViewCustomerOrder(fromDate,toDate).then((data) => {
                    if (!data) {
                        this.ordersListArr = [];
                    }
                    this.ordersListArr = Array.isArray(data) ? data.slice() : [];
                }).catch((error) => {
                   ElMessage.error(error.message || []);
                });
           }catch(error){
                console.log(error)
                ElMessage.error(error?.message || []);
           }
        },
        listOrderEmptyFilterDate(){
            if(this.orderListStartFilter ==  '' && this.orderListEndFilter == '' || this.orderListStartFilter ==  null && this.orderListEndFilter ==  null){
                const previousOneMonthAgo = this.getTimestampOneMonthAgo();
                const todayDate = this.todayCurrentDate();
                return this.orderListManagements(previousOneMonthAgo,todayDate);
            }  
        },
        confirmDeleteUserMS(userId) {
            this.usersID = userId;
            this.deleteUsersDialog = true;
        },
        getSeverityPaymentStatus(payStatus){
            switch (payStatus) {
                case 'Complete':
                    return 'success';

                case 'Padding':
                    return 'warning';

                case 'Incomplete':
                    return 'danger';
                case 'Declined':
                    return 'info';

                default:
                    return null;
            }
        }
    }
}
</script>
