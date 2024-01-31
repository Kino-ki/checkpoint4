DROP DATABASE IF EXISTS santalist_db;

CREATE DATABASE IF NOT EXISTS santalist_db;

USE santalist_db;
CREATE TABLE cart
(
  id         INT NOT NULL AUTO_INCREMENT,
  user_id    INT NOT NULL,
  product_id INT NOT NULL,
  quantity  INT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);
CREATE TABLE orders
(
  id         INT NOT NULL AUTO_INCREMENT,
  user_id     INT NOT NULL,
  cart_id    INT NOT NULL,
  product_id    INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE category
(
  id INT NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(80) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE manufacturer
(
  id         INT         NOT NULL AUTO_INCREMENT,
  manuf_name VARCHAR(80) NOT NULL,
  country    VARCHAR(80) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE product
(
  id              INT         NOT NULL AUTO_INCREMENT,
  product_name    VARCHAR(80) NOT NULL,
  price           FLOAT(6,2)  NOT NULL,
  quantity        INT         NOT NULL,
  manufacturer_id INT         NOT NULL COMMENT 'FOREIGN KEY',
  category_id     INT         NOT NULL COMMENT 'FOREIGN KEY',
  PRIMARY KEY (id)
);

CREATE TABLE user
(
  id         INT     NOT NULL AUTO_INCREMENT,
  username   VARCHAR(80) NOT NULL,
  email      VARCHAR(80) NOT NULL UNIQUE,
  hashed_password  VARCHAR(255) NOT NULL,
  firstname  VARCHAR(80) NULL    ,
  lastname   VARCHAR(80) NULL    ,
  adress     VARCHAR(80) NULL    ,
  is_admin       BOOLEAN  NOT NULL DEFAULT 0,
  created_at TIMESTAMP  NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

ALTER TABLE cart
  ADD CONSTRAINT FK_user_TO_cart
    FOREIGN KEY (user_id)
    REFERENCES user (id);

ALTER TABLE cart
  ADD CONSTRAINT FK_product_TO_cart
    FOREIGN KEY (product_id)
    REFERENCES Product (id);

ALTER TABLE orders
  ADD CONSTRAINT FK_user_TO_orders
    FOREIGN KEY (user_id)
    REFERENCES user (id);

ALTER TABLE orders
  ADD CONSTRAINT FK_cart_TO_orders
    FOREIGN KEY (cart_id)
    REFERENCES cart (id);
    
ALTER TABLE orders
  ADD CONSTRAINT FK_product_TO_orders
    FOREIGN KEY (product_id)
    REFERENCES product (id);
    
ALTER TABLE product
  ADD CONSTRAINT FK_manufacturer_TO_product
    FOREIGN KEY (manufacturer_id)
    REFERENCES manufacturer (id);

ALTER TABLE Product
  ADD CONSTRAINT FK_category_TO_product
    FOREIGN KEY (category_id)
    REFERENCES category (id);
