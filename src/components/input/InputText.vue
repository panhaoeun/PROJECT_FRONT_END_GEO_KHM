<template>
   <div class="flex flex-column gap-2">
        <label for="username">{{ label }}</label>
        <InputText :value="value" aria-describedby="username-help" />
    </div>
</template>

<!-- Script -->
<script>
    export default{
        name: 'InputText',
        props: {
            label: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        },
        computed: {
            model:{
                set(value) {
                    this.$emit('input', value);
                }
            }
        }
    }
</script>