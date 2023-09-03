import {
    ElMessage
} from "element-plus";
import http from "../../../http-common";
export default class ProductsDashboardServices {
    /** 
        @panhaoeun @api - Dashboards Manage Sale
        @Dashboards 
    */
    // Get 
    async getTodayOrderAmountsAll(data) {
        return await http.get("/vendors/product_management/dashboard/order/today-order-amount", data)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error.message ?? []);
            });
    }
    async getTodayOrderCountAll(data) {
        return await http.get("/vendors/product_management/dashboard/order/today-order-count", data)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error.message ?? []);
            });
     }
}