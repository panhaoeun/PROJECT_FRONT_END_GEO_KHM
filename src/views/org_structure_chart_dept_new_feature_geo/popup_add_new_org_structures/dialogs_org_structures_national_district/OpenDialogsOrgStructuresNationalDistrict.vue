<template>
    <Toast />
    <div>
        <Dialog
            v-model:visible="openDialogs"
            modal
            header="Add Org Chart District Structure"
            :style="{ width: '30rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            maximizable
        >
            <!-- Header Icons-->
            <template #closeicon>
                <i class="pi pi-times" @click.prevent="close"></i>
            </template>
            <!-- Contents -->
            <div class="address-popup popup-top-auto z-100">
                <!-- Optional Selected Root -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Parent department </label>
                        <TreeSelect
                            v-model="selectedParentDeptOrgStrDistrict"
                            :options="treeOrgStructureDeptNational"
                            placeholder="Parent department"
                            class="border-round-lg text-sm w-27rem"
                        />
                        <small>Please select the parent department.</small>
                    </div>
                </div>
                <!-- Root Name English -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label>
                            Root Name (English Name)
                            <span class="p-error">*</span></label
                        >
                        <InputText
                            class="border-round-lg text-sm w-27rem"
                            id="username"
                            v-model="v$.addNewEmpRootNodeEng.$model"
                            :class="{
                                'p-invalid p-error':
                                    v$.addNewEmpRootNodeEng.$invalid &&
                                    submitted,
                            }"
                            placeholder="Please enter a root node name for english name"
                            aria-describedby="username-help"
                        />
                        <small
                            v-if="
                                (v$.addNewEmpRootNodeEng.$invalid &&
                                    submitted) ||
                                v$.addNewEmpRootNodeEng.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.addNewEmpRootNodeEng.required.$message.replace(
                                    "Value",
                                    "Root Name (English Name)"
                                ) || v$.addNewEmpRootNodeEng.$params.min
                            }}</small
                        >
                    </div>
                </div>
                <!-- Root Name Khmer -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Root Name (Khmer Name) </label>
                        <InputText
                            class="border-round-lg text-sm w-27rem"
                            id="username"
                            placeholder="Please enter a root node name for khmer name"
                            v-model="addNewEmpRootNodeKhmer"
                            aria-describedby="username-help"
                        />
                    </div>
                </div>
                <!-- Description Root -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Descriptions</label>
                        <TextArea
                            class="border-round-lg text-sm w-27rem"
                            v-model="descriptionDeptEmpRootNode"
                            type="text"
                            placeholder="Please enter a description"
                        />
                    </div>
                </div>
            </div>
            <!-- Footers -->
            <template #footer>
                <Button
                    :label="loadingBtnOrgCompany ? 'Add New' : 'Save'"
                    class="w-10rem"
                    severity="primary"
                    raised
                    @click.prevent="
                        submittedAddDialogsNationCongress(!v$.$invalid)
                    "
                    autofocus
                    :loading="loadingBtnOrgCompany"
                />
                <Button
                    label="Cancel"
                    text
                    class="w-7rem"
                    severity="secondary"
                    @click.prevent="close"
                    autofocus
                />
            </template>
        </Dialog>
    </div>
</template>

<!-- Script of org-structures national congress -->
<script>
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import manageOrgDeptOrgStrNationalDistrictsHelper from "@/mixin/manage_org_structure_dept_new_features/org_dept_structure_dialogs/manageOrgDeptOrgStrNationalDistrictsHelper";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";

export default {
    setup: () => ({ v$: useVuelidate() }),
    validations() {
        return {
            addNewEmpRootNodeEng: {
                required,
                minLength: minLength(3),
            },
        };
    },
    mixins: [
        manageOrgDeptOrgStrNationalDistrictsHelper,
        manageOrgStructureDeptNewFeatures,
    ],
    components: {},
    props: {
        dialog: {
            type: Boolean,
            required: true,
            default: false,
        },
        treeOrgStructureDeptNational: {
            type: Object,
            required: true,
            default: () => {},
        },
        companyId: {
            type: Number,
            required: true,
            default: () => 0,
        },
        getCountryNationId: {
            type: Number,
            required: true,
            default: () => 0,
        },
    },
    computed: {
        openDialogs() {
            return this.dialog ? this.dialog : false;
        },
        getIdEditOrgStructure() {
            const getObjData = this.getEditObjName ? this.getEditObjName : null;
            if (
                (getObjData !== null && typeof getObjData !== "object") ||
                getObjData !== undefined
            ) {
                return getObjData;
            }
            return {};
        },
    },
    data() {
        return {
            loadingBtnOrgCompany: false,
            submitted: false,
            prepareObjEditOrgStrId: null,
            orgStrNameEditedId: null,
            descriptionDeptEmpRootNode: "",
            addNewEmpRootNodeKhmer: "",
            addNewEmpRootNodeEng: "",
            statusAddNewRootNode: "nodeRoot",
            selectedParentDeptOrgStr: null,
            dataOrgDeptStrCompany: [],
        };
    },
    created() {},
    methods: {
        close() {
            this.$emit("close-dialog");
        },
    },
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
