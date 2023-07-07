<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="relative text-black text-3xl section section-title:before">
                {{ $t('permission.listPermission') }}
            </h2>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                            <DataTable ref="dt" :value="permissionsRoleModuleListArr" v-model:selection="selectedCategoriesList"
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
                                                " placeholder="Search..." />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty permissions -->
                                <template #empty>
                                    No permissions found...
                                </template>
                                <!-- Loading permissions -->
                                <template #loading>
                                    Loading permissions data. Please wait...
                                </template>
                                <!--------------Check Existed Data ----------->
                                <div v-if="permissionsRoleModuleListArr &&
                                    permissionsRoleModuleListArr.length > 0 &&
                                    permissionsRoleModuleListArr != ''
                                    ">
                                    <!-- Columns -->
                                    <Column field="role_name" header="Role Name" sortable style="min-width: 20rem">
                                        <template #body="slotProps">
                                            {{
                                                capitalized(
                                                    slotProps.data?.role_name
                                                )
                                            }}
                                        </template>
                                    </Column>
                                    <Column :exportable="false" header="Actions" style="min-width: 8rem">
                                        <template #body="slotProps">
                                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="handleEditPermissionsModules(slotProps?.data.id)" />
                                        </template>
                                    </Column>
                                </div>
                            </DataTable>
                        </div>
                        <!-- ===============Edit Permissions of Dialogs======================= -->
                        <el-dialog v-model="dialogVisible" :title="'Edit Permissions - ' + currentRole?.role_name" width="70%">
                            <div v-loading="dialogLoading" class="form-container">
                                <div class="permissions-container">
                                    <!-- Table Permissions -->
                                    <div class="block">
                                        <el-form label-width="500px" label-position="top">
                                            <el-table
                                                    :data="moduleDetailRoutes"
                                                    style="width: 100%; margin-bottom: 20px"
                                                    row-key="moduleSubId"
                                                    border
                                                    lazy
                                                    :default-expand-all="true"
                                                    :tree-props="{ children: 'childrenModule', hasChildren: 'hasChildren' }"
                                                >
                                                <el-table-column prop="moduleParentName" label="Module Name" sortable width="260">
                                                    <template #default="scope">
                                                        <el-checkbox 
                                                            @change="handleCheckAllChange(scope.row,$event)"
                                                            v-model="scope.row.id">
                                                            {{scope.row.moduleParentName}}                                 
                                                        </el-checkbox>                                   
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="functionView" label="View">
                                                    <template #default="scope">
                                                            <input
                                                                class="form-check-input cursor-pointer"
                                                                type="checkbox"
                                                                :value="scope.row?.functionView ? 1 : 0"
                                                                :id="scope.row?.moduleParentName"
                                                                name="user_fun_view[]"
                                                                v-model="scope.row.functionView"
                                                                :checked="scope.row?.functionView == 1? true: false "
                                                            />
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="functionEdited" label="Edit">
                                                    <template #default="scope">
                                                        <input
                                                            class="form-check-input cursor-pointer"
                                                            type="checkbox"
                                                            :value="scope.row?.functionEdited ? 1 : 0"
                                                            :id="scope.row?.moduleParentName"
                                                            name="user_fun_view[]"
                                                            v-model="scope.row.functionEdited"
                                                            :checked="scope.row?.functionEdited == 1? true: false "
                                                        />
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="functionCreated" label="Create">
                                                    <template #default="scope">
                                                        <input
                                                            class="form-check-input cursor-pointer"
                                                            type="checkbox"
                                                            :value="scope.row?.functionCreated ? 1 : 0"
                                                            :id="scope.row?.moduleParentName"
                                                            name="user_fun_view[]"
                                                            v-model="scope.row.functionCreated"
                                                            :checked="scope.row?.functionCreated == 1? true: false "
                                                        />
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="functionDeleted" label="Remove">
                                                    <template #default="scope">
                                                        <input
                                                            class="form-check-input cursor-pointer"
                                                            type="checkbox"
                                                            :value="scope.row?.functionDeleted ? 1 : 0"
                                                            :id="scope.row?.moduleParentName"
                                                            name="user_fun_view[]"
                                                            v-model="scope.row.functionDeleted"
                                                            :checked="scope.row?.functionDeleted == 1? true: false "
                                                        />
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-form>
                                    </div>
                                    <!-- Button Dialog Actions -->
                                    <div style="text-align:right;">
                                        <el-button type="danger" @click="dialogVisible=false">
                                            {{ $t('permission.cancel') }}
                                        </el-button>
                                        <el-button type="primary" @click="confirmPermission">
                                            {{ $t('permission.confirm') }}
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </el-dialog>
                        <!-- ===============Edit Permissions of Dialogs======================= -->
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Data Tables -->
<script>

import { FilterMatchMode } from "primevue/api";
import UserPermissionsModuleMSServices from "../../../../services/vendors/user_permissions/UserPermissionModuleMSServices";
import { ElMessage } from "element-plus";
import {deepClone} from "../../../../utils";
const defaultRole = {
  key: '',
  moduleParentName: '',
  description: '',
  routesModule: [],

}
export default {
    data() {
        return {
            permissionProps: {
                children: 'childrenModule',
                label: 'moduleParentName',
            },
            rolesPermModule: Object.assign({}, defaultRole),
            currentRoleId: 1,
            dialogLoading: false,
            dialogVisible: false,
            permissionsID: "",
            permissionsRoleModuleListArr: [],
            moduleDetailsByPermId: [],
            statusPermissionsSwitch: false,
            deletePermissionsDialog: false,
            product: "",
            selectedRolesList: "",
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            checkStrictly: false,
            routesModulesPerm: [],
            routesModule: [],
            moduleDetailRoutes: [],
            checked1: true
        };
    },
    computed: {
        currentRole(){
            const found = this.permissionsRoleModuleListArr.find(module => module?.id === this.currentRoleId);
            if (found === undefined) {
                return { role_name: '', childrenModule: [] };
            }
            return found;
        },
        roleMenuPermissions(){
            return this.routesModule;
        }
    },
    created() {
        this.userPermModuleMSServices = new UserPermissionsModuleMSServices();
    },
    mounted() {
        const userPermModuleMSServices = new UserPermissionsModuleMSServices();
        userPermModuleMSServices.getListPermissionsModuleRole().then((data) => {
            if (!data) {
                ElMessage.error("Internal Error...");
            }
            this.permissionsRoleModuleListArr = data;
        });
    },
    methods: {
        /**
         * @Hane Multiple Row with Parent Chid 
        * */
       handleCheckAllChange(val,checked){
          console.log(val.childrenModule,checked)
       },
        /**
         * @Popup update Detail Module Permissions routesModulesPerm
        * */ 
       handleEditPermissionsModules(id){
            this.dialogVisible = true;
            this.currentRoleId = id;
            this.checkStrictly = true;
            this.$nextTick(() => {
                this.userPermModuleMSServices.getDetailModuleRoleFunctionByRoleId(this.currentRoleId).then((moduleId) => {
                    if (!moduleId) {
                        ElMessage.error("Internal Error...");
                    }
                    this.routesModule = this.generateRoutes(moduleId?.moduleDetail);
                    this.rolesPermModule = deepClone(moduleId?.moduleDetail);
                    // this.moduleDetailsByPermId = moduleId?.moduleDetail;
                    // const routesModule = this.generateRoutes(this.rolesPermModule);
                    // this.$refs.menuPermissions.setCheckedNodes(this.generateArr(routesModule));
                    // set checked state of a node not affects its father and child nodes 
                    this.moduleDetailRoutes = moduleId?.moduleDetail;
                    // console.log(this.moduleDetailRoutes)
                    this.checkStrictly = false;
                })
            });
       },
       generateRoutes(moduleArr){
            const res = []
            for(let modules of moduleArr){
                const onlyOneShowingChid = this.onlyOneShowingChild(modules.childrenModule, modules)
                if(modules.childrenModule && onlyOneShowingChid){
                    modules = onlyOneShowingChid;
                }
                res.push(modules)
            }
            return res;
       },
       onlyOneShowingChild(children = [], parent){
            let onlyOneChild = null;
            const showingChildren = children.filter(item => !item.isViewName);
            if(showingChildren.length === 1){
                onlyOneChild = showingChildren[0];
                return onlyOneChild;
            }
            // Show parent if there are no child route to display
            if(showingChildren.length === 0){
                onlyOneChild = {...parent,noShowingChildren: true};
                return onlyOneChild
            }
            return false;
       },
       classifyPermissions(permissions) {
            const moduleListArr = [];
            permissions.forEach(permission=> {
                console.log(permission)
               moduleListArr.push(this.normalizeMenuPermission(permission)); 
            });
            return moduleListArr;
       },
       normalizeMenuPermission(permission){
            return {id:permission.id,moduleParentName: permission.moduleParentName}
       },
       generateArr(moduleSub){
            let data = []
            moduleSub.forEach(module => {
                data.push(module)
                if (module.childrenModule) {
                const temp = this.generateArr(module.childrenModule)
                    if (temp.length > 0) {
                        data = [...data, ...temp]
                    }
                }
            })
            return data
       },
        // Reshape the routes structure so that it looks the same as the sidebar
        /**
         * @Capitalize Letters
         * */
        capitalized(name) {
            const capitalizedFirst = name[0].toUpperCase();
            const rest = name.slice(1);
            return capitalizedFirst + rest;
        }
    },
};
</script>