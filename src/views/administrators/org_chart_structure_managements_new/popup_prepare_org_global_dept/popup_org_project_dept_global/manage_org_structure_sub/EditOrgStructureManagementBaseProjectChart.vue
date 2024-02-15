<template>
    <div class="layout-content">
        <Toast />
        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
            <div class="col-12 lg:col-12 text-sm">
                <div class="grid formgrid">
                    <!-- English Name -->
                    <div class="col-6 field">
                        <label for="name_en"
                            >English Name<span class="p-error">*</span></label
                        >
                        <InputText
                            id="english_name"
                            placeholder="Edit english name for org-structure"
                            type="text"
                            class="py-3 border-round-lg"
                            v-model="v$.editNameEngProjectOrgStr.$model"
                            :class="{
                                'p-invalid p-error':
                                    v$.editNameEngProjectOrgStr.$invalid &&
                                    submitted,
                            }"
                        />
                        <small
                            v-if="
                                (v$.editNameEngProjectOrgStr.$invalid &&
                                    submitted) ||
                                v$.editNameEngProjectOrgStr.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.editNameEngProjectOrgStr.required.$message.replace(
                                    "Value",
                                    "English Name"
                                ) || v$.editNameEngProjectOrgStr.$params.min
                            }}
                        </small>
                    </div>
                    <!-- Khmer Name -->
                    <div class="col-6 field">
                        <label for="name_en">Khmer Name</label>
                        <InputText
                            id="english_name"
                            placeholder="Edit khmer name for org-structure"
                            type="text"
                            class="py-3 border-round-lg"
                            v-model="editNameKhmerProjectOrgStr"
                        />
                    </div>
                    <!-- Descriptions -->
                    <div class="col-12 field">
                        <label for="description_org_structure"
                            >Descriptions</label
                        >
                        <Textarea
                            id="descriptions_org_structure"
                            placeholder="Descriptions for org-structure"
                            type="text"
                            class="py-3 border-round-lg"
                            v-model="editDescriptionProjectOrgStr"
                        />
                    </div>
                    <!-- Save button  -->
                    <div class="col-12 flex justify-content-end mt-4">
                        <Button
                            icon="pi pi-check"
                            class="p-button-lg py-3 w-10rem text-sm"
                            type="submit"
                            :label="loadingBtnEdit ? 'Saving...' : 'Create'"
                            :loading="loadingBtnEdit"
                            @click.prevent="
                                handleEditStructureOrgProChartSubmit(
                                    !v$.$invalid
                                )
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Scripts of org-structure management base projects -->
<script>
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            loadingBtnEdit: false,
            submitted: false,
            editNameEngProjectOrgStr: "",
            editNameKhmerProjectOrgStr: "",
            editDescriptionProjectOrgStr: "",
        };
    },
    //Validations
    validations() {
        return {
            editNameEngProjectOrgStr: {
                required,
                minLength: minLength(3),
            },
        };
    },
    methods: {
        async handleEditStructureOrgProChartSubmit(validate) {
            try {
                this.submitted = true;
                this.loadingBtnEdit = true;
                setTimeout(() => {
                    this.loadingBtnEdit = false;
                    if (!validate) {
                        return false;
                    }
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        resetForm() {
            (this.editNameEngProjectOrgStr = ""),
                (this.proCategoryNameKh = ""),
                (this.submitted = false);
        },
    },
};
</script>
