<template>
    <div class="card card-default m-2">
      <div class="mb-3 ">
        <input type="text" v-model="search" class="form-control" placeholder="Search..." />
      </div>
  
      <table class="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
            <th>Column 6</th>
            <th>Column 7</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in paginatedData" :key="index">
            <td>{{ row.column1 }}</td>
            <td>{{ row.column2 }}</td>
            <td>{{ row.column3 }}</td>
            <td>{{ row.column4 }}</td>
            <td>{{ row.column5 }}</td>
            <td>{{ row.column6 }}</td>
            <td>{{ row.column7 }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{'disabled': currentPage == 1}">
              <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
            </li>
            <li class="page-item" v-for="(page, index) in pages" :key="index" :class="{'active': currentPage == page}">
              <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled': currentPage == pages.length}">
              <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
<script>
export default {
  data() {
    return {
      search: "",
      data: [
        { column1: "Value 1-1", column2: "Value 1-2", column3: "Value 1-3", column4: "Value 1-4", column5: "Value 1-5", column6: "Value 1-6", column7: "Value 1-7" },
        { column1: "Value 2-1", column2: "Value 2-2", column3: "Value 2-3", column4: "Value 2-4", column5: "Value 2-5", column6: "Value 2-6", column7:"test"},
        { column1: "Value 3-1", column2: "Value 3-2", column3: "Value 3-3", column4: "Value 3-4", column5: "Value 3-5", column6: "Value 3-6", column7: "Value 3-7" },
        { column1: "Value 3-1", column2: "Value 3-2", column3: "Value 3-3", column4: "Value 3-4", column5: "Value 3-5", column6: "Value 3-6", column7: "Value 3-7" },
        { column1: "Value 3-1", column2: "Value 3-2", column3: "Value 3-3", column4: "Value 3-4", column5: "Value 3-5", column6: "Value 3-6", column7: "Value 3-7" },
        { column1: "Value 3-1", column2: "Value 3-2", column3: "Value 3-3", column4: "Value 3-4", column5: "Value 3-5", column6: "Value 3-6", column7: "Value 3-7" },
        { column1: "Value 3-1", column2: "Value 3-2", column3: "Value 3-3", column4: "Value 3-4", column5: "Value 3-5", column6: "Value 3-6", column7: "Value 3-7" },
        { column1: "Value 3-1", column2: "Value 3-2", column3: "Value 3-3", column4: "Value 3-4", column5: "Value 3-5", column6: "Value 3-6", column7: "Value 3-7" },
        { column1: "Value 3-1", column2: "Value 3-2", column3: "Value 3-3", column4: "Value 3-4", column5: "Value 3-5", column6: "Value 3-6", column7: "Value 3-7" },
        { column1: "Value 3-1", column2: "Value 3-2", column3: "Value 3-3", column4: "Value 3-4", column5: "Value 3-5", column6: "Value 3-6", column7: "Value 3-7" },
        { column1: "Value 3-1", column2: "Value 3-2", column3: "Value 3-3", column4: "Value 3-4", column5: "Value 3-5", column6: "Value 3-6", column7: "Value 3-7" },
        // Add more rows as needed
      ],
      currentPage: 1,
      perPage: 10
    };
  },
  computed: {
    filteredData() {
      return this.data.filter(row => {
        return Object.values(row).join("").toLowerCase().includes(this.search.toLowerCase());
      });
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredData.slice(start, end);
    },
    pages() {
      return Array.from({ length: Math.ceil(this.filteredData.length / this.perPage) }, (_, i) => i + 1);
    }
  },
  methods: {
    goToPage(page) {
      this.currentPage = page;
    }
  }
};
</script>
  