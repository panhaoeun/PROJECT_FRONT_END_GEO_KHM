<template>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ],
    };
  },
};
</script>
