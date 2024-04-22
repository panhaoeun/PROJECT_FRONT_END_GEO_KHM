<!-- eslint-disable vue/no-mutating-props -->
<template>
    <Toast />
    <Dialog
        v-model:visible="openDialogNewPosition"
        modal
        :header="
            'Add New Dept. Org Job Descriptions:' + '\n   ' + departmentName
        "
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
                                    v-model="
                                        v$.addJobDeptNameEngProjectOrgStr.$model
                                    "
                                    :class="{
                                        'p-invalid p-error':
                                            v$.addJobDeptNameEngProjectOrgStr
                                                .$invalid && submitted,
                                    }"
                                />
                                <small
                                    v-if="
                                        (v$.addJobDeptNameEngProjectOrgStr
                                            .$invalid &&
                                            submitted) ||
                                        v$.addJobDeptNameEngProjectOrgStr
                                            .$pending.$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.addJobDeptNameEngProjectOrgStr.required.$message.replace(
                                            "Value",
                                            "English Name"
                                        ) ||
                                        v$.addJobDeptNameEngProjectOrgStr
                                            .$params.min
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
                                    v-model="addJobDeptNameKhmerProjectOrgStr"
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
                                    v-model="addJobDeptDescriptionProjectOrgStr"
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
                :label="loadingBtnEdit ? 'Confirm Add' : 'Position'"
                class="w-15rem text-sm"
                severity="primary"
                raised
                outlined
                @click.prevent="handleEditJobDescriptionsSubmit(!v$.$invalid)"
                autofocus
                :loading="loadingBtnEdit"
            />
        </template>
    </Dialog>
</template>
<!-- Script of Dialogs Infor -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
export default {
    setup() {
        return { v$: useVuelidate() };
    },
    mixins: [managerJobPositionOrgStructureProjectLevelZeroHelper],
    data() {
        return {
            count: 0,
            option: {
                penColor: "rgb(0, 0, 0)",
                backgroundColor: "rgb(255,255,255)",
            },
            disabled: false,
            addJobDeptNameEngProjectOrgStr: "",
            addJobDeptNameKhmerProjectOrgStr: "",
            addJobDeptDescriptionProjectOrgStr: "",
            loadingBtnEdit: false,
            addJobDescType: "Department",
        };
    },
    validations() {
        return {
            addJobDeptNameEngProjectOrgStr: {
                required,
                minLength: minLength(3),
            },
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
        orgStrNameEditedId: {
            type: Object,
            required: true,
            default: () => {},
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
