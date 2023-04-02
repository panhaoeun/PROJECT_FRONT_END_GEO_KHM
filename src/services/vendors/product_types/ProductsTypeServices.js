import http from "../../../../http-common";

export default class ProductTypes {
    // Get 
    async getProductTypes(data){
        return await http.get("/vendors/product_management/product_type/list", data)
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
   async createProType(data){
        return http.post("/vendors/product_management/product_type/create", data);
    }
    //Edited
    async editedProType(proId){
     return http.get(`/vendors/product_management/product_type/edit/${proId}`);
    }
    //Updated
   async updateProType(data, proId){
        return http.put(`/vendors/product_management/product_type/update/${proId}`, data);
   }
   //Delete
   async deleteProType(data,proId){
       return http.delete(`/vendors/product_management/product_type/delete/${proId}`, data);
   }
}