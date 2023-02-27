import http from "../../../../http-common";

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
}