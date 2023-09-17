import http from "../../../http-access-control-json";
import httpJSON from "../../../http-access-control-json";
export default class ShippingBillingAdressServices {
    // Get 
    async getBillingOrShippingAddress(shipping) {
        return await httpJSON.get("/customers/my_account/overview/ship-address/list", shipping)
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
}