export default {
      computed: {
        getProjectId() {
            const getProjectIdDept = this.manageRootProjectId
                ? this.manageRootProjectId
                : 0;
            if (
                !getProjectIdDept ||
                (getProjectIdDept > 0 && getProjectIdDept !== null)
            ) {
                return getProjectIdDept ? getProjectIdDept : 0;
            }
            return getProjectIdDept;
        },
        getParentLevelOrgStructure() {
            const getOptSelectedOrgParentLevel = this
                .selectedOptOrgChartRootLevel
                ? this.selectedOptOrgChartRootLevel
                : 0;
            if (
                !getOptSelectedOrgParentLevel ||
                (typeof getOptSelectedOrgParentLevel !== "undefined" &&
                    getOptSelectedOrgParentLevel !== null)
            ) {
                return getOptSelectedOrgParentLevel?.orgSupDeptStrId
                    ? getOptSelectedOrgParentLevel?.orgSupDeptStrId
                    : 0;
            }
            return null;
        },
        getSecondLevelOrgStructure() {
            const getOptSelectedOrgSecondLevel = this
                .selectedOptOrgChartRootLevel
                ? this.selectedOptOrgChartRootLevel
                : 0;
            if (
                !getOptSelectedOrgSecondLevel ||
                (typeof getOptSelectedOrgSecondLevel !== "undefined" &&
                    getOptSelectedOrgSecondLevel !== null)
            ) {
                return getOptSelectedOrgSecondLevel?.orgStrMgrId
                    ? getOptSelectedOrgSecondLevel?.orgStrMgrId
                    : 0;
            }
            return null;
        },
        getThirdLevelOrgStructure() {
            const getOptSelectedOrgThirdLevel = this
                .selectedOptOrgChartSecondLevel
                ? this.selectedOptOrgChartSecondLevel
                : 0;
            if (
                !getOptSelectedOrgThirdLevel ||
                (typeof getOptSelectedOrgThirdLevel !== "undefined" &&
                    getOptSelectedOrgThirdLevel !== null)
            ) {
                return getOptSelectedOrgThirdLevel?.orgStrMgrId
                    ? getOptSelectedOrgThirdLevel?.orgStrMgrId
                        : 0;
            }
            return null;
        },
        getFourthLevelOrgStructure() {
            const getOptSelectedOrgFourthLevel = this
                .selectedOptOrgChartThirdLevel
                ? this.selectedOptOrgChartThirdLevel
                : 0;
            if (
                !getOptSelectedOrgFourthLevel ||
                (typeof getOptSelectedOrgFourthLevel !== "undefined" &&
                    getOptSelectedOrgFourthLevel !== null)
            ) {
                return getOptSelectedOrgFourthLevel?.orgStrMgrId
                    ? getOptSelectedOrgFourthLevel?.orgStrMgrId
                    : 0;
            }
            return null;
        },
        getFiveLevelOrgStructure() {
            const getOptSelectedOrgFiveLevel = this.selectedOptOrgChartFourthLevel
                ? this.selectedOptOrgChartFourthLevel
                : 0;
            if (
                !getOptSelectedOrgFiveLevel ||
                (typeof getOptSelectedOrgFiveLevel !== "undefined" &&
                    getOptSelectedOrgFiveLevel !== null)
            ) {
                return getOptSelectedOrgFiveLevel?.orgStrMgrId
                    ? getOptSelectedOrgFiveLevel?.orgStrMgrId
                    : 0;
            }
            return null;
        },
    },
    methods: {
        openReloadDeptOrgStrMgtBoardRootLevel() {
            try {
                /**
                 * @Check Clear Parent Level Selection
                 * */ 
               if (
                   !Array.isArray(this.selectedOptOrgChartRootLevel) ||
                   this.selectedOptOrgChartRootLevel !== undefined ||
                   this.selectedOptOrgChartRootLevel !== null
               ) {
                   this.selectedOptOrgChartSecondLevel = null;
               }
                const getProjectId = this.getProjectId ? this.getProjectId : 0;
                const getOrgLevelType = "SL01";
                const getOrgCountry = this.getProjectId ? this.getProjectId : 0;
                const getSuperParentLevelId = 0;
                this.fetchingDataGeoOrgChartStructure(
                    getOrgLevelType,
                    getOrgCountry,
                    getProjectId,
                    getSuperParentLevelId
                );
            } catch (error) {
                throw Error(error ? error.message : "");
            }
        },
        openDataSecondLevelSelectedParentLevel() {
           try {
                /**
                 * @Check Clear Parent Level Selection
                * */
               if (
                   !Array.isArray(this.selectedOptOrgChartSecondLevel) ||
                   this.selectedOptOrgChartSecondLevel !== undefined ||
                   this.selectedOptOrgChartSecondLevel !== null
               ) {
                   this.selectedOptOrgChartThirdLevel = null;
               }
                const getProjectId = this.getProjectId ? this.getProjectId : 0;
                const getOrgLevelType = "SL02";
                const getOrgCountry = this.getProjectId ? this.getProjectId : 0;
                const getDataSelectedParentLevel = this.getSecondLevelOrgStructure ? this.getSecondLevelOrgStructure : 0;
                this.fetchingDataGeoOrgChartStructure(
                    getOrgLevelType,
                    getOrgCountry,
                    getProjectId,
                    getDataSelectedParentLevel
                );
           } catch (error) {
             throw Error(error?.message);
           }
        },
        openDataThirdLevelSelectedSecondLevel() {
            /**
              * @Check Clear Third Level Selection
            * */
            if (
                !Array.isArray(this.selectedOptOrgChartThirdLevel) ||
                this.selectedOptOrgChartThirdLevel !== undefined ||
                this.selectedOptOrgChartThirdLevel !== null
             ) {
                this.selectedOptOrgChartFourthLevel = null;
            }
            const getProjectId = this.getProjectId ? this.getProjectId : 0;
            const getOrgLevelType = "SL03";
            const getOrgCountry = this.getProjectId ? this.getProjectId : 0;
            const getDataSelectedThirdLevel = this.getThirdLevelOrgStructure ? this.getThirdLevelOrgStructure : 0;
            this.fetchingDataGeoOrgChartStructure(
                getOrgLevelType,
                getOrgCountry,
                getProjectId,
                getDataSelectedThirdLevel
            );
        },
        openDataFourLevelSelectedThirdLevel() {
            /**
             * @Check Clear Four Level Selection
            * */
            if (
                !Array.isArray(this.selectedOptOrgChartFourthLevel) ||
                this.selectedOptOrgChartFourthLevel !== undefined ||
                this.selectedOptOrgChartFourthLevel !== null
            ) {
                this.selectedOptOrgChartFiveLevel = null;
            }
            const getProjectId = this.getProjectId ? this.getProjectId : 0;
            const getOrgLevelType = "SL04";
            const getOrgCountry = this.getProjectId ? this.getProjectId : 0;
            const getDataSelectedThirdLevel = this.getFourthLevelOrgStructure ? this.getFourthLevelOrgStructure : 0;
            this.fetchingDataGeoOrgChartStructure(
                getOrgLevelType,
                getOrgCountry,
                getProjectId,
                getDataSelectedThirdLevel
            );
        },
        openDataFiveLevelSelectedFourLevel() {
            /**
             * @Check Clear Four Level Selection
            **/
            if (
                !Array.isArray(this.selectedOptOrgChartFiveLevel) ||
                this.selectedOptOrgChartFiveLevel !== undefined ||
                this.selectedOptOrgChartFiveLevel !== null
            ) {
                this.selectedOptOrgChartFiveLevel = null;
            }
            const getProjectId = this.getProjectId ? this.getProjectId : 0;
            const getOrgLevelType = "SL05";
            const getOrgCountry = this.getProjectId ? this.getProjectId : 0;
            const getDataSelectedThirdLevel = this.getFiveLevelOrgStructure ? this.getFiveLevelOrgStructure : 0;
            this.fetchingDataGeoOrgChartStructure(
                getOrgLevelType,
                getOrgCountry,
                getProjectId,
                getDataSelectedThirdLevel
            );
        }
        /**
         * @Manage Assignment User Management
         * */
    },
}