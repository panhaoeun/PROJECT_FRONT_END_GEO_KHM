import {
    mapActions,
    mapGetters
} from "vuex";
import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";


export default {
    created() {
        this.geoDeptOrgStrServicesPosition = new ManageOrgChartStructureGeoProjectServices();
    },
    computed: {
        ...mapGetters('orgStrDeptPosGeo', ['getAllHistoryWorkDeptOrgPos']),
        getEmpHistoryWorkOfficer() {
            const getHistoryDeptWork =
                this.getAllHistoryWorkDeptOrgPos ?
                this.getAllHistoryWorkDeptOrgPos : [];
            if (getHistoryDeptWork !== null ||
                getHistoryDeptWork !==
                undefined &&
                typeof getHistoryDeptWork !== 'string'
            ) {
                return getHistoryDeptWork ? getHistoryDeptWork : []
            }
            return [];
        }
    },
    methods: {
        ...mapActions('orgStrDeptPosGeo', ['setJobHistoryOfficerEmpDeptPosition']),
        async getAllReloadJobHistoryWorkDeptPositionOrg(getJobHistoryPosData) {
            this.fetchingOrgStrDataHistoryWork = true;
            setTimeout(async () => {
                try {
                    if (!getJobHistoryPosData) {
                        throw Error('Please selected org-structure id is required');
                    }
                    if (getJobHistoryPosData !== null && !isNaN(Number(getJobHistoryPosData)) || getJobHistoryPosData !== '') {
                        let getHistoryDeptWorkId = parseInt(getJobHistoryPosData) ? parseInt(getJobHistoryPosData) : 0;
                        const optSelectedStrHistoryJobDeptWork = {
                            getHistoryDeptWorkId
                        }
                        this.setJobHistoryOfficerEmpDeptPosition(optSelectedStrHistoryJobDeptWork);
                    }
                } catch (error) {
                    throw Error(error || error.message)
                }
                this.fetchingOrgStrDataHistoryWork = false;
            }, 1000);
        },

    },


}