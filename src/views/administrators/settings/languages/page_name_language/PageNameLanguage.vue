<template>
    <Dropdown v-model="selectedPageName" :options="pages" filter optionLabel="name" placeholder="Select a Page"
        class="w-full">
        <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
                <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
                {{ slotProps.placeholder }}
            </span>
        </template>
    </Dropdown>
</template>

<script>
export default {
    data() {
        return {
            selectedPageName: null, // Initial value for the dropdown
            pages: [ // Sample data for the dropdown options
                { name: 'Page 1' },
                { name: 'Page 2' },
                { name: 'Page 3' },
            ],
        };
    },
};
</script>