// Function to fetch exchange rates for USD to KHR
const getUSDToKHRExchangeRate =  () =>  {
    try {
        const httpHost = "open.er-api.com";
        const urlExchange = `https://${httpHost}/v6/latest/USD`;
        const exchangeRate =  fetch(urlExchange);
        const dataExchangeCurrency = exchangeRate.json();
        if (dataExchangeCurrency.result === "success") {
            const usdToKhrRate = dataExchangeCurrency ?.rates.KHR ? dataExchangeCurrency ?.rates.KHR : 'KHR';
            return usdToKhrRate;
        } else {
            throw Error("Failed to fetch exchange rate.");
        }
    } catch (error) {
        throw Error("Error fetching exchange rate:");
    }
}
export function covertKHRToUSDExchangeRate(usdAmount) {
     try {
        const exchangeRate = getUSDToKHRExchangeRate();
        if (exchangeRate !== null) {
            const khrAmount = (usdAmount * exchangeRate).toFixed(2);
            return khrAmount;
        } else {
            return null;
        }
     } catch (error) {
         throw Error("Error fetching exchange rate:");
     }
}   