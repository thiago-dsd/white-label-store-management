# 🏪 White Label Store Management

REST API + Frontend for white-label store management, handling customers, products and orders.

### 🎬 Project Overview

[![Project Overview](https://img.youtube.com/vi/ffMVyArDu44/maxresdefault.jpg)](https://youtu.be/ffMVyArDu44)

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| ☕ **Backend** | Java 17 · Spring Boot 3.2.5 · Spring Data JPA · MySQL 8.0 · Swagger UI |
| 🅰️ **Frontend** | Angular 19 · TypeScript · SCSS |
| 🐳 **Infra** | Docker · Docker Compose |

---

## 📋 Requirements

| Tool | Version |
|------|---------|
| [☕ Java](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) | 17+ |
| [📦 Node.js](https://nodejs.org/) | 20+ |
| [🐳 Docker](https://www.docker.com/products/docker-desktop/) | Latest |

---

## 🚀 Getting Started

### 1️⃣ Backend

```bash
cd backend

# Start MySQL database
make up

# Run the API (port 8080)
make run
```

### 2️⃣ Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run the frontend (port 4200)
ng serve
```

### 3️⃣ Access

| Resource | URL |
|----------|-----|
| 🖥️ Frontend | `http://localhost:4200` |
| 📖 Swagger UI | `http://localhost:8080/swagger-ui/index.html` |

---

## ⚡ Makefile Commands

> Run these from the `backend/` directory.

| Command | Description |
|---------|-------------|
| `make up` | 🟢 Start MySQL container |
| `make down` | 🔴 Stop MySQL container |
| `make restart` | 🔄 Restart MySQL container |
| `make run` | ▶️ Run Spring Boot API |
| `make start` | 🚀 Start MySQL + run API |
| `make stop` | ⏹️ Stop everything |
| `make build` | 🔨 Build the project |
| `make docs` | 📖 Open Swagger UI in browser |
| `make logs` | 📋 Show MySQL logs |
| `make clean` | 🧹 Clean build artifacts |

---

## 📁 Project Structure

```
.
├── 📂 backend/
│   ├── 🐳 docker-compose.yml
│   ├── ⚡ Makefile
│   ├── 📦 pom.xml
│   ├── 📂 postman/              # Postman collection
│   └── 📂 src/main/java/com/whitelabel/store/
│       ├── config/               # CORS configuration
│       ├── model/                # JPA entities
│       ├── repository/           # Spring Data repositories
│       └── controller/           # REST controllers
│
├── 📂 frontend/
│   └── 📂 src/app/
│       ├── core/                 # Domain layer
│       │   ├── customer/         #   ├── controller / store / entity / model
│       │   ├── product/          #   ├── controller / store / entity / model
│       │   └── order/            #   └── controller / store / entity / model
│       └── pages/                # UI components
│           ├── customers/
│           ├── products/
│           └── orders/
```

---

## 🗃️ Entities

### 📦 Product

| Field | Type | Description |
|-------|------|-------------|
| `id` | Long | Primary key |
| `nome` | String | Product name |
| `preco` | BigDecimal | Unit price |
| `estoque` | Boolean | In stock |

### 👤 Customer

| Field | Type | Description |
|-------|------|-------------|
| `id` | Long | Primary key |
| `nome` | String | Customer name |
| `clienteDesde` | LocalDate | Registration date |

### 🛒 Order

| Field | Type | Description |
|-------|------|-------------|
| `id` | Long | Primary key |
| `cliente` | Customer | Customer who placed the order |
| `produto` | Product | Purchased product |
| `quantidade` | Integer | Quantity purchased |

---

## 🔌 API Endpoints

### 👤 Customers — `/api/clientes`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/clientes` | ➕ Create customer |
| `GET` | `/api/clientes` | 📋 List all |
| `GET` | `/api/clientes/{id}` | 🔍 Find by ID |
| `PUT` | `/api/clientes/{id}` | ✏️ Update |
| `DELETE` | `/api/clientes/{id}` | 🗑️ Delete |

### 📦 Products — `/api/produtos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/produtos` | ➕ Create product |
| `GET` | `/api/produtos` | 📋 List all |
| `GET` | `/api/produtos/{id}` | 🔍 Find by ID |
| `PUT` | `/api/produtos/{id}` | ✏️ Update |
| `DELETE` | `/api/produtos/{id}` | 🗑️ Delete |

### 🛒 Orders — `/api/pedidos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/pedidos` | ➕ Create order |
| `GET` | `/api/pedidos` | 📋 List all |
| `GET` | `/api/pedidos/{id}` | 🔍 Find by ID |
| `PUT` | `/api/pedidos/{id}` | ✏️ Update |
| `DELETE` | `/api/pedidos/{id}` | 🗑️ Delete |

---

## 📐 Use Case Diagram

```mermaid
flowchart TB
    Actor["🧑 Usuário da API"]

    subgraph CRUD ["Casos de Uso"]
        direction LR
        subgraph Cliente ["👤 Cliente"]
            C1(Criar)
            C2(Listar)
            C3(Consultar por ID)
            C4(Atualizar)
            C5(Deletar)
        end

        subgraph Produto ["📦 Produto"]
            P1(Criar)
            P2(Listar)
            P3(Consultar por ID)
            P4(Atualizar)
            P5(Deletar)
        end

        subgraph Pedido ["🛒 Pedido"]
            O1(Criar)
            O2(Listar)
            O3(Consultar por ID)
            O4(Atualizar)
            O5(Deletar)
        end
    end

    Actor --- CRUD
```

---

## 📬 Postman

A ready-to-import collection is available at `backend/postman/collection.json`.

**To import:** Open Postman → Import → Upload `collection.json`
