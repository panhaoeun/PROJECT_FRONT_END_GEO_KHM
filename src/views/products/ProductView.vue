<template>
  <div class="card card-default">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5 class="d-inline-block align-middle mb-0">Product</h5>
        </div>
        <div class="card-header-actions">
          <router-link class="btn btn-sm btn-primary" to="/product/addproduct">Create New</router-link> 
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center m-3">
      <div>
        <!-- <h5 class="d-inline-block align-middle mb-0">Product</h5> -->
      </div>
      <div class="card-header-actions">
        <div class="input-group mb-3">
          <!-- <span class="input-group-text" id="basic-addon1">search</span> -->
          <input
            type="text"
            class="form-control"
            placeholder="search"
            aria-label="search"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
    </div>
    <div class="card-body">

      <table class="table table-hover text-nowrap">
        <thead>
          <th>No</th>
          <th>Product name</th>
          <th>Type</th>
          <th>Quanity</th>
          <th>Active</th>
        </thead>
        <tbody v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.p_name }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.qty }}</td>
          <td>
            <button class="btn btn-sm btn-default mr-2">update</button
            ><button class="btn btn-sm btn-danger">delete</button>
          </td>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [
        { id: 1, p_name: "Phone", type: "Technology", qty: 12 },
        { id: 2, p_name: "Phone", type: "Technology", qty: 12 },
        { id: 3, p_name: "Phone", type: "Technology", qty: 12 },
        { id: 4, p_name: "Phone", type: "Technology", qty: 12 },
      ],
    };
  },
};
</script>
