<template>
       <div class="container">
            <div class="px-2 py-2">
                <div class="font-medium text-3xl text-900 font-semibold">Best Selling Store ⚡</div>
            </div>
            <!-- Scroll Rectangle Product -->
            <vue-horizontal responsive scroll :button="true" class="horizontal">
                <div class="px-2 py-6 my-2 align-items-center cursor-pointer"  v-for="item in products" :key="item.id">
                    <div class="block border font-bold text-center p-2 border-round mb-3 text-red-700">
                        <Image imageClass="card-img-top custom-img" :src="item.image" alt="Image Text" />
                    </div>
                <div class="px-2 hover:underline">
                        <div class="font-bold hover:underline text-2xl ">{{item.price }}</div>
                        <div class="white-space-normal hover:underline" style="color: black;">
                            <div class="text-wrap text-900 text-lg  flex flex-row" style="width: 15rem;">
                                <del class="font-semibold text-700">{{ item.previousPrice }}</del>
                                <span class="mr-2 ml-2 flex-shrink-1 md:flex-shrink-0 flex font-bold align-middle" aria-hidden="true">.</span>
                                <span class="font-semibold text-700">{{ item.discount }}</span>
                            </div>
                        </div>    
                    </div>
                </div>
            </vue-horizontal>
       </div>
</template>

<!-- Scroll of  Best Selling Store-->
<script>
    import VueHorizontal from "vue-horizontal";
    export default {
        components: {
            VueHorizontal
        },
        data(){
            return{
                products:[
                    {
                        id : '1',
                        price: '$1,999.99',
                        image: 'https://i.ebayimg.com/images/g/NWgAAOSw0JNjZe8E/s-l225.webp',
                        discount: '9% OFF',
                        previousPrice: '$2,199.99',
                        title: 'Dell'
                    },
                    {
                        id : '2',
                        price: '$999.99',
                        image: 'https://i.ebayimg.com/images/g/Wl0AAOSwYxhjV-Ti/s-l225.webp',
                        discount: '9% OFF',
                        previousPrice: '$2,199.99',
                        title: 'Dell'
                    },
                    {
                        id : '3',
                        price: '$999.99',
                        image: 'https://i.ebayimg.com/images/g/3G8AAOSwNslhoSZW/s-l225.webp',
                        discount: '9% OFF',
                        previousPrice: '$2,199.99',
                        title: 'Dell'
                    },
                    {
                        id : '4',
                        price: '$999.99',
                        image: 'https://i.ebayimg.com/images/g/RPIAAOSwzFpjNyem/s-l225.webp',
                        discount: '9% OFF',
                        previousPrice: '$2,199.99',
                        title: 'Dell'
                    },
                    {
                        id : '5',
                        price: '$999.99',
                        image: 'https://i.ebayimg.com/images/g/gXsAAOSww2Zfu-Xf/s-l225.webp',
                        discount: '9% OFF',
                        previousPrice: '$2,199.99',
                        title: 'Dell'
                    },
                    {
                        id : '6',
                        price: '$999.99',
                        image: 'https://i.ebayimg.com/images/g/92IAAOSwkjhjafGa/s-l225.webp',
                        discount: '9% OFF',
                        previousPrice: '$2,199.99',
                        title: 'Dell'
                    },
                    {
                        id : '7',
                        price: '$999.99',
                        image: 'https://i.ebayimg.com/images/g/wQsAAOSwZxNjlCGV/s-l225.webp',
                        discount: '9% OFF',
                        previousPrice: '$2,199.99',
                        title: 'Dell'
                    }
                
                ]
            }
        }
    }
</script>
