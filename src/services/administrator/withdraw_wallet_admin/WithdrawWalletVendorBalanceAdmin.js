import http from "../../../../http-access-control-json";
// import authHeader from "../../authencations/AuthHeader";

export default class WithdrawWalletVendorBalanceAdminService {
    async createConfirmWithdrawRequestAdminToVendor(withdrawRequestId, withdraw) {
        return await http.put(`/user/seller/my_wallet/seller_withdraw_wallet/business_section/withdraw_wallet_admin/seller_withdraw_information/${parseInt(withdrawRequestId) ? parseInt(withdrawRequestId) : 0}`, withdraw);
    }
}