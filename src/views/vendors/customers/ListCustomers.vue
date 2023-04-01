<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="relative text-black text-3xl section section-title:before">Customer Lists</h2>
            <el-button type="info" size="large" class="py-4" @click="openNew">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-plus" style="font-size: 1rem"></i>
                    <span class="pl-2">Add Customer</span>
                </div>
            </el-button>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="card">
                            <Toolbar class="mb-4">
                                <template #start>
                                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2"
                                        @click="openNew" />
                                    <Button label="Delete" icon="pi pi-trash" severity="danger"
                                        @click="confirmDeleteSelected"
                                        :disabled="!selectedProducts || !selectedProducts.length" />
                                </template>

                                <template #end>
                                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import"
                                        chooseLabel="Import" class="mr-2 inline-block" />
                                    <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                                </template>
                            </Toolbar>

                            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
                                :paginator="true" :rows="10" :filters="filters" class="p-datatable-scrollable"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5, 10, 25]"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                        <h4 class="m-0"></h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                                        </span>
                                    </div>
                                </template>

                                <!-- Columns -->
                                <Column field="category" header="Customer Name" sortable style="min-width:15rem">
                                    <template #body="slotProps">
                                        <Avatar
                                            :image="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                                            class="mr-2" size="large" shape="circle" />
                                        <p>Phzarkhmer</p>
                                    </template>
                                </Column>
                                <Column field="category" header="Contact Info" sortable style="min-width:15rem">
                                    <template #body>
                                        <div class="font-bold">
                                            mohd.zameem.10@gmail.com
                                            012121224156
                                        </div>
                                    </template>
                                </Column>
                                <Column field="category" header="Last Login" sortable style="min-width:12rem">
                                    <template #body>
                                        <div class="font-bold">
                                           Mar 31, 2023 09:20 pm
                                        </div>
                                    </template>
                                </Column>
                                <Column field="category" header="Block / Unblock" sortable style="min-width:10rem">
                                    <template #body>
                                        <div class="font-bold">
                                            <el-switch v-model="statusShopSwitch" />
                                        </div>
                                    </template>
                                </Column>
                                <Column :exportable="false" header="Options" style="min-width:8rem">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                                            @click="editProduct(slotProps.data)" />
                                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                                            @click="confirmDeleteProduct(slotProps.data)" />
                                    </template>
                                </Column>
                            </DataTable>
                        </div>

                        <!-- ===============Add New Sellers======================= -->
                        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Customer Info"
                            :modal="true" class="p-fluid">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                                alt="product.image" class="block m-auto pb-2 w-2 h-2 rounded" />
                            <!-- Upload Image -->
                            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :auto="true"
                                chooseLabel="Profile Image" @uploader="customBase64Uploader" class="block m-auto w-4 " />
                            <div class="field">
                                <label for="name">First Name <span class="p-error">*</span></label>
                                <InputText id="name" v-model.trim="product.name" required="true" autofocus
                                    :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
                            </div>
                            <div class="field">
                                <label for="name">Last Name <span class="p-error">*</span></label>
                                <InputText id="name" v-model.trim="product.name" required="true" autofocus
                                    :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
                            </div>
                            <div class="field">
                                <label for="name">Phone<span class="p-error">*</span></label>
                                <InputText id="name" v-model.trim="product.name" required="true" autofocus
                                    :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
                            </div>
                            <div class="field">
                                <label for="name">Email</label>
                                <InputText id="name" v-model.trim="product.name" required="true" autofocus
                                    :class="{ 'p-invalid': submitted && !product.name }" />
                                <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
                            </div>
                            <!-- Password -->
                            <div class="formgrid grid">
                                <div class="field col">
                                    <label for="name">Password</label>
                                    <Password v-model="value" toggleMask>
                                        <template #header>
                                            <h6>Pick a password</h6>
                                        </template>
                                        <template #footer>
                                            <Divider />
                                            <p class="mt-2">Suggestions</p>
                                            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                                <li>At least one lowercase</li>
                                                <li>At least one uppercase</li>
                                                <li>At least one numeric</li>
                                                <li>Minimum 8 characters</li>
                                            </ul>
                                        </template>
                                    </Password>
                                </div>
                                <div class="field col">
                                    <label for="name">Confirm Password</label>
                                    <Password v-model="value" toggleMask>
                                        <template #header>
                                            <h6>Pick a password</h6>
                                        </template>
                                        <template #footer>
                                            <Divider />
                                            <p class="mt-2">Suggestions</p>
                                            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                                <li>At least one lowercase</li>
                                                <li>At least one uppercase</li>
                                                <li>At least one numeric</li>
                                                <li>Minimum 8 characters</li>
                                            </ul>
                                        </template>
                                    </Password>
                                </div>
                            </div>
                            <template #footer>
                                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                                <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
                            </template>
                        </Dialog>
                        <!-- ===============Edited New Sellers======================= -->
                        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm"
                            :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
                            </div>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
                            </template>
                        </Dialog>

                        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm"
                            :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span v-if="product">Are you sure you want to delete the selected products?</span>
                            </div>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                            </template>
                        </Dialog>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>


<!-- Data Tables -->
<script setup>
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from 'primevue/api';
import SellerServices from '../../../services/vendors/seller_managements/SellerServices';

// Product Services
onMounted(() => {
    const sellServices = new SellerServices();
    sellServices.getProducts().then((data) => (products.value = data))
});

const toast = useToast();
const dt = ref();
const products = ref();
const statusShopSwitch = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const saveProduct = () => {
    submitted.value = true;

    if (product.value.name.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
    }
};
const editProduct = (prod) => {
    product.value = { ...prod };
    productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    products.value = products.value.filter(val => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};
// Preview Upload files
const customBase64Uploader = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
        const base64data = reader.result;
        console.log(base64data)
    };
};
</script>

