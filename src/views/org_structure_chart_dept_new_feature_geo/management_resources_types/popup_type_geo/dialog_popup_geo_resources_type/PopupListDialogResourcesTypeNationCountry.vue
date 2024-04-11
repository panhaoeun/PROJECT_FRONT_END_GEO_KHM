<template>
    <Toast />
    <Dialog
        v-model:visible="openDialogs"
        modal
        header="List of resources types"
        :style="{ width: '70rem' }"
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
                :editDataResourcesType="openedEditDataResources"
                @close="closeEditNationalResourcesType"
            />
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
                        :filters="filtersResourceType"
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
                                    <el-button
                                        type="info"
                                        size="large"
                                        class="btn btn-primary text-sm"
                                        @click.prevent="
                                            openDialogAddResourcesType()
                                        "
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
                                getAllDataResourceTypeNationalCountry &&
                                getAllDataResourceTypeNationalCountry.length >
                                    0 &&
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
    <!-- Dialogs add new  resources type and edit/modify resources type -->
    <PopupAddNewNationCountryResourcesType
        v-if="dialogAddNationalResourcesType"
        :dialog="dialogAddNationalResourcesType"
        :national-country-id="nationalCountryId ? nationalCountryId : 0"
        @close-dialog="closeDialogAddNewResourceType"
        :super-ssn-resource-id="superSSNResourceId ? superSSNResourceId : 0"
        :type-code-nation-geo-fence="
            typeCodeNationGeoFence ? typeCodeNationGeoFence : 'GL01'
        "
    />
</template>

<!-- Script of org-structures national congress -->
<script>
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import manageOrgGeoResourcesTypeNationalCountryHelper from "@/mixin/manage_org_structure_dept_new_features/manage_resources_types/manageOrgGeoResourcesTypeNationalCountryHelper";
import PopupAddNewNationCountryResourcesType from "./PopupAddNewDialogResourcesTypeNationCountry";
import PopEditNationCountryResourcesType from "./PopupEditGeoResourcesType.vue";
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
        PopupAddNewNationCountryResourcesType,
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
            deletedResourcesTypeNational: false,
            getNameRemoveNationData: "",
            openedEditDataResources: null,
            loadingRemovedResourceType: false,
            dialogResourceTypeEditType: false,
        };
    },
    methods: {
        close() {
            this.$emit("close-dialog");
        },
        closeEditNationalResourcesType() {
            this.dialogResourceTypeEditType = false;
        },
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
