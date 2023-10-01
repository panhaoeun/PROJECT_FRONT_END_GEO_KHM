import http from "../../../../http-access-control";
import authHeader from "../../authencations/AuthHeader";

export default class WithdrawWalletVendorBankAccountServices {
    async getTransactionSellerWithdrawWallet(transaction) {
        return await http.get("/user/seller/my_wallet/seller_withdraw_wallet/business_section", {
                headers: authHeader()
            }, transaction)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                Promise.reject(error)
            });
    }
    async getTransactionCurrentBalanceVendorWithdrawWallets(transaction) {
        return await http.get("/user/seller/my_wallet/seller_withdraw_wallet/business_section/current_balance_account_wallet", {
                headers: authHeader()
            }, transaction)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                Promise.reject(error)
            });
    }
    async createRequestMethodWithdrawWalletVendor(data) {
        return http.post("/user/seller/my_wallet/seller_withdraw_wallet/business_section/request_withdraw_vendor", data);
    }
    async deletedRequestMethodWithdrawWalletVendor(withdrawMethodId,data) {
        return http.delete(`/user/seller/my_wallet/seller_withdraw_wallet/business_section/request_withdraw_vendor/deleted_pay_id/${parseInt(withdrawMethodId)}`, data);
    }
}