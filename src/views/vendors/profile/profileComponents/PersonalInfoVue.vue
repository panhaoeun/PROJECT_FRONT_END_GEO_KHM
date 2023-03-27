<template>
    <div class="container">
        <div class="d-flex justify-content-between">
            <h4><strong class="text-gray">Personal Informations</strong></h4>
            <modal></modal>
        </div>
        <br />
        <div class="container bg-gray-200 p-2">
            <strong>Basices</strong>
        </div>
        <div class="row">
            <div class="col-md-4">
                <br />
                <div><strong>Name</strong></div>
                <br />
                <div><strong>Email</strong></div>
                <br />
                <div><strong>User Type</strong></div>
                <br />
                <div><strong>last password changed</strong></div>
                <br />
                <div><strong>Last Logged in</strong></div>
            </div>

            <div class="col-md-4">
                <br />
                <span>Testing Name</span><br /><br />
                <span>Testu@gmail.com</span><br /><br />
                <span>Vendor</span><br />
                <br />
                <span>12-January-2023</span><br /><br />
                <span>27-March-2023</span><br />
                <br />
            </div>
        </div>
    </div>
</template>
<script>
import Modal from "./Modal.vue";
export default {
    components: {
        Modal,
    },
};
</script>
