<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="relative text-black text-3xl section section-title:before">
                Permissions Lists
            </h2>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                            <DataTable ref="dt" :value="permissionsListArr" v-model:selection="selectedCategoriesList"
                                dataKey="id" :paginator="true" :rows="10" :filters="filters" class="p-datatable-scrollable"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5, 10, 25]"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} permissions">
                                <!-- Header -->
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                        <h4 class="m-0"></h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters['global'].value
                                                " :placeholder="$t('route.search')" />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty permissions -->
                                <template #empty>
                                   {{ $t('message.noHaveData') }}
                                </template>
                                <!-- Loading permissions -->
                                <template #loading>
                                    Loading permissions data. Please wait...
                                </template>
                                <!--------------Check Existed Data ----------->
                                <div v-if="permissionsListArr &&
                                    permissionsListArr.length > 0 &&
                                    permissionsListArr != ''
                                    ">
                                    <!-- Columns -->
                                    <Column field="user_fun_id" :header="$t('permission.roleNameModule')" sortable style="min-width: 20rem">
                                        <template #body="slotProps">
                                            {{
                                                capitalized(
                                                    slotProps.data?.user_fun_id
                                                )
                                            }}
                                        </template>
                                    </Column>
                                    <Column :exportable="false" header="Options" style="min-width: 8rem">
                                        <template #body="slotProps">
                                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="
                                                $router.push({
                                                    path: `/vendor/user/permission/list/crete-user-auth/ui-permission-edit-updated/${slotProps.data?.user_id}/${slotProps.data?.user_fun_id}`,
                                                })
                                                " />
                                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="
                                                confirmDeleteProduct(
                                                    slotProps.data.id
                                                )
                                                " />
                                        </template>
                                    </Column>
                                </div>
                            </DataTable>
                        </div>
                        <!-- ===============Dialog Delete Product Category======================= -->
                        <Dialog v-model:visible="deletePermissionsDialog" :style="{ width: '450px' }" header="Confirm"
                            :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span>Are you sure you want to delete?</span>
                            </div>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deletePermissionsDialog = false" />
                                <Button label="Yes" icon="pi pi-check" text @click="deleteCatByID" />
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
            permissionsID: "",
            permissionsListArr: "",
            statusPermissionsSwitch: false,
            deletePermissionsDialog: false,
            product: "",
            selectedRolesList: "",
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
        userPerMSServices.getListPermissions().then((data) => {
            if (!data) {
                ElMessage.error("Internal Error...");
            }
            this.permissionsListArr = data;
        });
    },
    computed: {
        dataUrl(preImg) {
            return (
                "data:image/jpeg;base64," +
                btoa(new Uint8Array(preImg).reduce((data, byte) => data + String.fromCharCode(byte),""))
            );
        },
    },
    methods: {
        /**
         * @Capitalize Letters
         * */
        capitalized(name) {
            const capitalizedFirst = name[0].toUpperCase();
            const rest = name.slice(1);
            return capitalizedFirst + rest;
        },
        confirmDeleteProduct(catId) {
            this.permissionsListArr = catId;
            this.deletePermissionsDialog = true;
        },
        deleteCatByID() {
            if (!this.catID) {
                ElMessage.error("Product Category Not Found...");
            }
            this.proCategoryService
                .deleteProCategory(this.catID)
                .then((del) => {
                    ElMessage.success(del.data.message);
                    this.deletePermissionsDialog = false;
                })
                .catch((error) => {
                    ElMessage.error(error);
                });
        },
    },
};
</script>
