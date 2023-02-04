<template>
        <div class="surface-50 px-4 py-8 md:px-6 lg:px-8" style="border-top:1px solid #e5e5e5">
        <span class="text-900 text-3xl font-medium block text-center lg:text-left">
            Now it's easier to open your shop
        </span>
        <span class="text-600 text-2xl block mt-4 text-center lg:text-left">
            With simple step by step and easy help instructions to follow
        </span>
    <div class="mt-4 mx-auto lg:mx-0 px-2 py-4" style="max-width: 38rem;">
        <div class="p-inputgroup">
            <Button type="button" class="p-button p-component p-button-danger text-0 px-5 border-none p-button-lg" label="Open Shop" :loading="loading[0]" @click="load(0)" />
        </div>
    </div>
    <div class="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left surface-border" style="border-top:1px solid #e5e5e5" role="separator" aria-orientation="horizontal"></div>
    <div class="grid grid-nogutter text-center lg:text-left">
        <div class="col-12 sm:col-6 md:col-4 lg:col-3 mt-4 flex flex-column align-items-center lg:align-items-start">
            <!-- Logo -->
            <img src="../../assets/logo/ecommerce.png" class="w-9rem mx-auto lg:mx-0" alt="Peak logo">
           
            <div class="flex align-items-center w-full mt-5 justify-content-center lg:justify-content-start">
                <a tabindex="0" class="cursor-pointer mr-3">
                    <i class="pi pi-facebook surface-900 p-1 text-sm border-circle text-0"></i>
                </a>
                <a tabindex="0" class="cursor-pointer mr-3">
                    <i class="pi pi-twitter surface-900 p-1 text-sm border-circle text-0"></i>
                </a>
                <a tabindex="0" class="cursor-pointer mr-3">
                    <i class="pi pi-youtube surface-900 p-1 text-sm border-circle text-0"></i>
                </a>
                <a tabindex="0" class="cursor-pointer">
                    <i class="pi pi-google surface-900 p-1 text-sm border-circle text-0"></i>
                </a>
            </div>
                <span class="text-600 block mt-4">
                    <i class="pi pi-phone mr-2"></i>1234 / 12 34 567
                </span>
                <a tabindex="0" class="text-600 block mt-4 cursor-pointer hover:text-900 transition-duration-150 select-none w-8rem">
                    <i class="pi pi-map-marker mr-2"></i>Contact Us
                </a>
            </div>
            <div class="col-12 sm:col-6 md:col-4 lg:col-3 mt-4 flex flex-column">
                <span class="text-900 text-xl font-medium block">Company</span>
                <ul class="list-none p-0">
                    <li>
                        <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">About Peak</a>
                    </li>
                    <li>
                        <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Factories</a>
                    </li>
                    <li>
                        <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Careers</a>
                    </li>
                    <li>
                        <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Environmental Initiatives</a>
                    </li>
                </ul>
            </div>
                <div class="col-12 sm:col-6 md:col-4 lg:col-3 mt-4 flex flex-column">
                    <span class="text-900 text-xl font-medium block">Account</span>
                    <ul class="list-none p-0">
                        <li>
                            <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Manage Account</a>
                        </li>
                        <li>
                            <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Saved Items</a>
                        </li>
                        <li>
                            <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">My Cart</a>
                        </li>
                        <li>
                            <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Wishlist</a>
                        </li>
                        <li>
                            <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Orders &amp; Returns</a>
                        </li>
                    </ul>
                </div>
                <div class="col-12 sm:col-6 md:col-4 lg:col-3 mt-4 flex flex-column">
                    <span class="text-900 text-xl font-medium block">Legal</span>
                    <ul class="list-none p-0">
                        <li>
                            <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Investor Relations</a>
                        </li>
                        <li>
                            <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Data Privacy</a>
                        </li>
                        <li>
                            <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Terms of Service</a>
                        </li>
                        <li>
                            <a tabindex="0" class="text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block">Legal Information</a>
                        </li>
                    </ul>
                   
                </div>
            </div>
            <!-- Copyright -->
            <span class="text-500 block mt-4">© 2022, Peak. Powered by PrimeBlocks.</span>
        </div>
</template>
<!-- Open Shop -->
<script>
        export default{
            data(){
                return {
                    loading: [false,  false, false]
                }
            },
            methods:{
                 // Loadin Submit
                 load(index) {
                    this.loading[index] = true;
                    setTimeout(() => this.loading[index] = false, 1000);
                 }
            }
        }
</script>