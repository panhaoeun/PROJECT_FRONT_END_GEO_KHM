<template>
    <div class="surface-section px-2 py-6 md:px-2 lg:px-3">
        <div class="flex align-items-start flex-column lg:justify-content-between lg:flex-row ">
            <div>
                <div class="font-medium text-3xl text-900 font-semibold">Our Recommendation For You</div>
                <div class="flex align-items-center text-700 flex-wrap">
                    <div class="mr-5 white-space-normal flex align-items-center mt-3 cursor-pointer hover:outline">
                        <div class="p-0 mb-2 justify-content-center mt-50 mb-50">
                                <!-- Products -->
                               <div class="row">
                                    <!-- Column Products -->
                                     <div class="col-md-2 px-2 py-2 p-ripple" v-for="item in items" :key="item.id" v-ripple>
                                            <div class="flex flex-wrap border-1 border-round px-2 py-2 hover:border-blue-500 ">
                                                    <div class="px-2 py-2">
                                                        <div class="card-img-actions surface-overlay font-bold flex align-items-center justify-content-center">                
                                                                <img :src="item.image" class="card-img img-fluid" width="96" height="350" alt="">
                                                        </div>
                                                    </div>
                                                    <div class="text-left">
                                                            <div class="mb-2 px-2 py-1">
                                                                <div class="surface-overlay white-space-nowrap overflow-hidden text-overflow-ellipsis hover:underline" style="width:150px">                                      
                                                                       {{ item.title }}
                                                                </div>
                                                                <b class="font-bold text-lg">$0.76 - $0.85</b>
                                                            </div>
                                                        <div>
                                                    </div>
                                                </div>
                                            </div>
                                     </div>
                             </div>
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
                        image: 'https://s.alicdn.com/@sc04/kf/Hce2659e2fb2c418698333044efd1ac68X.jpg_250x250.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '2',
                        image: 'https://s.alicdn.com/@sc04/kf/H5f30cae43d0144689804016b04edd75cx.png_250x250.jpg',
                        title: 'Optional color best quality matte home goods ceramic cup / daily used ceramics mug for sale',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '3',
                        image: 'https://s.alicdn.com/@sc04/kf/H929b3d62099047cdba38b9636030bcc1n.jpg_250x250.jpg',
                        title: 'Customized Wholesale Simple Wind Sublimation Ceramic Coffee Mug for Dormitory Restaurant',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '4',
                        image: 'https://s.alicdn.com/@sc04/kf/H99093939953941f1be615a89aa17f4d1v.jpg_250x250.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '5',
                        image: 'https://s.alicdn.com/@sc04/kf/H69c29701216642b0b018e26f1f7bf6d0K.jpg_250x250.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '6',
                        image: 'https://s.alicdn.com/@sc04/kf/Ha508a8ea2e894f1789da89ca0dcc8c52P.png_250x250.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '7',
                        image: 'https://s.alicdn.com/@sc04/kf/Hce2659e2fb2c418698333044efd1ac68X.jpg_250x250.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '8',
                        image: 'https://s.alicdn.com/@sc04/kf/H5f30cae43d0144689804016b04edd75cx.png_250x250.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '10',
                        image: 'https://s.alicdn.com/@sc04/kf/H929b3d62099047cdba38b9636030bcc1n.jpg_250x250.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '11',
                        image: 'https://s.alicdn.com/@sc04/kf/Hdf05a9c0f9a84c7ba4a2a0d75aa6303ej.jpg_250x250.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '12',
                        image: 'https://s.alicdn.com/@sc04/kf/Hff75b543133f4469b6218c70620fcc5bs.jpg_250x250.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    },
                    {
                        id: '13',
                        image: 'https://s.alicdn.com/@sc04/kf/H9f069882d7c44be691f17e81a0e7823cR.jpg_250x250.jpg',
                        title: 'Cheap and sophisticated women in lace bikinis cover beach dresses',
                        price: ' $0.76 - $0.85'
                    }
                ]
            }
        }
    }
</script>