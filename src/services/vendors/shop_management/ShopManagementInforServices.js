import http from "../../../../http-common";
import httpCommon from "../../../../http-access-control";
// import authHeader from "../../authencations/AuthHeader";

export default class ShopManagementsServices {
    // Get 
    async getShops(data){
        return await http.get("/vendors/shop_management/shop/list", data)
            .then((result) => {
                if(result.data.status == true){
                    return result.data.data;
                }
            })
            .catch((error) => {
               return Promise.reject(error);
            });
    }
   //Create
   async createShop(data){
        return http.post("/vendors/shop_management/shop/create", data);
    }
    //Edited
    async editedShopByID(shopId){
     return http.get(`/vendors/shop_management/shop/edit/${shopId}`);
    }
    //Updated
   async updateShopID(data, shopId){
        return http.put(`/vendors/shop_management/shop/update/${shopId}`, data);
   }
   //Delete
   async deleteShopByID(data,shopId){
       return http.delete(`/vendors/shop_management/shop/delete/${shopId}`, data);
   }
    //My Shops
    async myShopByID(data) {
        return httpCommon.get(`/vendor/shop_management/my_shop_detail/vendor_shop`, data)
        .then((result) => {
            if (result.data.success == true) {
                return result.data.result.resultStatus;
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    }
    // Updated Shop Information
    async updatedShopInformation(shopInfo) {
       await httpCommon.put('/vendor/shop_management/my_shop_detail/vendor_shop/updated_shop_info/my_shop', shopInfo);
    }
}