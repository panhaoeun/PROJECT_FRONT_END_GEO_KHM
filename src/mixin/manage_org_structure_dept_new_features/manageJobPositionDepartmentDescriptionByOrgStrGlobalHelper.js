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
            deletedJobDescId: 0,
            loadingPositionDeptJobDes: false
        }
    },
    created() {
        this.geoDeptOrgStrServicesPosition = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        ...mapGetters('orgStrDeptPosGeo', ['allOrgJobDescriptionAssignDepartmentAssign', "allOrgJobPositionDescriptionAssign"]),
        getJobDescriptionsDeptAssign() {
            const orgStrDeptJobDes =
                this.allOrgJobDescriptionAssignDepartmentAssign ?
                this.allOrgJobDescriptionAssignDepartmentAssign: [];
            const orgDepOrgStrId = this.orgStructDeptJobDeptId ? this.orgStructDeptJobDeptId : 0;
            if (orgDepOrgStrId !== null ||
                orgDepOrgStrId !==
                undefined &&
                typeof orgDepOrgStrId !== 'string'
                && orgDepOrgStrId > 0
            ) {
                return orgStrDeptJobDes ? orgStrDeptJobDes : []
            }
            return [];
        },
        getJobDescriptionPositionAssign() {
            const orgStrDeptJobDesPos =
                this.allOrgJobPositionDescriptionAssign ?
                this.allOrgJobPositionDescriptionAssign: [];
            const orgStrPositionJobDes = this.orgStructDeptJobPositionId ? this.orgStructDeptJobPositionId : 0;
            if (orgStrPositionJobDes !== null ||
                orgStrPositionJobDes !==
                undefined &&
                typeof orgStrPositionJobDes !== 'string'
                && orgStrPositionJobDes > 0
            ) {
                return orgStrDeptJobDesPos ? orgStrDeptJobDesPos : []
            }
            return [];
        }
    },
    methods: {
        ...mapActions('orgStrDeptPosGeo', ['setJobDescriptionBaseOrgStrId']),
        /**
         * @Global Org-Structure for manage base on project and geo-fence locations  of Projects
         * */
        async handleEditJobDescriptionsSubmit(validate) {
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
                                message: 'Please input filed position form have missing value!',
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
                        objFiled.selectedOrgStructId = parseInt(this.getOrgStructureAdd.id) ?? 0;
                        objFiled.addNewJobDesEnglishName = objInputPositionsFiled[index].editNameEngProjectOrgStr;
                        objFiled.addNewJobDesKhmerName = objInputPositionsFiled[index].editNameKhmerProjectOrgStr;
                        objFiled.addNewJobDesNoted = objInputPositionsFiled[index].editDescriptionProjectOrgStr;
                        objFiled.addJobDesType = this.addJobDescType;
                        // Add the new org-structures
                        const addNewPositionParentObj = {
                            ...objFiled,
                        }
                        this.geoDeptOrgStrServicesPosition?.createNewJobDescBaseOrStrId(
                            addNewPositionParentObj
                            ? addNewPositionParentObj
                            : {}
                        ) .then(async (jobDes) => {
                        if (jobDes?.data.success === true) {
                            this.loadingBtnEdit = false;
                            this.visibleDialogAddPositionBoardMgt = false;
                            // Relist Get Board Manager Job Descriptions Data
                            await this.getJobDescriptionType(parseInt(this.getOrgStructureAdd.id) ?? 0, this.addJobDescType);
                            this.$toast.add({
                                severity: "error",
                                summary: "Successfully add new job descriptions.",
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
                                : "Please input filed job descriptions have missing value!",
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
                                        : "Please input filed job descriptions have missing value!",
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
        ** @Edit and Dialogs Removes Department Descriptions
        */
       async openEditDialogsJobDescRename(data){
            if(data !== undefined || data !== null){
                this.openDataJobDesc = data ? data : {};
                this.openEditedJobDescDialogs = true;
            }
       },
       async saveModifyJobDescriptionBaseOrgStructureId(){
            try{
                if(this.getPosEditJobDes?.jobDesEng 
                    && this.getPosEditJobDes?.jobDesEng !== null
                    && typeof this.getPosEditJobDes !== 'undefined'
                ){
                    this.submittingJobDesc = true;
                    const parentJobDescOrgStrId = parseInt(this.getPosEditJobDes?.orgStrId) ? parseInt(this.getPosEditJobDes?.orgStrId) : 0;
                    const parentJobDesId = parseInt(this.getPosEditJobDes?.jobDesId) ? parseInt(this.getPosEditJobDes?.jobDesId) : 0;
                    const jobDesStatus = this.getPosEditJobDes?.jobDeStatus ? this.getPosEditJobDes?.jobDeStatus : 0
                    const editDataJobDescDept = {
                        modifyOrgDeptId: parentJobDescOrgStrId ? parentJobDescOrgStrId : 0,
                        modifyJobDeOrgStrEnglishName: String(this.getPosEditJobDes?.jobDesEng).toString(),
                        modifyJobDeOrgStrKhmerName: String(this.getPosEditJobDes?.jobDesKhmer).toString(),
                        modifyJobDesOrgStrDescription: String(this.projectStrGeoData?.jobDesNoted).toString(),
                        statusJobDesType: jobDesStatus ? jobDesStatus : ""
                    }
                    this.geoDeptOrgStrServicesPosition.modifyNewOrgStructureJobDescriptions(parentJobDesId, editDataJobDescDept ? editDataJobDescDept : {})
                    .then(async (jobDes) => {
                        if(jobDes?.status === 200){
                            setTimeout(async () => {
                                this.hasJobDescErrors = false
                                this.submittingJobDesc = false;
                                this.$toast.add({
                                    severity: "success",
                                    summary: "Editing Org Structures Job Description Successfully.",
                                    message:String(jobDes.data?.message).toString() ? String(jobDes.data?.message).toString() : '',
                                    life: 3000,
                                });
                                /**
                                 * @Relist Get Job Descriptions 
                                */ 
                                await this.getJobDescriptionType(parentJobDesId, jobDesStatus);
                                if (!this.hasJobDescErrors) {
                                    this.$emit('close')
                                }
                            }, 1000);
                        }
                    }).catch((error)=> {
                        let message = error?.message;
                        this.setToastError(message);
                        this.$toast.add({
                            severity: "error",
                            summary: "Unsuccessfully updated base job descriptions",
                            message:String(error.data?.message).toString() ? String(error.data?.message).toString() : '',
                            life: 3000,
                        });
                        this.submittingJobDesc = false;
                    });
                }else{
                    this.hasJobDescErrors = false;
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
                this.deletedJobDescId = parseInt(id?.jobDesId);
            }
       },
       async confirmRemoveJobDescOrgStructureById() {
            const getDeletedJobDescStrId = this.deletedJobDescId ? this.deletedJobDescId : 0;
            setTimeout(async () => {
                try {
                    if (getDeletedJobDescStrId !== null &&
                        getDeletedJobDescStrId !== undefined ||
                        !isNaN(Number(getDeletedJobDescStrId)) &&
                        getDeletedJobDescStrId !== ''
                    ) {
                        this.geoDeptOrgStrServicesPosition?.removeNewOrgStructureJobDesc(getDeletedJobDescStrId).then(async (removeJobDec) => {
                        if (removeJobDec?.data.success === true) {
                            this.deletedGeoDeptPosMgtDialogs = false;
                            // Reload Data In Datable in Job Descriptions
                            await this.getJobDescriptionType(getDeletedJobDescStrId, this.addJobDescType);
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
                } catch (error) {
                    throw Error(error || error.message);
                }
            },1000);
        },
     
        /**
        *@Edit and Dialogs Removes Positions Descriptions
        */
        editGeoOrgDeptPosStrByPosIdDialog(position) {
            this.dataEditOrgPositionDes = position ? position : {};
            this.openEditedPositionDialogs = true;
        },
        closingPopupEditedPosIdOrgStrDialogs() {
            this.openEditedPositionDialogs = true;
            setTimeout(() => {
                this.openEditedPositionDialogs = false;
            }, 100);
        },
        confirmDeletedDeptPosOrgStrById(id) {
            this.deletedGeoDeptPosMgtDialogs = true;
            if (id.jobDesId !== null && id.jobDesId !== undefined || !isNaN(Number(id.jobDesId)) && id.jobDesId !== '') {
                this.dataDeletedOrgBoardPosId = parseInt(id.jobDesId);
            }
        },
        async confirmRemoveDeptPositionDescription() {
            const getDeletedOrgStrId = parseInt(this.dataDeletedOrgBoardPosId) ? parseInt(this.dataDeletedOrgBoardPosId) : 0;
            setTimeout(async () => {
                try {
                    if (getDeletedOrgStrId !== null &&
                        getDeletedOrgStrId !== undefined ||
                        !isNaN(Number(getDeletedOrgStrId)) &&
                        getDeletedOrgStrId !== ''
                    ) {
                        this.geoDeptOrgStrServicesPosition?.removeNewOrgStructureJobDesc(getDeletedOrgStrId).then(async (removePosDept) => {
                        if (removePosDept?.data.success === true) {
                            this.deletedGeoDeptPosMgtDialogs = false;
                            // Reload Data In Datable in Dept org-str geo-fence
                            this.fetchingOrgStrDeptPosId = false;
                            await this.getJobDescriptionType(getDeletedOrgStrId, this.addJobDescType);

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
         * @Reload Positions and Department Job Descriptions
         * */
        async getJobDescriptionType(getOrgId, getJobDescType = "Position") {
            this.loadingPositionDeptJobDes = true;
            setTimeout(async () => {
                try {
                    if (!getOrgId) {
                        throw Error('Please selected org-structure is required');
                    }
                    if (getOrgId !== null && !isNaN(Number(getOrgId)) || getJobDescType !== '') {
                        let getOrgStrId = parseInt(getOrgId) ? parseInt(getOrgId) : 0;
                        await this.setJobDescriptionBaseOrgStrId({
                            getOrgStrId,
                            getJobDescType
                        });
                    }
                } catch (e) {
                    throw Error(e || e.message);
                }
                this.loadingPositionDeptJobDes = false;
            }, 1500);
        }
    },
}