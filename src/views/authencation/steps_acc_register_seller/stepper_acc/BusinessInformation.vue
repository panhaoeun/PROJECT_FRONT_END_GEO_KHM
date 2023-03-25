
<template>
     <div class="stepsdemo-content">
            <div class="p-fluid formgrid grid">
                    <div class="field col-12">
                        <label for="class" class="font-bold">Business name</label>
                        <InputText type="text" v-model="form.businessName" placeholder="Business Name"/>
                    </div>
                    <div class="field col-12 md:col-12">
                        <label for="class" class="font-bold">Business Type</label>
                        <Dropdown inputId="class" v-model="selectedClass" :options="classes" @change="setVagons($event)" optionLabel="name" placeholder="Select a Business Type" />
                    </div>
                    <!-- Business Address -->
                    <div class="filed col-12 mb-2">
                       <div class="flex">
                            <span class="font-bold">Registered business address</span>
                            <el-tooltip
                                    class="box-item pl-2"
                                    effect="dark"
                                    placement="top-start"
                                >
                                <!-- Contents -->
                                <template #content> 
                                    A business license is a permit issued by a government agency to 
                                    <br />
                                    allow an individual or a company to conduct business.
                                </template>
                                 <i class="pi pi-question-circle" style="color: slateblue"></i>
                            </el-tooltip>
                       </div>
                    </div>
                    <div class="field col-6">
                        <InputText type="text" v-model="form.businessAddr01" placeholder="Address Line 01"/>
                    </div>
                    <div class="field col-6">
                        <InputText type="text" v-model="form.businessAddr02" placeholder="Address Line 02"/>
                    </div>
                    <div class="field col-6">
                        <InputText type="text" v-model="form.businessAddrCity" placeholder="City/Town"/>
                    </div>
                    <div class="field col-3">
                        <InputText type="text" v-model="form.businessAddrProvince" placeholder="State/Region/Province"/>
                    </div>
                    <div class="field col-3">
                        <InputText type="text" v-model="form.businessAddrZipCode" placeholder="Zip/Postal Code"/>
                    </div>
                    <!--If you sell your product online, enter your website URL (optional)-->
                    <div class="field col-8">
                         <label for="class font-bold" class="font-bold">If you sell your product online, enter your website URL (optional)</label>
                         <InputText type="text" v-model="form.businessWebURL" placeholder="www.phzarkhmer.com/khonlineshop"/>
                    </div>
                    <div class="field col-6">
                        <label for="class font-bold" class="font-bold">Mobile Number</label>
                        <InputText type="text" v-model="form.businessMobilePhone" placeholder="Mobile Number"/>
                        <small>Ex: +855 16387467</small>
                    </div>
                    <div class="field col-6">
                        <label for="class font-bold" class="font-bold">Email</label>
                        <InputText type="text" v-model="form.businessEmail" placeholder="Email"/>
                        <small>Ex: devapp@phzarkh.com</small>
                    </div>
            </div>
        </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
export default {
    setup: () => ({ v$: useVuelidate()}),
    props: ['clickedNext', 'currentStep'],
    data() {
        return {
            submitted: false,
            validationErrors: {},
            form: {
                businessName: '',
                businessAddr01: '',
                businessAddr02: '',
                businessAddrCity: '',
                businessAddrProvince: '',
                businessAddrZipCode: '',
                businessWebURL: '',
                businessMobilePhone: '',
                businessEmail: ''
            },
            selectedClass: '',
            classes: [
                { name: 'Store for Personal', code: 'store-personal', factor: 1 },
                { name: 'Store for enterprises', code: 'store-enterprises', factor: 2 },
            ],
            vagons: [],
        }
    },
    validations()  {
       return {
            form: {
                businessName: required
            }
       }
    },
    methods: {
        setVagons(event) {
            if (this.selectedClass && event.value) {
                this.vagons = [];
                this.seats = [];
                for (let i = 1; i < 3 * event.value.factor; i++) {
                    this.vagons.push({ vagon: i + event.value.code, type: event.value.name, factor: event.value.factor });
                }
            }
        },
    },
    watch: {
        v$: {
            handler: function (val) {
                if (!val.$invalid) {
                    this.$emit('can-continue', { value: true });
                } else {
                    this.$emit('can-continue', { value: false });
                    setTimeout(() => {
                        this.$emit('change-next', { nextBtnValue: false });
                    }, 3000)
                }
            },
            deep: true
        },
        clickedNext(val) {
            const result = this.v$.$validate()
            console.log(result);
            if (val === true) {
                this.v$.form.$touch();
            }
        }
    },
    mounted() {
        if(!this.v$.$validate){
            this.$emit('can-continue', { value: true });
        }else{
            this.$emit('can-continue', { value: false });
        }
    }
}
</script>
