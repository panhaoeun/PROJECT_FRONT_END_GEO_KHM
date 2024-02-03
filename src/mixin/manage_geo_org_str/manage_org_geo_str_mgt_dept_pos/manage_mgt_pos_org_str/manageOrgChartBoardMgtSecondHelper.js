import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    created() {
        this.serviceManageStructuresProject = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        ...mapGetters("orgStrDeptPosGeo", ["allOrgBoardDeptStructureChart"]),
        getAllDeptOrgStrMgtOrg() {
            return this.allOrgBoardDeptStructureChart || [];
        },
    },
    methods: {
        ...mapActions('orgStrDeptPosGeo', ['getAllGeoPositionDeptManageChart']),
        /**
         * @Manage Organization - Structure Chart
        **/ 
        async getGloAllOrgStructureOptSelectedMultiChild(orgLevel, orgCountry, orgProjectId){
            console.log(orgLevel, orgCountry, orgProjectId)
        },  
        // Manage Org-structure and update data to Geo Projects table
        async submittedAddOrgSecondLevelOfProject() {
            try {
                this.loadingSubmittedAddMgtBoardStrOrg = true;
                this.submitted = true;
                setTimeout(async () => {
                    const getOptSelectedProId = parseInt(this.deptProjectIdAddNew) ? parseInt(this.deptProjectIdAddNew) : 0;
                    const optSelectedRootLevel = this.secondBoardMgtLevelParentLevelId  ? this.secondBoardMgtLevelParentLevelId : 0;
                    if (!optSelectedRootLevel || optSelectedRootLevel < 0 || typeof optSelectedRootLevel !== 'number' || optSelectedRootLevel !== 0){
                        this.optSelectedRootLevel = 0;
                        this.$toast.add({
                            severity: "error",
                            summary: "Please selected root-level in required.",
                            detail: "Please input filed root-level have missing value!",
                            life: 3000
                        });
                        return false;
                    }
                    if (!getOptSelectedProId || getOptSelectedProId <0 || typeof getOptSelectedProId !== 'number') {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please selected projected in required.",
                            detail: "Please input filed district have missing value!",
                            life: 3000
                        });
                        return false;
                    }
                    if (!this.orgStrBoardMgtEnglishName || this.orgStrBoardMgtEnglishName !== null && this.orgStrBoardMgtEnglishName !== '') {
                        const addNewOrgStrMgtPosDept = {
                            addNewSuperDeptOrgStrIdBySelectedParent: String(this.orgStrBoardMgtEnglishName),
                            addNewMgrDeptOrgStrId: optSelectedRootLevel ? optSelectedRootLevel : 0,
                            addNewOrgChartLevel: 'SL02',
                            addNewOrgChartProId: getOptSelectedProId ? getOptSelectedProId : 0,
                            addNewOrgChartCountryId: this.deptCountryId ? this.deptCountryId : 0,
                            addNewOrgChartStrKhmerName: String(this.orgStrBoardMgtEnglishName) ? String(this.orgStrBoardMgtEnglishName) : '',
                            addNewOrgChartStrEnglishName: String(this.orgStrBoardMgtKhmerName) ? String(this.orgStrBoardMgtKhmerName) : '',
                            addNewOrgChartStrNoted: String(this.descriptionOrgStrBoardMgt) ? String(this.descriptionOrgStrBoardMgt) : ''
                        }
                        // Add New Organization Chart Root Level Info
                        this.serviceManageStructuresProject?.createNewOrgStructureGeoProjectGeo(
                            addNewOrgStrMgtPosDept
                            ? addNewOrgStrMgtPosDept
                            : []
                        )
                        .then(async (addOrgStr) => {
                            if (addOrgStr?.data.success === true) {
                                this.loadingSubmittedAddMgtBoardStrOrg = false;
                                this.visibleDialogOrgStrBoardMgt = false;
                                // Reload Data In Datable in Dept org-str root level
                                const orgLevelDeptBoard = "SL02";
                                const rogLevelDeptBoardCountry = this.deptCountryId ? this.deptCountryId : 0;
                                const orgLevelDeptBoarProId = getOptSelectedProId ? getOptSelectedProId : 0;
                                this.fetchingDataGeoOrgSecondChartStructure(orgLevelDeptBoard, rogLevelDeptBoardCountry, orgLevelDeptBoarProId);
                                this.visibleDialogDepartment = false;
                                this.$toast.add({
                                    severity: "success",
                                    summary:
                                        "Successfully add new second-level org-structure.",
                                    detail: addOrgStr.data?.message
                                        ? addOrgStr.data?.message
                                        : null,
                                    life: 3000,
                                });
                                // Clear Data Input
                                this.orgStrBoardMgtEnglishName = '';
                                this.orgStrBoardMgtKhmerName = '';
                                this.descriptionOrgStrBoardMgt = '';
                            }
                        })
                        .catch((error) => {
                            this.loadingSubmittedAddMgtBoardStrOrg = false;
                            this.$toast.add({
                                severity: "error",
                                summary: "Please Fix Below Errors.",
                                detail: error?.response.data.error?.message
                                    ? error?.response.data.error?.message
                                    : "Please input filed second-level org-structure have missing value!",
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
                                            : "Please input filed second-level org-structure have missing value!",
                                        life: 3000,
                                    });
                                }
                            }
                        });
                        throw new Error("The English name of board is not defined");
                    }
                    this.v$.$touch();
                    // stop here if form is invalid
                    if (this.v$.$invalid) return;
                    const isFormCorrect = await this.v.$validate();
                    // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
                    if (isFormCorrect !== true || isFormCorrect == false) {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: "Please input filed org-structure have missing value!",
                            life: 3000,
                        });
                        return false;
                    }
                    if (!isFormCorrect) return;


                }, 1000);
            } catch (error) {
                throw Error(error.message);
            }

        },
        async editManageOrgStrBoardMgt() {
            try {
                console.log("D")
            } catch (error) {
                throw Error(error.message ? error.message : error);
            }
        },
        async confirmRemoveOrgStrBoardById() {
            try {
                console.log("D")
            } catch (error) {
                throw Error(error.message ? error.message : error);
            }
        },
        async fetchingDataGeoOrgSecondChartStructure(orgStrChartLevel, orgStrChartCountryId, orgStrChartProjectId) {
            this.fetchingDeptOrg = true;
            setTimeout(async () => {
                try {
                    if (!orgStrChartProjectId) {
                        throw Error('Please selected project id is required');
                    }
                    this.getAllGeoPositionDeptManageChart(orgStrChartLevel, orgStrChartCountryId, orgStrChartProjectId);
                } catch (e) {
                    return Promise.reject(e);
                }
                this.fetchingDeptOrg = false;
            }, 100);
        }

    },
}