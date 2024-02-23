import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";

export default {
    name: 'GlobalOrgEmpHelper',
    created() {
        this.geoDeptOrgStrServicesPosition = new ManageOrgChartStructureGeoProjectServices();
    },
    methods: {
        submittedDialogAssignEmployee() {

        }
    },
}