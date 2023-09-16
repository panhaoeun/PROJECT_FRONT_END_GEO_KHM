import {
    ElMessage
} from "element-plus";
import http from "../../../../http-access-control-json";
// import authHeader from "@/authencations/AuthHeader";

export default class CustomerServicesBaseAdmin {
    async getTransactionDepositedWithdraw(transaction) {
        return await http.get("/user/transaction/my_wallet/admin_get_transaction/transaction_history", transaction)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error.message ? error.message : '');
                Promise.reject(error)
            });
    }
    async editTransactionHistoryDepositedWithdraw(transactionId) {
        return await http.get(`/user/transaction/my_wallet/admin_get_transaction/edit_transaction_by_confirm_admin/${parseInt(transactionId) ?parseInt(transactionId) : 1}`);
    }
    async adminConfirmTransactionDepositWithDraw(confirmTransaction) {
        return await http.put("/user/transaction/my_wallet/admin_confirm/customer_deposited", confirmTransaction);
    }
}