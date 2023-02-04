<template>
<<<<<<< HEAD
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
=======
  <div class="overflow-auto">
    <div class="border p-3">
      <div class="card card-default p-2">
        <div class="card-header">
          <strong>Hello product</strong>
        </div>

        <div class="card-body">
          <table class="table border table-hover">
            <thead class="bg-gray-400">
              <tr class="bg-gray">
                <th>NO</th>
                <th>Name</th>
                <th>Role</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody class="border">
              <tr v-for="data in datas" :key="data">
                <th>{{ data.no }}</th>
                <td>{{ data.name }}</td>
                <td>{{ data.description }}</td>
                <td>{{ data.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
      <div class="card card-default p-2">
        <div class="card-header">
          <strong>Hello product</strong>
        </div>

        <div class="card-body">
          <table class="table border table-hover">
            <thead class="bg-gray-400">
              <tr class="bg-gray">
                <th>NO</th>
                <th>Name</th>
                <th>Role</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody class="border">
              <tr v-for="data in datas" :key="data">
                <th>{{ data.no }}</th>
                <td>{{ data.name }}</td>
                <td>{{ data.description }}</td>
                <td>{{ data.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
>>>>>>> ad0942ec675a5821d9642fbdf0ff11ac2d6fafa8
  </div>
</template>
<script>
export default {
  data() {
    return {
<<<<<<< HEAD
      products: [
        { id: 1, p_name: "Phone", type: "Technology", qty: 12 },
        { id: 2, p_name: "Phone", type: "Technology", qty: 12 },
        { id: 3, p_name: "Phone", type: "Technology", qty: 12 },
        { id: 4, p_name: "Phone", type: "Technology", qty: 12 },
=======
      datas: [
        {
          no: 1,
          name: "senghong",
          description: "admin",
          date: "12-12-2023",
        },
        {
          no: 2,
          name: "senghong",
          description: "admin",
          date: "12-12-2023",
        },
        {
          no: 3,
          name: "senghong",
          description: "vendor",
          date: "12-12-2023",
        },
>>>>>>> ad0942ec675a5821d9642fbdf0ff11ac2d6fafa8
      ],
    };
  },
};
</script>
