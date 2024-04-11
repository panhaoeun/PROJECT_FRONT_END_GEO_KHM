<template>
    <Toast />
    <Dialog
        v-model:visible="openDialogs"
        modal
        header="List of sub resources types"
        :style="{ width: '60rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        maximizable
    >
        <!-- Header Icons-->
        <template #closeicon>
            <i class="pi pi-times" @click.prevent="close"></i>
        </template>
        <!-- Contents -->
        <div class="address-popup popup-top-auto z-100">
            <!-- Dialog edit resources type -->
            <PopEditNationCountryResourcesType
                v-if="dialogResourceTypeEditType"
                :edit-data-resources-type="openedEditDataResources"
                @close="closeEditNationalSubResourcesType"
            />
            <!-- Content -->
            <div class="gird">
                <div class="col-12">
                    <!-- Dropdown list resources types -->
                    <div class="gap-10 py-2">
                        <Dropdown
                            showClear
                            v-model="selectedResourcesType"
                            :options="getAllDataResourceTypeNationalCountry"
                            @update:modelValue="
                                openSelectedSubResourcesTypeNational(
                                    selectedResourcesType
                                )
                            "
                            optionLabel="geo_english_name"
                            filter
                            placeholder="Select a Country"
                            class="w-30rem text-sm border-round-lg"
                            inputId="geo_english_name"
                            aria-describedby="dd-error"
                        >
                            <template #value="slotProps">
                                <div
                                    v-if="slotProps?.value"
                                    class="flex align-items-center"
                                >
                                    <div class="text-sm">
                                        {{
                                            geoNameToTitleResourceType(
                                                String(
                                                    slotProps.value
                                                        ?.khmerNameResource ??
                                                        ""
                                                )
                                            )
                                        }}({{
                                            slotProps.value
                                                .englishNameResource ?? ""
                                        }})
                                    </div>
                                </div>
                                <span v-else class="text-sm">
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center text-sm">
                                    <div class="text-sm">
                                        {{
                                            geoNameToTitleResourceType(
                                                String(
                                                    slotProps.option
                                                        .khmerNameResource ?? ""
                                                )
                                            )
                                        }}
                                        ({{
                                            slotProps.option
                                                .englishNameResource ?? ""
                                        }})
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <!-- DataTable Resources-->
                    <DataTable
                        :value="
                            getAllDataSubResourcesTypeNationCountry
                                ? getAllDataSubResourcesTypeNationCountry
                                : {}
                        "
                        class="p-datatable-scrollable text-sm"
                        :rows="10"
                        dataKey="id"
                        :rowHover="true"
                        contextMenu
                        v-model:filters="filtersData"
                        filterDisplay="menu"
                        :loading="loadingReloadResourcesType"
                        :filters="filtersResourceType"
                        responsiveLayout="scroll"
                        :globalFilterFields="[
                            'representative.khmerNameResource',
                            'khmerNameResource',
                            'englishNameResource',
                            'statusTypeResource',
                            'statusResourceTypeCode',
                        ]"
                        v-model:selection="filtersData"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} sub resource type records"
                    >
                        <template #header>
                            <div
                                class="flex flex-wrap align-items-center justify-content-between gap-2"
                            >
                                <span class="text-xl text-900 font-bold">
                                    <el-button
                                        type="info"
                                        size="large"
                                        class="btn btn-primary text-sm"
                                        @click.prevent="
                                            openDialogResourcesAddSubType()
                                        "
                                        v-if="selectedSuperResourceType > 0"
                                    >
                                        <div class="button">
                                            <i
                                                class="pi pi-plus-circle"
                                                style="font-size: 1rem"
                                            ></i>
                                            <span class="pl-2">Create</span>
                                        </div>
                                    </el-button>
                                </span>
                                <span class="p-input-icon-left text-sm">
                                    <i class="pi pi-search" />
                                    <InputText
                                        v-model="
                                            filtersResourceType['global'].value
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
                                getAllDataSubResourcesTypeNationCountry &&
                                getAllDataSubResourcesTypeNationCountry.length >
                                    0 &&
                                getAllDataSubResourcesTypeNationCountry != ''
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
                                        @click="
                                            openDialogEditModifyResourcesType(
                                                slotProps.data
                                            )
                                        "
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        outlined
                                        rounded
                                        severity="danger"
                                        class="mr-2 bg-danger-500"
                                        @click="
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
        </div>
        <!-- Footers -->
        <template #footer>
            <Button
                label="Cancel"
                text
                class="w-7rem"
                severity="secondary"
                @click.prevent="close"
                autofocus
            />
        </template>
    </Dialog>
    <!-- Dialogs add new for org-structure and positions -->
    <PopupAddNewDialogSubResourcesTypeNationCountry
        v-if="selectedSuperResourceType > 0"
        :dialog="dialogAddNationalSubResourcesType"
        :national-country-id="nationalCountryId ? nationalCountryId : 0"
        @close-dialog="closeDialogResourcesAddSubType"
        :superSSNResourceSelectedId="
            selectedSuperResourceType ? selectedSuperResourceType : 0
        "
        :type-code-nation-geo-fence="
            typeCodeNationGeoFence ? typeCodeNationGeoFence : 0
        "
    />
    <!-- Dialogs add new  resources type and edit/modify resources type -->
    <Dialog
        v-model:visible="deletedResourcesTypeNational"
        :style="{ width: '550px' }"
        :header="'Confirm delete  this resource type'"
        :modal="true"
    >
        <div class="confirmation-content flex">
            <i
                class="pi pi-exclamation-triangle mr-3 text-red-500"
                style="font-size: 2rem"
            />
            <span
                >Are you sure you want to delete this resource type:
                <b> {{ getNameRemoveNationData }} </b>?
            </span>
        </div>
        <template #footer>
            <Button
                label="No"
                icon="pi pi-times"
                class="w-10rem"
                severity="secondary"
                text
                @click="deletedResourcesTypeNational = false"
            />
            <Button
                :label="loadingRemovedResourceType ? 'Loading...' : 'Remove'"
                severity="danger"
                icon="pi pi-check"
                class="w-10rem"
                :loading="loadingRemovedResourceType"
                @click="confirmRemovedResourcesTypeNationDialogs()"
            />
        </template>
    </Dialog>
</template>

<!-- Script of org-structures national congress -->
<script>
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import manageOrgGeoResourcesTypeNationalCountryHelper from "@/mixin/manage_org_structure_dept_new_features/manage_resources_types/manageOrgGeoResourcesTypeNationalCountryHelper";
import PopupAddNewDialogSubResourcesTypeNationCountry from "./PopupAddNewDialogSubResourcesTypeNationCountry";
import PopEditNationCountryResourcesType from "../dialog_popup_geo_resources_type/PopupEditGeoResourcesType.vue";
export default {
    setup: () => ({ v$: useVuelidate() }),
    validations() {
        return {
            addNewEmpRootNodeEng: {
                required,
                minLength: minLength(3),
            },
        };
    },
    mixins: [manageOrgGeoResourcesTypeNationalCountryHelper],
    components: {
        PopupAddNewDialogSubResourcesTypeNationCountry,
        PopEditNationCountryResourcesType,
    },
    props: {
        dialog: {
            type: Boolean,
            required: true,
            default: false,
        },
        superSSNResourceId: {
            type: Number,
            required: true,
            default: () => 0,
        },
        nationalCountryId: {
            type: Number,
            required: true,
            default: () => 0,
        },
        typeCodeNationGeoFence: {
            type: String,
            required: true,
            default: () => "GL01",
        },
    },
    computed: {
        openDialogs() {
            return this.dialog ? this.dialog : false;
        },
        getIdEditOrgStructure() {
            const getObjData = this.getEditObjName ? this.getEditObjName : null;
            if (
                (getObjData !== null && typeof getObjData !== "object") ||
                getObjData !== undefined
            ) {
                return getObjData;
            }
            return {};
        },
    },
    async mounted() {
        // Reload Data Resources
        const getResourceId = parseInt(this.nationalCountryId)
            ? parseInt(this.nationalCountryId)
            : 0;
        const getSupperSSNId = 0;
        await this.getReloadResourcesTypGeoOrgAllDataGlobal(
            getResourceId,
            getSupperSSNId
        );
    },
    data() {
        return {
            loadingBtnOrgCompany: false,
            submitted: false,
            prepareObjEditOrgStrId: null,
            orgStrNameEditedId: null,
            descriptionDeptEmpRootNode: "",
            addNewEmpRootNodeKhmer: "",
            addNewEmpRootNodeEng: "",
            statusAddNewRootNode: "nodeRoot",
            selectedParentDeptOrgStr: null,
            dataOrgDeptStrCompany: [],
            dialogAddNationalResourcesType: false,
            filtersData: null,
            selectedResourcesType: null,
            selectedSuperResourceType: null,
            dialogResourceTypeEditType: false,
            openedEditDataResources: null,
            deletedResourcesTypeNational: false,
            getNameRemoveNationData: "",
            loadingRemovedResourceType: false,
        };
    },
    methods: {
        close() {
            this.$emit("close-dialog");
        },
        closeEditNationalSubResourcesType() {
            this.dialogResourceTypeEditType = false;
        },
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
