<template>
    <!-- Button Geo Country -->
    <button 
        class="ajax-btn outline-btn plr-20 mtb-5 border-round"
        icon="pi pi-plus" 
        type="button"
        label="New"
        aria-label="New"
        @click.prevent="popUpCreateCommune()"
    >
        <span>
            Edit
            <i class="pi pi-file-edit"></i>
        </span>
    </button>
    <!-- Popup Create Province or State-->
    <Dialog 
        v-model:visible="openDialogCommune"
        header="List of commune" 
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
                :value="getGeoLocationCommune" 
                :rowHover="true" 
                contextMenu 
                v-model:filters="filtersGeoCommune" 
                filterDisplay="menu"
                :loading="loadingDistrict" 
                :filters="filtersGeoCommune" 
                responsiveLayout="scroll"
                :globalFilterFields="['representative.geo_zip_code', 'geo_khmer_name', 'geo_english_name', 'geo_longitude_location', 'geo_latitude_location']"
                v-model:selection="selectedGeoCommue"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} geo-commune locations"
            >
                <!-- Search Input Filter -->
                <template #header>
                    <div class="flex flex-wrap  justify-content-between gap-2">
                        <p>Country</p>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filtersGeoCommune['global'].value" placeholder="Search country" />
                        </span>
                    </div>
                </template>
                <!-- Column -->
                <Column selectionMode="multiple" :style="{width: '3rem'}" :exportable="false"></Column>
                <Column field="geo_zip_code" header="Code" sortField="geo_zip_code" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_zip_code }}
                    </template>
                    <!-- Geo-Country Zip Code -->
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by zip name" />
                    </template>
                </Column>
                <Column field="geo_khmer_name" header="Khmer Name" sortField="geo_khmer_name" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_khmer_name }}
                    </template>
                    <!-- Filter Khmer Name -->
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by country" />
                    </template>
                </Column>
                <Column field="geo_english_name" header="Latin Name" sortField="geo_english_name" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_english_name }}
                    </template>
                    <!-- Filter English Name -->
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by country" />
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
                        <Button icon="pi pi-pencil" outline class="p-button-rounded p-button-success mr-2" @click="editGeoLocationGeoCommune(slotProps?.data)" />
                        <Button icon="pi pi-trash" outline class="p-button-rounded p-button-warning" @click="confirmDeletedGeoCommune(slotProps?.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <!-- Pop Edited Country -->
        <edited-popup-geo-location-commune
            v-if="openEditedProvince"
            :geoLocalCommune="editCommunePopup"
            @close="closingPopupEditedCountry"
        />
        <!-- Popup Deleted Country -->
        <Dialog v-model:visible="deletedGeoProvinceDialogs" :style="{ width: '450px' }" 
            header="Confirm"
            :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Are you sure you want to delete</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deletedGeoProvinceDialogs = false" />
                <Button label="Yes" icon="pi pi-check" text @click="confirmDeletedGeoCommuneById()" />
            </template>
        </Dialog>

    </Dialog>
</template>

<!-- Popup Province or State -->
<script>
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import { FilterMatchMode,FilterOperator } from 'primevue/api';
import EditedPopupGeoLocationCommune from "./EditedPopupGeoLocationCommune.vue";
import util from '@/mixin/util';
import validation from '@/mixin/validation';
import geoLocationCommuneHelper from '@/mixin/geoLocationCommuneHelper';
import {mapActions,mapGetters} from "vuex";

export default {
    created(){
        this.geoLocationServices = new GeoLocationsManagementServices();
    },
    mixins: [util,validation,geoLocationCommuneHelper],
    components: {
        EditedPopupGeoLocationCommune
    },  
    computed: {
        ...mapGetters('geoCommune', ['communeAll']),
        getGeoLocationCommune() {
            return this.communeAll || []
        },
    },
    data() {
        return {
            selectedGeoCommune: null,
            filtersGeoCommune: {
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
            openDialogCommune: false,
            openEditedProvince: false,
            idEditGeoProvince: null,
            products: null,
            editingRows: [],
            selectedProvince: null,
            selectAll: false,
            first: 0,
            editCommunePopup: null,
            ajaxDeletingCountry: 0,
            deletedDialogDataId: null,
            loadingDistrict: false
        };
    },
    methods: {
        ...mapActions('common', ['fetchLocation', 'setToastMessage', 'setToastError', 'getRequest']),
        popUpCreateCommune(){
            this.openDialogCommune = true;
        },
        onRowEditSave(event) {
            let { newData, index } = event;
            this.getAllCountry[index] = newData;
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
            this.selectAll = this.selectedProvince.length === this.totalRecords
        },
        onRowUnselect() {
            this.selectAll = false;
        },
        closingPopupEditedCountry(){
            this.openEditedProvince = false;
        },
        editGeoLocationGeoCommune(commune){
            this.openEditedProvince = true;
            this.idEditGeoProvince = parseInt(commune?.id) ? parseInt(commune?.id) : 0;
            this.editCommunePopup = commune ? commune : [];
        },
        confirmDeletedGeoCommune(del){
            this.deletedGeoProvinceDialogs = true;
            this.deletedDialogDataId = del;
        },
        confirmDeletedGeoCommuneById(){
            this.deletingGeoCommuneLocationsById(this.deletedDialogDataId);
        }
    },
};
</script>