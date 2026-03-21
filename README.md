# White Label Store Management

REST API + Frontend for white-label store management, handling customers, products and orders.

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.5
- Spring Data JPA
- MySQL 8.0 (via Docker)
- SpringDoc OpenAPI (Swagger UI)

### Frontend
- Angular 19
- TypeScript
- SCSS

## Requirements

- [Java 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Node.js 20+](https://nodejs.org/)
- [Docker](https://www.docker.com/products/docker-desktop/)

## Getting Started

### 1. Backend

```bash
cd backend

# Start MySQL database
make up

# Run the API (port 8080)
make run
```

### 2. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run the frontend (port 4200)
ng serve
```

### 3. Access

| Resource | URL |
|----------|-----|
| Frontend | http://localhost:4200 |
| Swagger UI | http://localhost:8080/swagger-ui.html |

## Makefile Commands (backend)

| Command | Description |
|---------|-------------|
| `make up` | Start MySQL container |
| `make down` | Stop MySQL container |
| `make run` | Run Spring Boot API |
| `make start` | Start MySQL + run API |
| `make build` | Build the project |
| `make docs` | Open Swagger UI in browser |
| `make logs` | Show MySQL logs |
| `make clean` | Clean build artifacts |

## Project Structure

```
.
├── backend/
│   ├── docker-compose.yml
│   ├── Makefile
│   ├── pom.xml
│   └── src/main/java/com/whitelabel/store/
│       ├── config/         # CORS
│       ├── model/          # JPA entities
│       ├── repository/     # Spring Data repositories
│       └── controller/     # REST controllers
├── frontend/
│   └── src/app/
│       ├── core/           # Domain (controller, store, entity, model)
│       │   ├── customer/
│       │   ├── product/
│       │   └── order/
│       └── pages/          # Page components
│           ├── customers/
│           ├── products/
│           └── orders/
```

## Entities

### Product
| Field | Type | Description |
|-------|------|-------------|
| id | Long | Primary key |
| nome | String | Product name |
| preco | BigDecimal | Unit price |
| estoque | Boolean | In stock |

### Customer
| Field | Type | Description |
|-------|------|-------------|
| id | Long | Primary key |
| nome | String | Customer name |
| clienteDesde | LocalDate | Registration date |

### Order
| Field | Type | Description |
|-------|------|-------------|
| id | Long | Primary key |
| cliente | Customer | Customer who placed the order |
| produto | Product | Purchased product |
| quantidade | Integer | Quantity purchased |

## API Endpoints

### Customers (`/api/clientes`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/clientes` | Create customer |
| GET | `/api/clientes` | List all |
| GET | `/api/clientes/{id}` | Find by ID |
| PUT | `/api/clientes/{id}` | Update |
| DELETE | `/api/clientes/{id}` | Delete |

### Products (`/api/produtos`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/produtos` | Create product |
| GET | `/api/produtos` | List all |
| GET | `/api/produtos/{id}` | Find by ID |
| PUT | `/api/produtos/{id}` | Update |
| DELETE | `/api/produtos/{id}` | Delete |

### Orders (`/api/pedidos`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/pedidos` | Create order |
| GET | `/api/pedidos` | List all |
| GET | `/api/pedidos/{id}` | Find by ID |
| PUT | `/api/pedidos/{id}` | Update |
| DELETE | `/api/pedidos/{id}` | Delete |
