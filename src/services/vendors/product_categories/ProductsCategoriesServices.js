import http from "../../../../http-common";

export default class ProductCategoriesServices {
    //Get
    async getProCategory(data){
        return await http.get("/vendors/product_management/product_category/list", data)
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                console.log(error)
        });
    }
   //Create
   async createProCategory(data){
        return http.post("/vendors/product_management/product_category/create", data);
    }
    //Edited
    async editedProCategory(proCateId){
     return http.get(`/vendors/product_management/product_category/edit/${proCateId}`);
    }
    //Updated
   async updateProCategory(data, proCateId){
        return http.put(`/vendors/product_management/product_category/update/${proCateId}`, data);
   }
   //Delete
   async deleteProCategory(data,proCateId){
       return http.delete(`/vendors/product_management/product_category/delete/${proCateId}`, data);
   }
/**
 *
 * @Sub Categories 
 * List Sub Categories
 * Create Sub Categories
 * Updated Sub Categories
 * Delete Sub Categories
*/
    async getSubProCategory(data){
        return await http.get("/vendors/product_management/product_sub_category/list", data)
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                console.log(error)
        });
    }
    async createSubProCategory(data){
        return http.post("/vendors/product_management/product_sub_category/create", data);
    }
    async editedSubProCategory(proSubCateId){
     return http.get(`/vendors/product_management/product_sub_category/edit/${proSubCateId}`);
    }
    async updateSubProCategory(data, proCateId){
        return http.put(`/vendors/product_management/product_sub_category/update/${proCateId}`, data);
    }
    async deleteSubProCategory(data,proCateId){
       return http.delete(`/vendors/product_management/product_sub_category/delete/${proCateId}`, data);
   }
}