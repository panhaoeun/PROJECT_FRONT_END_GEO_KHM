import http from "../../../../http-common";
import authHeader from "../../authencations/AuthHeader";
import {
    ElMessage
} from 'element-plus';
export default class OrdersReportService {
    async getSaleOrderReportList(report) {
        return await http.get("/vendors/product_management/reports/order/sales-report-list",{
            headers: authHeader()
        }, report)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error({
                    message: error,
                    grouping: true
                });
            });
    }
}
