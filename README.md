# replie

This is an AI-based communication support tool

![cap-demo](https://github.com/snst-lab/replie/assets/40202502/e9f14b88-dbd4-447e-b3a3-0c6670329e5a)

<br>

## Feature

### Frontend
> - Nuxt 3
> - Quasar
> - GraphQL Client

### Backend
> - NestJS
> - Fastify
> - GraphQL Server (Mercurius)
> - MariaDB (Docker)

### Web3
> - ganache
> - hardhat

<br>

## Get Started

### 1. Clone this repository.

#### Option 1. SSH

```sh
 $ git clone git@github.com:snst-lab/replie.git
```

#### Option 2. HTTPS

```sh
 $ git clone https://github.com/snst-lab/replie.git
```

### 2. Change directory & branch

```sh
 $ cd replie
 $ git checkout develop
```

### 3. Run command below to install npm modules

```sh
 $ yarn
```

### 4. Setup self-certificate

> Install self-certificate with reference to the following link
>
> https://blog.8bit.co.jp/?p=18445

> Place `localhost.pem` and `localhost-key.pem` files under `certificate` directory

### 5. Copy .env.template to .env

> Fill in the keys of your environment and copy to .env

```sh
 $ cp .env.template .env
```

### 6. Setup `Make for Windows`

> See the following link
>
> https://zenn.dev/genki86web/articles/6e61c167fbe926

### 7. Setup `Altair GraphQL Client`

> Setup from the following link
>
> https://chrome.google.com/webstore/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja?hl=ja



### 8. [Optional] Install VSCode Plugins

> Refer `recommendations` field in `.vscode/extensions.json`

```sh
 $ code --install-extension <extensionId>
```

Example
```sh
 $ code --install-extension esbenp.prettier-vscode
```



<br>

## Usage

### Launch Frontend

> Nuxt server starts on port 3000

```sh
 $ make front
```

### Launch DB

> DB server start on port 3306 and CRUD (prisma studio) starts on port 5555

```sh
 $ make db
```

### Launch Message Queue Server

> Kafka server start on port 29092

```sh
 $ make kafka
```

### Launch API

> Nestjs server start on port 4000

```sh
 $ make api
```


### Generate Schema/Types & DB Migration

> Execute when `packages/api/prisma/** */.prisma` files is edited

```sh
 $ make build
```

### Launch Web3

> Ganache server start on port 8545

```sh
 $ make evm
```

### Deploy Contract

> Must be run`make evm` before
>
> Must be exists solidity source code and its constructor

- `packages/evm/contracts/[Contract Name].sol`

- `packages/evm/contracts/constructor/[Contract Name].ts`

```sh
 $ make contract-[Contract Name]
```

 > Run command below if the contract type is token (ERC20 etc.)

```sh
 $ make token-[Contract Name]
```

### Run Unit Test

> Assuming mainly web3 tests

- `packages/evm/test/*.spec.ts`

```sh
 $ make test
```

> Test filtering

- `packages/evm/test/xxx**.spec.ts`

```sh
 $ make test-xxx
```

<br>

## Requirement

### Node Version

```sh
18.x.x
```

