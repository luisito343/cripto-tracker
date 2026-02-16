import axios from "axios";
import { criptoCurrencyResponseSchema, CryptoDataSchema } from "../Schema/cripto-schema";
import type { Pair } from "../types";


async function getTopCryptos() {
    const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false");
    const result = criptoCurrencyResponseSchema.array().safeParse(data);
    return result.success ? result.data : [];
}

async function getCriptoCurrencyPrice(pair: Pair) {
    const { data } = await axios.get(`https://data-api.coindesk.com/index/cc/v1/latest/tick?market=cadli&instruments=${pair.criptoCurrency}-${pair.currency}&apply_mapping=true`);
    const result = CryptoDataSchema.safeParse(data);
    return result.data?.Data;
}

export { getTopCryptos, getCriptoCurrencyPrice };