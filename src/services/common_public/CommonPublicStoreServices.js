import http from "../../../http-json-request";

export default class CommonPublicStoreServices {
    // Search Product by Categories and Name
    async searchProductByCateProductName() {
        return http.get(`/common/search-filter-product-by-name-suggestion-categories-name`).then((result) => {
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
    // By Categories
    async searchProductByCategories(categoriesId, proCat) {
        return http.get(`/customer/search-product/filter-product-search-product-categories?categoriesId=${parseInt(categoriesId)}&order=desc&sortBy=product_unit_price_khr`, proCat)
         .then((result) => {
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