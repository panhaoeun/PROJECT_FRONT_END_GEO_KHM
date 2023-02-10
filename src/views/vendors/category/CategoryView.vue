<template>
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
