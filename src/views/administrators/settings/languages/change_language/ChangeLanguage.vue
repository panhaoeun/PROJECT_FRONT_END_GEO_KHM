<template>
    <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="Select a Country"
        class="w-full">
        <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
                <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" />
                <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else class="padding-9">
                {{ slotProps.placeholder }}
            </span>
        </template>

        <template #option="slotProps">
            <div class="flex align-items-center">
                <img :alt="slotProps.option.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                <div>{{ slotProps.option.name }}</div>
            </div>
        </template>
    </Dropdown>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import { ref } from "vue";

export default {
    components: {
    },

    data() {
        const selectedCountry = ref();
        const countries = ref([
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ]);

        return {
            DataTable,
            Column,
            Dialog,
            countries,
            selectedCountry,
        };
    },
};
</script>
