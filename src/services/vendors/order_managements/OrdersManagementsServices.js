import { ElMessage } from "element-plus";
import authHeader from "../../authencations/AuthHeader";
import httpCommon from "../../../../http-common";
import http from "../../../../http-json-request";
import httpAccess from "../../../../http-access-control-json";
export default class CustomerOrderMSServices {
    /**
     * @Order Managements
     * @List Order
     * @Create Order
     * @Updated Order
     * @Delete Order
     * **/
    async getViewCustomerOrder(startDate, fromDate,data) {
        return await httpCommon.get(
                `/vendor/order_management/list-orders?startDate=${startDate}6&endDate=${fromDate}`, {
                    headers: authHeader()
                },
                data
            )
            .then((result) => {  
                if (!result){
                    return;
                }
                if (result.status == "200") {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
    }
    async getViewCustomerOrderDetailByCustomerID(orderID,data) {
        return await http.get(
                `/vendor/order_management/detail-customer-orders-product-by-id/${parseInt(orderID)}`, {
                    headers: authHeader()
                },
                data
            )
            .then((result) => {
                if (!result) {
                    return;
                }
                if (result.status == "200") {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
    }
    async updatedConfirmToPaymentsOrderByVendor(confirmId, orderList) {
        return await httpAccess.put(`/vendor/order_management/vendor-confirm-to-delivery-reject-pay/${parseInt(confirmId) ? parseInt(confirmId) : 0}`, orderList);
    }
}
