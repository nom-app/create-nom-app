# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## Displays the help information.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s [main]\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@awk 'BEGIN {FS = ":.*?#\\[Docker] "} /^[a-zA-Z_-]+:.*?#\[Docker\] / {printf "\033[34m%-30s [Docker]\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@awk 'BEGIN {FS = ":.*?#\\[Docs] "} /^[a-zA-Z_-]+:.*?#\[Docs\] / {printf "\033[35m%-30s [Docs]\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@awk 'BEGIN {FS = ":.*?#! "} /^[a-zA-Z_-]+:.*?#! / {printf "\033[31m%-30s [behind-the-scenes]\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Docker Compose Tasks
up: #[Docker] Spin up the project.
	docker-compose up --build

up-detached: #[Docker] Spin up the project in detached mode.
	docker-compose up -d --build


ifeq (reup-packages, $(firstword $(MAKECMDGOALS)))
  REUP_ARGS := $(wordlist 2, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS))
  $(eval $(REUP_ARGS) :;@:)
endif

.PHONY: reup-packages
reup-packages: #! Reupload packages to Verdaccio registry
	./tasks/install-packages.sh $(REUP_ARGS)

recreate: #[Docker] Force recreate the project, and spin up.
	docker-compose up --force-recreate --no-deps --build

down: #[Docker] Shut down the project.
	docker-compose down

restart: #[Docker] Restarts the project.
	@make down
	@make up

docs-local: #[Docs] Build the documentation.
	@echo "Documentation available at \033[1;32mhttp://localhost:3000/\033[0m"
	docker-compose -f docs/docker-compose.yml up

# TODO: Not working properly. Should load source script into shell. This Make
#       script may have to be removed; Add to docs about loading the functions
#       from registry.sh and reminding them to save their original registry
#       configs.
source-registry: # Sources the regsitry
	source ./tasks/registry.sh

render-terminal-recordings: # Renders terminalizer recordings.
	docker-compose --file ./services/termr/docker-compose.yml up --build
