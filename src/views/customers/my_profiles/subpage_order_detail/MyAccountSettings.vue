<template>
    <div class="card">
        <h3 class="mb-4">Account Settings</h3>
        <!-- Account Settings -->
        <div class="p-fluid">
            <!-- User Profile -->
            <div class="field gird">
            <div class="row">
                <div class="col-2 md:col-3 xl:col-2 lg:2 flex align-items-center justify-content-center">
                    <span class="text-500 text-lg">Profile Picture</span>
                </div>
                <!-- Upload Image -->
                <div class="col-6">
                    <UploadPreviewAvatar imageData="imageFile"/>
                </div>
            </div>
            </div>
            <!-- Name -->
            <div class="field grid">
                <label for="name" class="col-12 mb-2 xl:col-2 md:col-4 md:mb-0">Name</label>
                <div class="col-12 md:col-12">
                    <InputText id="name" v-model="value" />
                </div>
            </div>
            <!--Date Of birth-->
            <div class="field grid">
                <label for="name" class="col-12 mb-2 xl:col-2 md:col-4 md:mb-0">Date of Birth</label>
                <div class="col-12 md:col-12">
                    <Calendar id="name" v-model="value" showIcon showButtonBar/>
                </div>
            </div>
            <!--Gender-->
            <div class="field grid">
                <label for="name" class="col-12 mb-2 xl:col-2 md:col-4 md:mb-0">Gender</label>
                <div class="col-12 md:col-12">
                    <Dropdown v-model="selectGenderCus" :options="genderCus" optionLabel="name" placeholder="Select a Gender" class="w-full" />
                </div>
            </div>
            <!--Gender-->
            <div class="field grid">
                <label for="name" class="col-12 mb-2 xl:col-2 md:col-4 md:mb-0">Email</label>
                <div class="col-12 md:col-12">
                        <InputText id="name" v-model="value" type="email" />
                </div>
            </div>
            <!-- Button Submitted -->
            <div class="gap-3 py-4">
                <Button label="Updated" severity="danger" style="width:10rem;"/>
            </div>
        </div>
    </div>
</template>
<script>
import UploadPreviewAvatar from "../../../../components/component/UploadPreviewAvatar.vue";
export default {
    components: {
        UploadPreviewAvatar
    },
    props: {},
    data() {
        return {
            selectGenderCus: '',
            genderCus:  [
                { name: 'Male', code: 'male' },
                { name: 'Female', code: 'female' }
            ],
            imageFile: null
        };
    },
    created() {},
    methods: {
        //Get Current Uer Profile login or registers
    },
    mounted() {},
};
</script>
<!-- Styles -->
<style scoped>
</style>