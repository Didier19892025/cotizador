/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServicesCPH` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `Products` DROP FOREIGN KEY `Products_tecnologyId_fkey`;

-- DropForeignKey
ALTER TABLE `Projects` DROP FOREIGN KEY `Projects_productsId_fkey`;

-- DropForeignKey
ALTER TABLE `Projects` DROP FOREIGN KEY `Projects_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `Projects` DROP FOREIGN KEY `Projects_tecnologyId_fkey`;

-- DropForeignKey
ALTER TABLE `ServicesCPH` DROP FOREIGN KEY `ServicesCPH_tecnologyId_fkey`;

-- DropIndex
DROP INDEX `Employee_roleId_fkey` ON `Employee`;

-- DropTable
DROP TABLE `Products`;

-- DropTable
DROP TABLE `Projects`;

-- DropTable
DROP TABLE `Roles`;

-- DropTable
DROP TABLE `ServicesCPH`;

-- DropTable
DROP TABLE `Users`;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobRole` VARCHAR(191) NOT NULL,
    `country` ENUM('Colombia', 'Peru', 'Chile', 'Mexico', 'Argentina', 'Uruguay', 'Panama', 'United_States', 'Bolivia', 'Brasil', 'Ecuador', 'Guatemala', 'Honduras', 'Nicaragua', 'Puerto_Rico', 'Saint_Lucia', 'Venezuela') NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `cc` VARCHAR(191) NOT NULL,
    `cphCode` VARCHAR(191) NOT NULL,
    `cph` DOUBLE NOT NULL,
    `currency` ENUM('USD', 'COP', 'PEN', 'CLP', 'MXN', 'ARS', 'UYU', 'PAB', 'BRL', 'EUR', 'GTQ', 'HNL', 'NIO', 'XDC', 'VEF') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullNameUser` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('admin', 'user') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceCPH` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameServiceCph` VARCHAR(191) NOT NULL,
    `costServiceCph` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `tecnologyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productBrand` VARCHAR(191) NOT NULL,
    `productClassification` VARCHAR(191) NOT NULL,
    `productModel` VARCHAR(191) NOT NULL,
    `tecnologyId` INTEGER NOT NULL,
    `typeProduct` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country` ENUM('Colombia', 'Peru', 'Chile', 'Mexico', 'Argentina', 'Uruguay', 'Panama', 'United_States', 'Bolivia', 'Brasil', 'Ecuador', 'Guatemala', 'Honduras', 'Nicaragua', 'Puerto_Rico', 'Saint_Lucia', 'Venezuela') NOT NULL,
    `typeProject` VARCHAR(191) NOT NULL,
    `costTicked` DOUBLE NOT NULL,
    `currencyType` ENUM('USD', 'COP', 'PEN', 'CLP', 'MXN', 'ARS', 'UYU', 'PAB', 'BRL', 'EUR', 'GTQ', 'HNL', 'NIO', 'XDC', 'VEF') NOT NULL,
    `serviceEnum` ENUM('Planning', 'Desing', 'Implementation', 'Operation', 'Optimization') NOT NULL,
    `roleId` INTEGER NOT NULL,
    `productsId` INTEGER NOT NULL,
    `tecnologyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceCPH` ADD CONSTRAINT `ServiceCPH_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
