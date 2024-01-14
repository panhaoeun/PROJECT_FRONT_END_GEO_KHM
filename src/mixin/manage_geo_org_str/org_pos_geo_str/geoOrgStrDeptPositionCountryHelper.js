import ManagePermissionsGeoFencePositionPermissionsServices from "@/services/administrator/geo_admin_position_manage_permissions/GeoAdminPositionPermissionsManagementServices";
import {
    mapActions,
    mapGetters
} from "vuex";

export default {
    created() {
        this.geoDeptPosOrgStrServices = new ManagePermissionsGeoFencePositionPermissionsServices();
    },
    computed: {
        ...mapGetters("orgPosStrCou", ["allGeoPositionOrgStr"]),
        getAllDeptOrgStr() {
            return this.allGeoPositionOrgStr || [];
        },
    },
    data() {
        return {
            orgDeptStrCountryList: [],
            orgDeptBtnLoading: false,
            orgDeptReloadStrData: false,
            fetchingOrgStrDept: false
        }
    },
    methods: {
        ...mapActions('orgPosStrCou', ['getAllGeoPositionOrgCountryStr']),
        addNewGeoOrgDeptBaseOnPositionLevelCountry(validate) {
            this.submitted = true;
            this.loadingDeptOrgBtn = true;
            setTimeout(() => {
                this.loadingDeptOrgBtn = false;
                if (
                    this.selectedDeptOrgCountry !== null &&
                    this.orgDeptPositionName !== ""
                ) {
                    // Get Opt Value in Selected Parent DeptId
                    const getOptSelectedPositionDept = this
                        .selectedDeptOrgCountry ?
                        this.selectedDeptOrgCountry :
                        0;
                    const keyValueDeptId = Object.keys(
                            getOptSelectedPositionDept
                        )
                        .slice(Object.keys(getOptSelectedPositionDept));
                    let valSplitDeptPositionId;
                    keyValueDeptId.map(value => {
                        if (value) {
                            valSplitDeptPositionId = value.split(/[,-]+/).pop();
                        }
                        if (typeof (value) === 'undefined') {
                            valSplitDeptPositionId = 0;
                        }
                        return valSplitDeptPositionId;
                    })
                    if (typeof (valSplitDeptPositionId) === 'undefined') {
                        valSplitDeptPositionId = 0;
                    }
                    // Get Opt Value in Selected Parent Position
                    const getOptSelectedPositionLevel = this
                        .selectedDeptOrgStrLevel ?
                        this.selectedDeptOrgStrLevel :
                        0;
                    const keyValuePositionId = Object.keys(
                            getOptSelectedPositionLevel
                        )
                        .slice(Object.keys(getOptSelectedPositionLevel));
                    let valSplitPositionLevelId;
                    keyValuePositionId.map(value => {
                        if (value) {
                            valSplitPositionLevelId = value.split(/[,-]+/).pop();
                        }
                        if (typeof (value) === 'undefined') {
                            valSplitPositionLevelId = 0;
                        }
                        return valSplitPositionLevelId;
                    })
                    if (typeof (valSplitPositionLevelId) === 'undefined') {
                        valSplitPositionLevelId = 0;
                    }

                    const deptPosNameOrgStrOrgStr = this.orgDeptPositionName ?
                        this.orgDeptPositionName :
                        "";
                    const deptPositionGeoNoted = this.descriptionDepartmentPos ?
                        this.descriptionDepartmentPos :
                        "";

                    const addNewOptDeptPositionByCountry = {
                        addNewOrgLevelGeoDept: 'GL01',
                        addNewDeptIdBaseGeoOrgStr: valSplitPositionLevelId ?
                            valSplitPositionLevelId : 0,
                        addNewPosDeptSuperId: valSplitDeptPositionId ?
                            valSplitDeptPositionId : 0,
                        addNewPosDeptName: deptPosNameOrgStrOrgStr ?
                            deptPosNameOrgStrOrgStr : "",
                        addNewPositionDescription: deptPositionGeoNoted ?
                            deptPositionGeoNoted : "",
                    };
                    console.log(addNewOptDeptPositionByCountry)
                    // this.managePermissionsGeoLocationPosition?.createNewDepartmentsLocationGeoByCountryOrgStr(
                    //     addNewOptDeptPositionByCountry
                    //     ? addNewOptDeptPositionByCountry
                    //     : []
                    // )
                    // .then(async (addNewDept) => {
                    //     if (addNewDept?.data.success === true) {
                    //         this.loadingSubmittedAddDepartment = false;
                    //         // Reload Data In Datable in Dept org-str geo-fence
                    //         this.fetchingDataGeoCountryOrgStrPosition(valSplitPositionLevelId);
                    //         this.visibleDialogDepartment = false;
                    //         this.$toast.add({
                    //             severity: "success",
                    //             summary:
                    //                 "Successfully add new department.",
                    //             detail: addNewDept.data?.message
                    //                 ? addNewDept.data?.message
                    //                 : null,
                    //             life: 3000,
                    //         });
                    //     }
                    // })
                    // .catch((error) => {
                    //     this.loadingSubmittedAddDepartment = false;
                    //     this.$toast.add({
                    //         severity: "error",
                    //         summary: "Please Fix Below Errors.",
                    //         detail: error?.response.data.error?.message
                    //             ? error?.response.data.error?.message
                    //             : "Please input filed position have missing value!",
                    //         life: 3000,
                    //     });
                    //     if (error?.response.data.error.error?.errors) {
                    //         for (
                    //             let index = 0;
                    //             index <
                    //             error.response.data.error.error?.errors
                    //                 .length;
                    //             index++
                    //         ) {
                    //             const validationError =
                    //                 error.response.data.error.error
                    //                     ?.errors[index].message ?? [];
                    //             this.$toast.add({
                    //                 severity: "error",
                    //                 summary: "Please Fix Below Errors.",
                    //                 detail: validationError
                    //                     ? validationError
                    //                     : "Please input filed position have missing value!",
                    //                 life: 3000,
                    //             });
                    //         }
                    //     }
                    // });
                } else {
                    this.v$.$touch();
                    if (!validate) {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please Fix Below Errors.",
                            detail: "Please input filed position base department have missing value!",
                            life: 3000,
                        });
                        return false;
                    }
                }
            }, 1000);

        },
        async editGeoOrgDeptCountry(index, rowEditId) {
            console.log(index, rowEditId)
        },
        async fetchingDataGeoCountryOrgStrPosition() {
            this.fetchingOrgStrDept = true;
            try {
                this.getAllGeoPositionOrgCountryStr();
            } catch (e) {
                return Promise.reject(e);
            }
        }
    },
}