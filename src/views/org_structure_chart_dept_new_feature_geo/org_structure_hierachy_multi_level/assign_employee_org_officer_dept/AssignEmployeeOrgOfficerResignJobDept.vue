<!-- eslint-disable vue/no-mutating-props -->
<template>
    <Toast />
    <Dialog
        v-model:visible="openDialogsResignWork"
        modal
        :header="
            'Employee Resignation:' +
            '\n   ' +
            dataResignEmpJobOrg?.empEnglishName
        "
        :style="{ width: '60rem' }"
        maximizable
    >
        <Toast />
        <!-- Headers of Exp-Info -->
        <template #closeicon>
            <i class="pi pi-times" @click.prevent="closeResignFormEmp"></i>
        </template>
        <div class="m-0 p-0">
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div class="col-12 lg:col-12">
                    <div class="grid formgrid">
                        <!-- Employee Name -->
                        <div class="col-6 field">
                            <div class="field">
                                <label for="name_en" class="text-sm"
                                    >English Name<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <InputText
                                    id="reason_"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="English Name"
                                    class="border-round-lg text-sm font-bold text-black"
                                    v-model="dataResignEmpJobOrg.empEnglishName"
                                    disabled
                                />
                            </div>
                        </div>
                        <!-- Khmer Name -->
                        <div class="col-6 field">
                            <div class="field">
                                <label for="name_en" class="text-sm"
                                    >Khmer Name<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <InputText
                                    id="reason_"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="English Name"
                                    class="border-round-lg text-sm font-bold text-black"
                                    v-model="dataResignEmpJobOrg.empKhmerName"
                                    disabled
                                />
                            </div>
                        </div>
                        <!-- Departments -->
                        <div class="col-6 field">
                            <div class="field">
                                <label for="name_en" class="text-sm"
                                    >Department<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <InputText
                                    id="reason_"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="English Name"
                                    class="border-round-lg text-sm font-bold text-black"
                                    v-model="departmentResignDepartment"
                                    disabled
                                />
                            </div>
                        </div>
                        <!-- Positions -->
                        <div class="col-6 field">
                            <div class="field">
                                <label for="name_en" class="text-sm"
                                    >Position<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <InputText
                                    id="reason_"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="English Name"
                                    class="border-round-lg text-sm font-bold text-black"
                                    v-model="
                                        dataResignEmpJobOrg
                                            .tbl_org_position_geo_fence
                                            .positionNameEng
                                    "
                                    disabled
                                />
                            </div>
                        </div>
                        <!-- Phone Number -->
                        <div class="col-6 field">
                            <div class="field">
                                <label for="name_en" class="text-sm"
                                    >Phone Number<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <InputText
                                    id="reason_"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="English Name"
                                    class="border-round-lg text-sm font-bold text-black"
                                    v-model="dataResignEmpJobOrg.phoneNumber"
                                    disabled
                                />
                            </div>
                        </div>
                        <!-- I hereby tender my resignation as an employee of the company to be effective on: -->
                        <div class="col-6 field">
                            <div class="field">
                                <label for="resignation_date" class="text-sm"
                                    >Resignation Date<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <Calendar
                                    id="resignation_date"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="Please select a resignation date"
                                    class="border-round-lg text-sm"
                                    v-model="v$.employeeDateEffective.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.employeeDateEffective.$invalid &&
                                            submitted,
                                    }"
                                />
                                <small
                                    v-if="
                                        (v$.employeeDateEffective.$invalid &&
                                            submitted) ||
                                        v$.employeeDateEffective.$pending
                                            .$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.employeeDateEffective.required.$message.replace(
                                            "Value",
                                            "Resignation Date"
                                        ) ||
                                        v$.employeeDateEffective.$params.min
                                    }}</small
                                >
                            </div>
                        </div>
                        <!-- Reason Noted -->
                        <div class="col-12 field">
                            <div class="field">
                                <label
                                    for="resignation_resign_noted"
                                    class="text-sm"
                                    >Reason<span class="p-error">*</span></label
                                >
                                <InputText
                                    id="reason_"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="Description of reason resignation"
                                    class="border-round-lg text-sm"
                                    v-model="v$.employeeReasonResign.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.employeeReasonResign.$invalid &&
                                            submitted,
                                    }"
                                />
                                <small
                                    v-if="
                                        (v$.employeeReasonResign.$invalid &&
                                            submitted) ||
                                        v$.employeeReasonResign.$pending
                                            .$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.employeeReasonResign.required.$message.replace(
                                            "Value",
                                            "Resignation Date"
                                        ) || v$.employeeReasonResign.$params.min
                                    }}</small
                                >
                            </div>
                        </div>
                        <!-- Comments -->
                        <div class="col-12 field">
                            <div class="field">
                                <label
                                    for="resignation_resign_noted"
                                    class="text-sm"
                                    >Remark</label
                                >
                                <Textarea
                                    id="noted_comment"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="Please enter remark"
                                    class="border-round-lg text-sm"
                                    v-model="employeeCommentResign"
                                />
                            </div>
                        </div>
                        <!-- Employee Signature -->
                        <div class="col-6 field">
                            <div class="field gap-10">
                                <label
                                    for="resignation_resign_noted"
                                    class="text-sm"
                                    >Employee Signature</label
                                >
                                <div class="border-1 border-round-lg">
                                    <Vue3Signature
                                        ref="fillResignSignature"
                                        :sigOption="option"
                                        v-model="fillResignSignature"
                                        class="my-10 hover:bg-red-600"
                                    ></Vue3Signature>
                                </div>
                                <div
                                    class="py-2 justify-items-end item-end flex"
                                >
                                    <Button
                                        label="Clear"
                                        @click.prevent="
                                            clearEmpSignatureResign()
                                        "
                                        severity="secondary"
                                        class="w-5rem h-2rem text-sm"
                                        outlined
                                    />
                                </div>
                            </div>
                        </div>
                        <!-- File Upload -->
                        <!-- Upload Files Department Job Descriptions-->
                        <div class="col-12 field">
                            <div class="field" style="width: 50rem">
                                <label> Attachments </label>
                                <FileUpload
                                    name="attachments[]"
                                    url="/api/upload"
                                    :multiple="true"
                                    accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                                    :maxFileSize="300000000"
                                    @select="onSelectedFiles"
                                    :fileLimit="5"
                                    :previewWidth="500"
                                >
                                    <template
                                        #header="{
                                            chooseCallback,
                                            clearCallback,
                                            files,
                                        }"
                                    >
                                        <div
                                            class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2"
                                        >
                                            <div class="flex gap-2">
                                                <Button
                                                    @click="chooseCallback()"
                                                    icon="pi pi-images"
                                                    rounded
                                                    class="w-3rem h-3rem"
                                                    outlined
                                                ></Button>
                                                <Button
                                                    @click="clearCallback()"
                                                    icon="pi pi-times"
                                                    rounded
                                                    outlined
                                                    class="w-3rem h-3rem"
                                                    severity="danger"
                                                    :disabled="
                                                        !files ||
                                                        files.length === 0
                                                    "
                                                ></Button>
                                            </div>
                                        </div>
                                    </template>
                                    <template
                                        #content="{ files, removeFileCallback }"
                                    >
                                        <div v-if="files.length > 0">
                                            <div
                                                class="flex flex-wrap p-0 sm:p-2 gap-1"
                                            >
                                                <div
                                                    v-for="(
                                                        file, index
                                                    ) of files"
                                                    :key="
                                                        file.name +
                                                        file.type +
                                                        file.size
                                                    "
                                                    class="card m-0 px-2 flex flex-row border-1 item-center surface-border align-items-center gap-2 w-full"
                                                >
                                                    <div
                                                        class="ml-3"
                                                        v-if="
                                                            file.type !==
                                                            'application/pdf'
                                                        "
                                                    >
                                                        <img
                                                            role="presentation"
                                                            :alt="file.name"
                                                            :src="
                                                                file.objectURL
                                                            "
                                                            width="100"
                                                            height="50"
                                                        />
                                                    </div>
                                                    <div v-else class="ml-3">
                                                        <i
                                                            class="pi pi-file-pdf text-danger"
                                                            style="
                                                                font-size: 2rem;
                                                            "
                                                        ></i>
                                                    </div>
                                                    <span
                                                        class="font-semibold text-sm"
                                                        >{{ file.name }}</span
                                                    >
                                                    <div class="text-red-500">
                                                        ({{
                                                            formatSize(
                                                                file.size
                                                            )
                                                        }})
                                                    </div>
                                                    <!-- Button remove -->
                                                    <Button
                                                        icon="pi pi-times"
                                                        @click="
                                                            onRemoveTemplatingFile(
                                                                file,
                                                                removeFileCallback,
                                                                index
                                                            )
                                                        "
                                                        rounded
                                                        text
                                                        severity="danger"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #empty>
                                        <div
                                            class="flex align-items-center justify-content-center flex-column"
                                        >
                                            <i
                                                class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"
                                            />
                                            <p class="mt-4 mb-0">
                                                Drag and drop files to here to
                                                upload.
                                            </p>
                                        </div>
                                    </template>
                                </FileUpload>
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
            <Button
                :label="loadingBtnResignBtn ? 'Confirm Resign' : 'Resign'"
                class="w-15rem text-sm"
                severity="primary"
                raised
                outlined
                @click.prevent="submittedEmployeeResignJobDeptOrg(!v$.$invalid)"
                autofocus
                :loading="loadingBtnResignBtn"
            />
        </template>
    </Dialog>
</template>
<!-- Script of Dialogs Infor -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import manageResignRequestEmployeeHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageResignRequestEmployeeHelper";
import manageGlobalOrgEmployeeHelper from "@/mixin/manage_geo_org_str/manageGlobalOrgEmployeeHelper";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";
import manageOrgEmployeeMainHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_dept_employee_main/manageOrgEmployeeMainHelper";
export default {
    components: {},
    setup() {
        return { v$: useVuelidate() };
    },
    mixins: [
        manageResignRequestEmployeeHelper,
        manageGlobalOrgEmployeeHelper,
        manageOrgStructureDeptNewFeatures,
        manageOrgDeptPositionStructuresHelper,
        manageOrgEmployeeMainHelper,
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
            dataResignEmpJobOrg: null,
        };
    },
    validations() {
        return {
            // employeeNameResign: { required, minLength: minLength(3) },
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
        openResignDataEmpJob: {
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
        departmentResignDepartment() {
            return this.departmentName || null;
        },
    },
    async mounted() {
        if (this.openResignDataEmpJob) {
            this.dataResignEmpJobOrg = {
                ...this.dataResignEmpJobOrg,
                ...this.openResignDataEmpJob,
            };
        } else {
            this.dataResignEmpJobOrg = {
                empId: 0,
                userId: "",
                phoneNumber: 0,
                orgId: 0,
                empEmailAddress: "",
                empEnglishName: "",
                empKhmerName: "",
                empNoted: "",
                tbl_org_position_geo_fence: {
                    positionId: 49,
                    positionNameEng: "",
                    positionNameKh: "",
                    positionStatus: 1,
                    positionLevel: "",
                },
            };
        }
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
