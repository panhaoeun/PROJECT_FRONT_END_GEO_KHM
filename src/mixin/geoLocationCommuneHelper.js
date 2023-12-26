
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import {mapActions} from "vuex";
export default {
  created() {
        this.geoLocationServices = new GeoLocationsManagementServices();
  },
  data() {
    return {
        fetchingGeoCommune: false,
        deletedGeoProvinceDialogs: false,
        loadingSubmitted:false,
        countryIdDel: ''
    }
  },
  methods: {
        ...mapActions('geoCommune', ['getAllCommuneActions']),
        async geoLocationCommuneActions() {
            if(
                this.geoLocationCommuneData?.geo_zip_code 
                && this.geoLocationCommuneData?.geo_khmer_name
                && this.geoLocationCommuneData?.geo_english_name
                && this.geoLocationCommuneData?.geo_latitude_location
                && this.geoLocationCommuneData?.geo_longitude_location
            ){
                this.submittingCommuneData = true;
                const editDataGeoProvince = {
                    superSSNProvinceCode: this.geoLocationCommuneData?.geo_super_ssn_location,
                    editGeoCountryZipCode: this.geoLocationCommuneData?.geo_zip_code,
                    editGeoCountryKhmerName: this.geoLocationCommuneData?.geo_khmer_name,
                    editGeoCountryEnglishName: this.geoLocationCommuneData?.geo_english_name,
                    editGeoCountryLongitude:this.geoLocationCommuneData?.geo_longitude_location,
                    editGeoCountryLatitude: this.geoLocationCommuneData?.geo_latitude_location
                }
                this.geoLocationServices.editingCommuneGeoLocation(this.geoLocationCommuneData?.id, editDataGeoProvince)
                .then(async (editCountry) => {
                    if(editCountry?.status === 200){
                        setTimeout(async () => {
                            this.hasAddressErrors = false
                            this.$notify({
                                title: 'Editing Commune Successfully',
                                message:editCountry.data?.message ? editCountry.data?.message : '',
                                type: 'success'
                            });
                            await this.fetchingDataGeoCommuneLocation(this.geoLocationCommuneData?.geo_super_ssn_location);
                            this.submittingCommuneData = false;
                        }, 1000);
                        if (!this.hasAddressErrors) {
                            this.$emit('close')
                        }
                    }
                }).catch((error)=> {
                    console.log(error)
                    let message = error?.message;
                    this.setToastError(message);
                    this.$notify({
                        title: 'Unsuccessfully updated commune',
                        message:error?.message ? error?.message : '',
                        type: 'error'
                    });
                    this.submittingCommuneData = false;
                });
            }else{
                this.hasAddressErrors = false;
                this.submittingCommuneData = true;
            }
        },
        async deletingGeoCommuneLocationsById(province) {
            this.ajaxDeleting = province?.id;
            this.geoLocationServices.deletedCommuneGeoLocation(province?.id).then(async (state) => {
                if(state?.status === 200){
                    this.setToastMessage(state.data?.message);
                    this.deletedGeoProvinceDialogs = false;
                    this.$notify({
                        title: 'Delete Commune Successfully',
                        message:state.data?.message ? state.data?.message : '',
                        type: 'success'
                    });
                    await this.fetchingDataGeoCommuneLocation(province?.geo_super_ssn_location);
                }
                return state ? state : [];
            }).catch((error) => {
                this.setToastError(error?.message)
                this.$notify({
                    title: 'Unsuccessfully Commune Successfully',
                    message:error?.message ? error?.message : '',
                    type: 'error'
                });
                return Promise.reject(error?.message || []);
            });
            this.ajaxDeleting = 0
        },
        async fetchingDataGeoCommuneLocation(superSSNCommuneCode) {
            this.fetchingGeoCommune = true;
            setTimeout(async () => {
                try {
                    this.getAllCommuneActions(superSSNCommuneCode);
                } catch (e) {
                return Promise.reject(e);
                }
                this.fetchingGeoCommune = false;
            }, 100)
        }

    }
}
