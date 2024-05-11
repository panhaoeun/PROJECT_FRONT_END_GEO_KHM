import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";
import {
    mapActions,
    mapGetters
} from "vuex";
import * as yup from "yup";

export default {
    created() {
        this.serviceManageStructuresAdmin = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        ...mapGetters('orgStrDeptPosGeo', ['getReloadEmployeeOrgDeptProfileAccount']),
        getViewDetailEmployeeData() {
            const getEmpProfile =
                this.getReloadEmployeeOrgDeptProfileAccount ?
                this.getReloadEmployeeOrgDeptProfileAccount: [];
            if (getEmpProfile !== null ||
                getEmpProfile !==
                undefined &&
                typeof getEmpProfile !== 'string'
            ) {
                return getEmpProfile ? getEmpProfile : []
            }
            return [];
        },
    },
    data() {
        return {
            schemas: [
                yup.object({
                    perInfoEnglishName: yup.string().label('Please enter english name').required(),
                    perInfoKhmerName: yup.string().label('Please enter khmer name').required(),
                    perInfoPhoneNumber: yup.string()
                        .min(10)
                        .max(13)
                        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, {
                            message: 'Please enter valid number.',
                            excludeEmptyString: false
                        })
                        .label('Please enter phone number')
                        .required(),
                }),
            ],
        }
    },
    methods: {
        ...mapActions('orgStrDeptPosGeo', ['setViewEmployeeProfileDeptOrgStructureAccount']),
        async getAllReloadJobHistoryWorkDeptPositionOrg(getProfileEmp) {
            this.fetchingOrgStrDataHistoryWork = true;
            setTimeout(async () => {
                try {
                    if (!getProfileEmp) {
                        throw Error('Please selected employee profile org-structure id is required');
                    }
                    if (getProfileEmp !== null && !isNaN(Number(getProfileEmp)) || getProfileEmp !== '') {
                        let getEmpId = parseInt(getProfileEmp) ? parseInt(getProfileEmp) : 0;
                        const optSelectedOrgDeptEmpProfile = {
                            getEmpId
                        }
                        this.setViewEmployeeProfileDeptOrgStructureAccount(optSelectedOrgDeptEmpProfile);
                    }
                } catch (error) {
                    throw Error(error || error.message)
                }
                this.fetchingOrgStrDataHistoryWork = false;
            }, 1000);
        },
        /**
         * Store Multiple Admin Users
        **/
        extendedSplit(str) {
            let splitFirstChart;
            if (typeof str !== "undefined") {
                splitFirstChart = String(str)
                    .split(/\s/)
                    .reduce(
                        (response, word) => (response += word.slice(0, 1)),
                        ""
                    )
                    .toUpperCase();
                return splitFirstChart;
            }
            return "PRO";
        },
        imageURLEmpOrgProfile(path) {
            return (
                this.ENV_HOST_PATH_FILE +
                `uploads/files_org_dept/` +
                path
            );
        },
        onSelectedFileEmployeeProfile(event) {
            this.profileEmp = event.files;
            
            this.profileEmp.forEach((file) => {
                this.totalSize += parseInt(this.formatSize(file.size));
            });
                this.$emit("employeeFile", event?.files);
        },
        /**
         * Save Add Multiple Admin Users
         **/
        async addNewEmployeeAdminEmployee({
            formWizard = [],
            expInfo = [],
            eduInfo = [],
            skillInfo = [],
            languagesInfo = [],
            referenceInfo = [],
            hobbiesPersonalInfo = []
        }) {
            try {
                const {
                    perInfoEnglishName,
                    perInfoKhmerName,
                    perInfoPhoneNumber,
                    perInfoEmail,
                    perInfoAddress,
                    perInfoNational,
                    perInfoDescriptions
                } = formWizard ? formWizard : [];
                this.loadingAddNewEmp = true;
                setTimeout(async () => {
                    this.loadingAddNewEmp = false;
                    if (
                        !perInfoEnglishName !== null ||
                        perInfoEnglishName !== "" ||
                        perInfoNational !== null
                    ) {
                        const addNewEmpOrgDept = {
                            deptAddNewEmpNameEng: String(perInfoEnglishName).toString() ?? '',
                            deptAddNewEmpNameKH: String(perInfoKhmerName).toString() ?? '',
                            deptAddNewEmpPhoneNumber: String(perInfoPhoneNumber) ?? '',
                            deptAddNewEmpEmailContact: String(perInfoEmail).toString() ?? '',
                            deptAddNewEmpAddress: String(perInfoAddress).toString() ?? '',
                            deptAddNewEmpNationalCountry: String(perInfoNational).toString() ?? '',
                            deptAddNewEmpDescription: String(perInfoDescriptions).toString() ?? '',
                            deptAddNewEmpDateOfBirth: '',
                            deptAddNewEmpStartDate: '',
                            deptAddNewEmpGender: '',
                            employeeProfile: this.profileEmp ? this.profileEmp : '',
                            addNewEmpMultiExperienceJobWork: expInfo ? expInfo : [],
                            addNewEmpMultiEducation: eduInfo ? eduInfo : [],
                            addNewEmpMultiSkillJobWork: skillInfo ? skillInfo : [],
                            addNewEmpMultiLanguagesKnowledge: languagesInfo ? languagesInfo : [],
                            addNewEmpMultiReferenceJob: referenceInfo ? referenceInfo : [],
                            addNewEmpMultiHobbies: hobbiesPersonalInfo ? hobbiesPersonalInfo : []
                        };
                        // Add New Organization 
                        this.serviceManageStructuresAdmin
                            ?.createStoreEmpOrg(
                                addNewEmpOrgDept
                                    ? addNewEmpOrgDept
                                    : []
                            )
                            .then(async (employee) => {
                                if (employee?.data.success === true) {   
                                    this.loadingAddNewEmp = false;
                                    this.$toast.add({
                                        severity: "success",
                                        summary:
                                            "Successfully add employee profile.",
                                        detail: employee.data?.message
                                            ? employee.data?.message
                                            : null,
                                        life: 3000,
                                    });
                                    this.$router.push(
                                        "/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module"
                                    );
                                    // Employee Profiles
                                    const employeeProfileId = parseInt(employee?.data.result.resultStatus.id) ?? 0;
                                    this.getAllReloadJobHistoryWorkDeptPositionOrg(employeeProfileId ? employeeProfileId : 0);

                                    // Clear Data Input
                                    this.orgStrBoardMgtEnglishName = "";
                                    this.orgStrBoardMgtKhmerName = "";
                                    this.descriptionOrgStrBoardMgt = "";
                                }
                            })
                            .catch((error) => {
                                this.loadingSubmittedAddMgtBoardStrOrg = false;
                                this.$toast.add({
                                    severity: "error",
                                    summary: "Please Fix Below Errors.",
                                    detail: error?.response.data.error?.message
                                        ? error?.response.data.error?.message
                                        : "Please input filed add new employee value!",
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
                                                : "Please input add new employee have missing value!",
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
         * Store Updated Modify Admin Users
        **/
       async addUpdatedEmpPersonalInfoMulti({
        formWizard = [],
        expInfo = [],
        eduInfo = [],
        skillInfo = [],
        languagesInfo = [],
        referenceInfo = [],
        hobbiesPersonalInfo = []
       }) {
            try {
                const {
                    perInfoEnglishName,
                    perInfoKhmerName,
                    perInfoPhoneNumber,
                    perInfoEmail,
                    perInfoAddress,
                    perInfoNational,
                    perInfoDescriptions
                } = formWizard ? formWizard : [];
                    setTimeout(async () => {
                    this.loadingAddNewEmp = false;
                    if (
                        !perInfoEnglishName !== null ||
                        perInfoPhoneNumber !== "" ||
                        perInfoNational !== null
                    ) {
                        const modifyEmpPersonalInfo = {
                            modifyPersonalEmpNameEng: String(perInfoEnglishName).toString() ?? '',
                            modifyPersonalEmpNameKh: String(perInfoKhmerName).toString() ?? '',
                            modifyPersonalEmpGender: '',
                            modifyPersonalEmpDOB:'',
                            modifyPersonalPhoneNumber: '',
                            modifyPersonalEmpStartDate: '',
                            modifyPersonalEmpNoted: String(perInfoDescriptions).toString() ?? '',
                            pathNameEmpProfile: '',
                            modifyPersonalEmpEmailAddr: String(perInfoEmail).toString() ?? '',
                            modifyPersonalEmpAddress: String(perInfoAddress).toString() ?? '',
                            modifyPersonalNationCountry: String(perInfoNational).toString(perInfoNational) ?? '',
                            // Modify Information Employee
                            modifyExpInfo: expInfo ? expInfo : [],
                            modifyEduInfo: eduInfo ? eduInfo : [],
                            modifySkillInfo: skillInfo ? skillInfo : [],
                            modifyLanguageInfo: languagesInfo ? languagesInfo : [],
                            modifyReferInfo: referenceInfo ? referenceInfo : [],
                            modifyHobbies: hobbiesPersonalInfo ? hobbiesPersonalInfo : []
                        }
                        const empIdModify = parseInt(this.$route.params.id)
                        ? parseInt(this.$route.params.id)
                        : 0;
                        this.serviceManageStructuresAdmin
                            ?.updatedStoreEmpOrg(empIdModify,
                                modifyEmpPersonalInfo
                                    ? modifyEmpPersonalInfo
                                    : []
                            )
                            .then(async (employee) => {
                                if (employee?.data.success === true) {   
                                    this.loadingAddNewEmp = false;
                                    this.$toast.add({
                                        severity: "success",
                                        summary:
                                            "Successfully add employee profile.",
                                        detail: employee.data?.message
                                            ? employee.data?.message
                                            : null,
                                        life: 3000,
                                    });
                                    this.$router.push(
                                        "/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module"
                                    );
                                    // Employee Profiles
                                    const employeeProfileId = parseInt(employee?.data.result.resultStatus.id) ?? 0;
                                    this.getAllReloadJobHistoryWorkDeptPositionOrg(employeeProfileId ? employeeProfileId : 0);

                                    // Clear Data Input
                                    this.orgStrBoardMgtEnglishName = "";
                                    this.orgStrBoardMgtKhmerName = "";
                                    this.descriptionOrgStrBoardMgt = "";
                                }
                            })
                            .catch((error) => {
                                this.loadingSubmittedAddMgtBoardStrOrg = false;
                                this.$toast.add({
                                    severity: "error",
                                    summary: "Please Fix Below Errors.",
                                    detail: error?.response.data.error?.message
                                        ? error?.response.data.error?.message
                                        : "Please input filed add new employee value!",
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
                                                : "Please input add new employee have missing value!",
                                            life: 3000,
                                        });
                                    }
                                }
                        });
                        console.log(modifyEmpPersonalInfo, "modifyEmpPersonalInfo")
                    }
                })
            } catch (error) {
                throw Error(error || error?.message);
            }
       },
        async confirmRemovedEmployeeAccountProfile() {
            const getDeleteEmpId = this.usersID ? this.usersID  : 0;
            this.loadingRemoveEmp = true;
            setTimeout(async () => {
                try {
                    if (getDeleteEmpId !== null &&
                        getDeleteEmpId !== undefined || 
                        getDeleteEmpId !== ''
                    ) {
                        this.serviceManageStructuresAdmin?.removeEmployeeProfile(getDeleteEmpId).then(async (removedEmp) => {
                        if (removedEmp?.data.success === true) {
                            this.loadingRemoveEmp = false;
                            this.deleteUsersDialog = false;
                            // Reload Deleted Employee Record List
                            // this.getAllReloadJobHistoryWorkDeptPositionOrg(getDeleteEmpId ? getDeleteEmpId : 0);
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully remove employee profile account.",
                                detail: removedEmp.data?.message
                                    ? removedEmp.data?.message
                                    : null,
                                life: 3000,
                            });
                        }
                    })
                    .catch((error) => {
                        this.deleteUsersDialog = false;
                        this.loadingRemoveEmp = false;
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: String(error?.response.data.error?.message).toString()
                                ? String(error?.response.data.error?.message).toString()
                                : "Error remove employee profile account!",
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
                                        : "Please input filed employee profile account have missing value!",
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
        // View Detail of employee details admin
        async getViewDetailEmployeeDataOfficerOrg(empId){
            try{
                this.serviceManageStructuresAdmin.viewDetailOfficerEmp(empId ? empId : 0)
                .then((viewEmp) => {
                  if (viewEmp !== null || viewEmp !== '') {
                    this.empProfilePersonalInfo =  viewEmp?.employeeProfile ?? null;
                    this.empProfileEducation = viewEmp?.educations ?? [];
                    this.empProfileExperience = viewEmp?.experience ?? [];
                    
                    this.empProfileHobbies = viewEmp?.hobbies ?? [];
                    this.empProfileLanguages = viewEmp?.languages ?? [];
                    this.empProfileReference = viewEmp?.references ?? [];
                    this.empProfileSkill = viewEmp?.skill ?? [];
                
                  }
                }).catch((error) => {
                    this.$toast.add({
                        severity: "error",
                        summary: "Error entries view detail employee profile!",
                        detail: String(error?.response.data.error?.message).toString()
                            ? String(error?.response.data.error?.message).toString()
                            : "Error remove employee profile account!",
                        life: 3000,
                    });
                })
            }catch(error){
                throw Error(error || error?.message);
            }
        }
    },
}