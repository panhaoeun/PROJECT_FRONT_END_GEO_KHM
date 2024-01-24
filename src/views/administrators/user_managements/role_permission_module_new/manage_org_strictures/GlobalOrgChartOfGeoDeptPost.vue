
<template>
    <OrganizationChart v-model:selectionKeys="selection" :value="orgData" collapsible selectionMode="multiple">
        <template #person="slotProps">
            <div class="flex flex-column">
                <div class="flex flex-column align-items-center">
                    <img :alt="slotProps.node.data.name" :src="slotProps.node.data.image" class="mb-3 w-3rem h-3rem" />
                    <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
                    <span>{{ slotProps.node.data.title }}</span>
                </div>
            </div>
        </template>
        <template #default="slotProps">
            <span>{{ slotProps.node.label }}</span>
        </template>
    </OrganizationChart>
</template>

<!-- Manage Global Org-Strictures Of Board Mgt Project-->
<script>
export default {
    props: {
        orgData: {
            type: Array,
            require: true,
            default: () => []
        }
    },  
    data() {
        return {
            selection: {}
        };
    },
};
</script>
