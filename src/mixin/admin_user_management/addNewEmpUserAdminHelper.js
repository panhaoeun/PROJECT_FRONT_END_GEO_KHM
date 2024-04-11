import * as yup from "yup";

export default{
    data(){
        return{
            schemas: [
                yup.object({
                    perInfoEnglishName: yup.string().label('Please enter english name').required(),
                    perInfoKhmerName: yup.string().label('Please enter khmer name').required(),
                    perInfoPhoneNumber: yup.string()
                                .min(10)
                                .max(10)
                                .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, {
                                    message: 'Please enter valid number.',
                                    excludeEmptyString: false
                                })
                                .label('Please enter phone number')
                                .required(),
                }),
                yup.object({
                    terms: yup.bool().required().equals([true]),
                }),
            ],
        }
    },
    methods: {
        async handleAddNewEmpAdminSubmit(valid) {
            try {
                console.log("valid")
                this.submitted = true;
                this.isProcessingSubmit = true;
                setTimeout(() => {
                    this.isProcessingSubmit = false;
                    if (
                        !this.userMSNameEng != "" ||
                        this.userMSNameEng !== null ||
                        this.userMSNameKh !== "" ||
                        this.userMSPhoneNum !== ""
                    ) {
                        // Data Response
                        const dataRes = {
                            empRoleId: 7,
                            empNameEng: this.userMSNameEng,
                            empNameKh: this.userMSNameKh,
                            empEmail: this.emailMSUser,
                            empPhone: parseInt(this.userMSPhoneNum),
                            empPassword: "admin123",
                            empType: "Admin",
                            userProfile: this.fileUserMS,
                            empStatus: "Approved",
                            orgDepartId: 1,
                            empStartDate: this.userStartDate,
                            empDOB: this.userDateOfBirth,
                            empGender: this.selectedUserGender?.name,
                            empAddress: this.userAddress01,
                            empNoted: this.userUserDescription,
                        };
                        this.userMSServices
                            .createEmpAdminAccount(dataRes)
                            .then((response) => {
                                if (response.data.success == true) {
                                    this.isProcessingSubmit = false;
                                    this.$toast.add({
                                        severity: 'success',
                                        summary: 'Successfully create employee account!',
                                        detail: String(response.data?.message)
                                            ? String(response.data?.message)
                                            : "",
                                        life: 3000
                                    });
                                    // Push Router
                                    this.$router.push(
                                        "/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module"
                                    );
                                }
                            })
                            .catch((error) => {
                                this.isProcessingSubmit = false;
                                this.$toast.add({
                                    severity: 'error',
                                    summary: 'Unsuccessfully create employee account!',
                                    detail: String(error.response.data.error.message)
                                        ? String(error.response.data.error.message)
                                        : "",
                                    life: 3000
                                });
                                if (error.response.data.error.error.errors) {
                                    for (
                                        let index = 0;
                                        index <
                                        error.response.data.error.error.errors
                                            .length;
                                        index++
                                    ) {
                                        const messageValidation =
                                            error.response.data.error.error
                                                .errors[index].message ?? "";
                                        this.$toast.add({
                                            severity: 'error',
                                            summary: 'Unsuccessfully create employee account!',
                                            detail: messageValidation
                                                ? messageValidation
                                                : "",
                                            life: 3000
                                        });
                                        this.isProcessingSubmit = false;
                                    }
                                }
                                return false;
                            });
                    
                    }
                }, 1000);
                if (!valid) {
                    if (this.fileUserMS == null) {
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Please upload employee profile!',
                            life: 3000
                        });
                        
                        return false;
                    }
                    return;
                }
            } catch (error) {
               throw Error(error || error.message);
            }
        },
    },
}