<template>
    <div class="xs:mx-auto md:mx-2 gap-3 row">
        <div class="col-md-7">
            <div class="p-5 bg-primary rounded">
                <div class="">
                    <h1 class="text-white">Shopping Cart (2)</h1>
                    <div class="">
                        <label for="select-item">
                            <input class="mr-3" type="radio" id="select-item" />
                            Select all items
                        </label>
                    </div>
                    <hr />
                </div>
            </div>
            <div class="bg-primary mt-3 px-2 py-3 rounded">
                <p class="text-white">
                    <span>Welcome Deal</span> Applicable on 1 item only
                </p>
            </div>
            <div class="bg-primary mt-3 px-2 py-3 rounded">
                <label for="#"> <input type="radio" /> AppleWatch Store </label>
                <hr />
                <div>
                    <input type="radio">
                    <img src="https://ae04.alicdn.com/kf/S5f2aa25a2a724fc0a2ccb6ec595c5289K.jpg" alt="logo" class="w-25 h-auto rounded ml-3">
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="bg-primary rounded p-5">
                <h1 class="text-white">Summary</h1>
                <div class="d-flex justify-content-between">
                    <p class="text-white">Total</p>
                    <p class="text-white">US $0.00</p>
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
            <div class="bg-primary rounded mt-2 px-5 py-5">
                <h2 class="text-white">Payment methods</h2>
                <div>
                    <ul class="d-flex gap-3">
                        <li>Visa</li>
                        <li>Master Card</li>
                        <li>JCB</li>
                        <li>Pay Pal</li>
                    </ul>
                </div>
                <hr />
                <div class="text-white">
                    <h2 class="text-white">Buyer Protection</h2>
                    <p class="text-white">
                        Get full refund if the item is not as described or if is
                        not delivered
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
