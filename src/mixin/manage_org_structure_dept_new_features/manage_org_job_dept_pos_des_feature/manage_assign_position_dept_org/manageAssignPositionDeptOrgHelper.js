import {
    mapActions,
    mapGetters
} from "vuex";
import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";


export default {
    created() {
        this.geoDeptOrgStrServicesPosition = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        ...mapGetters('orgStrDeptPosGeo', ['allOrgBoardPositionBaseDeptBoardHierarchyStructure', 'allOrgJobPositionByDeptStr']),
        getPositionBaseDept() {
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
        },
        getJobPositionBaseDeptOrgStr() {
            const orgStrDeptPosGeoBaseStrJobDept =
                this.allOrgJobPositionByDeptStr ?
                this.allOrgJobPositionByDeptStr: [];
            if (orgStrDeptPosGeoBaseStrJobDept !== null ||
                orgStrDeptPosGeoBaseStrJobDept !==
                undefined &&
                typeof orgStrDeptPosGeoBaseStrJobDept !== 'string'
            ) {
                return orgStrDeptPosGeoBaseStrJobDept ? orgStrDeptPosGeoBaseStrJobDept : []
            }
            return [];
        },
        getAllListJobPositionBaseDeptOrgById() {
            const getPositionId = this.selectedPositionDeptOrg ? this.selectedPositionDeptOrg : null;
            const orgStrDeptPosGeoBaseStrJobDept =
                this.allOrgJobPositionByDeptStr ?
                this.allOrgJobPositionByDeptStr : [];
            if (getPositionId !== null ||
                getPositionId !==
                undefined &&
                typeof getPositionId !== 'string'
            ) {
                return orgStrDeptPosGeoBaseStrJobDept ? orgStrDeptPosGeoBaseStrJobDept : []
            }
            return [];
        }
    },
    methods: {
        ...mapActions('orgStrDeptPosGeo', ['setRelistPositionDataByDepartment', 'setJobPositionDescriptionBaseOrgStrId']),
        /**
         * @Reload Position Department Data Organization Chart Structures
         * */
        async getAllReloadPositionDeptOrg(getBoardMgtDeptPosSuperId, getSuperOrgPosId = 0, getOrgPosLevel = 'GL01') {
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
        async getAllReloadPositionJobDescriptionDeptOrg(getJobDesPosition) {
            this.fetchingOrgStrDeptPosId = true;
            setTimeout(async () => {
                try {
                    if (!getJobDesPosition) {
                        throw Error('Please selected org-structure is required');
                    }
                    if (getJobDesPosition !== null && !isNaN(Number(getJobDesPosition)) || getJobDesPosition !== '') {
                        let getOrgPosDesStrId = parseInt(getJobDesPosition) ? parseInt(getJobDesPosition) : 0;
                        const optSelectedStrPosBoardLevel = {
                            getOrgPosDesStrId
                        }
                        this.setJobPositionDescriptionBaseOrgStrId(optSelectedStrPosBoardLevel);
                    }
                } catch (e) {
                    return Promise.reject(e);
                }
                this.fetchingOrgStrDeptPosId = false;
            }, 1000);
        },
        async assignOrgDeptPositionActions() {
            setTimeout(() => {
                const orgDeptPosId = parseInt(this.orgStrDeptPosId) ? parseInt(this.orgStrDeptPosId) : 0;
                if (!orgDeptPosId){
                    this.$toast.add({
                        severity: "error",
                        summary: "Please selected org-department",
                        life: 3000,
                    });
                }
                if (this.englishNamePositionDeptOrgAssign) {
                    const addNewOptDeptMgtOrgStr = {
                        addNewParentOrgDeptId: orgDeptPosId ? orgDeptPosId : 0,
                        addNewSuperOrgPosId: 0,
                        addNewOrgPosLevel: 'GL01',
                        addNewPositionOrgStrEnglishName: String(this.englishNamePositionDeptOrgAssign),
                        addNewPositionOrgStrKhmerName: String(this.khmerNamePositionDeptOrgAssign),
                        addNewPositionOrgStrDescription: String(this.descriptionDetailPosition).toLowerCase()
                    };
                    this.geoDeptOrgStrServicesPosition?.createNewOrgStrDeptPositionGeoProject(
                        addNewOptDeptMgtOrgStr
                        ? addNewOptDeptMgtOrgStr
                        : {}
                    )
                    .then(async (addNewProject) => {
                        if (addNewProject?.data.success === true) {
                            this.loadingSubmittedAddProject = false;
                            this.visibleDialogAddPositionBoardMgt = false;
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully add new position.",
                                detail: String(addNewProject.data?.message).toString()
                                    ? String(addNewProject.data?.message).toString()
                                    : null,
                                life: 3000,
                            });
                            this.getAllReloadPositionDeptOrg(orgDeptPosId);
                            // Clear Data Input Position department
                            this.orgDeptBoardMgtBaseEmpId = null;
                            this.orgDeptBoardMgtPositionKhmerName = '';
                            this.this.orgDeptBoardMgtPositionName = '';
                            this.orgDeptBoardMgtDescription = '';
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
                } else {
                    this.$toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: "Please fill all required fields",
                        life: 3000,
                    });
                    this.hasAssignDeptPosition = true;
                }
            },1000);
        },
        /**
         *@Edit and Dialogs Removes Positions Descriptions
        */
        editGeoPositionDeptOrgStrDialog(position) {
            this.dataEditOrgPositionDes = position ? position : {};
            this.openEditedPositionDialogs = true;
        },
        closingPopupEditedPosIdOrgStrDialogs() {
            this.openEditedPositionDialogs = true;
            setTimeout(() => {
                this.openEditedPositionDialogs = false;
            }, 100);
        },
      
        /**
         * @Edit Org by Position Dialog
        **/
        submittedDialogEditOrgGlobalDeptPosition(){
            try{
                if(this.openEditPositionOrgDept?.deptPosName 
                    && this.openEditPositionOrgDept?.deptPosName !== null
                    && typeof this.openEditPositionOrgDept !== 'undefined'
                ){
                    this.submittingBoardMgtData = true;
                    const parentBoardDeptOrgStrId = parseInt(this.openEditPositionOrgDept?.orgDeptParentId) ? parseInt(this.openEditPositionOrgDept?.orgDeptParentId) : 0;
                    const parentPosBoardMgtId = parseInt(this.openEditPositionOrgDept?.deptPosId) ? parseInt(this.openEditPositionOrgDept?.deptPosId) : 0
                    const editDataBoardMgtPositionDept = {
                        modifyParentOrgDeptId: parentBoardDeptOrgStrId ? parentBoardDeptOrgStrId : 0,
                        modifyPositionOrgStrEnglishName: String(this.openEditPositionOrgDept?.deptPosName).toString(),
                        modifyPositionOrgStrKhmerName: String(this.openEditPositionOrgDept?.positionKhmerName).toString(),
                        modifyPositionOrgStrDescription: String(this.openEditPositionOrgDept?.deptGeoMgtPosNoted).toString(),
                        modifyCheckOrgPosStatus: true
                    }
                    this.geoDeptOrgStrServicesPosition.modifyNewOrgStrDeptPositionGeoProject(parentPosBoardMgtId, editDataBoardMgtPositionDept ? editDataBoardMgtPositionDept : {})
                    .then(async (posDeptId) => {
                        if(posDeptId?.status === 200){
                            setTimeout(async () => {
                                this.hasBoardMgtPositionErrors = false
                                this.submittingBoardMgtData = false;
                                this.$toast.add({
                                    severity: 'info',
                                    summary: 'Editing position of org-structures successfully!',
                                    detail: String(posDeptId.data?.message).toString() ? String(posDeptId.data?.message).toString() : '',
                                    life: 3000
                                });
                                // Relist Get Board Manager Department Positions
                                await this.getAllReloadPositionDeptOrg(parentBoardDeptOrgStrId);
                                if (!this.hasBoardMgtPositionErrors) {
                                    this.$emit('close')
                                }
                            }, 1000);
                        }
                    }).catch((error)=> {
                        let message = error?.message;
                        this.setToastError(message);
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Unsuccessfully updated base org-structure department!',
                            detail: String(message.data?.message).toString() ? String(message.data?.message).toString() : '',
                            life: 3000
                        });
                        this.hasBoardMgtPositionErrors = false
                        this.submittingBoardMgtData = false;
                    });
                }else{
                    this.hasBoardMgtPositionErrors = true;
                    this.submittingBoardMgtData = false;
                }
            }catch(error){
                throw Error(error || error.message);
            }
        },
        /**
         * @Remove Org by Position Dialog
        **/
        confirmDialogOrgPositionStructures(data) {
            this.deletedGeoDeptPosMgtDialogs = true;
            if (data !== null && data !== undefined || !isNaN(Number(data)) && data !== '') {
                this.dataDeletedOrgBoardPosId = data ? data : {};
                this.getNameRemove = data.deptPosName;
            }
        },
        async confirmRemoveDeptPositionOrgStr() {
            const getDeletedOrgStrId = parseInt(this.dataDeletedOrgBoardPosId.deptPosId) ? parseInt(this.dataDeletedOrgBoardPosId.deptPosId) : 0;
            this.loadingRemoveDeptPos = true;
            setTimeout(async () => {
                try {
                    this.loadingRemoveDeptPos =false;
                    if (getDeletedOrgStrId !== null &&
                        getDeletedOrgStrId !== undefined ||
                        !isNaN(Number(getDeletedOrgStrId)) &&
                        getDeletedOrgStrId !== ''
                    ) {
                        this.geoDeptOrgStrServicesPosition?.removedNewOrgStrDeptPositionGeoProject(getDeletedOrgStrId).then(async (removePosDept) => {
                        if (removePosDept?.data.success === true) {
                            this.deletedGeoDeptPosMgtDialogs = false;
                            // Reload Data In Datable in Dept org-str geo-fence
                            this.fetchingOrgStrDeptPosId = false;
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully remove position of departments.",
                                detail: removePosDept.data?.message
                                    ? removePosDept.data?.message
                                    : null,
                                life: 3000,
                            });
                            const parentDeptOrgId = parseInt(this.dataDeletedOrgBoardPosId?.orgDeptParentId) ? parseInt(this.dataDeletedOrgBoardPosId?.orgDeptParentId) : 0;
                            this.getAllReloadPositionDeptOrg(parentDeptOrgId);
                        }
                    })
                    .catch((error) => {
                        this.deletedGeoDeptPosMgtDialogs = true;
                        this.$toast.add({
                            severity: "error",
                            summary: "Error remove this position!",
                            detail: error?.response.data.error?.message
                                ? error?.response.data.error?.message
                                : "Error remove positions!",
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
                                    summary: "Error remove this position!.",
                                    detail: validationError
                                        ? validationError
                                        : "Please input filed position have missing value!",
                                    life: 3000,
                                });
                            }
                        }
                    });
                    }
                } catch (error) {
                    throw Error(error || error.message);
                }
            },1000);
        },
    },
   

}