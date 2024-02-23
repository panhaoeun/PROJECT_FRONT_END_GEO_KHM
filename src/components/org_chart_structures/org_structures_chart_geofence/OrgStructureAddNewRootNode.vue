<template>
    <div>
        <Dialog
            v-model:visible="openDialogsRootNode"
            modal
            header="Add New Root Node"
            :style="{ width: '30rem' }"
            maximizable
        >
            <!-- Contents -->
            <div class="address-popup popup-top-auto z-100">
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
                    label="Cancel"
                    text
                    class="w-7rem"
                    severity="secondary"
                    @click.prevent="closeAddRoot"
                    autofocus
                />
                <Button
                    :label="loadingBtnRootNode ? 'Add New' : 'Save'"
                    class="w-10rem"
                    severity="info"
                    raised
                    @click.prevent="addRootNodeOrgStructure(!v$.$invalid)"
                    autofocus
                    :loading="loadingBtnRootNode"
                />
            </template>
        </Dialog>
    </div>
</template>

<!-- Popup Add New Root Level Org-Structure-->
<script>
import managerOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageOrgStructureChartProjectLevelZeroHelper";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
    setup: () => ({ v$: useVuelidate() }),
    props: {
        editedId: Number,
        dialog: {
            type: Boolean,
            default: false,
            required: true,
        },
        orgStructureLevel: {
            type: String,
            required: true,
            default: () => {},
        },
        orgStructureGeoId: {
            type: Number,
            required: true,
            default: () => {},
        },
        rootNodeProId: {
            type: Number,
            required: true,
            default: () => {},
        },
    },
    computed: {
        openDialogsRootNode() {
            return this.dialog || false;
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
            loadingBtnRootNode: false,
            activeDialogPositionId: 0,
            editingItem: {},
            editingNode: null,
            getNodeModel: null,
            visibleDialogsOrgStr: false,
            getEditObjName: null,
            prepareObjEditOrgStrId: null,
            orgStrNameEditedId: null,
            descriptionDeptEmpRootNode: null,
            addNewEmpRootNodeKhmer: null,
            addNewEmpRootNodeEng: null,
            statusAddNewRootNode: 'nodeRoot',
        };
    },
    validations() {
        return {
            addNewEmpRootNodeEng: {
                required,
                minLength: minLength(3),
            },
        };
    },
    mixins: [
        managerOrgStructureProjectLevelZeroHelper,
        manageOrgChartBoardMgtLevelHelper,
    ],
    methods: {
        closeAddRoot() {
            this.$emit("close-dialog");
        },
    },
};
</script>
