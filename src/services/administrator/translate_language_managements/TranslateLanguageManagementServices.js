import http from "../../../../http-access-control-json";

export default class FolderTranslateManagementServices {
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
    // async listFolderTranslateLanguage(FolderType, superSSNFolderTranslateLang) {
    //     return await http.get(`/admin/geo-location-route/country-location-list?superSSNFolderTranslateLang=${superSSNFolderTranslateLang ? superSSNFolderTranslateLang : ''}&FolderType=${FolderType ? FolderType : "T3"}`).then((result) => {
    //         if (!result) {
    //             return false;
    //         }
    //         if (result.status == 200) {
    //             if (result.data.success == true) {
    //                 return result.data.result.resultStatus;
    //             }
    //         }
    //     }).catch((error) => {
    //         return Promise.reject(error);
    //     });
    // }
}
