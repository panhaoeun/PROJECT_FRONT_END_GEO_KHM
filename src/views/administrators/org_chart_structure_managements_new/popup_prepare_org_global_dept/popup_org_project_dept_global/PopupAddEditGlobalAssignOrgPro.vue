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
    />
    <popup-edit-org-structure-chart
        :dialog="dialogEditOrgStrId"
        @close-dialog="closeDialogEditAssignOrgProject()"
    />
</template>
<!-- Script of popup assign org-projects -->
<script>
import PopupAddNewOrgStructureChart from "./PopupAddNewOrgStrChart";
import PopupEditOrgStructureChart from "./PopupEditOrgStrChartProject.vue";
export default {
    components: {
        PopupAddNewOrgStructureChart,
        PopupEditOrgStructureChart,
    },
    props: {},
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
            this.dialogOpenOrgStrId = false;
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
