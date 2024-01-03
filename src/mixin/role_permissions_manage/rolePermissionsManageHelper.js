// import _ from 'lodash';

export default {
    data() {
        return {
            dataCheckedItem: {}
        }
    },
    methods: {
        handleSelectionChangePermissionTree() {
            // this.dataCheckedItem =
            // console.log(check, _)
        },
        submittedCreatePermissionRole(isFormValid) {
            this.loadingSubmittedRole = true;
            setTimeout(() => {
                try {
                    this.loadingSubmittedRole = false;
                    this.submitted = true;
                    this.v$.$touch();
                    if (!isFormValid) {
                        this.$toast.add({
                            severity: 'warn',
                            summary: 'Missing Values Required',
                            detail: 'Please input filed have missing value!',
                            life: 3000
                        });
                        return false;
                    }
                } catch (err) {
                    return Promise.reject(err);
                }
            }, 1000);
        }
    }
}
