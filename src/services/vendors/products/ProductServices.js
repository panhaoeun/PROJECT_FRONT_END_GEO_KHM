import http from "../../../../http-access-control";
import httpFrom from "../../../../http-common";
import httpJson from "../../../../http-access-control-json";
// import authHeader from "../../authencations/AuthHeader";
export default class ProductServices{
    /**
     * @Customer of Products - Start
    * */ 
    async getCustomerProductsData(proFilterPage , proSize, data) {
        const page = parseInt(proFilterPage) ?? 3;
        return await httpFrom.get(`/customers/products/product_module/customer_products_list?page=${page ?? 10}&size=${proSize ?? 10}`, data)
            .then((result) => {
                if (result.status == '200') {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
               return Promise.reject(error);
            });
    }
    async getCustomerProductsDetailByID(productId, data) {
        return await http.get(`/customers/products/product_module/view_product_detail/products_detail?pid=${parseInt(productId) ?? []}`,data)
            .then((result) => {
                if (result.status == '200') {
                    if (result.data.success == true) {
                        return result.data.result?.resultStatus;
                    }
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
    /**
     * @Customer of Products - End
     * */
     // Get 
   async searchFilterProductByCate(categoryId, data) {
       return await http.get(
            `/vendors/product_management/search/product-by-categories?category=${parseInt(categoryId) ?? 1}`, data)
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
               return Promise.reject(error);
           });
   }
   //Product List
    async getDataProducts(data){
        return await httpJson.get("/vendors/product_management/products/list", data)
            .then((result) => {
               if(result.status == 201){
                    if(result.data.success == true){
                      return result.data.result.resultStatus;
                    }   
                }
            })
            .catch((error) => {
               return Promise.reject(error);
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
    /**
     * @Product of Vendor And Customer Request - Start
    * */
    async getProductMessageByAdminAndVendorRejectProducts() {
        return http.get(`/get-product-reject-problem-message-feedback-product-module`)
            .then((result) => {
                if (result.status == '201') {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
     }
    async editedVendorDetailProducts(proId) {
        return http.get(`/product-vendor-confirm-reject-product/detail-product-problem/${proId}`);
    }
    async updatedRejectProduct(data,proId) {
        return httpJson.put(`/product-admin-reject-product-issue/product-problem/${proId}`, data);
    }
    async viewDetailContentMessageAdminVendor(proId) {
        return httpJson.get(`/product-vendor-confirm-reject-product/detail-product-problem/${proId}`)
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
                return Promise.reject(error);
        });
    }
    async updatedDetailContentMessageAdminVendor(data, proId) {
        return httpJson.put(`/product-vendor-confirm-reject-product/product-no-have-problem/${proId}`, data);
    }
}