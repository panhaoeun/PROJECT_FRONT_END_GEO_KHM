import ShippingBillingAddressServices from "../../services/customers/address/ShippingBillingAddressServices";
import DeliveryTrackingServices from "../../services/delivery_tracking/DeliveryTrackingService";
const shippingAddress = new ShippingBillingAddressServices();
const deliveryTracking = new DeliveryTrackingServices();
import { ElMessageBox, ElNotification } from 'element-plus';
import _ from "lodash";
import { isLoggedIn } from "@/utils/auth/auth";
import ShippingDTO from '../../views/customers/sopping_cart/my_account_checkout/ShippingAddress.json';
export default {
    namespaced: true,
    state: {
        addresses: [],
        selectedAddress: null,
        shippingMethod: null,
        deliveryTrackingMethod: null
    },
    mutations: {
        setAddresses(state, adds) {
            state.addresses.splice(0, state.addresses.length);
            state.addresses.push(...adds);
        },
        addressSelected(state, address) {
            state.selectedAddress = address;
        },
        setShippingMethod(state, payload) {
            state.shippingMethod = payload;
        },
        setShippingMethodDelivery(state, payload){
            state.deliveryTrackingMethod = payload;
        },
        resetAddresses(state) {
            state.shippingMethod = null;
            state.addresses = [];
            state.selectedAddress = null;
        },
        setGetAddrShipping(state, allAddShip){
            state.addresses.splice(0, state.addresses.length);
            const transformed = [];
            for (let i = 0; i < allAddShip.length; i += 1) {
                const item = allAddShip[i];
                transformed.push(_.assign(_.cloneDeep(ShippingDTO), item));
            }
            state.addresses.push(...transformed);
        }
    },
    actions: {
        async getAddressShipping({commit}){
            try {
                if (isLoggedIn()){
                    const addressType = "Shipping" ?? '';
                    await shippingAddress.getBillingOrShippingAddressByQueriesByAddrType(addressType)
                      .then((address) => {
                        if (address.length > 0) {
                            commit('setGetAddrShipping', address);
                        } else throw new Error(!address);
                    }).catch((error) => {   
                        throw new Error(error);
                    });
                }   
            } catch (err) {
                throw new Error(err);
            }
        },
        async getDeliveryTracking({commit}){
            try {
                if (isLoggedIn()) {
                    await deliveryTracking.getListDeliveryTracking()
                        .then((delivery) => {
                            if (delivery.length > 0) {
                                commit('setShippingMethodDelivery', delivery);
                            } else throw new Error(!delivery);
                        }).catch((error) => {
                            throw new Error(error);
                        });
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async addressAction(
            { state, commit, rootGetters, dispatch },
            { address, action }
        ) {
            try {
                let reqData = null;
                if (action === "post" || action === "put") {
                    reqData = address;
                } else if (action === "delete") {
                    reqData = {
                        addressId: address?.id,
                    };
                }
                const addressModule = {
                    contactName: reqData?.contact_name,
                    phoneNumberContact: reqData?.phone_number_contact,
                    addressType: 'Shipping',
                    residentAddr: {
                        reAddr01:'',
                        reAddr02: '',
                        reCity: '',
                        reZipcode: ''
                    },
                    buildingAddr: {
                        billAddr01: '',
                        billAddr02:'',
                        billAddrCity: '',
                        billAddrZipcode: ''
                    },
                    shippingAddr: {
                        shippingAddr01: reqData?.shipAdd01,
                        shippingAddr02: reqData?.shipAdd02,
                        shippingAddrCity: reqData?.shipCity,
                        shippingAddrZipcode: reqData?.shipZipCode
                    }
                }
            // Shipping Address
                if (action === "post"){
                    await shippingAddress.addShippingBillingAddress(addressModule)
                        .then(async (address) => {
                            if (address.data.success === true) {
                                ElNotification({
                                    title: `Successfully Create Shipping Address`,
                                    message: address.data?.message ? address.data?.message : '',
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
                                    title: 'Error Create Address',
                                    message: error.response.data.error.message ?? 'Unsuccessfully for create address',
                                    showClose: false,
                                    type: 'error'
                                });
                            }
                            // Validation Error
                            if (error.response.data.error.error.errors) {
                                for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                    const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                    ElNotification({
                                        title: 'Error Create Address Address',
                                        message: messageValidation ?? 'Unsuccessfully for updated address',
                                        showClose: false,
                                        type: 'error'
                                    });
                                }
                            }
                        });
                } else if (action === "put"){   
                    const addrId = parseInt(address?.id)? parseInt(address?.id) : 1;
                  
                    await shippingAddress.updatedShippingBillingAddress(addrId ? addrId : 0, addressModule)
                        .then((address) => {
                            console.log(address)
                            if(address.data.success === true){
                                ElNotification.success({
                                    title: `Successfully Updated Shipping Address`,
                                    message: address.data?.message ? address.data?.message : '' ,
                                    showClose: false
                                });
                                window.location.reload();
                            }
                        })
                        .catch((error) => {
                            if(error){
                                console.log(address)
                                ElNotification.error({
                                    title: 'Error Updated Shipping Address',
                                    message: error.response.data.error.message ?? 'Unsuccessfully for updated shipping address',
                                    showClose: false
                                });   
                            }
                            // Validation Error
                            if(error.response.data.error.error.errors){
                                for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                    const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                    ElNotification.error({
                                        title: 'Error Updated Shipping Address',
                                        message: messageValidation ?? 'Unsuccessfully for updated shipping address',
                                        showClose: false
                                    });   
                                }
                            }
                        });
                } else if (action === "delete"){
                    ElMessageBox.confirm('Are you sure you want to Delete Shipping Address?', 'Deleted Shipping Address', {
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
                                        title: `Successfully Deleted Address`,
                                        message: delShipAddr.data?.message ? delShipAddr.data?.message : '',
                                        showClose: false
                                    });
                                    window.location.reload();
                                }
                            })
                            .catch((error) => {
                                if (error) {
                                    console.log(error)
                                    ElNotification.error({
                                        title: 'Error Deleted Shipping Address',
                                        message: error.response.data.error.message ?? 'Unsuccessfully for deleted address',
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
        allAddresses(state) {
            return state.addresses;
        },
        getSelectedAddress(state) {
            return state.selectedAddress;
        },
        shippingMethod(state) {
            return state.shippingMethod;
        },
        shippingMethods(state) {
            return state.shippingMethods;
        },
        shippingTrackDeliveryMethod(state) {
            return state.deliveryTrackingMethod;
        },
    },
};
