import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
export default {
    data() {
        return {
            orgDeptStrLevel: "SL01",
            deletedDialogsOrgStructure: false,
            submitted: false,
        }
    },
    created() {
        this.serviceManageStructuresGlobal = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        getOrgName() {
            if (this.editingItem.id !== undefined) {
                return this.editingItem.text;
            }
            return null;
        }
    },
    methods: {
        openDialogsAddNewRootNodeOrgStr() {
            this.visibleDialogsRootNodeOrgStr = true;
        },
        addRootNodeOrgStructure(validate) {
            try {
                this.submitted = true;
                this.loadingBtnRootNode = true;
                setTimeout(() => {
                    this.loadingBtnRootNode = false;
                    /**
                     * @Access add new root node to the org-structure
                     * */
                    if (this.orgStructureGeoId == null && this.orgStructureGeoId == null || this.orgStructureLevel === undefined) {
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
                        typeof this.addNewEmpRootNodeEng !== 'object'
                    ) {
                        const addNewOrgStructureDataRoot = {
                            statusAddNewRootNode: 'nodeRoot',
                            addNewOrgChartLevel: String(this.orgStructureLevel).toString(),
                            addNewOrgChartProId: parseInt(this.rootNodeProId) ? parseInt(this.rootNodeProId) : 0,
                            addNewOrgChartCountryId: parseInt(this.orgStructureGeoId) ? parseInt(this.orgStructureGeoId) : 0,
                            addNewOrgChartStrKhmerName: String(this.addNewEmpRootNodeEng).toString()?.trim(),
                            addNewOrgChartStrEnglishName: String(this.addNewEmpRootNodeKhmer).toString()?.trim(),
                            addNewOrgChartStrNoted: String(this.descriptionDeptEmpRootNode).toString()?.trim()
                        }
                        this.serviceManageStructuresGlobal.createNewOrgStructureGeoProjectGeo(addNewOrgStructureDataRoot).then(async (orgStrData) => {
                            if (orgStrData?.status === 200) {
                                this.$toast.add({
                                    severity: "success",
                                    summary: "Create Root Node Org-Structure Successfully.",
                                    detail: orgStrData.data?.message ? orgStrData.data?.message : null,
                                    life: 3000,
                                });
                                this.fetchingDataGeoOrgChartStructure(this.orgStructureLevel, this.orgStructureGeoId, this.rootNodeProId, 0);
                            }
                            // Clear Form
                            this.closeAddRoot;
                            this.addNewEmpRootNodeEng = '';
                            this.addNewEmpRootNodeKhmer = '';
                            this.descriptionDeptEmpRootNode = '';

                            return orgStrData ? orgStrData : [];
                        }).catch((error) => {
                            this.$toast.add({
                                severity: "error",
                                summary: "Unsuccessfully create root node org-structure successfully..",
                                detail: error?.message?error?.message : '',
                                life: 3000,
                            });
                            this.dialog = true;
                            throw Error(error || error.message);
                        });
                    }
                    /**
                     * @Validations org-structured new node root
                     * */
                    this.v$.$touch();
                    if (!validate) {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: "Please input filed add new root node!",
                            life: 3000,
                        });
                        return;
                    }
                }, 1000);
            } catch (error) {
                throw Error(error.message || error);
            }


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
                this.showAddBaseLevelDialogOrgStructures(id, projectId,
                    countryId,
                    subIdOrg,
                    orgDeptLevel, addNewChildName);
            }
        },
        removeNodeOrgStructure: function () {
            if (this.editingItem.id !== undefined) {
                this.deletedDialogsOrgStructure = true;
            }
        },
        /*
         * @Tree View Items (Tree View Item)
         */
        confirmRemoveOrgStructureDatByIdGlobal() {
            if (this.editingItem.id !== undefined) {
                // Confirms Dialogs
                this.confirmDeleteOrgStDataByIdGlobal(this.editingItem.id);
            }
        },
        confirmDeleteOrgStDataByIdGlobal(id) {
            const orgStrId = parseInt(id) ? parseInt(id) : 0;
            this.serviceManageStructuresGlobal.removeNewOrgStructureGeoProjectGeo(orgStrId).then(async (state) => {
                if (state?.status === 200) {
                    this.$toast.add({
                        severity: "success",
                        summary: "Editing Org-Structure Name Successfully.",
                        detail: state.data?.message? state.data?.message : null,
                        life: 3000,
                    });
                    const index = this.editingNode.parentItem.indexOf(this.editingItem);
                    this.editingNode.parentItem.splice(index, 1);
                    // Confirm Deleted 
                    this.deletedDialogsOrgStructure = false;
                    this.fetchingDataGeoOrgChartStructure(this.editingItem?.orgLevel, this.editingItem?.countryId, this.editingItem?.projectId, this.editingItem?.superIdOrg);
                }
                return state ? state : [];
            }).catch((error) => {
                this.$toast.add({
                    severity: "error",
                    summary: "Unsuccessfully updated org-structure name.",
                    detail: error?.message?error?.message : '',
                    life: 3000,
                });
                return Promise.reject(error?.message || []);
            });
            this.ajaxDeleting = 0
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
                    addNewOrgChartStrEnglishName: String(addNewChildName) ? String(addNewChildName) : '',
                    addNewOrgChartStrNoted: ''
                }
                // Add New Organization Chart Root Level Info
                this.serviceManageStructuresGlobal?.createNewOrgStructureGeoProjectGeo(
                        addNewOrgStructureGlobal ?
                        addNewOrgStructureGlobal :
                        []
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
                                summary: "Successfully add new root org-structure.",
                                detail: addOrgStr.data?.message ?
                                    addOrgStr.data?.message :
                                    null,
                                life: 3000,
                            });
                        }
                    })
                    .catch((error) => {
                        this.loadingSubmittedAddMgtBoardStrOrg = false;
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: error?.response.data.error?.message ?
                                error?.response.data.error?.message :
                                "Please input filed org-structure have missing value!",
                            life: 3000,
                        });
                        if (error?.response.data.error.error?.errors) {
                            for (
                                let index = 0; index <
                                error.response.data.error.error?.errors
                                .length; index++
                            ) {
                                const validationError =
                                    error.response.data.error.error?.errors[index].message?? [];
                                this.$toast.add({
                                    severity: "error",
                                    summary: "Please Fix Below Errors.",
                                    detail: validationError ?
                                        validationError :
                                        "Please input filed org-structure have missing value!",
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
                if (this.editOrgStructureData?.orgName) {
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
                                        detail: editProject.data?.message ? editProject.data?.message : null,
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