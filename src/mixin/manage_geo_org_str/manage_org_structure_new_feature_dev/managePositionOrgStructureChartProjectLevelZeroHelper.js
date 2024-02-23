import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    data() {
        return {
                
        }
    },
    created() {
        this.geoDeptOrgStrServicesPosition = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        ...mapGetters('orgStrDeptPosGeo', ['allOrgBoardPositionBaseDeptBoardHierarchyStructure']),
        getPositionBaseDeptLevelProject() {
            const orgStrDeptPosGeoBaseStrBoard =
                this.allOrgBoardPositionBaseDeptBoardHierarchyStructure ?
                this.allOrgBoardPositionBaseDeptBoardHierarchyStructure : [];
            if (orgStrDeptPosGeoBaseStrBoard !== null ||
                orgStrDeptPosGeoBaseStrBoard !==
                undefined &&
                typeof orgStrDeptPosGeoBaseStrBoard !== 'string'
            ) {
                return orgStrDeptPosGeoBaseStrBoard ? orgStrDeptPosGeoBaseStrBoard : []
            }
            return [];
        }
    },
    methods: {
        ...mapActions('orgStrDeptPosGeo', ['setRelistPositionDataByDepartment']),
        /**
         * @Global Org-Structure for manage base on project and geo-fence locations  of Projects
         * */
        async handleEditStructureOrgProChartSubmit(validate) {
            try {
                this.submitted = true;
                this.loadingBtnEdit = true;
                this.v$.$touch();
                setTimeout(async () => {
                    this.loadingBtnEdit = false;
                    if (!validate) {
                        const isFormCorrect = await this.v$.$validate();
                        if (isFormCorrect !== true || isFormCorrect == false) {
                            this.$toast.add({
                                severity: "error",
                                summary: "Please Fix Below Errors.",
                                detail: "Please input filed position form have missing value!",
                                life: 3000,
                            });
                            return false;
                        }
                        return false;
                    }
                    // Check get value multiple inputs fields
                    // let objectPositionData;
                    const objInputPositionsFiled = this.state?.dyNamicAddNewFrm
                        ? this.state?.dyNamicAddNewFrm
                        : [];
                    for (
                        let index = 0;
                        index < objInputPositionsFiled.length;
                        index++
                    ) {
                        let objFiled = {};
                        objFiled.addNewParentOrgDeptId = parseInt(this.getOrgStructureAdd.id) ?? 0;
                        objFiled.addNewPositionOrgStrEnglishName = objInputPositionsFiled[index].editNameEngProjectOrgStr;
                        objFiled.addNewPositionOrgStrKhmerName = objInputPositionsFiled[index].editNameKhmerProjectOrgStr;
                        objFiled.addNewPositionOrgStrDescription = objInputPositionsFiled[index].editDescriptionProjectOrgStr;
                        objFiled.addNewOrgPosLevel = this.addNewOrgPosLevel;
                        // Add the new org-structures
                        const addNewPositionParentObj = {
                            ...objFiled,
                        }
                        this.geoDeptOrgStrServicesPosition?.createNewOrgStrDeptPositionGeoProject(
                            addNewPositionParentObj
                            ? addNewPositionParentObj
                            : {}
                        ) .then(async (addNewProject) => {
                        if (addNewProject?.data.success === true) {
                            this.loadingBtnEdit = false;
                            this.visibleDialogAddPositionBoardMgt = false;
                            // Relist Get Board Manager Department Positions
                            await this.getPositionDeptBoardMgtBySuper(parseInt(this.getOrgStructureAdd.id) ?? 0);
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully add new position.",
                                detail: String(addNewProject.data?.message).toString()
                                    ? String(addNewProject.data?.message).toString()
                                    : null,
                                life: 3000,
                            });
                            // Clear Data Input Position department
                            this.state.dyNamicAddNewFrm = [{
                                editNameEngProjectOrgStr: "",
                                editNameKhmerProjectOrgStr: "",
                                editDescriptionProjectOrgStr: "",
                            }]
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
                    }
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        /**
         * @Reload Positions base board manager()
         * */ 
        async getPositionDeptBoardMgtBySuper(getBoardMgtDeptPosSuperId, getSuperOrgPosId = 0, getOrgPosLevel = 'GL01') {
            this.fetchingOrgStrDeptPosId = true;
            setTimeout(async () => {
                try {
                    if (!getBoardMgtDeptPosSuperId) {
                        throw Error('Please selected org-structure is required');
                    }
                    if (getSuperOrgPosId !== null && !isNaN(Number(getBoardMgtDeptPosSuperId)) || getOrgPosLevel !== '') {
                        let getParentPosOrgId = parseInt(getBoardMgtDeptPosSuperId) ? parseInt(getBoardMgtDeptPosSuperId) : 0;
                        const optSelectedStrPosBoardLevel = {
                            getParentPosOrgId,
                            getSuperOrgPosId,
                            getOrgPosLevel
                        }
                        this.setRelistPositionDataByDepartment(optSelectedStrPosBoardLevel);
                    }
                } catch (e) {
                    return Promise.reject(e);
                }
                this.fetchingOrgStrDeptPosId = false;
            }, 1000);
        },
        /**
         * @Dialogs of TOR Positions data
        * */
       openDialogAssignTOR(data) {
            this.clingAssignTORVisible = true;
            this.assignTORPositionId = data ? data : null;
       }
    },
}