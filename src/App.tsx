import { useEffect } from "react";
import { CriptoSearchForm } from "./components/CriptoSearchForm/CriptoSearchForm"
import { useCryptoStore } from "./store"
import { CryptoResult } from "./components/CryptoResult/CryptoResult";


function App() {


  const fetchTopCryptos = useCryptoStore((state) => state.fetchTopCryptos);

  useEffect(() => {
    fetchTopCryptos();
  }, [])

  return (
    <>
      <div className='container'>
        <h1 className="app-title">Cotizador de <span>Criptomonedas</span></h1>
        <div className="content">
          <CriptoSearchForm />

          <CryptoResult />
        </div>
      </div>
    </>
  )
}

export default App
