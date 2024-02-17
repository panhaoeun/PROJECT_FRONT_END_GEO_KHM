<template>
    <div>
        <Dialog
            v-model:visible="openDialogsOrgStrName"
            modal
            header="Org Chart Structure Management"
            :style="{ width: '90rem' }"
            maximizable
        >
            <!-- Contents -->
            <div class="address-popup popup-top-auto z-100">
                <div class="flex start mlr--5 grid grid-nogutter">
                    <div
                        class="col-lg-5 col-md-12 flex column h-full org-structure-new"
                    >
                        DDHDDD
                    </div>
                </div>
            </div>
            <!-- Footers -->
            <template #footer>
                <Button
                    label="Cancel"
                    text
                    class="w-7rem"
                    severity="secondary"
                    @click.prevent="close"
                    autofocus
                />
            </template>
        </Dialog>
    </div>
</template>

<!-- Popup Edit Org-Structure-->
<script>
export default {
    components: {
    },
    props: {
        editedId: Number,
        dialog: {
            type: Boolean,
            default: false,
            required: true,
        },
        getDataEditOrgStr: {
            type: Object,
            required: true,
            default: () => {}
        }

    },
    computed: {
        openDialogsOrgStrName() {
            return this.dialog || false;
        },
    },
    data() {
        return {
            activeDialogPositionId: 0,
        };
    },
    created() {},
    methods: {
        close() {
            this.$emit("close-dialog");
        },
    },
};
</script>
<!-- Style Custom -->
<style>
.org-structure-new {
    height: 100%;
    border: 2px dashed #aaa;
    border-radius: 5px;
    text-align: center;
}
</style>
