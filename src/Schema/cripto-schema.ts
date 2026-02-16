import z from "zod";

export const currencySchema = z.object({
    code: z.string(),
    name: z.string(),
});

export const criptoCurrencyResponseSchema = z.object({
    symbol: z.string(),
    name: z.string(),
})

export const criptoCurrenciesResponseArraySchema = z.array(criptoCurrencyResponseSchema);

export const PairSchema = z.object({
    currency: z.string(),
    criptoCurrency: z.string()
})

export const CryptoDataSchema = z.object({
    Data: z.record(
        z.string(), // Esta es la llave dinámica tipo "BTC-USD"
        z.object({
            VALUE: z.number(),                     // Valor actual
            VALUE_FLAG: z.string(),                // Value flag
            CURRENT_MONTH_LOW: z.number(),         // Valor más bajo del mes
            CURRENT_MONTH_HIGH: z.number(),        // Valor más alto del mes
        })
    ),
    Err: z.object({}).optional(),
});

export const CryptoDetailSchema = z.object({
    VALUE: z.number(),
    VALUE_FLAG: z.string(),
    CURRENT_MONTH_LOW: z.number(),
    CURRENT_MONTH_HIGH: z.number(),
});

// Esquema para el objeto principal con llaves dinámicas
export const CryptoMapSchema = z.record(z.string(), CryptoDetailSchema);
