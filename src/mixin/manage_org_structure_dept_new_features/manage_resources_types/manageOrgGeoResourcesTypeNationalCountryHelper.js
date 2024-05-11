import {
    FilterMatchMode
} from "primevue/api";
import {
    mapActions,
    mapGetters
} from "vuex";
import ManageOrgChartStructureGeoProjectServices from "@/services/administrator/manage_org_chart_structures/ManageOrgChartStructureGeoProjectServices";


export default {
    watch:{ 
        async selectedCountryOptOrgStr(val){
           const countryNationalId = val ? val : null;
            if (countryNationalId !== null || (countryNationalId !== undefined && typeof countryNationalId !== "object")) {
                
                const getResourceId = parseInt(countryNationalId?.id )
                    ? parseInt(countryNationalId?.id)
                    : 0;
                const getSupperSSNId = 0;
                await this.getReloadResourcesTypGeoOrgAllDataGlobal(
                    getResourceId,
                    getSupperSSNId
                );
                // Get Selected Functions of province nation country
                const getNationCountryProvinceSSNId = this.countryProvinceIdOptSelected ?? null;
                this.provinceSelectedResourceSSNId = getNationCountryProvinceSSNId ? getNationCountryProvinceSSNId : null;
                this.getProvinceByCountrySelectedOrgStr(countryNationalId);
            }
            return null;
        },
        async selectedProvinceOptOrgStr(val) {
           const provinceNationalId = val ? val : null;
            if (provinceNationalId !== null || (provinceNationalId !== undefined && typeof provinceNationalId !== "object")) {
              
                const getResourceId = parseInt(provinceNationalId?.id )
                    ? parseInt(provinceNationalId?.id )
                    : 0;
                const getSupperSSNId = 0;
                await this.getReloadResourcesTypGeoOrgAllDataGlobal(
                    getResourceId,
                    getSupperSSNId
                );
                return null;
            }
        },
        async selectedDistrictOptOrgStr(val) {
           const districtNationalId = val ? val : null;
            if (districtNationalId !== null || (districtNationalId !== undefined && typeof districtNationalId !== "object")) {
              
                const getResourceId = parseInt(districtNationalId?.id )
                    ? parseInt(districtNationalId?.id )
                    : 0;
                const getSupperSSNId = 0;
                await this.getReloadResourcesTypGeoOrgAllDataGlobal(
                    getResourceId,
                    getSupperSSNId
                );
                return null;
            }
        },
        async selectedCommuneOptOrgStr(val) {
           const communeNationalId = val ? val : null;
            if (communeNationalId !== null || (communeNationalId !== undefined && typeof communeNationalId !== "object")) {
              
                const getResourceId = parseInt(communeNationalId?.id )
                    ? parseInt(communeNationalId?.id )
                    : 0;
                const getSupperSSNId = 0;
                await this.getReloadResourcesTypGeoOrgAllDataGlobal(
                    getResourceId,
                    getSupperSSNId
                );
                return null;
            }
        },
        async selectedVillagesOptOrgStr(val) {
           const communeNationalId = val ? val : null;
            if (communeNationalId !== null || (communeNationalId !== undefined && typeof communeNationalId !== "object")) {
              
                const getResourceId = parseInt(communeNationalId?.id )
                    ? parseInt(communeNationalId?.id )
                    : 0;
                const getSupperSSNId = 0;
                await this.getReloadResourcesTypGeoOrgAllDataGlobal(
                    getResourceId,
                    getSupperSSNId
                );
                return null;
            }
        }
    },
    computed: {
        ...mapGetters('orgStrDeptPosGeo', ['getReloadResourcesTypGeoOrgAll', 'getReloadSubResourcesTypGeoOrgAll']),
        // getAllResourceType
        getAllDataResourceTypeNationalCountry() {
            const resourceDataOrgDept =
                this.getReloadResourcesTypGeoOrgAll ?
                this.getReloadResourcesTypGeoOrgAll: [];
            if (resourceDataOrgDept !== null ||
                resourceDataOrgDept !==
                undefined &&
                typeof resourceDataOrgDept !== 'string'
            ) {
                return resourceDataOrgDept ? resourceDataOrgDept : []
            }
            return [];
        },
        getAllDataSubResourcesTypeNationCountry(){
            const resourcesDataNational = this.selectedResourcesType || null;
            if (resourcesDataNational !== null || resourcesDataNational !== undefined){
                const resourceDataOrgDept =
                    this.getReloadSubResourcesTypGeoOrgAll ?
                    this.getReloadSubResourcesTypGeoOrgAll: [];
                if (resourceDataOrgDept !== null ||
                    resourceDataOrgDept !==
                    undefined &&
                    typeof resourceDataOrgDept !== 'string'
                ) {
                    return resourceDataOrgDept ? resourceDataOrgDept : []
                }
            }
            return [];
        },
        getAllDataSubResourcesTypeFilterByMainSubResource(){
            const resourcesDataNational = this.selectedResourcesType || null;
            if (resourcesDataNational !== null || resourcesDataNational !== undefined){
                const resourceDataOrgDept =
                    this.getReloadSubResourcesTypGeoOrgAll ?
                    this.getReloadSubResourcesTypGeoOrgAll: [];
                if (resourceDataOrgDept !== null ||
                    resourceDataOrgDept !==
                    undefined &&
                    typeof resourceDataOrgDept !== 'string'
                ) {
                    return resourceDataOrgDept ? resourceDataOrgDept : []
                }
            }
            return [];
        },
        getSuperIdResourceTypesCountryDept() {
            const countryNationalId = this.selectedCountryOptOrgStr || this.selectedCountryOptOrgStr;
            if (countryNationalId !== null || (countryNationalId !== undefined && typeof countryNationalId !== "object")) {
                return countryNationalId?.id ? countryNationalId?.id : 0;
            }
            return 0;
        },
        /**
         * @Reload the resource types of geo-fence locations
         * */ 
        getCountryNationCongressResourceType() {
            const countryNationalId = this.selectedCountryOptOrgStr || this.selectedCountryOptOrgStr;
            if (countryNationalId !== null || (countryNationalId !== undefined && typeof countryNationalId !== "object")) {
                return countryNationalId?.id ? countryNationalId?.id : 0;
            }
            return 0;
        },
        getProvinceNationCongressResourceType() {
            const provinceNationalId = this.selectedProvinceOptOrgStr || this.selectedProvinceOptOrgStr;
            if (provinceNationalId !== null || (provinceNationalId !== undefined && typeof provinceNationalId !== "object")) {
                return provinceNationalId?.id ? provinceNationalId?.id : 0;
            }
            return 0;
        },
        /**
         * @Reload base geo-fence location reload data resource type after selected geo-fence locations
        * */
    },
    created() {
        this.geoDeptOrgStrServicesPosition = new ManageOrgChartStructureGeoProjectServices();
    },
    data() {
        return {
            dialogListNationalResourcesType: false,
            dialogAddNationalResourcesType: false,
            dialogListNationalSubResourcesType: false,
            dialogAddNationalSubResourcesType: false,
            filtersResourceType: {
                global: {
                    value: null,
                    matchMode: FilterMatchMode.CONTAINS
                },
            },
            listOrgNationResourceType: [],
            selectedResourcesType: null,
            countryProvinceIdOptSelected: null,
            provinceSelectedResourceSSNId: null
        }
    },
    methods: {
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
        ...mapActions("orgStrDeptPosGeo", ["setAllReloadOfResourceTypeOrgStrData", "setAllReloadOfSubResourceTypeOrgStrData"]),
        geoNameToTitleResourceType(strData) {
            return strData?.toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
        /**
         * @National Country Resources Type
         * */
        openDialogListResourcesTypeNationalResourceType() {
            this.dialogListNationalResourcesType = true;
        },
        closeDialogNationalCountryResourcesType() {
            this.dialogListNationalResourcesType = false;
        },
        openDialogAddResourcesType() {
            this.dialogAddNationalResourcesType = true;
        },
        closeDialogAddNewResourceType() {
            this.dialogAddNationalResourcesType = false;
        },
        // Sub Resources Types
        openDialogResourcesListSubType() {
            this.dialogListNationalSubResourcesType = true;
        },
        closeDialogResourcesListSubType() {
            this.dialogListNationalSubResourcesType = false;
        },
        openDialogResourcesAddSubType() {
            this.dialogAddNationalSubResourcesType = true;
        },
        closeDialogResourcesAddSubType() {
            this.dialogAddNationalSubResourcesType = false;
        },
        /**
         * @Global Resources Types Submitted Add New Resource Types
        **/
        submittedResignNationalCountryResourcesType() {
            try {
                this.submitted = true;
                this.loadingResourceType = true;
                setTimeout(() => {
                    if (!this.addNewNameResourcesType &&
                        this.addNewNameResourcesType !== null &&
                        typeof this.addNewNameResourcesType !== 'undefined' &&
                        this.nationalCountryId !== null ||
                        this.nationalCountryId !== ''
                    ) {
                            const addNewResourceType = {
                                geoFenceResourceTypeId: parseInt(this.nationalCountryId) ?? 0,
                                resourceTypeSuperSSNId: parseInt(this.superSSNResourceSelectedId) ? parseInt(this.superSSNResourceSelectedId) : 0,
                                resourceTypeEnglishName: String(this.addNewNameResourcesType).toString() ?? '',
                                resourceTypeKhmerName: String(this.addNewEmpRootNodeKhmer).toString() ?? '',
                                resourceTypeCode: String(this.typeCodeNationGeoFence).toString() ?? '',
                                resourceTypeDescriptions: String(this.descriptionDeptEmpRootNode).toString() ?? ''
                            }
                            this.geoDeptOrgStrServicesPosition.addNewResourceTypeOfGeoFence(addNewResourceType ? addNewResourceType : {})
                                .then(async (resourceType) => {
                                    if(resourceType?.status === 200){
                                        this.loadingResourceType = false;
                                        this.submitted = false;
                                        this.$toast.add({
                                            severity: "success",
                                            summary: "Add new resource type of geo-fence locations successfully!",
                                            message: String(resourceType.data?.message).toString() ? String(resourceType.data?.message).toString() : '',
                                            life: 3000,
                                        });
                                        /**
                                         * @Relist Get Reload Resources Type Data Org-Dept
                                        */ 
                                        const superSSNResourceTypeId = parseInt(this.superSSNResourceSelectedId) ?? 0;
                                        const geoFenceLocationId = parseInt(this.nationalCountryId) ?? 0;
                                        await this.getReloadResourcesTypGeoOrgAllDataGlobal(geoFenceLocationId, superSSNResourceTypeId);
                                        // Close Dialog
                                        this.close();
                                    }
                                }).catch((error)=> {
                                    this.loadingResourceType = false;
                                    this.submitted = false;
                                    this.$toast.add({
                                            severity: "error",
                                            summary: "Please input filed resource type of geo-fence have missing value!",
                                            message: String(error.data?.message).toString() ? String(error.data?.message).toString() : '',
                                            life: 3000,
                                        });
                                    this.submittingJobDesc = false;
                                });
                    } else {
                        this.$toast.add({
                            severity: "error",
                            summary: "Please input filed resource type of geo-fence have missing value!",
                            life: 3000,
                        });
                        this.loadingResourceType = false;
                        this.submitted = false;
                    }
                },1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        /**
         * @Edit Resources Nations Country
        */ 
        async openDialogEditModifyResourcesType(resourceData){
            this.openedEditDataResources = resourceData ? resourceData : null;
            this.dialogResourceTypeEditType = true;
        },
        async submittedResourceTypeSaveModify(){
            try{
                if(this.editDataResourcesTypeGeo?.englishNameResource 
                    && this.editDataResourcesTypeGeo?.englishNameResource !== null
                    && typeof this.editDataResourcesTypeGeo?.englishNameResource !== 'undefined'
                ){
                    this.submittingResourceLoading = true;
                    const parentResourceType = parseInt(this.editDataResourcesTypeGeo?.resourceTypeId) ? parseInt(this.editDataResourcesTypeGeo?.resourceTypeId) : 0;
                    const dataResourceTypeGeoFence = {
                        resourceModifyTypeEnglishName: String(this.editDataResourcesTypeGeo?.englishNameResource).toString() ?? '',
                        resourceModifyTypeKhmerName: String(this.editDataResourcesTypeGeo?.khmerNameResource).toString() ?? '',
                        resourceModifyTypeCode: String(this.editDataResourcesTypeGeo?.statusResourceTypeCode).toString() ?? '',
                        resourceModifyTypeDescriptions: String(this.editDataResourcesTypeGeo?.descriptionResourceType).toString() ?? '',
                    }
                 this.geoDeptOrgStrServicesPosition.modifyNewResourceTypeOfGeoFence(parentResourceType, dataResourceTypeGeoFence ? dataResourceTypeGeoFence : {})
                    .then(async (posDeptId) => {
                        if(posDeptId?.status === 200){
                            setTimeout(async () => {
                                this.hasErrorEditResourceType = false
                                this.submittingResourceLoading = false;
                                this.$toast.add({
                                    severity: 'info',
                                    summary: 'Editing position of org-structures successfully!',
                                    detail: String(posDeptId.data?.message).toString() ? String(posDeptId.data?.message).toString() : '',
                                    life: 3000
                                });
                                /**
                                 * @Relist Get Reload Resources Type Data Org-Dept
                                */ 
                                const superSSNResourceTypeId = parseInt(this.editDataResourcesTypeGeo.ssnResourceType) ?? 0;
                                const geoFenceLocationId = parseInt(this.editDataResourcesTypeGeo.geoFenceId) ?? 0;
                                await this.getReloadResourcesTypGeoOrgAllDataGlobal(geoFenceLocationId, superSSNResourceTypeId);
                                if (!this.hasErrorEditResourceType) {
                                    this.$emit('close')
                                }
                            }, 1000);
                        }
                    }).catch((error)=> {
                        let message = error?.message;
                        this.setToastError(message);
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Unsuccessfully updated base org-structure department!',
                            detail: String(message.data?.message).toString() ? String(message.data?.message).toString() : '',
                            life: 3000
                        });
                        this.hasErrorEditResourceType = false
                        this.submittingResourceLoading = false;
                    });
                }else{
                    this.hasErrorEditResourceType = true;
                    this.submittingResourceLoading = false;
                }
            }catch(error){
                throw Error(error || error.message);
            }
        },
        /**
         * @Removed Resources Nations Country
         */
        openDialogRemovedResourcesType(resourceData) {
            try {
                this.deletedResourcesTypeNational = true;
                if (resourceData !== null && resourceData !== undefined || !isNaN(Number(resourceData)) && resourceData !== '') {
                    this.dataDeletedOrgBoardPosId = resourceData ? resourceData : {};
                    this.getNameRemoveNationData = String(resourceData?.englishNameResource).toString();
                }
            } catch (error) {
                throw Error(error || error?.message);
            }
        },
        confirmRemovedResourcesTypeNationDialogs() {
            try {
                this.loadingRemovedResourceType = true;
                setTimeout(()=> {
                    this.loadingRemovedResourceType = false;
                    const resourceTypeId =  this.dataDeletedOrgBoardPosId?.resourceTypeId;
                    
                    this.geoDeptOrgStrServicesPosition?.removedResourceTypeOfGeoFence(resourceTypeId).then(async (resources) => {
                        if(resources?.status === 200){
                            this.deletedResourcesTypeNational = false;
                            this.$toast.add({
                                severity: 'info',
                                summary: 'removed resource type of geo-fence locations successfully!',
                                detail: String(resources.data?.message).toString() ? String(resources.data?.message).toString() : '',
                                life: 3000
                            });
                            /**
                             * @Relist Get Reload Resources Type Data Org-Dept
                            */ 
                            const superSSNResourceTypeId = parseInt(this.dataDeletedOrgBoardPosId.superIdResourceType) ?? 0;
                            const geoFenceLocationId = parseInt(this.dataDeletedOrgBoardPosId.geoFenceId) ?? 0;
                            await this.getReloadResourcesTypGeoOrgAllDataGlobal(geoFenceLocationId, superSSNResourceTypeId);
                        }
                    }).catch((error) => {
                        this.deletedResourcesTypeNational = false;
                        this.$toast.add({
                            severity: 'info',
                            summary: 'Unsuccessfully removed resource type!',
                            detail: String(error.data?.message).toString() ? String(error.data?.message).toString() : '',
                            life: 3000
                        });
                        throw Error(error || error?.message);
                    });
                },1000);
            } catch (error) {
                throw Error(error || error?.message);
            }
        },
        /**
          * @Global Resources Types Submitted Sub Resource Types
        **/
       async openSelectedSubResourcesTypeNational(resource){
            try{
                // Reload Data Resources
                const resourcesDataNational = resource ? resource : null;
                  if (
                    !Array.isArray(resource) ||
                    resource !== undefined ||
                    resource !== null || 
                    typeof resource !== 'undefined'
                ) {
                    if (resourcesDataNational !== null || resourcesDataNational !== undefined && typeof resourcesDataNational !== 'undefined') {
                        this.selectedSuperResourceType = resource?.ssnResourceType ?? 0;
                        const getResourceGeoFenceId = parseInt(resource?.geoFenceId) ?
                            parseInt(resource?.geoFenceId) :
                            0;
                        const getSupperSSNId = parseInt(resource?.ssnResourceType) ?
                            parseInt(resource?.ssnResourceType) :
                            0;
                        this.getReloadSubResourcesTypGeoOrgAllDataGlobal(getResourceGeoFenceId, getSupperSSNId);
                    }
                }
               
            }catch(error){
                throw Error(error || error?.message); 
            }
        },
        /**
        *@Reload Resources Types 
        */
        async getReloadResourcesTypGeoOrgAllDataGlobal(geoFenceSuperDataId=0,superSSNResourceId=0) {
            try {
                this.loadingReloadResourcesType = true;
                setTimeout(async () => {
                    try {
                        if (!geoFenceSuperDataId) {
                            throw Error('Please selected a resource type country!');
                        }
                        if (geoFenceSuperDataId !== null && !isNaN(Number(geoFenceSuperDataId)) || geoFenceSuperDataId !== '') {
                            let getResourceTypeId = parseInt(geoFenceSuperDataId) ? parseInt(geoFenceSuperDataId) : 0;
                            let getSuperSSNResourceTypeId = parseInt(superSSNResourceId) ? parseInt(superSSNResourceId) : 0;

                            const getOrgDeptResourceType = {
                                getResourceTypeId,
                                getSuperSSNResourceTypeId
                            }
                            this.setAllReloadOfResourceTypeOrgStrData(getOrgDeptResourceType);
                        }
                    } catch (e) {
                        throw Error(e || e?.message);
                    }
                    this.loadingReloadResourcesType = false;
                }, 1000);
            } catch (error) {
                throw Error(error || error?.message);
            }
        },
        async getReloadSubResourcesTypGeoOrgAllDataGlobal(geoFenceSuperDataId=0,superSSNResourceId=0) {
            try {
                this.loadingReloadResourcesType = true;
                setTimeout(async () => {
                    try {
                        if (!geoFenceSuperDataId) {
                            throw Error('Please selected a resource type country!');
                        }
                        if (geoFenceSuperDataId !== null && !isNaN(Number(geoFenceSuperDataId)) || geoFenceSuperDataId !== '') {
                            let getResourceTypeId = parseInt(geoFenceSuperDataId) ? parseInt(geoFenceSuperDataId) : 0;
                            let getSuperSSNResourceTypeId = parseInt(superSSNResourceId) ? parseInt(superSSNResourceId) : 0;

                            const getOrgDeptResourceType = {
                                getResourceTypeId,
                                getSuperSSNResourceTypeId
                            }
                            this.setAllReloadOfSubResourceTypeOrgStrData(getOrgDeptResourceType);
                        }
                    } catch (e) {
                        throw Error(e || e?.message);
                    }
                    this.loadingReloadResourcesType = false;
                }, 1000);
            } catch (error) {
                throw Error(error || error?.message);
            }
        },
        /**
         * @Reload list Data of geo-fence location nation 
        * */ 
        async onSelectedShowResourceTypeGeoFence() {
           try{
                const getResourceId = 0;
                const getSupperSSNId = String(this.provinceSelectedResourceSSNId).toString() ?? '';
                await this.getReloadResourcesTypGeoOrgAllDataGlobal(
                    getResourceId,
                    getSupperSSNId
                );
            } catch (error) {
                throw Error(error || error?.message);
            }
        },
    },
}