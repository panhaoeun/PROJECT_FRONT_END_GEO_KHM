<template>
    <!-- Button Geo Country -->
    <button 
        class="ajax-btn outline-btn plr-20 mtb-5 border-round"
        icon="pi pi-plus" 
        type="button"
        label="New"
        aria-label="New"
        @click.prevent="popUpCreateProvinceState()"
    >
        <span>
            Edit
            <i class="pi pi-file-edit"></i>
        </span>
    </button>
    <!-- Popup Create Province or State-->
    <Dialog 
        v-model:visible="openDialogDistrict"
        header="List of district" 
        :style="{ width: '75vw' }" 
        modal 
        maximizable
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
                class="p-datatable-scrollable text-sm"
                :rows="10"
                dataKey="id" 
                :paginator="true" 
                :value="getAllDistrict" 
                :rowHover="true" 
                contextMenu 
                v-model:filters="filtersGeoDistrict" 
                filterDisplay="menu"
                :loading="loadingDistrict" 
                :filters="filtersGeoDistrict" 
                responsiveLayout="scroll"
                :globalFilterFields="['representative.geo_zip_code', 'geo_khmer_name', 'geo_english_name', 'geo_longitude_location', 'geo_latitude_location']"
                v-model:selection="selectedGeoCountry"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} geo-district locations"
            >
                <!-- Search Input Filter -->
                <template #header>
                    <div class="flex flex-wrap  justify-content-between gap-2">
                        <p>Districts</p>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filtersGeoDistrict['global'].value" placeholder="Search country" />
                        </span>
                    </div>
                </template>
                <!-- Column -->
                <template #empty> No geo-location district found. </template>
                <template #loading> Loading geo-location district data. Please wait. </template>
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
                <Column field="geo_english_name" header="Latin Name" sortField="geo_english_name" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_english_name }}
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
                <Column header="Actions" :exportable="false" :styles="{'min-width':'8rem'}">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outline class="p-button-rounded p-button-success mr-2" @click="editGeoLocationCountry(slotProps?.data)" />
                        <Button icon="pi pi-trash" outline class="p-button-rounded p-button-warning" @click="confirmDeletedGeoCountry(slotProps?.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <!-- Pop Edited Country -->
        <edited-popup-geo-location-district
            v-if="openEditedDistrict"
            :geoLocalDistrict="editDistrictPopup"
            @close="closingPopupEditedDistrict"
        />
        <!-- Popup Deleted Country -->
        <Dialog v-model:visible="deletedGeoDistrictDialogs" :style="{ width: '450px' }" 
            header="Confirm"
            :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Are you sure you want to delete</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deletedGeoDistrictDialogs = false" />
                <Button label="Yes" icon="pi pi-check" text @click="confirmDeletedDistrictById()" />
            </template>
        </Dialog>

    </Dialog>
</template>

<!-- Popup Province or State -->
<script>
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import { FilterMatchMode,FilterOperator } from 'primevue/api';
import EditedPopupGeoLocationDistrict from "./EditedPopupGeoLocationDistrict.vue";
import util from '@/mixin/util';
import validation from '@/mixin/validation';
import {mapActions,mapGetters} from "vuex";
import geoLocationDistrictHelper from '@/mixin/geoLocationDistrictHelper';

export default {
    created(){
        this.geoLocationServices = new GeoLocationsManagementServices();
    },
    mixins: [util,validation,geoLocationDistrictHelper],
    components: {
        EditedPopupGeoLocationDistrict
    },  
    computed: {
        ...mapGetters('geoDistrict', ['districtAll']),
        getAllDistrict() {
            return this.districtAll || [];
        },
    },
    data() {
        return {
            filtersGeoDistrict: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                geo_zip_code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                geo_khmer_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                geo_english_name: {
                    operator: FilterOperator.AND,
                    constraints: [
                        { value: null, matchMode: FilterMatchMode.IN },
                    ],
                }
            },
            openDialogDistrict: false,
            openEditedDistrict: false,
            idEditGeoCountry: null,
            products: null,
            editingRows: [],
            selectedCustomers: null,
            selectAll: false,
            first: 0,
            editDistrictPopup: null,
            ajaxDeletingCountry: 0,
            deletedDialogDataId: null,
            loadingDistrict: false
        };
    },
    methods: {
        ...mapActions('common', ['fetchLocation', 'setToastMessage', 'setToastError', 'getRequest']),
        popUpCreateProvinceState(){
            this.openDialogDistrict = true;
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
        onRowSelect() {
            this.selectAll = this.selectedCustomers.length === this.totalRecords
        },
        onRowUnselect() {
            this.selectAll = false;
        },
        closingPopupEditedDistrict(){
            this.openEditedDistrict = false;
        },
        editGeoLocationCountry(country){
            this.openEditedDistrict = true;
            this.idEditGeoCountry = parseInt(country?.id) ? parseInt(country?.id) : 0;
            this.editDistrictPopup = country ? country : [];
        },
        confirmDeletedGeoCountry(del){
            this.deletedGeoDistrictDialogs = true;
            this.deletedDialogDataId = del;
        },
        confirmDeletedDistrictById(){
            this.deletingGeoDistrictLocationsById(this.deletedDialogDataId);
        }
    },
};
</script>