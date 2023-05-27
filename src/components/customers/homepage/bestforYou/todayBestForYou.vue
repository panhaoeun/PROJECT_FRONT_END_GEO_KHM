<template>
    <div class="container py-4">
          <div class="product-main">
            <!-- Title -->
            <h1 class="title">
                More to love
            </h1>
            <!-- List of Products -->
            <div class="product-grid">
                <!-- Products -->
                <div class="showcase" v-for="item in items" :key="item.id">
                   <router-link to="/" style="text-decoration: none;">
                     <div class="showcase-banner">
                            <img :src="item.image" alt="Mens Winter Leathers Jackets" width="300" class="product-img default">
                            <img :src="item.image" alt="Mens Winter Leathers Jackets" width="300" class="product-img hover">
                        </div>
                        <div class="showcase-content">
                            <!-- Sold -->
                            <div class="price-box flex-column">
                                <h6 class="price">KHR41.12</h6>
                                 <span class="showcase-category">    
                                    Extra 5% off with coins
                                </span>
                                 <h6 class="showcase-title"> {{ item.title }}</h6>
                            </div>
                        </div>
                   </router-link>
                </div>
            </div>

        </div>
    </div>
</template>
<!-- Product Best for you card group -->
<script>
    export default{
        data() {
            return {
                items:[
                    {
                        id: '1',
                        image: 'https://ae01.alicdn.com/kf/S8f2f4ce2a19a4f498e6a9413ada25592y/Short-Sleeve-Elegant-Dresses-for-Women-Geometric-Print-Ruffle-Hem-Bodycon-Skinny-Mini-Dress-New-Fashion.jpg_220x220xz.jpg_.webp',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '2',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/shirt-2.jpg',
                        title: 'Optional color best quality matte home goods ceramic cup / daily used ceramics mug for sale',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '3',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/jacket-6.jpg',
                        title: 'Customized Wholesale Simple Wind Sublimation Ceramic Coffee Mug for Dormitory Restaurant',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '4',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/clothes-4.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '5',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/shoe-2_1.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '6',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/watch-4.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '7',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/watch-1.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '8',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/jacket-2.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '10',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/sports-2.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '11',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/shoe-1.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '12',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/shorts-2.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '13',
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/perfume.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    }
                ]
            }
        }
    }
</script>