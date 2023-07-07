<template>
    <li class="nav-item dropdown align-items-center">
        <el-dropdown :hide-on-click="false" class="international" @command="handleSetLanguage">
            <div>
                <!-- Khmer -->
                <div v-if="language==='km'">
                    <img src="../../../../assets/img/Flag/flag002.png" class="img-fluid rounded-circle" alt="user" style="height: 30px; min-width: 30px; width: 30px" />
                </div>
                <div v-if="language==='en'">
                     <img src="../../../../assets/img/Flag/flag001.png" class="img-fluid rounded-circle" alt="user" style="height: 30px; min-width: 30px; width: 30px" />
                </div>
            </div>
            <!-- Languages -->
            <template #dropdown >
                <el-dropdown-menu style="width: 200px;" class="list-group list-group-flush p-0">
                    <el-dropdown-item class="flex iq-sub-card list-group-item" :disabled="language==='km'" command="km">
                        <img src="../../../../assets/img/Flag/flag002.png" class="img-fluid rounded-circle" alt="user" style="height: 33px; min-width: 33px; width: 33px"  />
                        <span class="pl-2">ភាសាខ្មែរ</span>
                    </el-dropdown-item>
                <el-dropdown-item class="flex iq-sub-card list-group-item" :disabled="language==='en'" command="en">
                        <img src="../../../../assets/img/Flag/flag001.png" class="img-fluid rounded-circle" alt="user" style="height: 30px; min-width: 30px; width: 30px" />
                        <span class="pl-2">English</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </li>
</template>
<!-- Script of Languages i18n -->
<script>
    export default{ 
        name: 'I18n',
        return: {
            date: '',
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        methods: {
            handleSetLanguage(lang) {
                this.$i18n.locale = lang;
                this.$store.dispatch('app/setLanguage', lang);
                this.$message({
                    message: 'Switch Language Success',
                    type: 'success',
                });
            },
        }
    }
</script>