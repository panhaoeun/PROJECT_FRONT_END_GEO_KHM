<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-xl section section-title:before">Roles permissions</h2>
            <el-button type="info" size="large" class="btn btn-primary" @click.prevent="$router.push('/vendor/user/permission/role-module/crete-user-auth/ui-permission-auth-role-module')">
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
                                                    <div>{{ slotProps.value?.projectName }}</div>
                                                </div>
                                                <span v-else>
                                                    {{ slotProps.placeholder }}
                                                </span>
                                            </template>
                                            <template #option="slotProps">
                                                <div class="flex align-items-center">
                                                    <div>{{ slotProps.option?.projectName }}</div>
                                                </div>
                                            </template>
                                        </Dropdown>
                                        <small v-if="(v$.projectNameBaseRole.$invalid && submitted) || v$.projectNameBaseRole.$pending.$response" class="p-error text-lg">
                                            {{ v$.projectNameBaseRole.required.$message.replace('Value', 'Project Name') }}
                                        </small>
                                        <div>
                                            <p>sdsd</p>
                                        </div>
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
                                <!-- Permissions List By Projects -->
                                <div class="col-12 input-wrapper"> 
                                    <label class="mb-4">Permissions</label>
                                    <div class="b-b mb-10 mb-md-15 pb-10 flex">
                                        <input class="styled-checkbox cursor-pointer" type="checkbox"/>
                                        <div class="pl-2">
                                            All
                                        </div>
                                    </div>
                                    <div class="permission-group mt-2">
                                        <TreeTable 
                                            v-model:selectionKeys="selectedKeyPermission" 
                                            :value="dataPermissionTreeTable"
                                            selectionMode="checkbox"
                                            :paginator="true" 
                                            class="p-datatable-scrollable text-sm"
                                            :rows="10"
                                            responsiveLayout="scroll"
                                            filterDisplay="menu"
                                            :filters="filters"
                                            :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                                        >
                                            <!-- Empty Products -->
                                            <template #empty>Manage permissions not found...!</template>
                                            <!-- Loading Products -->
                                            <template #loading> Loading manage permissions data. Please wait...</template>
                                            <!--------------Columns----------->
                                            <div v-if="dataPermissionTreeTable && dataPermissionTreeTable.length > 0 && dataPermissionTreeTable != ''">
                                                <Column field="name" header="Modules" sortable expander>
                                                    <template #filter>
                                                        <InputText v-model="filters['name']" type="text" class="p-column-filter" placeholder="Filter by name" />
                                                    </template>
                                                </Column>
                                                <Column field="size" header="View" sortable filterField="size">
                                                    <template #body="{ data }">
                                                        {{ data?.size }}
                                                        <Checkbox v-model="checkFunMSViewPermission" inputId="`permission-function-view`" name="checkbox_permission_view" value="Permissions" />
                                                    </template>
                                                </Column>
                                                <Column field="size" header="Add" sortable filterField="size">
                                                    <template #body>
                                                        <Checkbox v-model="checkFunMSViewPermission" inputId="`permission-function-add`" name="checkbox_permission_add" value="Permissions" />
                                                    </template>
                                                </Column>
                                                <Column field="size" header="Edit" sortable filterField="size">
                                                    <template #body>
                                                        <Checkbox v-model="checkFunMSViewPermission" inputId="`permission-function-edit`" name="checkbox_permission_edit" value="Permissions" />
                                                </template>
                                                </Column>
                                                <Column field="size" header="Delete" sortable filterField="size">
                                                    <template #body>
                                                        <Checkbox v-model="checkFunMSViewPermission" inputId="`permission-function-delete`" name="checkbox_permission_delete" value="Permissions" />
                                                    </template>
                                                </Column>
                                            </div>
                                        </TreeTable>
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
<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { NodeService } from './NodeServices';
export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            selectedKeyPermission: null,
            dataPermissionTreeTable: null,
            filters: {},
            dataProjectNameOpt: [],
            submitted: false,
            loadingSubmittedRole:false,
            projectNameBaseRole: null,
            rolePermissionName: null,
            // Check Permission
            checkFunMSViewPermission: false,
            permissionListByProject: []
        };
    },
    validations() {
        return {
            projectNameBaseRole: {required},
            rolePermissionName: {required},
        }
    },
    mounted() {
        NodeService.getTreeTableNodes().then((data) => (this.dataPermissionTreeTable = data));
    },
    methods: {
        submittedCreatePermissionRole(isFormValid){
            this.loadingSubmittedRole = true;
            setTimeout(()=> {
               try{
                    this.loadingSubmittedRole = false;
                    this.submitted = true;
                    this.v$.$touch();
                    if (!isFormValid) {    
                        return;
                    }
               }catch(err){
                    return Promise.reject(err);
               }
            },1000);
        }
    },
};
</script>
<!-- Custom Permission ROle Styles -->
<style scoped>
.styled-checkbox {
    position: relative;
    border: 2px solid #333;
    border-radius: 2px;
    background: none;
    cursor: pointer;
    line-height: 0;
    margin: 0 10px 0 0;
    outline: 0;
    padding: 0!important;
    vertical-align: text-top;
    height: 20px;
    width: 20px;
    -webkit-appearance: none;
    opacity: .5;
}
.styled-checkbox:checked {
    background-color: #333;
    opacity: 1;
}
.styled-checkbox input {
    transition: all .15s;
}
.styled-checkbox:before {
    content: "";
    position: absolute;
    right: 50%;
    top: 50%;
    width: 4px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    margin: -1px -1px 0;
    transform: rotate(45deg) translate(-50%,-50%);
    z-index: 2;
}
</style>