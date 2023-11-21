<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="font-primary text-3xl  font-medium ">Create Locations</h2>
            <el-button type="info" size="large" class="btn btn-primary"  @click="$router.push('/admin/locations/management_location_system-list')">
                    <div class="" v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_create' }]">
                        <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                        <span class="pl-2">{{$t("route.routeBack")}}</span>
                    </div>
                </el-button>
        </div>
        <!-- Form Submitted -->
        <form method="POST">    
            <div class="card card px-6 py-6">
                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">     
                    <div class="col-12 lg:col-12">
                        <div class="grid formgrid">
                            <!-- Country List -->
                            <div class="col-6 field">
                                <div class="field">
                                    <label for="country" class="text-sm font-semibold">Country<span class="p-error">*</span></label>
                                    <Dropdown v-model="selectedCountry" :options="allCountry" optionLabel="name" placeholder="Select a Country" filter class="w-full border-round-lg text-sm">
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex align-items-center">
                                                <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                                                <div>{{ slotProps.value.name }}</div>
                                            </div>
                                            <span v-else>
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex align-items-center">
                                                <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                                                <div>{{ slotProps.option.name }}</div>
                                            </div>
                                        </template>
                                    </Dropdown> 
                                </div>
                            </div>
                            <!-- Province or State -->
                            <div class="col-6 field"> 
                                <label for="country" class="text-sm font-semibold">Province/State</label>
                                <div class="flex field flex-row">
                                    <!-- Drop down -->
                                    <Dropdown v-model="selectedCountry" :options="allCountry" optionLabel="name" placeholder="Select a Province or State" filter class="w-full border-round-lg text-sm">
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex align-items-center">
                                                <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                                                <div>{{ slotProps.value.name }}</div>
                                            </div>
                                            <span v-else>
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex align-items-center">
                                                <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                                                <div>{{ slotProps.option.name }}</div>
                                            </div>
                                        </template>
                                        <!-- Footer -->
                                        <template #footer>
                                            <ListProvinceState/>
                                        </template>
                                    </Dropdown> 
                                    <!-- Add New Province or State -->
                                    <popup-create-province-state/>
                                </div>
                            </div>
                            <!-- City / Districts -->
                            <div class="col-6 field"> 
                                <label for="country" class="text-sm font-semibold">Districts/City</label>
                                <div class="flex field flex-row">
                                    <!-- Drop down -->
                                    <Dropdown v-model="selectedCountry" :options="allCountry" optionLabel="name" placeholder="Select a Districts or City" filter class="w-full border-round-lg text-sm">
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex align-items-center">
                                                <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                                                <div>{{ slotProps.value.name }}</div>
                                            </div>
                                            <span v-else>
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex align-items-center">
                                                <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                                                <div>{{ slotProps.option.name }}</div>
                                            </div>
                                        </template>
                                        <!-- Footer -->
                                        <template #footer>
                                            <ListProvinceState/>
                                        </template>
                                    </Dropdown> 
                                    <!-- Add New Province or State -->
                                    <popup-create-province-state/>
                                </div>
                            </div>
                            <!-- Town / Commune -->
                            <div class="col-6 field"> 
                                <label for="country" class="text-sm font-semibold">Town / Commune</label>
                                <div class="flex field flex-row">
                                    <!-- Drop down -->
                                    <Dropdown v-model="selectedCountry" :options="allCountry" optionLabel="name" placeholder="Select a Commune or Town" filter class="w-full border-round-lg text-sm">
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex align-items-center">
                                                <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                                                <div>{{ slotProps.value.name }}</div>
                                            </div>
                                            <span v-else>
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex align-items-center">
                                                <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                                                <div>{{ slotProps.option.name }}</div>
                                            </div>
                                        </template>
                                        <!-- Footer -->
                                        <template #footer>
                                            <ListProvinceState/>
                                        </template>
                                    </Dropdown> 
                                    <!-- Add New Province or State -->
                                    <popup-create-province-state/>
                                </div>
                            </div>
                            <!-- Villages for Town Commune -->
                            <VillageOfCommuneCreateVue/> 
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<!-- Script Create New Locations -->
<script>
import Country from "./country_list.json";
import PopupCreateProvinceState from "./pop_up_create_locations/province_state/PopupCreateProvinceState.vue";
import ListProvinceState from "./pop_up_create_locations/province_state/ListProvinceState.vue";
import VillageOfCommuneCreateVue from "./pop_up_create_locations/village_of_commune/VillageOfCommuneCreate.vue";
export default {
    components: {
        PopupCreateProvinceState,
        ListProvinceState,
        VillageOfCommuneCreateVue
    },
    props: {},
    data() {
        return {
            selectedCountry: null,
            allCountry: Country ? Country : '',
        };
    },
    created() {},
    methods: {
        autoSelectCountryDefault(){
            const selectCambodia = {
                name: "Cambodia",
                code: "KH"
            }
            this.selectedCountry = selectCambodia ? selectCambodia : null;
        }
    },
    mounted() {
        this.autoSelectCountryDefault();
    },
};
</script>
<!-- Style -->
<style scoped>
    @import url('../../../assets/flags/flag_world.css');
</style>