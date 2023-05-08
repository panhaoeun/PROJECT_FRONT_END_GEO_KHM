<template>
    <div class="container-fluid">
        <h3>Roles</h3>
        <div class="card rounded-2">
            <div>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" @click="defaultRole()" class="btn btn-primary">
                        Default Role
                    </button>

                    <button type="button" @click="customRole()" class="btn btn-warning">
                        Custom Role
                    </button>
                </div>
            </div>

            <!-- Default Role -->
            <div class="container-fluid" v-show="value1">
                <div class="d-flex justify-content-between mt-5">
                    <h5>Permissions</h5>
                    <button class="btn btn-sm btn-light text-danger">
                        <strong class="text-bold"> Restore defaults</strong>
                    </button>
                </div>
                <table class="table border-none black">
                    <tbody>
                        <tr v-for="(list, index) in lists" :key="index">
                            <td>
                                <p class="text-dark">{{ index + 1 }}</p>
                            </td>

                            <td>
                                <p class="text-black">{{ list.name }}</p>
                            </td>
                            <td>
                                <div class="form-check">
                                    <input class="form-check-input" :disabled="validated? false:true" type="checkbox" @click="checkMe()" id="{{index}}"
                                        :checked="list.check" />
                                    <label class="form-check-label" for="flexSwitchCheckChecked">
                                        <p>Yes</p>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Customer Role -->
            <div class="container-fluid" v-show="value2">
                <div class="d-flex justify-content-between mt-5">
                    <h5>Permissions</h5>
                    <p class="text-primary">You can update permissions</p>
                    <!-- <button class="btn btn-sm btn-light text-danger">
                        <strong class="text-bold"> Restore defaults</strong>
                    </button> -->
                </div>
                <table class="table border-none black">
                    <tbody>
                        <tr v-for="(list, index) in lists" :key="index">
                            <td>
                                <p class="text-dark">{{ index + 1 }}</p>
                            </td>

                            <td>
                                <p class="text-black">{{ list.name }}</p>
                            </td>
                            <td>
                                <div class="form-check">
                                    <input class="form-check-input" :disabled="validated? false:true" type="checkbox" @click="checkMe()" id="{{index}}"
                                        :checked="list.check" />
                                    <label class="form-check-label" for="flexSwitchCheckChecked">
                                        <p>Yes</p>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value1: true,
            value2: false,
            validated:false, 
            lists: [
                 // users
                 { name: "View Users", check: false },
                { name: "Add User", check: false },
                { name: "Delete User", check: false },
                { name: "Update User", check: false },
                // Products
                { name: "View Products", check: false },
                { name: "Update Products", check: true },
                { name: "Delete Product", check: false },
                { name: "Create Product", check: false },
               
                // Categories
                { name: "Update Category", check: false },
                { name: "Delete Category ", check: false },
                { name: "View Categories", check: false },
                { name: "Create Category", check: false },
                // 
                { name: "checkme", check: false },
                { name: "checkme", check: false },
                { name: "checkme", check: false },
                { name: "checkme", check: false },
                { name: "checkme", check: false },
                { name: "checkme", check: false },
                { name: "checkme", check: false },
                { name: "checkme", check: false },
            ],
        };
    },

    methods: {
        checkMe() {
            console.log("Checked");
        },
        defaultRole() {
            this.value1 = true;
            this.value2 = false;
            this.validated = false;
        },
        customRole() {
            this.value1 = false;
            this.value2 = true;
            this.validated = true;
        },
    },
};
</script>
<style scoped>
button {
    font-family: Arial, Helvetica, sans-serif;
}
</style>
