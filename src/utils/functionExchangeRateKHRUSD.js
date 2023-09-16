import ExchangeRateBCurrencyServices from "@/services/function_exchange_rate/ExchangeRateBCurrencyServices"
const exchangeRateService = new ExchangeRateBCurrencyServices();

export default {
    convertRielToUSDAmount: async (khmerRiel) => {
        const convertKhmerRiel = khmerRiel ? khmerRiel : '';
        const exchangeToUSD = await exchangeRateService.exchangeRateKHRToUSD(convertKhmerRiel);
        const result = await Promise.resolve(exchangeToUSD)
        return result;
    } 
}
export function convertUSDToRiel(usdAmount){
    const convertUSD = parseInt(usdAmount) ? parseInt(usdAmount) : '';
    return exchangeRateService.exchangeRateKHRToUSD(convertUSD);
}
