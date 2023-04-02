<template>
    <!-- Header -->
<Header/>
    <!--Contents -->
    <div class="bg-white">
      <div class="container bg-white" align-center>
            <div class="px-2 py-2 ">
              <!-- Form Submit on Stepper Accounts -->
              <!--========Form==============-->
                <div class="columns">
                    <div class="col-lg-12 mx-auto">
                      <div class="p-fluid px-4 py-4 border shadow">
                        <!-- MazStepper -->
                         <horizontal-stepper 
                            :steps="stepRouter" 
                            @completed-step="completeStep" 
                            :top-buttons="true"
                            @active-step="isStepActive"
                            @stepper-finished="alert"
                            >
                        </horizontal-stepper>
                    </div>
                </div>
            </div>
              <!--========Form==============-->

            </div>
        </div>
    </div>
  
</template> 

<!-- Import Files -->
<script>
    import HorizontalStepper  from '../../../components/vue-stepper/HorizontalStepper.vue';
    import Header from '../../customers/header_of_subpage/HeaderSubPage.vue';
    //Acc Steps
    import BusinessInformation from './stepper_acc/BusinessInformation.vue';
    import SellerInformation from './stepper_acc/SellerInformation.vue';
    import IdentityVerificationSellAcc from './stepper_acc/IdentityVerificationSellAcc.vue';
    export default {
        data: function() {
            return {
                currentStep: 0,
                stepperAcc: {
                    ownerName: '',
                    businessName: '',
                },
                stepRouter: [
                    {
                        icon: 'mail',
                        name: 'first',
                        title: 'Business Information',
                        subtitle: '',
                        component: BusinessInformation,
                        completed: false 
                    },
                    {
                        icon: 'mail',
                        name: 'second',
                        title: 'Seller Information',
                        subtitle: '',
                        component: SellerInformation,
                        completed: false
                    },
                    {
                        icon: 'mail',
                        name: 'four',
                        title: 'Verification',
                        subtitle: '',
                        component: IdentityVerificationSellAcc,
                        completed: false
                    },
                ]
            }
        },
        methods: {
            completeStep(payload) {
                this.stepRouter.forEach((step) => {
                    if (step.name === payload.name) {
                        step.completed = true;
                    }
                });
            },
            isStepActive(payload) {
                this.stepRouter.forEach((step) => {
                    if (step.name === payload.name) {
                        if (step.completed === true) {
                            step.completed = false;
                        }
                    }
                });
            },
            alert(payload) {
                alert(payload)
            }
        },
        components: {
            Header,
            HorizontalStepper,
        }
    }
</script>


<style scoped>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.box.formated .heading {
    font-size: 1rem;
    text-transform: capitalize;
    padding: .8rem 1.5rem;
    background-color: #fafafa;
}

.box.formated .content {
    padding: 1rem 2rem;
}

i.top-left {
    position: absolute;
    left: 1.5rem;
    top: 0.8rem;
}

.vertical-separator {
    display: flex;
    justify-content: space-around;
}

.vertical-separator .line {
    border-right: 1px solid #cccccc;
}</style>
