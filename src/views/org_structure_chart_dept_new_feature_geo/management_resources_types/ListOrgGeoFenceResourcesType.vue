<template>
    <!-- Content -->
    <div class="gird">
        <div class="col-12">
            {{ countryProvinceIdOptSelected }} countryProvinceIdOptSelected
            <DataTable
                :value="getAllSubResourceType ? getAllSubResourceType : {}"
                tableStyle="min-width: 50rem"
                contextMenu
                filterDisplay="menu"
                stripedRows
                paginator
                :filters="filtersResourceTypeData"
                responsiveLayout="scroll"
                :rows="10"
                :globalFilterFields="[
                    'representative.englishNameResource',
                    'englishNameResource',
                    'khmerNameResource',
                    'statusTypeResource',
                    'statusResourceTypeCode',
                ]"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} sub resource type records"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            >
                <template #header>
                    <div
                        class="flex flex-wrap align-items-center justify-content-between gap-2"
                    >
                        <!-- Dropdown resource types -->
                        <span class="text-xl text-900 font-bold">
                            <div class="col-12 lg:col-12 xl:col-12 field">
                                <label
                                    for="name_en"
                                    class="text-sm font-semibold"
                                    >Resource Types</label
                                >
                                <div
                                    class="flex field flex-row justify-content-center text-sm item-center"
                                >
                                    <Dropdown
                                        showClear
                                        v-model="selectedResourceType"
                                        :options="getAllResourceType"
                                        @update:modelValue="
                                            onSelectedShowResourceTypeGeoFence(
                                                selectedResourceType
                                            )
                                        "
                                        optionLabel="englishNameResource"
                                        filter
                                        placeholder="Select a resource type"
                                        class="w-25rem text-sm border-round-lg"
                                        inputId="englishNameResource"
                                        aria-describedby="dd-error"
                                    >
                                        <template #value="slotProps">
                                            <div
                                                v-if="slotProps?.value"
                                                class="flex align-items-center"
                                            >
                                                <div class="text-sm">
                                                    {{
                                                        geoNameToTitleCase(
                                                            String(
                                                                slotProps.value
                                                                    ?.englishNameResource ??
                                                                    ""
                                                            )
                                                        )
                                                    }}({{
                                                        slotProps.value
                                                            .khmerNameResource ??
                                                        ""
                                                    }})
                                                </div>
                                            </div>
                                            <span v-else class="text-sm">
                                                {{ slotProps?.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div
                                                class="flex align-items-center text-sm"
                                            >
                                                <div class="text-sm">
                                                    {{
                                                        geoNameToTitleCase(
                                                            String(
                                                                slotProps.option
                                                                    .englishNameResource ??
                                                                    ""
                                                            )
                                                        )
                                                    }}
                                                    ({{
                                                        slotProps.option
                                                            .khmerNameResource ??
                                                        ""
                                                    }})
                                                </div>
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>
                            </div>
                        </span>
                        <!-- Search -->
                        <span class="p-input-icon-left text-sm">
                            <i class="pi pi-search" />
                            <InputText
                                v-model="
                                    filtersResourceTypeData['global'].value
                                "
                                class="text-sm w-25rem border-round-lg"
                                placeholder="Search management resource type"
                            />
                        </span>
                    </div>
                </template>
                <!-- Empty Resource Type Of Managements -->
                <template #empty
                    >List resources type is empty not found!.
                </template>
                <!-- Loading Resource Type Of Managements -->
                <template #loading>
                    Loading resources type data. Please wait...
                </template>
                <!--------------Check Existed Data ----------->
                <template
                    v-if="
                        getAllSubResourceType &&
                        getAllSubResourceType.length > 0 &&
                        getAllSubResourceType != ''
                    "
                >
                    <Column
                        field="khmerNameResource"
                        header="Resource Name (Khmer Name)"
                        sortField="khmerNameResource"
                        sortable
                    >
                        <template #body="{ data }">
                            {{ data?.khmerNameResource ?? "N/A" }}
                        </template>
                    </Column>
                    <Column
                        field="englishNameResource"
                        header="Resource Name (English Name)"
                        sortField="englishNameResource"
                        sortable
                    >
                        <template #body="{ data }">
                            {{ data?.englishNameResource ?? "N/A" }}
                        </template>
                    </Column>
                    <!-- Actions -->
                    <Column
                        :exportable="false"
                        header="Options"
                        style="min-width: 8rem"
                    >
                        <template #body="slotProps">
                            <Button
                                icon="pi pi-pencil"
                                outlined
                                rounded
                                class="mr-2"
                                @click.prevent="
                                    openDialogEditModifyResourcesType(
                                        slotProps?.data ?? null
                                    )
                                "
                            />
                            <Button
                                icon="pi pi-trash"
                                outlined
                                rounded
                                severity="danger"
                                class="mr-2 bg-danger-500"
                                @click.prevent="
                                    openDialogRemovedResourcesType(
                                        slotProps.data ?? null
                                    )
                                "
                            />
                        </template>
                    </Column>
                </template>
                <!--------------Check Existed Data ----------->
            </DataTable>
        </div>
    </div>
</template>

<!-- Script of Resources Type -->
<script>
import { FilterMatchMode } from "primevue/api";
import getGeoGlobalOrgStrLocationHelper from "@/mixin/getGeoGlobalOrgStrLocationHelper";
import manageOrgGeoResourcesTypeNationalCountryHelper from "@/mixin/manage_org_structure_dept_new_features/manage_resources_types/manageOrgGeoResourcesTypeNationalCountryHelper";
export default {
    mixins: [
        manageOrgGeoResourcesTypeNationalCountryHelper,
        getGeoGlobalOrgStrLocationHelper,
    ],
    props: {
        resourceType: {
            type: Array,
            required: true,
            default: () => {
                return null;
            },
        },
        subResourceType: {
            type: Array,
            required: true,
            default: () => {
                return null;
            },
        },
    },
    computed: {
        getAllSubResourceType() {
            const getResourceType = this.subResourceType
                ? this.subResourceType
                : [];
            if (getResourceType !== null) {
                return getResourceType ? getResourceType : [];
            }
            return [];
        },
        getAllResourceType() {
            const getResourceType = this.resourceType ? this.resourceType : [];
            if (getResourceType !== null) {
                return getResourceType ? getResourceType : [];
            }
            return [];
        },
    },
    data() {
        return {
            filtersResourceTypeData: {
                global: {
                    value: null,
                    matchMode: FilterMatchMode.CONTAINS,
                },
            },
            selectedResourceType: null,
            // selectedProvinceOptOrgStr: null,
        };
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
