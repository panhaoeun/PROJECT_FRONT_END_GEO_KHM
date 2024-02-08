import { mapActions, mapGetters } from "vuex";
import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";

export default {
    name: 'VxeTable',
    data: {
        openEditedBoardMgtDialogs: false,
        openEditBoardMgtData: null
    },
    created() {
        this.geoDeptOrgStrServicesPosition = new ManageOrgChartStructureGeoProjectServices();
    },
    computed:{
        ...mapGetters('orgStrDeptPosGeo', ['allOrgBoardPositionBaseDeptBoardHierarchyStructure']),
        getPositionBaseDept(){
            const orgStrDeptPosGeoBaseStrBoard = 
                this.allOrgBoardPositionBaseDeptBoardHierarchyStructure 
                ? this.allOrgBoardPositionBaseDeptBoardHierarchyStructure : [];
            if (orgStrDeptPosGeoBaseStrBoard !== null 
                || orgStrDeptPosGeoBaseStrBoard 
                !== undefined && 
                typeof orgStrDeptPosGeoBaseStrBoard !== 'string'
            ){
                return orgStrDeptPosGeoBaseStrBoard ? orgStrDeptPosGeoBaseStrBoard : []
            }
            return [];
        }
    },
    methods: {
        ...mapActions('orgStrDeptPosGeo', ['setRelistPositionDataByDepartment']),
        // Add New Positions
        submittedAddNewBoardMgtOrgStrPro(validate) {
            this.loadingSubmittedPosMgtStr = true;
            this.submitted = true;
            setTimeout(() => {
                this.loadingSubmittedPosMgtStr = false;
                if (
                    this.orgDeptBoardMgtPositionName !== null &&
                    this.orgDeptBoardMgtPositionName !== ""
                ) {
                    /**
                     * @Get Position base org-structure department
                     * */ 
                    const getSuperParentId = this.orgDeptBoardMgtBaseEmpId;
                    let mgtBoardDeptParentOrgId;
                    if (
                        getSuperParentId !== null ||
                        (getSuperParentId !== undefined && typeof getSuperParentId !== "object")
                    ) {
                        const getPosOrgMgtBoard = getSuperParentId ? getSuperParentId : {};
                        const keyValueDeptPosId = Object.keys(getPosOrgMgtBoard)[0];
                        mgtBoardDeptParentOrgId = keyValueDeptPosId
                            .split(/[,-]+/)
                            .pop();
                    }
                    const addNewOptDeptMgtOrgStr = {
                        addNewParentOrgDeptId: mgtBoardDeptParentOrgId ? mgtBoardDeptParentOrgId : {},
                        addNewSuperOrgPosId: 0,
                        addNewOrgPosLevel: 'GL01',
                        addNewPositionOrgStrEnglishName: String(this.orgDeptBoardMgtPositionName),
                        addNewPositionOrgStrKhmerName: String(this.orgDeptBoardMgtPositionKhmerName),
                        addNewPositionOrgStrDescription: String(this.orgDeptBoardMgtDescription).toLowerCase()
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
                            // Relist Get Board Manager Department Positions
                            await this.getPositionDeptBoardMgtBySuper(mgtBoardDeptParentOrgId);
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
                    this.v$.$touch();
                    if (!validate) {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: "Please input filed position have missing value!",
                            life: 3000,
                        });
                        return false;
                    }
                }
            }, 1000);
        },
        // Modify Positions 
        closingPopupEditedPosIdOrgStrDialogs() {
            this.openEditedBoardMgtDialogs = true;
            setTimeout(() => {
                this.openEditedBoardMgtDialogs = false;
            }, 100);
        },
        editGeoOrgDeptPosStrByPosIdDialog(positionId){
            this.openEditBoardMgtData = positionId ? positionId : {};
            this.openEditedBoardMgtDialogs = true;
        },
        /**
         * @Reloaded Open edited board mgt
        **/
        submittedDialogEditBoardMgtPosition(){
            try{
                if(this.getPosEditBoardMgtData?.deptPosName 
                    && this.getPosEditBoardMgtData?.deptPosName !== null
                    && typeof this.getPosEditBoardMgtData !== 'undefined'
                ){
                    this.submittingBoardMgtData = true;
                    const parentBoardDeptOrgStrId = parseInt(this.getPosEditBoardMgtData?.orgDeptParentId) ? parseInt(this.getPosEditBoardMgtData?.orgDeptParentId) : 0;
                    const parentPosBoardMgtId = parseInt(this.getPosEditBoardMgtData?.deptPosId) ? parseInt(this.getPosEditBoardMgtData?.deptPosId) : 0
                    const editDataBoardMgtPositionDept = {
                        modifyParentOrgDeptId: parentBoardDeptOrgStrId ? parentBoardDeptOrgStrId : 0,
                        modifyPositionOrgStrEnglishName: String(this.getPosEditBoardMgtData?.deptPosName).toString(),
                        modifyPositionOrgStrKhmerName: String(this.getPosEditBoardMgtData?.positionKhmerName).toString(),
                        modifyPositionOrgStrDescription: this.projectStrGeoData?.project_noted,
                        modifyCheckOrgPosStatus: true
                    }
                    this.geoDeptOrgStrServicesPosition.modifyNewOrgStrDeptPositionGeoProject(parentPosBoardMgtId, editDataBoardMgtPositionDept ? editDataBoardMgtPositionDept : {})
                    .then(async (posDeptId) => {
                        if(posDeptId?.status === 200){
                            setTimeout(async () => {
                                this.hasBoardMgtPositionErrors = false
                                this.submittingBoardMgtData = false;
                                this.$notify({
                                    title: 'Editing position successfully!',
                                    message:String(posDeptId.data?.message).toString() ? String(posDeptId.data?.message).toString() : '',
                                    type: 'success'
                                });
                                // Relist Get Board Manager Department Positions
                                await this.getPositionDeptBoardMgtBySuper(parentBoardDeptOrgStrId);
                                if (!this.hasBoardMgtPositionErrors) {
                                    this.$emit('close')
                                }
                            }, 1000);
                        }
                    }).catch((error)=> {
                        let message = error?.message;
                        this.setToastError(message);
                        this.$notify({
                            title: 'Unsuccessfully updated base org-structure department',
                            message:String(message.data?.message).toString() ? String(message.data?.message).toString() : '',
                            type: 'error'
                        });
                        this.submittingProvinceData = false;
                    });
                }else{
                    this.hasBoardMgtPositionErrors = false;
                }
            }catch(error){
                throw Error(error || error.message);
            }
        },
        // Remove Positions
        confirmDeletedDeptPosOrgStrById(id) {
            this.deletedGeoDeptPosMgtDialogs = true;
            if (id !== null && id !== undefined || !isNaN(Number(id)) && id !== '') {
                this.dataDeletedOrgBoardPosId = parseInt(id);
            }
        },
        async confirmRemoveDeptPosMgtBoardById() {
            const getDeletedOrgStrId = parseInt(this.dataDeletedOrgId) ? parseInt(this.dataDeletedOrgId) : 0;
            setTimeout(async () => {
                try {
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
                        }
                    })
                    .catch((error) => {
                        this.deletedGeoDeptPosMgtDialogs = true;
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
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
                } catch (error) {
                    throw Error(error || error.message);
                }
            },1000);
        },
        /**
         * @Filter Position base org - structure departments
         * */ 
        async onChangeSelectedDeptOrgStructureBoardMgt(event) {
            try {
                // Clear Not Found Board Mgt or GeoFence 
                if(event === null || typeof event === 'undefined' && event === ''){
                    this.fetchingOrgStrDeptPosId = false;
                    this.orgDeptBoardMgtBaseEmpIdSelected = []
                }
                if (
                    event !== null ||
                    (event !== undefined && typeof event !== "object")
                ) {
                    const getPosOrgMgtBoard = event ? event : {};
                    const keyValueDeptPosId = Object.keys(getPosOrgMgtBoard)[0];
                    const mgtBoardDeptPos = keyValueDeptPosId
                        .split(/[,-]+/)
                        .pop();
                    let getBoardMgtDeptPosSuperId;
                    if (
                        typeof mgtBoardDeptPos === "undefined" ||
                        mgtBoardDeptPos === null
                    ) {
                        getBoardMgtDeptPosSuperId = 0;
                    } else {
                        getBoardMgtDeptPosSuperId = mgtBoardDeptPos ?
                            mgtBoardDeptPos :
                            {};
                    }
                    // Relist Get Board Manager Department Positions
                    await this.getPositionDeptBoardMgtBySuper(getBoardMgtDeptPosSuperId);
                }
            } catch (error) {
                return Promise.reject(error);
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
        }
    },
}