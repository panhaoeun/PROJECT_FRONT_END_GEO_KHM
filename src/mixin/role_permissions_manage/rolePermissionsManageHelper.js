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
                        return;
                    }
                    console.log(this)
                } catch (err) {
                    return Promise.reject(err);
                }
            }, 1000);
        }
    }
}
