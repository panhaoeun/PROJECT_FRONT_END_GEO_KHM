
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
            if(
                this.geoLocationProvinceData?.geo_zip_code 
                && this.geoLocationProvinceData?.geo_khmer_name
                && this.geoLocationProvinceData?.geo_english_name
                && this.geoLocationProvinceData?.geo_latitude_location
                && this.geoLocationProvinceData?.geo_longitude_location
            ){
                this.submittingProvinceData = true;
                const editDataGeoProvince = {
                    superSSNCountryCode: this.geoLocationProvinceData?.geo_super_ssn_location,
                    editGeoCountryZipCode: this.geoLocationProvinceData?.geo_zip_code,
                    editGeoCountryKhmerName: this.geoLocationProvinceData?.geo_khmer_name,
                    editGeoCountryEnglishName: this.geoLocationProvinceData?.geo_english_name,
                    editGeoCountryLongitude:this.geoLocationProvinceData?.geo_longitude_location,
                    editGeoCountryLatitude: this.geoLocationProvinceData?.geo_latitude_location
                }
                this.geoLocationServices.editingProvinceGeoLocation(this.geoLocationProvinceData?.id, editDataGeoProvince)
                .then(async (editCountry) => {
                    if(editCountry?.status === 200){
                        setTimeout(async () => {
                            this.hasProvinceErrors = false
                            this.submittingProvinceData = false;
                            this.$notify({
                                title: 'Editing Province Successfully',
                                message:editCountry.data?.message ? editCountry.data?.message : '',
                                type: 'success'
                            });
                            await this.fetchingDataGeoProvinceLocation(this.geoLocationProvinceData?.geo_super_ssn_location);
                            this.submittingCountryData = false;
                        }, 1000);
                    }
                    if (!this.hasProvinceErrors) {
                        this.$emit('close')
                    }
                }).catch((error)=> {
                    let message = error?.message;
                    this.setToastError(message);
                    this.$notify({
                        title: 'Unsuccessfully updated geo province',
                        message:error?.message ? error?.message : '',
                        type: 'error'
                    });
                    this.submittingProvinceData = false;
                });
            }else{
                this.hasProvinceErrors = false;
                this.submittingProvinceData = true;
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
