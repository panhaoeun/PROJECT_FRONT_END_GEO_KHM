<template>
    <button aria-label="button" v-bind="$attrs" class="button text-white">
        {{ btnvalue }}
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "ActionButton",
    props: {
        btnvalue: String,
    },
};
</script>

<style scoped>
.button {
    border: none;
    background-color: var(--red);
    padding: 12px 50px 10px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    line-height: 2;
    color: white;
}

.button:hover {
    background-color: #083e46;
    border-color: #083e46;
}
</style>
