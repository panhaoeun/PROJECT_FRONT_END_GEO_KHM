<template>
    <div class="layout-content px-2 py-2">
        <Toast />
        <!-- Titles -->
        <div class="flex justify-content-between my-2 px-2 py-2">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Add New Employee
            </h2>
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click.prevent="
                    $router.push(
                        '/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module'
                    )
                "   
            >
                <div class="pl-2 justify-content-center">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{ $t("route.routeBack") }}</span>
                </div>
            </el-button>
        </div>
        <!-- Content -->
        <div class="gird">
            <div class="col-12">
                <el-card class="box-card">
                    <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                        <div class="col-12 lg:col-12">
                            <TabView>
                                <!-- Basic Info -->
                                <TabPanel header="Basic Info" :disabled="false">
                                    <div class="m-0 p-0">
                                        <div class="grid formgrid">
                                            <!-- Surname -->
                                            <div class="col-4 lg:col-6 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        class="text-sm font-semibold"
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empSurname
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                    >
                                                        English Name
                                                        <span class="p-error"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <InputText
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        v-model="
                                                            v$.empSurname.$model
                                                        "
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empSurname
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        placeholder="Surname"
                                                    />
                                                    <small
                                                        v-if="
                                                            (v$.empSurname
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$.empSurname
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error text-sm"
                                                        >{{
                                                            v$.empSurname.required.$message.replace(
                                                                "Value",
                                                                "Surname"
                                                            )
                                                        }}</small
                                                    >
                                                </div>
                                            </div>
                                            <!-- First name -->
                                            <div class="col-4 lg:col-6 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empFirstName
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        class="text-sm font-semibold"
                                                    >
                                                        Khmer Name
                                                        <span class="p-error"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <InputText
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        v-model="
                                                            v$.empFirstName
                                                                .$model
                                                        "
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empFirstName
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        placeholder="First Name"
                                                    />
                                                    <small
                                                        v-if="
                                                            (v$.empFirstName
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$.empFirstName
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error text-sm"
                                                        >{{
                                                            v$.empFirstName.required.$message.replace(
                                                                "Value",
                                                                "First Name"
                                                            )
                                                        }}</small
                                                    >
                                                </div>
                                            </div>
                                            <!-- Email Address -->
                                            <div class="col-4 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        class="text-sm font-semibold"
                                                    >
                                                        Email Address
                                                    </label>
                                                    <InputText
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        v-model="empEmailAddr"
                                                        placeholder="Email Address"
                                                    />
                                                </div>
                                            </div>
                                            <!-- Phone Number -->
                                            <div class="col-4 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        class="text-sm font-semibold"
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$
                                                                    .empPhoneNumber
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                    >
                                                        Phone Number
                                                        <span class="p-error"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <InputNumber
                                                        class="border-round-lg text-sm"
                                                        type="number"
                                                        :useGrouping="false"
                                                        v-model.number="
                                                            v$.empPhoneNumber
                                                                .$model
                                                        "
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$
                                                                    .empPhoneNumber
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        placeholder="Phone Number"
                                                    />
                                                    <small
                                                        v-if="
                                                            (v$.empPhoneNumber
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$.empPhoneNumber
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error text-sm"
                                                        >{{
                                                            v$.empPhoneNumber.required.$message.replace(
                                                                "Value",
                                                                "Phone Number"
                                                            )
                                                        }}</small
                                                    >
                                                </div>
                                            </div>
                                            <!-- Gender -->
                                            <div class="col-12 col-lg-4 field">
                                                <div class="field">
                                                    <label
                                                        for="roles"
                                                        class="text-sm"
                                                        >Gender<span
                                                            class="p-error"
                                                            >*</span
                                                        ></label
                                                    >
                                                    <div
                                                        class="flex flex-column"
                                                    >
                                                        <Dropdown
                                                            v-model="
                                                                selectedUserGender
                                                            "
                                                            class="border-round-lg text-sm"
                                                            :options="
                                                                userGender
                                                            "
                                                            optionLabel="name"
                                                            placeholder="Select a Gender"
                                                            :class="{
                                                                'p-invalid p-error':
                                                                    v$
                                                                        .selectedUserGender
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                        />
                                                        <small
                                                            v-if="
                                                                (v$
                                                                    .selectedUserGender
                                                                    .$invalid &&
                                                                    submitted) ||
                                                                v$
                                                                    .selectedUserGender
                                                                    .$pending
                                                                    .$response
                                                            "
                                                            class="p-error"
                                                            >{{
                                                                v$.selectedUserGender.required.$message.replace(
                                                                    "Value",
                                                                    "Gender"
                                                                ) ||
                                                                v$
                                                                    .selectedUserGender
                                                                    .$params.min
                                                            }}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Date of Birth -->
                                            <div class="col-12 col-lg-4 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        class="text-sm"
                                                        >Date Of Birth<span
                                                            class="p-error"
                                                            >*</span
                                                        ></label
                                                    >
                                                    <Calendar
                                                        placeholder="Date of birth"
                                                        type="text"
                                                        class="border-round-lg text-sm"
                                                        v-model="
                                                            v$.userDateOfBirth
                                                                .$model
                                                        "
                                                        :class="{
                                                            'p-invalid p-error':
                                                                v$
                                                                    .userDateOfBirth
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                    />
                                                    <small
                                                        v-if="
                                                            (v$.userDateOfBirth
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$.userDateOfBirth
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error"
                                                        >{{
                                                            v$.userDateOfBirth.required.$message.replace(
                                                                "Value",
                                                                "Date of Birth"
                                                            ) ||
                                                            v$.userDateOfBirth
                                                                .$params.min
                                                        }}
                                                    </small>
                                                </div>
                                            </div>
                                            <!-- National -->
                                            <div class="col-4 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        class="text-sm font-semibold"
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empNational
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                    >
                                                        National
                                                        <span class="p-error"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <InputText
                                                        class="border-round-lg text-sm"
                                                        v-model="
                                                            v$.empNational
                                                                .$model
                                                        "
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empNational
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        placeholder="National"
                                                    />
                                                    <small
                                                        v-if="
                                                            (v$.empNational
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$.empNational
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error text-sm"
                                                        >{{
                                                            v$.empNational.required.$message.replace(
                                                                "Value",
                                                                "National"
                                                            )
                                                        }}</small
                                                    >
                                                </div>
                                            </div>
                                            <!-- Address -->
                                            <div class="col-12 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        class="text-sm font-semibold"
                                                    >
                                                        Address
                                                    </label>
                                                    <Textarea
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        v-model.trim="
                                                            empAddress
                                                        "
                                                        placeholder="Address"
                                                    />
                                                </div>
                                            </div>
                                            <!-- Description -->
                                            <div class="col-12 field">
                                                <div class="field">
                                                    <label
                                                        for="Description"
                                                        class="text-sm font-semibold"
                                                    >
                                                        Description
                                                    </label>
                                                    <Editor
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        v-model.trim="
                                                            empDescription
                                                        "
                                                        editorStyle="height: 320px"
                                                        placeholder="Please enter description"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <!-- Experience Info -->
                                <TabPanel header="Experiences">
                                    <p class="font-bold h-3">Work experience</p>
                                    <Button
                                        @click.prevent="openDialogExpInfo"
                                        icon="pi pi-plus-circle"
                                        aria-label="Submit"
                                        label="Add New Experience"
                                        class="w-15rem"
                                    />
                                    <dialog-popup-exp-info
                                        :dialog-add-experience="
                                            visibleDialogExpNew
                                        "
                                        @close-dialog="hideDialogExpNew"
                                    />
                                </TabPanel>
                                <!-- Educations Info -->
                                <TabPanel header="Educations">
                                    <p class="font-bold h-3">Educations</p>
                                    <Button
                                        @click.prevent="openDialogEducationInfo"
                                        icon="pi pi-plus-circle"
                                        aria-label="Submit"
                                        label="Add New Education"
                                        class="w-15rem"
                                    />
                                    <dialog-popup-education-info
                                        :dialog-add-experience="
                                            visibleDialogEducationNew
                                        "
                                        @close-dialog="hideDialogEducationNew"
                                    />
                                </TabPanel>
                                <!-- Skill -->
                                <TabPanel header="Skills">
                                    <p class="font-bold h-3">Skills</p>
                                    <Button
                                        @click.prevent="openDialogSkillInfo"
                                        icon="pi pi-plus-circle"
                                        aria-label="Submit"
                                        label="Add New Skill"
                                        class="w-15rem"
                                    />
                                    <dialog-popup-skill-info
                                        :dialog-add-experience="
                                            visibleDialogSkillNew
                                        "
                                        @close-dialog="hideDialogSkillNew"
                                    />
                                </TabPanel>
                                <!-- Languages -->
                                <TabPanel header="Languages">
                                    <p class="font-bold h-3">Languages</p>
                                    <Button
                                        @click.prevent="openedLanguagesNew"
                                        icon="pi pi-plus-circle"
                                        aria-label="Submit"
                                        label="Add New Languages"
                                        class="w-15rem"
                                    />
                                    <dialog-popup-languages-info
                                        :dialog-add-experience="
                                            visibleDialogLanguagesNew
                                        "
                                        @close-dialog="hideDialogLanguagesNew"
                                    />
                                </TabPanel>
                            </TabView>
                            <!-- Buttons Submits Save -->
                            <div class="col-12 flex justify-content-end mt-4">
                                <Button
                                    icon="pi pi-file"
                                    class="btn-primary py-3 w-10rem"
                                    type="submit"
                                    :loading="loadingAddNewEmp"
                                    :label="
                                        loadingAddNewEmp
                                            ? 'Saving...'
                                            : 'Add New'
                                    "
                                    @click.prevent="
                                        submitAddNewEmpGlobalGeo(!v$.$invalid)
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Script of global-admin -->
<script>
import { FilterMatchMode } from "primevue/api";
import { useVuelidate } from "@vuelidate/core";
import { minLength, numeric, maxLength, required } from "@vuelidate/validators";
import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
import DialogPopupExpInfo from "./popup_assign_more_emp/popup_experience_info/DialogPopupExperinceInfo.vue";
import DialogPopupEducationInfo from "./popup_assign_more_emp/popup_education_info/DialogPopupEducationInfo.vue";
import DialogPopupSkillInfo from "./popup_assign_more_emp/popup_skill_info/DialogPopupSkillInfo.vue";
export default {
    components: {
        DialogPopupExpInfo,
        DialogPopupEducationInfo,
        DialogPopupSkillInfo,
    },
    props: {},
    setup() {
        return { v$: useVuelidate() };
    },
    validations() {
        return {
            empSurname: { required, minLength: minLength(3) },
            empFirstName: { required, minLength: minLength(3) },
            empPhoneNumber: {
                required,
                numeric,
                minLength: minLength(6),
                maxLength: maxLength(11),
            },
            // empEmailAddr: { required, minLength: minLength(3) },
            empNational: { required, minLength: minLength(3) },
            userDateOfBirth: {
                required,
            },
            selectedUserGender: {
                required,
            },
            empTypeName: { required, minLength: minLength(3) },
            empExperiencePosName: { required, minLength: minLength(3) },
            empExperienceCompany: { required, minLength: minLength(3) },
            empTypeGeo: { required, minLength: minLength(3) },
            empExperienceTypeGeo: { required },
            empExperienceAddr: { required },
            empExperienceStartDate: { required },
            empExperienceEndDate: { required },
        };
    },
    data() {
        return {
            listAdminEmpGlobal: null,
            activeEmpAdminGeo: 1,
            filtersEmp: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            userGender: [
                { name: "Male", gender_name: "male" },
                { name: "Female", gender_name: "female" },
            ],
            selectedUserGender: null,
            userDateOfBirth: "",
            loadingAddNewEmp: false,
            empSurname: "",
            empFirstName: "",
            empPhoneNumber: 0,
            empNational: "",
            empTypeName: "",
            empExperiencePosName: "",
            empExperienceCompany: "",
            empDescription: "",
            empTypeGeo: "",
            empExperienceAddr: "",
            empExperienceStartDate: "",
            empExperienceEndDate: "",
            empExperienceNotes: "",
            empAddress: "",
            submitted: false,
            visibleDialogExpNew: false,
            visibleDialogEducationNew: false,
            visibleDialogSkillNew: false,
            visibleDialogLanguagesNew: false,
        };
    },
    created() {
        this.serviceManageStructuresProject =
            new ManageOrgChartStructureGeoProjectServices();
    },
    methods: {
        async openDialogExpInfo() {
            this.visibleDialogExpNew = true;
        },
        async hideDialogExpNew() {
            this.visibleDialogExpNew = false;
        },
        async openDialogEducationInfo() {
            this.visibleDialogEducationNew = true;
        },
        async hideDialogEducationNew() {
            this.visibleDialogEducationNew = false;
        },
        async openDialogSkillInfo() {
            this.visibleDialogSkillNew = true;
        },
        async hideDialogSkillNew() {
            this.visibleDialogSkillNew = false;
        },
        async openedLanguagesNew() {
            this.visibleDialogLanguagesNew = true;
        },
        async hideDialogLanguagesNew() {
            this.visibleDialogLanguagesNew = false;
        },
        async submitAddNewEmpGlobalGeo() {
            try {
                this.loadingAddNewEmp = true;
                this.submitted = true;

                setTimeout(async () => {
                    this.loadingAddNewEmp = false;
                    /**
                     * @Validations
                     * */
                    if (
                        this.empSurname !== null ||
                        this.empSurname !== "" ||
                        this.userDateOfBirth != null
                    ) {
                        const validation = await this.v$.$validate();
                        if (validation === false) {
                            const errorValidation = this.v$.$errors;
                            this.$toast.add({
                                severity: "error",
                                summary: "Please input filed in required",
                                message: errorValidation[0]?.$message
                                    ? errorValidation[0]?.$message
                                    : "",
                                life: 3000,
                            });
                            this.loadingAddNewEmp = false;
                        }
                    }
                    if (
                        !this.empSurname !== null ||
                        this.empFirstName !== "" ||
                        this.userDateOfBirth !== null
                    ) {
                        const addNewOrgStrMgtPosDept = {
                            empNameEng: String(this.empSurname).toString(),
                            empNameKh: String(this.empFirstName).toString(),
                            empGender: this.selectedUserGender?.name,
                            empDOB: this.userDateOfBirth,
                            empStatus: "Approved",
                            empType: "Admin",
                            empStartDate: "",
                            empPhoneNumber: parseInt(this.empPhoneNumber)
                                ? parseInt(this.empPhoneNumber)
                                : 0,
                            empNoted: String(this.empDescription).toString(),
                            pathNameEmpProfile: "",
                            orgDepartId: 0,
                            empAddress: String(this.empAddress).toString(),
                            emailAddress: String(this.empEmailAddr),
                        };
                        // Add New Organization Chart Root Level Info
                        this.serviceManageStructuresProject
                            ?.createStoreEmpOrg(
                                addNewOrgStrMgtPosDept
                                    ? addNewOrgStrMgtPosDept
                                    : []
                            )
                            .then(async (addOrgStr) => {
                                if (addOrgStr?.data.success === true) {
                                    this.$router.push(
                                        "/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module"
                                    );
                                    this.loadingAddNewEmp = false;
                                    this.$toast.add({
                                        severity: "success",
                                        summary:
                                            "Successfully add new root org-structure.",
                                        detail: addOrgStr.data?.message
                                            ? addOrgStr.data?.message
                                            : null,
                                        life: 3000,
                                    });
                                    // Clear Data Input
                                    this.orgStrBoardMgtEnglishName = "";
                                    this.orgStrBoardMgtKhmerName = "";
                                    this.descriptionOrgStrBoardMgt = "";
                                }
                            })
                            .catch((error) => {
                                this.loadingSubmittedAddMgtBoardStrOrg = false;
                                this.$toast.add({
                                    severity: "error",
                                    summary: "Please Fix Below Errors.",
                                    detail: error?.response.data.error?.message
                                        ? error?.response.data.error?.message
                                        : "Please input filed add new employee value!",
                                    life: 3000,
                                });
                                if (error?.response.data.error.error?.errors) {
                                    for (
                                        let index = 0;
                                        index <
                                        error.response.data.error.error?.errors
                                            .length;
                                        index++
                                    ) {
                                        const validationError =
                                            error.response.data.error.error
                                                ?.errors[index].message ?? [];
                                        this.$toast.add({
                                            severity: "error",
                                            summary: "Please Fix Below Errors.",
                                            detail: validationError
                                                ? validationError
                                                : "Please input add new employee have missing value!",
                                            life: 3000,
                                        });
                                    }
                                }
                        });
                    }

                    this.v$.$touch();
                    if (this.v$.$invalid) {
                        return false;
                    }
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
    },
};
</script>
