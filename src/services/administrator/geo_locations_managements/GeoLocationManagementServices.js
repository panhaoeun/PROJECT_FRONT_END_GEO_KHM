import http from "../../../../http-access-control-json";

export default class GeoLocationsManagementServices {
    async listGeoLocationCountryByZip(countryType, superSSNCountryCode) {
        return await http.get(`/admin/geo-location-route/country-location-list?superSSNCountryCode=${superSSNCountryCode ? superSSNCountryCode : ''}&countryType=${countryType ? countryType : "T1"}`).then((result) => {
            if (!result) {
                return false;
            }
            if (result.status == 200) {
                if (result.data.success == true) {
                    return result.data.result.resultStatus;
                }
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
    async listGeoLocationProvinceState(stateType, superSSNStateCode) {
        return await http.get(`/admin/geo-location-route/province-state-location-list?ssnCountryState=${superSSNStateCode ? superSSNStateCode : ''}&provinceStateType=${stateType ? stateType : "T2"}`).then((result) => {
            if (!result) {
                return false;
            }
            if (result.status == 200) {
                if (result.data.success == true) {
                    return result.data.result.resultStatus;
                }
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
    async listGeoLocationDistrict(districtType, superSSNDistrictCode) {
        return await http.get(`/admin/geo-location-route/district-city-location-list?superSSNDistrict=${superSSNDistrictCode ? superSSNDistrictCode : ''}&districtCityType=${districtType ? districtType : "T3"}`).then((result) => {
            if (!result) {
                return false;
            }
            if (result.status == 200) {
                if (result.data.success == true) {
                    return result.data.result.resultStatus;
                }
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
    async listGeoLocationCommune(communeType, ssnCommuneSangkat) {
        return await http.get(`/admin/geo-location-route/commune-capital-by-district-location-list?ssnCommuneSangkat=${ssnCommuneSangkat ? ssnCommuneSangkat : ''}&districtCommuneType=${communeType ? communeType : "T4"}`).then((result) => {
            if (!result) {
                return false;
            }
            if (result.status == 200) {
                if (result.data.success == true) {
                    return result.data.result.resultStatus;
                }
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
    async listGeoLocationVillageCommune(villageType,superSSNCityCode) {
        return await http.get(`/admin/geo-location-route/village-commune-location-list?superSSNCityCode=${superSSNCityCode ? superSSNCityCode : ''}&villageCode=${villageType ? villageType : "T5"}`).then((result) => {
            if (!result) {
                return false;
            }
            if (result.status == 200) {
                if (result.data.success == true) {
                    return result.data.result.resultStatus;
                }
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
}