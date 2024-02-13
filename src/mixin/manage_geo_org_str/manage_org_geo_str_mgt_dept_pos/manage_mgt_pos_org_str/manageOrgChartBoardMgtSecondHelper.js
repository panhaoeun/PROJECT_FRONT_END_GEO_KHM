import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    data() {
        return {
            openEditDialogSecondLevel: false,
            dataEditSecondLevel: null,
            dataRemoveSecondLevel:null,
            deletedDialogLevelSecondMgt: false
        }
    },
    created() {
        this.serviceManageStructuresProject = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        ...mapGetters("orgStrDeptPosGeo", ["allOrgBoardDeptStructureChart"]),
        getAllDeptOrgStrMgtOrgLevel02() {
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
                    this.loadingSubmittedAddMgtBoardStrOrg = false;
                    const getOptSelectedProId = parseInt(this.deptSecondLevelProjectId) ? parseInt(this.deptSecondLevelProjectId) : 0;
                    const optSelectedRootLevel = this.deptOrgStrRootLevelId ? this.deptOrgStrRootLevelId : 0;
                    console.log(getOptSelectedProId)
                    if (optSelectedRootLevel == '' || optSelectedRootLevel < 0 && optSelectedRootLevel == null) {
                        this.optSelectedRootLevel = 0;
                        this.$toast.add({
                            severity: "error",
                            summary: "Please selected root-level in required.",
                            life: 3000
                        });
                        return false;
                    }
                    if (getOptSelectedProId == '' || getOptSelectedProId == null) {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please selected projected in required.",
                            life: 3000
                        });
                        return false;
                    }
                    if (!this.orgStrBoardMgtEnglishName || this.orgStrBoardMgtEnglishName !== null && this.orgStrBoardMgtEnglishName !== '') {
                        const addNewOrgStrMgtPosDept = {
                            addNewSuperDeptOrgStrIdBySelectedParent: this.optSelectedRootLevel ? this.optSelectedRootLevel : '',
                            addNewOrgChartLevel: 'SL02',
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
                                const orgLevelDeptBoard = "SL02";
                                const rogLevelDeptBoardCountry = this.deptCountrySecondLevelId ? this.deptCountrySecondLevelId : 0;
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
        async editManageOrgStrBoardMgt(data) {
            try {
                try {
                    this.openEditDialogSecondLevel = true;
                    this.dataEditSecondLevel = Object.assign(data) ? Object.assign(data) : null
                } catch (error) {
                    throw Error(error.message ? error.message : error);
                }
            } catch (error) {
                throw Error(error.message ? error.message : error);
            }
        },
        async closingPopupEditedSecondMgtStrDialogs() {
            setTimeout(() => {
                this.openEditDialogSecondLevel = false;
            }, 100);
        },
        async confirmRemoveOrgStrBoardById(data) {
            try {
               if (!data || data !== undefined || typeof data !== 'undefined') {
                   this.dataRemoveSecondLevel = data ? data : '';
                   this.deletedDialogLevelSecondMgt = true;
               }
            } catch (error) {
                throw Error(error.message ? error.message : error);
            }
        },
        async confirmDeletedBoardMgtSecondLevelOrgStr(orgStr) {
            try{
                this.deletedDialogLevelSecondMgt = false;
                this.serviceManageStructuresProject.removeNewOrgStructureGeoProjectGeo(orgStr?.orgStrId).then(async (state) => {
                    if(state?.status === 200){
                        this.deletedDialogLevelSecondMgt = false;
                        this.$notify({
                            title: 'Delete Org-Structure Successfully',
                            message:state.data?.message ? state.data?.message : '',
                            type: 'success'
                        });
                        // Fetching Data from org-structure
                        this.fetchingDataGeoOrgChartStructure(orgStr.orgDeptStrLevel, orgStr?.geoCountryId,orgStr?.projectId, orgStr.orgStrMgrId);
                    }
                    return state ? state : [];
                }).catch((error) => {
                    this.$notify({
                        title: 'Unsuccessfully Commune Successfully',
                        message:error?.message ? error?.message : '',
                        type: 'error'
                    });
                    return Promise.reject(error?.message || []);
                });
            }catch(error){
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