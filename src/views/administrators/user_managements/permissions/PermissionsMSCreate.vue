<template>
   <div class="layout-content px-4 py-4">
     <b-row>
            <b-col sm="12">
                <b-card no-body class="card">
                    <div class="card-header d-flex justify-content-between flex-wrap">
                        <div class="header-title">
                            <el-button type="info" class="btn-primary" size="large" @click.prevent="$router.push('/vendor/user/permission/list/crete-user-auth/ui-permission-list')">
                                <div class="flex justify-between pl-2">
                                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                                    <span class="pl-2">BACK</span>
                                </div>
                            </el-button>
                        </div>

                    </div>
                    <b-card-body>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                       <th>Resource Name</th>
                                       <th>Read </th>
                                       <th>Write </th>
                                       <th>Edit</th>
                                       <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="" v-for="(permission, index) in permissions" :key="index">
                                        <div  v-if="permission!== '' && permission.length > 0 || permission">                   
                                            <td class="text-left">
                                                {{ permission.user_fun_name }}
                                            </td>
                                        </div>
                                        <td>
                                            <input class="form-check-input cursor-pointer" type="checkbox" checked
                                                v-if="permission.user_fun_view === true && permission.user_fun_view === true" />
                                            <input class="form-check-input" type="checkbox" v-else />
                                        </td>
                                        <td>
                                            <input class="form-check-input cursor-pointer" type="checkbox" checked
                                                v-if="permission.user_fun_add === true && permission.user_fun_add === true" />
                                            <input class="form-check-input" type="checkbox" v-else />
                                        </td>
                                        <td class="text-left">
                                            <input class="form-check-input cursor-pointer" type="checkbox" checked
                                                v-if="permission.user_fun_edit === true && permission.user_fun_edit === true" />
                                            <input class="form-check-input" type="checkbox" v-else />
                                        </td>
                                        <td>
                                            <input class="form-check-input cursor-pointer" type="checkbox" checked
                                                v-if="permission.user_fun_delete === true && permission.user_fun_delete === true" />
                                            <input class="form-check-input" type="checkbox" v-else />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="text-center">
                                <a href="#" type="button" class="btn btn-primary">Save</a>
                            </div>
                        </div>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
   </div>
</template>
<script>
import { ElMessage } from 'element-plus';
import UserPermissionsMSServices from '../../../../services/vendors/user_permissions/UserPermissionsMSServices';
export default {
    name: 'admin-view',
    data() {
        return {
            permissions: null
        }
    },
    created() {
        this.permissionArr = new UserPermissionsMSServices();   
    },
    mounted() {
        this.editPermissionMS(this.$route.params.id, this.$route.params.funId);
    },
    methods: {
        async editPermissionMS(id, funId){
            const userPerMSServices = new UserPermissionsMSServices();
            userPerMSServices.editedPermMSByID(id, funId).then((data) => {
                if (!data) {
                    ElMessage.error("Internal Error...");
                }
                this.permissions = data;
            });
            console.log(this.permission)
        }
    }
}
</script>
