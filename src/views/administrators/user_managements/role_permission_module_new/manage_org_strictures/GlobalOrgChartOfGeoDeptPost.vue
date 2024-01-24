<template>
    <div class="gap-3 my-4 flex justify-content-center">
        <OrganizationChartStructures/>
    </div>
</template>

<!-- Manage Global Org-Strictures Of Board Mgt Project-->
<script>
import OrganizationChartStructures from "../../../../../components/org_chart_structures/OrganizationStructuresChart.vue";
export default {
    components: {
        OrganizationChartStructures,
    },
    props: {
        orgData: {
            type: Array,
            require: true,
            default: () => [],
        },
    },
    data() {
        return {
            selection: {},
        };
    },
};
</script>
