
<template>
        <div class="stepsdemo-content" style="margin:1rem">
            <div class="p-fluid formgrid grid">
               <!-- Title -->
               <div class="filed col-12 ">
                    <div class="py-2 text-left px-2 w-full border-bottom my-2">
                        <h5>Store and Product Information</h5>
                        <p class="lead">Store name and product information</p>
                    </div>
               </div>
                <!-- Form Seller information's -->
                 <div class="field col-12">
                    <label for="class" class="font-bold">Store Name</label>
                    <InputText type="text" v-model="sellForm.storeName" placeholder="Enter a name for your store"/>
                </div>
                <!-- Product information's -->
            </div>
        </div>

</template>

<!-- Script -->
<script>
    export default{
        props: ['currentStep'],
        data() {
            return{
                sellForm: {
                    storeName: ''
                }
            }
        },
        methods: {
            canContinue() {
                this.$emit('can-continue', { value: true });
            }
        },
        mounted() {
            this.$emit('can-continue', { value: true })
        }
    }
</script>