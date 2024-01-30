<template>
    <form @submit.prevent="submittedDialogEditGeoProvinceStr">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            title="Assign Employee"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Manager </label>
                        <Dropdown
                            v-model="selectedEmpBoardMgtDept"
                            :options="cities"
                            optionLabel="name"
                            placeholder="Select a Manager"
                            checkmark
                            :highlightOnSelect="false"
                            class="w-full md:w-30rem"
                        />
                    </div>
                </div>
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Descriptions </label>
                        <TextArea
                            class="border-round-lg text-sm w-30rem"
                            v-model="descriptionDeptEmpCountry"
                            type="text"
                            placeholder="Descriptions"
                        />
                    </div>
                </div>
            </template>
            <!-- Footer -->
            <template v-slot:pop-footer>
                <div class="flex j-end gap-10">
                    <button
                        class="outline-btn plr-30 plr-sm-15 border-round"
                        aria-label="Country cancel"
                        @click.prevent="$emit('close')"
                    >
                        {{ $t("addressPopup.cancel") }}
                    </button>
                    <ajax-button
                        class="primary-btn plr-30 plr-sm-15"
                        :fetching-data="submittingDeptEmpCountryId"
                        :loading-text="$t('addressPopup.saving')"
                        text="Save"
                    />
                </div>
            </template>
        </pop-over>
    </form>
</template>

<!-- Assign Permission on user on position department org-chat-->
<script>
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
import util from "@/mixin/util";
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";

export default {
    components: {
        Spinner,
        PopOver,
        AjaxButton,
    },
    mixins: [util],
    props: {
        boardMgtObjFiled: {
            type:Object, 
            required: true,
            default: () => {}
        }
    },
    data() {
        return {
            visibleAssignUser: false,
            selectedEmpBoardMgtDept: null,
            descriptionDeptEmpCountry: "",
            submittingDeptEmpCountryId: false,
        };
    },
    created() {},
    methods: {
        openDialogAssignUserPosition() {
            this.visibleAssignUser = true;
        },
    },
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
