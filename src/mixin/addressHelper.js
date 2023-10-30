import store from "../store";
import { isLoggedIn } from "@/utils/auth/auth";

export default {
    data() {
        return {
            fetchingAddressData: false
        }
    },
    methods: {
        async addressAction() {
            console.log(this.addressData)
            // if (this.addressData.email && this.addressData.city && this.addressData.phone && this.addressData.name &&
            //     this.addressData.zip && this.addressData.country && this.addressData.address_1) {

            //     this.submittingAddressData = true
            //     const data = await this.userAddressAction({
            //         ...this.addressData,
            //         ...{
            //             user_token: await this.getUserToken()
            //         }
            //     })

            //     if (data ? .status === 200) {
            //         this.hasAddressErrors = false
            //         this.setToastMessage(data.message)

            //     } else if (data ? .status === 201) {
            //         this.setToastError(data.data ? .form ? .join(', '))

            //     } else {
            //         this.hasError(data)
            //     }
            //     this.submittingAddressData = false

            // } else {
            //     this.hasAddressErrors = true
            // }
        },
        async deleting() {
            console.log(this.addressData)
            // if (confirm(this.$t('cartProductTile.deleteAlert'))) {
            //     this.ajaxDeleting = address.id
            //     const data = await this.userAddressDelete({
            //         id: address.id,
            //         params: {
            //             user_token: await this.getUserToken()
            //         }
            //     })

            //     if (data ? .status === 200) {
            //         this.setToastMessage(data.message)
            //         await this.fetchingData()
            //     } else {
            //         this.setToastError(data.data.form.join(', '))
            //     }
            //     this.ajaxDeleting = 0
            // }
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
            this.fetchingAddressData = true
            setTimeout(async () => {
                try {
                    this.settingRouteParam()
                    // Get Address Authentications
                    if (isLoggedIn()) {
                        await store.dispatch('shippingStore/getAddressShipping');
                    }
                } catch (e) {
                    return Promise.reject(e);
                }
                this.fetchingAddressData = false
            }, 100)
        }
    }
}
