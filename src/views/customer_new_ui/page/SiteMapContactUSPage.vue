<template>
    <div class="mt-20 pb-30 pb-sm-20">
        <div class="container">
            <div class="contact-wrapper">
                <nav aria-label="breadcrumb">
                    <ol itemscope="itemscope" itemtype="https://schema.org/BreadcrumbList" class="breadcrumb">
                        <li itemprop="itemListElement" itemscope="itemscope" itemtype="https://schema.org/ListItem"><a
                                href="/" class="nuxt-link-active" itemprop="item"><span class="text-black" itemprop="name">Home</span></a>
                            <meta itemprop="position" content="1">
                        </li>
                        <li itemprop="itemListElement" itemscope="itemscope" itemtype="https://schema.org/ListItem"
                            class="breadcrumb-item"><span itemprop="name">Contact</span>
                            <meta itemprop="position" content="2">
                        </li>
                    </ol>
                </nav>
                <h1 class="page-title text-red-500">Love to hear from you</h1>
                <p class="mt-10 mb-30 mb-sm-15 f-12">Feel free to contact us. We will get back to as soon as we can.</p>
                <div class="flex">
                    <div class="contact-form">
                        <form><!---->
                            <div class="flex">
                                <div class="input-wrap"><label>Name</label> <input type="text" placeholder="Your name">
                                    <!----></div>
                                <div class="input-wrap"><label>Email</label> <input type="text" placeholder="Your email">
                                    <!----></div>
                            </div>
                            <div class="input-wrap"><label>
                                    Subject
                                </label> <input type="text" placeholder="Subject"> <!----></div>
                        <div class="input-wrap"><label>
                                Message
                            </label> <textarea placeholder="Message"></textarea> <!----></div>
                        <div class="flex j-end m-0"><button aria-label="Submit" type="Submit"
                                class="ajax-btn primary-btn plr-30 plr-sm-15"><!---->
                                Submit
                            </button></div>
                    </form>
                </div>
                <div class="contact-info pos-rel"><!---->
                    <div class="flex"><span><i class="icon phone-icon"></i></span>
                        <div>
                            <h4 class="mb-10 bold">Phone</h4>
                            <a class="font-bold text-black" href="tel:85516387467">
                                +85516387467
                            </a>
                        </div>
                    </div>
                    <div class="flex"><span><i class="icon email-icon"></i></span>
                        <div>
                            <h4 class="mb-10 bold">Email</h4>
                            <a  class="text-black" href="mailto:e-24market@gmail.com">
                                e-24market@gmail.com
                            </a>
                        </div>
                    </div>
                    <div class="flex"><span><i class="icon location-icon"></i></span>
                        <div>
                            <h4 class="mb-10 bold">Address</h4>
                            <p>Address: Sangkat Tuol Sangkae, Khan Russey Keo, Phnom Penh, Cambodia.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div></template>
<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    mounted() { },
};
</script>
<style scoped></style>
<style lang='scss' scoped></style>