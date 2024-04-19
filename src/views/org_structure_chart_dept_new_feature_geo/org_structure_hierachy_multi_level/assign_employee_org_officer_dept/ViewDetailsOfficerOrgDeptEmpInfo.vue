<!-- eslint-disable vue/no-mutating-props -->
<template>
    <Toast />
    <Dialog
        v-model:visible="openDialogsResignWork"
        modal
        :header="'View Detail Employee:' + '\n   ' + departmentName"
        :style="{ width: '90rem' }"
        maximizable
    >
        <Toast />
        <!-- Headers of Exp-Info -->
        <template #closeicon>
            <i class="pi pi-times" @click.prevent="closeResignFormEmp"></i>
        </template>
        <div class="m-0 p-0">
            <div class="layout-content">
                <!-- Titles -->
                <div class="flex flex-row justify-content-between pl-2">
                    <h2 class="text-black text-xl section section-title:before">
                        View Detail Employee
                    </h2>   
                </div>
                <div class="content gap-5">
                    <div class="row px-2 py-2 my-2">
                        <div class="col-sm-12 col-md-4 employee-cv">
                            <div
                                class="card-header resume bg-teal-100 justify-content-center items-center flex p-30"
                            >
                                <div>
                                    <img
                                        src="https://hrm.bdtask-demo.com/./application/modules/recruitment/assets/images/2022-06-19/160.jpg"
                                        width="100px;"
                                        height="100px;"
                                        class="img-circle border-circle"
                                    />
                                </div>
                            </div>
                            <div
                                class="card-content bg-white border-round-bottom-lg gap-10"
                            >
                                <div
                                    class="card-content-member text-center items-center justify-items-center gap-10"
                                >
                                    <h4 class="m-t-0 text-md py-2">Panha</h4>
                                    <h5 class="text-sm">
                                        Department: Technical
                                    </h5>
                                    <p class="m-0">
                                        <i
                                            class="pi pi-mobile"
                                            aria-hidden="true"
                                        ></i>
                                        0183634422
                                    </p>
                                </div>
                                <!-- Personal Information -->
                                <div class="card-content-languages mt-6">
                                    <div
                                        class="card-content-languages-group"
                                    ></div>
                                    <div class="card-content-languages-group">
                                        <caption class="resumecaption">
                                            <h5
                                                class="text-center items-center justify-items-center font-bold my-4"
                                            >
                                                Personal Information
                                            </h5>
                                        </caption>
                                        <table
                                            class="table table-hover"
                                            width="100%"
                                        >
                                            <tbody>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>Saklain Musthak</td>
                                                </tr>
                                                <tr>
                                                    <th>Phone</th>
                                                    <td>0183634422</td>
                                                </tr>
                                                <tr>
                                                    <th>Email Address</th>
                                                    <td>saklain@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th>Country</th>
                                                    <td>Bangladesh</td>
                                                </tr>
                                                <tr>
                                                    <th>City</th>
                                                    <td>Dhaka</td>
                                                </tr>
                                                <tr>
                                                    <th>Zip Code</th>
                                                    <td>1212</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- Personal Informations -->
                                    <div class="card-content-languages-group">
                                        <table
                                            class="table table-hover"
                                            width="100%"
                                        >
                                            <tbody>
                                                <tr>
                                                    <th>Date of Birth</th>
                                                    <td>2001-05-30</td>
                                                </tr>
                                                <tr>
                                                    <th>Gender</th>
                                                    <td>Male</td>
                                                </tr>
                                                <tr>
                                                    <th>Marital Status</th>
                                                    <td>Single</td>
                                                </tr>
                                                <tr>
                                                    <th>Ethnic Group</th>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <th>SOS</th>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <th>Work in City</th>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <th>City of Residence</th>
                                                    <td>Yes</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="card-footer-stats">
                                        <div>
                                            <p></p>
                                            <span class="stats-small"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Positional Information -->
                        <div class="col-sm-12 col-md-8 employee-cv-info">
                            <div class="row">
                                <div
                                    class="col-sm-12 col-md-12 rating-block card"
                                >
                                    <caption
                                        class="resumecaption border-bottom-1 px-4 font-bold py-4"
                                    >
                                        <h5
                                            class="text-center items-center justify-items-center font-bold my-4"
                                        >
                                            Positional Information
                                        </h5>
                                    </caption>
                                    <table
                                        class="table table-hover"
                                        width="100%"
                                    >
                                        <tbody>
                                            <tr>
                                                <th>Sub Department</th>
                                                <td>Backend</td>
                                            </tr>
                                            <tr>
                                                <th>Position</th>
                                                <td>Sr. PHP Programmer</td>
                                            </tr>
                                            <tr>
                                                <th>Duty Type</th>
                                                <td>Full Time</td>
                                            </tr>
                                            <tr>
                                                <th>Hire Date</th>
                                                <td>2022-05-31</td>
                                            </tr>
                                            <tr>
                                                <th>Joining Date</th>
                                                <td>2022-05-31</td>
                                            </tr>
                                            <tr>
                                                <th>Rate Type</th>
                                                <td>Hourly</td>
                                            </tr>
                                            <tr>
                                                <th>Rate</th>
                                                <td>0</td>
                                            </tr>
                                            <tr>
                                                <th>Pay Frequency</th>
                                                <td>Monthly</td>
                                            </tr>
                                            <tr>
                                                <th>Home Department</th>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th>Supervisor Name</th>
                                                <td>Self</td>
                                            </tr>
                                            <tr>
                                                <th>Ist Supervisor</th>
                                                <td>No</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    class="col-sm-12 col-md-12 rating-block card"
                                >
                                    <caption
                                        class="resumecaption border-bottom-1 px-4 font-bold py-4 text-center items-center justify-items-center"
                                    >
                                        <h5
                                            class="text-center items-center justify-items-center font-bold my-4"
                                        >
                                            Emergency Contact
                                        </h5>
                                    </caption>
                                    <table
                                        class="table table-hover"
                                        width="100%"
                                    >
                                        <tbody>
                                            <tr>
                                                <th>Emergency Contact</th>
                                                <td>90875645</td>
                                            </tr>
                                            <tr>
                                                <th>Emergency Home Phone</th>
                                                <td>90875645</td>
                                            </tr>
                                            <tr>
                                                <th>Emergency Work Phone</th>
                                                <td>90875645</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footers -->
        <template #footer>
            <Button
                label="Cancel"
                text
                class="w-10rem text-sm"
                outlined
                severity="secondary"
                @click.prevent="closeResignFormEmp"
                autofocus
            />
        </template>
    </Dialog>
</template>

<!-- Script of Dialogs View Detail Employee -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import manageResignRequestEmployeeHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageResignRequestEmployeeHelper";
import manageGlobalOrgEmployeeHelper from "@/mixin/manage_geo_org_str/manageGlobalOrgEmployeeHelper";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";
export default {
    setup() {
        return { v$: useVuelidate() };
    },
    mixins: [
        manageResignRequestEmployeeHelper,
        manageGlobalOrgEmployeeHelper,
        manageOrgStructureDeptNewFeatures,
        manageOrgDeptPositionStructuresHelper,
    ],
    data() {
        return {
            count: 0,
            option: {
                penColor: "rgb(0, 0, 0)",
                backgroundColor: "rgb(255,255,255)",
            },
            disabled: false,
            signatureResignEmployee: null,
            employeeNameResign: null,
            // employeePositionRequest: null,
            employeeDateEffective: null,
            employeeReasonResign: null,
            employeeCommentResign: "",
            fillResignSignature: null,
            loadingBtnResignBtn: false,
        };
    },
    validations() {
        return {
            employeeNameResign: { required, minLength: minLength(3) },
            // employeePositionRequest: { required },
            employeeDateEffective: { required },
            employeeReasonResign: { required },
        };
    },
    props: {
        dialogResignForm: {
            type: Boolean,
            default: false,
            required: true,
        },
        departmentName: {
            type: String,
            default() {
                return null;
            },
        },
        orgAssignId: {
            type: Number,
            required: true,
            default: () => 0,
        },
        orgStrDeptPosId: {
            type: Number,
            required: true,
            defaultValue: 0,
            default: 0,
        },
    },
    computed: {
        openDialogsResignWork() {
            return this.dialogResignForm || false;
        },
    },
    methods: {
        closeResignFormEmp() {
            this.$emit("close");
        },
        clearEmpSignatureResign() {
            if (!this.$refs.fillResignSignature.isEmpty()) {
                this.$refs.fillResignSignature.clear();
            }
        },
    },
};
</script>
