<<<<<<< HEAD
<template>
    <div class="container-fluid">
        <header>
            <div>
                <h4><strong>Orders</strong></h4>
            </div>
            <div>
                <p>You have total 706 orders</p>
            </div>
        </header>
        <main>
            <div class="card">
                <header>
                    <form action="">
                        <p>
                            <strong class="text-black text-bold text-xl"
                                >Orders</strong
                            >
                        </p>
                        <div class="row gx-5">
                            <div class="col">
                                <div class="form">
                                    <select
                                        name=""
                                        id="select1"
                                        class="form-select"
                                    >
                                        <option selected>
                                            Delivery Status
                                        </option>
                                        <option value="">test1</option>
                                        <option value="">test4</option>
                                        <option value="">test3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control mr-5"
                                    placeholder="Enter Order Period"
                                />
                            </div>
                            <div class="col">
                                <div class="form">
                                    <select
                                        name=""
                                        id="select1"
                                        class="form-select"
                                    >
                                        <option selected>Latest On Top</option>
                                        <option value="">test1</option>
                                        <option value="">test4</option>
                                        <option value="">test3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Search"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                    <button class="btn btn-dark">
                                        <i
                                            class="fa fas fa-search text-white"
                                        ></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </header>
                <div class="table-responsive">
                    <table class="table-hover table table-striped">
                        <thead class="">
                            <tr>
                                <th class="col-1">#</th>
                                <th class="">Order Code</th>
                                <th>Customer</th>
                                <th>Total Product</th>
                                <th>Total Price</th>
                                <th>Deleivery Status</th>
                                <th>Payment Status</th>
                                <th>Refunds</th>
                                <th>options</th>
                            </tr>
                        </thead>
                        <tbody class="items-center">
                            <tr>
                                <td>1</td>
                                <td>1-#8762423436456</td>
                                <td>Walk-In Customer</td>
                                <td>1</td>
                                <td>$1.2343.00</td>
                                <td>
                                    <span class="badge bg-warning"
                                        >Pending</span
                                    >
                                </td>
                                <td>
                                    <span class="badge bg-warning">Unpaid</span>
                                </td>
                                <td><span>0 refunded</span></td>
                                <td>
                                    <div>
                                        <router-link
                                            :to="{ name: 'invoice-detail' }"
                                            type="button"
                                            class="btn btn-info rounded-circle"
                                        >
                                            <i class="fa fas fa-eye"></i>
                                        </router-link>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            class="btn btn-dark rounded-circle"
                                        >
                                            <i class="fa fas fa-download"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1-#8762423436456</td>
                                <td>Walk-In Customer</td>
                                <td>1</td>
                                <td>$1.2343.00</td>
                                <td>
                                    <span class="badge bg-warning"
                                        >Pending</span
                                    >
                                </td>
                                <td>
                                    <span class="badge bg-warning">Unpaid</span>
                                </td>
                                <td><span>0 refunded</span></td>
                                <td>
                                    <div>
                                        <router-link
                                            :to="{ name: 'invoice-detail' }"
                                            type="button"
                                            class="btn btn-info rounded-circle"
                                        >
                                            <i class="pi pi-eye"></i>
                                        </router-link>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            class="btn btn-dark rounded-circle"
                                        >
                                            <i class="pi pi-download"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: "oder-list",
    data() {
        return {};
    },
};
</script>
=======
<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="relative text-black text-3xl section section-title:before">All Order</h2>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card slot="header" class="box-card">
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <div class="flex flex-wrap gap-3 p-fluid">
                            <div class="flex-auto text-sm p-float-label flex align-items-center justify-content-center">
                                <label for="startDateFilter"> Start Date </label>
                                <Calendar id="startDateFilter" v-model="orderListStartFilter"  inputId="startDateOrder" showIcon showTime hourFormat="12" />
                            </div>
                            <div class="flex-auto text-sm p-float-label flex align-items-center justify-content-center">
                                <label for="endDateFilter"> End Date </label>
                                <Calendar id="endDateFilter" v-model="orderListEndFilter" inputId="endDateOrder" showIcon showTime hourFormat="24" />
                            </div>
                            <div class="flex-auto p-float-label text-sm flex align-items-center justify-content-center">
                                <Button icon="pi pi-search" class="btn btn-primary h-3rem w-10rem pl-3" label="Show Data" />
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
                              ref="dt" 
                                :value="usersListArr" 
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
                                        <h4 class="m-0">
                                           
                                        </h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty Users -->
                                <template #empty> No Order found... </template>
                                <!-- Loading Users -->
                                <template #loading> Loading Order data. Please wait... </template>
                                <!--------------Check Existed Data ----------->
                                <div v-if="usersListArr && usersListArr.length > 0 && usersListArr != ''">
                                    <!-- Columns -->
                                   <Column field="order_date" header="Order Date" sortable></Column>
                                    <Column field="id" header="Customer Info" sortable>
                                        <template #body="slotProps">
                                            <div class="justify-content-center">
                                                <p class="font-bold"> {{slotProps.data?.name_eng}}</p>
                                               <span>{{ slotProps.data?.user_phonenumber }}</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column field="store" header="Store" sortable></Column>
                                    <Column field="total_price" header="Total Amount" sortable></Column>
                                    <Column field="id" header="Order Status" sortable>
                                        <template #body="slotProps">
                                            <div class="justify-content-center">
                                                <Tag :value="slotProps.data.payment_status" :severity="getSeverityPaymentStatus(slotProps.data?.payment_status)" />
                                            </div>
                                        </template>
                                    </Column>
                                    <Column :exportable="false" header="Options" style="min-width:8rem">
                                        <template #body="slotProps">
                                            <Button icon="pi pi-eye" outlined rounded class="mr-2"
                                                @click="$router.push({ path: `/vendor/order_managements/customer_detail/customer_order/order_detail/${slotProps.data?.orderId }` })" />
                                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                                @click="confirmDeleteUserMS(slotProps.data.id)" />
                                        </template>
                                    </Column>
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
import CustomerOrderMSServices from '../../../services/vendors/order_managements/OrdersManagementsServices';
import { ElMessage } from 'element-plus';
export default {
    data() {
        return {
            usersID: '',
            usersListArr: '',
            statusUsersSwitch: '',
            deleteUsersDialog: false,
            product: '',
            selectedRolesList: '',
            statusUserSwitch: false,
            orderListStartFilter: null,
            orderListEndFilter: null,
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        }
    },
    created() {
        this.cusMSServices = new CustomerOrderMSServices();
    },
    mounted() {
        const cusMSServices = new CustomerOrderMSServices();
        cusMSServices.getViewCustomerOrder().then((data) => {
            console.log(data)
            if (!data) {
               this.usersListArr = [];
            }
            this.usersListArr = Array.isArray(data) ? data.slice() : [];
        });
    },
    methods: {
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
        },  
        deleteUserMSByID() {
            if (!this.usersID) {
                ElMessage.error("Users Not Found...");
            }
            this.userPerMSServices.deleteUserMS(this.usersID).then((del) => {
                ElMessage.success(del.data.message);
                this.deleteCatDialog = false;
            }).catch((error) => {
                ElMessage.error(error);
            });
        }
    }
}
</script>
>>>>>>> main
