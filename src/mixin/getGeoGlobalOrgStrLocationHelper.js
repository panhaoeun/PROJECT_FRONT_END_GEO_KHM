import {
    mapGetters,
    mapActions
} from "vuex";

export default{
    data() {
        return {
            getTypeGeoFenceFilter: null
        }
    },
    computed: {
        ...mapGetters("geoCountry", ["countryAll"]),
        ...mapGetters("geoProvince", ["provinceAll"]),
        ...mapGetters("geoDistrict", ["districtAll"]),
        ...mapGetters("geoCommune", ["communeAll"]),
        ...mapGetters("geoVillages", ["getGeoVillageAll"]),
        allCountryOrgStr() {
            return this.countryAll || [];
        },
        allStateCountryAddNewOrgStr() {
            return this.provinceAll || [];
        },
        allStateDistrictAddNew() {
            return this.districtAll || [];
        },
        allCommuneCountryByCom() {
            return this.communeAll || [];
        },
        getGeoLocationVillagesData() {
            return this.getGeoVillageAll || [];
        },
        // Selected Value Selected
        getProjectDestination() {
            const getProject = this.selectedProject || this.selectedProject;
            if (getProject !== null) {
                return getProject?.id ? getProject?.id : 0;
            }
            return 1;
        },
        getProjectDestinationName() {
            const getProject = this.selectedProject || this.selectedProject;
            if (!getProject || getProject !== null) {
                return String(getProject?.project_name) ? String(getProject?.project_name) : '';
            }
            return getProject;
        },
        getCountryOfGeoLocationOrgStr() {
            const getCountry =
                this.selectedCountryOptOrgStr || this.selectedCountryOptOrgStr;
            if (!getCountry || getCountry !== null) {
                return parseInt(getCountry?.id) ? parseInt(getCountry?.id) : 0;
            }
            return getCountry;
        },
        getCountryOfGeoLocationOrgStrName() {
            const getCountry =
                this.selectedCountryOptOrgStr || this.selectedCountryOptOrgStr;
            if (!getCountry || getCountry !== null) {
                return String(getCountry?.geo_english_name) ? String(getCountry?.geo_english_name) : '';
            }
            return getCountry;
        },
        getProvinceOrgStructure() {
            const getProvince = this.selectedProvinceOptOrgStr || this.selectedProvinceOptOrgStr;
            if (!getProvince || getProvince !== null) {
                return parseInt(getProvince?.id) ? parseInt(getProvince?.id) : 0;
            }
            return getProvince;
        },
        getProvinceOrgStructureName() {
            const getCountry =
                this.selectedProvinceOptOrgStr || this.selectedProvinceOptOrgStr;
            if (!getCountry || getCountry !== null) {
                return String(getCountry?.geo_english_name) ? String(getCountry?.geo_english_name) : '';
            }
            return getCountry;
        },
        getDistrictOrgStructure() {
            const getDistrict = this.selectedDistrictOptOrgStr || this.selectedDistrictOptOrgStr;
            if (!getDistrict || getDistrict !== null) {
                return parseInt(getDistrict?.id) ? parseInt(getDistrict?.id) : 0;
            }
            return getDistrict;
        },
        getDistrictOrgStructureName() {
            const getCountry =
                this.selectedDistrictOptOrgStr || this.selectedDistrictOptOrgStr;
            if (!getCountry || getCountry !== null) {
                return String(getCountry?.geo_english_name) ? String(getCountry?.geo_english_name) : '';
            }
            return getCountry;
        },
        getCommuneOrgStructure() {
            const getCommune = this.selectedCommuneOptOrgStr || this.selectedCommuneOptOrgStr;
            if (!getCommune || getCommune !== null) {
                return parseInt(getCommune?.id) ? parseInt(getCommune?.id) : 0;
            }
            return getCommune;
        },
        getCommuneOrgStructureName() {
            const getCountry =
                this.selectedCommuneOptOrgStr || this.selectedCommuneOptOrgStr;
            if (!getCountry || getCountry !== null) {
                return String(getCountry?.geo_english_name) ? String(getCountry?.geo_english_name) : '';
            }
            return getCountry;
        },
        getVillagesOrgStructure() {
            const getVillages = this.selectedVillagesOptOrgStr || this.selectedVillagesOptOrgStr;
            if (!getVillages || getVillages !== null) {
                return parseInt(getVillages?.id) ? parseInt(getVillages?.id) : 0;
            }
            return getVillages;
        },
        getVillagesOrgStructureName() {
            const getCountry =
                this.selectedVillagesOptOrgStr || this.selectedVillagesOptOrgStr;
            if (!getCountry || getCountry !== null) {
                return String(getCountry?.geo_english_name) ? String(getCountry?.geo_english_name) : '';
            }
            return getCountry;
        },
    },
    methods: {
        ...mapActions("geoCountry", ["getAllCountryActions"]),
        ...mapActions("geoProvince", ["getAllProvinceActions"]),
        ...mapActions("geoDistrict", ["getAllDistrictActions"]),
        ...mapActions("geoCommune", ["getAllCommuneActions"]),
        ...mapActions("geoVillages", ["getAllVillagesActions"]),
        // Hierarchy Org-Structure Level 1 : Country -> Province/ State -> District -> Commune -> Village
        ...mapActions("orgStrDeptPosGeo", [
            "setDepartmentDataByCountryProjectId",
        ]),
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
        /**
         * @Handler Get All Geo-fence Locations
         * */
        onChangeSelectedCountryGeoOrgStr() {
            if (
                !Array.isArray(this.selectedCountryOptOrgStr) ||
                this.selectedCountryOptOrgStr !== undefined ||
                this.selectedCountryOptOrgStr !== null
                && this.selectedProject !== null &&
                !Array.isArray(this.selectedProject)
            ) {
                this.selectedProvinceOptOrgStr = null;
                this.hideOrgStructureDeptPos = "T1"
                // Org-Structure Country's
                const getProjectId = this.getProjectDestination ?
                    this.getProjectDestination :
                    0;
                const getCountryId = this.getCountryOfGeoLocationOrgStr ?
                    this.getCountryOfGeoLocationOrgStr:
                    0;
                const typeHierarchy = "GeoFence";
                // Get Country
                this.getGeoLocationCountryOrgStr();
                this.setDepartmentDataByCountryProjectId({
                    getProjectId,
                    getCountryId,
                    typeHierarchy
                });
            }
        },
        /**
         * @Get Object Geo-fence Location
         * **/
         // Get All List
        getGeoLocationCountryOrgStr() {
            try {
                this.getTypeGeoFenceFilter = "GEO-01";
                this.getAllCountryActions();
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
        getProvinceByCountrySelectedOrgStr(countryParentId) {
            if (
                !Array.isArray(countryParentId) ||
                !countryParentId?.length > 0
            ) {
                this.selectedProvinceOptOrgStr = null;
            }
            /**
             * @Check Clear District
             * */
            if (
                !Array.isArray(this.selectedProvinceOptOrgStr) ||
                this.selectedProvinceOptOrgStr !== undefined ||
                this.selectedProvinceOptOrgStr !== null
            ) {
                this.selectedDistrictOptOrgStr = null;
                this.hideOrgStructureDeptPos = "T2"
            }
            try {
                if (
                    !Array.isArray(countryParentId) ||
                    countryParentId?.geo_ssn_location !== undefined ||
                    countryParentId?.geo_ssn_location !== null
                ) {
                    this.getTypeGeoFenceFilter = "GEO-02";
                    const ssnSuperCountryCodeLocationGeo =
                        countryParentId?.geo_ssn_location
                            ? countryParentId?.geo_ssn_location
                            : "";
                    const geoLocationCountryType = "T2";
                    this.countryProvinceIdOptSelected =
                        ssnSuperCountryCodeLocationGeo
                            ? ssnSuperCountryCodeLocationGeo
                            : "";
                    this.getGeoLocationStateByCountryAddNewOrgStr(
                        geoLocationCountryType,
                        ssnSuperCountryCodeLocationGeo
                    );
                    // Org-Strictures
                    const getProjectId = this.getProjectDestination ?
                        this.getProjectDestination :
                        0;
                    const getCountryId = this.getProvinceOrgStructure ?
                        this.getProvinceOrgStructure:
                        0;
                    const typeHierarchy = "GeoFence";
                    this.getReloadOrgChartByDeptGeoProject(
                        getProjectId,
                        getCountryId,
                        typeHierarchy
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        getDistrictByProvinceSelectedOrgStr(provinceParentId) {
            if (
                !Array.isArray(provinceParentId) ||
                !provinceParentId?.length > 0
            ) {
                this.selectedDistrictOptOrgStr = null;
            }
            /**
             * @Check Clear Commune
             * */
            if (
                !Array.isArray(this.selectedDistrictOptOrgStr) ||
                this.selectedDistrictOptOrgStr !== undefined ||
                this.selectedDistrictOptOrgStr !== null
            ) {
                this.selectedCommuneOptOrgStr = null;
                this.hideOrgStructureDeptPos = "T3";
            }
            try {
                if (
                    !Array.isArray(provinceParentId) ||
                    provinceParentId?.geo_ssn_location !== undefined ||
                    provinceParentId?.geo_ssn_location !== null
                ) {
                    this.getTypeGeoFenceFilter = "GEO-03";
                    const ssnSuperProvinceCodeLocationGeo =
                        provinceParentId?.geo_ssn_location
                            ? provinceParentId?.geo_ssn_location
                            : "";
                    const geoLocationProvinceType = "T3";
                    this.geoDistrictSSNProvinceOptSelected =
                        ssnSuperProvinceCodeLocationGeo
                            ? ssnSuperProvinceCodeLocationGeo
                            : "";
                    this.getGeoLocationDistrictByCountryAddNewOrgStr(
                        geoLocationProvinceType,
                        ssnSuperProvinceCodeLocationGeo
                    );
                    // Org-Strictures Manage
                    const getProjectId = this.getProjectDestination ?
                        this.getProjectDestination :
                        0;
                    const getCountryId = this.getDistrictOrgStructure ?
                        this.getDistrictOrgStructure:
                        0;
                    const typeHierarchy = "GeoFence";
                this.getReloadOrgChartByDeptGeoProject(
                        getProjectId,
                        getCountryId,
                        typeHierarchy
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        getCommuneByDistrictSelectedOrgStr(districtParentId) {
            if (
                !Array.isArray(districtParentId) ||
                !districtParentId?.length > 0
            ) {
                this.selectedCommuneOptOrgStr = null;
            }
            /**
             * @Check Clear Commune
            * */
            if (
                !Array.isArray(this.selectedCommuneOptOrgStr) ||
                this.selectedCommuneOptOrgStr !== undefined ||
                this.selectedCommuneOptOrgStr !== null
            ) {
                this.selectedVillagesOptOrgStr = null;
                this.hideOrgStructureDeptPos = "T4";
            }
            try {
                if (
                    !Array.isArray(districtParentId) ||
                    districtParentId?.geo_ssn_location !== undefined ||
                    districtParentId?.geo_ssn_location !== null
                ) {
                    const ssnSuperProvinceCodeLocationGeo =
                        districtParentId?.geo_ssn_location
                            ? districtParentId?.geo_ssn_location
                            : "";
                    this.getTypeGeoFenceFilter = "GEO-04";
                    const geoLocationProvinceType = "T4";
                    this.ssnCommuneByVillageCodeId = ssnSuperProvinceCodeLocationGeo
                        ? ssnSuperProvinceCodeLocationGeo
                        : null;
                    this.getGeoLocationCommuneCapitalByCountryAddNewOrgStr(
                        geoLocationProvinceType,
                        ssnSuperProvinceCodeLocationGeo
                    );
                    // Org-Strictures Manage
                    const getProjectId = this.getProjectDestination ?
                        this.getProjectDestination :
                        0;
                    const getCountryId = this.getCommuneOrgStructure ?
                        this.getCommuneOrgStructure:
                        0;
                    const typeHierarchy = "GeoFence";
                    this.getReloadOrgChartByDeptGeoProject(
                        getProjectId,
                        getCountryId,
                        typeHierarchy
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        getVillagesBySelectedOrgStr(communeParentId) {
             try {
                if (
                    !Array.isArray(communeParentId) ||
                    !communeParentId?.length > 0
                ) {
                    this.selectedVillagesOptOrgStr = null;
                    this.hideOrgStructureDeptPos = "T5";
                }
                if (
                    !Array.isArray(communeParentId) ||
                    communeParentId?.geo_ssn_location !== undefined ||
                    communeParentId?.geo_ssn_location !== null
                ) {
                    this.getTypeGeoFenceFilter = "GEO-05";
                    const villageTypeCode = "T5";
                    const superSSNCodeDistrictSelect = communeParentId?.geo_ssn_location ? communeParentId?.geo_ssn_location : null;
                    this.geoLocationCommuneVillageListOrgStr(
                        villageTypeCode,
                        superSSNCodeDistrictSelect
                    );
                    // Org-Strictures Manage
                    const getProjectId = this.getProjectDestination ?
                        this.getProjectDestination :
                        0;
                    const getCountryId = this.getVillagesOrgStructure ?
                        this.getVillagesOrgStructure:
                        0;
                    const typeHierarchy = "GeoFence";
                    this.getReloadOrgChartByDeptGeoProject(
                        getProjectId,
                        getCountryId,
                        typeHierarchy
                    );
                }
             } catch (error) {
                 return false;
             }
        },
        // Get reload data organization-chart
        async getReloadOrgChartByDeptGeoProject(projectId, countryId, typeHierarchyGeoProject){
            const getProjectId = projectId ?
                projectId:
                0;
            const getCountryId = countryId ?
                countryId:
                0;
            const typeHierarchy = typeHierarchyGeoProject ? typeHierarchyGeoProject  : "GeoFence";
            this.setDepartmentDataByCountryProjectId({
                getProjectId,
                getCountryId,
                typeHierarchy
            });
        },
        /**
         * @Get Function Organization Chart Data Source Vuex Actions
         * */ 
        getGeoLocationStateByCountryAddNewOrgStr(
             provinceStateCode,
             superSSNStateCode
         ) {
            try {
                this.getAllProvinceActions(superSSNStateCode);
                this.geoCountryId = superSSNStateCode ? superSSNStateCode : [];
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
        getGeoLocationDistrictByCountryAddNewOrgStr(
                  districtStateType,
                  superSSNDistrictCode
              ) {
                  try {
                      this.geoLocationServices
                          .listGeoLocationDistrict(
                              districtStateType,
                              superSSNDistrictCode
                          )
                          .then((district) => {
                              if (!district) {
                                  this.setDistrictCountryAddNew = [];
                              }
                              this.getAllDistrictActions(superSSNDistrictCode);
                              this.ssnDistrictCodeId = superSSNDistrictCode ?
                                  superSSNDistrictCode :
                                  [];
                              this.setDistrictCountryAddNew = Array.isArray(district) ?
                                  district.slice() :
                                  [];
                          })
                          .catch((error) => {
                              return Promise.reject(error.message || []);
                          });
                  } catch (error) {
                      return Promise.reject(error.message || []);
                  }
        },
        getGeoLocationCommuneCapitalByCountryAddNewOrgStr(
            communeStateType,
            superSSNCommuneCode
        ) {
            try {
                this.geoLocationServices
                    .listGeoLocationCommune(
                        communeStateType,
                        superSSNCommuneCode
                    )
                    .then((commune) => {
                        if (!commune) {
                            this.setCommuneCountryAddNew = [];
                        }
                        this.getAllCommuneActions(superSSNCommuneCode);
                    })
                    .catch((error) => {
                        return Promise.reject(error.message || []);
                    });
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
        geoLocationCommuneVillageListOrgStr(villageType, superSSNCityCode) {
             try {
                 this.geoLocationServices
                     .listGeoLocationVillageCommune(
                         villageType,
                         superSSNCityCode
                     )
                     .then((location) => {
                         if (!location) {
                             this.geoLocationListArray = [];
                         }
                         //Villages
                         this.getAllVillagesActions(superSSNCityCode);
                         this.geoLocationListArray = Array.isArray(location) ?
                             location.slice() :
                             [];
                     })
                     .catch((error) => {
                         return Promise.reject(error.message || []);
                     });
             } catch (error) {
                 return Promise.reject(error.message || []);
             }
        },
    },
}