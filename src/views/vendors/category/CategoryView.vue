<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
<<<<<<< HEAD
    <div class="container">
        <div class="form-group my-3 card">
            <input
                type="text"
                class="form-control"
                v-model="search"
                placeholder="Search..."
            />
        </div>
        <table class="table table-bordered hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Country</th>
             
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in filteredUsers" :key="user.email">
                    <td>{{ user.name.first }}</td>
                    <td>{{ user.name.last }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.gender }}</td>
                   
                    <td>{{ user.location.country }}</td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a
                        class="page-link"
                        href="#"
                        @click.prevent="goToPage(currentPage - 1)"
                        >Previous</a
                    >
                </li>
                <li
                    class="page-item"
                    v-for="page in pages"
                    :key="page"
                    :class="{ active: page === currentPage }"
                >
                    <a
                        class="page-link"
                        href="#"
                        @click.prevent="goToPage(page)"
                        >{{ page }}</a
                    >
                </li>
                <li
                    class="page-item"
                    :class="{ disabled: currentPage === pages.length }"
                >
                    <a
                        class="page-link"
                        href="#"
                        @click.prevent="goToPage(currentPage + 1)"
                        >Next</a
                    >
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "UserList",
    data() {
        return {
            users: [],
            search: "",
            currentPage: 1,
            perPage: 10,
        };
    },
    computed: {
        filteredUsers() {
            return this.users
                .filter((user) =>
                    `${user.name.first} ${user.name.last}`
                        .toLowerCase()
                        .includes(this.search.toLowerCase())
                )
                .slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage
                );
        },
        pages() {
            return Array.from(
                Array(Math.ceil(this.users.length / this.perPage)),
                (_, index) => index + 1
            );
        },
    },
    created() {
        axios
            .get("https://randomuser.me/api?results=100&page=1")
            .then((response) => {
                this.users = response.data.results;
            })
            .catch((error) => {
                console.error(error);
            });
    },
    methods: {
        goToPage(page) {
            this.currentPage = page;
        },
    },
};
</script>
=======
    <div class="layout-content">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
                <h2 class="relative text-black text-3xl section section-title:before">Category</h2>
                <el-button type="info" size="large" class="py-4" @click.prevent="$router.push('/vendor/products/category/create')">
                    <div class="flex justify-between pl-2">
                        <i class="pi pi-plus" style="font-size: 1rem"></i>
                        <span class="pl-2">Create</span>
                    </div>
                </el-button>
        </div>
        <div class="gird">
            <div class="col-12">
              <el-card slot="header" class="box-card py-2 px-2">
                    <!-- Product List -->
                    <div class="text item">
                        <DataTable 
                        :paginator="true"
                        :value="proCategory"
                        class="p-datatable-gridlines"
                        :rows="10"
                        dataKey="id"
                        :rowHover="true"
                        contextMenu
                        v-model:filters="filtersData"
                        filterDisplay="menu"
                        :loading="loading"
                        :filters="filtersData"
                        responsiveLayout="scroll"
                        :globalFilterFields="['representative.name', 'CatNameEn']"
                        v-model:selection="selectedProduct" 
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                        :rowsPerPageOptions="[5, 10, 25]"           
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"              
                        >   
                        <!-- Data Table Header -->
                        <template #header>
                            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                <h4 class="m-0">Manage Category</h4>
                                <!-- Search Products -->
                                <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filtersData['global'].value" class="p-inputtext  p-component w-full text-xl" placeholder="Keyword Search" />
                                </span>
                            </div>
                        </template>
                        <!-- Empty Products -->
                        <template #empty> No products found. </template>
                        <!-- Loading Products -->
                        <template #loading> Loading products data. Please wait. </template>
                        <!--------------Columns----------->
                        <div v-if="proCategory && proCategory.length > 0 && proCategory != ''">
                                <Column field="id" header="#" sortable>
                                    <template #body="{ data }">
                                        {{ data.id }}
                                    </template>
                                </Column>
                                <Column field="CatNameImg" header="Category Image" sortable style="min-width: 12rem" >
                                    <template #body="{ data }">
                                        <div class="flex align-items-center gap-3">
                                            <img :alt="data.CatNameEn" src="https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg" style="width: 100px; align-items: center;" />
                                        </div>
                                    </template>
                                    <template #filter="{ filterModel }">
                                        <InputText type="text"  v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                                    </template>
                                </Column>
                                <Column field="CatNameEn" header="Name" sortable style="min-width: 12rem" >
                                    <template #body="{ data }">
                                        {{ data.CatNameEn }}
                                    </template>
                                    <template #filter="{ filterModel }">
                                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                                    </template>
                                </Column>
                                <Column headerStyle="width: 12rem; text-align: center; alignment-item:center;" header="Actions" bodyStyle="text-align: center; overflow: visible">
                                        <template #body="{data}">
                                            <div class="flex flex-wrap gap-2">
                                                <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click.prevent="$router.push(`/vendor/products/category/edit/${data.id}`) " />
                                                <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteCatPro()" />
                                            </div>
                                        </template> 
                                </Column>
                            </div>
                        </DataTable>
                    </div>

                   <!-- Dialog -->
                   <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                        <div class="confirmation-content">
                            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                            <span>Are you sure you want to delete</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
                            <Button label="Yes" icon="pi pi-check" text />
                        </template>
                    </Dialog>
                    
               </el-card>
            </div>
        </div>
    </div>
</template>


<!-- Data Tables -->
<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { FilterMatchMode, FilterOperator } from 'primevue/api';
    import ProductCategoriesServices from '../../../services/vendors/product_categories/ProductsCategoriesServices';

    // Product Services
    const deleteProductDialog = ref(false);
    const loading = ref(null);
    const proCategory = ref(null);
    const filtersData = ref(null);
    const proCategoryService = new ProductCategoriesServices();
    const selectedProduct = ref();
    onBeforeMount(() => {
        proCategoryService.getProCategory()
            .then((data) => {
                proCategory.value = data;
                loading.value = false;
            }    
        );
        // Filters
        initFilterData();
    });
    // Initial Filter Data
    const initFilterData = () => {
        filtersData.value = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
        }
    }
    //Confirm Delete 
    const confirmDeleteCatPro = () => {
        deleteProductDialog.value = true;
    }
</script>

>>>>>>> 54dd7cbb8fbccf8c5cb2372f4dd647c92818c828
