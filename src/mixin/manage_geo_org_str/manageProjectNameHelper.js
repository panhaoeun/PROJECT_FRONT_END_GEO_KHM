import ManagePermissionsGeoFencePositionPermissionsServices from "@/services/administrator/geo_admin_position_manage_permissions/GeoAdminPositionPermissionsManagementServices";
import {
    mapActions,
    mapGetters
} from "vuex";

export default {
    created() {
        this.geoDeptPosOrgStrServices = new ManagePermissionsGeoFencePositionPermissionsServices();
    },
    computed: {
        ...mapGetters("orgProjectsName", ["allGeoProjectNameOrg"]),
        getAllProjectOnOrgStr() {
            return this.allGeoProjectNameOrg || [];
        },
    },
    data() {
        return {
            orgDeptStrCountryList: [],
            orgDeptBtnLoading: false,
            orgDeptReloadStrData: false,
            fetchingOrgStrDeptProject: false
        }
    },
    methods: {
        ...mapActions('orgProjectsName', ['getAllProjectBaseOrgStr']),
        submittedAddNewProjectNameOrgStr(validate) {
            this.submitted = true;
            this.loadingSubmittedAddProject = true;
            setTimeout(() => {
                this.loadingSubmittedAddProject = false;
                if (
                    this.orgDeptProjectName !== null &&
                    this.orgDeptProjectName !== ""
                ) {
                    // Get Opt Value in Selected Parent DeptId
                    const projectNameObj = this.orgDeptProjectName ? this.orgDeptProjectName : '';
                    const projectDescription = this.orgDeptProjectNoted ? this.orgDeptProjectNoted : ''

                    const addNewOptDeptByCountry = {
                        addProjectName: String(projectNameObj),
                        addProjectNoted: String(projectDescription).toLowerCase()
                    };
                    this.geoDeptPosOrgStrServices?.addNewProjectNameBaseOrgStr(
                        addNewOptDeptByCountry
                        ? addNewOptDeptByCountry
                        : []
                    )
                    .then(async (addNewProject) => {
                        if (addNewProject?.data.success === true) {
                            this.loadingSubmittedAddProject = false;
                            this.visibleDialogProjectName = false;
                            // Reload Data In Datable in Dept org-str geo-fence
                            this.fetchingDataGeoProStateOrgStr();
                            this.visibleDialogDepartment = false;
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully add new project.",
                                detail: addNewProject.data?.message
                                    ? addNewProject.data?.message
                                    : null,
                                life: 3000,
                            });
                            // Clear Data Input
                            this.orgDeptProjectName = '';
                            this.this.orgDeptProjectNoted = '';
                        }
                    })
                    .catch((error) => {
                        this.loadingSubmittedAddProject = false;
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: error?.response.data.error?.message
                                ? error?.response.data.error?.message
                                : "Please input filed position have missing value!",
                            life: 3000,
                        });
                        if (error?.response.data.error.error?.errors) {
                            for (
                                let index = 0;
                                index <
                                error.response.data.error.error?.errors
                                    .length;
                                index++
                            ) {
                                const validationError =
                                    error.response.data.error.error
                                        ?.errors[index].message ?? [];
                                this.$toast.add({
                                    severity: "error",
                                    summary: "Please Fix Below Errors.",
                                    detail: validationError
                                        ? validationError
                                        : "Please input filed position have missing value!",
                                    life: 3000,
                                });
                            }
                        }
                    });
                } else {
                    this.v$.$touch();
                    if (!validate) {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: "Please input filed position have missing value!",
                            life: 3000,
                        });
                        return false;
                    }
                }
            }, 1000);
        },
        async editGeoOrgDeptProjectStr(rowEditId) {
            this.openEditedProjectFrm = true;
            this.editPopupProjectStrData = rowEditId ? rowEditId : [];
        },
        closingPopupEditedProjectStr() {
            this.openEditedProjectFrm = false;
        },
        async submittedDialogEditGeoProjectStr(){
            try{
                if( this.projectStrGeoData?.project_name){
                    this.submittingProjectData = true;
                    const editDataGeoProjectOrg = {
                        modifyProjectName: this.projectStrGeoData?.project_name,
                        modifyProjectStatus: 'Active',
                        modifyProjectNoted: this.projectStrGeoData?.project_noted
                    }
                    this.geoDeptPosOrgStrServices.modifyProjectNameOfStrOrg(this.projectStrGeoData?.id, editDataGeoProjectOrg)
                     .then(async (editProject) => {
                         if (editProject?.status === 200) {
                             setTimeout(async () => {
                                 this.hasProvinceErrors = false
                                 this.submittingProjectData = false;
                                 this.$notify({
                                     title: 'Editing Project Successfully',
                                     message: editProject.data ?.message ? editProject.data?.message : '',
                                     type: 'success'
                                 });
                                 await this.fetchingDataGeoProStateOrgStr();
                                 this.submittingProjectData = false;
                             }, 1000);
                         }
                         if (!this.hasProvinceErrors) {
                             this.$emit('close')
                         }
                     }).catch((error) => {
                         let message = error?.message;
                         this.setToastError(message);
                         this.$notify({
                             title: 'Unsuccessfully updated geo project',
                             message: error?.message ? error?.message : '',
                             type: 'error'
                         });
                         this.submittingProjectData = false;
                     });
                }
            }catch(error){
                return Promise.reject(error);
            }
        },
        async confirmDeletedGeoProjectName(delProId){
            this.deletedGeoProjectDialogs = true;
            this.deletedDialogDataProjectId = parseInt(delProId?.id) ? parseInt(delProId?.id) : 0;
        },
        async confirmDeletedProjectById() {
            const projectIdRemove = parseInt(this.deletedDialogDataProjectId) ? parseInt(this.deletedDialogDataProjectId) : 0;
            this.geoDeptPosOrgStrServices.removeProjectNameOfStrOrg(projectIdRemove).then(async (projects) => {
                if(projects?.status === 200){
                    this.deletedGeoProjectDialogs = false;
                    this.$toast.add({
                        severity: "success",
                        summary: "Successfully add new department province or state.",
                        detail: projects.data?.message ? projects.data?.message :  null,
                        life: 3000,
                    });
                    await this.fetchingDataGeoProStateOrgStr();
                }
                return projects ? projects : [];
            }).catch((error) => {
                this.$toast.add({
                    severity: "error",
                    summary: "Please Fix Below Errors.",
                    detail: error?.message ? error?.message : "Please input filed position have missing value!",
                    life: 3000,
                });
                return Promise.reject(error?.message || []);
            });
            this.ajaxDeleting = 0
        },
        async fetchingDataGeoProStateOrgStr() {
            this.fetchingOrgStrDeptProject = true;
            try {
                this.getAllProjectBaseOrgStr();
                this.fetchingOrgStrDeptProject = false;
            } catch (e) {
                return Promise.reject(e);
            }
        }
    },
}