<template>
    <div class="container">
        <div class="card">
            <div class="d-flex justify-content-between">
                <strong class="text-xl text-black-1">Invoice</strong>

                <strong class="text-black-1 text-sm">Order#TEST-64324234242EEE</strong>
            </div>
            <div class="mt-5 d-flex justify-content-between flex-row">
                <div class="justify-start">
                    <div class="col-sm">
                        <h5>Pickup Hup:</h5>
                        <p>Name: Amazone caffe</p>
                        <p>Manager: Geoverary Reynonds.</p>
                        <p>Address: 987546, Kinh Plains Apt.75 Phnom Penh</p>
                    </div>
                </div>
                <div>
                    <strong class="text-xl">Order Date:</strong>
                    <p>30 March 2023 04:31:12 AM</p>
                </div>
            </div>

            <!-- order summary -->
            <span class="m-5">
                <strong class="text-xl">Order Summary</strong></span>
            <!-- table ordered items -->
            <strong>1</strong>
            <div class="table-responsive">
                <table class="table table-striped table-borderless align-middle table-cell-padding-x">
                <thead class="table-dark">
                    <th>#</th>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Qunatity</th>
                    <th>Tax</th>
                    <th>Totals</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div class="col align-self-end">
                <div>
                    <span>Discounts:<strong> $5000</strong></span>
                </div>
                <div>
                    <span>(-)Discount:<strong> $5000</strong></span>
                </div>
                <div>
                    <span>(-) Coupon Discount:<strong> $5000</strong></span>
                </div>
            </div>
            <!-- button covert invoice -->
            <div class="d-flex justify-content-end ">
                <button class="btn btn-sm btn-warning mr-2 "> <i class="fa fa-download"></i>PDF </button>
                <button class="btn btn-sm btn-dribbble"> <i class="fa fa-print"></i>PRINT</button>
            </div>
     

            <!-- histories -->
            <strong class="text-xl text-bold black">Delivery Histories</strong>
            <div class="row">
               <div class="col-1">
                <button class="btn rounded-circle btn-primary"> <i class=" fa fa-check"></i> </button>
               </div>
                <div class="col">
                    <p class="text-primary">15 HOURSE AGO</p>
                    <p>Order Crerate Event</p>
                    <p>By: Walk-In Customers</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card{
    border: 1px;
    border-radius: 5px;
    box-shadow: 2px 2px  #eceff0;
}
/* .btn{
    border-radius: 50px;
} */
</style>
