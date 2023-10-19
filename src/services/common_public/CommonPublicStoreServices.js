import http from "../../../http-json-request";

export default class CommonPublicStoreServices {
    async getCommonSellerCategories() {
        return http.get(`/customer/get-seller-list/by-shop-seller`).then((result) => {
            if (!result) {
                return false;
            }
            if (result.status == 200) {
                if (result.data.success == true) {
                    return result.data.result.resultStatus;
                }
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
    async getProductAllByCategoriesFilter() {
         return http.get(`/customer/get-all-product/by-product-search`).then((result) => {
             if (!result) {
                 return false;
             }
             if (result.status == 200) {
                 if (result.data.success == true) {
                     return result.data.result.resultStatus;
                 }
             }
         }).catch((error) => {
             return Promise.reject(error);
         });
    }
    async searchProductBySingleFilter() {
        return http.get(`/customer/get-all-product/by-product-search`).then((result) => {
            if (!result) {
                return false;
            }
            if (result.status == 200) {
                if (result.data.success == true) {
                    return result.data.result.resultStatus;
                }
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
    async searchProductByCategories() {
         return http.get(`/customer/search-product/filter-product-search-product-categories`).then((result) => {
             if (!result) {
                 return false;
             }
             if (result.status == 200) {
                 if (result.data.success == true) {
                     return result.data.result.resultStatus;
                 }
             }
         }).catch((error) => {
             return Promise.reject(error);
         });
    }
    async searchProductByShopCategoriesSeller(shopId, sellerPro) {
         return http.get(`/customer/search-product/filter-product-search-product-shop-seller?shopTypeId=${parseInt(shopId)}`, sellerPro).then((result) => {
            console.log(result)
             if (!result) {
                 return false;
             }
             if (result.status == 200) {
                 if (result.data.success == true) {
                     return result.data.result.resultStatus;
                 }
             }
         }).catch((error) => {
             return Promise.reject(error);
         });
    }
}