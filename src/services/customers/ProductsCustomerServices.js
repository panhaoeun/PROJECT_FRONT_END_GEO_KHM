import httpCommon from "../../../http-common";
export default class ProductCustomerServices {
    // Get 
    async getCustomerProducts(data) {
        return await httpCommon.get("/customer/product-list/more-product", data)
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
    async getCustomerProductDetailByID(proID){
        return httpCommon.get(`/customer/product-list/product-by-id/${proID}`);
    }
}