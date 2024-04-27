<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <Toast />
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Manage Employee
            </h2>
            <!-- Permissions Modules -->
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
                                :value="employeeListOrgDept"
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
                                <template #empty>
                                    Empty data employee for org-structures
                                </template>
                                <!-- Loading Users -->
                                <template #loading>
                                    {{ $t("dataLoading") }}
                                </template>
                                <!--------------Check Existed Data ----------->
                                <div
                                    v-if="
                                        employeeListOrgDept &&
                                        employeeListOrgDept.length > 0 &&
                                        employeeListOrgDept != ''
                                    "
                                >
                                    <!-- Columns -->
                                    <Column
                                        field="full_latin_name"
                                        :header="$t('users.userName')"
                                        sortable
                                        style="min-width: 10rem"
                                    ></Column>
                                    <Column
                                        field="user_email"
                                        :header="$t('users.userEmail')"
                                        sortable
                                        style="min-width: 10rem"
                                    ></Column>
                                    <Column
                                        field="user_phonenumber"
                                        :header="$t('users.userPhone')"
                                        sortable
                                        style="min-width: 10rem"
                                    ></Column>
                                    <Column
                                        :exportable="false"
                                        header="Options"
                                        style="min-width: 10rem"
                                    >
                                        <template #body="slotProps">
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
                                                        icon="pi pi-eye"
                                                        outlined
                                                        rounded
                                                        severity="success"
                                                        class="mr-2"
                                                        @click="
                                                            $router.push({
                                                                path: `/vendor/user/list/view-detail-user-auth/ui-user-detail-employee/${
                                                                    parseInt(
                                                                        slotProps
                                                                            .data
                                                                            ?.empId
                                                                    ) ?? 0
                                                                }`,
                                                            })
                                                        "
                                                    />
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
                            :style="{ width: '500px' }"
                            header="Confirm Delete This Employee"
                            :modal="true"
                        >
                            <div class="confirmation-content flex">
                                <i
                                    class="pi pi-exclamation-triangle mr-3"
                                    style="font-size: 2rem"
                                />
                                <span
                                    >Are you sure you want to delete employee
                                    account profile?</span
                                >
                            </div>
                            <template #footer>
                                <Button
                                    label="No"
                                    icon="pi pi-times"
                                    text
                                    @click="deleteUsersDialog = false"
                                />
                                <Button
                                    icon="pi pi-check"
                                    text
                                    :label="
                                        loadingRemoveEmp
                                            ? 'Loading...'
                                            : 'Remove'
                                    "
                                    :loading="loadingRemoveEmp"
                                    @click="
                                        confirmRemovedEmployeeAccountProfile
                                    "
                                />
                            </template>
                        </Dialog>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Employee List Features-->
<script>
import { FilterMatchMode } from "primevue/api";
import UserPermissionsMSServices from "@/services/vendors/user_permissions/UserPermissionsMSServices";
import { isLoggedIn } from "@/utils/auth/auth";
import { mapGetters } from "vuex";
import addNewEmpUserAdminHelper from "@/mixin/admin_user_management/addNewEmpUserAdminHelper.js";
export default {
    mixins: [addNewEmpUserAdminHelper],
    data() {
        return {
            selectedUserList: null,
            usersID: 0,
            employeeListOrgDept: "",
            statusUsersSwitch: "",
            deleteUsersDialog: false,
            product: "",
            selectedRolesList: "",
            statusUserSwitch: true,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            loadingRemoveEmp: false,
        };
    },
    created() {
        this.employeeManageServices = new UserPermissionsMSServices();
    },
    mounted() {
        this.employeeManageServices.getListUserData().then((users) => {
            if (!Array.isArray(users) || !users.length > 0) {
                this.$toast.add({
                    severity: "error",
                    summary: "Error entries employee list",
                    life: 3000,
                });
            }
            if (
                !Array.isArray(users) ||
                users !== undefined ||
                users !== null
            ) {
                this.employeeListOrgDept = users ? users : "";
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
    },
};
</script>
