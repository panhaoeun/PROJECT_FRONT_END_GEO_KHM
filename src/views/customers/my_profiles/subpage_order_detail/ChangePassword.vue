<template>
    <div class="card">
        <h3 class="mb-4">Password Settings</h3>
        <!-- Account Settings -->
        <div class="p-fluid">
            <!-- User Profile -->
            <div class="field gird">
                <div class="row">
                        <!-- Current Password -->
                        <div class="field grid">
                            <label for="name" class="col-12 mb-2 xl:col-3 md:col-12 md:mb-0"> Current Password</label>
                            <div class="col-12 md:col-12">
                                <Password v-model="value" toggleMask>
                                    <template #header>
                                        <h6>Pick a password</h6>
                                    </template>
                                    <template #footer>
                                        <Divider />
                                        <p class="mt-2">Suggestions</p>
                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                            <li>At least one lowercase</li>
                                            <li>At least one uppercase</li>
                                            <li>At least one numeric</li>
                                            <li>Minimum 8 characters</li>
                                        </ul>
                                    </template>
                                </Password>
                            </div>
                        </div>
                        <!-- New Password -->
                        <div class="field grid">
                            <label for="name" class="col-12 mb-2 xl:col-3 md:col-12 md:mb-0">New password</label>
                            <div class="col-12 md:col-12">
                                <Password v-model="value" toggleMask>
                                    <template #header>
                                        <h6>Pick a password</h6>
                                    </template>
                                    <template #footer>
                                        <Divider />
                                        <p class="mt-2">Suggestions</p>
                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                            <li>At least one lowercase</li>
                                            <li>At least one uppercase</li>
                                            <li>At least one numeric</li>
                                            <li>Minimum 8 characters</li>
                                        </ul>
                                    </template>
                                </Password>
                            </div>
                        </div>
                        <!-- Repeat new password -->
                        <div class="field grid">
                            <label for="name" class="col-12 mb-2 xl:col-4 md:col-12 md:mb-0">Repeat new password</label>
                            <div class="col-12 md:col-12">
                                <Password v-model="value" toggleMask>
                                    <template #header>
                                        <h6>Pick a password</h6>
                                    </template>
                                    <template #footer>
                                        <Divider />
                                        <p class="mt-2">Suggestions</p>
                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                            <li>At least one lowercase</li>
                                            <li>At least one uppercase</li>
                                            <li>At least one numeric</li>
                                            <li>Minimum 8 characters</li>
                                        </ul>
                                    </template>
                                </Password>
                            </div>
                        </div>
                </div>
            </div>
            <!-- Button Submitted -->
            <div class="gap-3 py-4">
                <Button label="UPDATE" severity="danger" style="width:12rem;" size="large"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>