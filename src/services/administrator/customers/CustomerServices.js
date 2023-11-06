import {
    ElMessage
} from "element-plus";
import http from "../../../../http-common";
import authHeader from "../../authencations/AuthHeader";
import httpJson from "../../../../http-access-control-json";

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
    async getCustomerListDetailByOrder(customerID,data) {
        return await http.get(`/vendors/users_management/customer_detail/customer_order_detail/${customerID ?? ''}`, {
                headers: authHeader()
            }, data)
            .then((result) => {
                if (result.status == 201) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
                return false;
            });
    }
    // Get Customer Profile API
    /**
     * @api {get} /api/customer/get-profile Get Profile API
     * @apiGroup Store
    */
    async getProfileCurrentAuth(data) {
        return await http.get("/customers/my_account/overview/view-my-account", {
                headers: authHeader()
            }, data)
            .then((result) => {
                console.log(result)
                if (result.status == 200) {
                    if (result.data.success == true) {
                        console.log(result.data.result.resultStatus)
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
    }
    // Get Customer Customer  New
     /**
      * @apiGroup Store
    */
    async getCustomerInfoProfile(data) {
        return await http.get("/customer/get-current-customer-profile", {
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
                ElMessage.error(error);
            });
    }
    async updatedCustomerPasswordChange(passwordId) {
        return await httpJson.put("/customer/get-current-customer-profile/change-password", passwordId)
    }
    async updatedCustomerProfile(customerProfile) {
        return await httpJson.put("/customer/updated-current-customer-profile/customer-profile", customerProfile)
    }
}