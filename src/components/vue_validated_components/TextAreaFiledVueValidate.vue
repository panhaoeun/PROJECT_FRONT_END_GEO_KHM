<script setup>
import { toRef, defineProps } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
    type: {
        type: String,
        default: "text",
    },
    styleClass: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    successMessage: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
});
// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, "name");
// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {
    initialValue: props.value,
});
</script>

<template>
    <div
        class="TextInput"
        :class="{ 'has-error': !!errorMessage, success: meta.valid }"
    >
        <label :for="name">{{ label }}</label>
        <Textarea
            :name="name"
            :id="name"
            :type="type"
            :value="inputValue"
            :placeholder="placeholder"
            @input="handleChange"
            @blur="handleBlur"
            class="border-round-lg text-sm"
            :class="styleClass"
        />
        <div class="my-4">
            <small
                class="help-message mt-15"
                v-show="errorMessage || meta.valid"
            >
                {{ errorMessage || successMessage }}
            </small>
        </div>
    </div>
</template>

<style scoped>
.TextInput {
    position: relative;
    margin-bottom: calc(1em * 1.5);
    width: 100%;
}

.help-message {
    position: absolute;
    bottom: calc(-1.5 * 1em);
    left: 0;
    margin: 0;
    font-size: 12px;
    margin-bottom: -5px;
}

.TextInput.has-error input {
    background-color: var(--error-bg-color);
    color: var(--error-color);
}

.TextInput.has-error input:focus {
    border-color: var(--error-color);
}
.TextInput.has-error .help-message {
    color: var(--error-color);
}
.TextInput.success input {
    background-color: var(--success-bg-color);
    color: var(--success-color);
}
.TextInput.success input:focus {
    border-color: var(--success-color);
}
.TextInput.success .help-message {
    color: var(--success-color);
}
</style>
