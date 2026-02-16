import styles from './CriptoSearchForm.module.css'
import { currencies } from '../../data';
import { useCryptoStore } from '../../store';
import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import type { Pair } from '../../types';


export const CriptoSearchForm = () => {

    const criptoCurrecnies = useCryptoStore((state) => state.criptoCurrecnies)
    const fecthCurrencyPrice = useCryptoStore((state) => state.fecthCurrencyPrice)
    const [pair, setPair] = useState<Pair>({
        currency: '',
        criptoCurrency: ''
    })

    const [error, setError] = useState<string>('')


    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPair((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(pair).includes('')) {
            setError('Por favor, seleccione una moneda y una criptomoneda');
            return;
        }
        setError('');
        fecthCurrencyPrice(pair);
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.field}>
                <label htmlFor="currency">Moneda</label>
                <select
                    name="currency"
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency}
                >
                    <option value="">Seleccione una moneda</option>
                    {currencies.map((currency) => (
                        <option
                            key={currency.code}
                            value={currency.code}
                        >
                            {currency.name} ({currency.code})
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="criptoCurrency">Criptomoneda</label>
                <select
                    name="criptoCurrency"
                    id="criptoCurrency"
                    onChange={handleChange}
                    value={pair.criptoCurrency}
                >
                    <option value="">Seleccione una cripto</option>
                    {criptoCurrecnies.map(crypto => (
                        <option
                            key={crypto.symbol.toUpperCase()}
                            value={crypto.symbol.toUpperCase()}

                        >
                            {crypto.name} ({crypto.symbol.toUpperCase()})
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className={styles.button}>
                Consultar Cotización
            </button>
        </form>
    )
}
