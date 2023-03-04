<template>
    <TopHeader />

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">E-commerce</a>
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

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                
                <li class="nav-item active">
                    <a class="nav-link" href="#"
                        ><i class="shopping-cart-icon pi pi-shopping-cart"></i></a
                    >
                </li>

                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Recommendation
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Car</a>
                        <a class="dropdown-item" href="#">Smart Phones</a>
                        <a class="dropdown-item" href="#">Watch for men</a>
                        <a class="dropdown-item" href="#">Headphones</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#"
                            >Clothes</a
                        >
                    </div>
                </li>
            
            </ul>
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
            </form>
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
};
</script>
