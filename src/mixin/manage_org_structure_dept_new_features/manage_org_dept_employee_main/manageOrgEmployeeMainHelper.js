import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";


export default {
    created() {
        this.geoOrgChartStructureGeoServices = new ManageOrgChartStructureGeoProjectServices();
    },
    methods: {
        openDialogEmployeeResignJobDept(resign){
            try {
                this.assignOfficerPosition = true;
                this.resignDataEmpJob = resign ? resign : null;
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        openDialogEmployeeViewDetailJobDept(resign) {
            try {
                this.viewDetailOfficerEmployee = true;
                console.log(resign)
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        /**
         * Submitted Employee Resign Job Dept Org-Structures
         * */ 
        submittedEmployeeResignJobDeptOrg(){
             try {
                this.loadingBtnResignBtn = true;
                this.submitted = true;
                setTimeout(async () => {
                    /**
                     * @Validations
                     * */
                    if (
                        !this.dataResignEmpJobOrg ||
                        this.dataResignEmpJobOrg?.empEnglishName !== null ||
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
                    if (this.dataResignEmpJobOrg?.empEnglishName !== null && this.employeeDateEffective !== null) {
                            const addNewEmployeeResignDeptPosition = {
                                addEmployeeResignId: parseInt(this.dataResignEmpJobOrg?.empId) ? parseInt(this.dataResignEmpJobOrg?.empId) : 0,
                                addPositionResignId: parseInt(this.dataResignEmpJobOrg?.tbl_org_position_geo_fence?.positionId) ? parseInt(this.dataResignEmpJobOrg?.tbl_org_position_geo_fence?.positionId) : 0,
                                addDepartmentOrgResignId: parseInt(this.dataResignEmpJobOrg?.orgId) ? parseInt(this.dataResignEmpJobOrg?.orgId) : 0,
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
                                    this.$emit("close");
                                    // Clear Data Input Position department
                                    this.dataResignEmpJobOrg = null;
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
        }
    },
}