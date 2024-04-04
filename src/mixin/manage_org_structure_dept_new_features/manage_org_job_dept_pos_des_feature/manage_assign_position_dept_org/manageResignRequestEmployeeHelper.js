export default {
    data() {
        return {
            filesResignForm: [],
            totalSize: 0,
            totalSizePercent: 0,
        }
    },
    methods: {
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
         * Submmittted Dataa Resign Form employee
         ***/
        resignAddFormRequestEmployee() {
            try {
                this.loadingBtnResignBtn = true;
                this.submitted = true;
                setTimeout(async () => {
                    this.loadingBtnResignBtn = false;
                    this.v$.$touch();
                    if (this.v$.$invalid) {
                        return false;
                    }
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
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
    },
}