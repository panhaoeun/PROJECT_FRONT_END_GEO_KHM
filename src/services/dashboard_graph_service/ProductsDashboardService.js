import { ElMessage } from "element-plus";
import http from "../../../http-common";
import authHeader from "../authencations/AuthHeader";
export default class ProductsDashboardServices {
    /** 
        @panhaoeun @api - Dashboards Managements
        @Dashboards 
    */
    // Get 
    async getProductCountCurrentStock(data) {
        return await http.get("/vendors/product_management/product/product-count",{
            headers: authHeader()
        },data)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                ElMessage.error(error.message ?? []);
            });
    }
    async getOrdersCountCurrent(durationQuery,data) {
        return await http.get(`/vendors/product_management/dashboard/orders-counts?durations=${parseInt(durationQuery) ?? 1}`, {
               headers: authHeader()
        },data)
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
    async getDashboardTotalRevenue(durationQuery, data) {
         return await http.get(`/vendors/product_management/dashboard/product/dashboard-total-revenue?durations=${parseInt(durationQuery) ?? 1}`, {
               headers: authHeader()
         }, data)
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