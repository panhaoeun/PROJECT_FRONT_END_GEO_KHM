export default {
    data() {
        return {

        }
    },
    methods: {
        async assignOrgDeptPositionActions() {
            if (this.englishNamePositionDeptOrgAssign) {
                console.log("ss")
            } else {
                this.$toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: "Please fill all required fields",
                    life: 3000,
                });
                this.hasAssignDeptPosition = true;
            }
        }
    }
}