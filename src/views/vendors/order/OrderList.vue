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
                                   <Column field="full_latin_name" header="Order Date" sortable style="min-width:20rem"></Column>
                                    <Column field="user_email" header="Customer Info" sortable style="min-width:20rem"></Column>
                                    <Column field="user_phonenumber" header="Total Amount" sortable style="min-width:20rem"></Column>
                                    <Column field="user_id" header="Role" sortable style="min-width:20rem"></Column>
                                    <Column :exportable="false" header="Options" style="min-width:8rem">
                                        <template #body="slotProps">
                                            <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                                                @click="$router.push({ path: `/vendor/user/list/crete-user-auth/ui-user-edit/${slotProps.data.user_id}` })" />
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
            if (!data) {
               this.usersListArr = [];
            }
            this.usersListArr = data;
        });
    },
    methods: {
        confirmDeleteUserMS(userId) {
            this.usersID = userId;
            this.deleteUsersDialog = true;
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
