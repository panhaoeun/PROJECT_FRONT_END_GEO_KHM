
<template>
    <OrganizationChart v-model:selectionKeys="selection" :value="data" collapsible selectionMode="multiple">
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
    data() {
        return {
            data: {
                key: '0',
                type: 'person',
                data: {
                    image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
                    name: 'Amy Elsner',
                    title: 'CEO'
                },
                children: [
                    {
                        key: '0_0',
                        type: 'person',
                        data: {
                            image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
                            name: 'Anna Fali',
                            title: 'CMO',
                        },
                        children: [
                            {
                                key: '0_0_0',
                                label: 'Sales'
                            },
                            {
                                key: '0_0_"1',
                                label: 'Marketing'
                            }
                        ]
                    },
                    {
                        key: '0_1',
                        type: 'person',
                        data: {
                            image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
                            name: 'Stephen Shaw',
                            title: 'CTO'
                        },
                        children: [
                            {
                                key: '0_1_0',
                                label: 'Development'
                            },
                            {
                                key: '0_1_1',
                                label: 'UI/UX Design'
                            }
                        ]
                    }
                ]
            },
            selection: {}
        };
    },
};
</script>
