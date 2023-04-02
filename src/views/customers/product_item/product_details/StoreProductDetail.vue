<template>
    <div class="container">
       <div class="row">
            <div class="product-extend-sidebar col-lg-12 col-md-12 col-sm-12">
                <!-- Top Seller Products -->
                <div class="card">
                    <div class="single category">
                        <h3 class="side-title">Top Selling</h3>
                        <MazCarousel>
                            <template #title></template>
                                <MazCard
                                        v-for="(item, i) in Array(8)"
                                        :key="i"
                                        :images="[
                                            'https://ae01.alicdn.com/kf/S0b1cabc0b92a4cbfae377ce9db93ecbdJ/Y50-Bluetooth-Earphone-Outdoor-Sports-Wireless-Headset-5-0-With-Charging-Bin-Power-Display-Touch-Control.jpg_480x480q90.jpg'
                                        ]"
                                        style="min-width: 170px;"
                                        >
                                    <template #title>
                                    <!-- Tittle -->
                                    <p class="maz-m-0 text-dark cursor-pointer hover:outline">
                                        LG OLED Evo C2 Series 48" 4K UHD Smart TV - 2022 Model
                                    </p>
                                </template>
                                    <template #content>
                                        <p class="maz-text-muted" style="margin-bottom: 0;">
                                            <span>US $946.99</span>
                                        </p>
                                    </template>
                                </MazCard>
                        </MazCarousel>
                    </div>
                </div>
                <!-- About Items and Vendors -->
                <div class="card">
                    <div class="single category">                        
                        <TabView :activeIndex="activeIndex">
                            <!-- About Items -->
                            <TabPanel header="About this items">
                                <div class="px-2 py-2">
                                    <div class="content">
                                        <p>Seller assumes all responsibility for this listing.</p>
                                        <span>Last updated on Feb 17, 2023 06:08:33 PST</span>
                                        <!-- Border -->
                                        <div class="border grid mt-2">
                                            <div class="col-12 md:col-3">
                                                <span class="text-900 block font-bold mb-3 font-bold">Item specifics</span>
                                                    <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                                        <li class="mb-2">Protection Plan:</li>
                                                        <li class="mb-2">Europe - EUR 10</li>
                                                        <li class="mb-2">Switzerland - CHF 10</li>
                                                        <li class="mb-2">Canada - CAD 25</li>
                                                        <li class="mb-2">USA - USD 20</li>
                                                        <li class="mb-2">Australia - AUD 30</li>
                                                        <li class="mb-2">United Kingdom - GBP 10</li>
                                                    </ul>
                                            </div>
                                            <div class="col-12 md:col-3">
                                                <span class="text-900 block font-bold mb-3 font-bold"></span>
                                                    <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                                        <li class="mb-2">certified - Refurbished: The item is in pristine...</li>
                                                        <li class="mb-2">No Coverage</li>
                                                        <li class="mb-2">Switzerland - CHF 10</li>
                                                        <li class="mb-2">Canada - CAD 25</li>
                                                        <li class="mb-2">	Pet Hair Removal, Battery Operated, Portable, Multi Surface, Carpet Cleaning, Edge Cleaning, Self Propelled, Compact, Dirt Sensor</li>
                                                    </ul>
                                            </div>
                                        </div>
                                        <!-- Product Image Detail of Vendors -->
                                       <div class="my-2">
                                            <div class="col-12 md:col-12 my-2">
                                                <img src="https://ae01.alicdn.com/kf/Ha0bf417fa7db47e3a690dfedad3c40b37.jpg" alt="" style="max-width: 100%;">
                                                <p><img src="https://ae01.alicdn.com/kf/Hfbb54ada53cc4b9089ee9aaaa2e547f8D.jpg" slate-data-type="image" style="max-width: 100%;"></p>
                                            </div>
                                       </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <!-- Customer Review -->
                            <TabPanel header="Customer Reviews(2540)">
                                    <!-- Customer Rating -->
                                    <div class="grid mt-2 px-2 py-2">
                                        <div class="p-tabview-panel" role="tabpanel" aria-labelledby="pv_id_55_1_header_action" style=""><div class="text-900 font-bold text-3xl mb-4 mt-2">Customer Reviews</div><ul class="list-none p-0 m-0"><li class="pb-5 border-bottom-1 surface-border"><span><i class="pi pi-star-fill text-yellow-500 mr-1"></i><i class="pi pi-star-fill text-yellow-500 mr-1"></i><i class="pi pi-star-fill text-yellow-500 mr-1"></i><i class="pi pi-star-fill text-yellow-500 mr-1"></i><i class="pi pi-star-fill text-gray-500"></i></span><div class="text-900 font-bold text-xl my-3">Absolute Perfection!</div><p class="mx-0 mt-0 mb-3 text-600 line-height-3"> Blandit libero volutpat sed cras ornare arcu dui vivamus. Arcu dictum varius duis at consectetur lorem donec massa. Imperdiet proin fermentum leo vel orci porta non. Porttitor rhoncus dolor purus non. </p><span class="font-medium">Darlene Robertson, 2 days ago</span></li><li class="py-5 border-bottom-1 surface-border"><span><i class="pi pi-star-fill text-yellow-500 mr-1"></i><i class="pi pi-star-fill text-yellow-500 mr-1"></i><i class="pi pi-star-fill text-yellow-500 mr-1"></i><i class="pi pi-star-fill text-yellow-500 mr-1"></i><i class="pi pi-star-fill text-yellow-500"></i></span><div class="text-900 font-bold text-xl my-3">Classy</div><p class="mx-0 mt-0 mb-3 text-600 line-height-3">Venenatis cras sed felis eget. Proin nibh nisl condimentum id venenatis a condimentum.</p><span class="font-medium">Kristin Watson, 2 days ago</span></li></ul></div>
                                    </div>
                            </TabPanel>
                        </TabView>
                    </div>
                </div>

            </div>
       </div>
    </div>
</template>

<!-- Product Details -->
<script>
    import MazCarousel from 'maz-ui/components/MazCarousel'
    import MazCard from 'maz-ui/components/MazCard'
    export default {
        components: {
            MazCarousel,
            MazCard
        }
    }
</script>
<style>
.single h3.side-title {
    margin: 0;
    margin-bottom: 10px;
    padding: 0;
    font-size: 20px;
    color: #333;
    text-transform: uppercase; 
}
.single h3.side-title:after {
    content: '';
    width: 60px;
    height: 1px;
    background: #ff173c;
    display: block;
    margin-top: 6px; 
}

.single ul {
    margin-bottom: 0; 
}
.single li a {
    color: #666;
    font-size: 14px;
    text-transform: uppercase;
    border-bottom: 1px solid #f0f0f0;
    line-height: 40px;
    display: block;
    text-decoration: none; 
}
.single li a:hover {
    color: #ff173c; 
}
.single li:last-child a {
    border-bottom: 0; 
}
</style>