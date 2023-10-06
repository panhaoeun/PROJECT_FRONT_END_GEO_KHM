import http from "../../../../http-json-request";
export default class CommonListPublicServices {
    /*@Customer Order**/
    async getCommonCategoriesSubCategories(categories) {
        return await http.get("/list/category-list", categories)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                Promise.reject(error);
            });
    }
}