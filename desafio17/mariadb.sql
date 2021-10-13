CREATE SCHEMA `coderhouse`;
CREATE TABLE `coderhouse`.`products` (
  `idproducts` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `price` DOUBLE NOT NULL,
  `thumbnail` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idproducts`)
);
INSERT INTO coderhouse.products(title, price, thumbnail)
VALUES ("calculadora", 2000, "https://cdn3.iconfinder.com/data/icons/start-up-4/44/calculator-512.png"),
("regla", 35, "https://cdn1.iconfinder.com/data/icons/office-and-business-2-2/85/ruler_measure_tool-512.png")