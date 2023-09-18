import http from "../../../../http-access-control-json";
export default class CustomerOrderServices {
    // Get 
    async getCustomerOrderList(order) {
        return await http.get("/orders/customer-order/orders/order-list", order)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                Promise.reject(error);
            });
    }
    async getOrderDetailItem(customerItemId, order) {
        return await http.get(`/orders/customer-order/orders/customer-id/get-order-detail/${customerItemId}`, order)
            .then((result) => {
                if (result.status == 200) {
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