# Nome do Projeto

Um usuário deseja visualizar produtos de um e-commerce e adicionar
alguns desses produtos em seu carrinho de compras, para que então possa
finalizar sua compra e receber seus produtos.

## Requisitos

- Node.js
- Angular CLI
- .NET Core SDK
- SQLServer

## Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone https://github.com/EvandroRodCoelho/e-commerce.git
   ```

2. cd e-commerce

3. Pegue arquivo no e crie as tabelas do arquivo ./server/db/SQLQuery.sql

## Web

1. cd ./web

2. npm install

3. ng generate generate environments ou npx ng generate environments

Vai gerar uma pasta environments, para desenvolvimento você vai alterar o arquivo environment.development.ts

```bash
    import { environmentProps } from "src/types/environment";


    export const environment:environmentProps = {
        production: false,
        apiUrl: 'http://SeuLinkApi/api'
    };
```

Troque ApiUrl para seu link da conexão do servidor
Exemplo:

apiUrl: 'http://localhost:5126/api'

## Server

1. cd ./server

2. dotnet restore

3. No diretório raiz do projeto, crie um arquivo chamado `.env`.
4. Abra o arquivo `.env` e adicione a seguinte linha, substituindo a string de conexão pelo seu próprio valor:

   ```env
   BD_URL="Sua String de Conexão com o Banco de Dados"
   ```

Certifique-se de fornecer a string de conexão correta para o seu banco de dados.

# Executando o Projeto

## Web

1. cd ./web
2. npm run start

## Server

1. cd ./server
2. dotnet run
