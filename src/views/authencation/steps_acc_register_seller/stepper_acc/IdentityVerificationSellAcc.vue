
<template>
    <div class="stepsdemo-content" style="margin:1rem">
        <div class="p-fluid formgrid grid">
            <!-- Title -->
            <div class="filed col-12 ">
                <div class="py-2 text-left px-2 w-full border-bottom my-2">
                    <h5>Identity Verification</h5>
                </div>
            </div>
            <!-- Automatic ID Verification trigger & rules-->
            <div class="col-6">
                <div class="px-2 py-2">
                    <h5>Automatic ID Verification</h5>
                    <span>
                        Choose a documents  
                    </span>
                </div>
            </div>
             <div class="col-6">
                <div class="card">
                    <p>asdasd</p>
                </div>
            </div>
            
            <!-- Product information's -->
        </div>
    </div>
</template>

<!-- Script -->
<script>
export default {
    props: ['currentStep'],
    data() {
        return {
            identityVerify: {
                name: ''
            }
        }
    },
    methods: {
       
    },
    mounted() { }
}
</script>