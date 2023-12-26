<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="font-primary text-3xl  font-medium ">Create The Translate Language</h2>
            <el-button type="info" size="large" class="btn btn-primary"
                @click="$router.push('/admin/setting-languages-for-translate')">
                <div class="" v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_create' }]">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{ $t("route.routeBack") }}</span>
                </div>
            </el-button>
        </div>

        <!-- Form Submitted -->

        <form method="POST">
            <div class="select-lang card card px-6 py-6">
                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                    <div class="col-12 lg:col-12">
                        <div class="grid formgrid">

                            <!-- Select Country -->

                            <div class="col-6 field">
                                <div class="field">
                                    <label for="country" class="text-sm font-semibold">Select Language<span
                                            class="p-error">*</span></label>
                                    <div class="flex field flex-row">
                                        <Dropdown showClear v-model="selectedCountry" :options="allCountry"
                                            optionLabel="geo_english_name" filter placeholder="Select a Language"
                                            class="w-full text-sm" inputId="shopEng" aria-describedby="dd-error"
                                            @change="getCountryLangSelected">
                                            <!-- Dropdown content -->
                                        </Dropdown>
                                        <!-- Popup Select Country -->
                                        <div class="btn-color-nohover d-flex d-flex align-items-center ml-2">
                                            <div class="add-btn">
                                                <EditChangeLanguage />
                                            </div>
                                            <div class="btn-color-nohover edit-btn-lang d-flex align-items-center">
                                                <AddChangeLanguage />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Select Project Name -->

                            <div class="col-6 field" v-if="selectedCountry !== null">
                                <label for="country" class="text-sm font-semibold">Select Project Name</label>
                                <div class="flex field flex-row">
                                    <Dropdown showClear v-model="selectPageNameAddNew" :options="allProjectName"
                                        optionLabel="geo_english_name" filter placeholder="Select Project Name"
                                        class="w-full text-sm" inputId="shopEng" aria-describedby="dd-error"
                                        @click="getCountryLangSelected(selectedCountry)">
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex align-items-center">
                                                <div class="text-sm">
                                                    {{ slotProps.value?.geo_english_name ?? '' }}
                                                    ({{ slotProps.value?.geo_zip_code ?? '' }})
                                                </div>
                                            </div>
                                            <span v-else class="text-sm">
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex align-items-center text-sm">
                                                <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{
                                                    slotProps.option.geo_zip_code ?? '' }})</div>
                                            </div>
                                        </template>
                                    </Dropdown>
                                    <div class="d-flex d-flex align-items-center ml-2">
                                        <div class="add-btn">
                                            <EditProjectNameLanguage />
                                        </div>
                                        <div class="edit-btn-lang d-flex align-items-center">
                                            <AddProjectName />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Select Folder Name -->

                            <div class="col-6 field" v-if="selectPageNameAddNew !== null">
                                <label for="country" class="text-sm font-semibold">Select Folder Name</label>
                                <div class="flex field flex-row">
                                    <Dropdown showClear v-model="selectLanguageTranslatePage" :options="allFolderName"
                                        optionLabel="geo_english_name" filter placeholder="Select Folder Name"
                                        @click="getFolderNameSelected(selectPageNameAddNew)" class="w-full text-sm"
                                        inputId="shopEng" aria-describedby="dd-error">
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex align-items-center">
                                                <div class="text-sm">
                                                    {{ slotProps.value?.geo_english_name ?? '' }}
                                                    ({{ slotProps.value?.geo_zip_code ?? '' }})
                                                </div>
                                            </div>
                                            <span v-else class="text-sm">
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex align-items-center text-sm">
                                                <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{
                                                    slotProps.option.geo_zip_code ?? '' }})</div>
                                            </div>
                                        </template>
                                    </Dropdown>

                                    <div class="d-flex d-flex align-items-center ml-2">
                                        <div class="add-btn">
                                            <EditFolderNameLanguage />
                                        </div>
                                        <div class="edit-btn-lang d-flex align-items-center">
                                            <AddFolderNameLanguage />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Select Page -->

                            <div class="col-6 field" v-if="selectLanguageTranslatePage !== null">
                                <label for="country" class="text-sm font-semibold">Select Page</label>
                                <div class="flex field flex-row">
                                    <Dropdown showClear v-model="selectPageLang" :options="allPageName"
                                        optionLabel="geo_english_name"
                                        @click="getPageNameSelected(selectLanguageTranslatePage)" filter
                                        placeholder="Select a Page" class="w-full text-sm" inputId="shopEng"
                                        aria-describedby="dd-error">
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex align-items-center">
                                                <div class="text-sm">
                                                    {{ slotProps.value?.geo_english_name ?? '' }}
                                                    ({{ slotProps.value?.geo_zip_code ?? '' }})
                                                </div>
                                            </div>
                                            <span v-else class="text-sm">
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex align-items-center text-sm">
                                                <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{
                                                    slotProps.option.geo_zip_code ?? '' }})</div>
                                            </div>
                                        </template>
                                    </Dropdown>

                                    <div class="d-flex d-flex align-items-center ml-2">
                                        <div class="d-flex d-flex align-items-center">
                                            <div class="add-btn">
                                                <EditPageNameLanguage />
                                            </div>
                                            <div class="edit-btn-lang d-flex align-items-center">
                                                <AddPageName />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="px-4 py-4" v-if="selectLanguageTranslatePage !== null">
        <div class="card">
            <ShowListTranLanguage />
        </div>
    </div>
</template>
  
<script>
import AddChangeLanguage from './change_language/AddChangeLanguage.vue'
import EditChangeLanguage from './change_language/EditChangeLanguage.vue'
import ShowListTranLanguage from './ShowListLanguage.vue'
import EditProjectNameLanguage from './project_name_language/EditProjectNameLanguage.vue'
import AddProjectName from './project_name_language/AddProjectName.vue'
import EditFolderNameLanguage from './folder_name_language/EditFolderNameLanguage.vue'
import AddFolderNameLanguage from './folder_name_language/AddFolderNameLanguage.vue'
import AddPageName from './page_name_language/AddPageName.vue'
import EditPageNameLanguage from './page_name_language/EditPageNameLanguage.vue'


export default {
    components: {
        AddChangeLanguage,
        EditChangeLanguage,
        ShowListTranLanguage,
        EditProjectNameLanguage,
        AddProjectName,
        EditFolderNameLanguage,
        AddFolderNameLanguage,
        AddPageName,
        EditPageNameLanguage

    },
    props: {
        checkCountryGeoList: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            allCountry: [
                { id: 1, geo_english_name: 'Country 1' },
                { id: 2, geo_english_name: 'Country 2' },
                { id: 3, geo_english_name: 'Country 3' },
            ],
            allPageName: [
                { id: 1, geo_english_name: 'Country 1' },
                { id: 2, geo_english_name: 'Country 2' },
                { id: 3, geo_english_name: 'Country 3' },
            ],
            allFolderName: [
                { id: 1, geo_english_name: 'Country 1' },
                { id: 2, geo_english_name: 'Country 2' },
                { id: 3, geo_english_name: 'Country 3' },
            ],
            allProjectName: [
                { id: 1, geo_english_name: 'Country 1' },
                { id: 2, geo_english_name: 'Country 2' },
                { id: 3, geo_english_name: 'Country 3' },
            ],
            selectedCountry: null,
            selectPageNameAddNew: null,
            allStateCountryAddNew: [],
            countryProvinceIdOptSelected: null,
            selectLanguageTranslatePage: null,
            allFolderNamelanguage: [],
            geoDistrictSSNProvinceOptSelected: null,
            selectPageLang: null,
            allCommuneCountryByCom: [],
            ssnCommuneCodeId: null,
            inputs: [],
        };
    },
    methods: {

        addRow() {
            this.inputs.push({});
        },
        deleteRow(index) {
            this.inputs.splice(index, 1);
        },
        getCountryLangSelected() {
            const sampleProvinceData = [
                { id: 1, name: 'Province 1' },
                { id: 2, name: 'Province 2' },
                { id: 3, name: 'Province 3' },
            ];

            this.allStateCountryAddNew = sampleProvinceData;
            this.selectPageNameAddNew = null;
            this.selectedDistrict = null;
            this.allFolderNamelanguage = [];
            this.geoDistrictSSNProvinceOptSelected = null;
            this.selectPageLang = null;
            this.allCommuneCountryByCom = [];
            this.ssnCommuneCodeId = null;
        },
        getFolderNameSelected() {
            // Implement the logic to fetch the district options based on the selected province
        },
        getPageNameSelected() {
            // Implement the logic to fetch the commune options based on the selected district
        },
        getProjectNameSelected() {
            // Implement the logic to fetch the commune options based on the selected district
        },
    },
};
</script>
<style lang='scss' scoped></style>