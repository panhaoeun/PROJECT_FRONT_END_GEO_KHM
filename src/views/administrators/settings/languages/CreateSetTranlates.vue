<template>
    <div class="layout-content px-4 py-4">
        <div class="languages">
            <div class="flex justify-content-between my-4 px-2 py-2">
                <h2 class="font-primary text-3xl font-medium">Languages Translate</h2>
            </div>

            <div class="card card">
                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                    <div class="col-12 lg:col-12">
                        <div class="col-12 d-flex justify-content-end mb-5">
                            <el-button type="info" size="large" class="btn btn-primary add-new-btn"
                                @click="$router.push('/admin/setting-languages-for-translate/create-translate')">
                                <div class=""
                                    v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_create' }]">
                                    <i class="pi pi-plus"></i>
                                    <span class="pl-2">
                                        Create New
                                    </span>
                                </div>
                            </el-button>
                        </div>
                        <!-- Country List -->
                        <div class="row mb-4">
                            <div class="col-lg-3 col-md-6 mb-3">
                                <ChangeLanguage />
                            </div>
                            <div class="col-lg-3 col-md-6 mb-3">
                                <LanguageNameLanguage />
                            </div>
                            <div class="col-lg-3 col-md-6 mb-3">
                                <ProjectNameLanguage />
                            </div>
                            <div class="col-lg-3 col-md-6 mb-3">
                                <FolderNameLanguage />
                            </div>
                            <div class="col-lg-3 col-md-6 mb-3">
                                <PageNameLanguage />
                            </div>
                        </div>
                        <div class="col-12 d-flex justify-content-end p-0">
                            <Button class="ml-2 add-new-btn" label="Filter" @click="select_category = true" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 p-0">
                <div class="card">
                    <ShowListLanguage />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import ChangeLanguage from './change_language/ChangeLanguage.vue';
import ProjectNameLanguage from './project_name_language/ProjectNameLanguage.vue';
import FolderNameLanguage from './folder_name_language/FolderNameLanguage.vue';
import PageNameLanguage from './page_name_language/PageNameLanguage.vue';
import LanguageNameLanguage from './Language_name_language/LanguageNameLanguage.vue';
import ShowListLanguage from './ShowListLanguage.vue';

export default {
    components: {
        ChangeLanguage,
        ProjectNameLanguage,
        FolderNameLanguage,
        PageNameLanguage,
        ShowListLanguage,
        LanguageNameLanguage
    },

    data() {
        return {
            select_country: false,
            project_name: false,
            select_page: false,
            select_category: false,
            sublang: false,
            value: null,
            view_select_country: false,
            view_project_name: false,
            view_list_page: false,
            view_list_category: false,
            products: null,
            DataTable,
            Column,
            Dialog,
            projectName: '',
            title: '',
            description: '',
            deslang: '',
            descate: '',
            despage: '',
            countrycode: '',
        };
    },

    methods: {
        handleClick(event) {
            event.preventDefault(); // Prevent the default link behavior

            // Navigate to the desired URL
            window.location.href = "/admin/setting-languages-for-translate/create-translate";

            // Add your desired action here
            console.log("Create New link clicked!");
        },
    },
};
</script>
  
<style>
.project-input .card {
    border: none;
    box-shadow: none;
}

.add-btn-translate {
    border-radius: 8px;
    width: 10px !important;
}

.add-new-btn {
    width: 180px !important;
}

.country-padding span {
    padding: 5px;
}
</style>