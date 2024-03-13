import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
import { mapActions, mapGetters } from "vuex";
import ManagePermissionsRoleBaseProject from "@/services/vendors/user_permissions/ManagePermissionRoleProjects";
import geoGlobalOrgStrLocationHelper from "@/mixin/getGeoGlobalOrgStrLocationHelper";

export default {
    mixins: [geoGlobalOrgStrLocationHelper],
    computed: {
        // Org-Chart Name
        getOrgChartDeptNameCompanyPro() {
            const getDeptCompanyName =
                this.selectedProject || this.selectedProject;
            if (!getDeptCompanyName || getDeptCompanyName !== null) {
                return getDeptCompanyName?.project_name ?? 'No Department Name';
            }
            return getDeptCompanyName;
        },
        getOrgChartDeptCountryName() {
            const getCountryName =
                this.selectedCountryOptOrgStr || this.selectedCountryOptOrgStr;
            if (!getCountryName || getCountryName !== null) {
                return getCountryName?.geo_english_name ?? 'No Department Name';
            }
            return getCountryName;
        },
        // Org-Chart Id 
        getDeptOrgCompanyId() {
            const getProjectCom = this.selectedProject || this.selectedProject;
            if (getProjectCom !== null) {
                return parseInt(getProjectCom?.id) ? parseInt(getProjectCom?.id) : 0;
            }
            return 1;
        },
        getOrgDeptCountNationSuperId() {
            const getProjectCountry = this.selectedCountryOptOrgStr || this.selectedCountryOptOrgStr;
            if (getProjectCountry !== null) {
                return getProjectCountry.geo_ssn_location ? getProjectCountry.geo_ssn_location : 0;
            }
            return 0;
        },
        
        // Parent Id 
        parentOrgDeptCompanyProjectGlobal() {
            const getSuperComParentOrgId = this.selectedParentDeptOrgStrProject;
            let deptParentOrgStrIdDept;
            if (
                getSuperComParentOrgId !== null ||
                (getSuperComParentOrgId !== undefined && typeof getSuperComParentOrgId !== "object")
            ) {
                const getOrgMgtBoardPro = getSuperComParentOrgId ? getSuperComParentOrgId : {};
                const keyValId = Object.keys(getOrgMgtBoardPro)[0];
                deptParentOrgStrIdDept = keyValId.split(/[,-]+/).pop();
            }
            return deptParentOrgStrIdDept ? deptParentOrgStrIdDept : '';
        },
        // Hierarchy Org-Structure Chart
        ...mapGetters("orgStrDeptPosGeo", ["allOrgBoardHierarchyStructure"]),
        getAllOrgStructureFeaturesGeoCompany() {
            const getOrgOrgDeptCompanyId = this.selectedProject;
            if (
                getOrgOrgDeptCompanyId !== null ||
                (getOrgOrgDeptCompanyId !== undefined && typeof getOrgOrgDeptCompanyId !== "object")
             ) {
                return this.allOrgBoardHierarchyStructure || [];
            }
        },
        getAllOrgStructuresFeatureGeoNationCongress() {
            const getOrgOrgDeptCompanyId = this.selectedProject;
            if (
                getOrgOrgDeptCompanyId !== null ||
                (getOrgOrgDeptCompanyId !== undefined && typeof getOrgOrgDeptCompanyId !== "object")
            ) {
                return this.allOrgBoardHierarchyStructure || [];
            }
        },
    },
    created() {
        this.getOrgStructFeaturesNew = new ManageOrgChartStructureGeoProjectServices();
        this.manageRoleBaseProject = new ManagePermissionsRoleBaseProject();
    },
    data() {
        return {
            selectedParentDeptOrgStrProject: null,
            getEmpDataOrgDept: []
        }
    },
    mounted() {
        // Get Project Company
        this.getOrgAllProjectCompany();
        this.getEmployeeMainBaseOrgStructures();
    },
    methods: {
        ...mapActions("geoCountry", ["getAllCountryActions"]),
        ...mapActions("geoProvince", ["getAllProvinceActions"]),
        ...mapActions("geoDistrict", ["getAllDistrictActions"]),
        ...mapActions("geoCommune", ["getAllCommuneActions"]),
        ...mapActions("geoVillages", ["getAllVillagesActions"]),
        // Hierarchy Org-Structure Level 1 : Country -> Province/ State -> District -> Commune -> Village
        ...mapActions("orgStrDeptPosGeo", [
            "setDepartmentDataByCountryProjectId",
        ]),
        // Get Employee Main 
        getEmployeeMainBaseOrgStructures(){
            this.getOrgStructFeaturesNew
                .listStoreEmpOrgDept()
                .then((emp) => {
                    if (!Array.isArray(emp) || !emp.length > 0) {
                        this.$toast.add({
                            summary: 'Error entires employee base org-structures',
                            detail: emp.data?.message ?? '',
                            severity: 'success'
                        });
                    }
                    if (
                        !Array.isArray(emp) ||
                        emp !== undefined ||
                        emp !== null
                    ) {
                        this.getEmpDataOrgDept = emp ? emp : "";
                    }
                });
        },
        /**
         *Org-Structures Board Management Interface
         ***/
        // Get all Org Structures base company all relist hierarchy 
        getOrgAllProjectCompany() {
            this.manageRoleBaseProject.getAllProject().then((project) => {
                try {
                    if (!Array.isArray(project) || !project.length > 0) {
                        this.optProjectDeptOrgStrAll = [];
                    }
                    if (
                        !Array.isArray(project) ||
                        project !== undefined ||
                        project !== null
                    ) {
                        this.optProjectDeptOrgStrAll = project ? project : [];
                    }
                } catch (error) {
                    throw Error(error || error.message)
                }
            });
        },
        /**
         * Prepare On Change event Selected Company or Geo-fence
        **/
        // Selected base on Company
        onChangeGetAllProjectCompany() {
            try {
                if (
                    !Array.isArray(this.selectedCountryOptOrgStr) ||
                    this.selectedCountryOptOrgStr !== undefined ||
                    this.selectedCountryOptOrgStr !== null &&
                    this.selectedProject !== null &&
                    !Array.isArray(this.selectedProject)
                ) {
                    this.hideOrgStructureDeptCompany = "T0";
                    this.selectedCountryOptOrgStr = null;
                    /**
                     * @Org - Strictures Manage
                    **/ 
                    const getProjectId = this.getDeptOrgCompanyId ?
                        this.getDeptOrgCompanyId:
                        0;
                    const getCountryId = 0;
                    const typeHierarchy = "Project";
                    this.getReloadOrgChartByDeptGeoProject(
                        getProjectId,
                        getCountryId,
                        typeHierarchy
                    );
                    // Selected Projects
                    this.getGeoLocationCountryOrgStr();
                }
            } catch (error) {
                throw Error(error || error.message)
            }
        },
        // Get all Org Structures base on country all relist hierarchy 
        onChangeGetAllNationCountryCongress() {
            try {
                if (
                    !Array.isArray(this.selectedCountryOptOrgStr) ||
                    this.selectedCountryOptOrgStr !== undefined ||
                    this.selectedCountryOptOrgStr !== null &&
                    this.selectedProject !== null &&
                    !Array.isArray(this.selectedProject)
                ) {
                    this.hideOrgStructureDeptCompany = "T1";
                    // /**
                    //  * @Org - Strictures Manage
                    //  **/
                    // // Get Country
                    const getProjectId = this.getDeptOrgCompanyId ?
                        this.getDeptOrgCompanyId :
                        0;
                    const getCountryId = this.getCountryOfGeoLocationOrgStr;
                    const typeHierarchy = "GeoFence";
                    this.getReloadOrgChartByDeptGeoProject(
                        getProjectId,
                        getCountryId,
                        typeHierarchy
                    );
                }
            } catch (error) {
                throw Error(error || error.message)
            }
        },
        /**
         * @Remove all org - structures hierarchies
        * */ 
        async removedOrgChartHierarchy(id) {
            try{
                this.loadingOrgStructuresRemoved = true;
                setInterval(() => {
                    this.loadingOrgStructuresRemoved = false;
                    this.deletedDialogLevelRootMgt = false;
                    const orgStrId = parseInt(id) ? parseInt(id) : 0;
                    this.getOrgStructFeaturesNew.removeNewOrgStructureGeoProjectGeo(orgStrId).then(async (orgStr) => {
                        if(orgStr?.status === 200){
                            this.isOpenDialogEditRemoveOrgStr = false;
                            this.loadingOrgStructuresRemoved = false;
                           this.$toast.add({
                                summary: 'Delete Org-Structure Successfully',
                                detail: orgStr.data?.message ?? '',
                                severity: 'success'
                            });
                            // Fetching Data from org-structure
                            const projectRemoveId = parseInt(orgStr.result.resultStatus.project_id);
                            const countryRemoveId = parseInt(orgStr.result.resultStatus.geo_country_id);
                            this.getReloadOrgChartByDeptGeoProject(projectRemoveId, countryRemoveId);
                        }
                    }).catch((error) => {
                        this.$toast.add({
                            severity: "error",
                            summary: "Unsuccessfully updated org-structures.",
                            detail: error?.message ? error?.message : '',
                            life: 3000,
                        });
                        throw Error(error || error.message)
                    });
                }, 1500);
            }catch(error){
                throw Error(error.message ? error.message : error);
            }
        },
        /**
         * @Submitted Actions for Multiple
         * */ 
        async submittedDialogEditGeoProjectStr() {
            try {
               if( this.editOrgStrData?.department){
                    this.submittingOrgStrData = true;
                    const editOrgStrDeptFeature = {
                        modifySuperOrgStrChartId: this.parentOrgDeptCompanyProjectGlobal ? this.parentOrgDeptCompanyProjectGlobal : 0,
                        modifyOrgChartStrEnglishName: String(this.editOrgStrData?.department).toString(),
                        modifyOrgChartStrKhName: String(this.editOrgStrData?.departmentKH).toString(),
                        modifyCheckOrgStatus: true,
                        modifyOrgChartNotedStructure: String(this.editOrgStrData?.descriptionNoted).toString()
                    }
                    this.getOrgStructFeaturesNew.modifyNewOrgStructureGeoProjectGeo(this.editOrgStrData?.deptOrgStrId, editOrgStrDeptFeature)
                    .then(async (orgStr) => {
                        if (orgStr?.status === 200) {
                            setTimeout(async () => {
                                this.hasErrorNewOrgStr = false
                                this.submittingOrgStrData = false;
                                this.$toast.add({
                                    severity: "success",
                                    summary: "Editing Org Structures Department Successfully.",
                                    detail: orgStr.data ?.message ? orgStr.data ?.message :  null,
                                    life: 3000,
                                });
                                this.submittingOrgStrData = false;
                            }, 1000);
                            // Fetching Data from org-structure Reload
                            const projectRemoveId = parseInt(orgStr.data.result.resultStatus.project_id);
                            const countryRemoveId = parseInt(orgStr.data.result.resultStatus.geo_country_id);
                            console.log(orgStr.data.result.resultStatus.project_id)
                            this.getReloadOrgChartByDeptGeoProject(projectRemoveId, countryRemoveId);
                            // Closed Org-Strictures
                            if (!this.hasErrorNewOrgStr) {
                                this.$emit('close')
                            }
                        }
                    }).catch((error) => {
                        this.$toast.add({
                            severity: "error",
                            summary: "Unsuccessfully updated org-structures department.",
                            detail: error?.message ? error?.message : '',
                            life: 3000,
                        });
                        this.submittingOrgStrData = false;
                    });
                }
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        /**
         * @Get reload data organization - chart
         * */ 
        async getReloadOrgChartByDeptGeoProject(projectId, countryId, typeHierarchyGeoProject) {
            const getProjectId = projectId ?
                projectId :
                0;
            const getCountryId = countryId ?
                countryId :
                0;
            const typeHierarchy = typeHierarchyGeoProject ? typeHierarchyGeoProject : "GeoFence";
            this.setDepartmentDataByCountryProjectId({
                getProjectId,
                getCountryId,
                typeHierarchy
            });
        },

    }
}