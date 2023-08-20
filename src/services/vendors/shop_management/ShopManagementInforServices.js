import http from "../../../../http-common";
import authHeader from "../../authencations/AuthHeader";

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
                console.log(error)
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
        return http.get(`/vendor/shop_management/my_shop_detail/vendor_shop`, {
            headers: authHeader(),
        }, data)
        .then((result) => {
            if (result.data.success == true) {
                return result.data.result.resultStatus;
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }
}