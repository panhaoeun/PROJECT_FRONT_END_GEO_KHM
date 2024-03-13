<!-- eslint-disable vue/no-mutating-props -->
<template>
    <Dialog
        v-model:visible="openDialogsAddExperience"
        modal
        header="Create new experience"
        :style="{ width: '60rem' }"
        maximizable
    >
        <Toast />
        <!-- Headers of Exp-Info -->
        <template #closeicon>
            <i class="pi pi-times" @click.prevent="closeExpAddNew"></i>
        </template>
        <div class="m-0 p-0">
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <template class="grid formgrid py-2 px-2">
                    <!-- Types -->
                    <div class="col-4 lg:col-6 field">
                        <div class="field">
                            <label
                                for="type_name"
                                class="text-sm font-semibold"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empTypeName.$invalid && submitted,
                                }"
                            >
                                Type
                                <span class="p-error">*</span>
                            </label>
                            <InputText
                                class="border-round-lg text-sm"
                                type="text"
                                v-model="v$.empTypeName.$model"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empTypeName.$invalid && submitted,
                                }"
                                placeholder="Type"
                            />
                            <small
                                v-if="
                                    (v$.empTypeName.$invalid && submitted) ||
                                    v$.empTypeName.$pending.$response
                                "
                                class="p-error text-sm"
                                >{{
                                    v$.empTypeName.required.$message.replace(
                                        "Value",
                                        "Type Name"
                                    )
                                }}</small
                            >
                        </div>
                    </div>
                    <!-- Position Name -->
                    <div class="col-4 lg:col-6 field">
                        <div class="field">
                            <label
                                for="type_name"
                                class="text-sm font-semibold"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperiencePosName.$invalid &&
                                        submitted,
                                }"
                            >
                                Position
                                <span class="p-error">*</span>
                            </label>
                            <InputText
                                class="border-round-lg text-sm"
                                type="text"
                                v-model="v$.empExperiencePosName.$model"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperiencePosName.$invalid &&
                                        submitted,
                                }"
                                placeholder="Software Developments"
                            />
                            <small
                                v-if="
                                    (v$.empExperiencePosName.$invalid &&
                                        submitted) ||
                                    v$.empExperiencePosName.$pending.$response
                                "
                                class="p-error text-sm"
                                >{{
                                    v$.empExperiencePosName.required.$message.replace(
                                        "Value",
                                        "Position Name"
                                    )
                                }}</small
                            >
                        </div>
                    </div>
                    <!-- Company/Ministry -->
                    <div class="col-4 lg:col-6 field">
                        <div class="field">
                            <label
                                for="type_name"
                                class="text-sm font-semibold"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperienceCompany.$invalid &&
                                        submitted,
                                }"
                            >
                                Company/Ministry
                                <span class="p-error">*</span>
                            </label>
                            <InputText
                                class="border-round-lg text-sm"
                                type="text"
                                v-model="v$.empExperienceCompany.$model"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperienceCompany.$invalid &&
                                        submitted,
                                }"
                                placeholder="C.A.I.T Co.ltd"
                            />
                            <small
                                v-if="
                                    (v$.empExperienceCompany.$invalid &&
                                        submitted) ||
                                    v$.empExperienceCompany.$pending.$response
                                "
                                class="p-error text-sm"
                                >{{
                                    v$.empExperienceCompany.required.$message.replace(
                                        "Value",
                                        "Company/Ministry"
                                    )
                                }}</small
                            >
                        </div>
                    </div>
                    <!-- Employee Type-->
                    <div class="col-4 lg:col-6 field">
                        <div class="field">
                            <label
                                for="employee_type"
                                class="text-sm font-semibold"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperienceTypeGeo.$invalid &&
                                        submitted,
                                }"
                            >
                                Employee Type
                                <span class="p-error">*</span>
                            </label>
                            <InputText
                                class="border-round-lg text-sm"
                                type="text"
                                v-model="v$.empExperienceTypeGeo.$model"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperienceTypeGeo.$invalid &&
                                        submitted,
                                }"
                                placeholder="Full Time"
                            />
                            <small
                                v-if="
                                    (v$.empExperienceTypeGeo.$invalid &&
                                        submitted) ||
                                    v$.empExperienceTypeGeo.$pending.$response
                                "
                                class="p-error text-sm"
                                >{{
                                    v$.empExperienceTypeGeo.required.$message.replace(
                                        "Value",
                                        "Employee Type"
                                    )
                                }}</small
                            >
                        </div>
                    </div>
                    <!-- Address-->
                    <div class="col-4 lg:col-6 field">
                        <div class="field">
                            <label
                                for="employee_type"
                                class="text-sm font-semibold"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperienceAddr.$invalid &&
                                        submitted,
                                }"
                            >
                                Address
                                <span class="p-error">*</span>
                            </label>
                            <InputText
                                class="border-round-lg text-sm"
                                type="text"
                                v-model="v$.empExperienceAddr.$model"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperienceAddr.$invalid &&
                                        submitted,
                                }"
                                placeholder="Address"
                            />
                            <small
                                v-if="
                                    (v$.empExperienceAddr.$invalid &&
                                        submitted) ||
                                    v$.empExperienceAddr.$pending.$response
                                "
                                class="p-error text-sm"
                                >{{
                                    v$.empExperienceAddr.required.$message.replace(
                                        "Value",
                                        "Address"
                                    )
                                }}</small
                            >
                        </div>
                    </div>
                    <!-- Start Date-->
                    <div class="col-4 lg:col-6 field">
                        <div class="field">
                            <label
                                for="employee_type"
                                class="text-sm font-semibold"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperienceStartDate.$invalid &&
                                        submitted,
                                }"
                            >
                                Start Date
                                <span class="p-error">*</span>
                            </label>
                            <Calendar
                                showIcon
                                :showOnFocus="true"
                                class="border-round-lg text-sm"
                                type="text"
                                v-model="v$.empExperienceStartDate.$model"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperienceStartDate.$invalid &&
                                        submitted,
                                }"
                                placeholder="Start Date"
                            />
                            <small
                                v-if="
                                    (v$.empExperienceStartDate.$invalid &&
                                        submitted) ||
                                    v$.empExperienceStartDate.$pending.$response
                                "
                                class="p-error text-sm"
                                >{{
                                    v$.empExperienceStartDate.required.$message.replace(
                                        "Value",
                                        "Start Date"
                                    )
                                }}</small
                            >
                        </div>
                    </div>
                    <!-- End Date-->
                    <div class="col-4 lg:col-6 field">
                        <div class="field">
                            <label
                                for="employee_type"
                                class="text-sm font-semibold"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperienceEndDate.$invalid &&
                                        submitted,
                                }"
                            >
                                End Date
                                <span class="p-error">*</span>
                            </label>
                            <Calendar
                                showIcon
                                :showOnFocus="true"
                                class="border-round-lg text-sm"
                                type="text"
                                v-model="v$.empExperienceEndDate.$model"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.empExperienceEndDate.$invalid &&
                                        submitted,
                                }"
                                placeholder="End Date"
                            />
                            <small
                                v-if="
                                    (v$.empExperienceEndDate.$invalid &&
                                        submitted) ||
                                    v$.empExperienceEndDate.$pending.$response
                                "
                                class="p-error text-sm"
                                >{{
                                    v$.empExperienceEndDate.required.$message.replace(
                                        "Value",
                                        "End Date"
                                    )
                                }}</small
                            >
                        </div>
                    </div>
                    <!-- Descriptions-->
                    <div class="col-12 lg:col-12 field">
                        <div class="field">
                            <label
                                for="descriptions"
                                class="text-sm font-semibold"
                            >
                                Description
                            </label>
                            <Textarea
                                class="border-round-lg text-sm"
                                type="text"
                                v-model="empExperienceNotes"
                                placeholder="Descriptions"
                            />
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <!-- Footers -->
        <template #footer>
            <Button
                label="Cancel"
                text
                class="w-7rem"
                severity="secondary"
                @click.prevent="closeExpAddNew"
                autofocus
            />
            <Button
                :label="loadingBtnExp ? 'Add New' : 'Save'"
                class="w-10rem"
                severity="info"
                raised
                @click.prevent="addNewExperienceInfo(!v$.$invalid)"
                autofocus
                :loading="loadingBtnExp"
            />
        </template>
    </Dialog>
</template>
<!-- Script of Dialogs Infor -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
export default {
    components: {},
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            empExperienceNotes: "",
            empTypeName: "",
            empExperiencePosName: "",
            empExperienceCompany: "",
            empTypeGeo: "",
            empExperienceTypeGeo: "",
            empExperienceAddr: "",
            empExperienceStartDate: "",
            empExperienceEndDate: "",
            loadingBtnExp: false,
            submitted: false,
        };
    },
    validations() {
        return {
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
    props: {
        dialogAddExperience: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    computed: {
        openDialogsAddExperience() {
            return this.dialogAddExperience || false;
        },
    },
    methods: {
        closeExpAddNew() {
            this.$emit("close-dialog");
        },
        addNewExperienceInfo() {
            try {
                this.loadingBtnExp = true;
                this.submitted = true;

                setTimeout(async () => {
                    this.loadingBtnExp = false;
                    this.v$.$touch();
                    if (this.v$.$invalid) {
                        return false;
                    }
                    /**
                     * @Validations
                     * */
                    if (
                        !this.empTypeName ||
                        this.empTypeName !== null ||
                        !this.empTypeName
                    ) {
                        const validation = await this.v$.$validate();
                        if (validation === false) {
                            const errorValidation = this.v$.$errors;
                            this.$notify.error({
                                title: "Please input filed in required",
                                message: errorValidation[0]?.$message
                                    ? errorValidation[0]?.$message
                                    : "",
                                showClose: true,
                            });
                        }
                    } else {
                        if (this.v$.$invalid === true) {
                            this.$toast.add({
                                severity: "error",
                                summary: "Error",
                                detail: "Please fill all required fields",
                                life: 3000,
                            });
                        }
                    }
                    // this.serviceManageStructuresProject
                    // const addNewOrgStrMgtPosDept = {
                    //     empNameEng: String(this.empSurname).toString(),
                    //     empNameKh: String(this.empFirstName).toString(),
                    //     empGender: this.selectedUserGender?.name,
                    //     empDOB: this.userDateOfBirth,
                    //     empStatus: "Approved",
                    //     empType: "Admin",
                    //     empStartDate: "",
                    //     empNoted: String(this.empDescription).toString(),
                    //     pathNameEmpProfile: "",
                    //     orgDepartId: "",
                    //     empAddress: String(this.empAddress).toString(),
                    //     emailAddress: String(this.empEmailAddr),
                    // };
                    // console.log(addNewOrgStrMgtPosDept);
                    // // Add New Organization Chart Root Level Info
                    // this.serviceManageStructuresProject
                    //     ?.createStoreEmpOrg(
                    //         addNewOrgStrMgtPosDept ? addNewOrgStrMgtPosDept : []
                    //     )
                    //     .then(async (addOrgStr) => {
                    //         if (addOrgStr?.data.success === true) {
                    //             this.$router.push(
                    //                 "/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module"
                    //             );
                    //             this.loadingAddNewEmp = false;
                    //             this.$toast.add({
                    //                 severity: "success",
                    //                 summary:
                    //                     "Successfully add new root org-structure.",
                    //                 detail: addOrgStr.data?.message
                    //                     ? addOrgStr.data?.message
                    //                     : null,
                    //                 life: 3000,
                    //             });
                    //             // Clear Data Input
                    //             this.orgStrBoardMgtEnglishName = "";
                    //             this.orgStrBoardMgtKhmerName = "";
                    //             this.descriptionOrgStrBoardMgt = "";
                    //         }
                    //     })
                    //     .catch((error) => {
                    //         this.loadingSubmittedAddMgtBoardStrOrg = false;
                    //         this.$toast.add({
                    //             severity: "error",
                    //             summary: "Please Fix Below Errors.",
                    //             detail: error?.response.data.error?.message
                    //                 ? error?.response.data.error?.message
                    //                 : "Please input filed add new employee value!",
                    //             life: 3000,
                    //         });
                    //         if (error?.response.data.error.error?.errors) {
                    //             for (
                    //                 let index = 0;
                    //                 index <
                    //                 error.response.data.error.error?.errors
                    //                     .length;
                    //                 index++
                    //             ) {
                    //                 const validationError =
                    //                     error.response.data.error.error?.errors[
                    //                         index
                    //                     ].message ?? [];
                    //                 this.$toast.add({
                    //                     severity: "error",
                    //                     summary: "Please Fix Below Errors.",
                    //                     detail: validationError
                    //                         ? validationError
                    //                         : "Please input add new employee have missing value!",
                    //                     life: 3000,
                    //                 });
                    //             }
                    //         }
                    //     });
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
    },
};
</script>
