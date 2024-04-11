<template>
    <!-- Content -->
    <div class="gird">
        <div class="col-12">
            <DataTable
                :value="
                    getAllDataResourceTypeNationalCountry
                        ? getAllDataResourceTypeNationalCountry
                        : {}
                "
                tableStyle="min-width: 50rem"
                contextMenu
                filterDisplay="menu"
                stripedRows
                paginator
                :filters="filtersResourceTypeData"
                :loading="loadingReloadResourcesType"
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
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} resource type records"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            >
                <template #header>
                    <div
                        class="flex flex-wrap align-items-center justify-content-between gap-2"
                    >
                        <span class="text-xl text-900 font-bold">
                        </span>
                        <span class="p-input-icon-left text-sm">
                            <i class="pi pi-search" />
                            <InputText
                                v-model="
                                    filtersResourceTypeData['global'].value
                                "
                                class="text-sm"
                                :placeholder="$t('route.search')"
                            />
                        </span>
                    </div>
                </template>
                <!-- Empty National Country Resource Type -->
                <template #empty
                    >List resources type is empty not found!.
                </template>
                <!-- Loading Users -->
                <template #loading>
                    Loading resources type data. Please wait...
                </template>
                <!--------------Check Existed Data ----------->
                <template
                    v-if="
                        getAllDataResourceTypeNationalCountry &&
                        getAllDataResourceTypeNationalCountry.length > 0 &&
                        getAllDataResourceTypeNationalCountry != ''
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
import manageOrgGeoResourcesTypeNationalCountryHelper from "@/mixin/manage_org_structure_dept_new_features/manage_resources_types/manageOrgGeoResourcesTypeNationalCountryHelper";
export default {
    mixins: [manageOrgGeoResourcesTypeNationalCountryHelper],
    data() {
        return {
            filtersResourceTypeData: {
                global: {
                    value: null,
                    matchMode: FilterMatchMode.CONTAINS,
                },
            },
        };
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
