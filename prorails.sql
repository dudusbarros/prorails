-- MySQL Script generated by MySQL Workbench
-- Ter 11 Ago 2015 17:01:40 BRT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema prorails
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `prorails` ;

-- -----------------------------------------------------
-- Schema prorails
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `prorails` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `prorails` ;

-- -----------------------------------------------------
-- Table `prorails`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `prorails`.`user` ;

CREATE TABLE IF NOT EXISTS `prorails`.`user` (
  `_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prorails`.`provider`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `prorails`.`provider` ;

CREATE TABLE IF NOT EXISTS `prorails`.`provider` (
  `_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prorails`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `prorails`.`category` ;

CREATE TABLE IF NOT EXISTS `prorails`.`category` (
  `_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prorails`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `prorails`.`product` ;

CREATE TABLE IF NOT EXISTS `prorails`.`product` (
  `_id` INT NOT NULL AUTO_INCREMENT,
  `provider_id` INT NOT NULL,
  `code` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `category_id` INT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_product_1_idx` (`provider_id` ASC),
  INDEX `fk_product_2_idx` (`category_id` ASC),
  CONSTRAINT `fk_product_1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `prorails`.`provider` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_2`
    FOREIGN KEY (`category_id`)
    REFERENCES `prorails`.`category` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prorails`.`relationship`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `prorails`.`relationship` ;

CREATE TABLE IF NOT EXISTS `prorails`.`relationship` (
  `_id` INT NOT NULL AUTO_INCREMENT,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prorails`.`productRelationship`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `prorails`.`productRelationship` ;

CREATE TABLE IF NOT EXISTS `prorails`.`productRelationship` (
  `_id` INT NOT NULL AUTO_INCREMENT,
  `relationship_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`),
  INDEX `fk_productRelationship_1_idx` (`relationship_id` ASC),
  INDEX `fk_productRelationship_2_idx` (`product_id` ASC),
  CONSTRAINT `fk_productRelationship_1`
    FOREIGN KEY (`relationship_id`)
    REFERENCES `prorails`.`relationship` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productRelationship_2`
    FOREIGN KEY (`product_id`)
    REFERENCES `prorails`.`product` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
