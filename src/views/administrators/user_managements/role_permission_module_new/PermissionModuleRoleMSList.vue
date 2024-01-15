<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="relative text-black text-xl section section-title:before">
                {{ $t('permission.listPermission') }}
            </h2>
            <el-button type="info" size="large" class="btn btn-primary"
                @click.prevent="$router.push('/vendor/user/permission/role-module/crete-user-auth/ui-permission-auth-role-module-create-new')"
                v-permission="[{ functionName: 'product_module', moduleName: 'fun_create' }]">
                <div class="button">
                    <i class="pi pi-plus" style="font-size: 1rem"></i>
                    <span class="pl-2">Add role permission</span>
                </div>
            </el-button>
        </div>
        <div class="gird">
            <!-- Button Group Filter Projects -->
            <div class="col-12">
                <el-card slot="header" class="box-card">
                    <div class="relative pb-3 text-black text-sm section section-title:before">
                        <p class="h6">Filter Data</p>
                    </div>
                    <div class="formgrid grid">
                        <div class="col-4 lg:col-6 field">
                            <label for="name_en" class="text-sm font-semibold">Projects</label>
                            <Dropdown 
                                v-model="selectedProject" 
                                :options="optProjectByPermissionList" 
                                optionLabel="shop_eng" 
                                placeholder="Select a projects" 
                                class="w-full text-sm" 
                                inputId="shopEng"
                                aria-describedby="dd-error"
                            >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center">
                                        <div class="text-sm">{{ slotProps.value?.project_name ?? '' }}</div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center text-sm">
                                        <div class="text-sm">{{ slotProps.option?.project_name ?? '' }}</div>
                                    </div>
                                </template>
                            </Dropdown>  
                        </div>
                        <!-- Button Filter-->
                       <div class="col-12 lg:col-6 field">
                           <Button icon="pi pi-filter" class="btn btn-primary h-3rem w-10rem" label="Filters" :loading="loadingBtnFilter" @click="filterProjectFindAllRole()"/>
                        </div>
                    </div>
                </el-card>
            </div>
            <!-- Permission Module Role List -->
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                            <DataTable 
                                ref="dt" 
                                :loading="loadingDataRolesProject"
                                :value="projectPermissionRole"
                                v-model:selection="selectedPermissions" 
                                projectKey="id" 
                                :paginator="true" 
                                :rows="10"
                                filterDisplay="menu"
                                :filters="filtersPermRole" 
                                class="p-projecttable-scrollable text-sm"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5, 10, 25]"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} role permissions">
                                <!-- Header -->
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                        <h4 class="m-0"></h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filtersPermRole['global'].value" placeholder="Search role permissions..." />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty permissions -->
                                <template #empty>
                                    No role permission found
                                </template>
                                <!-- Loading permissions -->
                                <template #loading>
                                    List role permission loading...
                                </template>
                                <!--------------Check Existed Data ----------->
                                <div
                                    v-if="projectPermissionRole && projectPermissionRole.length > 0 && projectPermissionRole != ''">
                                    <!-- Columns -->
                                    <Column field="role_name" header="Role Name" sortable
                                        style="min-width:20rem"></Column>
                                    <Column :exportable="false" :header="$t('route.action')" style="min-width: 8rem">
                                        <template #body="slotProps">
                                            <div
                                                v-permission="[{ functionName: 'permissions_module', moduleName: 'fun_edit' }]">
                                                <Button icon="pi pi-pencil" outlined rounded class="mr-2" :project-project="slotProps"/>
                                            </div>
                                        </template>
                                    </Column>
                                </div>
                            </DataTable>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Data Tables -->
<script>
import { FilterMatchMode,FilterOperator } from "primevue/api";
import ManagePermissionsRoleBaseProject from "@/services/vendors/user_permissions/ManagePermissionRoleProjects";

export default {    
    data() {
        return {
            loadingDataRolesProject: false,
            loadingBtnFilter:false,
            selectedPermissions: null,
            optProjectByPermissionList: [],
            selectedProject: null,
            envAppPATH: process.env.VUE_APP_PATH_FILE,
            currentRoleId: 1,
            dialogLoading: false,
            dialogVisible: false,
            permissionsID: "",
            projectPermissionRole: [],
            moduleDetailsByPermId: [],
            statusPermissionsSwitch: false,
            deletePermissionsDialog: false,
            product: "",
            selectedRolesList: "",
            filtersPermRole: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                role_name: {
                    operator: FilterOperator.AND,
                    constraints: [
                        { value: null, matchMode: FilterMatchMode.IN },
                    ],
                }
            },
            checkStrictly: false,
            routesModulesPerm: [],
            routesModule: [],
            moduleDetailRoutes: [],
            checkOut: false
        };
    },
    computed: {
        
    },
    created() {
        this.permissionRoleProject = new ManagePermissionsRoleBaseProject();
    },
    mounted() {
        this.getAllProjectObj();
    },
    methods: {
        /**
         * @Handle Filter role base on project
        * */
        filterProjectFindAllRole(){
            this.loadingBtnFilter = true;
            this.loadingDataRolesProject = true;
            setTimeout(() => {
                this.loadingDataRolesProject = false;
                this.loadingBtnFilter = false;
                // Filters Role By Project 
                let dataFilter = this.selectedProject?.id ? this.selectedProject?.id : 0;
                if(!this.selectedProject){
                    this.$notify.error({
                        title: 'Please select project',
                        showClose: true
                    });   
                }
                if(this.selectedProject !== ''){
                    this.permissionRoleProject.getAllRolesBaseProject(dataFilter).then((project) => {
                        try {
                            console.log(project?.tbl_roles)
                            if (!Array.isArray(project) || !project.length > 0) {
                                this.projectPermissionRole = [];
                            }
                            if (!Array.isArray(project) || project !== undefined || project !== null) {
                                this.projectPermissionRole = project?.tbl_roles ? project?.tbl_roles : [];
                            }
                        } catch (error) {
                            return Promise.reject(error);
                        }
                    }
                 );  
                }
              
            },1000);
        },
        getAllProjectObj(){
            this.permissionRoleProject.getAllProject()
            .then((project) => {
                    try {
                        if (!Array.isArray(project) || !project.length > 0) {
                            this.optProjectByPermissionList = [];
                        }
                        if (!Array.isArray(project) || project !== undefined || project !== null) {
                            this.optProjectByPermissionList = project ? project : '';
                        }
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            );   
        }
    },
};
</script>