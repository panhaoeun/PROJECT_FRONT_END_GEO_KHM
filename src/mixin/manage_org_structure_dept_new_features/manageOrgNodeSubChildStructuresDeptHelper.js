import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
import {
    mapActions
} from "vuex";
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
            const getSuperParentOrgNodeId = this.treeOrgChartNodeAssignSubNode;
            let deptParentOrgStrId;
            if (
                getSuperParentOrgNodeId !== null ||
                (getSuperParentOrgNodeId !== undefined && typeof getSuperParentOrgNodeId !== "object")
            ) {
                const getOrgKetSplit = getSuperParentOrgNodeId?.key ? getSuperParentOrgNodeId?.key : {};
                const keyValNodeOrg = Object.keys(getOrgKetSplit)[0];
                deptParentOrgStrId = keyValNodeOrg.split(/[,-]+/).pop();
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
        submittedAddDialogsAddNodeOrgStructuresSubChild(validate) {
            try {
                this.loadingBtnOrgAddNode = true;
                this.submitted = true;
                setTimeout(() => {
                    this.loadingBtnOrgAddNode = false;
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
                        this.addNewEmpRootNodeEng === undefined
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
                        typeof this.addNewEmpRootNodeEng !== "object"
                    ) {
                        const {
                            deptOrgStrSubId,
                            deptOrgStrGeoCountryId,
                            orgDeptLevel,
                            deptOrgStrProjectId
                        } = this.treeOrgChartNodeAssignSubNode || null;
                        if (deptOrgStrSubId == null || this.treeOrgChartNodeAssignSubNode === undefined && this.treeOrgChartNodeAssignSubNode === null) {
                            this.$toast.add({
                                severity: "error",
                                summary: "Please selected root node to add new sub node",
                                life: 3000,
                            });
                            return false;
                        }
                        const idAddNodeCountry = parseInt(deptOrgStrGeoCountryId) ? parseInt(deptOrgStrGeoCountryId) : 0;
                        const levelTypeOrgNode = String(orgDeptLevel).toString() ? String(orgDeptLevel).toString() : 'SL00';
                        const idAddNodeProjectCompany = parseInt(deptOrgStrProjectId) ? parseInt(deptOrgStrProjectId) : 1;
                        let checkTypeOrgNode;
                        switch (idAddNodeCountry > 0 && idAddNodeProjectCompany > 0) {
                            case 'Projects':
                                checkTypeOrgNode = 'Projects';
                            break;
                            case 'GeoFence':
                                checkTypeOrgNode = 'GeoFence';
                            break;
                            default:
                                checkTypeOrgNode = "GeoFence"
                                break;
                        }

                        const addNewObjAddNodeTreeOrgStr = {
                            addNewSuperDeptOrgStrIdBySelectedParent: String(deptOrgStrSubId).toString() ? String(deptOrgStrSubId).toString() : 0,
                            addNewOrgChartLevel: levelTypeOrgNode ? levelTypeOrgNode :  'SL00',
                            addNewOrgChartProId: idAddNodeProjectCompany ? idAddNodeProjectCompany : 0,
                            addNewOrgChartCountryId: idAddNodeCountry ? idAddNodeCountry : 0,
                            addNewOrgChartStrKhmerName: String(this.addNewEmpRootNodeKhmer).toString() ? String(this.addNewEmpRootNodeKhmer).toString() : '',
                            addNewOrgChartStrEnglishName: String(this.addNewEmpRootNodeEng).toString() ? String(this.addNewEmpRootNodeEng).toString() : '',
                            addNewOrgChartStrNoted: String(this.descriptionDeptEmpRootNode).toString() ? String(this.descriptionDeptEmpRootNode).toString() : ''
                        }
                        this.orgStructureChartHierarchy?.createNewOrgStructureGeoProjectGeo(
                                addNewObjAddNodeTreeOrgStr ?
                                addNewObjAddNodeTreeOrgStr:
                                []
                            ).then((orgStr) => {
                                this.loadingBtnOrgAddNode = false;
                                this.submitted = false;
                                // Reload Data In Datable in Dept add node org-str root level
                                this.getReloadOrgChartByDeptGeoAddNodeSub(idAddNodeCountry, idAddNodeProjectCompany, checkTypeOrgNode);
                                this.visibleDialogDepartment = false;
                                this.$toast.add({
                                    severity: "success",
                                    summary: "Successfully add node of org-structures chart.",
                                    detail: String(orgStr.data?.message) ?? null,
                                    life: 3000,
                                });
                                // Clear Data Input Add Node Org-Structures
                                this.addNewEmpRootNodeKhmer = '';
                                this.addNewEmpRootNodeEng = '';
                                this.descriptionDeptEmpRootNode = '';
                                this.close();
                            })
                            .catch((error) => {
                                this.$toast.add({
                                    title: 'Unsuccessfully add node of org-structures chart',
                                    message: String(error || error.message),
                                    severity: 'error',
                                    life: 3000,
                                });
                                this.loadingBtnOrgAddNode = false;
                            });
                    }
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        // Get reload data organization-chart
        async getReloadOrgChartByDeptGeoAddNodeSub(projectId, countryId, typeHierarchyGeoProject) {
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