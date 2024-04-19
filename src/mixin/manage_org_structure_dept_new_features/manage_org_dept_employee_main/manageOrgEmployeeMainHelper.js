export default {
    data() {
        return {

        }
    },
    methods: {
        openDialogEmployeeResignJobDept(resign){
            try {
                this.assignOfficerPosition = true;
                console.log(resign)
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
        submittedEmployeeResignJobDeptOrg(){

        }
    },
}