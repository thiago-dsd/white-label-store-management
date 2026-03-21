.PHONY: up down restart logs build run clean db-only

# Start MySQL container
up:
	docker-compose up -d

# Stop MySQL container
down:
	docker-compose down

# Restart MySQL container
restart:
	docker-compose down
	docker-compose up -d

# Show MySQL container logs
logs:
	docker-compose logs -f mysql

# Build the project (skip tests)
build:
	mvnw.cmd clean package -DskipTests

# Run the API
run:
	mvnw.cmd spring-boot:run

# Start everything (MySQL + API)
start: up run

# Stop everything
stop: down

# Clean build artifacts
clean:
	mvnw.cmd clean

# Open Swagger UI in browser
docs:
	start http://localhost:8080/swagger-ui.html
