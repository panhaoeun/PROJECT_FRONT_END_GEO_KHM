
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import {mapActions} from "vuex";
export default {
  created() {
        this.geoLocationServices = new GeoLocationsManagementServices();
  },
  data() {
    return {
        fetchingGeoCountry: false,
        deletedGeoCountryDialogs: false,
        loadingSubmitted:false,
        countryIdDel: ''
    }
  },
  methods: {
        ...mapActions('geoCountry', ['getAllCountryActions']),
        async geoLocationCountryActions() {
            this.submittingCountryData = true;  
            if(
                this.geoLocationCountryData?.geo_zip_code 
                && this.geoLocationCountryData?.geo_khmer_name
                && this.geoLocationCountryData?.geo_english_name
                && this.geoLocationCountryData?.geo_latitude_location
                && this.geoLocationCountryData?.geo_longitude_location
            ){
                const editDataGeoCountry = {
                    editGeoCountryZipCode: this.geoLocationCountryData?.geo_zip_code,
                    editGeoCountryKhmerName: this.geoLocationCountryData?.geo_khmer_name,
                    editGeoCountryEnglishName: this.geoLocationCountryData?.geo_english_name,
                    editGeoCountryLongitude:this.geoLocationCountryData?.geo_latitude_location,
                    editGeoCountryLatitude: this.geoLocationCountryData?.geo_latitude_location
                }
                this.geoLocationServices.editingCountryGeoLocation(this.geoLocationCountryData?.id, editDataGeoCountry)
                .then(async (editCountry) => {
                    if(editCountry?.status === 200){
                        setTimeout(async () => {
                            this.hasAddressErrors = false
                            this.$notify({
                                title: 'Editing Country Successfully',
                                message:editCountry.data?.message ? editCountry.data?.message : '',
                                type: 'success'
                            });
                            await this.fetchingDataGeoCountryLocation();
                            this.submittingCountryData = false;
                        }, 1000);
                       
                    }
                }).catch((error)=> {
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
        async deletingGeoCountryLocationsById(countryId) {
            this.ajaxDeleting = countryId?.id;
            this.geoLocationServices.deletedCountryGeoLocation(countryId?.id).then(async (country) => {
                if(country?.status === 200){
                    this.setToastMessage(country.data?.message);
                    this.deletedGeoCountryDialogs = false;
                    this.$notify({
                        title: 'Delete Country Successfully',
                        message:country.data?.message ? country.data?.message : '',
                        type: 'success'
                    });
                    await this.fetchingDataGeoCountryLocation();
                }
                return country ? country : [];
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
        async fetchingDataGeoCountryLocation(){
            this.fetchingGeoCountry = true;
            setTimeout(async () => {
                try {
                    this.getAllCountryActions();
                } catch (e) {
                return Promise.reject(e);
                }
                this.fetchingGeoCountry = false;
            }, 100)
        }

    }
}
