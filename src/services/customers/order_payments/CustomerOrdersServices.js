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
    // Get 
    async getCartOrderListCurrentCustomer(cartItem) {
        return await http.get("/customer-cart/customer-cart-list", cartItem)
            .then((result) => {
                if (result.status == 201) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
    async createCartOrderItemCustomer(data) {
        return http.post("/customer-cart/add-cart", data);
    }
    async deletedCartOrderItemCustomer(cartId,data) {
         return http.delete(`/customer-cart/delete-cart-item?cartId=${parseInt(cartId) ? parseInt(cartId) : 0}`, data);
    }
    /**
         @Customer Order Checkout
    **/
    async createCustomerOrderCheckOut(order){
        return http.post("/orders/customer-order/customer-checkout", order);
    }
}