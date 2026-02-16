import { create } from "zustand";
import { devtools } from "zustand/middleware"
import type { CriptoCurrenciesResponse, CryptoState, Pair } from "./types";
import { getTopCryptos, getCriptoCurrencyPrice } from "./services/CriptoService";



type CryptoStore = {
    criptoCurrecnies: CriptoCurrenciesResponse,
    pairCurrencies: string,
    isLoading: boolean,
    fetchTopCryptos: () => Promise<void>,
    fecthCurrencyPrice: (pair: Pair) => Promise<void>
    cryptoData: CryptoState;
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    criptoCurrecnies: [],
    pairCurrencies: '',
    isLoading: false,
    cryptoData: {
        currentPrice: 0,
        lowMonth: 0,
        highMonth: 0,
        flag: ''
    },
    fetchTopCryptos: async () => {
        const topTwnty = await getTopCryptos();
        set({ criptoCurrecnies: topTwnty });
    },
    fecthCurrencyPrice: async (pair) => {
        set({ isLoading: true });
        try {
            const result = await getCriptoCurrencyPrice(pair);
            const cryptoData = result ? result[`${pair.criptoCurrency}-${pair.currency}`] : null;
            if (cryptoData) {
                set({
                    cryptoData: {
                        currentPrice: cryptoData.VALUE,
                        lowMonth: cryptoData.CURRENT_MONTH_LOW,
                        highMonth: cryptoData.CURRENT_MONTH_HIGH,
                        flag: cryptoData.VALUE_FLAG
                    },
                    pairCurrencies: `${pair.criptoCurrency}-${pair.currency}`
                })
            }
        } finally {
            set({ isLoading: false });
        }

    }
})))