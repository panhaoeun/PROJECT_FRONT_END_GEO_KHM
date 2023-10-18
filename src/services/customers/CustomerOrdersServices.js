import http from "../../../http-access-control-json";
import httpJSON from "../../../http-access-control-json";
export default class CustomerOrderCheckOutServices {
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
                return Promise.reject(error);
            });
    }
    async createCartOrderItemCustomer(data) {
        return httpJSON.post("/customer-cart/add-cart", data);
    }
}