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
                        objFiled.selectedOrgStructId = parseInt(this.getOrgStructureAdd.id) ?? 0;
                        objFiled.addNewJobDesEnglishName = objInputPositionsFiled[index].editNameEngProjectOrgStr;
                        objFiled.addNewJobDesKhmerName = objInputPositionsFiled[index].editNameKhmerProjectOrgStr;
                        objFiled.addNewJobDesNoted = objInputPositionsFiled[index].editDescriptionProjectOrgStr;
                        objFiled.addJobDesType = this.addJobDescType;
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
                            await this.getPositionDeptBoardMgtBySuper(parseInt(this.getOrgStructureAdd.id) ?? 0, this.addJobDescType);
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully add new job descriptions.",
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