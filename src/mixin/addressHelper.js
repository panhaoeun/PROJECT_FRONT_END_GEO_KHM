import store from "../store";
import _ from "lodash";
import { isLoggedIn } from "@/utils/auth/auth";

export default {
    data() {
        return {
            fetchingAddressData: false
        }
    },
    methods: {
        async addressAction() {
            if (this.addressData.shipCity && this.addressData.phone_number_contact && this.addressData.contact_name &&
                this.addressData.shipZipCode && this.addressData.shipAdd01 && this.addressData.shipAdd02) {

                this.submittingAddressData = true;
                const data = this.$store.dispatch('shippingStore/addressAction', {
                    address: this.addressData,
                    action: this.isUpdate ? 'put' : 'post',
                });
                // This Data
                if (data) {
                    this.hasAddressErrors = false
                    this.setToastMessage(data.message)
                }else {
                    this.hasError(data)
                }
                this.submittingAddressData = false

            } else {
                this.hasAddressErrors = true
            }
        },
        async deleting(address) {
            const cloned = _.cloneDeep(address);
            this.ajaxDeleting = address?.id
            const data = store.dispatch('shippingStore/addressAction', {
                address: cloned,
                action: 'delete',
            });
            if (data) {
                this.setToastMessage(data.message)
                await this.fetchingData()
            } else {
                this.setToastError(data.data.form.join(', '))
            }
            this.ajaxDeleting = 0
        },
        formatAddress(obj, onlyAddress = false) {
            let addArr = []

            if (!onlyAddress) {
                addArr.push(obj.contact_name)
                addArr.push(`tel: ${obj.phone_number_contact}`)
            }

            addArr.push(obj?.shipAdd01)
            if (obj?.shipAdd02) {
                addArr.push(obj?.shipAdd02)
            }
            addArr.push(obj?.shipCity + '-' + obj?.shipZipCode)

            // if (this.countryList[obj.country]) {
            //     const country = this.countryList[obj.country]

            //     if (country.states[obj.state]) {
            //         addArr.push(country.states[obj.state].name)
            //     }

            //     addArr.push(country.name)
            // }
            return addArr.filter(function (el) {
                return el != null;
            }).join(', ')
        },
        async fetchingData() {
            this.fetchingAddressData = false;
            setTimeout(async () => {
                try {
                    this.settingRouteParam()
                    // Get Address Authentications
                    if (isLoggedIn()) {
                        const data = await store.dispatch('shippingStore/getAddressShipping');
                        if (!data) {
                             this.fetchingAddressData = false
                            this.hasError(data)
                        }
                    }
                    
                } catch (e) {
                    return Promise.reject(e);
                }
                this.fetchingAddressData = false
            }, 100)
        }
    }
}
