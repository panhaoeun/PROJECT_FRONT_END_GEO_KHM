// import TranslateLanguageManagementServices from "@/services/administrator/translate_language_managements/TranslateLanguageManagementServices";
// import { mapActions } from "vuex";

// export default {
//     created() {
//         this.languageTranslateServices = new TranslateLanguageManagementServices();
//     },
//     data() {
//         return {
//             fetchingGeoCommune: false,
//             deletedTranslateLanguageDialogs: false,
//             submittingtranslateLanguageData: false,
//             countryIdDel: ''
//         }
//     },
//     methods: {
//         ...mapActions('translate', ['getAllTranslateLangeuageActions']),
//         async editingTranslateLanguage() {
//             if (
//                 this.translatelanguageData?.languages_super_ssn &&
//                 this.translatelanguageData?.languages_ssn &&
//                 this.translatelanguageData?.language_name &&
//                 this.translatelanguageData?.tool_description &&
//                 this.translatelanguageData?.languages_code
//             ) {
//                 this.submittingtranslateLanguageData = true;
//                 const editDatatranslateLanguage = {
//                     editLanguageSuperSsn: this.translatelanguageData?.languages_super_ssn,
//                     editLanguageSsn: this.translatelanguageData?.languages_ssn,
//                     editLanguageName: this.translatelanguageData?.language_name,
//                     editLanguageDescription: this.translatelanguageData?.tool_description,
//                     editLanguageCode: this.translatelanguageData?.languages_code,
//                 }
//                 this.languageTranslateServices.editingTranslateLanguage(this.translatelanguageData?.id, editDatatranslateLanguage)
//                     .then(async (editTranslatelanguage) => {
//                         if (editTranslatelanguage?.status === 200) {
//                             setTimeout(async () => {
//                                 this.hasAddressErrors = false
//                                 this.$notify({
//                                     title: 'Editing TranslateLanguage Successfully',
//                                     message: editTranslatelanguage.data?.message ? editTranslatelanguage.data?.message : '',
//                                     type: 'success'
//                                 });
//                                 await this.fetchingDataTranslatelanguage(this.geoLocationCommuneData?.geo_super_ssn_location);
//                                 this.submittingtranslateLanguageData = false;
//                             }, 1000);
//                             if (!this.hasAddressErrors) {
//                                 this.$emit('close')
//                             }
//                         }
//                     }).catch((error) => {
//                         console.log(error)
//                         let message = error?.message;
//                         this.setToastError(message);
//                         this.$notify({
//                             title: 'Unsuccessfully updated commune',
//                             message: error?.message ? error?.message : '',
//                             type: 'error'
//                         });
//                         this.submittingtranslateLanguageData = false;
//                     });
//             } else {
//                 this.hasAddressErrors = false;
//                 this.submittingtranslateLanguageData = true;
//             }
//         },
//         async deletedTranslateLanguage(province) {
//             this.ajaxDeleting = province?.id;
//             this.languageTranslateServices.deletedTranslateLanguage(province?.id).then(async (language) => {
//                 if (language?.status === 200) {
//                     this.setToastMessage(state.data?.message);
//                     this.deletedTranslateLanguageDialogs = false;
//                     this.$notify({
//                         title: 'Delete Commune Successfully',
//                         message: language.data?.message ? language.data?.message : '',
//                         type: 'success'
//                     });
//                     await this.fetchingDataTranslatelanguage(province?.geo_super_ssn_location);
//                 }
//                 return language ? language : [];
//             }).catch((error) => {
//                 this.setToastError(error?.message)
//                 this.$notify({
//                     title: 'Unsuccessfully Commune Successfully',
//                     message: error?.message ? error?.message : '',
//                     type: 'error'
//                 });
//                 return Promise.reject(error?.message || []);
//             });
//             this.ajaxDeleting = 0;
//         },
//         async fetchingDataTranslatelanguage(superSSNCommuneCode) {
//             this.fetchingTranslatelanguage = true;
//             setTimeout(async () => {
//                 try {
//                     this.getAllCommuneActions(superSSNCommuneCode);
//                 } catch (e) {
//                     returnPromise.reject(e);
//                 }
//                 this.fetchingTranslatelanguage = false;
//             }, 100);
//         }
//     }
// }