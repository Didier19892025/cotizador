-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `latamId` VARCHAR(191) NOT NULL,
    `typeEmployee` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `country` ENUM('Colombia', 'Peru', 'Chile', 'Mexico', 'Argentina', 'Uruguay', 'Panama', 'United_States', 'Bolivia', 'Brasil', 'Ecuador', 'Guatemala', 'Honduras', 'Nicaragua', 'Puerto_Rico', 'Saint_Lucia', 'Venezuela') NOT NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `Employee_email_key`(`email`),
    UNIQUE INDEX `Employee_latamId_key`(`latamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
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
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullNameUser` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('admin', 'user') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicesCPH` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameServiceCph` VARCHAR(191) NOT NULL,
    `costServiceCph` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `tecnologyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicesCpa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameServiceCpa` VARCHAR(191) NOT NULL,
    `costServiceCpa` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `tecnologyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketCpa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameTicked` VARCHAR(191) NOT NULL,
    `costTicked` DOUBLE NOT NULL,
    `TecnologyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tecnology` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameTecnology` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productBrand` VARCHAR(191) NOT NULL,
    `productClassification` VARCHAR(191) NOT NULL,
    `productModel` VARCHAR(191) NOT NULL,
    `tecnologyId` INTEGER NOT NULL,
    `typeProduct` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country` ENUM('Colombia', 'Peru', 'Chile', 'Mexico', 'Argentina', 'Uruguay', 'Panama', 'United_States', 'Bolivia', 'Brasil', 'Ecuador', 'Guatemala', 'Honduras', 'Nicaragua', 'Puerto_Rico', 'Saint_Lucia', 'Venezuela') NOT NULL,
    `typeProject` VARCHAR(191) NOT NULL,
    `costTicked` DOUBLE NOT NULL,
    `currencyType` ENUM('USD', 'COP', 'PEN', 'CLP', 'MXN', 'ARS', 'UYU', 'PAB', 'BRL', 'EUR', 'GTQ', 'HNL', 'NIO', 'XDC', 'VEF') NOT NULL,
    `serviceEnum` ENUM('Planning', 'Desing', 'Implementation', 'Operation', 'Optimization') NOT NULL,
    `roleId` INTEGER NOT NULL,
    `productsId` INTEGER NOT NULL,
    `tecnologyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicesCPH` ADD CONSTRAINT `ServicesCPH_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicesCpa` ADD CONSTRAINT `ServicesCpa_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketCpa` ADD CONSTRAINT `TicketCpa_TecnologyId_fkey` FOREIGN KEY (`TecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_tecnologyId_fkey` FOREIGN KEY (`tecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
