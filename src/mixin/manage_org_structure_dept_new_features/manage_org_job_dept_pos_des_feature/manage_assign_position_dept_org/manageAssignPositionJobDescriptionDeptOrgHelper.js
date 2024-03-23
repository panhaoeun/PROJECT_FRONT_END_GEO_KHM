import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    data() {
        return {
            openDataJobPos: null,
            openEditedJobDescDialogs: false,
            deletedJobDescDialogs: false,
            deletedJobDescId: 0
        }
    },
    created() {
        this.geoDeptOrgStrServicesPosition = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        ...mapGetters('orgStrDeptPosGeo', ['allOrgJobPositionByDeptStr', "allOrgPosJobDescriptionBaseProject"]),
        getJobDescriptionsPositionDeptOrg() {
            const orgStrDeptJobDesPosition =
                this.allOrgJobPositionByDeptStr ?
                this.allOrgJobPositionByDeptStr: [];
            if (orgStrDeptJobDesPosition !== null ||
                orgStrDeptJobDesPosition !==
                undefined &&
                typeof orgStrDeptJobDesPosition !== 'string'
            ) {
                return orgStrDeptJobDesPosition ? orgStrDeptJobDesPosition : []
            }
            return [];
        },
        getPositionSelectedDeptId() {
            const orgStrPositionSelectedEdit =
                 this.selectedPositionDesDept ?
                 this.selectedPositionDesDept: null;
             if  (
                orgStrPositionSelectedEdit !== null ||
                (orgStrPositionSelectedEdit !== undefined && typeof orgStrPositionSelectedEdit !== "object")
                && orgStrPositionSelectedEdit > 0
            ) {
                return parseInt(orgStrPositionSelectedEdit?.deptPosId) ? parseInt(orgStrPositionSelectedEdit?.deptPosId) : 0;
            }
            return 0;
         },

    },
    methods: {
        ...mapActions('orgStrDeptPosGeo', ['setJobPositionDescriptionBaseOrgStrId']),
        /**
         * @Global Org-Structure for manage base on project and geo-fence locations  of Projects
         * */
        async handleEditJobDescriptionsSubmit(validate) {
            try {
                this.submitted = true;
                this.loadingBtnEdit = true;
                this.v$.$touch();
                const positionId = parseInt(this.orgStrNameEditedId);
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
                    const objInputPositionsFiled = this.state?.dyNamicAddNewFrmJobDes
                        ? this.state?.dyNamicAddNewFrmJobDes
                        : [];
                    for (
                        let index = 0;
                        index < objInputPositionsFiled.length;
                        index++
                    ) {
                        let objFiled = {};

                        objFiled.selectedPositionOrgDeptId = positionId ? positionId : 0;
                        objFiled.addNewPositionJobDesEnglishName = objInputPositionsFiled[index].editNameEngProjectOrgStr;
                        objFiled.addNewPositionJobDesKhmerName = objInputPositionsFiled[index].editNameKhmerProjectOrgStr;
                        objFiled.addNewPositionJobDesNoted = objInputPositionsFiled[index].editDescriptionProjectOrgStr;
                        // Add the new org-structures
                        const addNewPositionParentObj = {
                            ...objFiled,
                        }
                        this.geoDeptOrgStrServicesPosition?.createNewPositionJobDescBaseOrStrId(
                            addNewPositionParentObj
                            ? addNewPositionParentObj
                            : {}
                        ) .then(async (jobDes) => {
                        if (jobDes?.data.success === true) {
                            this.loadingBtnEdit = false;
                            this.visibleDialogAddPositionBoardMgt = false;
                            this.close();
                            // Relist Get Board Manager Job Descriptions Data
                            await this.getAllReloadPositionDesBasePositionId(positionId);
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully add new job position descriptions.",
                                detail: String(jobDes.data?.message).toString()
                                    ? String(jobDes.data?.message).toString()
                                    : null,
                                life: 3000,
                            });
                            // Clear Data Input Position department
                            this.state.dyNamicAddNewFrmJobDes = [{
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
                                : "Please input filed job position descriptions have missing value!",
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
                                        : "Please input filed job position descriptions have missing value!",
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
        /*
        ** @Edit and Dialogs Removes
        */
       async openEditDialogsJobDescRename(data){
            if(data !== undefined || data !== null){
                this.openDataJobDesc = data ? data : {};
                this.openEditedJobDescDialogs = true;
            }
       },
       async saveModifyJobDescriptionBaseOrgStructureId(){
            try{
                if(this.getPosEditJobDes?.posDesNameEng 
                    && this.getPosEditJobDes?.posDesNameEng !== null
                    && typeof this.getPosEditJobDes !== 'undefined'
                ){
                    this.submittingJobDesc = true;
                    console.log(this.getPositionSelectedDeptId)
                    const positionId = this.getPositionSelectedDeptId ? this.getPositionSelectedDeptId : parseInt(this.getPosEditJobDes.positionId);
                    const parentJobDesPosId = parseInt(this.getPosEditJobDes?.positionDesId) ? parseInt(this.getPosEditJobDes?.positionDesId) : 0;
                    const editDataJobDescDept = {
                        modifyPositionDeptId: positionId ? positionId : 0,
                        modifyJobPosDeptEnglishName: String(this.getPosEditJobDes?.posDesNameEng).toString(),
                        modifyJobPosDeptKhmerName: String(this.getPosEditJobDes?.posDesNameKh).toString(),
                        modifyJobPosDeptDescription: String(this.projectStrGeoData?.posNotedDes).toString()
                    }
                    this.geoDeptOrgStrServicesPosition.modifyNewOrgStructurePositionJobDescriptions(parentJobDesPosId, editDataJobDescDept ? editDataJobDescDept : {})
                    .then(async (jobDes) => {
                        if(jobDes?.status === 200){
                            setTimeout(async () => {
                                this.hasJobDescErrors = false
                                this.submittingJobDesc = false;
                                this.$toast.add({
                                    severity: "success",
                                    summary: "Editing job description successfully!",
                                    message: String(jobDes.data?.message).toString() ? String(jobDes.data?.message).toString() : '',
                                    life: 3000,
                                });
                                /**
                                 * @Relist Get Job Descriptions 
                                */ 
                                await this.getAllReloadPositionDesBasePositionId(positionId);
                                if (!this.hasJobDescErrors) {
                                    this.$emit('close')
                                }
                            }, 1000);
                        }
                    }).catch((error)=> {
                        let message = error?.message;
                        this.setToastError(message);
                        this.$notify({
                            title: 'Unsuccessfully updated base job descriptions',
                            message:String(message.data?.message).toString() ? String(message.data?.message).toString() : '',
                            type: 'error'
                        });
                        this.submittingJobDesc = false;
                    });
                }else{
                    this.$toast.add({
                        severity: "error",
                        summary: "Please input filed job descriptions have missing value!",
                        life: 3000,
                    });
                    this.hasJobDescErrors = true;
                    this.submittingJobDesc = false;
                }
            }catch(error){
                throw Error(error || error.message);
            }
       },
       closingPopupEditedJobPosDesIdOrgStrDialogs(){
            this.openEditedJobDescDialogs = false;
       },
       // Remove Job Description
       confirmDeletedJobDesOrgStrById(id) {
            this.deletedJobDescDialogs = true;
            if (id !== null && id !== undefined || !isNaN(Number(id)) && id !== '') {
                this.deletedJobDescId = parseInt(id?.positionDesId);
                this.getNameRemove = String(id.posDesNameEng);
            }
       },
       async confirmRemoveJobDescOrgStructurePositionDept() {
            const getDeletedJobDescStrId = this.deletedJobDescId ? this.deletedJobDescId : 0;
            this.loadingRemoveDeptPos = true;
            setTimeout(async () => {
                try {
                    setTimeout(()=> {
                        if (getDeletedJobDescStrId !== null &&
                        getDeletedJobDescStrId !== undefined ||
                        !isNaN(Number(getDeletedJobDescStrId)) &&
                        getDeletedJobDescStrId !== ''
                    ) {
                        this.geoDeptOrgStrServicesPosition?.removeNewOrgStructurePositionJobDesc(getDeletedJobDescStrId).then(async (removeJobDec) => {
                        if (removeJobDec?.data.success === true) {
                            this.deletedGeoDeptPosMgtDialogs = false;
                            // Reload Data In Datable in Job Descriptions
                            await this.getAllReloadPositionDesBasePositionId(getDeletedJobDescStrId);
                            this.deletedJobDescDialogs = false;
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully remove job description.",
                                detail: removeJobDec.data?.message
                                    ? removeJobDec.data?.message
                                    : null,
                                life: 3000,
                            });
                        }
                    })
                    .catch((error) => {
                        this.deletedJobDescDialogs = true;
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: error?.response.data.error?.message
                                ? error?.response.data.error?.message
                                : "Error remove job description!",
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
                                        : "Please input filed job description have missing value!",
                                    life: 3000,
                                });
                            }
                        }
                    });
                    }
                        this.loadingRemoveDeptPos = false;
                    },1000);
                    
                } catch (error) {
                    throw Error(error || error.message);
                }
            },1000);
        },
        /**
         * @Reload Positions base board manager()
         * */ 
        async getAllReloadPositionDesBasePositionId(positionDeptOrgId) {
            this.fetchingOrgStrDeptPosId = true;
            setTimeout(async () => {
                try {
                    if (!positionDeptOrgId) {
                        throw Error('Please selected a position department organization');
                    }
                    if (positionDeptOrgId !== null && !isNaN(Number(positionDeptOrgId)) || positionDeptOrgId !== '') {
                        let getOrgStrPosId = parseInt(positionDeptOrgId) ? parseInt(positionDeptOrgId) : 0;
                        const optSelectedJobDescPosOrgId = {
                            getOrgStrPosId
                        }
                        this.setJobPositionDescriptionBaseOrgStrId(optSelectedJobDescPosOrgId);
                    }
                } catch (e) {
                    return Promise.reject(e);
                }
                this.fetchingOrgStrDeptPosId = false;
            }, 1000);
        }
    },
}