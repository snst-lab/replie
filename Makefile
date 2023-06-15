### Makefile for install of develepment environment
#
# install command
# > make install
# ==========================================
# common
# ==========================================
.PHONY: install
install:
	yarn

npm:
	sudo docker-compose exec api yarn

dev:
	sudo docker-compose exec api yarn start:dev 

start:
	sudo docker-compose exec api yarn start

stop:
	sudo killall node

permission:
	sudo chown ubuntu:ubuntu -R nestjs
	
# ==========================================
# front
# ==========================================
front:
	yarn workspace front dev:ssl

front-http:
	yarn workspace front dev

# ==========================================
# nestjs/prisma
# ==========================================
api:
	docker-compose up -d redis
	docker-compose up -d db
	yarn workspace api nest start --debug --watch

kafka: 
	docker-compose up -d zookeeper
	docker-compose up -d kafka
	docker-compose up -d kafka-ui

db:
	docker-compose up -d db
	npx cross-env BROWSER=none yarn prisma studio

build:
	@make schema
	@make migrate
	rm -rf packages/api/dist
	yarn workspace api build
	@make types

schema:
	rm -rf packages/api/@generated/prisma-nestjs-graphql
	yarn workspace api prisma-merge --baseFile prisma/base.prisma --schemaFilePatterns 'prisma/*/*.prisma' --outputFile prisma/schema.prisma
	yarn prisma generate

migrate: 
	yarn prisma migrate dev --name diff --create-only --preview-feature
	yarn prisma migrate deploy --preview-feature

types:
	rm packages/@types/graphql.ts
	yarn graphql-code-generator --config graphql-codegen.yml

db-reset:
	docker-compose up -d db
	yarn prisma db push --accept-data-loss --schema=./packages/api/prisma/_reset.prisma
	yarn prisma db push --accept-data-loss 

# ==========================================
# evm
# ==========================================
chain-%:
	sed -i -e 's/CHAIN.*/CHAIN=${@:chain-%=%}/g' .env

evm:
	yarn workspace evm start

compile:
	yarn workspace evm compile

contract-%:
	yarn workspace evm hardhat deploy --name ${@:contract-%=%}

token-%:
	yarn workspace evm hardhat deploy --type token --name ${@:token-%=%}

evm-init:
	yarn workspace evm vitest run packages/evm/test/deploy
	yarn workspace evm vitest run packages/evm/test/init

gas:
	yarn workspace evm hardhat gasPrice

swap-%:
	yarn workspace evm hardhat swap --name ${@:swap-%=%}

test:
	yarn workspace evm vitest run packages/evm

test-%:
	yarn workspace evm vitest packages/evm/test/${@:test-%=%}

# ==========================================
# local
# ==========================================
upload:
	@scp * nfs:/api

	