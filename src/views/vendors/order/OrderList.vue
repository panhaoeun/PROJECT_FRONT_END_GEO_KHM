<template>
    <div class="container-fluid">
        <header>
            <div>
                <h4><strong>Orders</strong></h4>
            </div>
            <div>
                <p>You have total 706 orders</p>
            </div>
        </header>
        <main>
            <div class="card">
                <header>
                    <form action="">
                        <p>
                            <strong class="text-black text-bold text-xl"
                                >Orders</strong
                            >
                        </p>
                        <div class="row gx-5">
                            <div class="col">
                                <div class="form">
                                    <select
                                        name=""
                                        id="select1"
                                        class="form-select"
                                    >
                                        <option selected>
                                            Delivery Status
                                        </option>
                                        <option value="">test1</option>
                                        <option value="">test4</option>
                                        <option value="">test3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control mr-5"
                                    placeholder="Enter Order Period"
                                />
                            </div>
                            <div class="col">
                                <div class="form">
                                    <select
                                        name=""
                                        id="select1"
                                        class="form-select"
                                    >
                                        <option selected>Latest On Top</option>
                                        <option value="">test1</option>
                                        <option value="">test4</option>
                                        <option value="">test3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Search"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                    <button class="btn btn-dark">
                                        <i
                                            class="fa fas fa-search text-white"
                                        ></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </header>
                <div class="table-responsive">
                    <table class="table-hover table table-striped">
                        <thead class="">
                            <tr>
                                <th class="col-1">#</th>
                                <th class="">Order Code</th>
                                <th>Customer</th>
                                <th>Total Product</th>
                                <th>Total Price</th>
                                <th>Deleivery Status</th>
                                <th>Payment Status</th>
                                <th>Refunds</th>
                                <th>options</th>
                            </tr>
                        </thead>
                        <tbody class="items-center">
                            <tr>
                                <td>1</td>
                                <td>1-#8762423436456</td>
                                <td>Walk-In Customer</td>
                                <td>1</td>
                                <td>$1.2343.00</td>
                                <td>
                                    <span class="badge bg-warning"
                                        >Pending</span
                                    >
                                </td>
                                <td>
                                    <span class="badge bg-warning">Unpaid</span>
                                </td>
                                <td><span>0 refunded</span></td>
                                <td>
                                    <div>
                                        <router-link
                                            :to="{ name: 'invoice-detail' }"
                                            type="button"
                                            class="btn btn-info rounded-circle"
                                        >
                                            <i class="fa fas fa-eye"></i>
                                        </router-link>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            class="btn btn-dark rounded-circle"
                                        >
                                            <i class="fa fas fa-download"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1-#8762423436456</td>
                                <td>Walk-In Customer</td>
                                <td>1</td>
                                <td>$1.2343.00</td>
                                <td>
                                    <span class="badge bg-warning"
                                        >Pending</span
                                    >
                                </td>
                                <td>
                                    <span class="badge bg-warning">Unpaid</span>
                                </td>
                                <td><span>0 refunded</span></td>
                                <td>
                                    <div>
                                        <router-link
                                            :to="{ name: 'invoice-detail' }"
                                            type="button"
                                            class="btn btn-info rounded-circle"
                                        >
                                            <i class="fa fas fa-eye"></i>
                                        </router-link>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            class="btn btn-dark rounded-circle"
                                        >
                                            <i class="fa fas fa-download"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: "oder-list",
    data() {
        return {};
    },
};
</script>
