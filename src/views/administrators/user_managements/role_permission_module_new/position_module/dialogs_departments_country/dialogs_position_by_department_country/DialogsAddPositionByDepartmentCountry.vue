<template>
    <!--Define Position of Hierarchy -->
    <div class="gap-2 flex align-items-center justify-content-center my-2">
        <Button
            aria-label="Add Positions"
            class="border-round-lg w-15rem h-2.1rem"
            icon="pi pi-plus"
            outlined
            @click="openDialogAddPositionByOrgDept()"
            label="Add Positions"
        />
    </div>
    <!-- Dialogs Positions Department-->
    <Dialog
        v-model:visible="visibleDialogModelDeptOrg"
        modal
        header="Add New Positions"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :draggable="false"
        maximizable
        :pt="{
            mask: {
                style: 'backdrop-filter: blur(2px)',
            },
        }"
    >
        <!-- Add Form Dialogs Positions -->
        <form id="addFormPositionsDepartment">
            <div class="flex-wrap gap-3 p-fluid">
                <div class="grid formgrid">
                    <div class="col-6 field">
                        <div class="field">
                            <label for="proKh" class="text-sm">
                                Department
                                <span class="p-error">*</span>
                            </label>
                            <Dropdown
                                v-model="v$.selectedDeptOrgCountry.$model"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                    v$.selectedDeptOrgCountry.$invalid &&
                                    submitted
                                }"
                                class="w-full border-round-lg text-sm"
                                editable
                                :options="optionsDeptObjOrgSL"
                                optionLabel="name"
                                placeholder="Select a Department"
                                aria-describedby="dd-error"
                            />
                            <small
                                v-if="
                                    (v$.selectedDeptOrgCountry.$invalid &&
                                        submitted) ||
                                    v$.selectedDeptOrgCountry.$pending.$response
                                "
                                class="p-error"
                            >
                                {{
                                    v$.selectedDeptOrgCountry.required.$message.replace(
                                        "Value",
                                        "Department"
                                    )
                                }}
                            </small>
                        </div>
                    </div>
                    <div class="col-6 field">
                        <div class="field">
                            <label for="labelName" class="text-sm">
                                Name
                                <span class="p-error">*</span>
                            </label>
                            <InputText
                                id="position_name"
                                placeholder="Position Name"
                                type="text"
                                class="py-2 border-round-lg text-sm"
                                v-model="v$.orgDeptPositionName.$model"
                                :class="{
                                    'p-invalid p-error':
                                        v$.orgDeptPositionName.$invalid &&
                                        submitted,
                                }"
                            />
                            <small
                                v-if="
                                    (v$.orgDeptPositionName.$invalid &&
                                        submitted) ||
                                    v$.orgDeptPositionName.$pending.$response
                                "
                                class="p-error"
                            >
                                {{
                                    v$.orgDeptPositionName.required.$message.replace(
                                        "Value",
                                        "Position Name"
                                    ) || v$.orgDeptPositionName.$params.min
                                }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <!-- Footer Add New -->
        <template #footer>
            <Button
                label="No"
                icon="pi pi-times"
                @click="closeDialogAddPostDeptOrg()"
                text
            />
            <Button
                :label="loadingDeptOrgBtn ? 'Save...' : 'Create'"
                class="w-7rem"
                severity="info"
                icon="pi pi-file-import"
                autofocus
                :loading="loadingDeptOrgBtn"
                @click.prevent="
                    handleSubmittedNewPositionByDeptOrgCountry(!v$.$invalid)
                "
            />
        </template>
    </Dialog>
</template>

<!-- Script of add dialog position departments -->
<script>
import useSubmitButtonState from "@/modules/useSubmitButtonState";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
    name: "DialogAddByPositionsCountry",
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            visibleDialogModelDeptOrg: false,
            loadingDeptOrgBtn: false,
            submitted: false,
            optionsDeptObjOrgSL: [],
            // Form Submitted
            orgDeptPositionName: "",
            selectedDeptOrgCountry: false,
        };
    },
    //Validations
    validations() {
        return {
            selectedDeptOrgCountry: {
                required,
            },
            orgDeptPositionName: {
                required,
                minLength: minLength(3),
            },
        };
    },
    computed: {
        disabledBtnAdd() {
            const { isSubmitButtonDisabled } = useSubmitButtonState(this.$data);
            return isSubmitButtonDisabled;
        },
    },
    methods: {
        openDialogAddPositionByOrgDept() {
            this.visibleDialogModelDeptOrg = true;
        },
        closeDialogAddPostDeptOrg() {
            this.visibleDialogModelDeptOrg = false;
        },
        handleSubmittedNewPositionByDeptOrgCountry(validations) {
            this.loadingDeptOrgBtn = true;
            setTimeout(() => {
                this.loadingDeptOrgBtn = false;
                this.submitted = true;
                if (!validations) {
                    return;
                }
            }, 1000);
        },
    },
};
</script>
