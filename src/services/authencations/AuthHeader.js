import { ElMessage } from "element-plus";
// import { getCookie } from "../../utils/cookies";


export default function authHeader() {
  let token = localStorage.getItem('token');
  if(token){
    return {
        Authorization: 'Bearer ' + token
    };
  }else{
    ElMessage.error('Can not access this resource...');
    return {}
  }

}