CREATE DATABASE ecommerce;
go
use ecommerce;
go
CREATE TABLE Users
(
    Id INT PRIMARY KEY IDENTITY(1,1),
    Login NVARCHAR(255) NOT NULL,
    Password NVARCHAR(255) NOT NULL
);
go
CREATE TABLE Products
(
    Id INT PRIMARY KEY,
    name NVARCHAR(MAX) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    quantity INT NOT NULL,
    price FLOAT NOT NULL,
    brand NVARCHAR(MAX) NOT NULL,
    technical_specification NVARCHAR(MAX) NOT NULL
);

go

INSERT INTO Users
    (Login, Password)
VALUES
    ('usuario1', 'senha1');
go
INSERT INTO Users
    (Login, Password)
VALUES
    ('usuario2', 'senha2');
go
INSERT INTO Users
    (Login, Password)
VALUES
    ('usuario3', 'senha3');

go
INSERT INTO Products
    (name, description, quantity, price, brand, technical_specification)
VALUES
    ('Produto1', 'Descrição do Produto 1', 10, 50.0, 'Marca A', 'Especificações A'),
    ('Produto2', 'Descrição do Produto 2', 20, 30.0, 'Marca B', 'Especificações B'),
    ('Produto3', 'Descrição do Produto 3', 15, 40.0, 'Marca C', 'Especificações C'),
    ('Produto4', 'Descrição do Produto 4', 25, 20.0, 'Marca D', 'Especificações D'),
    ('Produto5', 'Descrição do Produto 5', 30, 10.0, 'Marca E', 'Especificações E');
go

CREATE TABLE ShoppingCartItems
(
    Id INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
);
go
INSERT INTO ShoppingCartItems
    (UserId, ProductId, Quantity)
VALUES
    (1, 1, 3),
    (1, 1, 2),
    (2, 2, 1);
go
CREATE TABLE OrderItem
(
    Id INT PRIMARY KEY,
    CreatedAt DATETIME NOT NULL,
    TotalPrice FLOAT NOT NULL,
    ShoppingCartItemId INT NOT NULL,
);
