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
                class="ajax-btn primary-btn outline-btn plr-20 mtb-5 border-round text-sm"
            />
        </div>
    </div>
    <!-- Dialogs for org-structure and positions -->
    <popup-add-new-org-structure-chart
        :dialog="dialogOpenOrgStrId"
        @close-dialog="closeDialogAssignOrgProject()"
    />
</template>
<!-- Script of popup assign org-projects -->
<script>
import PopupAddNewOrgStructureChart from "./PopupAddNewOrgStrChart";
export default {
    components: {
        PopupAddNewOrgStructureChart,
    },
    props: {},
    data() {
        return {
            dialogOpenOrgStrId: false,
        };
    },
    created() {},
    methods: {
        closeDialogAssignOrgProject() {
            this.dialogOpenOrgStrId = false;
        },
        openDialogsAddAssignOrgStr() {
            this.dialogOpenOrgStrId = true;
        },
    },
};
</script>
