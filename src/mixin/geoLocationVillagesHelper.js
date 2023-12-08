
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
        ...mapActions('geoVillages', ['getAllVillagesActions']),
        async geoLocationProvinceActions() {
            this.submittingCountryData = true;  
            if(
                this.geoLocationVillagesData?.geo_zip_code 
                && this.geoLocationVillagesData?.geo_khmer_name
                && this.geoLocationVillagesData?.geo_english_name
                && this.geoLocationVillagesData?.geo_latitude_location
                && this.geoLocationVillagesData?.geo_longitude_location
            ){
                const editDataGeoProvince = {
                    superSSNCommuneCode: this.geoLocationVillagesData?.geo_super_ssn_location,
                    editGeoCountryZipCode: this.geoLocationVillagesData?.geo_zip_code,
                    editGeoCountryKhmerName: this.geoLocationVillagesData?.geo_khmer_name,
                    editGeoCountryEnglishName: this.geoLocationVillagesData?.geo_english_name,
                    editGeoCountryLongitude:this.geoLocationVillagesData?.geo_longitude_location,
                    editGeoCountryLatitude: this.geoLocationVillagesData?.geo_latitude_location
                }
                this.geoLocationServices.editingVillageByCommuneGeoLocation(this.geoLocationVillagesData?.id, editDataGeoProvince)
                .then(async (editCountry) => {
                    if(editCountry?.status === 200){
                        setTimeout(async () => {
                            this.hasAddressErrors = false
                            this.$notify({
                                title: 'Editing Villages Successfully',
                                message:editCountry.data?.message ? editCountry.data?.message : '',
                                type: 'success'
                            });
                            await this.fetchingDataGeoVillageLocation(this.geoLocationVillagesData?.geo_super_ssn_location);
                            this.submittingCountryData = false;
                        }, 100);
                    }
                }).catch((error)=> {
                    console.log(error)
                    let message = error?.message;
                    this.setToastError(message);
                    this.$notify({
                        title: 'Unsuccessfully updated villages',
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
        async deletingGeoVillageLocationsById(province) {
            this.ajaxDeleting = province?.id;
            this.geoLocationServices.deletedVillageGeoLocation(province?.id).then(async (state) => {
                if(state?.status === 200){
                    this.setToastMessage(state.data?.message);
                    this.deletedGeoProvinceDialogs = false;
                    this.$notify({
                        title: 'Delete Village Successfully',
                        message:state.data?.message ? state.data?.message : '',
                        type: 'success'
                    });
                    await this.fetchingDataGeoVillageLocation(province?.geo_super_ssn_location);
                }
                return state ? state : [];
            }).catch((error) => {
                this.setToastError(error?.message)
                this.$notify({
                    title: 'Unsuccessfully Village Successfully',
                    message:error?.message ? error?.message : '',
                    type: 'error'
                });
                return Promise.reject(error?.message || []);
            });
            this.ajaxDeleting = 0
        },
        async fetchingDataGeoVillageLocation(superSSNStateCode) {
            this.fetchingGeoProvince = true;
            setTimeout(async () => {
                try {
                     this.getAllVillagesActions(superSSNStateCode);
                } catch (e) {
                return Promise.reject(e);
                }
                this.fetchingGeoProvince = false;
            }, 100)
        }

    }
}
