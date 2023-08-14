import http from "../../../../http-common";
import authHeader from "../../authencations/AuthHeader";
export default class ProductServices{
    /**
     * @Customer of Products - Start
     * */ 
    async getCustomerProductsData(proFilterPage , proSize, data) {
        const page = parseInt(proFilterPage) ?? 3;
        const size = parseInt(proSize) ?? 5;
        return await http.get(`/customers/products/product_module/customer_products_list?page=${page ?? 1}&size=${size ?? 1}`,data)
            .then((result) => {
                if (result.status == '201') {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
    async getCustomerProductsDetailByID(productId, data) {
        return await http.get(`/customers/products/product_module/view_product_detail/products_detail?pid=${parseInt(productId) ?? []}`, data)
            .then((result) => {
                if (result.status == '201') {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
    /**
     * @Customer of Products - End
     * */
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