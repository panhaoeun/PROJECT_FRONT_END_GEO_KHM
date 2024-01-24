export default{ 
    methods: {
        async btnSubmittedAddNewOrgStrMultiLevel(validate) {
            this.loadingSubmittedAddNew = true;
            this.submitted = true;
            setTimeout(async () => {
                this.loadingSubmittedAddNew = false;
                if (!this.selectedOptOrgChartRootLevel !== "") {
                    const validation = await this.v$.$validate();
                    if (validation === false) {
                        const errorValidation = this.v$.$errors;
                        this.$notify.error({
                            title: "Please selected org.structure level in required",
                            message: errorValidation[0]?.$message
                                ? errorValidation[0]?.$message
                                : null,
                            showClose: true,
                        });
                    }
                }
                // Validate
                this.v$.$touch();
                if (!validate) {
                    return;
                }
            }, 1000);
        },
    },
}