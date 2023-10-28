import { ElMessage } from "element-plus";
import httpJson from "../../../../http-json-request";
import http from "../../../../http-common";

export default class ProductCategoriesServices {
    //Get
    async getProCategory(data) {
        return await httpJson.get("/vendors/product_management/product_category/list", data)
             .then((result) => {
                 if (result.status == 201) {
                     if (result.data.success == true) {
                        //  console.log(result.data.result.resultStatus)
                         return result.data.result.resultStatus;
                     }
                 }
             })
            .catch((error) => {
              ElMessage.error(error);
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
        return await httpJson.get("/vendors/product_management/product_sub_category/list", data)
            .then((result) => {
                if(result.status == '201'){
                    if(result.data.success == true){
                        // console.log(result.data.result.resultStatus)
                      return result.data.result.resultStatus;
                    }   
                }
            })
            .catch((error) => {
              ElMessage.error(error);
        });
    }
    async createSubProCategory(data){
        return httpJson.post("/vendors/product_management/product_sub_category/create", data);
    }
    async editedSubProCategory(proSubCateId){
     return httpJson.get(`/vendors/product_management/product_sub_category/edit/${proSubCateId}`);
    }
    async querySubProCategoryBySuperCatID(proSubCateId){
        return httpJson.get(`/vendors/product_management/product_sub_category/query_sub_cate/${proSubCateId}`)
         .then((result) => {
                if(result.status == '201'){
                    if(result.data.success == true){
                      return result.data.result.resultStatus;
                    }   
                }
            })
            .catch((error) => {
              ElMessage.error(error);
        });
    }
    async updateSubProCategory(data, proCateId){
        return httpJson.put(`/vendors/product_management/product_sub_category/update/${proCateId}`, data);
    }
    async deleteSubProCategory(proCateId) {
       return httpJson.delete(`/vendors/product_management/product_sub_category/delete/${proCateId}`);
   }
}