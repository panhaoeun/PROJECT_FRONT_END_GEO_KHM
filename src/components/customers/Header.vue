<template>
    <nav class="ml-sm-5 navbar navbar-expand-lg navbar-light bg-light" id="app">
        <a class="navbar-brand ml-sm-5" href="#">E-commerce</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div
            class="collapse navbar-collapse ml-sm-5 mb-2"
            id="navbarSupportedContent"
        >
            <div class="w-100 d-flex flex-column">
                <div>
                    <form class="form-inline my-2 my-lg-0 w-100">
                        <input
                            class="form-control mr-sm-2 w-50"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            class="btn btn-outline-danger my-2 my-sm-0"
                            type="submit"
                        >
                            <i class="pi pi-search"></i>
                        </button>
                        <div>
                            <a href="#" class="ml-5">
                                <font-awesome-icon icon="fa-solid fa-shopping-cart" size="lg" />
                            </a>
                        </div>
                    </form>
                </div>

                <div class="d-sm-flex gap-2 -mt-2 d-none">
                    <a href="#" class="px-1 py-0 border-right"
                        >sunglasses for men</a
                    >
                    <a href="#" class="px-1 py-0 border-right">iphone case</a>
                    <a href="#" class="px-1 py-0 border-right"
                        >i phone 12 pro max mobile</a
                    >
                    <a href="#" class="px-1 py-0 border-right"> nails</a>
                    <a href="#" class="px-1 py-0 border-right"
                        >plush car seat cover cushion</a
                    >
                    <a href="#" class="px-1 py-0">rings</a>
                </div>
            </div>

            <!-- <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#"
                        ><i class="shopping-cart-icon pi pi-shopping-cart"></i
                    ></a>
                </li>
            </ul> -->
        </div>
    </nav>
</template>

<!-- Toggle Header -->
<script>
import TopHeader from "./headers/TopHeader.vue";
export default {
    methods: {
        toggleUserAcc(event) {
            this.$refs.op.toggleUserAcc(event);
        },
    },
    components: {
        TopHeader,
    },
    name: 'App'
};
</script>
