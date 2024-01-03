<template>
    <!-- Button Geo Country -->
    <button v-if="checkCountryGeoList !== null || checkCountryGeoList !== ''"
        class="ajax-btn outline-btn plr-20 mtb-5 border-round" icon="pi pi-plus" type="button" label="New" aria-label="New"
        @click.prevent="popUpCreateProvinceState()">
        <span>
            Edit
            <i class="pi pi-file-edit"></i>
        </span>
    </button>
    <!-- Popup Create Province or State-->
    <Dialog v-model:visible="openDialog" header="List of Page" :style="{ width: '75vw' }" modal
        :contentStyle="{ height: '600px' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :draggable="false" :pt="{
            mask: {
                style: 'backdrop-filter: blur(2px)'
            }
        }">
        <!-- Table List Province or State -->
        <div class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 card border-round gap-15">
            <DataTable class="p-datatable-scrollable text-sm" :rows="10" dataKey="id" :paginator="true"
                :value="getAllCountry" :rowHover="true" contextMenu v-model:filters="filtersGeoCountry" filterDisplay="menu"
                :loading="loadingCountry" :filters="filtersGeoCountry" responsiveLayout="scroll"
                :globalFilterFields="['representative.geo_zip_code', 'geo_khmer_name', 'geo_english_name', 'geo_longitude_location', 'geo_latitude_location']"
                v-model:selection="selectedGeoCountry"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} geo-country locations">
                <!-- Search Input Filter -->
                <template #header>
                    <div class="flex flex-wrap justify-content-between gap-2">
                        <p>Page</p>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filtersGeoCountry['global'].value" placeholder="Search country" />
                        </span>
                    </div>
                </template>
                <!-- Column -->
                <template #empty> No geo-location country found. </template>
                <template #loading> Loading geo-location country data. Please wait. </template>
                <Column selectionMode="multiple" :styless="{ width: '3rem' }" :exportable="false"></Column>
                <Column field="page_name" header="Page Name" sortField="page_name" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_zip_code }}
                    </template>
                    <!-- Geo-Country Zip Code -->
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                            placeholder="Page Name" />
                    </template>
                </Column>
                <Column field="note" header="Note" sortField="note" sortable>
                    <template #body="{ data }">
                        {{ data?.geo_khmer_name }}
                    </template>
                    <!-- Filter Khmer Name -->
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                            placeholder="Note" />
                    </template>
                </Column>
                <Column header="Actions" :exportable="false" :styles="{ 'min-width': '8rem' }">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outline class="p-button-rounded p-button-success mr-2"
                            v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_edit' }]"
                            @click="editGeoLocationCountry(slotProps?.data)" />
                        <Button icon="pi pi-trash" outline class="p-button-rounded p-button-warning"
                            @click="confirmDeletedGeoCountry(slotProps?.data)"
                            v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_delete' }]" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <!-- Pop Edited Country -->
        <edited-popup-geo-location-country v-if="openEditedCountryCountry" :geoLocalCountry="editCountryPopup"
            @close="closingPopupEditedCountry" />
        <!-- Popup Deleted Country -->
        <Dialog v-model:visible="deletedGeoCountryDialogs" :style="{ width: '450px' }"
            header="Confirm delete geo-country locations" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Are you sure you want to delete</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deletedGeoCountryDialogs = false" />
                <Button label="Yes" icon="pi pi-check" text @click="confirmDeletedCountryById()" />
            </template>
        </Dialog>
  
    </Dialog>
  </template>
  
  <!-- Popup Province or State -->
  <script>
  import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
  import { FilterMatchMode, FilterOperator } from 'primevue/api';
  import util from '@/mixin/util';
  import validation from '@/mixin/validation';
  import geoLocationCountryHelper from '@/mixin/geoLocationCountryHelper';
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    props: {
        checkCountryGeoList: {
            type: String,
            default: null
        }
    },
    created() {
        this.geoLocationServices = new GeoLocationsManagementServices();
    },
    mounted() {
        this.getGeoLocationCountry();
    },
    mixins: [util, validation, geoLocationCountryHelper],
    components: {
        // EditedPopupGeoLocationCountry
    },
    computed: {
        ...mapGetters('geoCountry', ['countryAll']),
        getAllCountry() {
            return this.countryAll || []
        },
    },
    data() {
        return {
            filtersGeoCountry: {
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
            openDialog: false,
            openEditedCountryCountry: false,
            idEditGeoCountry: null,
            products: null,
            editingRows: [],
            selectedGeoCountry: null,
            selectAll: false,
            first: 0,
            editCountryPopup: null,
            ajaxDeletingCountry: 0,
            deletedDialogDataId: null,
            loadingCountry: false
        };
    },
    methods: {
        ...mapActions('common', ['fetchLocation', 'setToastMessage', 'setToastError', 'getRequest']),
        ...mapActions('geoCountry', ['getAllCountryActions']),
        popUpCreateProvinceState() {
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
        onSelectAllChange(event) {
            const selectAll = event.checked;
            console.log(selectAll)
            // if (selectAll) {
            //     ProductService.getProductsMini().then(data => {
            //         this.selectAll = true;
            //         this.selectedGeoCountry = data;
            //     });
            // }
            // else {
            //     this.selectAll = false;
            //     this.selectedGeoCountry = [];
            // }
        },
        onRowSelect() {
            this.selectAll = this.selectedGeoCountry.length === this.totalRecords
        },
        onRowUnselect() {
            this.selectAll = false;
        },
        getGeoLocationCountry() {
            try {
                this.getAllCountryActions();
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
        closingPopupEditedCountry() {
            this.openEditedCountryCountry = false;
        },
        editGeoLocationCountry(country) {
            this.openEditedCountryCountry = true;
            this.idEditGeoCountry = parseInt(country?.id) ? parseInt(country?.id) : 0;
            this.editCountryPopup = country ? country : [];
        },
        confirmDeletedGeoCountry(del) {
            this.deletedGeoCountryDialogs = true;
            this.deletedDialogDataId = del;
        },
        confirmDeletedCountryById() {
            this.deletingGeoCountryLocationsById(this.deletedDialogDataId);
        }
    },
  };
  </script>
  <style scoped></style>
  <style lang='scss' scoped></style>