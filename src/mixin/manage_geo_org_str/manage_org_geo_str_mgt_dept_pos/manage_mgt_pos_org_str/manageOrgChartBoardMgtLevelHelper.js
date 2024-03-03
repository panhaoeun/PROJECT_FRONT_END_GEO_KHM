import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    data(){
        return{
            openEditDialogParentLevel: false,
            dataEditParentLevel: null,
            deletedDialogLevelRootMgt: false,
            deletedMgtLevelId: null,
        }
    },
    created() {
        this.serviceManageStructuresProject = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        ...mapGetters("orgStrDeptPosGeo", ["allOrgBoardDeptStructureChart", "allOrgBoardDeptStructure02LevelChart", "allOrgBoardDeptStructure03LevelChart", "allOrgBoardDeptStructure04LevelChart", "allOrgBoardDeptStructure05LevelChart"]),
        // Hierarchy Org-Structure Chart
        ...mapGetters("orgStrDeptPosGeo", ["allOrgBoardHierarchyStructure"]),
        getAllBoardManagerOfProjectOrgStructureChart01() {
            return this.allOrgBoardHierarchyStructure || [];
        },
        getAllBoardManagerOfProjectOrgStructureChart02() {
            return this.allOrgBoardHierarchyStructure || [];
        },
        getAllBoardManagerOfProjectOrgStructureChart03() {
            return this.allOrgBoardHierarchyStructure || [];
        },
        getAllBoardManagerOfProjectOrgStructureChart04() {
            return this.allOrgBoardHierarchyStructure || [];
        },
        getAllBoardManagerOfProjectOrgStructureChart05() {
            return this.allOrgBoardHierarchyStructure || [];
        },
        getAllBoardManagerOfProjectOrgStructureChart06() {
            return this.allOrgBoardHierarchyStructure || [];
        },
        getAllDeptOrgStrMgtOrg() {
            return this.allOrgBoardDeptStructureChart || [];
        },
        getAllDeptOrgStrBoardSecondLevel() {
            return this.allOrgBoardDeptStructure02LevelChart || [];
        },
        getAllDeptOrgStrBoardThirdLevel() {
            return this.allOrgBoardDeptStructure03LevelChart || [];
        },
        getAllDeptOrgStrBoardFourLevel() {
            return this.allOrgBoardDeptStructure04LevelChart || [];
        },
        getAllDeptOrgStrBoardFiveLevel() {
            return this.allOrgBoardDeptStructure05LevelChart || [];
        }
    },
    methods: {
        ...mapActions('orgStrDeptPosGeo', ['getAllGeoPositionDeptManageChart']),
        // Create Employee
        
        /**
         * @Manage Organization - Structure Chart
        **/ 
        async getGloAllOrgStructureOptSelectedMultiChild(orgLevel, orgCountry, orgProjectId){
            console.log(orgLevel, orgCountry, orgProjectId)
        },  
        // ----------------------- add new position in department structure chart - start
        async btnSubmittedAddNewOrgStrMultiLevel(validate) {
            this.loadingSubmittedAddNew = true;
            this.submitted = true;
            setTimeout(async () => {
                this.loadingSubmittedAddNew = false;
                if (this.selectedOptOrgChartRootLevel !== "") {
                    const validation = await this.v$.$validate();
                    if (validation === false) {
                        const errorValidation = this.v$.$errors;
                        this.$notify.error({
                            title: "Please selected org.structure level in required",
                            message: errorValidation[0]?.$message ?
                                errorValidation[0]?.$message :
                                null,
                            showClose: true,
                        });
                    }
                    /**
                    ** @Add new org - structure multiple levels
                    **/ 
                   const addNewDeptLevel = {
                        addNewAssignOrgStrId: '',
                        addNewAssignEmpId: "",
                        addNewAssignPositionId: "",
                        addNewNotedOrgStr: ''
                   }
                   //Org-Structure multi-level structure
                   this.serviceManageStructuresProject.createStoreEmpOrgDeptPosition(addNewDeptLevel ? addNewDeptLevel : {});                   
                }
                // Validate
                this.v$.$touch();
                if (!validate) {
                    return;
                }
            }, 1000);
        },
        // Manage Org-structure and update data to Geo Projects table
        async submittedAddOrgStrMultiLevelGeoProjected() {
            try {
                this.loadingSubmittedAddMgtBoardStrOrg = true;
                this.submitted = true;
                setTimeout(async () => {
                    const getOptSelectedProId = parseInt(this.deptProjectIdAddNew) ? parseInt(this.deptProjectIdAddNew) : 0;
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
                            addNewSuperDeptOrgStrIdBySelectedParent: this.getSecondLevelOrgStructure ? this.getSecondLevelOrgStructure : 0,
                            addNewMgrDeptOrgStrId: 0,
                            addNewOrgChartLevel: this.addNewOrgChartLevelParen ? this.addNewOrgChartLevelParen : 'SL01',
                            addNewOrgChartProId: getOptSelectedProId ? getOptSelectedProId : 0,
                            addNewOrgChartCountryId: this.deptCountryId ? this.deptCountryId : 0,
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
                                const orgLevelDeptBoard = this.addNewOrgChartLevelParen ? this.addNewOrgChartLevelParen : 'SL01';
                                const rogLevelDeptBoardCountry = this.deptCountryId ? this.deptCountryId : 0;
                                const orgLevelDeptBoarProId = getOptSelectedProId ? getOptSelectedProId : 0;
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
        // Edit 
        async editManageOrgStrBoardMgtParentLevel(data) {
            try {
                this.openEditDialogParentLevel = true;
                this.dataEditParentLevel = Object.assign(data) ? Object.assign(data) : null
            } catch (error) {
                throw Error(error.message ? error.message : error);
            }
        },
        async closingPopupEditedBoardMgtStrDialogs(){
            setTimeout(() => {
                this.openEditDialogParentLevel = false;
            },100);
        },
        //Edited Level 01(Parent Level)
        async submittedDialogEditBoardMgtParentLevel(){
            try {
                if( this.getPosEditParentLevel?.orgStrDeptName){
                    this.submittingBoardParentLevel = true;
                    const editDataParentLevelBoardMgt = {
                        modifyOrgChartStrEnglishName: String(this.getPosEditParentLevel.orgStrDeptName).toString(),
                        modifyOrgChartStrKhName: String(this.getPosEditParentLevel.orgStrDeptKhmerName).toString(),
                        modifyCheckOrgStatus: true,
                        modifyOrgChartNotedStructure: String(this.getPosEditParentLevel.orgDeptStrNoted).toString()
                    }
                    this.serviceManageStructuresProject.modifyNewOrgStructureGeoProjectGeo(this.getPosEditParentLevel?.orgStrId, editDataParentLevelBoardMgt)
                    .then(async (editProject) => {
                        if (editProject?.status === 200) {
                            this.fetchingDataGeoOrgChartStructure(this.getPosEditParentLevel.orgDeptStrLevel, this.getPosEditParentLevel?.geoCountryId, this.getPosEditParentLevel?.projectId, this.getPosEditParentLevel.orgSupDeptStrId);
                            setTimeout(async () => {
                                this.hasParentLevelBoardMgt01LevelErrors = false
                                this.submittingBoardParentLevel = false;
                                this.$toast.add({
                                    severity: "success",
                                    summary: "Editing Country Department Successfully.",
                                    detail: editProject.data ?.message ? editProject.data ?.message :  null,
                                    life: 3000,
                                });
                                this.submittingBoardParentLevel = false;
                            }, 1000);
                        }
                        if (!this.hasParentLevelBoardMgt01LevelErrors) {
                            this.$emit('close')
                        }
                    }).catch((error) => {
                        this.$toast.add({
                            severity: "error",
                            summary: "Unsuccessfully updated geo department.",
                            detail: error?.message ? error?.message : '',
                            life: 3000,
                        });
                        this.submittingDeptProvinceData = false;
                    });
                }
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        async confirmRemoveOrgStrBoardById(data) {
            try {
                if(!data || data !== undefined || typeof data !== 'undefined') {
                    this.deletedMgtLevelId = data ? data : '';
                    this.deletedDialogLevelRootMgt = true;
                }
            } catch (error) {
                throw Error(error.message ? error.message : error);
            }
        },
        async confirmDeletedBoardMgtParentLevelOrgStr(orgStr){
            try{
                this.deletedDialogLevelRootMgt = false;
                this.serviceManageStructuresProject.removeNewOrgStructureGeoProjectGeo(orgStr?.orgStrId).then(async (state) => {
                    if(state?.status === 200){
                        this.deletedGeoProvinceDialogs = false;
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
        // Fetching Data Org-structure from level
        async fetchingDataGeoOrgChartStructure(orgStrChartLevel, orgStrChartCountryId, orgStrChartProjectId, orgStrSuperChartId) {
            this.fetchingDeptOrg = true;
            setTimeout(async () => {
                try {
                    if (!orgStrChartProjectId) {
                        throw Error('Please selected project id is required');
                    }
                    const optSelectedStrBoardLevel = {
                        orgStrChartLevel,
                        orgStrChartCountryId, 
                        orgStrChartProjectId,
                        orgStrSuperChartId
                    }
                    this.getAllGeoPositionDeptManageChart(optSelectedStrBoardLevel);
                } catch (e) {
                    return Promise.reject(e);
                }
                this.fetchingDeptOrg = false;
            }, 100);
        }

    },
}