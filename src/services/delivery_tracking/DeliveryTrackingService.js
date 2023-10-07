import http from "../../../http-common";
import httpQuery from "../../../http-access-control-json";
export default class DeliveryTrackingServices {
    /** 
        @panhaoeun @api - Delivery Trackings
        @Dashboards 
    */
    async getListDeliveryTracking(data) {
        return await http.get("/customer_management/customer/shipping-method/delivery-tracking", data)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                return Promise.reject(error.message ?? []);
            });
    }
    // Company Delivery -> delivery to customer 
     async getVendorConfirmToDeliveryCompanyCustomer(data) {
         return await httpQuery.get("/delivery-company/vendor-confirm-assign-vendor/shipping-product", data)
             .then((result) => {
                 if (result.status == 200) {
                     if (result.data.success == true) {
                         return result.data.result.resultStatus;
                     }
                 }
             })
             .catch((error) => {
                 return Promise.reject(error.message ?? []);
             });
     }
}