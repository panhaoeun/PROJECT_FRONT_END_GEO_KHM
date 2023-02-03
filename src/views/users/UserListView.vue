<template>
  <div class="card card-default">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5 class="d-inline-block align-middle mb-0">User List</h5>
        </div>
      </div>
    </div>
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <th>No</th>
          <th>Name</th>
          <th>Role</th>
          <th>Status</th>
          <th>create at</th>
          <th>update at</th>
        </thead>
        <tbody v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.role }}</td>
          <td>
            <p class="btn btn-outline-info btn-sm">{{ user.status }}</p>
          </td>
          <td>{{ user.create_at }}</td>
          <td>12-01-2023 : 10:00 pm</td>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Phone",
          role: "Admin",
          create_at: "12-01-2023 : 10:00 pm",
          status: "ative",
        },
        {
          id: 2,
          name: "Phone",
          role: "Customer",
          create_at: "12-01-2023 : 10:00 pm",
          status: "ative",
        },
        {
          id: 3,
          name: "Phone",
          role: "vendor-admin",
          create_at: "12-01-2023 : 10:00 pm",
          status: "ative",
        },
        {
          id: 4,
          name: "Phone",
          role: "seller",
          create_at: "12-01-2023 : 10:00 pm",
          status: "ative",
        },
      ],
    };
  },
};
</script>
