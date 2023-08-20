<template>
    <div class="table-responsive">
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in displayedRows" :key="index">
                    <td v-for="header in headers" :key="header">{{ row[header] }}</td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center mt-3">
                <li class="page-item mr-1" :class="{ disabled: currentPage === 1 }">
                    <button class="btn btn-primary" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</button>
                </li>
                <li class="page-item mr-1" v-for="pageNumber in pageNumbers" :key="pageNumber"
                    :class="{ active: currentPage === pageNumber }">
                    <button class="btn btn-primary" href="#" @click.prevent="goToPage(pageNumber)">{{ pageNumber }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === numPages }">
                    <button class="btn btn-primary" href="#" @click.prevent="goToPage(currentPage + 1)"> Next</button>
                </li>
            </ul>
        </nav>
    </div>
</template>
  
<script>
export default {
    name: 'DataTable',
    props: {
        headers: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        },
        itemsPerPage: {
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    computed: {
        numPages() {
            return Math.ceil(this.rows.length / this.itemsPerPage);
        },
        displayedRows() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.rows.slice(startIndex, endIndex);
        },
        pageNumbers() {
            const pagesArray = [];
            for (let i = 1; i <= this.numPages; i++) {
                pagesArray.push(i);
            }
            return pagesArray;
        },
    },
    methods: {
        goToPage(pageNumber) {
            if (pageNumber < 1 || pageNumber > this.numPages) {
                return;
            }
            this.currentPage = pageNumber;
        },
    },
}
</script>
  
<style>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>