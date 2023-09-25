import http from "../../../../http-access-control-json";
export default class ShippingBillingAddressServices {
    // Get 
    async getBillingOrShippingAddress(shipping) {
        return await http.get("/customers/my_account/overview/ship-address/list", shipping)
            .then((result) => {
                if (result.status == 201) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                Promise.reject(error);
            });
    }
    async getBillingOrShippingAddressByQueriesByAddrType(addressTypeId, shipping) {
         return await http.get(`/customers/my_account/overview/ship-address/queries-by-address-type?addressTypeId=${addressTypeId}`, shipping)
             .then((result) => {
                 if (result.status == 201) {
                     if (result.data.success == true) {
                         return result.data.result.resultStatus;
                     }
                 }
             })
             .catch((error) => {
                 Promise.reject(error);
             });
     }
    async editBillingOrShippingAddress(shippingAddrId,shipping) {
        return await http.get(`/customers/my_account/overview/ship-address/edit/${shippingAddrId}`, shipping)
            .then((result) => {
                if (result.status == 201) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                Promise.reject(error);
            });
    }
    async addShippingBillingAddress(data) {
        return await http.post("/customers/my_account/overview/ship-address/create", data);
    }
    async updatedShippingBillingAddress(addressId,data) {
         return await http.put(`/customers/my_account/overview/ship-address/updated/${addressId ? addressId : 0}`, data);
    }
    async deletedShippingBillingAddress(delAddrId,data) {
        return await http.delete(`/customers/my_account/overview/ship-address/delete/${delAddrId ? delAddrId : 0}`, data);
    }
}