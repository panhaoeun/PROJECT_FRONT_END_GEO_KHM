import http from "../../../../http-common";
import authHeader from "../../authencations/AuthHeader";
export default class ProductServices{
     // Get 
    async getDataProducts(data){
        return await http.get("/vendors/product_management/products/list",{
            headers: authHeader()
        },data)
            .then((result) => {
               if(result.status == '201'){
                    if(result.data.success == true){
                      return result.data.result.resultStatus;
                    }   
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
   //Create
   async createProduct(data){
        return http.post("/vendors/product_management/products/create",{
            headers: authHeader()
        },data);
    }
    //Edited
    async editedProByID(proId){
     return http.get(`/vendors/product_management/products/edit/${proId}`, {
        headers: authHeader()
     });
    }
    //Updated
   async updateProductID(data, proId){
        return http.put(`/vendors/product_management/products/update/${proId}`,{
            headers: authHeader()
        },data);
   }
   //Delete
   async deleteProByID(data,proId){
       return http.delete(`/vendors/product_management/products/delete/${proId}`,{
            headers: authHeader()
       },data);
   }
}