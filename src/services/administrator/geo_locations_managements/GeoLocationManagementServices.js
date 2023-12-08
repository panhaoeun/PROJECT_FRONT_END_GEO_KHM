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
    /** 
     * @api {post} 
     *  @api (Country,Province,District,Commune,Village)
     */
    async createCountryGeoLocation(countryGeo) {
        return http.post("/admin/geo-location-route/add-new-location-country-geo", countryGeo);
    }
    async createProvinceStateGeoLocation(stateGeo) {
        return http.post("/admin/geo-location-route/add-new-location-province-state-by-country", stateGeo);
    }
    async createDistrictGeoLocation(districtGeo) {
        return http.post("/admin/geo-location-route/add-new-location-district-by-country", districtGeo);
    }
    async createCommuneGeoLocation(communeGeo) {
        return http.post("/admin/geo-location-route/add-new-location-commune-capital-by-country", communeGeo);
    }
    async createVillageGeoLocation(villageGeo) {
        return http.post("/admin/geo-location-route/add-new-location-village-commune-by-country", villageGeo);
    }
    /** 
     * @api {put} 
     *  @api (Country,Province,District,Commune,Village)
    */
    async editingCountryGeoLocation(geoCountryId, countryGeo) {
        return http.put(`/admin/geo-location-route/edited-new-location-country-geo/${geoCountryId}`, countryGeo);
    }
    async editingProvinceGeoLocation(geoProvinceId, provinceGeo) {
        return http.put(`/admin/geo-location-route/edited-new-location-province-geo/${geoProvinceId}`, provinceGeo);
    }
    async editingDistrictGeoLocation(geoDistrictId, districtGeo) {
        return http.put(`/admin/geo-location-route/edited-new-location-district-geo/${geoDistrictId}`, districtGeo);
    }
    async editingCommuneGeoLocation(geoCommuneId, communeGeo) {
        return http.put(`/admin/geo-location-route/edited-new-location-commune-geo/${geoCommuneId}`, communeGeo);
    }
    async editingVillageByCommuneGeoLocation(geoVillageId, villageGeo) {
        return http.put(`/admin/geo-location-route/edited-new-location-village-geo/${geoVillageId}`, villageGeo);
    }
    /** 
     * @api {deleted} 
     *  @api (Country,Province,District,Commune,Village)
    */
    async deletedCountryGeoLocation(geoCountryId, countryGeo) {
        return http.delete(`/admin/geo-location-route/deleted-renew-location-country-geo/${geoCountryId}`, countryGeo);
    }
    async deletedProvinceGeoLocation(geoCountryId, countryGeo) {
        return http.delete(`/admin/geo-location-route/deleted-renew-location-province-geo/${geoCountryId}`, countryGeo);
    }
    async deletedDistrictGeoLocation(geoCountryId, countryGeo) {
        return http.delete(`/admin/geo-location-route/deleted-renew-location-district-geo/${geoCountryId}`, countryGeo);
    }
    async deletedCommuneGeoLocation(geoCountryId, countryGeo) {
        return http.delete(`/admin/geo-location-route/deleted-renew-location-commune-geo/${geoCountryId}`, countryGeo);
    }
    async deletedVillageGeoLocation(geoCountryId, countryGeo) {
        return http.delete(`/admin/geo-location-route/deleted-renew-location-village-geo/${geoCountryId}`, countryGeo);
    }
}