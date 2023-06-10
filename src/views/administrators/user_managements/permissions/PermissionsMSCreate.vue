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
                            <!-- Select All Permission -->
                            <div class="flex flex-row px-2 py-2  my-2">
                                <span class="pl-2">Select All</span>
                                <span class="pl-2">
                                      <input class="form-check-input cursor-pointer" type="checkbox"/>
                                </span>
                            </div>
                            <table class="table table-bordered" id="permListArr">
                                <thead>
                                    <tr>
                                       <th>Resource Name</th>
                                       <th>Read </th>
                                       <th>Create </th>
                                       <th>Modify</th>
                                       <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :pname="permission?.user_fun_name" :uid="permission?.user_id"  
                                        :pid="permission?.id? permission.id: '0'" 
                                        v-for="(permission, index) in permissions" 
                                        :key="index">
                                        <div  v-if="permission!== '' && permission.length > 0 || permission">
                                            <td class="text-left">
                                                {{ (index + 1).toFixed().toString('.') }}.{{ permission?.user_fun_name }}         
                                            </td>
                                        </div>
                                        <td>
                                            <input class="form-check-input cursor-pointer" type="checkbox"
                                                :value="permission?.user_fun_view?'1' : '0'"
                                                :id="permission?.id"
                                                :checked="permission?.user_fun_view== 1 ? true : false"
                                                @change="changeSavePermission(this)"
                                            />
                                        </td>
                                        <td>
                                            <input class="form-check-input cursor-pointer" type="checkbox"
                                                :value="permission?.user_fun_add? '1': '0'" 
                                                :checked="permission?.user_fun_add == 1 ? true : false"
                                                @change="changeSavePermission(this)"
                                            />
                                        </td>
                                        <td class="text-left">
                                            <input class="form-check-input cursor-pointer" 
                                                type="checkbox"
                                                :checked="permission?.user_fun_edit == 1 ? true : false"
                                                :value="permission?.user_fun_edit? '1': '0'" 
                                                @change="changeSavePermission(this)"
                                            />
                                        </td>
                                        <td>
                                            <input class="form-check-input cursor-pointer" type="checkbox"
                                                :checked="permission?.user_fun_delete == 1 ? true : false"
                                                :value="permission?.user_fun_delete? '1': '0'" 
                                                @change="changeSavePermission(this)"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
            permissions: null,
            permListArr: [],
            selected: [],
            userIds: [],
            allSelected: false,
            getUserFunView: [],
            getPermissionAdd: [],
            getPermissionEdit: [],
            getPermissionRemove:[],
            getPermission: [],
            permissionsArr: {}
        }
    },
    created() {
        this.permissionArr = new UserPermissionsMSServices();   
    },
    mounted() {
        this.editPermissionMS(this.$route.params.id, this.$route.params.funId);
    },
    methods: {
        async changeSavePermission(obj){
           this.$nextTick(() => {
            //  const getTableVal = $(obj).val();
             console.log(obj)
           });
        },
        async editPermissionMS(id, funId){
            const userPerMSServices = new UserPermissionsMSServices();
            userPerMSServices.editedPermMSByID(id, funId).then((data) => {
                if (!data) {
                    ElMessage.error("Internal Error...");
                }
                this.permissions = data;
            });
        }
    }
}
</script>
