<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Add Sub Category
            </h2>
            <el-button
                class="btn btn-primary"
                @click.prevent="
                    $router.push('/vendor/products/sub-category/list')
                "
            >
                <div>
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{ $t("route.routeBack") }}</span>
                </div>
            </el-button>
        </div>
        <!--Create Products-->
        <el-card class="box-card px-6 py-6">
            <!-- Toast Alert -->
            <Toast />
            <!-- Tabs -->
            <el-tabs v-model="activeName" class="demo-tabs text-xl">
                <form method="POST">
                    <!--Form Submitted-->
                    <el-tab-pane label="English(EN)" name="english-tabs">
                        <!-- English -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                    <div class="col-6 field">
                                        <label for="name_en">
                                            Category
                                            <span class="p-error">*</span>
                                        </label>
                                        <Dropdown
                                            :options="selectedCategoriesListArr"
                                            filter
                                            v-model="
                                                v$.selectedCategories.$model
                                            "
                                            :class="{
                                                'p-invalid border-round-lg border-round-lg p-error':
                                                    v$.selectedCategories
                                                        .$invalid && submitted,
                                            }"
                                            inputId="catID"
                                            optionLabel="catNameEn"
                                            placeholder="Select a Categories"
                                            aria-describedby="dd-error"
                                            class="w-full border-round-lg text-sm"
                                        >
                                            <template #value="slotProps">
                                                <div
                                                    v-if="slotProps.value"
                                                    class="flex align-items-center"
                                                >
                                                    <div>
                                                        {{
                                                            slotProps.value
                                                                ?.catNameEn
                                                        }}
                                                    </div>
                                                </div>
                                                <span v-else>
                                                    {{ slotProps.placeholder }}
                                                </span>
                                            </template>
                                            <template #option="slotProps">
                                                <div
                                                    class="flex align-items-center"
                                                >
                                                    <div>
                                                        {{
                                                            slotProps.option
                                                                ?.catNameEn
                                                        }}
                                                    </div>
                                                </div>
                                            </template>
                                        </Dropdown>
                                        <small
                                            v-if="
                                                (v$.selectedCategories
                                                    .$invalid &&
                                                    submitted) ||
                                                v$.selectedCategories.$pending
                                                    .$response
                                            "
                                            class="p-error text-lg"
                                        >
                                            {{
                                                v$.selectedCategories.required.$message.replace(
                                                    "Value",
                                                    "Categories"
                                                )
                                            }}
                                        </small>
                                    </div>
                                    <!-- Name Sub Category -->
                                    <div class="col-6 field">
                                        <label for="name_en"
                                            >Sub Category Name (Eng)<span
                                                class="p-error"
                                                >*</span
                                            ></label
                                        >
                                        <InputText
                                            id="product_name"
                                            placeholder="Name"
                                            type="text"
                                            class="py-3 border-round-lg"
                                            v-model="
                                                v$.proSubCategoryNameEng.$model
                                            "
                                            :class="{
                                                'p-invalid p-error':
                                                    v$.proSubCategoryNameEng
                                                        .$invalid && submitted,
                                            }"
                                        />
                                        <small
                                            v-if="
                                                (v$.proSubCategoryNameEng
                                                    .$invalid &&
                                                    submitted) ||
                                                v$.proSubCategoryNameEng
                                                    .$pending.$response
                                            "
                                            class="p-error"
                                            >{{
                                                v$.proSubCategoryNameEng.required.$message.replace(
                                                    "Value",
                                                    "Name"
                                                ) ||
                                                v$.proSubCategoryNameEng.$params
                                                    .min
                                            }}
                                        </small>
                                    </div>
                                    <!-- Editor -->
                                    <div class="col-12 field">
                                        <Editor
                                            v-model="proSubCategoryDesEng"
                                            placeholder="Descriptions *"
                                            editorStyle="height: 320px"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Khmer(KH)" name="khmer-tab">
                        <!-- Khmer -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                    <div class="col-12 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="proKh"
                                                >Category Name (KH)
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                id="proKh"
                                                placeholder="Name"
                                                type="text"
                                                class="py-3 border-round-lg"
                                                v-model="proSubCategoryNameKh"
                                            />
                                        </div>
                                    </div>
                                    <!-- Editor -->
                                    <div class="col-12 field">
                                        <Editor
                                            v-model="proSubCategoryDesKh"
                                            placeholder="Descriptions *"
                                            editorStyle="height: 320px"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!-- Buttons Submits -->
                    <div class="col-12 flex justify-content-end mt-4">
                        <!--Buttons-->
                        <Button
                            icon="pi pi-times"
                            class="p-button-lg py-3 w-10rem mr-3"
                            label="Cancel"
                        />
                        <Button
                            icon="pi pi-check"
                            @click.prevent="
                                handleSubCategorySubmit(!v$.$invalid)
                            "
                            :disabled="isProcessingSubmit"
                            :label="isProcessingSubmit ? 'Process...' : 'Save'"
                            class="p-button-lg py-3 p-button-outlined w-10rem mr-3"
                        />
                    </div>
                </form>
            </el-tabs>
        </el-card>
    </div>
</template>

<!-- Scripts Category -->
<script>
import { Plus } from "@element-plus/icons-vue";
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import ProductCategoriesServices from "../../../../services/vendors/product_categories/ProductsCategoriesServices";
import { ElMessage } from "element-plus";

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            activeName: "english-tabs",
            activetab: 1,
            preview: null,
            selectedCategories: null,
            isProcessingSubmit: false,
            catSubListDropDown: [],
            listCategories: [],
            file: null,
            notifmsg: "",
            loading: false,
            submitted: false,
            proSubCategoryNameEng: "",
            proSubCategoryNameKh: "",
            proSubCategoryDesEng: "",
            proSubCategoryDesKh: "",
            selectedCategoriesListArr: null,
        };
    },
    mounted() {
        this.getCurrentListCatView();
    },
    components() {
        Plus;
    },
    created() {
        this.proSubCategoryService = new ProductCategoriesServices();
    },
    //Validations
    validations() {
        return {
            proSubCategoryNameEng: {
                required,
                minLength: minLength(3),
            },
            selectedCategories: {
                required,
            },
        };
    },
    methods: {
        getCurrentListCatView() {
            this.proSubCategoryService.getProCategory().then((currentCat) => {
                if (currentCat === undefined || currentCat === null) {
                    return { role_name: "", childrenModule: [] };
                }
                this.selectedCategoriesListArr = currentCat ? currentCat : [];
            });
        },
        async handleSubCategorySubmit(isFormValidCategorySub) {
            try {
                this.submitted = true;
                this.isProcessingSubmit = false;
                if (!isFormValidCategorySub) {
                    ElMessage.error("Validations is required!");
                    return;
                }
                if (
                    !this.proSubCategoryNameEng != "" ||
                    this.proSubCategoryNameEng !== null
                ) {
                    // Data Response
                    const data = {
                        superSubCatID: this.selectedCategories?.catID
                            ? this.selectedCategories?.catID
                            : "",
                        productSubCatEng: this.proSubCategoryNameEng
                            ? this.proSubCategoryNameEng
                            : "",
                        productSubCatKh: this.proSubCategoryNameKh
                            ? this.proSubCategoryNameKh
                            : "",
                    };
                    this.proSubCategoryService
                        .createSubProCategory(data)
                        .then((response) => {
                            this.isProcessingSubmit = true;
                            if (response.data.success == true) {
                                ElMessage.success(response.data.message);
                                // Push Router
                                this.$router.push(
                                    "/vendor/products/sub-category/list"
                                );
                            }
                        })
                        .catch((error) => {
                            this.$notify.error({
                                title: "Unsuccessfully create sub categories",
                                message:
                                    error.response.data.error.message ??
                                    "Unsuccessfully create sub categories",
                                showClose: false,
                            });
                            if (error.response.data.error.error.errors) {
                                for (
                                    let index = 0;
                                    index <
                                    error.response.data.error.error.errors
                                        .length;
                                    index++
                                ) {
                                    const messageValidation =
                                        error.response.data.error.error.errors[
                                            index
                                        ].message ?? "";
                                    this.$notify.error({
                                        title: "Unsuccessfully create sub categories",
                                        message:
                                            messageValidation ??
                                            "Unsuccessfully create sub categories",
                                        showClose: true,
                                    });
                                }
                            }
                        });
                }
            } catch (error) {
                //  Toast Alert
                ElMessage.error(error);
            }
        },
        resetForm() {
            (this.proSubCategoryNameEng = ""),
                (this.proCategoryNameKh = ""),
                (this.submitted = false);
        },
    },
};
</script>
