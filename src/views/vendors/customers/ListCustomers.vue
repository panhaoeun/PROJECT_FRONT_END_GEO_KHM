<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="relative text-black text-3xl section section-title:before">Customer Lists</h2>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                            <DataTable 
                              ref="dt" 
                                :value="customerArrAdmin" 
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
                                        <h4 class="m-0">
                                            
                                        </h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty Users -->
                                <template #empty> No Users found... </template>
                                <!-- Loading Users -->
                                <template #loading> Loading Users data. Please wait... </template>
                                <!--------------Check Existed Data ----------->
                                <div v-if="customerArrAdmin && customerArrAdmin.length > 0 && customerArrAdmin != ''">
                                    <!-- Columns -->
                                   <Column field="full_latin_name" header="User Name" sortable style="min-width:20rem"></Column>
                                    <Column field="user_email" header="Email" sortable style="min-width:20rem"></Column>
                                    <Column field="user_phonenumber" header="Phone" sortable style="min-width:20rem"></Column>
                                    <!-- <Column field="user_id" header="Role" sortable style="min-width:20rem"></Column> -->
                                    <Column header="Status">
                                        <template #body="slotProps">
                                            <Tag :value="slotProps?.data.status" />
                                        </template>
                                    </Column>
                                    <Column field="category" header="Option Status" sortable style="min-width:10rem">
                                        <template #body>
                                            <div class="font-bold">
                                                <el-switch v-model="statusUserSwitch" />
                                            </div>
                                        </template>
                                    </Column>
                                    <Column :exportable="false" header="Options" style="min-width:8rem">
                                        <template #body="slotProps">
                                            <Button icon="pi pi-eye" outlined rounded class="mr-2"
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
// import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from 'primevue/api';
import CustomerServicesBaseAdmin from '../../../services/administrator/customers/CustomerServices';
import { ElMessage } from 'element-plus';
export default {
    data() {
        return {
            usersID: '',
            customerArrAdmin: '',
            statusUsersSwitch: '',
            deleteUsersDialog: false,
            product: '',
            selectedRolesList: '',
            statusUserSwitch: false,
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        }
    },
    created() {
        this.adminCheckCustomers = new CustomerServicesBaseAdmin();
    },
    mounted() {
        const adminCheckCustomers = new CustomerServicesBaseAdmin();
        adminCheckCustomers.getCustomerList().then((data) => {
            console.log(data)
            if (!data) {
                ElMessage.error("Internal Error...");
            }
            this.customerArrAdmin = data;
        });
    },
    computed: {
        dataUrl(preImg) {
            return 'data:image/jpeg;base64,' + btoa(
                new Uint8Array(preImg)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }
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
            this.adminCheckCustomers.deleteUserMS(this.usersID).then((del) => {
                ElMessage.success(del.data.message);
                this.deleteCatDialog = false;
            }).catch((error) => {
                ElMessage.error(error);
            });
        }
    }
}
</script>
