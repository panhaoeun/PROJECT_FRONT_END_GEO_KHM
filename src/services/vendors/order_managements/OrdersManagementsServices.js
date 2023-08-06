import { ElMessage } from "element-plus";
import authHeader from "../../authencations/AuthHeader";
import httpCommon from "../../../../http-common";

export default class CustomerOrderMSServices {
    /**
     * @Order Managements
     * @List Order
     * @Create Order
     * @Updated Order
     * @Delete Order
     * **/
    async getViewCustomerOrder(data) {
        return await httpCommon.get(
                "/vendors/users_management/vendor/customer_order/list_order_product", {
                    headers: authHeader()
                },
                data
            )
            .then((result) => {
                if (!result){
                    return;
                }
                if (result.status == "201") {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
    }
}
