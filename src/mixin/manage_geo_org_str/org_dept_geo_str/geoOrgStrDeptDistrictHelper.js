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
        ...mapGetters("orgDeptStrCou", ["allGeoDeptOrg"]),
        getAllDeptOrgStrProvinceState() {
            return this.allGeoDeptOrg || [];
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
        ...mapActions('orgDeptStrCou', ['getAllGeoDeptOrgCountryStr']),
        addNewGeoOrgDeptProvinceState(validate) {
            this.submitted = true;
            this.loadingSubmittedAddDepartment = true;
            setTimeout(() => {
                this.loadingSubmittedAddDepartment = false;
                if (
                    this.departmentNewName !== null &&
                    this.departmentNewName !== ""
                ) {
                    // Get Opt Value in Selected Parent DeptId
                    const getOptSelectedParentDeptId = this
                        .selectedParentDeptCountry ?
                        this.selectedParentDeptCountry :
                        0;
                    const keyValueDeptId = Object.keys(
                            getOptSelectedParentDeptId
                        )
                        .slice(Object.keys(getOptSelectedParentDeptId));
                    let valSplitDeptId;
                    keyValueDeptId.map(value => {
                        if (value) {
                            valSplitDeptId = value.split(/[,-]+/).pop();
                        }
                        if (typeof (value) === 'undefined') {
                            valSplitDeptId = 0;
                        }
                        return valSplitDeptId;
                    })
                    if (typeof (valSplitDeptId) === 'undefined') {
                        valSplitDeptId = 0;
                    }
                    const deptNameOrgStrDyStr = this.departmentNewName ?
                        this.departmentNewName :
                        "";
                    const deptProjectId = parseInt(this.deptProjectId) ?
                        parseInt(this.deptProjectId) :
                        0;
                    const deptGeoCountryId = parseInt(
                            this.deptCountryId
                        ) ?
                        parseInt(this.deptCountryId) :
                        0;
                    const deptGeoNoted = this.descriptionDepartment ?
                        this.descriptionDepartment :
                        "";

                    const addNewOptDeptByCountry = {
                        addOrgLevelGeoSLStr: 'SL02',
                        addNewProjectIdOrgSL: deptProjectId ?
                            deptProjectId :
                            0,
                        addNewGeoFenceIdOrgStrSL: deptGeoCountryId ?
                            deptGeoCountryId :
                            0,
                        addNewSuperSSNCodeDeptOrgStrSL: valSplitDeptId ?
                            valSplitDeptId :
                            0,
                        addNewDeptNameOrgStrSL: deptNameOrgStrDyStr ?
                            deptNameOrgStrDyStr :
                            "",
                        addNewDeptDescriptionsSL: deptGeoNoted ?
                            deptGeoNoted :
                            "",
                    };
                    this.managePermissionsGeoLocationPosition?.createNewDepartmentsLocationGeoByCountryOrgStr(
                        addNewOptDeptByCountry
                        ? addNewOptDeptByCountry
                        : []
                    )
                    .then(async (addNewDept) => {
                        if (addNewDept?.data.success === true) {
                            this.loadingSubmittedAddDepartment = false;
                            this.visibleDialogDepartmentProState = false;
                            this.resetFromAddDeptOrgStr();
                            // Reload Data In Datable in Dept org-str geo-fence
                            this.fetchingDataGeoDistrictOrgStr(deptProjectId,deptGeoCountryId);
                            this.visibleDialogDepartment = false;
                            this.$toast.add({
                                severity: "success",
                                summary:
                                    "Successfully add new department province or state.",
                                detail: addNewDept.data?.message
                                    ? addNewDept.data?.message
                                    : null,
                                life: 3000,
                            });
                        }
                    })
                    .catch((error) => {
                        this.loadingSubmittedAddDepartment = false;
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
        async editGeoOrgDeptCountry(index, rowEditId) {
            console.log(index, rowEditId)
        },
        async fetchingDataGeoDistrictOrgStr(deptOrgProjectId = 0, countryOrgIdGeo = 0) {
            this.fetchingOrgStrDept = true;
            try {
                const orgDeptLevel = 'SL03';
                this.getAllGeoDeptOrgCountryStr({
                    deptOrgProjectId,
                    countryOrgIdGeo,
                    orgDeptLevel
                });
            } catch (e) {
                return Promise.reject(e);
            }
        }
    },
}