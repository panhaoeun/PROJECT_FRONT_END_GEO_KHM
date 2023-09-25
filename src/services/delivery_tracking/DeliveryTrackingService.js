import http from "../../../http-common";
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
}