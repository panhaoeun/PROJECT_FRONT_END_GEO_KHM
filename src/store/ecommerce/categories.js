import ProductCategoriesServices from "../../services/vendors/product_categories/ProductsCategoriesServices";

export const categoriesModule = {
    namespaced: true,
    strict: true,
    state: {
        categoryList: [],
        subCategoryList: [],
    },
    mutations: {
        SET_CATEGORIES_LIST(state, categoriesList){
            state.categoryList = categoriesList;
        },
        SET_SUB_CATEGORIES_LIST(state, subCategoriesList){
            state.subCategoryList = subCategoriesList;
        }
    },
    actions: {
        async getCategoriesList({commit}){
            try{
                const servicesSubCateList = new ProductCategoriesServices();
                await servicesSubCateList.getProCategory().then((categoriesList) => {
                    commit('SET_CATEGORIES_LIST', categoriesList);
                  
                });                
            }catch(error){  
                console.log(error);
           }
        },
        async getSubCategoriesList({
            commit,
            subCategoriesId
        }) {
            try {
                const servicesSubCateList = new ProductCategoriesServices();
                servicesSubCateList.querySubProCategoryBySuperCatID(subCategoriesId).then((categoriesSubList) => {
                    commit('SET_SUB_CATEGORIES_LIST', categoriesSubList);
                });
            } catch (error) {
                console.log(error);
            }
        },
        async setCategoriesList({ state, dispatch}) { 
            if (state.categoryList && state.categoryList == 0) {
                    await dispatch('getCategoriesList');
            }
            return state.categoryList;
        },
        async setSubCategoriesList({state, dispatch}) {
            if (state.subCategoryList && state.subCategoryList.length == 0) {
                await dispatch('getSubCategoriesList');
            }
            return state.subCategoryList;
        },
        async getCategoriesName({state, dispatch}, categoryId){
            const categoryList = await dispatch('getCategoriesList');
            console.log(state, categoryList, categoryId)
            // return state
        },
        async getSubCategoriesName({state, dispatch}, subCategoriesId){
            const categoryList = await dispatch('getSubCategoriesList', subCategoriesId);
            // const indexSubCat = categoryList;
             console.log(categoryList, state);
        }
    }
}