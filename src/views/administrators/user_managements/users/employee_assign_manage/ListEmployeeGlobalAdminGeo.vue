<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-2 px-2 py-2">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Manage Employee
            </h2>
            <!-- Button Add New -->
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click.prevent="
                    $router.push(
                        '/admin/admin-management-employee-assign/hrm-add-new-employee-role-module'
                    )
                "
            >
                <div class="button">
                    <i class="pi pi-plus" style="font-size: 1rem"></i>
                    <span class="pl-2">Create</span>
                </div>
            </el-button>
        </div>
        <!-- Content -->
        <div class="gird">
            <div class="col-12">
                <el-card class="box-card py-2 px-2">
                    <DataTable
                        :value="listAdminEmpGlobal"
                        tableStyle="min-width: 50rem"
                        stripedRows
                        paginator
                        :rows="10"
                        :rowsPerPageOptions="[5, 10, 20, 50]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    >
                        <template #header>
                            <div
                                class="flex flex-wrap align-items-center justify-content-between gap-2"
                            >
                                <span class="text-xl text-900 font-bold"
                                    >List Employee</span
                                >
                                <span class="p-input-icon-left text-sm">
                                    <i class="pi pi-search" />
                                    <InputText
                                        v-model="filtersEmp['global'].value"
                                        class="text-sm"
                                        :placeholder="$t('route.search')"
                                    />
                                </span>
                            </div>
                        </template>
                        <!-- Empty Employee -->
                        <template #empty
                            >List employee is empty not found!.
                        </template>
                        <!-- Loading Users -->
                        <template #loading>
                            Loading employee data. Please wait...
                        </template>
                        <!--------------Check Existed Data ----------->
                        <template
                            v-if="
                                listAdminEmpGlobal &&
                                listAdminEmpGlobal.length > 0 &&
                                listAdminEmpGlobal != ''
                            "
                        >
                            <Column
                                field="emp_id"
                                header="Employee ID"
                                sortField="emp_id"
                                sortable
                            >
                                <template #body="{ data }">
                                    {{ data?.emp_id ?? "N/A" }}
                                </template>
                            </Column>
                            <Column
                                field="full_kh_name"
                                header="Khmer Name"
                                sortField="full_kh_name"
                                sortable
                            >
                                <template #body="{ data }">
                                    {{ data?.full_kh_name }}
                                </template>
                            </Column>
                            <Column
                                field="full_latin_name"
                                header="English Name"
                                sortField="full_latin_name"
                                sortable
                            >
                                <template #body="{ data }">
                                    {{ data?.full_latin_name ?? "N/A" }}
                                </template>
                            </Column>
                            <Column
                                field="phone_number"
                                header="Phone Number"
                                sortField="phone_number"
                                sortable
                            >
                                <template #body="{ data }">
                                    {{ data?.phone_number ?? "N/A" }}
                                </template>
                            </Column>
                            <Column
                                field="email_address"
                                header="Email Address"
                                sortable
                                style="min-width: 10rem"
                            ></Column>
                            <!-- Actions -->
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
                                                path: `/vendor/user/customer_info/list/admin/customer_view_details/${
                                                    slotProps.data
                                                        ?.customerId ?? ''
                                                }`,
                                            })
                                        "
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        outlined
                                        rounded
                                        severity="danger"
                                        class="mr-2 bg-danger-500"
                                        @click="
                                            $router.push({
                                                path: `/vendor/user/customer_info/list/admin/customer_view_details/${
                                                    slotProps.data
                                                        ?.customerId ?? ''
                                                }`,
                                            })
                                        "
                                    />
                                </template>
                            </Column>
                        </template>
                        <!--------------Check Existed Data ----------->
                    </DataTable>
                </el-card>
            </div>
        </div>
    </div>
</template>
<!-- Script of global-admin -->
<script>
import { FilterMatchMode } from "primevue/api";
import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
export default {
    created() {
        this.serviceManageStructuresProject =
            new ManageOrgChartStructureGeoProjectServices();
    },
    mounted() {
        this.serviceManageStructuresProject
            .listStoreEmpOrgDept()
            .then((users) => {
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
                    this.listAdminEmpGlobal = users ? users : "";
                }
            });
    },
    components: {},
    props: {},
    data() {
        return {
            listAdminEmpGlobal: null,
            filtersEmp: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        };
    },
    methods: {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
