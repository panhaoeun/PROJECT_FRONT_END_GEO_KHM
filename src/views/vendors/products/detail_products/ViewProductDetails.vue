<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between">
            <h2 class="flex relative text-black text-xl section section-title:before justify-content-center">
                <img class="flex align-items-center justify-content-center " src="../../../../../src/assets/img/product_icons/package.png" alt="Image" width="50"/>
                <span class="flex align-items-center justify-content-center pl-2">Hot Selling Sneakers,</span>
            </h2>
            <el-button class="btn btn-primary text-sm"  type="info" size="large" @click="$router.push('/vendor/products/list')">
                <div class="flex justify-between pl-2" v-permission="[{functionName: 'categories_module', moduleName: 'fun_create'}]">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">Back</span>
                </div>
            </el-button>
        </div>
        <!-- Contents of View Products -->
        <div class="gird">
            <div class="col-12">
                <!-- Product Details -->
                 <el-card class="box-card mb-3 my-2">
                        <b-container class="bv-example-row">
                            <b-row>
                                <!-- Right Image -->
                                <b-col cols="5" class="md:col-5 col-8">
                                    <div class="col-md-auto mb-3 mb-md-0">
                                        <div class="d-flex align-items-center">
                                            <img 
                                                    class="avatar w-5 h-12rem mr-4" 
                                                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64882d3231ad8.png" 
                                            alt="Image Description">
                                            <div class="d-block">
                                                <h4 class="display-2 text-dark mb-0">0</h4>
                                                <p> Of 0 Reviews
                                                    <span class="badge badge-soft-dark badge-pill ml-1"></span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                            <!-- Bottom -->
                            <b-row>
                               <hr/>
                            </b-row>
                            <!-- Product Details -->
                            <b-row>
                                <b-col cols="4" col-lg="5" class="flex-column gap-1 d-flex">
                                    <div class="flex-start">
                                        <h5 class="">Crossbody Shoulder Bag Soft Leather Bag Female Fashion</h5>
                                    </div>
                                    <div class="flex-start">
                                        <span>Price : </span>
                                        <span class="mx-1">$500.00</span>
                                    </div>
                                    <div class="flex-start">
                                     <span>TAX : </span>
                                     <span class="mx-1">5% (Exclude)</span>
                                    </div>
                                </b-col>
                                <b-col cols="8" col-lg="7" class="gap-1 d-flex border-lg-left">
                                    <div>
                                        <div class="mb-2">Product Image</div>
                                            <div class="row g-2">
                                                <div class="col-6 col-md-4 col-lg-3">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <img class="width-100" src="https://6valley.6amtech.com/storage/app/public/product/2022-04-13-62566ecb46b07.png" alt="Product image">
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </el-card>
                    <!-- Review  Product by customers -->
                    <el-card class="box-card">
                       <table class="table">
                            <thead>
                               <tr>
                                    <th>Reviewer</th>
                                    <th>Review</th>
                                    <th>Date</th>
                               </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="flex align-items-center justify-content-center">
                                                <Avatar image="https://w7.pngwing.com/pngs/213/907/png-transparent-editing-picsart-studio-others-blue-hand-girl.png" style="width: 50px; height: 50px" class="mr-2" shape="circle"/>
                                            </div>
                                            <div class="ml-3ow">
                                                <span class="d-block h5 text-hover-primary mb-0">TAX : </span>
                                                <span class="d-block font-size-sm text-body">5% (Exclude)</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex flex-column justify-content-center text-sm">
                                            <el-rate
                                                v-model="customerRatingModel"
                                                disabled
                                                class="text-sm"
                                                show-score
                                                size="small"
                                                text-color="#ff9900"
                                                score-template="{value} points"
                                            />
                                            <!--Product Review-->
                                            <b-container>
                                                <b-row>
                                                    <b-col col="4">
                                                        <img 
                                                                class="w-3rem h-3rem" 
                                                                src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64882d3231ad8.png" 
                                                        alt="Image Description">
                                                    </b-col>                                                                                                        
                                                </b-row>
                                            </b-container>
                                        </div>
                                    </td>
                                    <td>
                                        {{ Date('YYY-MM-DD') }}
                                    </td>
                                </tr>
                            </tbody>
                       </table>
                       <!-- Empty Data To Show -->
                       <el-empty :image-size="200" description="No data to show" />
                    </el-card>
            </div>
        </div>
    </div>
</template>


<!-- Data Tables -->
<script>
    export default {
        data(){
            return {
                customerRatingModel: 3.7,
                mainProps: { width: 200, height: 200, class: 'm1' }
            }
        }
    }
</script>
