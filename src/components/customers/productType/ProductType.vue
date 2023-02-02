<template>
   
<div class="surface-section px-2 py-5 md:px-4 lg:px-4">
    <div class="flex align-items-start flex-column lg:justify-content-between lg:flex-row ">
        <div>
            <div class="font-medium text-3xl text-900 font-semibold">Choice Category</div>
            <div class="flex align-items-center text-700 flex-wrap">
                <div class="mr-5 white-space-normal flex align-items-center mt-3" v-for="(proCate, i) in producttype" :key="i">
                    <router-link :to="{path: proCate.url}">
                        <div class="text-center px-2 py-2 white-space-norma hover:underline">
                           <div>
                                <div  v-ripple class="flex align-items-center no-underline hover:underline justify-content-center border-circle"  style="width:5rem;height:5em;background-color: #F9F9F9;">
                                    <img  alt="logo"  :src="require(`../../../assets/logo/producttype/${proCate.image}`)" class="w-4"/>
                                </div> 
                                <div class="text-wrap text-900 pt-3 text-lg text-center hover:outline" style="width: 5rem;">
                                        {{ proCate.title }}
                                </div>
                           </div>
                        </div>    
                        
                    </router-link>
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