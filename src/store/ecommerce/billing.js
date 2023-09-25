import ShippingBillingAddressServices from "../../services/customers/address/ShippingBillingAddressServices";
const shippingAddress = new ShippingBillingAddressServices();
import {
    ElMessageBox,
    ElNotification
} from 'element-plus';
import _ from "lodash";
import {
    isLoggedIn
} from "@/utils/auth/auth";
import BillingAddrDTO from '../../views/customers/sopping_cart/my_account_checkout/BillingAddress.json';
export default {
    namespaced: true,
    state: {
        addressesBilling: [],
        selectedAddressBilling: null,
        shippingMethodBilling: null,
    },
    mutations: {
        setAddressesBilling(state, adds) {
            state.addressesBilling.splice(0, state.addresses.length);
            state.addressesBilling.push(...adds);
        },
        addressSelectedBilling(state, address) {
            state.selectedAddressBilling = address;
        },
        setShippingMethodBilling(state, payload) {
            state.shippingMethod = payload;
        },
        resetAddressesBilling(state) {
            state.shippingMethod = null;
            state.addresses = [];
            state.selectedAddressBilling = null;
        },
        setGetAddrShippingBilling(state, allAddrBilling) {
            state.addressesBilling.splice(0, state.addressesBilling.length);
            const transformed = [];
            for (let i = 0; i < allAddrBilling.length; i += 1) {
                const itemBill = allAddrBilling[i];
                transformed.push(_.assign(_.cloneDeep(BillingAddrDTO), itemBill));
            }
            state.addressesBilling.push(...transformed);
        }
    },
    actions: {
        async getAddressBilling({commit}) {
            try {
                if (isLoggedIn()) {
                    const addressType = "Billing" ?? '';
                    await shippingAddress.getBillingOrShippingAddressByQueriesByAddrType(addressType)
                        .then((billing) => {
                            if (billing.length > 0) {
                                commit('setGetAddrShippingBilling', billing);
                            } else throw new Error(!billing);
                        }).catch((error) => {
                            throw new Error(error);
                        });
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async addressBillingAction({
            state,
            commit,
            rootGetters,
            dispatch
        }, {
            address,
            action
        }) {
            try {
                let reqData = null;
                if (action === "post" || action === "put") {
                    reqData = address;
                } else if (action === "delete") {
                    reqData = {
                        addressId: address?.id,
                    };
                }
                const addressBillingModule = {
                    contactName: reqData?.contact_name,
                    phoneNumberContact: reqData?.phone_number_contact,
                    addressType: 'Billing',
                    residentAddr: {
                        reAddr01: '',
                        reAddr02: '',
                        reCity: '',
                        reZipcode: ''
                    },
                    buildingAddr: {
                        billAddr01: reqData?.billAdd01,
                        billAddr02: reqData?.billAdd02,
                        billAddrCity:reqData?.billCity,
                        billAddrZipcode: reqData?.billZipCode
                    },
                    shippingAddr: {
                        shippingAddr01: '',
                        shippingAddr02: '',
                        shippingAddrCity: '',
                        shippingAddrZipcode: ''
                    }
                }
                // Billing Address
                if (action === "post") {
                    await shippingAddress.addShippingBillingAddress(addressBillingModule)
                        .then(async (address) => {
                            if (address.data.success === true) {
                                ElNotification({
                                    title: `Successfully Create Billing Address`,
                                    message: address.data?.message?address.data?.message : '',
                                    showClose: false,
                                    type: 'success'
                                });
                                window.location.reload();
                                if (rootGetters['cart/checkoutInitiated'] && action !== 'get') {
                                    const reqObj = {
                                        address: state.selectedAddress,
                                        shippingMethod: state.shippingMethod,
                                    };
                                    await dispatch('cart/createCheckout', reqObj, {
                                        root: true,
                                    });
                                } else if (address && address.data.result.statusCode === 201) {
                                    commit('setAddresses', address);
                                    if (
                                        (state.selectedAddress === null ||
                                            _.findIndex(state.addresses, val => val.id === state.selectedAddress.id) < 0) &&
                                        state.addresses.length > 0
                                    ) {
                                        console.log('Address selected', state.selectedAddress);
                                    }
                                }
                                return true;
                            }
                        })
                        .catch((error) => {
                            if (error) {
                                ElNotification({
                                    title: 'Error Create Billing Address',
                                    message: error.response.data.error.message ?? 'Unsuccessfully for create Billing',
                                    showClose: false,
                                    type: 'error'
                                });
                            }
                            // Validation Error
                            if (error.response.data.error.error.errors) {
                                for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                    const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                    ElNotification({
                                        title: 'Error Create Billing Address',
                                        message: messageValidation ?? 'Unsuccessfully for updated billing address',
                                        showClose: false,
                                        type: 'error'
                                    });
                                }
                            }
                        });
                } else if (action === "put") {
                    const addrId = parseInt(address?.id) ? parseInt(address?.id) : 1;
                    await shippingAddress.updatedShippingBillingAddress(addrId ? addrId : 0, addressBillingModule)
                        .then((address) => {
                            console.log(address)
                            if (address.data.success === true) {
                                ElNotification.success({
                                    title: `Successfully Updated Billing Address`,
                                    message: address.data?.message ? address.data?.message : '',
                                    showClose: false
                                });
                                window.location.reload();
                            }
                        })
                        .catch((error) => {
                            if (error) {
                                console.log(address)
                                ElNotification.error({
                                    title: 'Error Updated Billing Address',
                                    message: error.response.data.error.message ?? 'Unsuccessfully for updated billing address',
                                    showClose: false
                                });
                            }
                            // Validation Error
                            if (error.response.data.error.error.errors) {
                                for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                    const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                    ElNotification.error({
                                        title: 'Error Updated Billing Address',
                                        message: messageValidation ?? 'Unsuccessfully for updated billing address',
                                        showClose: false
                                    });
                                }
                            }
                        });
                } else if (action === "delete") {
                    ElMessageBox.confirm('Are you sure you want to Delete Billing Address?', 'Deleted Billing Address', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                instance.confirmButtonLoading = true;
                                instance.confirmButtonText = 'Loading...';
                                setTimeout(() => {
                                    done();
                                    setTimeout(() => {
                                        instance.confirmButtonLoading = false;
                                    }, 300);
                                }, 1000);
                            } else {
                                done();
                            }
                        }
                    }).then(async () => {
                        const addrShipId = parseInt(reqData?.addressId) ? parseInt(reqData?.addressId) : 1;
                        await shippingAddress.deletedShippingBillingAddress(addrShipId ? addrShipId : 0)
                            .then((delShipAddr) => {
                                if (delShipAddr) {
                                    ElNotification.success({
                                        title: `Successfully Deleted Billings Address`,
                                        message: delShipAddr.data?.message ? delShipAddr.data?.message : '',
                                        showClose: false
                                    });
                                    window.location.reload();
                                }
                            })
                            .catch((error) => {
                                if (error) {
                                    ElNotification.error({
                                        title: 'Error Deleted Billing Address',
                                        message: error.response.data.error.message ?? 'Unsuccessfully for deleted billing address',
                                        showClose: false
                                    });
                                }
                            });
                    }).catch(() => {
                        ElNotification.info({
                            type: 'info',
                            message: 'Delete canceled'
                        });
                    });
                }
                return true;
            } catch (err) {
                return false;
            }
        }
    },
    getters: {
        allBillingAddresses(state) {
            return state.addressesBilling;
        },
        getSelectedBillingAddress(state) {
            return state.selectedAddressBilling;
        },
        shippingMethodBilling(state) {
            return state.shippingMethod;
        },
        shippingMethodsBilling(state) {
            return state.shippingMethods;
        },
    },
};
