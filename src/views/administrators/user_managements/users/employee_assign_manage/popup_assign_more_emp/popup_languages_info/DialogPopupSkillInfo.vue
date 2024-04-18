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
            <div class="flex-wrap gap-3 p-fluid">
                <template class="grid formgrid py-2 px-2">
                    <!-- Skills Names -->
                    <div class="col-6 lg:col-6 field">
                        <div class="field">
                            <label
                                for="type_name"
                                class="text-sm font-semibold"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.skillNameEmp.$invalid && submitted,
                                }"
                            >
                                Skill
                                <span class="p-error">*</span>
                            </label>
                            <InputText
                                class="border-round-lg text-sm"
                                type="text"
                                v-model="v$.skillNameEmp.$model"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.skillNameEmp.$invalid && submitted,
                                }"
                                placeholder="Skill"
                            />
                            <small
                                v-if="
                                    (v$.skillNameEmp.$invalid && submitted) ||
                                    v$.skillNameEmp.$pending.$response
                                "
                                class="p-error text-sm"
                                >{{
                                    v$.skillNameEmp.required.$message.replace(
                                        "Value",
                                        "Skill"
                                    )
                                }}</small
                            >
                        </div>
                    </div>
                    <!-- Skill Levels -->
                    <div class="col-6 lg:col-6 field">
                        <div class="field">
                            <label
                                for="type_name"
                                class="text-sm font-semibold"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.skillLevelEmp.$invalid && submitted,
                                }"
                            >
                                Skill Level
                                <span class="p-error">*</span>
                            </label>
                            <el-slider
                                show-stops
                                :step="10"
                                :max="100"
                                v-model="v$.skillLevelEmp.$model"
                                :class="{
                                    'p-invalid border-round-lg p-error':
                                        v$.skillLevelEmp.$invalid && submitted,
                                }"
                                :min="10"
                                placeholder="Skill Level"
                            />
                            <small
                                v-if="
                                    (v$.skillLevelEmp.$invalid && submitted) ||
                                    v$.skillLevelEmp.$pending.$response
                                "
                                class="p-error text-sm"
                                >{{
                                    v$.skillLevelEmp.required.$message.replace(
                                        "Value",
                                        "Skill Level"
                                    )
                                }}</small
                            >
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
                @click.prevent="addNewSKillInfo(!v$.$invalid)"
                autofocus
                :loading="loadingBtnExp"
            />
        </template>
    </Dialog>
</template>
<!-- Script of Dialogs Infor -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required, numeric } from "@vuelidate/validators";
export default {
    components: {},
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            empExperienceNotes: "",
            skillNameEmp: "",
            skillLevelEmp: 0,
            loadingBtnExp: false,
            submitted: false,
        };
    },
    validations() {
        return {
            skillNameEmp: { required, minLength: minLength(3) },
            skillLevelEmp: { required, numeric },
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
        addNewSKillInfo() {
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
                        !this.skillNameEmp ||
                        this.skillNameEmp !== null ||
                        !this.skillNameEmp
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
