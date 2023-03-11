<template>
    <TopHeader />

    <nav
        class="ml-sm-5 ml-0 navbar navbar-expand-lg navbar-light bg-light"
        id="app"
    >
        <!-- <a class="d-lg-block d-none navbar-brand ml-lg-5" href="#"
            >E-commerce</a
        > -->

        <div class="flex align-items-center gap-2 ml-lg-0 ml-1">
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
            <a class="d-lg-none navbar-brand ml-lg-5" href="#">E-commerce</a>
        </div>

        <div class="d-flex d-lg-none align-items-center gap-3 mr-3">
            <i class="pi pi-user" style="font-size: 1.45rem"></i>
            <i class="pi pi-shopping-cart" style="font-size: 1.45rem"></i>
        </div>

        <p href="#" class="mr-3 ml-5 d-lg-block d-none">E-commerce</p>

        <div class="collapse navbar-collapse mb-2" id="navbarSupportedContent">
            <div class="w-100 d-flex flex-column">
                <div>
                    <form
                        class="form-inline my-2 my-lg-0 w-100 d-lg-flex d-none"
                    >
                        <input
                            class="form-control mr-sm-0 w-50 border-danger border-right-0"
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
                                <font-awesome-icon
                                    icon="fa-solid fa-shopping-cart"
                                    size="lg"
                                />
                            </a>
                        </div>
                    </form>

                    <div class="d-lg-none d-flex flex-column w-100 mt-3">
                        <div
                            class="d-flex justify-content-between align-items-center w-100"
                        >
                            <p class="h2 font-bold">Setting</p>
                            <a
                                href="
                            "
                            >
                                <i
                                    class="pi pi-angle-right mr-3"
                                    style="font-size: 1.755rem"
                                ></i>
                            </a>
                        </div>

                        <div
                            class="d-flex justify-content-between align-items-center ml-5 mt-2 mb-4"
                        >
                            <div
                                class="d-flex justify-content-start align-items-center gap-3"
                            >
                                <i
                                    class="pi pi-globe"
                                    style="font-size: 1.755rem"
                                ></i>
                                <p class="h5 mt-2">Ship to</p>
                            </div>
                            <div class="mr-5">
                                <img
                                    style="width: 3rem"
                                    src="https://media.istockphoto.com/id/1265164088/vector/cambodia-flag-vector-graphic-rectangle-cambodian-flag-illustration-cambodia-country-flag-is.jpg?s=170667a&w=0&k=20&c=Ndo9TmCKmzrabVnMVPCsGB1iYq490yTbS-rSWup1vBQ="
                                    alt=""
                                />
                            </div>
                        </div>

                        <div
                            class="d-flex align-items-center gap-3 ml-5 mt-2 mb-4"
                        >
                            <i
                                class="pi pi-dollar"
                                style="font-size: 1.755rem"
                            ></i>
                            <p class="h5 mt-2">Currency</p>
                        </div>

                        <div
                            class="d-flex align-items-center gap-3 ml-5 mt-2 mb-4"
                        >
                            <i
                                class="pi pi-flag"
                                style="font-size: 1.755rem"
                            ></i>
                            <p class="h5 mt-2">Language</p>
                        </div>

                        <div
                            class="d-flex align-items-center gap-3 ml-5 mt-2 mb-4"
                        >
                            <i
                                class="pi pi-info-circle"
                                style="font-size: 1.755rem"
                            ></i>
                            <p class="h5 mt-2">Help Center</p>
                        </div>
                    </div>
                </div>

                <div class="d-lg-flex gap-2 -mt-2 d-none">
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
        </div>
    </nav>

    <div
        class="d-lg-none d-flex w-100 justify-content-center align-items-center mb-2 -mt-1 px-3 py-3"
    >
        <div
            class="d-flex justify-content-between align-items-center w-75 px-2 py-2 cs-rounded gap-2"
        >
            <input
                type="text"
                class="w-100 cs-input ml-2"
                placeholder="Search"
            />
            <i class="pi pi-search mr-2"></i>
        </div>
    </div>
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
    name: "App",
};
</script>
