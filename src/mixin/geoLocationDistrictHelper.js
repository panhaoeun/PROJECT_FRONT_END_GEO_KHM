
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import {mapActions} from "vuex";
export default {
  created() {
        this.geoLocationServices = new GeoLocationsManagementServices();
  },
  data() {
    return {
        fetchingGeoDistrict: false,
        deletedGeoDistrictDialogs: false,
        loadingSubmitted:false,
        countryIdDel: ''
    }
  },
  methods: {
        ...mapActions('geoDistrict', ['getAllDistrictActions']),
        async geoLocationDistrictByProvinceActions() {
            this.submitted = true;
            if(
                this.geoLocationCountryData?.geo_zip_code 
                && this.geoLocationCountryData?.geo_khmer_name
                && this.geoLocationCountryData?.geo_english_name
                && this.geoLocationCountryData?.geo_latitude_location
                && this.geoLocationCountryData?.geo_longitude_location
            ){
                const editDataGeoDistrict = {
                    superSSNDistrictCode: this.geoLocationCountryData?.geo_super_ssn_location,
                    editGeoCountryZipCode: this.geoLocationCountryData?.geo_zip_code,
                    editGeoCountryKhmerName: this.geoLocationCountryData?.geo_khmer_name,
                    editGeoCountryEnglishName: this.geoLocationCountryData?.geo_english_name,
                    editGeoCountryLongitude:this.geoLocationCountryData?.geo_latitude_location,
                    editGeoCountryLatitude: this.geoLocationCountryData?.geo_latitude_location
                }
                console.log(editDataGeoDistrict)
                // this.geoLocationServices.editingDistrictGeoLocation(this.geoLocationCountryData?.id, editDataGeoDistrict)
                // .then(async (editCountry) => {
                //     if(editCountry?.status === 200){
                //         setTimeout(async () => {
                //             this.hasAddressErrors = false
                //             this.$notify({
                //                 title: 'Editing Country Successfully',
                //                 message:editCountry.data?.message ? editCountry.data?.message : '',
                //                 type: 'success'
                //             });
                //             await this.fetchingDataGeoProvinceLocation(this.geoLocationCountryData?.geo_super_ssn_location);
                //             this.submittingCountryData = false;
                //         }, 1000);
                       
                //     }
                // }).catch((error)=> {
                //     let message = error?.message;
                //     this.setToastError(message);
                //     this.$notify({
                //         title: 'Unsuccessfully updated country',
                //         message:error?.message ? error?.message : '',
                //         type: 'error'
                //     });
                //     this.submittingCountryData = false;
                // });
            }else{
                this.hasAddressErrors = false;
                this.submittingCountryData = true;
            }
        },
        async deletingGeoDistrictLocationsById(district) {
            this.ajaxDeleting = district?.id;
            const superSSNDistrictCode = district?.geo_ssn_location;
            this.geoLocationServices.deletedDistrictGeoLocation(district?.id).then(async (district) => {
                if(district?.status === 200){
                    this.setToastMessage(district.data?.message);
                    this.deletedGeoDistrictDialogs = false;
                    this.$notify({
                        title: 'Delete District Successfully',
                        message:district.data?.message ? district.data?.message : '',
                        type: 'success'
                    });
                    await this.fetchingDataGeoDistrictByProvinceLocation(superSSNDistrictCode);
                }
                return district ? district : [];
            }).catch((error) => {
                this.setToastError(error?.message)
                this.$notify({
                    title: 'Unsuccessfully District Successfully',
                    message:error?.message ? error?.message : '',
                    type: 'error'
                });
                return Promise.reject(error?.message || []);
            });
            this.ajaxDeleting = 0
        },
        async fetchingDataGeoDistrictByProvinceLocation(superSSNDistrictCode) {
            this.fetchingGeoDistrict = true;
            setTimeout(async () => {
                try {
                    this.getAllDistrictActions(superSSNDistrictCode);
                } catch (e) {
                return Promise.reject(e);
                }
                this.fetchingGeoDistrict = false;
            }, 100)
        }

    }
}
