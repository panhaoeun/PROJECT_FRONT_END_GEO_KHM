<template>
    <Dialog
        v-model:visible="openDialogChangePosition"
        modal
        :header="
            'Assign position to officer by department: ' + '\n' + departmentName
        "
        :style="{ width: '60rem' }"
        maximizable
    >
        <Toast />
        <!-- Headers of Exp-Info -->
        <template #closeicon>
            <i class="pi pi-times" @click.prevent="closeChangePosition"></i>
        </template>
        <form>
            <div class="m-0 p-0">
                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                    <div class="col-12 lg:col-12">
                        <div class="grid formgrid">
                            <!-- Employee -->
                            <div class="col-6 md:col-12 lg:col-12 field">
                                <div class="field">
                                    <label
                                        :class="{
                                            'p-invalid p-error':
                                                v$.selectedAssignEmp.$invalid &&
                                                submitted,
                                        }"
                                    >
                                        Employee
                                        <span class="p-error">*</span>
                                    </label>
                                    <Dropdown
                                        showClear
                                        v-model="v$.selectedAssignEmp.$model"
                                        :class="{
                                            'p-invalid p-error':
                                                v$.selectedAssignEmp.$invalid &&
                                                submitted,
                                        }"
                                        :options="getEmpDataOrgDept"
                                        optionLabel="geo_english_name"
                                        empty="Empty manager"
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
                                                            .full_latin_name ??
                                                        ""
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
                                                            .full_latin_name ??
                                                        ""
                                                    }})
                                                </div>
                                            </div>
                                        </template>
                                    </Dropdown>
                                    <small
                                        v-if="
                                            (v$.selectedAssignEmp.$invalid &&
                                                submitted) ||
                                            v$.selectedAssignEmp.$pending
                                                .$response
                                        "
                                        class="p-error"
                                        >{{
                                            v$.selectedAssignEmp.required.$message.replace(
                                                "Value",
                                                "Employee"
                                            ) ||
                                            v$.selectedAssignEmp.$params.min
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Positions -->
                            <div class="col-6 md:col-12 lg:col-12 field">
                                <div class="field">
                                    <label
                                        :class="{
                                            'p-invalid p-error text-danger':
                                                v$.selectedAssignPositionOrg
                                                    .$invalid && submitted,
                                        }"
                                    >
                                        Position
                                        <span class="p-error p-invalid">*</span>
                                    </label>
                                    <Dropdown
                                        showClear
                                        :options="getPositionBaseDept"
                                        v-model="
                                            v$.selectedAssignPositionOrg.$model
                                        "
                                        :class="{
                                            'p-invalid p-error':
                                                v$.selectedAssignPositionOrg
                                                    .$invalid &&
                                                submitted
                                        }"
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
                                            (v$.selectedAssignPositionOrg
                                                .$invalid &&
                                                submitted) ||
                                            v$.selectedAssignPositionOrg
                                                .$pending.$response
                                        "
                                        class="p-error"
                                        >{{
                                            v$.selectedAssignPositionOrg.required.$message.replace(
                                                "Value",
                                                "Position"
                                            ) ||
                                            v$.selectedAssignPositionOrg.$params
                                                .min
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Upload Files Department Job Descriptions-->
                            <div class="col-6 field">
                                <div class="field" style="width: 50rem">
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
                                                        @click="
                                                            chooseCallback()
                                                        "
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
                                            #content="{
                                                files,
                                                removeFileCallback,
                                            }"
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
                                                        <div
                                                            v-else
                                                            class="ml-3"
                                                        >
                                                            <i
                                                                class="pi pi-file-pdf text-danger"
                                                                style="
                                                                    font-size: 2rem;
                                                                "
                                                            ></i>
                                                        </div>
                                                        <span
                                                            class="font-semibold text-sm"
                                                            >{{
                                                                file.name
                                                            }}</span
                                                        >
                                                        <div
                                                            class="text-red-500"
                                                        >
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
                                                    Drag and drop files to here
                                                    to upload.
                                                </p>
                                            </div>
                                        </template>
                                    </FileUpload>
                                </div>
                            </div>
                            <!-- Descriptions -->
                            <div class="col-12 field">
                                <div class="field">
                                    <label> Descriptions </label>
                                    <Editor
                                        v-model="assignEmpNoted"
                                        editorStyle="height: 320px;"
                                        placeholder="Please description of change position to officer"
                                    >
                                        <template v-slot:toolbar>
                                            <span class="ql-formats">
                                                <!-- Add font size dropdown -->
                                                <select class="ql-size">
                                                    <option
                                                        value="small"
                                                    ></option>
                                                    <!-- Note a missing, thus falsy value, is used to reset to default -->
                                                    <option selected></option>
                                                    <option
                                                        value="large"
                                                    ></option>
                                                    <option
                                                        value="huge"
                                                    ></option>
                                                </select>
                                                <button
                                                    v-tooltip.bottom="'Bold'"
                                                    class="ql-bold"
                                                ></button>
                                                <button
                                                    v-tooltip.bottom="'Italic'"
                                                    class="ql-italic"
                                                ></button>
                                                <button
                                                    v-tooltip.bottom="
                                                        'Underline'
                                                    "
                                                    class="ql-underline"
                                                ></button>
                                            </span>
                                        </template>
                                    </Editor>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <template #footer>
            <div class="flex j-end gap-10">
                <Button
                    :label="$t('addressPopup.cancel')"
                    text
                    class="w-10rem text-sm"
                    outlined
                    severity="secondary"
                    @click.prevent="closeChangePosition"
                    autofocus
                />
                <Button
                    :label="
                        submittingAssignEmpData
                            ? 'Confirm Add Position...'
                            : 'Submitted'
                    "
                    class="w-20rem text-sm"
                    severity="primary"
                    raised
                    outlined
                    @click.prevent="submittedAssignOrgEmpPosition(!v$.$invalid)"
                    autofocus
                    :loading="submittingAssignEmpData"
                />
            </div>
        </template>
    </Dialog>
</template>

<!-- Script of edited projects -->
<script>
// import Spinner from "@/components/ui_component_new_frontend/Spinner";
// import PopOver from "@/components/ui_component_new_frontend/PopOver";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
// import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import manageGlobalOrgEmployeeHelper from "@/mixin/manage_geo_org_str/manageGlobalOrgEmployeeHelper";
import { mapActions } from "vuex";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";
export default {
    setup: () => ({ v$: useVuelidate() }),
    //Validations
    validations() {
        return {
            selectedAssignEmp: {
                required,
            },
            selectedAssignPositionOrg: {
                required,
            },
        };
    },
    components: {
        // AjaxButton,
    },
    props: {
        departmentName: {
            type: String,
            default() {
                return null;
            },
        },
        dialogChangePosition: {
            type: Boolean,
            default: false,
            required: true,
        },
        geoOrgProjectStrData: {
            type: Object,
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
        nameProject() {
            return this.geoOrgProjectStrData?.project_name || "";
        },
        selectedAssignEmployeeOrg() {
            let orgStrEmpId;
            const getOrgEmpOrgId = this.selectedAssignEmp
                ? this.selectedAssignEmp
                : null;
            if (
                (getOrgEmpOrgId !== null && getOrgEmpOrgId !== "") ||
                typeof getOrgEmpOrgId !== "undefined" ||
                typeof orgStrEmpId !== "string"
            ) {
                orgStrEmpId = parseInt(getOrgEmpOrgId?.id);
            }
            return orgStrEmpId;
        },
        getPositionSelectedDeptOrgStrId() {
            const orgStrPositionSelected = this.selectedAssignPositionOrg
                ? this.selectedAssignPositionOrg
                : null;
            if (
                orgStrPositionSelected !== null ||
                (orgStrPositionSelected !== undefined &&
                    typeof orgStrPositionSelected !== "object" &&
                    orgStrPositionSelected > 0)
            ) {
                return parseInt(orgStrPositionSelected?.deptPosId)
                    ? parseInt(orgStrPositionSelected?.deptPosId)
                    : 0;
            }
            return 0;
        },
    },
    mixins: [
        util,
        validation,
        manageOrgStructureDeptNewFeatures,
        manageGlobalOrgEmployeeHelper,
        manageOrgDeptPositionStructuresHelper,
    ],
    data() {
        return {
            submitted: false,
            loadingSpinner: false,
            projectStrGeoData: null,
            hasProvinceErrors: false,
            submittingAssignEmpData: false,
            assignEmpNoted: '',
            selectedAssignEmp: null,
            selectedAssignPositionOrg: null,
            hasErrorAssignStrEmp: false,
            totalSize: 0,
            totalSizePercent: 0,
            fileEmpAssignUploadOrg: [],
        };
    },
    async mounted() {
        const getPosDeptOrgId = parseInt(this.orgAssignId)
            ? parseInt(this.orgAssignId)
            : 0;
        this.getAllReloadPositionDeptOrg(getPosDeptOrgId);
        // Get All Position Dept Job Description
        if (this.geoOrgProjectStrData) {
            this.projectStrGeoData = {
                ...this.projectStrGeoData,
                ...this.geoOrgProjectStrData,
            };
        } else {
            this.projectStrGeoData = {
                id: 0,
                project_name: "",
                project_noted: "",
            };
        }
    },
    methods: {
        ...mapActions("common", [
            "fetchLocation",
            "setToastMessage",
            "setToastError",
            "getRequest",
        ]),
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
        openDialogChangePosition() {
            return this.dialogChangePosition || false;
        },
        closeChangePosition() {
            this.$emit("close");
        },
        closeDialogEmpOrgAssign() {
            this.openDialogEmpOrg = false;
        },
        // Upload FIles
        onRemoveTemplatingFile(file, removeFileCallback, index) {
            removeFileCallback(index);
            this.totalSize -= parseInt(this.formatSize(file.size));
            this.totalSizePercent = this.totalSize / 10;
        },
        onClearTemplatingUpload(clear) {
            clear();
            this.totalSize = 0;
            this.totalSizePercent = 0;
        },
        // Selected FIle Upload
        onSelectedFiles(event) {
            this.fileEmpAssignUploadOrg = event.files;
            this.fileEmpAssignUploadOrg.forEach((file) => {
                this.totalSize += parseInt(this.formatSize(file.size));
            });
        },
        formatSize(bytes) {
            const k = 1024;
            const dm = 3;
            const sizes = this.$primevue.config.locale.fileSizeTypes;
            if (bytes === 0) {
                return `0 ${sizes[0]}`;
            }

            const i = Math.floor(Math.log(bytes) / Math.log(k));
            const formattedSize = parseFloat(
                (bytes / Math.pow(k, i)).toFixed(dm)
            );
            return formattedSize + "\n" + "KB";
        },
    },
};
</script>
