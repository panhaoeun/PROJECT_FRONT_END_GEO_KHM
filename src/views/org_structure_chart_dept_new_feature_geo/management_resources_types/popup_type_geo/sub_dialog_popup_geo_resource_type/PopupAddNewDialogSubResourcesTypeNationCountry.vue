<template>
    <Toast />
    <Dialog
        v-model:visible="openDialogs"
        modal
        header="Add New Sub Resources Types"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        maximizable
    >
        <!-- Header Icons-->
        <template #closeicon>
            <i class="pi pi-times" @click.prevent="close"></i>
        </template>
        <!-- Contents -->
        <div class="address-popup popup-top-auto z-100">
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div class="col-12 lg:col-12">
                    <div class="formgrid grid">
                        <!-- super-ssn-resource-id -->
                        <div class="col-6 lg:col-12 xl:col-12 field">
                            <div class="field">
                                <label>
                                    English Name
                                    <span class="p-error">*</span></label
                                >
                                <InputText
                                    class="border-round-lg text-sm"
                                    id="username"
                                    v-model="v$.addNewNameResourcesType.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.addNewNameResourcesType
                                                .$invalid && submitted,
                                    }"
                                    placeholder="Please enter a english name"
                                    aria-describedby="username-help"
                                />
                                <small
                                    v-if="
                                        (v$.addNewNameResourcesType.$invalid &&
                                            submitted) ||
                                        v$.addNewNameResourcesType.$pending
                                            .$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.addNewNameResourcesType.required.$message.replace(
                                            "Value",
                                            "Resources Type Name (English Name)"
                                        ) ||
                                        v$.addNewNameResourcesType.$params.min
                                    }}</small
                                >
                            </div>
                        </div>
                        <!-- Root Name Khmer -->
                        <div class="col-6 lg:col-12 xl:col-12 field">
                            <div class="field">
                                <label> Khmer Name </label>
                                <InputText
                                    class="border-round-lg text-sm"
                                    id="username"
                                    placeholder="Please enter a resource type khmer name"
                                    v-model="addNewEmpRootNodeKhmer"
                                    aria-describedby="username-help"
                                />
                            </div>
                        </div>
                        <!-- Description Root -->
                        <div class="col-12 lg:col-12 xl:col-12 field">
                            <div class="field">
                                <label> Descriptions</label>
                                <TextArea
                                    class="border-round-lg text-sm"
                                    v-model="descriptionDeptEmpRootNode"
                                    type="text"
                                    placeholder="Please enter a description"
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
                :label="loadingResourceType ? 'Add New' : 'Save'"
                class="w-10rem"
                severity="danger"
                outlined
                @click.prevent="
                    submittedResignNationalCountryResourcesType(!v$.$invalid)
                "
                autofocus
                :loading="loadingResourceType"
            />
            <Button
                label="Cancel"
                text
                class="w-7rem"
                severity="info"
                @click.prevent="close"
                autofocus
            />
        </template>
    </Dialog>
</template>

<!-- Script of org-structures national congress -->
<script>
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import manageOrgGeoResourcesTypeNationalCountryHelper from "@/mixin/manage_org_structure_dept_new_features/manage_resources_types/manageOrgGeoResourcesTypeNationalCountryHelper";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";

export default {
    setup: () => ({ v$: useVuelidate() }),
    validations() {
        return {
            addNewNameResourcesType: {
                required,
                minLength: minLength(3),
            },
        };
    },
    mixins: [
        manageOrgGeoResourcesTypeNationalCountryHelper,
        manageOrgStructureDeptNewFeatures,
    ],
    components: {},
    props: {
        dialog: {
            type: Boolean,
            required: true,
            default: false,
        },
        superSSNResourceSelectedId: {
            type: Number,
            required: true,
            default: () => 0,
        },
        nationalCountryId: {
            type: Number,
            required: true,
            default: () => 0,
        },
        typeCodeNationGeoFence: {
            type: String,
            required: true,
            default: () => "GL01",
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
            loadingResourceType: false,
            submitted: false,
            prepareObjEditOrgStrId: null,
            orgStrNameEditedId: null,
            descriptionDeptEmpRootNode: "",
            addNewEmpRootNodeKhmer: "",
            addNewNameResourcesType: "",
            statusAddNewRootNode: "",
            selectedParentDeptOrgStr: null,
            dataOrgDeptStrCompany: [],
            dialogAddNationalResourcesType: false,
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
