import http from "../../../../http-access-control-json";
export default class CustomerOrderServices {
    /*@Customer Order**/  
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
    /*@Customer Order Checkout**/
    async createCustomerOrderCheckOut(order){
        return http.post("/customer-cart/add-cart", order);
    }
}