
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import {mapActions} from "vuex";
export default {
  created() {
        this.geoLocationServices = new GeoLocationsManagementServices();
  },
  data() {
    return {
        fetchingGeoProvince: false,
        deletedGeoProvinceDialogs: false,
        loadingSubmitted:false,
        countryIdDel: ''
    }
  },
  methods: {
        ...mapActions('geoProvince', ['getAllProvinceActions']),
        async geoLocationProvinceActions() {
            this.submittingCountryData = true;  
            if(
                this.geoLocationCountryData?.geo_zip_code 
                && this.geoLocationCountryData?.geo_khmer_name
                && this.geoLocationCountryData?.geo_english_name
                && this.geoLocationCountryData?.geo_latitude_location
                && this.geoLocationCountryData?.geo_longitude_location
            ){
                const editDataGeoProvince = {
                    superSSNCountryCode: this.geoLocationCountryData?.geo_super_ssn_location,
                    editGeoCountryZipCode: this.geoLocationCountryData?.geo_zip_code,
                    editGeoCountryKhmerName: this.geoLocationCountryData?.geo_khmer_name,
                    editGeoCountryEnglishName: this.geoLocationCountryData?.geo_english_name,
                    editGeoCountryLongitude:this.geoLocationCountryData?.geo_longitude_location,
                    editGeoCountryLatitude: this.geoLocationCountryData?.geo_latitude_location
                }
                this.geoLocationServices.editingProvinceGeoLocation(this.geoLocationCountryData?.id, editDataGeoProvince)
                .then(async (editCountry) => {
                    if(editCountry?.status === 200){
                        setTimeout(async () => {
                            this.hasAddressErrors = false
                            this.$notify({
                                title: 'Editing Country Successfully',
                                message:editCountry.data?.message ? editCountry.data?.message : '',
                                type: 'success'
                            });
                            await this.fetchingDataGeoProvinceLocation(this.geoLocationCountryData?.geo_super_ssn_location);
                            this.submittingCountryData = false;
                        }, 1000);
                       
                    }
                }).catch((error)=> {
                    console.log(error)
                    let message = error?.message;
                    this.setToastError(message);
                    this.$notify({
                        title: 'Unsuccessfully updated country',
                        message:error?.message ? error?.message : '',
                        type: 'error'
                    });
                    this.submittingCountryData = false;
                });
            }else{
                this.hasAddressErrors = false;
                this.submittingCountryData = true;
            }
        },
        async deletingGeoProvinceLocationsById(province) {
            this.ajaxDeleting = province?.id;
            this.geoLocationServices.deletedProvinceGeoLocation(province?.id).then(async (state) => {
                if(state?.status === 200){
                    this.setToastMessage(state.data?.message);
                    this.deletedGeoProvinceDialogs = false;
                    this.$notify({
                        title: 'Delete Country Successfully',
                        message:state.data?.message ? state.data?.message : '',
                        type: 'success'
                    });
                    await this.fetchingDataGeoProvinceLocation(province?.geo_super_ssn_location);
                }
                return state ? state : [];
            }).catch((error) => {
                this.setToastError(error?.message)
                this.$notify({
                    title: 'Unsuccessfully Country Successfully',
                    message:error?.message ? error?.message : '',
                    type: 'error'
                });
                return Promise.reject(error?.message || []);
            });
            this.ajaxDeleting = 0
        },
        async fetchingDataGeoProvinceLocation(superSSNStateCode) {
            this.fetchingGeoProvince = true;
            setTimeout(async () => {
                try {
                     this.getAllProvinceActions(superSSNStateCode);
                } catch (e) {
                return Promise.reject(e);
                }
                this.fetchingGeoProvince = false;
            }, 100)
        }

    }
}
