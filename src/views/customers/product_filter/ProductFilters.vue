<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <label>Category:</label>
        <select class="form-select" v-model="selectedCategory">
          <option value="">All</option>
          <option v-for="category in categories" :key="category">
            {{ category }}
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <label>Price:</label>
        <input
          class="form-control"
          type="number"
          v-model="maxPrice"
          placeholder="Maximum price"
        />
      </div>
      <div class="col-md-4">
        <label>Rating:</label>
        <select class="form-select" v-model="selectedRating">
          <option value="">All</option>
          <option v-for="rating in ratings" :key="rating">{{ rating }}</option>
        </select>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <input
          class="form-control"
          type="text"
          v-model="searchText"
          placeholder="Search product"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="row">
          <div
            class="col-md-3"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <div class="card mb-3">
              <img
                :src="product.image"
                class="card-img-top"
                :alt="product.name"
              />
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <p class="card-text">{{ product.price }}</p>
                <p class="card-text">{{ product.rating }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- Product filter -->
<script>
export default {
  data() {
    return {
      searchText: "",
      selectedCategory: "",
      maxPrice: null,
      selectedRating: "",
      products: [
        {
          id: 1,
          name: "Product 1",
          category: "Category 1",
          description: "Description of product 1",
          price: 10.99,
          rating: 4.5,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Product 2",
          category: "Category 2",
          description: "Description of product 2",
          price: 20.99,
          rating: 3.8,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Product 3",
          category: "Category 1",
          description: "Description of product 3",
          price: 15.99,
          rating: 4.2,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "Product 3",
          category: "Category 1",
          description: "Description of product 3",
          price: 15.99,
          rating: 2.2,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 5,
          name: "Product 3",
          category: "Category 1",
          description: "Description of product 3",
          price: 105.99,
          rating: 2.2,
          image: "https://via.placeholder.com/150",
        },
      ],
    };
  },
  computed: {
    categories() {
      const categories = new Set();
      this.products.forEach((product) => {
        categories.add(product.category);
      });
      return Array.from(categories);
    },
    ratings() {
      const ratings = new Set();
      this.products.forEach((product) => {
        ratings.add(product.rating);
      });
      return Array.from(ratings);
    },
    filteredProducts() {
      let products = this.products;

      if (this.selectedCategory) {
        products = products.filter(
          (product) => product.category === this.selectedCategory
        );
      }

      if (this.maxPrice) {
        products = products.filter((product) => product.price <= this.maxPrice);
      }

      if (this.selectedRating) {
        products = products.filter(
          (product) => product.rating === this.selectedRating
        );
      }

      if (this.searchText) {
        const searchText = this.searchText.toLowerCase();
        products = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText)
        );
      }

      return products;
    },
  },
};
</script>
