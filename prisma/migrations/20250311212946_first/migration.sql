/*
  Warnings:

  - You are about to drop the column `TypeCurrency` on the `CompensationCurrency` table. All the data in the column will be lost.
  - You are about to drop the column `ProductBrand` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `ProductClassification` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `ProductModel` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `TecnologyId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `TypeProduct` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `TecnologyId` on the `ServicesCPH` table. All the data in the column will be lost.
  - You are about to drop the column `TecnologyId` on the `ServicesCpa` table. All the data in the column will be lost.
  - You are about to drop the `Proyect` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeCurrency` to the `CompensationCurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productBrand` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productClassification` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productModel` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tecnologyId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeProduct` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tecnologyId` to the `ServicesCPH` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tecnologyId` to the `ServicesCpa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Products` DROP FOREIGN KEY `Products_TecnologyId_fkey`;

-- DropForeignKey
ALTER TABLE `Proyect` DROP FOREIGN KEY `Proyect_EmployeeId_fkey`;

-- DropForeignKey
ALTER TABLE `Proyect` DROP FOREIGN KEY `Proyect_ProductsId_fkey`;

-- DropForeignKey
ALTER TABLE `Proyect` DROP FOREIGN KEY `Proyect_TecnologyId_fkey`;

-- DropForeignKey
ALTER TABLE `ServicesCPH` DROP FOREIGN KEY `ServicesCPH_TecnologyId_fkey`;

-- DropForeignKey
ALTER TABLE `ServicesCpa` DROP FOREIGN KEY `ServicesCpa_TecnologyId_fkey`;

-- DropIndex
DROP INDEX `Products_TecnologyId_fkey` ON `Products`;

-- DropIndex
DROP INDEX `ServicesCPH_TecnologyId_fkey` ON `ServicesCPH`;

-- DropIndex
DROP INDEX `ServicesCpa_TecnologyId_fkey` ON `ServicesCpa`;

-- AlterTable
ALTER TABLE `CompensationCurrency` DROP COLUMN `TypeCurrency`,
    ADD COLUMN `typeCurrency` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Products` DROP COLUMN `ProductBrand`,
    DROP COLUMN `ProductClassification`,
    DROP COLUMN `ProductModel`,
    DROP COLUMN `TecnologyId`,
    DROP COLUMN `TypeProduct`,
    ADD COLUMN `productBrand` VARCHAR(191) NOT NULL,
    ADD COLUMN `productClassification` VARCHAR(191) NOT NULL,
    ADD COLUMN `productModel` VARCHAR(191) NOT NULL,
    ADD COLUMN `tecnologyId` INTEGER NOT NULL,
    ADD COLUMN `typeProduct` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ServicesCPH` DROP COLUMN `TecnologyId`,
    ADD COLUMN `tecnologyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ServicesCpa` DROP COLUMN `TecnologyId`,
    ADD COLUMN `tecnologyId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Proyect`;

-- CreateTable
CREATE TABLE `Projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country` ENUM('Colombia', 'Peru', 'Chile', 'Mexico', 'Argentina', 'Uruguay', 'Panama', 'United_States', 'Bolivia', 'Brasil', 'Ecuador', 'Guatemala', 'Honduras', 'Nicaragua', 'Puerto_Rico', 'Saint_Lucia', 'Venezuela') NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `tecnologyId` INTEGER NOT NULL,
    `productsId` INTEGER NOT NULL,
    `typeProject` VARCHAR(191) NOT NULL,
    `costTicked` DOUBLE NOT NULL,
    `currencyType` ENUM('USD', 'COP', 'PEN', 'CLP', 'MXN', 'ARS', 'UYU', 'PAB', 'BRL', 'EUR', 'GTQ', 'HNL', 'NIO', 'XDC', 'VEF') NOT NULL,
    `serviceEnum` ENUM('Planning', 'Desing', 'Implementation', 'Operation', 'Optimization') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServicesCPH` ADD CONSTRAINT `ServicesCPH_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicesCpa` ADD CONSTRAINT `ServicesCpa_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
