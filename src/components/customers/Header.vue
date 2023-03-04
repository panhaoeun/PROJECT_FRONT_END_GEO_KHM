<template>
    <TopHeader/>
    <h1>Hello</h1>
</template>

<!-- Toggle Header -->
<script>
    import TopHeader from "./headers/TopHeader.vue";
    export default{
        methods:{
            toggleUserAcc(event){
                this.$refs.op.toggleUserAcc(event);
            }
        },
        components: {
            TopHeader
        }
    }
</script>
