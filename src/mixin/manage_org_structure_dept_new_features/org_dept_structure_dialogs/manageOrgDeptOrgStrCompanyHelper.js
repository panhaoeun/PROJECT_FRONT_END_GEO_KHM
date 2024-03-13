import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
import { mapActions } from "vuex";
export default {
    data() {
        return {
            dialogOpenOrgStrChartCompany: false,
            dialogOpenEditOrgStrChartCompany: false,
        }
    },
    created() {
        this.orgStructureChartHierarchy = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        parentOrgStrCompanyId() {
            const getSuperParentOrgId = this.selectedParentDeptOrgStr;
            console.log(getSuperParentOrgId)
            let deptParentOrgStrId;
            if (
                getSuperParentOrgId !== null ||
                (getSuperParentOrgId !== undefined && typeof getSuperParentOrgId !== "object")
            ) {
                const getOrgMgtBoard = getSuperParentOrgId ? getSuperParentOrgId : {};
                const keyValId = Object.keys(getOrgMgtBoard)[0];
                deptParentOrgStrId = keyValId.split(/[,-]+/).pop();
            }
            return deptParentOrgStrId ? deptParentOrgStrId : 0;
        }
    },
    methods: {
        // Hierarchy Org-Structure Level 1 : Country -> Province/ State -> District -> Commune -> Village
        ...mapActions("orgStrDeptPosGeo", [
            "setDepartmentDataByCountryProjectId",
        ]),
        /**
         * Org-Structure Organization Chart Company
         **/
        closeOpenDialogAddNewOrgStrCompany() {
            this.dialogOpenOrgStrChartCompany = false;
        },
        closeOpenDialogEditOrgStrCompany() {
            this.dialogOpenEditOrgStrChartCompany = false;
        },
        openDialogsAddNewOrgStructure() {
            this.dialogOpenOrgStrChartCompany = true;
        },
        openEditOrgStructureCompany() {
            this.dialogOpenEditOrgStrChartCompany = true;
        },
        /**
         * Org-Structure Organization Chart Nation Configuration
         **/
        submittedAddDialogsCompanyProject(validate) {
            try {
                this.loadingBtnOrgCompany = true;
                this.submitted = true;
                setTimeout(() => {
                    this.loadingBtnOrgCompany = false;
                    /**
                     * @Access add new root node to the org-structure
                     * */
                    this.v$.$touch();
                    /**
                     * @Validations org-structured new node root
                     * */
                    if (!validate) {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: "Please input filed add new root node!",
                            life: 3000,
                        });
                        return;
                    }
                    if (
                        (this.addNewEmpRootNodeEng == null &&
                            this.addNewEmpRootNodeEng == null) ||
                        this.addNewEmpRootNodeEng === undefined &&
                        this.companyId < 0
                    ) {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: "Please input filed add node root level!",
                            life: 3000,
                        });
                        return false;
                    }
                    if (
                        this.addNewEmpRootNodeEng !== null &&
                        this.addNewEmpRootNodeEng !== undefined &&
                        this.companyId > 0 ||
                        typeof this.addNewEmpRootNodeEng !== "object"
                    ) {
                        const addNewObjRootTreeOrgStr = {
                            addNewSuperDeptOrgStrIdBySelectedParent: this.parentOrgStrCompanyId ? this.parentOrgStrCompanyId : 0,
                            addNewOrgChartLevel: 'SL00',
                            addNewOrgChartProId: parseInt(this.companyId) ? parseInt(this.companyId) : 0,
                            addNewOrgChartCountryId: 0,
                            addNewOrgChartStrKhmerName: String(this.addNewEmpRootNodeKhmer).toString() ? String(this.addNewEmpRootNodeKhmer).toString() : '',
                            addNewOrgChartStrEnglishName: String(this.addNewEmpRootNodeEng).toString() ? String(this.addNewEmpRootNodeEng).toString() : '',
                            addNewOrgChartStrNoted: String(this.descriptionDeptEmpRootNode).toString() ? String(this.descriptionDeptEmpRootNode).toString() : ''
                        }
                        this.orgStructureChartHierarchy?.createNewOrgStructureGeoProjectGeo(
                            addNewObjRootTreeOrgStr
                            ? addNewObjRootTreeOrgStr
                            : []
                        ).then((orgStr) => {
                            this.loadingBtnOrgCompany = false;
                            this.submitted = false;
                            // Reload Data In Datable in Dept org-str root level
                            const typeHierarchyOrg = "Project";
                            const orgCountryId = 0;
                            const orgCompanyId = parseInt(this.companyId) ? parseInt(this.companyId) : 0;
                            this.getReloadOrgChartByDeptGeoCompanyChart(orgCountryId, orgCompanyId, typeHierarchyOrg);
                            this.visibleDialogDepartment = false;
                            this.$toast.add({
                                severity: "success",
                                summary: "Successfully add new company org-structure.",
                                detail: orgStr.data?.message ??  null,
                                life: 3000,
                            });
                            // Clear Data Input
                            this.addNewEmpRootNodeKhmer = '';
                            this.addNewEmpRootNodeEng = '';
                            this.descriptionDeptEmpRootNode = '';
                            this.close();
                        })
                        .catch((error) => {
                            this.$toast.add({
                                title: 'Unsuccessfully add new company org-structures',
                                message:error?.message ? error?.message : '',
                                severity: 'error',
                                life: 3000,
                            });
                            this.loadingBtnOrgCompany = false;
                        });
                    }
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        // Get reload data organization-chart
        async getReloadOrgChartByDeptGeoCompanyChart(projectId, countryId, typeHierarchyGeoProject) {
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