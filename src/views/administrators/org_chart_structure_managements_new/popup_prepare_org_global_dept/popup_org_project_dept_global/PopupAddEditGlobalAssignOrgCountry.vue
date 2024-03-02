<template>
    <div class="pl-2 gap-2 flex align-items-center justify-content-center">
        <!-- Button Group -->
        <div class="flex justify-content-center gap-1">
            <Button
                icon="pi pi-sitemap"
                severity="warning"
                label="Add"
                class="ajax-btn primary-btn outline-btn plr-20 mtb-5 border-round text-sm text-white"
                @click.prevent="openDialogsAddAssignOrgStr()"
            />
            <Button
                icon="pi pi-file-edit"
                severity="secondary"
                label="Edit"
                @click.prevent="openDialogsEditAddAssignOrgStr()"
                class="ajax-btn primary-btn outline-btn plr-20 mtb-5 border-round text-sm"
            />
        </div>
    </div>
    <!-- Dialogs for org-structure and positions -->
    <popup-add-new-org-structure-chart
        :dialog="dialogOpenOrgStrId"
        @close-dialog="closeDialogAssignOrgProject()"
        :org-structure-level="orgDeptLevel ? orgDeptLevel : ''"
        :org-structure-geo-id="orgDeptGeoFenceId ? orgDeptGeoFenceId : 0"
        :projectId="orgDeptProId ? orgDeptProId : 0"
        :orgStructureData="getAllBoardManagerOfProjectOrgStructureChart02"
    />
    <popup-edit-org-structure-chart
        :dialog="dialogEditOrgStrId"
        @close-dialog="closeDialogEditAssignOrgProject()"
    />
</template>
<!-- Script of popup assign org-projects -->
<script>
import PopupAddNewOrgStructureChart from "./PopupAddNewOrgStrChart";
import PopupEditOrgStructureChart from "./PopupEditOrgStrChartProject";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
export default {
    components: {
        PopupAddNewOrgStructureChart,
        PopupEditOrgStructureChart,
    },
    mixins: [manageOrgChartBoardMgtLevelHelper],
    props: {
        orgDeptLevel: {
            type: String,
            required: true,
            default: () => {},
        },
        orgDeptGeoFenceId: {
            type: Number,
            required: true,
            default: () => {},
        },
        orgDeptProId: {
            type: Number,
            required: true,
            default: () => {},
        },
    },
    data() {
        return {
            dialogOpenOrgStrId: false,
            dialogEditOrgStrId: false,
        };
    },
    created() {},
    methods: {
        closeDialogAssignOrgProject() {
            this.dialogOpenOrgStrId = false;
        },
        closeDialogEditAssignOrgProject() {
            this.dialogEditOrgStrId = false;
        },
        openDialogsAddAssignOrgStr() {
            this.dialogOpenOrgStrId = true;
        },
        openDialogsEditAddAssignOrgStr() {
            this.dialogEditOrgStrId = true;
        },
    },
};
</script>
