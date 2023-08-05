import {
    ElMessage
} from "element-plus";
import http from "../../../../http-common";
import authHeader from "../../authencations/AuthHeader";

export default class CustomerServicesBaseAdmin {
    //Get
    async getCustomerList(data) {
        return await http.get("/vendors/users_management/emp_dependents/admin/customer_data/list", {
            headers: authHeader()
        }, data)
            .then((result) => {
                if (result.status == 201) {
                    if (result.data.success == true) {
                        //  console.log(result.data.result.resultStatus)
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
    }
    async getCustomerListDetailByOrder(data) {
        return await http.get("/vendors/users_management/emp_dependents/admin/customer_data/list", {
                headers: authHeader()
            }, data)
            .then((result) => {
                if (result.status == 201) {
                    if (result.data.success == true) {
                        //  console.log(result.data.result.resultStatus)
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
    }
}