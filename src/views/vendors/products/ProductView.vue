<template>
    <div class="container my-5">
      <h1 class="text-center mb-5">Product Listing</h1>
      <div class="form-group d-flex justify-content-center mb-5">
        <label for="category" class="mr-3">Filter by Category:</label>
        <select id="category" class="form-control" v-model="selectedCategory">
          <option value="">All</option>
          <option v-for="category in categories" :value="category" :key="category.id">{{ category }}</option>
        </select>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6" v-for="product in filteredProducts" :key="product.id
        ">
          <div class="card h-100">
            <img :src="product.image" class="card-img-top">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <p class="card-text align-self-end">Price: {{ product.price }}</p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-primary btn-block">More Info</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedCategory: '',
        products: [
          {
            name: 'Product 1',
            category: 'Category A',
            description: 'This is a description for Product 1',
            price: '$100',
            image: 'https://via.placeholder.com/300x200'
          },
          {
            name: 'Product 2',
            category: 'Category B',
            description: 'This is a description for Product 2',
            price: '$200',
            image: 'https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg'
          },
          {
            name: 'Product 3',
            category: 'Category A',
            description: 'This is a description for Product 3',
            price: '$300',
            image: 'https://via.placeholder.com/300x200'
          }
        ]
      }
    },
    computed: {
      filteredProducts() {
        return this.selectedCategory
          ? this.products.filter(product => product.category === this.selectedCategory)
          : this.products
      },
      categories() {
        return [...new Set(this.products.map(product => product.category))]
      }
    }
  }
  </script>
  
  <style>
  .card {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
   
}
.card:hover {
  transform: translateY(-10px);
  box-shadow: 2px 12px 20px rgba(0, 0, 0, 0.1);
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}

.btn-primary {
  background-color: #4285f4;
  border-color: #4285f4;
}

.btn-primary:hover {
  background-color: #1e69de;
  border-color: #1e69de;
}
button {
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  transition: all 0.2s;
}

button:hover {
  background-color: #1e69de;
}

</style>
  