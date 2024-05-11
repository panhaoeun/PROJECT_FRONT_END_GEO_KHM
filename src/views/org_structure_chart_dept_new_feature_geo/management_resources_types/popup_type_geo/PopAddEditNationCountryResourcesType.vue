<template>
    <div class="pl-2 gap-2 flex align-items-center justify-content-center">
        <!-- Button Group -->
        <div class="flex justify-content-center gap-1">
            <Button
                icon="pi pi-wrench"
                severity="danger"
                class="plr-20 mtb-5 border-round-lg text-sm text-white"
                v-tooltip="{
                    value: 'Management Resource Type',
                    pt: {
                        arrow: {
                            style: {
                                borderBottomColor: 'var(--primary-color)',
                            },
                        },
                        text: 'bg-primary font-medium',
                    },
                }"
                @click.prevent="
                    openDialogListResourcesTypeNationalResourceType()
                "
            />
            <Button
                icon="pi pi-list"
                severity="warning"
                v-tooltip="{
                    value: 'Management Sub Resource Type',
                    pt: {
                        arrow: {
                            style: {
                                borderBottomColor: 'var(--primary-color)',
                            },
                        },
                        text: 'bg-primary font-medium',
                    },
                }"
                class="ajax-btn primary-btn outline-btn plr-20 mtb-5 border-round-lg text-sm text-white"
                @click.prevent="openDialogResourcesListSubType()"
            />
        </div>
    </div>
    <!-- Dialogs for org-structure and positions -->
    <PopupDialogResourcesTypeNationCountry
        v-if="dialogListNationalResourcesType"
        :dialog="dialogListNationalResourcesType"
        :national-country-id="nationalCountryId ? nationalCountryId : 0"
        :super-ssn-resource-id="superSSNResourceId ? superSSNResourceId : 0"
        :type-code-nation-geo-fence="
            typeCodeNationGeoFence ? typeCodeNationGeoFence : 'GL01'
        "
        @close-dialog="closeDialogNationalCountryResourcesType"
    />
    <!-- Dialogs for org-structure sub resources types-->
    <PopupDialogSubResourcesTypeNationCountry
        v-if="dialogListNationalSubResourcesType"
        :dialog="dialogListNationalSubResourcesType"
        :super-ssn-resource-id="superSSNResourceId ? superSSNResourceId : 0"
        :national-country-id="nationalCountryId ? nationalCountryId : 0"
        :type-code-nation-geo-fence="
            typeCodeNationGeoFence ? typeCodeNationGeoFence : 'GL01'
        "
        @close-dialog="closeDialogResourcesListSubType"
    />
</template>

<!-- Script of Add and Edit Resources Types -->
<script>
import manageOrgGeoResourcesTypeNationalCountryHelper from "@/mixin/manage_org_structure_dept_new_features/manage_resources_types/manageOrgGeoResourcesTypeNationalCountryHelper";
import PopupDialogResourcesTypeNationCountry from "./dialog_popup_geo_resources_type/PopupListDialogResourcesTypeNationCountry";
import PopupDialogSubResourcesTypeNationCountry from "./sub_dialog_popup_geo_resource_type/PopupListDialogSubResourcesTypeNationCountry";
export default {
    components: {
        PopupDialogResourcesTypeNationCountry,
        PopupDialogSubResourcesTypeNationCountry,
    },
    mixins: [manageOrgGeoResourcesTypeNationalCountryHelper],
    props: {
        superSSNResourceId: {
            type: Number,
            required: true,
            default: () => 0,
        },
        nationalCountryId: {
            type: Number,
                required: true,
                default: () => 0,
        },
        typeCodeNationGeoFence: {
            type: String,
            required: true,
            default: () => "GL01",
        },
    },
};
</script>
