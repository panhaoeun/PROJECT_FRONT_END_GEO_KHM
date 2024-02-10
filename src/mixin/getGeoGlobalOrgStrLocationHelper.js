import {
    mapGetters,
    mapActions
} from "vuex";

export default{
    mounted() {
        this.getGeoLocationCountryOrgStr();
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
    },
    methods: {
        ...mapActions("geoCountry", ["getAllCountryActions"]),
        ...mapActions("geoProvince", ["getAllProvinceActions"]),
        ...mapActions("geoDistrict", ["getAllDistrictActions"]),
        ...mapActions("geoCommune", ["getAllCommuneActions"]),
        ...mapActions("geoVillages", ["getAllVillagesActions"]),
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
            ) {
                this.selectedProvinceOptOrgStr = null;
                this.hideOrgStructureDeptPos = "T1"
            }
        },
        /**
         * @Get Object Geo-fence Location
         * **/
         // Get All List
        getGeoLocationCountryOrgStr() {
             try {
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
                    const geoLocationProvinceType = "T4";
                    this.ssnCommuneByVillageCodeId = ssnSuperProvinceCodeLocationGeo
                        ? ssnSuperProvinceCodeLocationGeo
                        : null;
                    this.getGeoLocationCommuneCapitalByCountryAddNewOrgStr(
                        geoLocationProvinceType,
                        ssnSuperProvinceCodeLocationGeo
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
                    const villageTypeCode = "T5";
                    const superSSNCodeDistrictSelect = communeParentId?.geo_ssn_location ? communeParentId?.geo_ssn_location : null;
                    this.geoLocationCommuneVillageListOrgStr(
                        villageTypeCode,
                        superSSNCodeDistrictSelect
                    );
                }
             } catch (error) {
                 return false;
             }
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