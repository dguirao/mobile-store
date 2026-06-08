# MobileStore — Front-End Test

Miniaplicación para la compra de dispositivos móviles desarrollada con Angular 21.

## Requisitos

- Node.js >= 18
- npm >= 10

## Instalación

```bash
npm install
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo en `http://localhost:4200` |
| `npm run build` | Compilación para producción en `/dist` |
| `npm test` | Lanza los tests con Vitest |
| `npm run lint` | Comprobación de código con ESLint |

## Vistas

### PLP — Product List Page
- Listado de productos obtenidos desde el API
- Filtrado en tiempo real por marca y modelo
- Grid responsive: 4 columnas en desktop, adaptativo en móvil
- Navegación al detalle al hacer click en un producto

### PDP — Product Detail Page
- Dos columnas: imagen a la izquierda, detalles a la derecha
- Especificaciones técnicas del producto
- Selector de color y almacenamiento
- Botón para añadir al carrito
- Contador de carrito persistido en `localStorage`

## API

Base URL: `https://itx-frontend-test.onrender.com/api`

| Endpoint | Método | Descripción |
|---|---|---|
| `/product` | GET | Listado de productos |
| `/product/:id` | GET | Detalle de un producto |
| `/cart` | POST | Añadir producto al carrito |

## Caché

Las respuestas del API se cachean en `localStorage` con una expiración de 1 hora. Pasado ese tiempo se revalida la información haciendo una nueva petición al API.

## Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── product-list/
│   │   ├── product-detail/
│   │   └── search-bar/
│   ├── models/
│   │   └── product.ts
│   └── services/
│       ├── product.service.ts
│       └── cart.service.ts
```