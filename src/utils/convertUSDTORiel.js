import ExchangeRateBCurrencyServices from "@/services/function_exchange_rate/ExchangeRateBCurrencyServices"
const exchangeRateService = new ExchangeRateBCurrencyServices();

export default async function convertUSDToRiel(usdAmount) {
    const convertUSD = parseInt(usdAmount) ? parseInt(usdAmount) : '';
    const exchangeUSD = exchangeRateService.exchangeRateUSDToKHR(convertUSD);
    const result = await Promise.resolve(exchangeUSD)
    return result;
}