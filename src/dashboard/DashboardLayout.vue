<template>
    <div class="px-4 py-4">
        <b-row>
        <!-- 01 -->
          <b-col lg="3">
            <b-card no-body>
              <b-card-body>
                <div class="d-flex justify-content-between">
                  <div class="bg-soft-primary rounded p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span>Net Worth</span>
                  </div>
                </div>
                <div class="text-center">
                  <h2><Vue3autocounter ref="counter" :startAmount="0" :endAmount="65" />M</h2>
                  <div>
                    <span class="text-success">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                      10%
                    </span>
                    <span>Increased</span>
                  </div>
                </div>
              </b-card-body>
            </b-card>
          </b-col>
           <!-- 02 -->
            <b-col lg="3">
                <b-card no-body>
                  <b-card-body>
                    <div class="d-flex justify-content-between">
                      <div class="rounded p-3 bg-soft-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <span>Total Users</span>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2><Vue3autocounter ref="counter" :startAmount="0" :endAmount="966" />K</h2>
                      <div>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                          </svg>
                          30%
                        </span>
                        <span>Increased</span>
                      </div>
                    </div>
                  </b-card-body>
                  <!-- <apexchart height="80" type="area" :series="chart3.series" :options="chart3.options" /> -->
                </b-card>
              </b-col>
        </b-row>
    </div>
</template>
