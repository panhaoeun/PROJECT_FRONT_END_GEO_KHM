<template>
    <Toast />
    <div class="pl-2 gap-2 flex align-items-center justify-content-center">
        <Button 
            aria-label="Add Position By Country" 
            class="border-round-lg w-2rem h-2rem" 
            icon="pi pi-plus" 
            outlined
            :loading="btnLoadingAddNewDepartment"
            @click="openDialogAddDepartment()"
        />
    </div>
    <!-- Dialog Departments -->
    <Dialog v-model:visible="visibleDialogDepartment" modal :style="{ width: '30rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2">
                <span class="font-bold white-space-nowrap">Add New Department</span>
            </div>
        </template>
        <!-- Content Department Add New -->
        <div class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15">
            <div class="pop-over-content p-20 p-sm-15 card">
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label
                            :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.departmentNewName.$invalid && submitted }"
                        >
                            Department<span class="p-error">*</span>
                        </label>
                        <InputText id="department_name" placeholder="Please Enter New Department"  :input="v$.departmentNewName.$touch"  v-model="v$.departmentNewName.$model" :class="{ 'p-invalid border-round-lg p-error': v$.departmentNewName.$invalid && submitted }" type="text" class="text-sm border-round-lg"/>
                        <small v-if="(v$.departmentNewName.$invalid && submitted) || v$.departmentNewName.$pending.$response" class="p-error text-sm">{{ v$.departmentNewName.required.$message.replace('Value', 'New Department') }}</small>
                    </div>
                </div>
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label>Descriptions</label>
                        <Textarea v-model="descriptionDepartment" placeholder="Please enter descriptions" rows="5" cols="30" />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button 
                label="Cancel"
                @click="cancelAddDepartments()" 
                outlined
            />
            <Button 
                :label="loadingSubmittedAddDepartment ? 'Save..' : 'Create'" 
                :loading="loadingSubmittedAddDepartment" 
                icon="pi pi-save" 
                severity="danger"
                class="w-8rem"
                @click="submittedAddDepartmentsOfCountry()" 
                autofocus 
            />
        </template>
    </Dialog>
</template>
<!-- Script of JS -->
<script>
import ManagePermissionsGeoFencePositionPermissionsServices from "@/services/administrator/geo_admin_position_manage_permissions/GeoAdminPositionPermissionsManagementServices";
import { useVuelidate } from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';

export default {
    setup() {
       return { v$: useVuelidate() }
    },
    validations() {
        return {
            departmentNewName: {
                required,
                minLength: minLength(3)
            }
        }
    },  
    props: {
        deptProjectId: {
            type: Number,
            default: 0
        },
        deptCountryId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            visibleDialogDepartment: false,
            btnLoadingAddNewDepartment: false,
            loadingSubmittedAddDepartment: false,
            departmentNewName: '',
            descriptionDepartment: '',
            submitted: false
        };
    },
    created() {
        this.managePermissionsGeoLocationPosition = new ManagePermissionsGeoFencePositionPermissionsServices();
    },
    methods: {
        openDialogAddDepartment(){
            this.btnLoadingAddNewDepartment = true;
            setTimeout(() => {  
                this.btnLoadingAddNewDepartment = false;
                this.visibleDialogDepartment = true;
            }, 500);
        },  
        cancelAddDepartments(){
           this.visibleDialogDepartment = false;
        },
        submittedAddDepartmentsOfCountry(validate){
            try {
                this.submitted = true;
                this.loadingSubmittedAddDepartment = true;
                setTimeout(() => {
                    this.loadingSubmittedAddDepartment  = false;
                    if(this.departmentNewName !== null && this.departmentNewName !== ''){
                        const deptProjectIdAdd = parseInt(this.deptProjectId) ? parseInt(this.deptProjectId) : 0;
                        const deptGeoFenceIdAdd = parseInt(this.deptCountryId) ? parseInt(this.deptCountryId) : 0;

                        const addNewOptDeptByCountry = {
                            addNewProjectId: this?.departmentNewName  ? this?.departmentNewName : '',
                            addNewGeoFenceId: deptProjectIdAdd ? deptProjectIdAdd : 0,
                            addNewDeptName: deptGeoFenceIdAdd ? deptGeoFenceIdAdd : 0,
                            addNewDeptDescriptions: this?.descriptionDepartment ? this?.descriptionDepartment : ''
                        }
                        this.managePermissionsGeoLocationPosition?.createNewDepartmentsLocationGeoByCountry(
                            addNewOptDeptByCountry ? addNewOptDeptByCountry : []
                        ).then(async (addNewDept) => {
                            if(addNewDept?.data.success === true){
                                this.$toast.add({
                                    severity: 'success',
                                    summary: 'Successfully add new department.',
                                    detail: addNewDept.data?.message ? addNewDept.data?.message : null,
                                    life: 3000
                                });  
                            }
                        }).catch(error => {
                            this.$toast.add({
                                severity: 'error',
                                summary: 'Please Fix Below Errors.',
                                detail: error?.response.data.error?.message ? 
                                        error?.response.data.error?.message : 
                                        'Please input filed position have missing value!',
                                life: 3000
                            });  
                            if(error?.response.data.error.error?.errors){
                                for (let index = 0; index < error.response.data.error.error?.errors.length; index++) {
                                    const validationError = error.response.data.error.error?.errors[index].message ?? [];
                                    this.$toast.add({
                                        severity: 'error',
                                        summary: 'Please Fix Below Errors.',
                                        detail: validationError ? validationError : 'Please input filed position have missing value!',
                                        life: 3000
                                    });  
                                }
                            }
                      
                        });
                    }
                },1000);
                
                this.v$.$touch();
                if (!validate) { 
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Please Fix Below Errors.',
                        detail: 'Please input filed position have missing value!',
                        life: 3000
                    });   
                    return false;
                }
            } catch (error) {
                return Promise.reject(error);
            }
            
        }
    },
};
</script>