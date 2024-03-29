import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";

export default {
    name: 'GlobalOrgEmpHelper',
    computed: {
        getOrgDeptEmpNameAssign() {
            const getOrgDepEmpName =
                this.selectedAssignEmp || this.selectedAssignEmp;
            if (!getOrgDepEmpName || getOrgDepEmpName !== null) {
                return getOrgDepEmpName?.id ??0;
            }
            return getOrgDepEmpName;
        },
    },
    created() {
        this.geoDeptOrgStrServicesPosition = new ManageOrgChartStructureGeoProjectServices();
    },
    methods: {
        submittedDialogAssignEmployeeOrgDept() {
            try {
                console.log(this.employeeAssignEdited)
               if (this.employeeAssignEdited?.department !== null || this.employeeAssignEdited?.orgDeptDateAss !== null) {
                    this.submittingPositionData = true;
                    const editOrgStrDeptFeature = {
                        assignEmpIdOrgStrChart: parseInt(this.getOrgDeptEmpNameAssign) ?? 0,
                        assignEmpOrgStrStatus: true,
                        assignEmpJonPosDate: this.employeeAssignEdited.orgDeptDateAss,
                        assignEmpOrgStrChartDeptNoted: String(this.employeeAssignEdited.descriptionNoted),
                        assignFileOrgStrDept: this.fileUploadOrg
                    }
                    this.getOrgStructFeaturesNew.assignStoreEmpDeptForOrgStructure(this.employeeAssignEdited?.deptOrgStrId, editOrgStrDeptFeature)
                    .then(async (assignEmp) => {
                        if (assignEmp?.status === 200) {
                            setTimeout(async () => {
                                this.hasErrorNewOrgStr = false
                                this.submittingPositionData = false;
                                this.$toast.add({
                                    severity: "success",
                                    summary: "Editing Org Structures Department Successfully.",
                                    detail: assignEmp.data ?.message ? assignEmp.data ?.message :  null,
                                    life: 3000,
                                });
                                this.submittingPositionData = false;
                            }, 1000);
                            // Fetching Data from org-structure Reload
                            const projectRemoveId = parseInt(assignEmp.data.result.resultStatus.project_id);
                            const countryRemoveId = parseInt(assignEmp.data.result.resultStatus.geo_country_id);
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
                }else{
                    this.$toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: "Please fill all required fields",
                        life: 3000,
                    });
                    this.hasErrorNewOrgStr = true;
                }
            } catch (error) {
                throw Error(error || error.message);
            }
        }
    },
}