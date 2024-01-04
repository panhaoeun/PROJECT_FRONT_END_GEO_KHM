<template>
    <KeepAlive>
        <div class="pl-2 gap-2 flex align-items-center justify-content-center">
            <Button 
                aria-label="Add Position By Country" 
                class="border-round-lg w-2rem h-2rem" 
                icon="pi pi-plus" 
                outlined
                :loading="loadingPopupCountry"
                @click="showDialogAddDepartment()"
            />
        </div>
    </KeepAlive>
    <!-- Dialog Managements -->
    <Dialog 
        v-model:visible="visibleDialogPositionCountry" 
        maximizable 
        modal  
        :style="{ width: '80rem' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2">
                <span class="font-bold white-space-nowrap">Manage Positions</span>
            </div>
        </template>
        <!-- Form Submitted -->
        <div class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15">
            <div class="pop-over-content p-20 p-sm-15 card">
                <!-- Departments -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label
                            :class="{ 'p-invalid border-round-lg border-round-lg p-error': v$.departmentByCountryOptSelect.$invalid && submitted }"
                        >
                            Department<span class="p-error">*</span>
                        </label>
                        <div class="flex field flex-row">
                            <Dropdown 
                                showClear
                                v-model="v$.departmentByCountryOptSelect.$model"
                                :options="getOptDepartmentOfCountry" 
                                :class="{ 'p-invalid border-round-lg p-error': v$.departmentByCountryOptSelect.$invalid && submitted }" 
                                optionLabel="geo_english_name" 
                                filter
                                placeholder="Select a department" 
                                class="w-full border-round-lg text-sm"
                                inputId="geo_english_name"
                                aria-describedby="dd-error"
                            >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center">
                                        <div class="text-sm">{{ slotProps.value?.geo_english_name ?? '' }}({{ slotProps.value.geo_zip_code ?? '' }})</div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center text-sm">
                                        <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{ slotProps.option?.geo_zip_code ?? '' }})</div>
                                    </div>
                                </template>
                            </Dropdown>  
                            <!-- Dialog Manage Departments -->
                            <dialog-add-department
                                :deptProjectId="getDeptProjectId ? getDeptProjectId : 0"
                                :deptCountryId="getDeptCountryId ? getDeptCountryId : 0"
                            />
                        </div>
                        <small v-if="(v$.departmentByCountryOptSelect.$invalid && submitted) || v$.departmentByCountryOptSelect.$pending.$response" class="p-error text-sm">
                            {{ v$.departmentByCountryOptSelect.required.$message.replace('Value', 'Departments') }}
                        </small>
                    </div>
                </div>
                <div>
                    <div>
                        <h6 class="ant-typography css-e54hqn">Variation Positions</h6>
                        <hr style="margin-bottom: 20px;">
                    </div>
                    <!-- Add Position Multiple Level -->
                    <div class="grid formgrid">
                        <!-- Position Name -->
                        <div class="col-6">
                            <div class="input-wrap flex-1">
                                <label for="name_en" class="text-sm font-semibold">Position<span class="p-error">*</span></label>
                                <InputText id="position_name" placeholder="Please Enter Position" type="text" class="text-sm border-round-lg"/>
                            </div>
                        </div>
                        <!-- Description positions -->
                        <div class="col-6">
                            <div class="input-wrap flex-1">
                                <label for="name_en" class="text-sm font-semibold">Descriptions (Optional)</label>
                                <div class="flex field flex-row">
                                    <InputText id="detail_position" placeholder="Please Enter Description" type="text" class="text-sm border-round-lg"/>
                                    <!-- Button Plus -->
                                    <div class="pl-2 flex align-items-center justify-content-center">
                                        <button class="btn_round add_node_btn_frm_field" title="Copy or clone this row">
                                            <i class="pi pi-copy"></i>
                                        </button>
                                        <button class="btn_round remove_node_btn_frm_field" disabled>
                                            <i class="pi pi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Add more -->
                    <div>
                        <div class="ml-0 py-2">
                            <button class="text-sm">
                                <i class="pi pi-plus add_icon"></i> 
                                <label class="text-sm"> Add New field row</label>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button 
                label="Cancel"
                @click="cancelAddGeoCountry()" 
                outlined
            />
            <Button 
                :label="loadingSubmittedAddCountry ? 'Save..' : 'Create'" 
                :loading="loadingSubmittedAddCountry" 
                icon="pi pi-save" 
                severity="danger"
                class="w-8rem"
                @click="submittedAddDepartmentPositionCountry()" 
                autofocus 
            />
        </template>
    </Dialog>
</template>


<!-- Department JS -->
<script>
import DialogAddDepartment from "./DialogAddDepartments.vue";
import { useVuelidate } from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';

export default {
    components: {
        DialogAddDepartment
    },
    setup() {
       return { v$: useVuelidate() }
    },
    props: {
        projectId: {
            type: Number,
            default: 0
        },
        geoFenceLocation: {
            type: Number,
            default: 0
        }
    },
    validations() {
        return {
            departmentNewName: {
                required,
                minLength: minLength(3)
            },
            departmentByCountryOptSelect: {
                required
            }
        }
    },  
    computed:{
        getDeptProjectId() {
            return parseInt(this.projectId) ? parseInt(this.projectId) : 0
        },
        getDeptCountryId() {
            return parseInt(this.geoFenceLocation) ? parseInt(this.geoFenceLocation) : 0
        }
    },  
    data() {
        return {
            visibleDialogPositionCountry: false,
            loadingPopupCountry: false,
            submitted: false,
            loadingSubmittedAddCountry: false,
            departmentByCountryOptSelect: null,
            getOptDepartmentOfCountry: []
        };
    },
    created() {},
    methods: {
        cancelAddGeoCountry(){
            this.visibleDialogPositionCountry = false;
        },
        showDialogAddDepartment() {
            this.loadingPopupCountry = true;
            setTimeout(() => {
                this.visibleDialogPositionCountry = true;
                this.loadingPopupCountry = false;   
            }, 500);
        },
        submittedAddDepartmentPositionCountry(validate){
            try {
                this.loadingSubmittedAddCountry = true;  
                this.submitted = true;

                setTimeout(() => {
                    this.loadingSubmittedAddCountry = false;   
                }, 1000);
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
<!-- Styles -->
<style scoped>
/* Button Add Filed */
.btn_round {
  width: 35px;
  height: 35px;
  display: inline-block;
  border-radius: 50%;
  text-align: center;
  line-height: 35px;
  margin-left: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.btn_round:hover {
  color: #fff;
  background: #6b4acc;
  border: 1px solid #6b4acc;
}

.btn_content_outer {
  display: inline-block;
  width: 85%;
}
.close_c_btn {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 0px;
  line-height: 30px;
  border-radius: 50%;
  background: #ededed;
  border: 1px solid #ccc;
  color: #ff5c5c;
  text-align: center;
  cursor: pointer;
}

.add_icon {
  padding: 10px;
  border: 1px dashed #aaa;
  display: inline-block;
  border-radius: 50%;
  margin-right: 10px;
}
.add_group_btn {
  display: flex;
}
.add_group_btn i {
  font-size: 32px;
  display: inline-block;
  margin-right: 10px;
}

.add_group_btn span {
  margin-top: 8px;
}
.add_group_btn,
.clone_sub_task {
  cursor: pointer;
}

.sub_task_append_area .custom_square {
  cursor: move;
}

.del_btn_d {
  display: inline-block;
  position: absolute;
  right: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}
/*pure css tree view test*/
.wtree li {
  list-style-type: none;
  margin: 10px 0 10px 10px;
  position: relative;
}
.wtree li:before {
  content: "";
  position: absolute;
  top: -10px;
  left: -20px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 20px;
  height: 15px;
}
.wtree li:after {
  position: absolute;
  content: "";
  top: 5px;
  left: -20px;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  width: 20px;
  height: 100%;
}
.wtree li:last-child:after {
  display: none;
}
.wtree li span {
  display: block;
  border: 1px solid #ddd;
  padding: 10px;
  color: #888;
  text-decoration: none;
}

.wtree li span:hover, .wtree li span:focus {
  background: #eee;
  color: #000;
  border: 1px solid #aaa;
}
.wtree li span:hover + ul li span, .wtree li span:focus + ul li span {
  background: #eee;
  color: #000;
  border: 1px solid #aaa;
}
.wtree li span:hover + ul li:after, .wtree li span:hover + ul li:before, .wtree li span:focus + ul li:after, .wtree li span:focus + ul li:before {
  border-color: #aaa;
}
</style>