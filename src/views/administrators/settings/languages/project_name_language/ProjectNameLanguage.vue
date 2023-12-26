<template>
    <Dropdown v-model="selectedProjectName" :options="projects" filter optionLabel="name" placeholder="Select a Project"
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

        };
    },
};
</script>