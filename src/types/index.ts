import { z } from 'zod';
import {
    criptoCurrenciesResponseArraySchema,
    criptoCurrencyResponseSchema,
    currencySchema,
    PairSchema,
    CryptoDataSchema,
} from '../Schema/cripto-schema';


export type Currency = z.infer<typeof currencySchema>;

export type CriptoCurrency = z.infer<typeof criptoCurrencyResponseSchema>;

export type CriptoCurrenciesResponse = z.infer<typeof criptoCurrenciesResponseArraySchema>;
export type Pair = z.infer<typeof PairSchema>;

export type Criptoresponse = z.infer<typeof CryptoDataSchema>;

export type CryptoState = {
    currentPrice: number,
    lowMonth: number,
    highMonth: number,
    flag: string
};