<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2
                class="relative text-black text-3xl section section-title:before"
            >
                Users Lists
            </h2>
            <div class="d-flex align-items-center gap-3">
                <router-link
                    to="/vendor/user/list/crete-user-auth/ui-user-create"
                    class="text-center btn btn-primary d-flex gap-2"
                >
                    <svg
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
                    New User
                </router-link>
            </div>
        </div>
        <div class="gird">
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
                                :paginator="true"
                                :rows="10"
                                :filters="filters"
                                class="p-datatable-scrollable"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5, 10, 25]"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                            >
                                <!-- Header -->
                                <template #header>
                                    <div
                                        class="flex flex-wrap gap-2 align-items-center justify-content-between"
                                    >
                                        <h4 class="m-0"></h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText
                                                v-model="
                                                    filters['global'].value
                                                "
                                                placeholder="Search..."
                                            />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty Users -->
                                <template #empty> No Users found... </template>
                                <!-- Loading Users -->
                                <template #loading>
                                    Loading Users data. Please wait...
                                </template>
                                <!--------------Check Existed Data ----------->
                                <div
                                    v-if="
                                        usersListArr &&
                                        usersListArr.length > 0 &&
                                        usersListArr != ''
                                    "
                                >
                                    <!-- Columns -->
                                    <Column
                                        field="full_latin_name"
                                        header="User Name"
                                        sortable
                                        style="min-width: 20rem"
                                    ></Column>
                                    <Column
                                        field="user_email"
                                        header="Email"
                                        sortable
                                        style="min-width: 20rem"
                                    ></Column>
                                    <Column
                                        field="user_phonenumber"
                                        header="Phone"
                                        sortable
                                        style="min-width: 20rem"
                                    ></Column>
                                    <!-- <Column field="user_id" header="Role" sortable style="min-width:20rem"></Column> -->
                                    <Column 
                                        field="role_name"
                                        header="Role"
                                        sortable
                                        style="min-width: 20rem">
                                    
                                    </Column>
                                    <Column
                                        field="category"
                                        header="Option Status"
                                        sortable
                                        style="min-width: 10rem"
                                    >
                                        <template #body="slotProps">
                                            <div class="font-bold">
                                                <el-switch
                                                    @click="changeStatusUsers(slotProps.data.user_id,slotProps.data.user_status)"
                                                    :key="slotProps?.data.user_id"
                                                    id="slotProps?.data.user_id"
                                                    v-model="slotProps.data.user_status"
                                                />
                                            </div>
                                        </template>
                                    </Column>
                                    <Column
                                        :exportable="false"
                                        header="Options"
                                        style="min-width: 8rem"
                                    >
                                        <template #body="slotProps">
                                            <Button
                                                icon="pi pi-pencil"
                                                outlined
                                                rounded
                                                class="mr-2"
                                                @click="
                                                    $router.push({
                                                        path: `/vendor/user/list/crete-user-auth/ui-user-edit/${slotProps.data.user_id}`,
                                                    })
                                                "
                                            />
                                            <Button
                                                icon="pi pi-trash"
                                                outlined
                                                rounded
                                                severity="danger"
                                                @click="
                                                    confirmDeleteUserMS(
                                                        slotProps.data.id
                                                    )
                                                "
                                            />
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
                                <i
                                    class="pi pi-exclamation-triangle mr-3"
                                    style="font-size: 2rem"
                                />
                                <span>Are you sure you want to delete?</span>
                            </div>
                            <template #footer>
                                <Button
                                    label="No"
                                    icon="pi pi-times"
                                    text
                                    @click="deleteUsersDialog = false"
                                />
                                <Button
                                    label="Yes"
                                    icon="pi pi-check"
                                    text
                                    @click="deleteUserMSByID"
                                />
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
import { FilterMatchMode } from "primevue/api";
import UserPermissionsMSServices from "../../../../services/vendors/user_permissions/UserPermissionsMSServices";
import { ElMessage } from "element-plus";
export default {
    data() {
        return {
            usersID: "",
            usersListArr: "",
            statusUsersSwitch: "",
            deleteUsersDialog: false,
            product: "",
            selectedRolesList: "",
            statusUserSwitch: true,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        };
    },
    created() {
        this.userPerMSServices = new UserPermissionsMSServices();
    },
    mounted() {
        const userPerMSServices = new UserPermissionsMSServices();
        userPerMSServices.getListUserData().then((data) => {
            console.log(data);
            if (!data) {
                ElMessage.error("Internal Error...");
            }
            this.usersListArr = data;
        });
    },
    computed: {
        dataUrl(preImg) {
            return (
                "data:image/jpeg;base64," +
                btoa(
                    new Uint8Array(preImg).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                )
            );
        },
    },
    methods: {
        confirmDeleteUserMS(userId) {
            this.usersID = userId;
            this.deleteUsersDialog = true;
        },
        changeStatusUsers(userId, userStatus){
            this.usersListArr.find((user) => {
                if(user.user_id == userId){
                    const userStatusId = {
                        userStatus: userStatus? 'Active' : 'Inactive'
                    }
                    this.userPerMSServices.changeUserStatusVerify(userId,userStatusId).then(response => {
                        if (response.data.success == true) {
                            ElMessage.success('Update User Status Successfully...');
                        }
                    }).catch((error) => {
                        ElMessage.error(`Fail Update: ${error.response.data?.message}`);
                    });
                }
            });
        },
        deleteUserMSByID() {
            if (!this.usersID) {
                ElMessage.error("Users Not Found...");
            }
            this.userPerMSServices
                .deleteUserMS(this.usersID)
                .then((del) => {
                    ElMessage.success(del.data.message);
                    this.deleteCatDialog = false;
                })
                .catch((error) => {
                    ElMessage.error(error);
                });
        },
    },
};
</script>
