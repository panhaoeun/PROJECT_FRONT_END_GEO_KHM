import http from "../../../http-common";
export default class ExchangeRateBCurrencyServices {
    /** 
        @panhaoeun @api - Customer Deposited 
        @Customer Deposited => Customer Wallets
    */
    // Get 
    async exchangeRateKHRToUSD(khmerRielAmount,data) {
        return await http.get(`/function/transaction/exchange-rate/currencies-khr-usd?khrAmount=${khmerRielAmount}`, data)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                Promise.reject(error);
            });
    }
    async exchangeRateUSDToKHR(usdAmount,data) {
        return await http.get(`/function/transaction/exchange-rate/currencies-usd-riel?usdAmount=${usdAmount}`, data)
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.success == true) {
                        return result.data.result.resultStatus;
                    }
                }
            })
            .catch((error) => {
                Promise.reject(error);
            });
    }
}