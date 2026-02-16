# Cripto Tracker

Aplicación web para consultar cotizaciones de criptomonedas frente a distintas monedas fiat.

El usuario selecciona una moneda (USD, MXN, EUR, GBP), elige una criptomoneda del top de mercado y obtiene:

- Precio actual
- Mínimo del mes
- Máximo del mes
- Indicador de tendencia (`UP` / `DOWN`)

# URL para visitar la pagina

https://cryptotrackerlg.netlify.app/

## Demo funcional

Flujo principal:

1. Carga inicial del top 20 de criptomonedas.
2. Selección de par (`CRIPTO-FIAT`).
3. Consulta de cotización en tiempo real.
4. Render de resultado con estado de carga.

## Tecnologías

- React 19
- TypeScript
- Vite
- Zustand (estado global)
- Axios (peticiones HTTP)
- Zod (validación de esquemas)
- CSS Modules

## APIs consumidas

- **Listado de criptomonedas**: CoinGecko (`/coins/markets`)
- **Precio del par**: CoinDesk Data API (`/latest/tick`)

> Nota: este proyecto no requiere variables de entorno para ejecutarse localmente.

## Instalación y ejecución

### Requisitos

- Node.js 18+
- pnpm (recomendado)

### Pasos

```bash
pnpm install
pnpm dev
```

La app quedará disponible en `http://localhost:5173` (puerto por defecto de Vite).

## Scripts disponibles

- `pnpm dev`: levanta servidor de desarrollo.
- `pnpm build`: compila TypeScript y genera build de producción.
- `pnpm preview`: previsualiza el build.
- `pnpm lint`: ejecuta ESLint.

## Estructura del proyecto

```text
src/
  components/
    CriptoSearchForm/   # Formulario de selección de par
    CryptoResult/       # Resultado de cotización
  data/
    index.ts            # Monedas fiat disponibles
  Schema/
    cripto-schema.ts    # Esquemas Zod
  services/
    CriptoService.ts    # Llamadas a APIs externas
  types/
    index.ts            # Tipos TypeScript inferidos con Zod
  store.ts              # Store global con Zustand
  App.tsx               # Orquesta carga inicial y layout principal
```

## Arquitectura resumida

- `App.tsx` dispara `fetchTopCryptos()` al montar.
- `CriptoSearchForm` obtiene criptos del store, valida selección y ejecuta `fecthCurrencyPrice(pair)`.
- `store.ts` centraliza estado, loading y transformación de respuesta API.
- `CryptoResult` muestra spinner durante carga y renderiza datos del par consultado.

## Mejoras futuras sugeridas

- Manejo explícito de errores de red/API en UI.
- Selector de moneda base dinámico para el endpoint de mercado.
- Pruebas unitarias del store y componentes clave.

---

Proyecto creado con fines educativos para práctica de React + TypeScript + manejo de APIs.
