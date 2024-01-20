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
                        addOrgLevelGeoSLStr: 'SL03',
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
                                    "Successfully add new department district.",
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
        async editGeoOrgDeptDistrict(rowEditId) {
            this.getOrgDeptDistrict  = rowEditId ? rowEditId : {};
            this.openDialogDeptDistrict = true;
        },
        async submittedDialogEditGeoDistrictStr() {
            try{
                if( this.geoOrgDistrictDeptStrData?.label){
                    this.submittingDeptDistrictData = true;
                    const editDataGeoCountryOrg = {
                        modifyDeptUpdatedName: String(this.geoOrgDistrictDeptStrData?.label) ?? '',
                        modifyDeptUpdatedDescription: String(this.geoOrgDistrictDeptStrData?.orgDeptNoted) ?? '',
                        modifyDeptObj: true,
                        orgStrLevelDept: 'SL03'
                    }
                    this.geoDeptPosOrgStrServices.modifyDepartmentsLocationGeoByCountryOrgStr(this.geoOrgDistrictDeptStrData?.orgDeptId, editDataGeoCountryOrg)
                    .then(async (editProject) => {
                        if (editProject?.status === 200) {
                            this.fetchingDataGeoProStateOrgStr(this.geoOrgDistrictDeptStrData.geoProjectId, this.geoOrgDistrictDeptStrData.geoLocationId);
                            setTimeout(async () => {
                                this.hasProvinceErrors = false
                                this.submittingDeptDistrictData = false;
                                this.$toast.add({
                                    severity: "success",
                                    summary: "Editing Country Department Successfully.",
                                    detail: editProject.data ?.message ? editProject.data ?.message :  null,
                                    life: 3000,
                                });
                                this.submittingDeptDistrictData = false;
                            }, 1000);
                        }
                        if (!this.hasProvinceErrors) {
                            this.$emit('close')
                        }
                    }).catch((error) => {
                        this.$toast.add({
                            severity: "error",
                            summary: "Unsuccessfully updated geo department.",
                            detail: error?.message ? error?.message : '',
                            life: 3000,
                        });
                        this.geoOrgDistrictDeptStrData = false;
                    });
                }
            }catch(error){
            return Promise.reject(error);
            }
        },
        async removeDeptOrgByDistrictPopup(countryId){
            this.deletedGeoDeptOrgDialogs = true;
            this.geoDeptOrgIdRemove = parseInt(countryId?.orgDeptId) ? parseInt(countryId?.orgDeptId) : 0;
            this.getGeoDeptOrgDistrict = countryId ? countryId : {};
        },
        async confirmRemoveDeptByIdDistrict() {
            const geoDeptOrgIdRemoveStr = parseInt(this.geoDeptOrgIdRemove) ? parseInt(this.geoDeptOrgIdRemove) : 0;
            const parentDeptId = parseInt(this.getGeoDeptOrgDistrict.parentDeptId) ? parseInt(this.getGeoDeptOrgDistrict.parentDeptId) : 0;
            const countryIdDeptId = parseInt(this.getGeoDeptOrgDistrict.geoLocationId) ? parseInt(this.getGeoDeptOrgDistrict.geoLocationId) : 0;
            this.geoDeptPosOrgStrServices.removeProjectNameOfStrOrg(geoDeptOrgIdRemoveStr).then(async (country) => {
                if(country?.status === 200){
                    this.deletedGeoProjectDialogs = false;
                    this.$toast.add({
                        severity: "success",
                        summary: "Successfully remove geo-fence district.",
                        detail: country.data?.message ? country.data?.message :  null,
                        life: 3000,
                    });
                    await this.fetchingDataGeoCountryOrgStr(parentDeptId, countryIdDeptId);
                }
                return country ? country : [];
            }).catch((error) => {
                this.$toast.add({
                    severity: "error",
                    summary: "Please Fix Below Errors.",
                    detail: error?.message ? error?.message : "Please input filed position have missing value!",
                    life: 3000,
                });
                return Promise.reject(error?.message || []);
            });
            this.ajaxDeleting = 0
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