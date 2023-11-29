<template>
    <div class="gap-10 flex justify-content-center flex-wrap border-top-1 border-cyan-600">
        <button type="button" @click.prevent="popUpCreateProvinceState()" aria-label="View All" class="border-none w-15rem ajax-btn outline-btn plr-20 mtb-5">
            <span>
                View All
            </span>
        </button>
    </div>
    <!-- Popup Create Province or State-->
    <Dialog 
        v-model:visible="openDialog"
        header="List of Country" 
        :style="{ width: '75vw' }" 
        modal 
        :contentStyle="{ height: '600px' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :draggable="false"
        :pt="{
            mask: {
                style: 'backdrop-filter: blur(2px)'
            }
        }"
    >
        <!-- Table List Province or State -->
        <div class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 card border-round gap-15">
            <DataTable
                class="px-2 py-2"
                :scrollable="true" 
                scrollHeight="flex"
                tableStyle="min-width: 50rem"
                v-model:editingRows="editingRows" 
                v-model:selection="selectedCustomers"
                :value="getAllCountry" 
                editMode="row" 
                dataKey="id" 
                :rows="10"
                :lazy="true"
                :paginator="true" 
                :filters="filters"
                responsiveLayout="scroll"
                @row-edit-save="onRowEditSave"
                @sort="onSort($event)" 
                @page="onPage($event)"
                :selectAll="selectAll"
                @select-all-change="onSelectAllChange"
                @row-select="onRowSelect" 
                @row-unselect="onRowUnselect"
                :pt="{
                    table: { style: 'min-width: 50rem' },
                    column: {
                        bodycell: ({ state }) => ({
                            style:  state['d_editing']&&'padding-top: 0.6rem; padding-bottom: 0.6rem' 
                        })
                    }
                }"
            >
                <!-- Search Input Filter -->
                <template #header>
                    <div class="flex flex-wrap  justify-content-between gap-2">
                        <p>Country</p>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search country" />
                        </span>
                    </div>
                </template>
                <!-- Column -->
                <Column selectionMode="multiple" :styless="{width: '3rem'}" :exportable="false"></Column>
                <Column field="geo_zip_code" header="Code" sortField="geo_zip_code" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_zip_code }}
                    </template>
                </Column>
                <Column field="geo_khmer_name" header="Khmer Name" sortField="geo_khmer_name" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_khmer_name }}
                    </template>
                </Column>
                <Column field="geo_khmer_name" header="Latin Name" sortField="geo_english_name" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_khmer_name }}
                    </template>
                </Column>
                <Column field="geo_longitude_location" header="Longitude" sortField="geo_longitude_location" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_longitude_location }}
                    </template>
                </Column>
                <Column field="geo_latitude_location" header="Latitude" sortField="geo_latitude_location" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_latitude_location }}
                    </template>
                </Column>
                <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
                <!-- <Column :exportable="false" :styles="{'min-width':'8rem'}">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outline class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outline class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column> -->
            </DataTable>
        </div>
    </Dialog>
</template>

<!-- Popup Province or State -->
<script>
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import { FilterMatchMode } from 'primevue/api';

export default {
    created(){
        this.geoLocationServices = new GeoLocationsManagementServices();
    },
    mounted(){
        this.getGeoLocationCountry();
    },
    data() {
        return {
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                status: { value: null, matchMode: FilterMatchMode.EQUALS },
                verified: { value: null, matchMode: FilterMatchMode.EQUALS }
            },
            openDialog: false,
            products: null,
            editingRows: [],
            selectedCustomers: null,
            selectAll: false,
            first: 0,
            getAllCountry: []
        };
    },
    methods: {
        popUpCreateProvinceState(){
            this.openDialog = true;
        },
        onRowEditSave(event) {
            let { newData, index } = event;

            this.products[index] = newData;
        },
        onPage(event) {
            this.lazyParams = event;
        },
        onSort(event) {
            this.lazyParams = event;
        },
        onFilter() {
            this.lazyParams.filters = this.filters;
        },
        onSelectAllChange(event) {
            const selectAll = event.checked;
            console.log(selectAll)
            // if (selectAll) {
            //     ProductService.getProductsMini().then(data => {
            //         this.selectAll = true;
            //         this.selectedCustomers = data;
            //     });
            // }
            // else {
            //     this.selectAll = false;
            //     this.selectedCustomers = [];
            // }
        },
        onRowSelect() {
            this.selectAll = this.selectedCustomers.length === this.totalRecords
        },
        onRowUnselect() {
            this.selectAll = false;
        },
         getGeoLocationCountry(){
            try{
                const countryZipTypeCountry = 'T1';
                const superSSNCountryCode = "";
                this.geoLocationServices.listGeoLocationCountryByZip(countryZipTypeCountry, superSSNCountryCode).then((country) => {
                    if (!country) {
                        this.getAllCountry = [];
                    }
                    this.getAllCountry = Array.isArray(country) ? country.slice() : [];
                }).catch((error) => {
                    return Promise.reject(error.message || []);
                }); 
            }catch(error){
                return Promise.reject(error.message || []);
            }
        },
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>