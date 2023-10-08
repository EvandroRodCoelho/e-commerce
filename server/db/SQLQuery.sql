CREATE DATABASE ecommerce;

use ecommerce;

CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Login NVARCHAR(255) NOT NULL,
    Password NVARCHAR(255) NOT NULL
);

-- Adicionando usuários
INSERT INTO Users (Login, Password)
VALUES ('usuario1', 'senha1');

INSERT INTO Users (Login, Password)
VALUES ('usuario2', 'senha2');

INSERT INTO Users (Login, Password)
VALUES ('usuario3', 'senha3');

CREATE TABLE Products (
    Id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    quantity INT NOT NULL
    -- Adicione outros campos conforme necessário
);
INSERT INTO Products (name, description, quantity)
VALUES 
    ('Produto 1', 'Descrição do Produto 1', 10),
    ('Produto 2', 'Descrição do Produto 2', 5),
    ('Produto 3', 'Descrição do Produto 3', 20)