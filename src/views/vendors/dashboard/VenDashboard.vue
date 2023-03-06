<template>
    <div class="col-md-12">
        <div class="row">
            <!-- Overview chat -->
            <div class="col-md-8">
                <div class="row">
                   
                        <div class="col-md-6 text-start">
                            <h5>Market Overview</h5>
                            <p>Lorem ipsum dolor sit amet consectetur?</p>
                            <br />
                            <h3>$4444.23333.00 USD</h3>
                        </div>
                        <div class="col-md-6 text-end">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    This Month
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#">This Month</a>
                                    <a class="dropdown-item" href="#">Last Month</a>
                                    <a class="dropdown-item" href="#">Next Month</a>
                                </div>
                            </div>
                        </div>
                    
                    
                </div>

                <ChatView />

                <div class="row">
                    <!-- Top Selling  store-->
                    <div class="col-md-6">
                        <div class="card shadow-sm p-0 mb-2">
                            <div class="card-body">
                                <h4>Top Selling Store</h4>
                                <ul class="list-group list-group-flush">
                                    <li v-for="(store, index) in stores" :key="index" class="list-group-item">
                                        <div class="row align-items-center">
                                            <div class="col-2">
                                                <img class="border-round" :src="store.img" width="35" height="40" alt=""
                                                    srcset="" />
                                            </div>
                                            <div class="col-6">
                                                {{ store.name }}
                                            </div>
                                            <div class="col-4 text-end">
                                                ${{ store.sales }}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- top Selling products -->
                    <div class="col-md-6">
                        <div class="card shadow-sm p-0 mb-2">
                            <div class="card-body">
                                <h4>Top Selling Products</h4>
                                <ul class="list-group list-group-flush">
                                    <li v-for="(product, index) in products" :key="index" class="list-group-item">
                                        <div class="row align-items-center">
                                            <div class="col-2">
                                                <img class="border-round" :src="product.img" width="35" height="40" r alt=""
                                                    srcset="" />
                                            </div>
                                            <div class="col-6">
                                                {{ product.name }}
                                            </div>
                                            <div class="col-4 text-end">
                                                sold:{{ product.sales }}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Grapp -->

            <!-- Top Ratting -->
            <div class="col-md-4">
                <div class="card shadow-sm p-0">
                   <CircularPercentIndicatorVue/>
                </div>
                <!-- Top Customers -->
                <div class="col-md-12">
                    <div class="card shadow-sm p-0 mb-2">
                        <div class="card-body">
                            <h4>Top Customer</h4>
                            <ul class="list-group list-group-flush">
                                <li v-for="(topCustomer, index) in topCustomers" :key="index" class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-2">
                                            <img class="border-round" :src="topCustomer.img" width="35" height="40" alt=""
                                                srcset="" />
                                        </div>
                                        <div class="col-6">
                                            {{ topCustomer.name }}
                                        </div>
                                        <div class="col-4 text-end">
                                            ${{ topCustomer.sales }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Most Popular store -->
                <div class="col-md-12">
                    <div class="card shadow-sm p-0 mb-2">
                        <div class="card-body">
                            <h4>Most Popular Stores</h4>
                            <ul class="list-group list-group-flush">
                                <li v-for="(store, index) in stores" :key="index" class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-2">
                                            <img class="border-round" :src="store.img" width="35" height="40" alt=""
                                                srcset="" />
                                        </div>
                                        <div class="col-6">
                                            {{ store.name }}
                                        </div>
                                        <div class="col-4 text-end">
                                            ${{ store.sales }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChatView from "./component/ChartView.vue";
import CircularPercentIndicatorVue from './component/CircularPercentIndicator.vue';
export default {
    components: {
        ChatView,
        CircularPercentIndicatorVue
    },
    data() {
        return {
            products: [
                {
                    name: "Product 1",
                    sales: 1042,
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5sz5w1-i8uhQlEmyKwCmtCXrAK1FptpETaQ&usqp=CAU",
                },
                {
                    name: "Product 2",
                    sales: 953,
                    img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/images/products/sliding_image/19908b.jpg?ts=1590758089",
                },
                {
                    name: "Product 3",
                    sales: 803,
                    img: "https://orangebook.tetrapak.com/sites/orange/files/styles/chapter_backdrop/public/chapter/backdrop/istock-172463274.jpg?itok=goi7Y5IK",
                },
                {
                    name: "Product 4",
                    sales: 753,
                    img: "https://i.insider.com/5ed95c393f7370198527eea3?width=700",
                },
                {
                    name: "Product 5",
                    sales: 713,
                    img: "https://www.minutemaid.com/content/dam/nagbrands/us/minutemaidus/en/products/mm-orange-juice-product-page.png",
                },
            ],
            stores: [
                {
                    name: "Store1 1",
                    sales: 10032,
                    img: "https://www.southernliving.com/thmb/dvvxHbEnU5yOTSV1WKrvvyY7clY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1205217071-2000-2a26022fe10b4ec8923b109197ea5a69.jpg",
                },
                {
                    name: "MEMEMD  2",
                    sales: 95322,
                    img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/images/products/sliding_image/19908b.jpg?ts=1590758089",
                },
                { name: "DAF RSD f 3", sales: 80322, img: "" },
                {
                    name: "SRESDF SD FARSFSA 4",
                    sales: 75,
                    img: "https://i.insider.com/5ed95c393f7370198527eea3?width=700",
                },
                {
                    name: "Product 5",
                    sales: 70,
                    img: "https://www.minutemaid.com/content/dam/nagbrands/us/minutemaidus/en/products/mm-orange-juice-product-page.png",
                },
            ],

            topCustomers: [
                {
                    name: "Customer1",
                    sales: 102,
                    img: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
                },
                {
                    name: "Customer2",
                    sales: 105,
                    img: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
                },
                {
                    name: "Customer3",
                    sales: 145,
                    img: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
                },
                {
                    name: "Customer3",
                    sales: 145,
                    img: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
                },
                {
                    name: "Customer3",
                    sales: 145,
                    img: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
                },
                {
                    name: "Customer3",
                    sales: 145,
                    img: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
                },
            ],
        };
    },
};
</script>

<style>
.card-header {
    background-size: cover;
    background-position: center;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon {
    background-color: #fff;
    border-radius: 20%;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
