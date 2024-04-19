<!-- eslint-disable vue/no-mutating-props -->
<template>
    <Toast />
    <Dialog
        v-model:visible="openDialogNewPosition"
        modal
        :header="'Add New Position:' + '\n   ' + departmentName"
        :style="{ width: '60rem' }"
        maximizable
    >
        <Toast />
        <!-- Headers of Exp-Info -->
        <template #closeicon>
            <i
                class="pi pi-times"
                @click.prevent="closeDialogAddNewPosition"
            ></i>
        </template>
        <div class="m-0 p-0">
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div class="col-12 lg:col-12">
                    <div class="grid formgrid">
                        <!-- Position English Name: -->
                        <div class="col-6 field">
                            <div class="field">
                                <label for="resignation_date" class="text-sm"
                                    >English Name<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <InputText
                                    id="resignation_date"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="Please enter english name of position"
                                    class="border-round-lg text-sm"
                                    v-model="v$.positionEnglishName.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.positionEnglishName.$invalid &&
                                            submitted,
                                    }"
                                />
                                <small
                                    v-if="
                                        (v$.positionEnglishName.$invalid &&
                                            submitted) ||
                                        v$.positionEnglishName.$pending
                                            .$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.positionEnglishName.required.$message.replace(
                                            "Value",
                                            "English Name"
                                        ) || v$.positionEnglishName.$params.min
                                    }}</small
                                >
                            </div>
                        </div>
                        <!-- Position Khmer Name: -->
                        <div class="col-6 field">
                            <div class="field">
                                <label for="resignation_date" class="text-sm"
                                    >Khmer Name</label
                                >
                                <InputText
                                    id="resignation_date"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="Please enter khmer name of position"
                                    class="border-round-lg text-sm"
                                    v-model="positionKhmerName"
                                />
                            </div>
                        </div>
                        <!-- Comments -->
                        <div class="col-12 field">
                            <div class="field">
                                <label
                                    for="resignation_resign_noted"
                                    class="text-sm"
                                    >Descriptions</label
                                >
                                <Editor
                                    id="noted_comment"
                                    showIcon
                                    :showOnFocus="false"
                                    placeholder="Please enter descriptions"
                                    class="border-round-lg text-sm"
                                    v-model="positionDataEditorHTML"
                                    editorStyle="height: 320px"
                                />
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
                @click.prevent="closeDialogAddNewPosition"
                autofocus
            />
            <Button
                :label="loadingBtnPositionBtn ? 'Confirm Add' : 'Position'"
                class="w-15rem text-sm"
                severity="primary"
                raised
                outlined
                @click.prevent="resignAddFormRequestEmployee(!v$.$invalid)"
                autofocus
                :loading="loadingBtnPositionBtn"
            />
        </template>
    </Dialog>
</template>
<!-- Script of Dialogs Infor -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";
export default {
    setup() {
        return { v$: useVuelidate() };
    },
    mixins: [manageOrgDeptPositionStructuresHelper],
    data() {
        return {
            count: 0,
            option: {
                penColor: "rgb(0, 0, 0)",
                backgroundColor: "rgb(255,255,255)",
            },
            disabled: false,
            positionEnglishName: "",
            positionKhmerName: "",
            positionDataEditorHTML: "",
            loadingBtnPositionBtn: false,
        };
    },
    validations() {
        return {
            positionEnglishName: { required, minLength: minLength(3) },
        };
    },
    props: {
        dialogPositionForm: {
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
        openDialogNewPosition() {
            return this.dialogPositionForm || false;
        },
    },
    methods: {
        closeDialogAddNewPosition() {
            this.$emit("close");
        },
    },
};
</script>
