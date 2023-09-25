import ExchangeRateBCurrencyServices from "@/services/function_exchange_rate/ExchangeRateBCurrencyServices"
const exchangeRateService = new ExchangeRateBCurrencyServices();

export default async function convertRielToUSDAmount(khmerRiel) {
    const convertKhmerRiel = khmerRiel ? khmerRiel : '';
    const exchangeToUSD = await exchangeRateService.exchangeRateKHRToUSD(convertKhmerRiel);
    const result = await Promise.resolve(exchangeToUSD)
    return result;
}
