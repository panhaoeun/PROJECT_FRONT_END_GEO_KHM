<template>
    <EmojiPicker
        :text="text"
        picker-type="input"
        @select="onSelect"
        @update:text="onChangeText"
    />
</template>
<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {
        /**
         * Handle text change
         * @param new_text
         */
        onChangeText(newText) {
            console.log(newText)
            // this.text = new_text || "";
        },
        onSelect(emoji) {
            alert(`${emoji.i} selected, check console log for emoji details.`);
            console.log(emoji);
        },
    },
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
