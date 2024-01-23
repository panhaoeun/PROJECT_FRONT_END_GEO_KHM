<template>
    <div class="pl-2 gap-1 flex align-items-center justify-content-center">
        <!-- Manage Org Structures -->
        <Button
            aria-label="Add Org Structure"
            class="border-round-sm w-11rem h-2rem text-sm text-danger"
            outlined
            label="Manage Org Structure"
        />
        <!-- Manage Position BoardMgt-->
        <org-str-mgt-project-positions />
        <!-- Manage Employee -->
        <Button
            aria-label="Add Org Structure"
            severity="info"
            class="border-round-sm w-10rem h-2rem text-sm"
            outlined
            label="Manage Employee"
        />
    </div>
</template>
<!-- Manage OrgStructures Board.Mgt -->
<script>
import OrgStrMgtProjectPositions from "./board_manager_org_str_project/manage_position_mgt_org/ListPositionBoardMgtOrgStrPro";
export default {
    components: {
        OrgStrMgtProjectPositions,
    },
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
