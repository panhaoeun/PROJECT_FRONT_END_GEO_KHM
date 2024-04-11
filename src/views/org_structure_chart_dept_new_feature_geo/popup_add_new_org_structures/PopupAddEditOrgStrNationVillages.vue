<template>
    <div class="pl-2 gap-2 flex align-items-center justify-content-center">
        <!-- Button Group -->
        <div class="flex justify-content-center gap-1">
            <Button
                icon="pi pi-sitemap"
                severity="danger"
                label="Add"
                class="ajax-btn primary-btn outline-btn plr-20 mtb-5 border-round text-sm text-white"
                @click.prevent="openDialogsAddNewOrgStructure()"
            />
            <!-- <Button
                icon="pi pi-file-edit"
                severity="info"
                label="Edit"
                @click.prevent="openEditOrgStructureCompany()"
                class="ajax-btn primary-btn outline-btn plr-20 mtb-5 border-round text-sm"
            /> -->
        </div>
    </div>
    <!-- Dialogs for org-structure and positions -->
    <open-dialogs-org-structures-village
        :dialog="dialogOpenOrgStrChartCompany"
        :company-id="companyId ? companyId : 0"
        :getCountryNationId="getCountryNationId ? getCountryNationId : 0"
        @close-dialog="closeOpenDialogAddNewOrgStrCompany()"
        :treeOrgStructureDeptNational="treeOrgStructure ? treeOrgStructure : {}"
    />
    <popup-edit-org-structure-chart
        :dialog="dialogOpenEditOrgStrChartCompany"
        @close-dialog="closeOpenDialogEditOrgStrCompany()"
    />
</template>

<!-- Script of Add and Edit Org-Structures Company Project -->
<script>
import manageOrgStrDeptNewCompanyProject from "@/mixin/manage_org_structure_dept_new_features/org_dept_structure_dialogs/manageOrgDeptOrgStrCompanyHelper";
import OpenDialogsOrgStructuresVillage from "./dialogs_org_structures_national_villages/OpenDialogsOrgStructuresNationalVillages.vue";
export default {
    components: {
        OpenDialogsOrgStructuresVillage,
    },
    mixins: [manageOrgStrDeptNewCompanyProject],
    props: {
        treeOrgStructure: {
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
        deptCompany: {
            type: Number,
            required: true,
            default: () => 0,
        },
    },
};
</script>
