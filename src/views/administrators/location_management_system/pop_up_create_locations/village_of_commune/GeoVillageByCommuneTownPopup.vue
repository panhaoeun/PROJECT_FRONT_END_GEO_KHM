<template>
    <div class="col-12 field"> 
        <!-- Create Popup Create Commune -->
        <village-of-commune-create
          :villageCommuneId="geoDistrictSSNVillageId"
        />
    </div>
</template>
<!-- Script of JS -->
<script>
    import VillageOfCommuneCreate from "./VillageOfCommuneCreate.vue";
    export default{
        props: {
            geoDistrictSSNVillageId: {
                type: String,
                default() {
                    return null
                }
            }
        },  
        computed: {
            nameGeoVillage(){
                return this.geoDistrictSSNVillageId?.geo_english_name || ''; 
            },
            editing() {
                return this.geoDistrictSSNVillageId && this.geoDistrictSSNVillageId?.id;
            },
        },
        components:{
            VillageOfCommuneCreate
        }
    }
</script>