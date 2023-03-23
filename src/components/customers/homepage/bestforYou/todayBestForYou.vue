<template>
    <div class="container py-4">
          <div class="product-main">
            <!-- Title -->
            <h1 class="title">
                New Products
            </h1>
            <!-- List of Products -->
            <div class="product-grid">
                <!-- Products -->
                <div class="showcase" v-for="item in items" :key="item.id">
                    <div class="showcase-banner">
                        <img :src="item.image" alt="Mens Winter Leathers Jackets" width="300" class="product-img default">
                        <img :src="item.image" alt="Mens Winter Leathers Jackets" width="300" class="product-img hover">
                        <p class="showcase-badge">15%</p>
                        <div class="showcase-actions">
                            <button class="btn-action">
                                <ion-icon name="heart-outline"></ion-icon>
                            </button>

                            <button class="btn-action">
                                <ion-icon name="eye-outline"></ion-icon>
                            </button>

                            <button class="btn-action">
                                <ion-icon name="repeat-outline"></ion-icon>
                            </button>

                            <button class="btn-action">
                                <ion-icon name="bag-add-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                    <div class="showcase-content">

                        <a href="#" class="showcase-category">
                            {{ item.title }}
                        </a>
                        <a href="#">
                        <h3 class="showcase-title">Mens Winter Leathers Jackets</h3>
                        </a>

                        <div class="showcase-rating">
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>

                        <div class="price-box">
                        <p class="price">$48.00</p>
                        <del>$75.00</del>
                        </div>

                    </div>
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
                        image: 'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/jacket-3.jpg',
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