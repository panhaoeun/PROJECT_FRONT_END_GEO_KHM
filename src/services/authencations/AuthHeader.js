import { ElMessage } from "element-plus";
import { getCookie } from "../../utils/cookies";


export default function authHeader() {
  let token = getCookie('token');
  if(token){
    return { Authorization: 'Bearer ' + getCookie('token') };
  }else{
    ElMessage.error('Can not access this resource...');
    return {}
  }

}