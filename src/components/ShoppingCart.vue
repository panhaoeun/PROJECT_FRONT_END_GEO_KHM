<template>
    <div class="xs:mx-auto md:mx-auto gap-3 row">
        <div class="col-md-7">
            <div class="p-5 bg-white rounded">
                <div class="">
                    <h1 class="text-black font-weight-bold">Shopping Cart (2)</h1>
                    <div class="">
                        <label for="select-item">
                            <input class="mr-3" type="radio" id="select-item" />
                            Select all items
                        </label>
                    </div>
                    <hr />
                </div>
            </div>
            <div class="bg-white mt-3 px-2 py-3 rounded">
                <p class="text-black">
                    <span class="bg-red rounded p-2">Welcome Deal</span>
                    Applicable on 1 item only
                </p>
            </div>

            <div class="bg-white mt-3 px-2 py-3 rounded mb-5">
                <label class="p-3" for="#">
                    <input type="radio" /> AppleWatch Store
                </label>
                <hr />

                <div class="container row gap-2">
                    <div class="col-4">
                        <div class="d-flex">
                            <input type="radio" />
                            <img
                                src="https://ae04.alicdn.com/kf/S5f2aa25a2a724fc0a2ccb6ec595c5289K.jpg"
                                alt="logo"
                                class="w-100 h-auto rounded ml-4"
                            />
                        </div>
                    </div>

                    <div class="col-7">
                        <div class="flex">
                            <p class="text-black d-inline">
                                Original Apple Watch Series 7 Used GPS 41mm 45mm
                                Sports Smart Watch.
                            </p>
                            <div class="flex gap-3 ml-8">
                                <i class="pi pi-heart"></i>
                                <i class="pi pi-trash"></i>
                            </div>
                        </div>

                        <a class="text-black cursor-pointer"
                            >As picture Show/41MM</a
                        >
                        <div class="flex justify-content-between mt-2">
                            <p class="text-black font-weight-bold h5">US $427.20</p>
                            <div class="flex gap-3">
                                <i class="pi pi-minus-circle"></i>
                                <span>1</span>
                                <i class="pi pi-plus-circle"></i>
                            </div>
                        </div>
                        <a class="text-black cursor-pointer"
                            >Free shopping now</a
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment method sections -->
        <div class="col-md-4">
            <div class="bg-white rounded p-5">
                <h1 class="text-black font-weight-bold">Summary</h1>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <p class="text-black font-weight-bold">Total</p>
                    <p class="text-black font-weight-bold h3">US $0.00</p>
                </div>
                <div
                    class="md:d-flex mt-2 justify-content-center align-items-center container"
                >
                    <button
                        class="w-100 rounded-pill btn btn-secondary text-enter text-center"
                        type="button"
                    >
                        Checkout (0)
                    </button>
                </div>
            </div>
            <div class="bg-white rounded mt-2 px-5 py-5">
                <h2 class="text-black font-weight-bold">Payment methods</h2>
                <div>
                    <ul class="d-flex gap-4 align-items-center">
                        <li>
                            <img
                                class="payment-img"
                                src="https://img.alicdn.com/tfs/TB1xcMWdEKF3KVjSZFEXXXExFXa-68-48.png"
                                alt=""
                            />
                        </li>
                        <li>
                            <img
                                class="payment-img"
                                src="https://img.alicdn.com/tfs/TB19TEYdB1D3KVjSZFyXXbuFpXa-53-48.png"
                                alt=""
                            />
                        </li>
                        <li>
                            <img
                                class="payment-img"
                                src="https://img.alicdn.com/tfs/TB19qM7drus3KVjSZKbXXXqkFXa-39-48.png"
                                alt=""
                            />
                        </li>
                        <li>
                            <img
                                class="payment-img"
                                src="https://img.alicdn.com/tfs/TB18So3dBKw3KVjSZFOXXarDVXa-41-48.png"
                                alt=""
                            />
                        </li>
                    </ul>
                </div>
                <hr />
                <div class="text-black">
                    <h2 class="text-black font-weight-bold">Buyer Protection</h2>
                    <div class="flex gap-3 align-items-center">
                        <img
                            class="protected-img"
                            src="https://ae01.alicdn.com/kf/S5d155b426fd74b24bd10e73f9ac90a93b/64x76.png"
                            alt=""
                        />
                        <p class="text-black h6">
                            Get full refund if the item is not as described or
                            if is not delivered
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
