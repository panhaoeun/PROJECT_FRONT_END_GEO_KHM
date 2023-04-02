import http from "../../../../http-common";
export default class ProductServices{
     // Get 
    async getDataProducts(data){
        return await http.get("/vendors/product_management/products/list", data)
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
   async createProduct(data){
        return http.post("/vendors/product_management/products/create", data);
    }
    //Edited
    async editedProByID(proId){
     return http.get(`/vendors/product_management/products/edit/${proId}`);
    }
    //Updated
   async updateProductID(data, proId){
        return http.put(`/vendors/product_management/products/update/${proId}`, data);
   }
   //Delete
   async deleteProByID(data,proId){
       return http.delete(`/vendors/product_management/products/delete/${proId}`, data);
   }
}