export default {
    name: 'VxeTable',
    methods: {
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
                    const addNewOptDeptMgtOrgStr = {
                        addProjectName: String(this.orgDeptBoardMgtPositionName),
                        addProjectNoted: String(this.orgDeptBoardMgtDescription).toLowerCase()
                    };
                    this.geoDeptPosOrgStrServices?.addNewProjectNameBaseOrgStr(
                        addNewOptDeptMgtOrgStr
                        ? addNewOptDeptMgtOrgStr
                        : []
                    )
                    .then(async (addNewProject) => {
                        if (addNewProject?.data.success === true) {
                            this.loadingSubmittedAddProject = false;
                            this.visibleDialogProjectName = false;
                            // Reload Data In Datable in Dept org-str geo-fence
                            this.fetchingDataGeoProStateOrgStr();
                            this.visibleDialogDepartment = false;
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully add new position.",
                                detail: addNewProject.data?.message
                                    ? addNewProject.data?.message
                                    : null,
                                life: 3000,
                            });
                            // Clear Data Input
                            this.orgDeptProjectName = '';
                            this.this.orgDeptProjectNoted = '';
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
        // Remove Positions
    },
}