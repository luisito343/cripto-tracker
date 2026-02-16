import { useCryptoStore } from "../../store"
import styles from "./CryptoResult.module.css"

export const CryptoResult = () => {
    const cryptoData = useCryptoStore((state) => state.cryptoData)
    const pairCurrencies = useCryptoStore((state) => state.pairCurrencies)
    const isLoading = useCryptoStore((state) => state.isLoading)

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Cargando cotización...</p>
            </div>
        )
    }

    // Evitamos renderizar si no hay datos cargados aún
    if (!cryptoData.currentPrice) return null;

    const isUp = cryptoData.flag === 'UP';

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.pairTag}>{pairCurrencies}</span>
            </div>

            <div className={styles.mainInfo}>
                <h2 className={styles.price}>
                    ${cryptoData.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
                
                <span className={`${styles.badge} ${isUp ? styles.up : styles.down}`}>
                    {isUp ? '▲' : '▼'} {cryptoData.flag}
                </span>
            </div>

            <div className={styles.gridDetails}>
                <div className={styles.detailItem}>
                    <p>Mínimo (Mes)</p>
                    <span>${cryptoData.lowMonth.toLocaleString()}</span>
                </div>
                <div className={styles.detailItem}>
                    <p>Máximo (Mes)</p>
                    <span>${cryptoData.highMonth.toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}