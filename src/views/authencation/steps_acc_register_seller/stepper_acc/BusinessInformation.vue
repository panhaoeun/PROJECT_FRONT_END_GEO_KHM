<template>
   <FormKit type="step" name="stepOne">
        <FormKit type="text" label="Name" validation="required" />
    </FormKit>
</template>

<script>
export default {
    data() {
        return {
            data: {},
          
        }
    },
    methods: {
        async register() {
            await new Promise((r) => setTimeout(r, 2000))
            console.log('Account created!')
        }
    }
}
</script>

