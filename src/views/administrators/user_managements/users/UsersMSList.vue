<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                {{ $t("users.listUsers") }}
            </h2>
            <!-- Permissions Modules -->
            <!-- Vendor -->
            <template
                v-if="
                    currentUserAuth && currentUserAuth[1].typeUser === 'Vendor'
                "
            >
                <el-button
                    type="info"
                    size="large"
                    class="btn btn-primary"
                    @click.prevent="
                        $router.push(
                            '/vendor/vendor-list/create-account-vendor'
                        )
                    "
                    v-permission="[
                        {
                            functionName: 'users_modules',
                            moduleName: 'fun_create',
                        },
                    ]"
                >
                    <div class="button">
                        <i class="pi pi-plus" style="font-size: 1rem"></i>
                        <span class="pl-2">{{ $t("users.addUsers") }}</span>
                    </div>
                </el-button>
            </template>
            <!-- Admin -->
            <template
                v-if="
                    currentUserAuth && currentUserAuth[1].typeUser === 'Admin'
                "
            >
                <el-button
                    type="info"
                    size="large"
                    class="btn btn-primary"
                    @click.prevent="
                        $router.push(
                            '/vendor/user/list/crete-user-auth/ui-user-create'
                        )
                    "
                    v-permission="[
                        {
                            functionName: 'users_modules',
                            moduleName: 'fun_create',
                        },
                    ]"
                >
                    <div class="button">
                        <i class="pi pi-plus" style="font-size: 1rem"></i>
                        <span class="pl-2">{{ $t("users.addUsers") }}</span>
                    </div>
                </el-button>
            </template>
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
                                v-model:selection="selectedUserList"
                                dataKey="id"
                                :paginator="true"
                                :rows="10"
                                :globalFilterFields="[
                                    'representative.userName',
                                    'userName',
                                    'role_name',
                                    'user_email',
                                    'user_phonenumber',
                                ]"
                                :filters="filters"
                                class="p-datatable-scrollable text-sm"
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
                                                :placeholder="
                                                    $t('users.search')
                                                "
                                            />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty Users -->
                                <template #empty
                                    >{{ $t("message.noHaveData") }}
                                </template>
                                <!-- Loading Users -->
                                <template #loading>
                                    {{ $t("dataLoading") }}
                                </template>
                                <!--------------Check Existed Data ----------->
                                <div
                                    v-if="
                                        usersListArr &&
                                        usersListArr.length > 0 &&
                                        usersListArr != ''
                                    "
                                >
                                    <!-- {{ full_kh_name }} -->
                                    <!-- Columns -->
                                    <Column
                                        field="full_latin_name"
                                        :header="$t('users.userName')"
                                        sortable
                                        style="min-width: 20rem"
                                    ></Column>
                                    <Column
                                        field="user_email"
                                        :header="$t('users.userEmail')"
                                        sortable
                                        style="min-width: 20rem"
                                    ></Column>
                                    <Column
                                        field="user_phonenumber"
                                        :header="$t('users.userPhone')"
                                        sortable
                                        style="min-width: 20rem"
                                    ></Column>
                                    <!-- <Column field="user_id" header="Role" sortable style="min-width:20rem"></Column> -->
                                    <Column
                                        field="role_name"
                                        :header="$t('route.role')"
                                        sortable
                                        style="min-width: 20rem"
                                    ></Column>
                                    <!-- <Column v-permission="[{ functionName: 'permissions_module', moduleName: 'fun_edit' }]"
                                        field="status" :header="$t('route.status')" sortable style="min-width: 10rem">
                                        <template #body="slotProps">
                                            <template v-if="slotProps.data?.role_name !== 'Owner' || slotProps.data?.role_name !== 'Super Admin' || slotProps.data?.role_name !== 'Admin'">
                                                <div class="font-bold">
                                                    {{ slotProps.data?.user_status === true }}
                                                    <el-switch
                                                        v-permission="[{ functionName: 'users_modules', moduleName: 'fun_edit' }]"
                                                        @click="changeStatusUsers(slotProps.data?.user_id, slotProps.data?.user_status, $event)"
                                                        :key="slotProps?.data.user_id" id="slotProps?.data.user_id"
                                                        v-model="slotProps.data.user_status" 
                                                    />
                                                </div>
                                            </template>
                                        </template>
                                    </Column> -->
                                    <Column
                                        :exportable="false"
                                        header="Options"
                                        style="min-width: 8rem"
                                    >
                                        <template #body="slotProps">
                                            <!-- Vendor Account Edited -->
                                            <template
                                                v-if="
                                                    currentUserAuth &&
                                                    currentUserAuth[1]
                                                        .typeUser === 'Vendor'
                                                "
                                            >
                                                <template
                                                    v-if="
                                                        slotProps.data
                                                            ?.role_name !==
                                                        'Owner'
                                                    "
                                                >
                                                    <Button
                                                        v-permission="[
                                                            {
                                                                functionName:
                                                                    'users_modules',
                                                                moduleName:
                                                                    'fun_edit',
                                                            },
                                                        ]"
                                                        icon="pi pi-pencil"
                                                        outlined
                                                        rounded
                                                        class="mr-2"
                                                        @click="
                                                            $router.push({
                                                                path: `/vendor/vendor-list/updated-account-vendor/${slotProps.data?.user_id}`,
                                                            })
                                                        "
                                                    />
                                                    <!-- v-permission="[{ functionName: 'users_modules', moduleName: 'fun_deleted' }]"   -->
                                                    <Button
                                                        icon="pi pi-trash"
                                                        outlined
                                                        rounded
                                                        severity="danger"
                                                        @click="
                                                            confirmDeleteUserMS(
                                                                slotProps.data
                                                                    ?.user_id
                                                            )
                                                        "
                                                    />
                                                </template>
                                            </template>
                                            <!-- Admin Account Edited -->
                                            <template
                                                v-if="
                                                    currentUserAuth &&
                                                    currentUserAuth[1]
                                                        .typeUser === 'Admin'
                                                "
                                            >
                                                <template
                                                    v-if="
                                                        slotProps.data
                                                            ?.role_name !==
                                                            'Super Admin' &&
                                                        slotProps.data
                                                            ?.role_name !==
                                                            'Admin'
                                                    "
                                                >
                                                    <Button
                                                        v-permission="[
                                                            {
                                                                functionName:
                                                                    'users_modules',
                                                                moduleName:
                                                                    'fun_edit',
                                                            },
                                                        ]"
                                                        icon="pi pi-pencil"
                                                        outlined
                                                        rounded
                                                        class="mr-2"
                                                        @click="
                                                            $router.push({
                                                                path: `/vendor/user/list/crete-user-auth/ui-user-edit/${slotProps.data?.user_id}`,
                                                            })
                                                        "
                                                    />
                                                    <Button
                                                        v-permission="[
                                                            {
                                                                functionName:
                                                                    'users_modules',
                                                                moduleName:
                                                                    'fun_deleted',
                                                            },
                                                        ]"
                                                        icon="pi pi-trash"
                                                        outlined
                                                        rounded
                                                        severity="danger"
                                                        @click="
                                                            confirmDeleteUserMS(
                                                                slotProps.data
                                                                    ?.user_id
                                                            )
                                                        "
                                                    />
                                                </template>
                                            </template>
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
import { isLoggedIn } from "@/utils/auth/auth";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            selectedUserList: null,
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
        userPerMSServices.getListUserData().then((users) => {
            if (!Array.isArray(users) || !users.length > 0) {
                this.$notify.error({
                    title: "Error Entries Users List",
                    showClose: false,
                });
            }
            if (
                !Array.isArray(users) ||
                users !== undefined ||
                users !== null
            ) {
                this.usersListArr = users ? users : "";
            }
        });
    },
    computed: {
        ...mapGetters({
            currentUser: "auth/currentUserAuth",
        }),
        currentUserAuth() {
            return this.currentUser ? this.currentUser : null;
        },
    },
    methods: {
        isSessionActiveVendor() {
            return isLoggedIn();
        },
        confirmDeleteUserMS(userId) {
            this.usersID = userId;
            this.deleteUsersDialog = true;
        },
        changeStatusUsers(userId, statusId, $event) {
            console.log($event.target);
            this.usersListArr.find((user) => {
                if (user.user_id == userId) {
                    const verifyUserStatus = {
                        verifyStatus: statusId ? "Active" : "Inactive",
                    };
                    this.userPerMSServices
                        .changeUserStatusVerify(userId, verifyUserStatus)
                        .then((response) => {
                            if (response.data.success == true) {
                                this.$notify.success({
                                    title: "Successful updated user status Successfully",
                                    message: response.data?.message
                                        ? response.data?.message
                                        : "",
                                    showClose: true,
                                });
                            }
                        })
                        .catch((error) => {
                            this.$notify.error({
                                title: "Unsuccessfully updated user status",
                                message: error.response.data?.message,
                                showClose: true,
                            });
                        });
                }
            });
        },
        deleteUserMSByID() {
            if (!this.usersID) {
                this.$notify.error({
                    title: "User account not found...!",
                    showClose: true,
                });
            }
            this.userPerMSServices
                .deleteUserMS(this.usersID)
                .then(() => {
                    this.$notify.error({
                        title: "Account Deleted Successfully...!",
                        showClose: true,
                    });
                    this.deleteCatDialog = false;
                    window.location.reload();
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
    },
};
</script>
