import { ElMessage } from "element-plus";
import authHeader from "../AuthHeader";
import http from "../../../../http-common";

export default class ManagesRolePermissionsAuth {
    /**
     * @Order Managements
     * @List Order
     * @Create Order
     * @Updated Order
     * @Delete Order
     * **/
    async getCheckPermissionAuthByRoles(userFunId, userId, userPermFunName) {
        return await http.get(
                `/authentication/protect_mal/permission/check_authorizations/${userFunId}/${userId}/${userPermFunName}`, {
                    headers: authHeader()
                }
            )
            .then((result) => {
                if (result.status == "201") {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                ElMessage.error(error);
            });
    }
}
