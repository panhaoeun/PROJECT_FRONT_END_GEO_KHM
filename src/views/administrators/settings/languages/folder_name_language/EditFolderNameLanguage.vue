<template>
    <Button class="ajax-btn outline-btn plr-20 mtb-5 border-round" label="Edit" icon="pi pi-plus" @click="edit_new_language = true" />
    <div class="container">
      <Dialog v-model:visible="edit_new_language" modal header="Edit Country LanguageFolder" :style="{ width: '90%' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="row col-12 px-0">
          <DataTable :value="products" :tableStyle="{ 'min-width': '50rem' }">
            <Column field="ID" sortable header="ID"></Column>
            <Column field="Original lang" sortable header="Code"></Column>
            <Column field="Langua" sortable header="Name"></Column>
            <Column field="Language" sortable header="Language"></Column>
            <Column field="ShortCode" sortable header="Short Code"></Column>
            <Column field="CountryCode" sortable header="Country Code"></Column>
            <Column header="Actions">
              <template v-slot="slotProps">
                <div class="d-flex justify-content-center">
                  <Button icon="pi pi-trash" class="btn btn-primary h-3rem w-10rem" label="Delete"
                    @click="deleteItem(slotProps.rowData)" />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </Dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      edit_new_language: false,
      products: [
        {
          ID: 1,
          "Original lang": "en",
          Langua: "English",
          Language: "English",
          ShortCode: "EN",
          CountryCode: "US",
        },
        {
          ID: 2,
          "Original lang": "es",
          Langua: "Spanish",
          Language: "Español",
          ShortCode: "ES",
          CountryCode: "ES",
        },
        // Add more products if needed
      ],
    };
  },
  methods: {
    deleteItem(item) {
      // Handle delete action for the item
      console.log("Delete item:", item);
    },
  },
};
</script>