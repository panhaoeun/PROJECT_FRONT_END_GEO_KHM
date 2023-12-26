<template>
    <hr>
    <div class="col-12 p-0">
        <div class="col-12 d-flex">
            <div class="col-6">
                <h6>Widget Your Language</h6>
            </div>
            <div class="col-6 p-0 d-flex justify-content-end">
                <Button class="ml-2 add-new-btn" label="Add New" @click="select_category = true" />
            </div>
        </div>

        <div class="row col-12 px-0">
            <DataTable :value="products" :tableStyle="{ 'min-width': '50rem' }">
                <Column field="ID" header="ID"></Column>
                <Column field="Original lang" header="Code"></Column>
                <Column field="Langua" header="Name"></Column>
                <Column field="Language" header="Language"></Column>
                <Column field="ShortCode" header="Short Code"></Column>
                <Column field="CountryCode" header="Country Code"></Column>
                <Column field="Action" header="Action">
                    <template #body="rowData">
                        <Button icon="pi pi-eye" @click="openViewDialog(rowData)"></Button>
                        <Button icon="pi pi-trash" @click="deleteAction(rowData)"></Button>
                    </template>
                </Column>
            </DataTable>
            <Dialog v-if="viewDialog.visible" v-model:visible="viewDialog.visible" modal closable
                header="View Country Language" :style="{ width: '90%' }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <div class="row col-12 px-0">
                    <h6>View Dialog Content</h6>
                    <p>ID: {{ viewDialog.rowData.ID }}</p>
                    <p>Code: {{ viewDialog.rowData['Original lang'] }}</p>
                    <p>Name: {{ viewDialog.rowData.Langua }}</p>
                    <p>Language: {{ viewDialog.rowData.Language }}</p>
                    <p>Short Code: {{ viewDialog.rowData.ShortCode }}</p>
                    <p>Country Code: {{ viewDialog.rowData.CountryCode }}</p>
                </div>
            </Dialog>
        </div>
    </div>
</template>
  
<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';

export default {
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
    },

    data() {
        return {
            products: [
                {
                    ID: 1,
                    'Original lang': 'ABC',
                    Langua: 'Language 1',
                    Language: 'English',
                    ShortCode: 'EN',
                    CountryCode: 'US',
                    showDialog: false,
                },
                {
                    ID: 2,
                    'Original lang': 'DEF',
                    Langua: 'Language 2',
                    Language: 'French',
                    ShortCode: 'FR',
                    CountryCode: 'FR',
                    showDialog: false,
                },
                {
                    ID: 3,
                    'Original lang': 'GHI',
                    Langua: 'Language 3',
                    Language: 'Spanish',
                    ShortCode: 'ES',
                    CountryCode: 'ES',
                    showDialog: false,
                },
            ],
            select_category: ref(false),
            viewDialog: {
                visible: false,
                rowData: {},
            },
        };
    },
    methods: {
        openViewDialog(rowData) {
            this.viewDialog.rowData = rowData;
            this.viewDialog.visible = true;
        },
        deleteAction(rowData) {
            // Implement delete logic here
            console.log('Delete:', rowData);
        },
    },
};
</script>