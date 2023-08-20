import {
    ElMessage
} from "element-plus";
import http from "../../../../http-access-control";

export default class MyAccountAdminPanelInfoLogCurrent {
    //Edited
    async currentMyAccountAdmin(currentUserId) {
        return http.get(`/vendors_admin/users_management/user/user_info/user_info/edit_current_account/${currentUserId}`).then((result) => {
            if (!result){
                return false;
            }
            if (result.status == '201') {
                if (result.data.success == true) {
                    return result.data.result.resultStatus;
                }
            }
        }).catch((error) => {
            ElMessage.error(error.message);
        });
    }
    //Change User Info
    async updateCurrentMyAccountAminLog(userResult, currentUserId) {
        return http.put(`/vendors_admin/users_management/user/user_info/user_info/update_account_info/${currentUserId}`, userResult);
    }
    //Change Password
    async changeCurrentPasswordLogAdmin(changePassResult, currentUserId) {
        return http.delete(`/vendors_admin/users_management/user/user_info/user_info/update_current_new_password/${currentUserId}`, changePassResult);
    }
}