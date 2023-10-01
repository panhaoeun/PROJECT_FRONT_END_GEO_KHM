import http from "../../../../http-access-control";
import httpFrom from "../../../../http-common";
import authHeader from "../../authencations/AuthHeader";
export default class ProductServices{
    /**
     * @Customer of Products - Start
     * */ 
    async getCustomerProductsData(proFilterPage , proSize, data) {
        const page = parseInt(proFilterPage) ?? 3;
        return await httpFrom.get(`/customers/products/product_module/customer_products_list?page=${page ?? 4}&size=${page ?? 4}`,data)
            .then((result) => {
                if (result.status == '200') {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                this.$message.error(`Oops, this is a error message: ${error?.message}`);
            });
    }
    async getCustomerProductsDetailByID(productId, data) {
        return await http.get(`/customers/products/product_module/view_product_detail/products_detail?pid=${parseInt(productId) ?? []}`, {
            headers: authHeader()
        }, data)
            .then((result) => {
                if (result.status == '200') {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                this.$message.error(`Oops, this is a error message: ${error?.message}`);
            });
    }
    /**
     * @Customer of Products - End
     * */
     // Get 
   async searchFilterProductByCate(categoryId, data) {
       return await http.get(
               `/vendors/product_management/search/product-by-categories?category=${parseInt(categoryId) ?? 1}`, {
                   headers: authHeader()
               },
               data
           )
           .then((result) => {
               if (!result) {
                   return;
               }
               if (result.status == 201) {
                   if (result.data.success == true) {
                       return result.data.result.resultStatus;
                   }
               }
           })
           .catch((error) => {
                this.$message.error(`Oops, this is a error message: ${error?.message}`);
           });
   }
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
                this.$message.error(`Oops, this is a error message: ${error?.message}`);
            });
    }
   //Create
   async createProduct(data){
        return await http.post("/vendors/product_management/products/create", data);
    }
    //Edited
    async editedProByID(proId){
     return await http.get(`/vendors/product_management/products/edit/${proId}`);
    }
    //Updated
   async updateProductID(data, proId){
        return await http.put(`/vendors/product_management/products/updated/${proId}`, data);
   }
    async productDetailByID(proId) {
        return await http.get(`/vendors/product_management/products-detail/${proId}`);
    }
   //Delete
   async deleteProByID(proId){
       return http.delete(`/vendors/product_management/products/product-image/delete/${proId}`);
   }
}