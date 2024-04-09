<!-- eslint-disable vue/no-mutating-props -->
<template>
    <Toast />
    <Dialog
        v-model:visible="openDialogChangePositionEmp"
        modal
        :header="'Employee Position Change: ' + '\n' + departmentName"
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
                <div class="col-12 lg:col-1s2">
                    <div class="grid formgrid">
                        <!-- Reason for change -->
                        <div class="col-12 field">
                            <div class="field">
                                <label for="name_en" class="text-sm"
                                    >Reason for change
                                    <span class="p-error">*</span></label
                                >
                                <div class="flex flex-column gap-10">
                                    <div
                                        v-for="reasonChange in reasonChangeOpt"
                                        :key="reasonChange"
                                        class="flex align-items-center align-items-center text-sm"
                                    >
                                        <RadioButton
                                            v-model="selectedChangeEmpPosition"
                                            :inputId="reasonChange?.key"
                                            name="dynamic"
                                            :value="reasonChange?.name"
                                        />
                                        <label
                                            :for="reasonChange?.key"
                                            class="ml-2"
                                            >{{ reasonChange?.name }}</label
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--===============Profile of the Employee============-->
                        <div class="col-12 field">
                            <p for="name_en" class="text-md font-bold">
                                Profile of the Employee
                            </p>
                            <hr />
                        </div>
                        <!-- Employee Name -->
                        <div class="col-6 field">
                            <div class="field">
                                <label
                                    for="name_en"
                                    class="text-sm"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.employeePosition.$invalid &&
                                            submitted,
                                    }"
                                    >Employee Name<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <Dropdown
                                    showClear
                                    v-model="v$.employeePosition.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.employeePosition.$invalid &&
                                            submitted,
                                    }"
                                    :options="getEmpDataOrgDept"
                                    optionLabel="geo_english_name"
                                    empty="Empty Employee"
                                    filter
                                    placeholder="Select a employee"
                                    inputId="geo_english_name"
                                    aria-describedby="dd-error"
                                    :highlightOnSelect="false"
                                    class="w-full border-round-lg"
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    geoNameToTitleCase(
                                                        String(
                                                            slotProps.value
                                                                ?.full_kh_name ??
                                                                ""
                                                        )
                                                    )
                                                }}({{
                                                    slotProps.value
                                                        .full_latin_name ?? ""
                                                }})
                                            </div>
                                        </div>
                                        <span v-else class="text-sm">
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div
                                            class="flex align-items-center text-sm"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    geoNameToTitleCase(
                                                        String(
                                                            slotProps.option
                                                                .full_kh_name ??
                                                                ""
                                                        )
                                                    )
                                                }}
                                                ({{
                                                    slotProps.option
                                                        .full_latin_name ?? ""
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <small
                                    v-if="
                                        (v$.employeePosition.$invalid &&
                                            submitted) ||
                                        v$.employeePosition.$pending.$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.employeePosition.required.$message.replace(
                                            "Value",
                                            "Employee Name"
                                        ) || v$.employeePosition.$params.min
                                    }}</small
                                >
                            </div>
                        </div>
                        <!--Position/Job Title -->
                        <div class="col-6 field">
                            <div class="field">
                                <label
                                    for="name_en"
                                    class="text-sm"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.positionOldJobProfile.$invalid &&
                                            submitted,
                                    }"
                                    >Position/Job Title<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <Dropdown
                                    showClear
                                    v-model="v$.positionOldJobProfile.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.positionOldJobProfile.$invalid &&
                                            submitted,
                                    }"
                                    :options="getPositionBaseDept"
                                    optionLabel="deptPosName"
                                    empty="Empty Position"
                                    filter
                                    placeholder="Select a position"
                                    inputId="deptPosName"
                                    aria-describedby="dd-error"
                                    :highlightOnSelect="false"
                                    class="w-full border-round-lg"
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    geoNameToTitleCase(
                                                        String(
                                                            slotProps.value
                                                                ?.deptPosName ??
                                                                ""
                                                        )
                                                    )
                                                }}({{
                                                    slotProps.value
                                                        .positionKhmerName ??
                                                    ""
                                                }})
                                            </div>
                                        </div>
                                        <span v-else class="text-sm">
                                            {{ slotProps?.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div
                                            class="flex align-items-center text-sm"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    geoNameToTitleCase(
                                                        String(
                                                            slotProps.option
                                                                .deptPosName ??
                                                                ""
                                                        )
                                                    )
                                                }}
                                                ({{
                                                    slotProps.option
                                                        .positionKhmerName ??
                                                    ""
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <small
                                    v-if="
                                        (v$.positionOldJobProfile.$invalid &&
                                            submitted) ||
                                        v$.positionOldJobProfile.$pending
                                            .$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.positionOldJobProfile.required.$message.replace(
                                            "Value",
                                            "Position"
                                        ) ||
                                        v$.positionOldJobProfile.$params.min
                                    }}</small
                                >
                            </div>
                        </div>

                        <!--===============Employment Changes============-->
                        <div class="col-12 field">
                            <p for="employee" class="text-md font-bold">
                                Employee Change
                            </p>
                            <hr />
                        </div>
                        <!--New Employee -->
                        <div class="col-6 field">
                            <div class="field">
                                <label
                                    for="employee"
                                    class="text-sm"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.newEmployeeStaffChange
                                                .$invalid && submitted,
                                    }"
                                    >New Employee<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <Dropdown
                                    showClear
                                    v-model="v$.newEmployeeStaffChange.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.newEmployeeStaffChange
                                                .$invalid && submitted,
                                    }"
                                    :options="getEmpDataOrgDept"
                                    optionLabel="geo_english_name"
                                    empty="Empty Employee"
                                    filter
                                    placeholder="Select a employee"
                                    inputId="geo_english_name"
                                    aria-describedby="dd-error"
                                    :highlightOnSelect="false"
                                    class="w-full border-round-lg"
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    geoNameToTitleCase(
                                                        String(
                                                            slotProps.value
                                                                ?.full_kh_name ??
                                                                ""
                                                        )
                                                    )
                                                }}({{
                                                    slotProps.value
                                                        .full_latin_name ?? ""
                                                }})
                                            </div>
                                        </div>
                                        <span v-else class="text-sm">
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div
                                            class="flex align-items-center text-sm"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    geoNameToTitleCase(
                                                        String(
                                                            slotProps.option
                                                                .full_kh_name ??
                                                                ""
                                                        )
                                                    )
                                                }}
                                                ({{
                                                    slotProps.option
                                                        .full_latin_name ?? ""
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <small
                                    v-if="
                                        (v$.newEmployeeStaffChange.$invalid &&
                                            submitted) ||
                                        v$.newEmployeeStaffChange.$pending
                                            .$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.newEmployeeStaffChange.required.$message.replace(
                                            "Value",
                                            "Employee"
                                        ) ||
                                        v$.newEmployeeStaffChange.$params.min
                                    }}</small
                                >
                            </div>
                        </div>
                        <!-- New Position/Job Title -->
                        <div class="col-6 field">
                            <div class="field">
                                <label for="name_en" class="text-sm"
                                    >New Position/Job Title<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <Dropdown
                                    showClear
                                    v-model="v$.positionNewJobProfile.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.positionNewJobProfile.$invalid &&
                                            submitted,
                                    }"
                                    :options="getPositionBaseDept"
                                    optionLabel="deptPosName"
                                    empty="Empty Position"
                                    filter
                                    placeholder="Select a position"
                                    inputId="deptPosName"
                                    aria-describedby="dd-error"
                                    :highlightOnSelect="false"
                                    class="w-full border-round-lg"
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    geoNameToTitleCase(
                                                        String(
                                                            slotProps.value
                                                                ?.deptPosName ??
                                                                ""
                                                        )
                                                    )
                                                }}({{
                                                    slotProps.value
                                                        .positionKhmerName ??
                                                    ""
                                                }})
                                            </div>
                                        </div>
                                        <span v-else class="text-sm">
                                            {{ slotProps?.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div
                                            class="flex align-items-center text-sm"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    geoNameToTitleCase(
                                                        String(
                                                            slotProps.option
                                                                .deptPosName ??
                                                                ""
                                                        )
                                                    )
                                                }}
                                                ({{
                                                    slotProps.option
                                                        .positionKhmerName ??
                                                    ""
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <small
                                    v-if="
                                        (v$.positionNewJobProfile.$invalid &&
                                            submitted) ||
                                        v$.positionNewJobProfile.$pending
                                            .$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.positionNewJobProfile.required.$message.replace(
                                            "Value",
                                            "New Position/Job Title"
                                        ) ||
                                        v$.positionNewJobProfile.$params.min
                                    }}</small
                                >
                            </div>
                        </div>
                        <!--New Department -->
                        <!-- <div class="col-6 field">
                            <div class="field">
                                <label for="name_en" class="text-sm"
                                    >New Department<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <InputText
                                    id="position_name"
                                    placeholder="Please selected department"
                                    type="text"
                                    class="py-3 border-round-lg text-sm"
                                    v-model="v$.newDepartmentChange.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.newDepartmentChange.$invalid &&
                                            submitted,
                                    }"
                                />
                                <small
                                    v-if="
                                        (v$.newDepartmentChange.$invalid &&
                                            submitted) ||
                                        v$.newDepartmentChange.$pending
                                            .$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.newDepartmentChange.required.$message.replace(
                                            "Value",
                                            "Departments"
                                        ) || v$.newDepartmentChange.$params.min
                                    }}</small
                                >
                            </div>
                        </div> -->

                        <!--===============Approver Signature============-->
                        <div class="col-12 field">
                            <hr />
                        </div>
                        <!-- Date Signed -->
                        <div class="col-6 field">
                            <div class="field">
                                <label for="date_signed" class="text-sm"
                                    >Date Signed<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <Calendar
                                    id="date_signed"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="Please select a sign date"
                                    class="border-round-lg text-sm"
                                    v-model="v$.employeeDateSign.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.employeeDateSign.$invalid &&
                                            submitted,
                                    }"
                                />
                                <small
                                    v-if="
                                        (v$.employeeDateSign.$invalid &&
                                            submitted) ||
                                        v$.employeeDateSign.$pending.$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.employeeDateSign.required.$message.replace(
                                            "Value",
                                            "Date Signed"
                                        ) || v$.employeeDateSign.$params.min
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
                                    placeholder="Please enter a comment"
                                    class="border-round-lg text-sm"
                                    v-model="employeeCommentSignPosition"
                                />
                            </div>
                        </div>
                        <!-- Approver Signature -->
                        <div class="col-6 field">
                            <div class="field gap-10">
                                <label
                                    for="resignation_resign_noted"
                                    class="text-sm"
                                    >Approver Signature</label
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
                                        size="small"
                                        severity="secondary"
                                        class="w-5rem h-2rem text-sm"
                                        outlined
                                    />
                                </div>
                            </div>
                        </div>
                        <!-- File Upload -->
                        <div class="col-12 field">
                            <div class="field" style="width: 40rem">
                                <label> Attachments </label>
                                <FileUpload
                                    name="demo[]"
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
                :label="loadingBtnResignBtn ? 'Confirm Change' : 'Submitted'"
                class="w-15rem text-sm"
                severity="primary"
                raised
                outlined
                @click.prevent="
                    submittedManageChangeNewPositionDeptOrg(!v$.$invalid)
                "
                autofocus
                :loading="loadingBtnResignBtn"
            />
        </template>
    </Dialog>
</template>
<!-- Script of Dialogs Infor -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import manageGlobalOrgEmployeeHelper from "@/mixin/manage_geo_org_str/manageGlobalOrgEmployeeHelper";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";
import manageChangePositionNewEmployeeHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageChangePositionNewEmployeeHelper";

export default {
    components: {},
    setup() {
        return { v$: useVuelidate() };
    },
    mixins: [
        manageGlobalOrgEmployeeHelper,
        manageOrgStructureDeptNewFeatures,
        manageOrgDeptPositionStructuresHelper,
        manageChangePositionNewEmployeeHelper,
    ],
    data() {
        return {
            count: 0,
            option: {
                penColor: "rgb(0, 0, 0)",
                backgroundColor: "rgb(255,255,255)",
            },
            disabled: false,
            employeePosition: null,
            positionOldJobProfile: null,
            employeeDateSign: null,
            employeeReasonResign: null,
            employeeCommentResign: "",
            fillResignSignature: null,
            loadingBtnResignBtn: false,
            selectedChangeEmpPosition: false,
            employeeCommentSignPosition: null,
            newEmployeeStaffChange: null,
            // newDepartmentChange: null,
            positionNewJobProfile: null,
            reasonChangeOpt: [
                { name: "Promotion", key: "PRO" },
                { name: "Termination", key: "TER" },
                { name: "Transfer", key: "TRAN" },
                { name: "Research", key: "RE" },
            ],
        };
    },
    validations() {
        return {
            employeePosition: { required },
            positionOldJobProfile: { required, minLength: minLength(3) },
            positionNewJobProfile: { required, minLength: minLength(3) },
            employeeDateSign: { required },
            employeeReasonResign: { required },
            // newDepartmentChange: { required },
            newEmployeeStaffChange: { required },
        };
    },
    props: {
        dialogChangePositionForm: {
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
    },
    computed: {
        openDialogChangePositionEmp() {
            return this.dialogChangePositionForm || false;
        },
    },
    methods: {
        closeResignFormEmp() {
            this.$emit("close-dialog");
        },
        clearEmpSignatureResign() {
            if (!this.$refs.fillResignSignature.isEmpty()) {
                this.$refs.fillResignSignature.clear();
            }
        },
    },
};
</script>
