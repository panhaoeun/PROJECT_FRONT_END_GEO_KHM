<template>
    <form @submit.prevent="submittedDialogEditGeoProjectStr">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="positionAssignEdited"
            :title="`Assign Position:` + ' ' + assignPositionName"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Position </label>
                        <Dropdown
                            showClear
                            empty="Empty position"
                            filter="true"
                            v-model="selectedAssignPosition"
                            :options="openDataAssPosition"
                            optionLabel="name"
                            placeholder="Select a Position"
                            checkmark
                            :highlightOnSelect="false"
                            class="w-full md:w-30rem border-round-lg"
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
                        :fetching-data="submittingPositionData"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.assignPosition', {
                                type:
                                    editingAssPosData > 0
                                        ? $t('addressPopup.update')
                                        : $t('addressPopup.save'),
                            })
                        "
                    />
                </div>
            </template>
        </pop-over>
    </form>
</template>

<!-- Script of edited projects -->
<script>
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
import geoDeptOrgProjects from "@/mixin/manage_geo_org_str/manageProjectNameHelper";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import { mapActions } from "vuex";
export default {
    components: {
        Spinner,
        PopOver,
        AjaxButton,
    },
    props: {
        assignPositionData: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        assignPositionName() {
            return this.assignPositionData?.posOrgPositionTitle || "";
        },
        editingAssPosData() {
            return (
                this.assignPositionData &&
                parseInt(this.assignPositionData.deptOrgStrId)
            );
        },
    },
    mixins: [geoDeptOrgProjects, util, validation],
    data() {
        return {
            loadingSpinner: false,
            positionAssignEdited: null,
            hasAssignPositionErrors: false,
            submittingPositionData: false,
            openDataAssPosition: [],
            selectedAssignPosition: null,
        };
    },
    async mounted() {
        if (this.assignPositionData) {
            this.positionAssignEdited = {
                ...this.positionAssignEdited,
                ...this.assignPositionData,
            };
        } else {
            this.positionAssignEdited = {
                id: 0,
                project_name: "",
                project_noted: "",
            };
        }
    },
    methods: {
        ...mapActions("common", [
            "fetchLocation",
            "setToastMessage",
            "setToastError",
            "getRequest",
        ]),
    },
};
</script>
