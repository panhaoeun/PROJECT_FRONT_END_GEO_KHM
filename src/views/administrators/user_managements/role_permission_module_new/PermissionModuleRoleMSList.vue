<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Organization Chart Of Geo-fence
            </h2>
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click.prevent="
                    $router.push('/admin/manage-user-org-chat-geo-khm-add-new')
                "
                v-permission="[
                    {
                        functionName: 'location_ms_system_module',
                        moduleName: 'fun_create',
                    },
                ]"
            >
                <div class="button">
                    <i class="pi pi-plus" style="font-size: 1rem"></i>
                    <span class="pl-2">Add New Org-Structure</span>
                </div>
            </el-button>
        </div>
        <div class="gird">
            <!-- Button Group Filter Projects -->
            <div class="col-12">
                <el-card slot="header" class="box-card">
                    <div class="formgrid grid">
                        <!-- Manages Destination Base Org.Str (Board Mgt Projects) -->
                        <div class="col-6 lg:col-6 field">
                            <label for="name_en" class="text-sm font-semibold"
                                >Projects</label
                            >
                            <div class="flex field flex-row">
                                <Dropdown
                                    showClear
                                    v-model="selectedProject"
                                    :options="optProjectByPermissionList"
                                    optionLabel="project_name"
                                    placeholder="Select a projects"
                                    class="w-full text-sm"
                                    inputId="project_name"
                                    aria-describedby="dd-error"
                                    filter
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    slotProps.value
                                                        ?.project_name ?? ""
                                                }}
                                            </div>
                                        </div>
                                        <span v-else class="text-sm">
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div
                                            class="flex align-items-center text-sm"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    slotProps.option
                                                        ?.project_name ?? ""
                                                }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <!--Manage Org-Structures(Designation) List-->
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <!-- Manage Org-Structures(Board Manager Project) -->
                    <manage-org-structures-of-board-mgt-project />
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Data Tables -->
<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import ManagePermissionsRoleBaseProject from "@/services/vendors/user_permissions/ManagePermissionRoleProjects";
/**
 * @Managements of Org.Str -> Org-str Board Mgt (Manage Org (Designation Org.Structures => Positions))
 * */
import ManageOrgStructuresOfBoardMgtProject from "./manage_org_strictures/ManageOrgStructuresOfBoardMgtProject.vue";

export default {
    components: {
        ManageOrgStructuresOfBoardMgtProject,
        // ManageAssignOrgChartBaseOnMgtGeo
    },
    data() {
        return {
            loadingDataRolesProject: false,
            loadingBtnFilter: false,
            selectedPermissions: null,
            optProjectByPermissionList: [],
            selectedProject: null,
            envAppPATH: process.env.VUE_APP_PATH_FILE,
            currentRoleId: 1,
            dialogLoading: false,
            dialogVisible: false,
            permissionsID: "",
            projectPermissionRole: [],
            moduleDetailsByPermId: [],
            statusPermissionsSwitch: false,
            deletePermissionsDialog: false,
            product: "",
            selectedRolesList: "",
            filtersPermRole: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                role_name: {
                    operator: FilterOperator.AND,
                    constraints: [
                        { value: null, matchMode: FilterMatchMode.IN },
                    ],
                },
            },
            checkStrictly: false,
            routesModulesPerm: [],
            routesModule: [],
            moduleDetailRoutes: [],
            checkOut: false,
            selection: {},
        };
    },
    computed: {},
    created() {
        this.permissionRoleProject = new ManagePermissionsRoleBaseProject();
    },
    mounted() {
        this.getAllProjectObj();
    },
    methods: {
        /**
         * @Handle Filter role base on project
         * */
        filterProjectFindAllRole() {
            this.loadingBtnFilter = true;
            this.loadingDataRolesProject = true;
            setTimeout(() => {
                this.loadingDataRolesProject = false;
                this.loadingBtnFilter = false;
                // Filters Role By Project
                let dataFilter = this.selectedProject?.id
                    ? this.selectedProject?.id
                    : 0;
                if (!this.selectedProject) {
                    this.$notify.error({
                        title: "Please select project",
                        showClose: true,
                    });
                }
                if (this.selectedProject !== "") {
                    this.permissionRoleProject
                        .getAllRolesBaseProject(dataFilter)
                        .then((project) => {
                            try {
                                console.log(project?.tbl_roles);
                                if (
                                    !Array.isArray(project) ||
                                    !project.length > 0
                                ) {
                                    this.projectPermissionRole = [];
                                }
                                if (
                                    !Array.isArray(project) ||
                                    project !== undefined ||
                                    project !== null
                                ) {
                                    this.projectPermissionRole =
                                        project?.tbl_roles
                                            ? project?.tbl_roles
                                            : [];
                                }
                            } catch (error) {
                                return Promise.reject(error);
                            }
                        });
                }
            }, 1000);
        },
        getAllProjectObj() {
            this.permissionRoleProject.getAllProject().then((project) => {
                try {
                    if (!Array.isArray(project) || !project.length > 0) {
                        this.optProjectByPermissionList = [];
                    }
                    if (
                        !Array.isArray(project) ||
                        project !== undefined ||
                        project !== null
                    ) {
                        this.optProjectByPermissionList = project
                            ? project
                            : "";
                    }
                } catch (error) {
                    return Promise.reject(error);
                }
            });
        },
    },
};
</script>
