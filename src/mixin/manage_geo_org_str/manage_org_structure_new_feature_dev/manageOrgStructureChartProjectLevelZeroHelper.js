import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
export default {
    data() {
        return {
            orgDeptStrLevel: "SL01"
        }
    },
    created() {
        this.serviceManageStructuresGlobal = new ManageOrgChartStructureGeoProjectServices();
    },
    methods: {
        addRootNodeOrgStructure() {
        },
        addChildNodeOrgStructure() {
            if (this.editingItem.id !== undefined) {
                const addNewChildName = this.editingItem.text + "New Child Node" + parseInt(this.editingItem.id);
                this.editingItem.addChild({
                    text: addNewChildName ? addNewChildName : ""
                });
                /**
                 *@Insert Data into function show add org-structures
                * */ 
               const {
                    id,
                    projectId,
                    countryId,
                    subIdOrg,
                    orgDeptLevel
               } = this.editingItem ? this.editingItem : {};
                this.showAddBaseLevelDialogOrgStructures(id,projectId,
                    countryId,
                    subIdOrg,
                    orgDeptLevel, addNewChildName);
            }
        },
        removeNodeOrgStructure: function () {
            if (this.editingItem.id !== undefined) {
                var index = this.editingNode.parentItem.indexOf(this.editingItem)
                console.log(index, this.editingItem)
                // this.editingNode.parentItem.splice(index, 1)
            }
        },
        /**
         * @function add new org-structure base level 
         * 
        */
        refreshNode: function () {
            this.asyncData = [
                this.$refs.tree2.initializeLoading()
            ]
            this.$refs.tree2.handleAsyncLoad(this.asyncData, this.$refs.tree2)
        },
       showAddBaseLevelDialogOrgStructures(orgStrId, projectId, countryId, subIdOrgId, orgDeptLevel = "SL01", addNewChildName) {
            const getOrgStrId = parseInt(orgStrId) ? parseInt(orgStrId) : 0;
            if (getOrgStrId === undefined || getOrgStrId === '' && typeof getOrgStrId == 'number') {
                this.$toast.add({
                    severity: "error",
                    summary: "Please choose  an organization structure for create node child!",
                    life: 3000
                });
                return false;
            }
            const getProjectId = parseInt(projectId) ? parseInt(projectId) : 0;
            if (!getProjectId || getProjectId < 0 || typeof getProjectId !== 'number') {
                this.$toast.add({
                    severity: "error",
                    summary: "Please selected projected in required.",
                    life: 3000
                });
                return false;
            }
            if (!getProjectId || getProjectId < 0 || typeof getProjectId !== 'number') {
                this.$toast.add({
                    severity: "error",
                    summary: "Please selected projected in required.",
                    detail: "Please input filed district have missing value!",
                    life: 3000
                });
                return false;
            }
            // Inserting
            if (!getProjectId || getOrgStrId !== null && subIdOrgId !== '') {
                const addNewOrgStructureGlobal = {
                    addNewSuperDeptOrgStrIdBySelectedParent: subIdOrgId ? subIdOrgId : 0,
                    addNewMgrDeptOrgStrId: 0,
                    addNewOrgChartLevel: String(orgDeptLevel).toString() ? String(orgDeptLevel).toString() : 'SL01',
                    addNewOrgChartProId: parseInt(projectId) ? parseInt(projectId) : 0,
                    addNewOrgChartCountryId: parseInt(countryId) ? parseInt(countryId) : 0,
                    addNewOrgChartStrKhmerName: String(addNewChildName) ? String(addNewChildName) : '',
                    addNewOrgChartStrEnglishName: String(addNewChildName) ? String(addNewChildName) :'',
                    addNewOrgChartStrNoted: ''
                }
                // Add New Organization Chart Root Level Info
                this.serviceManageStructuresGlobal?.createNewOrgStructureGeoProjectGeo(
                    addNewOrgStructureGlobal
                    ? addNewOrgStructureGlobal
                    : []
                )
                 .then(async (addOrgStr) => {
                    if (addOrgStr?.data.success === true) {
                        this.loadingSubmittedAddMgtBoardStrOrg = false;
                        this.visibleDialogOrgStrBoardMgt = false;
                        // Reload Data In Datable in Dept org-str root level
                        const orgLevelDeptBoard = this.addNewOrgChartLevelParen ? this.addNewOrgChartLevelParen : 'SL01';
                        const rogLevelDeptBoardCountry = countryId ? countryId : 0;
                        const orgLevelDeptBoarProId = projectId ? projectId : 0;
                        const orgRootLevelBoardProId = this.getSecondLevelOrgStructure ? this.getSecondLevelOrgStructure : 0;
                        this.fetchingDataGeoOrgChartStructure(orgLevelDeptBoard, rogLevelDeptBoardCountry, orgLevelDeptBoarProId, orgRootLevelBoardProId);
                        this.visibleDialogDepartment = false;
                        this.$toast.add({
                            severity: "success",
                            summary:
                                "Successfully add new root org-structure.",
                            detail: addOrgStr.data?.message
                                ? addOrgStr.data?.message
                                : null,
                            life: 3000,
                        });
                    }
                })
                .catch((error) => {
                    this.loadingSubmittedAddMgtBoardStrOrg = false;
                    this.$toast.add({
                        severity: "error",
                        summary: "Please Fix Below Errors.",
                        detail: error?.response.data.error?.message
                            ? error?.response.data.error?.message
                            : "Please input filed org-structure have missing value!",
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
                                    : "Please input filed org-structure have missing value!",
                                life: 3000,
                            });
                        }
                    }
                });
            }
       },
        /**
         * @Global Org-Structure for manage base on project and geo-fence locations
         * */
        async handleEditStructureOrgProChartSubmit() {
            try {
                // Edit Org-Structure Managements
                // this.loadingSpinner = true;
                this.submittingProjectDataLoading = true;
                if(this.editOrgStructureData?.orgName){
                    const editDataParentOrgStructureLevel = {
                        modifyOrgChartStrEnglishName: String(this.editOrgStructureData?.orgName).toString(),
                        modifyOrgChartStrKhName: String(this.editOrgStructureData.khmerName).toString(),
                        modifyCheckOrgStatus: true,
                        modifyOrgChartNotedStructure: String(this.editOrgStructureData.descriptionEdited).toString()
                    }
                    this.serviceManageStructuresGlobal.modifyNewOrgStructureGeoProjectGeo(parseInt(this.editOrgStructureData?.id), editDataParentOrgStructureLevel)
                     .then(async (editProject) => {
                        if (editProject?.status === 200) {
                            this.fetchingDataGeoOrgChartStructure(this.editOrgStructureData?.orgLevel, this.editOrgStructureData?.countryId, this.editOrgStructureData?.projectId, this.editOrgStructureData?.superIdOrg);
                            setTimeout(async () => {
                                this.hasOrgStructureDataErrors = false
                                this.submittingProjectDataLoading = false;
                                this.$toast.add({
                                    severity: "success",
                                    summary: "Editing Org-Structure Name Successfully.",
                                    detail: editProject.data ?.message ? editProject.data ?.message :  null,
                                    life: 3000,
                                });
                                this.submittingProjectDataLoading = false;
                            }, 1000);
                        }
                        if (!this.hasOrgStructureDataErrors) {
                            this.$emit('close')
                        }
                    }).catch((error) => {
                        this.$toast.add({
                            severity: "error",
                            summary: "Unsuccessfully updated geo department.",
                            detail: error?.message ? error?.message : '',
                            life: 3000,
                        });
                        this.submittingProjectDataLoading = false;
                    });
                }
            } catch (error) {
                throw Error(error || error.message);
            }
        },
    },
}