// import http from "../../../../http-access-control-json";

// export default class LanguageTranslateManagementServices {
//     async listTranslateLanguage(langType, superSSNLanguageTranslateLang) {
//         return await http.get(`/admin/geo-location-route/country-location-list?superSSNLanguageTranslateLang=${superSSNLanguageTranslateLang ? superSSNLanguageTranslateLang : ''}&langType=${langType ? langType : "T2"}`).then((result) => {
//             if (!result) {
//                 return false;
//             }
//             if (result.status == 200) {
//                 if (result.data.success == true) {
//                     return result.data.result.resultStatus;
//                 }
//             }
//         }).catch((error) => {
//             return Promise.reject(error);
//         });
//     }

//     /** 
//      * @api {post} 
//      *  @api (Country,Province,District,Commune,Village)
//      */
//     async createLanguageTranslate(Translatelanguage) {
//         return http.post("/admin/translate-language-route/add-new-language-language-project", Translatelanguage);
//     }
//     /** 
//     * @api {put} 
//     *  @api (Country,Province,District,Commune,Village)
//     */
//     async editLanguageTranslate(languageId, Translatelanguage) {
//         return http.put(`/admin/translate-language-route/edited-new-language-language-project/${languageId}`, Translatelanguage);
//     }

//     /** 
//     * @api {deleted} 
//     *  @api (Country,Province,District,Commune,Village)
//     */
//     async deletedLanguageTranslate(languageId, Translatelanguage) {
//         return http.delete(`/admin/translate-language-route/deleted-new-language-project-language/${languageId}`, Translatelanguage);
//     }
// }
