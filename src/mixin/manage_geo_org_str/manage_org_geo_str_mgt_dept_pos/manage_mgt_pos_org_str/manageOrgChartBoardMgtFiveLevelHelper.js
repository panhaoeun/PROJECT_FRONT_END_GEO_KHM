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
         * @Manage Organization - Structure Chart Level 05
        **/ 
        async getGloAllOrgStructureOptSelectedMultiChild(orgLevel, orgCountry, orgProjectId){
            console.log(orgLevel, orgCountry, orgProjectId)
        },  
        // Manage Org-structure and update data to Geo Projects table Level 05
        async submittedAddOrgStrMultiLevelGeoProjected() {
            try {
                this.loadingSubmittedAddMgtBoardStrOrg = true;
                this.submitted = true;
                setTimeout(async () => {
                    const getOptSelectedProId = parseInt(this.deptSecondLevelProjectId) ? parseInt(this.deptSecondLevelProjectId) : 0;
                    const optSelectedRootLevel = this.fourthBoardMgtLevelParentLevelId ? this.fourthBoardMgtLevelParentLevelId : 0;
                    if (optSelectedRootLevel == null || optSelectedRootLevel  < 0 || optSelectedRootLevel == ''){
                        this.optSelectedRootLevel = 0;
                        this.$toast.add({
                            severity: "error",
                            summary: "Please selected forth-level in required.",
                            detail: "Please input filed forth-level have missing value!",
                            life: 3000
                        });
                        return false;
                    }
                    if (getOptSelectedProId == null || getOptSelectedProId <0 || getOptSelectedProId == '') {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please selected projected in required.",
                            detail: "Please input filed project have missing value!",
                            life: 3000
                        });
                        return false;
                    }
                    if (!this.orgStrBoardMgtEnglishName || this.orgStrBoardMgtEnglishName !== null && this.orgStrBoardMgtEnglishName !== '') {
                        const addNewOrgStrMgtPosDept = {
                            addNewSuperDeptOrgStrIdBySelectedParent: optSelectedRootLevel ? optSelectedRootLevel : 0,
                            addNewOrgChartLevel: 'SL05',
                            addNewOrgChartProId: getOptSelectedProId ? getOptSelectedProId : 0,
                            addNewOrgChartCountryId: this.deptCountrySecondLevelId ? this.deptCountrySecondLevelId : 0,
                            addNewOrgChartStrKhmerName: String(this.orgStrBoardMgtKhmerName) ? String(this.orgStrBoardMgtKhmerName) : '',
                            addNewOrgChartStrEnglishName: String(this.orgStrBoardMgtEnglishName) ? String(this.orgStrBoardMgtEnglishName) : '',
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
                                const orgLevelDeptBoard = "SL05";
                                const rogLevelDeptBoardCountry = this.deptCountrySecondLevelId ? this.deptCountrySecondLevelId : 0;
                                const orgLevelDeptBoarProId = getOptSelectedProId ? getOptSelectedProId : 0;
                                this.fetchingDataGeoOrgFourthChartStructure(orgLevelDeptBoard, rogLevelDeptBoardCountry, orgLevelDeptBoarProId);
                                this.visibleDialogDepartment = false;
                                this.$toast.add({
                                    severity: "success",
                                    summary:
                                        "Successfully add new five-level org-structure.",
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
                                    : "Please input filed forth-level org-structure have missing value!",
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
                                            : "Please input filed forth-level org-structure have missing value!",
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
                            detail: "Please input filed third level org-structure have missing value!",
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
        async fetchingDataGeoOrgFourthChartStructure(orgStrChartLevel, orgStrChartCountryId, orgStrChartProjectId) {
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