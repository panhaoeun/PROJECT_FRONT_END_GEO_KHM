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
        ...mapGetters('orgStrDeptPosGeo', ['allOrgJobDescriptionBaseProject', "allOrgPosJobDescriptionBaseProject"]),
        getJobDescriptionsBaseProject() {
            const orgStrDeptJobDes =
                this.allOrgJobDescriptionBaseProject ?
                this.allOrgJobDescriptionBaseProject: [];
            if (orgStrDeptJobDes !== null ||
                orgStrDeptJobDes !==
                undefined &&
                typeof orgStrDeptJobDes !== 'string'
            ) {
                return orgStrDeptJobDes ? orgStrDeptJobDes : []
            }
            return [];
        },
        getJobDescriptionsPositionBaseProject() {
            const orgStrDeptJobDesPos =
                this.allOrgPosJobDescriptionBaseProject ?
                this.allOrgPosJobDescriptionBaseProject: [];
            if (orgStrDeptJobDesPos !== null ||
                orgStrDeptJobDesPos !==
                undefined &&
                typeof orgStrDeptJobDesPos !== 'string'
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
                                detail: "Please input filed position form have missing value!",
                                life: 3000,
                            });
                            return false;
                        }
                        return false;
                    }
                    // Check get value multiple inputs fields
                    let objFiled = {};
                    objFiled.selectedOrgStructId = parseInt(this.getOrgStructureAdd) ?? 0;
                    objFiled.addNewJobDesEnglishName = String(this.addJobDeptNameEngProjectOrgStr).toString();
                    objFiled.addNewJobDesKhmerName = String(this.addJobDeptNameKhmerProjectOrgStr).toString();
                    objFiled.addNewJobDesNoted = String(this.addJobDeptDescriptionProjectOrgStr).toString();
                    objFiled.addJobDesType = this.addJobDescType;
                    objFiled.assignFileOrgStrDept = this.filesJobDeptDes ? this.filesJobDeptDes : {};
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
                            this.close();
                            // Relist Get Board Manager Job Descriptions Data
                            await this.getJobDescriptionType(parseInt(this.getOrgStructureAdd) ?? 0, this.addJobDescType);
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully add new job descriptions.",
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
                if(this.getPosEditJobDes?.jobDesEng 
                    && this.getPosEditJobDes?.jobDesEng !== null
                    && typeof this.getPosEditJobDes !== 'undefined'
                ){
                    this.submittingJobDesc = true;
                    const parentJobDescOrgStrId = parseInt(this.getPosEditJobDes?.orgStrId) ? parseInt(this.getPosEditJobDes?.orgStrId) : 0;
                    const parentJobDesId = parseInt(this.getPosEditJobDes?.jobDesId) ? parseInt(this.getPosEditJobDes?.jobDesId) : 0;
                    const jobDesStatus = parseInt(this.getPosEditJobDes?.jobDeStatus) ? parseInt(this.getPosEditJobDes?.jobDeStatus) : 0
                    const editDataJobDescDept = {
                        modifyOrgDeptId: parentJobDescOrgStrId ? parentJobDescOrgStrId : 0,
                        modifyJobDeOrgStrEnglishName: String(this.getPosEditJobDes?.jobDesEng).toString(),
                        modifyJobDeOrgStrKhmerName: String(this.getPosEditJobDes?.jobDesKhmer).toString(),
                        modifyJobDesOrgStrDescription: String(this.projectStrGeoData?.jobDesNoted).toString(),
                        statusJobDesType: jobDesStatus ? jobDesStatus : "",
                        assignFileOrgStrDept: this.files ? this.files : []
                    }
                    this.geoDeptOrgStrServicesPosition.modifyNewOrgStructureJobDescriptions(parentJobDesId, editDataJobDescDept ? editDataJobDescDept : {})
                    .then(async (jobDes) => {
                        if(jobDes?.status === 200){
                            setTimeout(async () => {
                                this.hasJobDescErrors = false
                                this.submittingJobDesc = false;
                                this.$notify({
                                    title: 'Editing job description successfully!',
                                    message:String(jobDes.data?.message).toString() ? String(jobDes.data?.message).toString() : '',
                                    type: 'success'
                                });
                                /**
                                 * @Relist Get Job Department and Position Descriptions 
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
                        this.$notify({
                            title: 'Unsuccessfully updated base job descriptions',
                            message:String(message.data?.message).toString() ? String(message.data?.message).toString() : '',
                            type: 'error'
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
         * @Reload Positions base board manager()
         * */ 
        async getJobDescriptionType(getOrgId, getJobDescType = "Position") {
            this.fetchingOrgStrDeptPosId = true;
            setTimeout(async () => {
                try {
                    if (!getOrgId) {
                        throw Error('Please selected org-structure is required');
                    }
                    if (getOrgId !== null && !isNaN(Number(getOrgId)) || getJobDescType !== '') {
                        let getOrgStrId = parseInt(getOrgId) ? parseInt(getOrgId) : 0;
                        const optSelectedJobDescOrgId = {
                            getOrgStrId,
                            getJobDescType
                        }
                        this.setJobDescriptionBaseOrgStrId(optSelectedJobDescOrgId);
                    }
                } catch (e) {
                    return Promise.reject(e);
                }
                this.fetchingOrgStrDeptPosId = false;
            }, 1000);
        }
    },
}