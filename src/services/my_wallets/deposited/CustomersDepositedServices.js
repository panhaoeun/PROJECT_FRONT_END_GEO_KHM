import {
    ElMessage
} from "element-plus";
import http from "../../../../http-access-control";
import httpJson from "../../../../http-json-request";
import authHeader from "../../authencations/AuthHeader";
export default class CustomerDepositedToWalletService {
    /** 
        @panhaoeun @api - Customer Deposited 
        @Customer Deposited => Customer Wallets
    */
    // Get 
    async getCustomerDepositedBalanceInCurrent(data) {
        return await httpJson.get("/user/transaction/my_wallet/get_current_balance_wallet",{
            headers: authHeader()
        },data)
            .then((result) => {
                console.log(result)
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
    async getHistoryTransactionCurrentByCustomer(data) {
        return await httpJson.get("/user/transaction/my_wallet/get_transaction_history_deposited_customer", {
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
    async addDepositedAmountToWalletByCustomer(data) {
        return await http.post("/user/transaction/my_wallet/deposit_found/upload_receipt_deposited", data);
    }
    
}