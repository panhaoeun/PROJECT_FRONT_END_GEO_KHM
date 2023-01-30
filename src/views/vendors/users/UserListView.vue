<template>
  <div class="border p-4">
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between px-4">
          <strong>User List</strong
          ><button class="btn btm-sm btn-primary">add</button>
        </div>
      </div>
      <div class="overflow-auto">
        <div class="card-body ">
        <table class="table border overflow-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>status</th>
              <th>create date</th>
              <th>updated at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in datas" :key="data.id">
              <th>{{ data.id }}</th>
              <td>{{ data.Name }}</td>
              <td>{{ data.role }}</td>
              <td>{{ data.status }}</td>
              <td>{{ data.create_date }}</td>
              <td>{{ data.update_at }}</td>
              <td>
                <button class="btn btn-sm btn-danger m-2">
                  delete
                </button>
                
                <button class="btn btn-sm btn-primary m-2">
                  update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "Hewllo",

      datas: [
        {
          id: 1,
          Name: "Seng hong",
          role: "Admin",
          status: "active",
          create_date: "12-23-2023",
          update_at: "12-23-2023",
          
        },
      ],
    };
  },
};
</script>
