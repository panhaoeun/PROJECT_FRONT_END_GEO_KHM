<template>
    <div class="category">
          <div class="container">
            <div class="category-item-container has-scrollbar">
              <div class="category-item">

                <div class="category-img-box">
                  <img src="https://codewithsadee.github.io/anon-ecommerce-website/assets/images/icons/watch.svg" alt="dress & frock" width="30">
                </div>

                <div class="category-content-box">

                  <div class="category-content-flex">
                    <h3 class="category-item-title">Dress & frock</h3>

                    <p class="category-item-amount">(53)</p>
                  </div>

                  <a href="#" class="category-btn">Show all</a>

                </div>

              </div>
            </div>
          </div>
        </div>
</template>
        
<!-- Product Type -->
<script>
    export default {
        data:() => ({
            producttype: [
                {
                    id: '1',
                    image: 'manfashion.png',
                    title: 'Man Fashion',
                    url:''
                },
                {
                    id: '2',
                    image: 'img_2.png',
                    title: 'Women Fashion',
                    url:''
                },
                {
                    id: '3',
                    image: 'img_1.png',
                    title: 'Gadget Electronic',
                    url:''
                },
                {
                    id: '4',
                    image: 'img.png',
                    title: 'Voucher Game',
                    url:''
                },
                {
                    id: '5',
                    image: 'img_3.png',
                    title: 'Property',
                    url:''
                },
                {
                    id: '6',
                    image: 'img_4.png',
                    title: 'Kids Fashion',
                    url:''
                },
                {
                    id: '7',
                    image: 'img_5.png',
                    title: 'Computer & Laptop',
                    url:''
                },
                {
                    id: '8',
                    image: 'img_6.png',
                    title: 'Sports',
                    url:''
                },
                {
                    id: '9',
                    image: 'img_7.png',
                    title: 'Gaming',
                    url:''
                },
                {
                    id: '10',
                    image: 'img_8.png',
                    title: 'Gaming',
                    url:''
                },
                {
                    id: '11',
                    image: 'img_9.png',
                    title: 'View All',
                    url:''
                }
            ]
        })
    }
</script>