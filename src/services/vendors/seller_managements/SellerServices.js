import http from "../../../../http-common";
import { ElMessage } from 'element-plus';
import httpJsonRequest from "../../../../http-json-request";
export default class SellerServices {
   async getListSellerAcc(data){
        return await http.get("/vendors/seller_management/seller/list", data)
<<<<<<< HEAD
            .then((result) => {      
=======
            .then((result) => {    
                console.log(result)
>>>>>>> main
                if(result.status == '201'){
                    if(result.data.success == true){
                      return result.data.result.resultStatus;
                    }   
                }
            })
            .catch((error) => {
                ElMessage.error({ message: error, grouping: true});
            });
    }
    //Create
   async createSellerAcc(data){
        return http.post("/vendors/seller_management/seller/create", data);
    }
    //Edited
    async editedSellerAccByID(userId){
     return http.get(`/vendors/seller_management/seller/edit-seller/${userId}`);
<<<<<<< HEAD
    }
    //Updated
   async updateSellerAccID(data, userId){
        return http.put(`/vendors/seller_management/seller/updated/${userId}`, data);
   }
   //Delete
   async deleteSellerAccByID(data,userId){
       return http.delete(`/vendors/shop_management/shop/delete/${userId}`, data);
   }
   async verifySellerAccByID(data,userId){
       return httpJsonRequest.put(`/vendors/seller_management/verify-account/seller-verify/${userId}`, data);
   }
   async verifyShopBySellerID(data,userId){
       return httpJsonRequest.put(`/vendors/seller_management/public-shop/shop-verify/${userId}`, data);
   }
=======
    }
    //Updated
   async updateSellerAccID(data, userId){
        return http.put(`/vendors/seller_management/seller/updated/${userId}`, data);
   }
   //Delete
   async deleteSellerAccByID(data,userId){
       return http.delete(`/vendors/shop_management/shop/delete/${userId}`, data);
   }
   async verifySellerAccByID(data,userId){
       return httpJsonRequest.put(`/vendors/seller_management/verify-account/seller-verify/${userId}`, data);
   }
   async verifyShopBySellerID(data,userId){
       return httpJsonRequest.put(`/vendors/seller_management/public-shop/shop-verify/${userId}`, data);
   }
    async verifyShopEnableBySellerID(data, userId) {
          return httpJsonRequest.put(`/vendors/seller_management/verify-shop-enable/shop-verify/${userId}`, data);
    }
>>>>>>> main
   async banAccSellerByID(data,userId){
       return httpJsonRequest.put(`/vendors/seller_management/account-seller-ban/status-seller-ban-acc/${userId}`, data);
   }
}

