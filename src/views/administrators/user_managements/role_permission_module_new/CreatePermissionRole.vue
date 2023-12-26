<template>
    <!--Manage Permissions By Project-->
    <div class="layout-content px-4 py-4">
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-xl section section-title:before">
                Roles permissions
            </h2>
            <el-button 
                type="info" 
                size="large" 
                class="btn btn-primary" 
                @click.prevent="$router.push('/vendor/user/permission/role-module/crete-user-auth/ui-permission-auth-role-module')"
            >
                <div class="pl-2 justify-content-center">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{$t("route.routeBack")}}</span>
                </div>
            </el-button>
        </div>
        <!-- Grid -->
        <div class="gird">
            <div class="col-12">
                <el-card  class="box-card py-2 px-2">
                    <div class="grid grid-nogutter flex-wrap gap-1 p-fluid">
                        <div class="col-12 lg:col-12">
                            <div class="grid formgrid">
                                <!-- Project name -->
                                <div class="col-6 field">
                                    <div class="field">
                                        <label 
                                            for="role_name"
                                            class="text-sm font-semibold" 
                                            :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.projectNameBaseRole.$invalid && submitted }"
                                        >
                                            Project Name
                                            <span class="p-error">*</span>
                                        </label>
                                        <Dropdown 
                                            :options="dataProjectNameOpt" 
                                            filter 
                                            v-model="v$.projectNameBaseRole.$model" 
                                            :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.projectNameBaseRole.$invalid && submitted }"
                                            inputId="projectId"
                                            optionLabel="projectName" 
                                            placeholder="Select a project name" 
                                            aria-describedby="dd-error"
                                            class="w-full border-round-lg text-sm">
                                            <template #value="slotProps">
                                                <div v-if="slotProps.value" class="flex align-items-center">
                                                    <div>{{ slotProps.value?.project_name }}</div>
                                                </div>
                                                <span v-else>
                                                    {{ slotProps.placeholder }}
                                                </span>
                                            </template>
                                            <template #option="slotProps">
                                                <div class="flex align-items-center">
                                                    <div>{{ slotProps.option?.project_name }}</div>
                                                </div>
                                            </template>
                                        </Dropdown>
                                        <small v-if="(v$.projectNameBaseRole.$invalid && submitted) || v$.projectNameBaseRole.$pending.$response" class="p-error text-lg">
                                            {{ v$.projectNameBaseRole.required.$message.replace('Value', 'Project Name') }}
                                        </small>
                                    </div>
                                </div>
                                <!-- Role Name -->
                                <div class="col-6 field">
                                    <div class="field">
                                        <label
                                            for="role_name" class="text-sm font-semibold"
                                            :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.rolePermissionName.$invalid && submitted }"
                                        >
                                            Role Name<span class="p-error">*</span>
                                        </label>
                                        <InputText 
                                            id="role_name"
                                            placeholder="Role Name" 
                                            v-model="v$.rolePermissionName.$model" 
                                            type="text" 
                                            class="text-sm border-round-lg py-4"
                                            :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.rolePermissionName.$invalid && submitted }"
                                        />
                                        <small v-if="(v$.rolePermissionName.$invalid && submitted) || v$.rolePermissionName.$pending.$response" class="p-error text-lg">
                                            {{ v$.rolePermissionName.required.$message.replace('Value', 'Role Name') }}
                                        </small>
                                    </div>
                                </div>
                                <!-- Permissions Descriptions -->
                                <div class="col-12 field">
                                    <div class="field">
                                        <label
                                            for="role_name" class="text-sm font-semibold"
                                        >
                                            Description<span class="p-error">*</span>
                                        </label>
                                        <TextArea 
                                            id="role_name"
                                            placeholder="Description" 
                                            v-model="rolePermissionDescriptions" 
                                            type="text" 
                                            class="text-sm border-round-lg py-4"
                                        />
                                    </div>
                                </div>
                                <!-- Country's -->
                                <div class="col-12 field">
                                   
                                </div>
                                <!-- Permissions List By Projects -->
                                <div class="col-12 input-wrapper"> 
                                    <div class="b-b mb-10 mb-md-15 pb-10 flex">
                                        <div class="h6">
                                            All Permission
                                        </div>
                                    </div>
                                    <div class="permission-group mt-2 gap-3">
                                        <!-- Search Permission -->
                                        <div class="flex flex-wrap gap-2 align-items-center justify-content-between gap-3 py-3">
                                            <!--Clear Select permission-->
                                           <div class="py-2">
                                                <el-button @click="toggleSelectionClearItem()" class="hover:bg-red-500 bg-white">
                                                    Deselect all items
                                                </el-button>    
                                           </div>
                                            <!-- Search Permissions -->
                                            <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                                                <i class="pi pi-search" />
                                                <InputText 
                                                    v-model="searchPermissionRole"
                                                    class="p-inputtext p-component w-full text-sm"
                                                    placeholder="Type to permissions" 
                                                />
                                            </span>
                                        </div>
                                        <!-- Table Permissions -->
                                        <el-table 
                                            ref="multiplePermissionTreeTable"
                                            :data="dataPermissionTreeTable.filter(perm => !searchPermissionRole || 
                                            perm?.data?.name.toLowerCase().includes(searchPermissionRole?.toLowerCase()))"
                                            style="width: 100%;" 
                                            row-key="key" 
                                            border 
                                            show-checkbox
                                            lazy
                                            empty-text="Loading permissions data. Please wait..."
                                            stripe
                                            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                                            @selection-change="handleSelectionChangePermissionTree"
                                        >
                                            <!-- Column Data Permissions -->
                                            <template v-if="dataPermissionTreeTable && dataPermissionTreeTable.length > 0 && dataPermissionTreeTable != ''">
                                               <!-- Search -->
                                                <el-table-column
                                                    label-class-name="h-4rem"
                                                    type="selection"
                                                    class-name="h-4rem"
                                                    width="55">
                                                </el-table-column>
                                                <el-table-column label="Sl No" type="index" index="return index + 1" width="70"></el-table-column>
                                                <el-table-column 
                                                    prop="name" 
                                                    label="Menu Name" 
                                                    sortable
                                                    width="260"
                                                >
                                                    <template #default="scope">
                                                        {{ scope.row?.data?.name }}
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="checkAdd" label="Create">
                                                    <template #default="scope">
                                                        <el-checkbox 
                                                            v-model="scope.row.data.checkAdd" 
                                                            class="h-5rem" 
                                                            :value="scope.row?.data?.checkAdd"
                                                        >
                                                        </el-checkbox>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="checkView" label="Read">
                                                    <template #default="scope">
                                                        <el-checkbox 
                                                            v-model="scope.row.data.checkView" 
                                                            :value="scope.row?.data?.checkView"
                                                        >
                                                        </el-checkbox>
                                                    </template>
                                                    
                                                </el-table-column>
                                                <el-table-column prop="checkModify" label="Modify">
                                                    <template #default="scope">
                                                        <el-checkbox 
                                                            v-model="scope.row.data.checkModify" 
                                                            :value="scope.row?.data?.checkModify">
                                                        </el-checkbox>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="checkDeleted" label="Remove">
                                                    <template #default="scope">
                                                        <el-checkbox 
                                                            v-model="scope.row.data.checkDeleted" 
                                                            :value="scope.row?.data?.checkDeleted"
                                                        >
                                                        </el-checkbox>
                                                    </template>
                                                </el-table-column>
                                            </template>
                                        </el-table>
                                    </div>
                                </div>
                                <!-- Buttons Submits -->
                                <div class="col-12 flex justify-content-end mt-4"> 
                                    <!--Buttons-->
                                    <el-button 
                                        :loading="loadingSubmittedRole"
                                        type="info" 
                                        size="large" 
                                        class="btn w-10rem btn-primary" 
                                        @click.prevent="submittedCreatePermissionRole(!v$.$invalid)"
                                    >
                                        <div class="pl-2 justify-content-center">
                                            <i class="pi pi-check" style="font-size: 1rem"></i>
                                            <span class="pl-2">{{$t("route.routeSave")}}</span>
                                        </div>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<!-- Create Manage Permissions -->
<script>
import ManagePermissionsRoleBaseProject from "@/services/vendors/user_permissions/ManagePermissionRoleProjects";
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import  rolePermissionsManageHelper from "@/mixin/role_permissions_manage/rolePermissionsManageHelper";
export default {
    mixins: [rolePermissionsManageHelper],
    setup() {
        return { v$: useVuelidate() }
    },
    created() {
        this.managerPermissionBaseOnProject = new ManagePermissionsRoleBaseProject();
    },
    data() {
        return {
            metaKeyPermission: false,
            selectedKeyPermission: null,
            dataPermissionTreeTable: [],
            filters: {},
            dataProjectNameOpt: [],
            submitted: false,
            loadingSubmittedRole:false,
            projectNameBaseRole: null,
            rolePermissionName: null,
            rolePermissionDescriptions: null,
            // Check Permission
            checkViewPermission: {},
            permissionListByProject: [],
            searchPermissionRole: '',
        };
    },
    validations() {
        return {
            projectNameBaseRole: {required},
            rolePermissionName: {required},
        }
    },
    mounted() {
        this.getAllProjectObj();
        this.getPermissionsManagementBaseProject();
    },
    methods: {
        getAllProjectObj(){
            this.managerPermissionBaseOnProject.getAllProject()
                .then((project) => {
                    try {
                        if (!Array.isArray(project) || !project?.length > 0) {
                            this.dataProjectNameOpt = [];
                        }
                        if (!Array.isArray(project) || project !== undefined || project !== null) {
                            this.dataProjectNameOpt = project ? project : '';
                        }
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            );   
        },
        // Get Tree Permissions
        getPermissionsManagementBaseProject(){
            this.managerPermissionBaseOnProject?.getAllPermissionAddByProjects()
                .then((permissions) => {
                    try {
                        /**
                         * @Tree Table Permissions
                        */
                        if (!Array.isArray(permissions) || !permissions?.length > 0) {
                            this.dataPermissionTreeTable = [];
                        }
                        if (!Array.isArray(permissions) || permissions !== undefined || permissions !== null) {
                            this.dataPermissionTreeTable = permissions ? permissions : '';
                        }
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            );   
        },
        // Get Select All Permissions Change 
        toggleSelectionClearItem(rows){
            if (rows) {
                rows?.forEach(row => {
                    this.$refs.multiplePermissionTreeTable?.toggleRowSelection(row);
                });
            } else {
                this.$refs.multiplePermissionTreeTable?.clearSelection();
            }
        }
    },
};
</script>