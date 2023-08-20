<template>
    <div class="dropdown">
      <button class="btn btn-light  border dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li v-for="(option, index) in options" :key="index">
          <a class="dropdown-item" href="#" @click.prevent="selectOption(option)">
            {{ option }}
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  export default {
    name: 'Dropdown',
    setup() {
      const selectedOption = ref(null);
      const options = ref(['Option 1', 'Option 2', 'Option 3']);
  
      function selectOption(option) {
        selectedOption.value = option;
      }
  
      return {
        selectedOption,
        options,
        selectOption,
      };
    },
  };
  </script>