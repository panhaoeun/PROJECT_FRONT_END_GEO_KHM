<template>
    <div class="flex">
        <PageHeaderOrgChart />
        <!-- Chart-->
        <div>
            
        </div>
    </div>
</template>
<!-- Organization Chart (Manage Org.structures) -->
<script>
import PageHeaderOrgChart from "./org_str_chart_features/PageHeaderOrgChart";
export default {
    components: {
        PageHeaderOrgChart,
    },
    props: {},
    data() {
        return {
            data: {
                key: "0",
                type: "person",
                data: {
                    image: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
                    name: "Amy Elsner",
                    title: "CEO",
                },
                children: [
                    {
                        key: "0_0",
                        type: "person",
                        data: {
                            image: "https://primefaces.org/cdn/primevue/images/avatar/annafali.png",
                            name: "Anna Fali",
                            title: "CMO",
                        },
                        children: [
                            {
                                key: "0_0_0",
                                label: "Sales",
                            },
                            {
                                key: '0_0_"1',
                                label: "Marketing",
                            },
                        ],
                    },
                    {
                        key: "0_1",
                        type: "person",
                        data: {
                            image: "https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png",
                            name: "Stephen Shaw",
                            title: "CTO",
                        },
                        children: [
                            {
                                key: "0_1_0",
                                label: "Development",
                            },
                            {
                                key: "0_1_1",
                                label: "UI/UX Design",
                            },
                        ],
                    },
                    {
                        key: "0_1",
                        type: "person",
                        data: {
                            image: "https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png",
                            name: "Stephen Shaw",
                            title: "CTO",
                        },
                        children: [
                            {
                                key: "0_1_0",
                                label: "Development",
                            },
                            {
                                key: "0_1_1",
                                label: "UI/UX Design",
                            },
                        ],
                    },
                ],
            },
        };
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
