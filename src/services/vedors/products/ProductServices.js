export default class ProductServices{
    async getDataProducts(){
        return fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((data) => data.products);
    }
}