<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <div class="gird">
            <DataTable
                class="p-datatable-scrollable text-sm"
                :rows="10"
                dataKey="id"
                :paginator="true"
                :value="geoFenceDataFilter"
                :rowHover="true"
                contextMenu
                v-model:filters="filtersDataGeoFence"
                filterDisplay="menu"
                :loading="loadingGeoFence"
                :filters="filtersGeoFenLocal"
                responsiveLayout="scroll"
                :globalFilterFields="[
                    'representative.geo_zip_code',
                    'geo_khmer_name',
                    'geo_english_name',
                    'geo_longitude_location',
                    'geo_latitude_location',
                ]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} geo-country locations"
            >
                <!-- Search Input Filter -->
                <template #header>
                    <div class="flex flex-wrap justify-content-between gap-2">
                        <p>Country</p>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText
                                v-model="
                                    filtersGeoFenceLocations['global'].value
                                "
                                placeholder="Search country"
                            />
                        </span>
                    </div>
                </template>
                <!-- Column -->
                <template #empty> No geo-location country found. </template>
                <template #loading>
                    Loading geo-location country data. Please wait.
                </template>
                <Column
                    selectionMode="multiple"
                    :styless="{ width: '3rem' }"
                    :exportable="false"
                ></Column>
                <Column
                    field="geo_zip_code"
                    header="Zip Code"
                    sortField="geo_zip_code"
                    sortable
                >
                    <template #body="{ data }">
                        {{ data?.geo_zip_code }}
                    </template>
                    <!-- Geo-Country Zip Code -->
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText
                            v-model="filterModel.value"
                            type="text"
                            @input="filterCallback()"
                            class="p-column-filter"
                            placeholder="Search by zip name"
                        />
                    </template>
                </Column>
                <Column
                    field="geo_khmer_name"
                    header="Khmer Name"
                    sortField="geo_khmer_name"
                    sortable
                >
                    <template #body="{ data }">
                        {{ data?.geo_khmer_name }}
                    </template>
                    <!-- Filter Khmer Name -->
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText
                            v-model="filterModel.value"
                            type="text"
                            @input="filterCallback()"
                            class="p-column-filter"
                            placeholder="Search by khmer name"
                        />
                    </template>
                </Column>
                <Column
                    field="geo_english_name"
                    header="Latin Name"
                    sortField="geo_english_name"
                    sortable
                >
                    <template #body="{ data }">
                        {{ data?.geo_english_name }}
                    </template>
                    <!-- Filter Khmer Name -->
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText
                            v-model="filterModel.value"
                            type="text"
                            @input="filterCallback()"
                            class="p-column-filter"
                            placeholder="Search english name"
                        />
                    </template>
                </Column>
                <Column
                    field="geo_longitude_location"
                    header="Longitude"
                    sortField="geo_longitude_location"
                    sortable
                >
                    <template #body="{ data }">
                        {{ data?.geo_longitude_location }}
                    </template>
                </Column>
                <Column
                    field="geo_latitude_location"
                    header="Latitude"
                    sortField="geo_latitude_location"
                    sortable
                >
                    <template #body="{ data }">
                        {{ data?.geo_latitude_location }}
                    </template>
                </Column>
                <Column
                    header="Actions"
                    :exportable="false"
                    :styles="{ 'min-width': '8rem' }"
                >
                    <template #body="slotProps">
                        <Button
                            icon="pi pi-pencil"
                            outline
                            class="p-button-rounded p-button-success mr-2"
                            v-permission="[
                                {
                                    functionName: 'location_ms_system_module',
                                    moduleName: 'fun_edit',
                                },
                            ]"
                            @click="editGeoLocationCountry(slotProps?.data)"
                        />
                        <Button
                            icon="pi pi-trash"
                            outline
                            class="p-button-rounded p-button-warning"
                            @click="confirmDeletedGeoCountry(slotProps?.data)"
                            v-permission="[
                                {
                                    functionName: 'location_ms_system_module',
                                    moduleName: 'fun_delete',
                                },
                            ]"
                        />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <!-- Pop Edited Country -->
    <EditPopupGeoGlobalLocations
        v-if="openDialogEditGeo"
        :geoLocalCommune="editCommunePopup"
        @close="closeDialogGeoFenceLocation"
    />
</template>

<!-- Script of Delivery -->
<script>
import { useVuelidate } from "@vuelidate/core";
import geoLocationVillagesHelper from "@/mixin/geoLocationVillagesHelper";
import getGeoGlobalOrgStrLocationHelper from "@/mixin/getGeoGlobalOrgStrLocationHelper";
import EditPopupGeoGlobalLocations from "./PopupEditedGeoFenceLocation";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import geoLocationCommuneHelper from "@/mixin/geoLocationCommuneHelper";

/**
 *
 * @List Detail of Geo-fence
 * */

export default {
    props: {
        geoFenceDataFilter: {
            type: Object,
            required: true,
        },
    },
    components: {
        EditPopupGeoGlobalLocations,
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            filtersDataGeoFence: null,
            loadingGeoFence: false,
            filtersGeoFenLocal: null,
            getDataGeoFenceLocations: null,
            openDialogEditGeo: false,
            filtersGeoFenceLocations: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                geo_zip_code: {
                    operator: FilterOperator.AND,
                    constraints: [
                        { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                    ],
                },
                geo_khmer_name: {
                    operator: FilterOperator.AND,
                    constraints: [
                        { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                    ],
                },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                geo_english_name: {
                    operator: FilterOperator.AND,
                    constraints: [
                        { value: null, matchMode: FilterMatchMode.IN },
                    ],
                },
            },
        };
    },
    mixins: [
        util,
        validation,
        geoLocationVillagesHelper,
        getGeoGlobalOrgStrLocationHelper,
        geoLocationCommuneHelper,
    ],
    methods: {
        closeDialogGeoFenceLocation() {
            this.openDialogEditGeo = false;
        },
    },
};
</script>
