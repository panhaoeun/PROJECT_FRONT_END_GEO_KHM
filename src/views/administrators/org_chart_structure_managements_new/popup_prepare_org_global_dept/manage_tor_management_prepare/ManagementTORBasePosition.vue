<template>
    <Toast />
    <div>
        <Dialog
            v-model:visible="openDialogs"
            modal
            header="Terms of Reference for Position"
            :style="{ width: '60rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            maximizable
        >
            <!-- Contents -->
            <div class="address-popup popup-top-auto z-100">
                <div class="flex start mlr--5 grid grid-nogutter">dsadasd</div>
            </div>
            <!-- Footers -->
            <template #footer>
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

<!-- Popup Edit Org-Structure-->
<script>
// Functions Toggle the global organization structure tree view component
import managerOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageOrgStructureChartProjectLevelZeroHelper";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
import managerPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/managePositionOrgStructureChartProjectLevelZeroHelper";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
export default {
    components: {},
    props: {
        editedId: Number,
        dialog: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    mixins: [
        managerOrgStructureProjectLevelZeroHelper,
        manageOrgChartBoardMgtLevelHelper,
        managerPositionOrgStructureProjectLevelZeroHelper,
        managerJobPositionOrgStructureProjectLevelZeroHelper,
    ],
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
    methods: {
        close() {
            this.$emit("close-dialog");
        },
    },
};
</script>
