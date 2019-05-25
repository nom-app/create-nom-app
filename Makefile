# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## Displays the help information.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s [main]\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@awk 'BEGIN {FS = ":.*?#\[Docker] "} /^[a-zA-Z_-]+:.*?#\[Docker\] / {printf "\033[34m%-30s [Docker]\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@awk 'BEGIN {FS = ":.*?#! "} /^[a-zA-Z_-]+:.*?#! / {printf "\033[31m%-30s [behind-the-scenes]\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Docker Compose Tasks
up: #[Docker] Spin up the project.
	docker-compose up --build

recreate: #[Docker] Force recreate the project, and spin up.
	docker-compose up --force-recreate --no-deps --build

down: #[Docker] Shut down the project.
	docker-compose down

restart: #[Docker] Restarts the project.
	@make down
	@make up
