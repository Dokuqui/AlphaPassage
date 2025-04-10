SHELL := /bin/bash

# Install dependencies
install:
	cd ui && npm install
	cd back && ./mvnw dependency:resolve

# Build both frontend and backend
build:
	cd ui && npm run build
	cd back && ./mvnw clean install

# Start frontend and backend
start-ui:
	cd ui && npm start

start-back:
	cd back && ./mvnw spring-boot:run

# Clean both projects
clean:
	cd ui && npm run clean || true
	cd back && ./mvnw clean

# Future: Docker support
docker-build:
	docker compose build

docker-up:
	docker compose up

docker-down:
	docker compose down

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@echo "  help           Show this help message"
	@echo "  install        Install dependencies for UI and Backend"
	@echo "  build          Build UI and Backend projects"
	@echo "  start-ui       Start the Angular frontend"
	@echo "  start-back     Start the Spring Boot backend"
	@echo "  clean          Clean build artifacts"
	@echo "  docker-build   Build Docker images (future use)"
	@echo "  docker-up      Start containers (future use)"
	@echo "  docker-down    Stop containers (future use)"