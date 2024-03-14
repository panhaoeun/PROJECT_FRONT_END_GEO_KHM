<template>
    <Toast />
    <div>
        <Dialog
            v-model:visible="openDialogs"
            modal
            header="Add Node Org Chart Structure"
            :style="{ width: '33rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            maximizable
        >
            <!-- Header Icons-->
            <template #closeicon>
                <i class="pi pi-times" @click.prevent="close"></i>
            </template>
            <!-- Contents -->
            <div class="address-popup popup-top-auto z-100">
                <!-- Root Name English -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label>
                            Root Name (English Name)
                            <span class="p-error">*</span></label
                        >
                        <InputText
                            class="border-round-lg text-sm w-30rem"
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
                            class="border-round-lg text-sm w-30rem"
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
                            class="border-round-lg text-sm w-30rem"
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
                    :label="loadingBtnOrgAddNode ? 'Save...' : 'Add Node'"
                    class="w-10rem"
                    severity="danger"
                    raised
                    @click.prevent="
                        submittedAddDialogsAddNodeOrgStructuresSubChild(
                            !v$.$invalid
                        )
                    "
                    autofocus
                    :loading="loadingBtnOrgAddNode"
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

<!-- Script of org-structures node hierarchy globals -->
<script>
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import manageOrgNodeSubChildStructuresDeptHelper from "@/mixin/manage_org_structure_dept_new_features/manageOrgNodeSubChildStructuresDeptHelper";
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
        manageOrgNodeSubChildStructuresDeptHelper,
        manageOrgStructureDeptNewFeatures,
    ],
    components: {},
    props: {
        dialog: {
            type: Boolean,
            required: true,
            default: false,
        },
        treeOrgStructureData: {
            type: Object,
            required: true,
            default: () => {},
        },
        orgDeptKey: {
            type: String,
            required: true,
            default: () => null,
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
            loadingBtnOrgAddNode: false,
            submitted: false,
            prepareObjEditOrgStrId: null,
            orgStrNameEditedId: null,
            descriptionDeptEmpRootNode: "",
            addNewEmpRootNodeKhmer: "",
            addNewEmpRootNodeEng: "",
            statusAddNewRootNode: "nodeRoot",
            selectedParentDeptOrgStr: null,
            dataOrgDeptStrCompany: [],
            treeOrgChartNodeAssignSubNode: null,
        };
    },
    created() {},
    methods: {
        close() {
            this.$emit("close-dialog");
        },
    },
    mounted() {
        if (this.treeOrgStructureData) {
            this.treeOrgChartNodeAssignSubNode = {
                ...this.treeOrgChartNodeAssignSubNode,
                ...this.treeOrgStructureData,
            };
        } else {
            this.treeOrgChartNodeAssignSubNode = {
                id: 0,
                key: "",
                deptOrgStrId: 0,
                department: "",
                departmentKH: "",
                descriptionNoted: "",
            };
        }
    },
};
</script>
