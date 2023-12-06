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
        v-model:visible="openDialog"
        header="List of Country" 
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
                :value="getGeoLocationProvince" 
                :rowHover="true" 
                contextMenu 
                v-model:filters="filtersGeoProvince" 
                filterDisplay="menu"
                :loading="loadingProvince" 
                :filters="filtersGeoProvince" 
                responsiveLayout="scroll"
                :globalFilterFields="['representative.geo_zip_code', 'geo_khmer_name', 'geo_english_name', 'geo_longitude_location', 'geo_latitude_location']"
                v-model:selection="selectedGeoProvince"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} geo-province locations"
            >
                <!-- Search Input Filter -->
                <template #header>
                    <div class="flex flex-wrap  justify-content-between gap-2">
                        <p>Country</p>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filtersGeoProvince['global'].value" placeholder="Search province..." />
                        </span>
                    </div>
                </template>
                <!-- Column -->
                <Column selectionMode="multiple" :styless="{width: '3rem'}" :exportable="false"></Column>
                <template #empty> No geo-location province found. </template>
                <template #loading> Loading geo-location province data. Please wait. </template>
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
                        <Button icon="pi pi-pencil" outline class="p-button-rounded p-button-success mr-2" @click="editGeoLocationProvince(slotProps?.data)" />
                        <Button icon="pi pi-trash" outline class="p-button-rounded p-button-warning" @click="confirmDeletedGeoProvince(slotProps?.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <!-- Pop Edited Country -->
        <edited-popup-geo-location-province
            v-if="openEditedProvince"
            :geoLocalProvince="editProvincePopup"
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
                <Button label="Yes" icon="pi pi-check" text @click="confirmDeletedProvinceById()" />
            </template>
        </Dialog>

    </Dialog>
</template>

<!-- Popup Province or State -->
<script>
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import { FilterMatchMode,FilterOperator } from 'primevue/api';
import EditedPopupGeoLocationProvince from "./EditedPopupGeoLocationProvince.vue";
import util from '@/mixin/util';
import validation from '@/mixin/validation';
import geoLocationProvinceHelper from '@/mixin/geoLocationProvinceHelper';
import {mapActions,mapGetters} from "vuex";

export default {
    created(){
        this.geoLocationServices = new GeoLocationsManagementServices();
    },
    mixins: [util,validation,geoLocationProvinceHelper],
    components: {
        EditedPopupGeoLocationProvince
    },  
    computed: {
        ...mapGetters('geoProvince', ['provinceAll']),
        getGeoLocationProvince() {
            return this.provinceAll || []
        },
    },
    data() {
        return {
            filtersGeoProvince: {
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
            selectedGeoProvince: false,
            openDialog: false,
            openEditedProvince: false,
            idEditGeoProvince: null,
            products: null,
            editingRows: [],
            selectedProvince: null,
            selectAll: false,
            first: 0,
            editProvincePopup: null,
            ajaxDeletingCountry: 0,
            deletedDialogDataId: null,
            loadingProvince: false
        };
    },
    methods: {
        ...mapActions('common', ['fetchLocation', 'setToastMessage', 'setToastError', 'getRequest']),
        popUpCreateProvinceState(){
            this.openDialog = true;
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
        editGeoLocationProvince(province){
            this.openEditedProvince = true;
            this.idEditGeoProvince = parseInt(province?.id) ? parseInt(province?.id) : 0;
            this.editProvincePopup = province ? province : [];
        },
        confirmDeletedGeoProvince(del){
            this.deletedGeoProvinceDialogs = true;
            this.deletedDialogDataId = del;
        },
        confirmDeletedProvinceById(){
            this.deletingGeoProvinceLocationsById(this.deletedDialogDataId);
        }
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>