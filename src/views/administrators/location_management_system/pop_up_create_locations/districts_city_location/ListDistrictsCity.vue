<template>
    <div class="gap-10 flex justify-content-center flex-wrap border-top-1 border-cyan-600">
        <button type="button" @click.prevent="popUpCreateProvinceState()" aria-label="View All" class="border-none w-15rem ajax-btn outline-btn plr-20 mtb-5">
            <span>
                View All
            </span>
        </button>
    </div>
    <!-- Popup Create Province or State-->
    <Dialog 
        v-model:visible="openDialog"
        header="Create Province or State" :style="{ width: '75vw' }" 
        modal 
        :contentStyle="{ height: '600px' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :draggable="faltse"
    >
        <!-- Table List Province or State -->
        <div class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 card border-round gap-15">
            <DataTable
                class="px-2 py-2"
                :scrollable="true" 
                scrollHeight="flex"
                tableStyle="min-width: 50rem"
                v-model:editingRows="editingRows" 
                v-model:selection="selectedCustomers"
                :value="products" 
                editMode="row" 
                dataKey="id" 
                :rows="10"
                :lazy="true"
                :paginator="true" 
                :filters="filters"
                responsiveLayout="scroll"
                @row-edit-save="onRowEditSave"
                @sort="onSort($event)" 
                @page="onPage($event)"
                :selectAll="selectAll"
                @select-all-change="onSelectAllChange"
                @row-select="onRowSelect" 
                @row-unselect="onRowUnselect"
                :pt="{
                    table: { style: 'min-width: 50rem' },
                    column: {
                        bodycell: ({ state }) => ({
                            style:  state['d_editing']&&'padding-top: 0.6rem; padding-bottom: 0.6rem' 
                        })
                    }
                }"
            >
                <!-- Search Input Filter -->
                <template #header>
                    <div class="flex flex-wrap  justify-content-between gap-2">
                        <p>Province or State List</p>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search province or state" />
                        </span>
                    </div>
                </template>
                <!-- Column -->
                <Column selectionMode="multiple" :styless="{width: '3rem'}" :exportable="false"></Column>
                <Column field="code" header="Code" sortField="code" filterMatchMode="startsWith" sortable  style="width: 20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="name" header="Khmer Name" style="width: 20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="inventoryStatus" header="English Name" style="width: 20%">
                    <template #editor="{ data, field }">
                        <Dropdown v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status">
                            <template #option="slotProps">
                                <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                            </template>
                        </Dropdown>
                    </template>
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="price" header="Longitude" style="width: 20%">
                    <template #body="{ data, field }">
                        {{ formatCurrency(data[field]) }}
                    </template>
                    <template #editor="{ data, field }">
                        <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
                    </template>
                </Column>
                 <Column field="price" header="Latitude" style="width: 20%">
                    <template #body="{ data, field }">
                        {{ formatCurrency(data[field]) }}
                    </template>
                    <template #editor="{ data, field }">
                        <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
                    </template>
                </Column>
                <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
                <!-- <Column :exportable="false" :styles="{'min-width':'8rem'}">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outline class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outline class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column> -->
            </DataTable>
        </div>
    </Dialog>
</template>

<!-- Popup Province or State -->
<script>
import { ProductService } from '../ProductService';
import { FilterMatchMode } from 'primevue/api';

export default {
    components: {

    },
    mounted() {
        ProductService.getProductsMini().then((data) => (this.products = data));
    },
    props: {},
    data() {
        return {
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                status: { value: null, matchMode: FilterMatchMode.EQUALS },
                verified: { value: null, matchMode: FilterMatchMode.EQUALS }
            },
            openDialog: false,
            products: null,
            editingRows: [],
            statuses: [
                { label: 'In Stock', value: 'INSTOCK' },
                { label: 'Low Stock', value: 'LOWSTOCK' },
                { label: 'Out of Stock', value: 'OUTOFSTOCK' }
            ],
            selectedCustomers: null,
            selectAll: false,
            first: 0,
        };
    },
    created() {

    },
    methods: {
        popUpCreateProvinceState(){
            this.openDialog = true;
        },
        onRowEditSave(event) {
            let { newData, index } = event;

            this.products[index] = newData;
        },
        getStatusLabel(status) {
            switch (status) {
                case 'INSTOCK':
                    return 'success';

                case 'LOWSTOCK':
                    return 'warning';

                case 'OUTOFSTOCK':
                    return 'danger';

                default:
                    return null;
            }
        },
        formatCurrency(value) {
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        },
          onPage(event) {
            this.lazyParams = event;
            this.loadLazyData(event);
        },
        onSort(event) {
            this.lazyParams = event;
            this.loadLazyData(event);
        },
        onFilter(event) {
            this.lazyParams.filters = this.filters;
            this.loadLazyData(event);
        },
        onSelectAllChange(event) {
            const selectAll = event.checked;
            if (selectAll) {
                ProductService.getProductsMini().then(data => {
                    this.selectAll = true;
                    this.selectedCustomers = data;
                });
            }
            else {
                this.selectAll = false;
                this.selectedCustomers = [];
            }
        },
        onRowSelect() {
            this.selectAll = this.selectedCustomers.length === this.totalRecords
        },
        onRowUnselect() {
            this.selectAll = false;
        }
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>