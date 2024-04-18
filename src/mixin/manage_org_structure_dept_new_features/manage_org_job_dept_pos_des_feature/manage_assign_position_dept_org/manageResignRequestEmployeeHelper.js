import {
    mapGetters,
    mapActions
} from "vuex";
import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";


export default {
    created() {
        this.geoOrgChartStructureGeoServices = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        ...mapGetters('orgStrDeptPosGeo', ['getViewAllDataEmployeeResignAll']),
        getAllDataEmpResignOrgDept() {
            const getEmpResignDeptData =
                this.getViewAllDataEmployeeResignAll ?
                this.getViewAllDataEmployeeResignAll: [];
            if (getEmpResignDeptData !== null ||
                getEmpResignDeptData !==
                undefined &&
                typeof getEmpResignDeptData !== 'string'
            ) {
                return getEmpResignDeptData ? getEmpResignDeptData : []
            }
            return [];
        },
        // Selected Employee Resign Data By Id From Table To Show In Modal Edit
        selectedResignEmployeeJobOrg() {
            let orgStrEmpId;
            const getOrgEmpOrgId = this.employeeNameResign
                ? this.employeeNameResign
                : null;
            if (
                (getOrgEmpOrgId !== null && getOrgEmpOrgId !== "") ||
                typeof getOrgEmpOrgId !== "undefined" ||
                typeof orgStrEmpId !== "string"
            ) {
                orgStrEmpId = parseInt(getOrgEmpOrgId?.id);
            }
            return orgStrEmpId;
        },
        selectedResignPositionResign() {
            const orgStrPositionSelected = this.employeeNameResign
                ? this.employeeNameResign
                : null;
            if (
                orgStrPositionSelected !== null ||
                (orgStrPositionSelected !== undefined &&
                    typeof orgStrPositionSelected !== "object" &&
                    orgStrPositionSelected > 0)
            ) {
                return parseInt(orgStrPositionSelected?.position_dept_id)
                    ? parseInt(orgStrPositionSelected?.position_dept_id)
                    : 0;
            }
            return 0;
        },
        selectedResignDepartmentsPositionResign() {
            const orgStrPositionSelected = this.employeeNameResign
                ? this.employeeNameResign
                : null;
            if (
                orgStrPositionSelected !== null ||
                (orgStrPositionSelected !== undefined &&
                    typeof orgStrPositionSelected !== "object" &&
                    orgStrPositionSelected > 0)
            ) {
                return parseInt(orgStrPositionSelected?.org_no)
                    ? parseInt(orgStrPositionSelected?.org_no)
                    : 0;
            }
            return 0;
        },
    },
    data() {
        return {
            filesResignForm: [],
            totalSize: 0,
            totalSizePercent: 0,
        }
    },
    methods: {
        // Hierarchy Org-Structure Level 1 : Country -> Province/ State -> District -> Commune -> Village
        ...mapActions("orgStrDeptPosGeo", [
            "setViewDetailEmployeeJobResignPosition",
        ]),
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
        /**
         *@Upload File Resign Form  Employees
         * **/
        onRemoveTemplatingFile(file, removeFileCallback, index) {
            removeFileCallback(index);
            this.totalSize -= parseInt(this.formatSize(file.size));
            this.totalSizePercent = this.totalSize / 10;
        },
        onClearTemplatingUpload(clear) {
            clear();
            this.totalSize = 0;
            this.totalSizePercent = 0;
        },
        onSelectedFiles(event) {
            this.filesResignForm = event.files;
            this.filesResignForm.forEach((file) => {
                this.totalSize += parseInt(this.formatSize(file.size));
            });
        },
        uploadEvent(callback) {
            this.totalSizePercent = this.totalSize / 10;
            callback();
        },
        onTemplatedUpload() {
            this.$toast.add({
                severity: 'info',
                summary: 'Success',
                detail: 'File Uploaded',
                life: 3000
            });
        },
        formatSize(bytes) {
            const k = 1024;
            const dm = 3;
            const sizes = this.$primevue.config.locale.fileSizeTypes;

            if (bytes === 0) {
                return `0 ${sizes[0]}`;
            }

            const i = Math.floor(Math.log(bytes) / Math.log(k));
            const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
            return `${formattedSize}`;
        },
        /**
         * Submitted Data Resign Form employee
        ***/
        resignAddFormRequestEmployee() {
            try {
                this.loadingBtnResignBtn = true;
                this.submitted = true;
                setTimeout(async () => {
                    /**
                     * @Validations
                     * */
                    if (
                        !this.employeeNameResign ||
                        this.employeeNameResign !== null ||
                        !this.employeeDateEffective
                    ) {
                        const validation = await this.v$.$validate();
                        if (validation === false) {
                            const errorValidation = this.v$.$errors;
                            this.$toast.add({
                                severity: "error",
                                summary: "Please input filed in required",
                                detail: errorValidation[0]?.$message
                                    ? errorValidation[0]?.$message
                                    : "",
                                life: 3000,
                            });
                        }
                    } else {
                        if (this.v$.$invalid === true) {
                            this.$toast.add({
                                severity: "error",
                                summary: "Error",
                                detail: "Please fill all required fields",
                                life: 3000,
                            });
                        }
                    }
                    // Insert data value resign employee
                    const pathFileStore = 'image/png';
                    const pathBase64FileSignature = this.$refs.fillResignSignature.save(pathFileStore);
                    if (this.employeeNameResign !== null && this.employeeDateEffective !== null) {
                            const addNewEmployeeResignDeptPosition = {
                                addEmployeeResignId: parseInt(this.selectedResignEmployeeJobOrg) ? parseInt(this.selectedResignEmployeeJobOrg) : 0,
                                addPositionResignId: parseInt(this.selectedResignPositionResign) ? parseInt(this.selectedResignPositionResign) : 0,
                                addDepartmentOrgResignId: parseInt(this.selectedResignDepartmentsPositionResign) ? parseInt(this.selectedResignDepartmentsPositionResign) : 0,
                                addEmployeeResignDated: this.employeeDateEffective ? this.employeeDateEffective : null,
                                addEmployeeResignReason: String(this.employeeReasonResign) ? String(this.employeeReasonResign) : '',
                                addEmployeeResignRemark: String(this.employeeCommentResign) ? String(this.employeeCommentResign) : '',
                                addNewSingPathURLResignImg: pathBase64FileSignature ? pathBase64FileSignature : null,
                                assignFileOrgStrDept: this.filesResignForm ? this.filesResignForm :  null
                            };
                            this.geoOrgChartStructureGeoServices?.addNewEmpResignDataBYDept(
                                addNewEmployeeResignDeptPosition
                                ? addNewEmployeeResignDeptPosition
                                : {}
                            )
                            .then(async (resignEmp) => {
                                if (resignEmp?.data.success === true) {
                                    this.loadingBtnResignBtn = false;
                                    this.$toast.add({
                                        severity: "success",
                                        summary:
                                            "Successfully add resign employee request!",
                                        detail: String(resignEmp.data?.message).toString()
                                            ? String(resignEmp.data?.message).toString()
                                            : null,
                                        life: 3000,
                                    });
                                    // Reload Employee Resigned
                                    const orgDeptResignEmpId = parseInt(resignEmp?.department_id) ?? 0;
                                    this.getAllReloadEmployeeResignDataByDepartment(orgDeptResignEmpId ? orgDeptResignEmpId: 0);
                                    // Close Dialogs
                                    this.$emit("close-dialog");
                                    // Clear Data Input Position department
                                    this.employeeNameResign = null;
                                    // this.employeePositionRequest = null;
                                    this.employeeDateEffective = '';
                                    this.employeeReasonResign = '';
                                    this.employeeCommentResign = '';
                                   
                                }
                            })
                            .catch((error) => {
                                this.loadingBtnResignBtn = false;
                                this.$toast.add({
                                    severity: "error",
                                    summary: "Please Fix Below Errors.",
                                    detail: error?.response.data.error?.message
                                        ? error?.response.data.error?.message
                                        : "Please input filed resign employee request have missing value!",
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
                                                : "Please input filed resign employee request have missing value!",
                                            life: 3000,
                                        });
                                    }
                                }
                            });
                    }else{
                        this.$toast.add({
                            severity: "error",
                            summary: "Error",
                            detail: "Please fill all required fields",
                            life: 3000,
                        });
                    }
                    this.loadingBtnResignBtn = false;
                    this.v$.$touch();
                    if (this.v$.$invalid) {
                        return false;
                    }
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        /*
        Resign Status
        */ 
       getSeverityResignStatus(confirmApprovedStatus) {
            try {
               if (confirmApprovedStatus !== null || confirmApprovedStatus !== '') {
                switch (confirmApprovedStatus) {
                     case 'Approved':
                         return 'success';

                     case 'Reject':
                         return 'warning';

                     case 'Pending':
                         return 'contrast';

                     default:
                         return 'No Status';
                }
               }else{
                    return 'No Status';
               }
            } catch (error) {
                throw new Error(error || error.message);
            }
       },
        /**
         * Resign Data List Employee Data
        ***/
       async getAllReloadEmployeeResignDataByDepartment(orgDeptResignId) {
            try {
                this.fetchingOrgStrDeptPosId = true;
                setTimeout(async () => {
                    try {
                        if (!orgDeptResignId) {
                            throw Error('Please selected a position department organization');
                        }
                        if (orgDeptResignId !== null && !isNaN(Number(orgDeptResignId)) || orgDeptResignId !== '') {
                            let getResignEmpId = parseInt(orgDeptResignId) ? parseInt(orgDeptResignId) : 0;
                            const getResignEmpDept = {
                                getResignEmpId
                            }
                            this.setViewDetailEmployeeJobResignPosition(getResignEmpDept);
                        }
                    } catch (e) {
                        return Promise.reject(e);
                    }
                    this.fetchingOrgStrDeptPosId = false;
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
       },
        /**
         * @Approved Resign Employee Request
        */    
       async openDialogApprovedRejectResignEmployee(resignData) {
            try {
                this.visibleConfirmDialogRequest = true;
                this.dataConfirmRequestResign = resignData ? resignData : null;
            } catch (error) {
                throw Error(error || error.message);
            }
       },
        //Approved     
       async confirmRequestEmployeeResignApprovedOfficer(){
            try {
                this.loadingApprovedBtn =true;
                setTimeout(() => {
                    this.loadingApprovedBtn = false;
                    this.$confirm('Are you confirm approval request form employee resignation','Resignation Approval Request', {
                        showCancelButton: true,
                        confirmButtonText: 'Confirm Approval Request',
                        cancelButtonText: 'Cancel',
                        type: 'error',
                        class: 'w-30rem', //
                        roundButton: true,
                        closeOnPressEscape: true,
                        cancelButtonClass: 'text-black hover:bg-white font-bold hover:text-pink-400 w-5rem',
                        confirmButtonClass: 'bg-red-500 text-white border-none font-bold hover:text-white w-15rem',
                        center: true,
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                instance.confirmButtonLoading = true;
                                instance.confirmButtonText = 'Loading...';
                                setTimeout(() => {
                                    done();
                                    setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                    }, 300);
                                }, 1000);
                            } else {
                                done();
                            }
                        }
                    }).then(() => {
                        const approvedEmpResignId = parseInt(this.dataConfirmRequestResign?.resignId) ? parseInt(this.dataConfirmRequestResign?.resignId) : 0;
                        const approvedResignStatus =  true;
                        const confirmApprovedStatusResign = 'Approved';
                        this.employeeEmployeeResignOfficerDept(approvedEmpResignId,approvedResignStatus, confirmApprovedStatusResign);
                        
                    }); 
                },1000);
                
            } catch (error) {
                throw Error(error || error.message);
            }
       },
        //Rejects  
        async confirmRequestEmployeeResignRejectsOfficer(){
            try {
                this.loadingRejectedBtn = true;
                setTimeout(() => {
                    this.loadingRejectedBtn = false;
                    this.$confirm('Are you confirm reject request form employee resignation','Resignation Reject Request', {
                        showCancelButton: true,
                        confirmButtonText: 'Confirm Approval Reject',
                        cancelButtonText: 'Cancel',
                        type: 'error',
                        class: 'w-30rem', //
                        roundButton: true,
                        closeOnPressEscape: true,
                        cancelButtonClass: 'text-black hover:bg-white font-bold hover:text-pink-400 w-5rem',
                        confirmButtonClass: 'bg-red-500 text-white border-none font-bold hover:text-white w-15rem',
                        center: true,
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                instance.confirmButtonLoading = true;
                                instance.confirmButtonText = 'Loading...';
                                setTimeout(() => {
                                    done();
                                    setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                    }, 300);
                                }, 1000);
                            } else {
                                done();
                            }
                        }
                    }).then(() => {
                        const approvedEmpResignId = parseInt(this.dataConfirmRequestResign?.resignId) ? parseInt(this.dataConfirmRequestResign?.resignId) : 0;
                        const approvedResignStatus =  true;
                        const confirmApprovedStatusResign = 'Reject';
                        this.employeeEmployeeResignOfficerDept(approvedEmpResignId,approvedResignStatus, confirmApprovedStatusResign);
                        
                    }); 
                },1000);
                
            } catch (error) {
                throw Error(error || error.message);
            }
       },  
       //Confirm Status Employee Resign Function
       async employeeEmployeeResignOfficerDept(approvedResignId = 0, approvedResignStatus = false, confirmResignApproved = 'Pending') {
            try {
                const confirmResignRequestFormApproved = {
                    approvedResignStatus: approvedResignStatus ? approvedResignStatus : false,
                    confirmApprovedStatusResign: confirmResignApproved ? confirmResignApproved : 'Pending'
                }
                this.geoOrgChartStructureGeoServices?.approvedEmpResignDataBYDept(approvedResignId,
                    confirmResignRequestFormApproved
                    ? confirmResignRequestFormApproved
                    : {}
                )
                .then(async (resignEmp) => {
                    if (resignEmp?.data.success === true) {
                        this.loadingBtnResignBtn = false;
                        this.$toast.add({
                            severity: "success",
                            summary:
                                "Successfully employee resign request!",
                            detail: String(resignEmp.data?.message).toString()
                                ? String(resignEmp.data?.message).toString()
                                : null,
                            life: 3000,
                        });
                        // Reload Employee Resigned
                        const orgDeptResignEmpId = parseInt(resignEmp?.department_id) ?? 0;
                        this.getAllReloadEmployeeResignDataByDepartment(orgDeptResignEmpId ? orgDeptResignEmpId: 0);
                        // Close Dialogs
                        this.visibleConfirmDialogRequest =false;
                        // Clear Data Input Position department
                        this.employeeNameResign = null;
                        // this.employeePositionRequest = null;
                        this.employeeDateEffective = '';
                        this.employeeReasonResign = '';
                        this.employeeCommentResign = '';
                        
                    }
                })
                .catch((error) => {
                    this.loadingBtnResignBtn = false;
                    this.$toast.add({
                        severity: "error",
                        summary: "Please Fix Below Errors.",
                        detail: error?.response.data.error?.message
                            ? error?.response.data.error?.message
                            : "Please input filed resign employee request have missing value!",
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
                                    : "Please input filed resign employee request have missing value!",
                                life: 3000,
                            });
                        }
                    }
                });
            } catch (error) {
                throw Error(error || error?.message);
            }
       }

    },
}