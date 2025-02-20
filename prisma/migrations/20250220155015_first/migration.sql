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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompensationCurrency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ammoutFx` DOUBLE NOT NULL,
    `TypeCurrency` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `CompensationCurrency_roleId_key`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('admin', 'user') NOT NULL,

    UNIQUE INDEX `Users_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `latamId` INTEGER NOT NULL,
    `typeEmployee` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Employee_email_key`(`email`),
    UNIQUE INDEX `Employee_latamId_key`(`latamId`),
    UNIQUE INDEX `Employee_roleId_key`(`roleId`),
    UNIQUE INDEX `Employee_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicesCPH` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameServiceCph` VARCHAR(191) NOT NULL,
    `costServiceCph` DOUBLE NOT NULL,
    `TecnologyId` INTEGER NOT NULL,

    INDEX `ServicesCPH_TecnologyId_fkey`(`TecnologyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicesCpa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameServiceCpa` VARCHAR(191) NOT NULL,
    `costServiceCpa` DOUBLE NOT NULL,
    `TecnologyId` INTEGER NOT NULL,

    INDEX `ServicesCpa_TecnologyId_fkey`(`TecnologyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketCpa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameTicked` VARCHAR(191) NOT NULL,
    `costTicked` DOUBLE NOT NULL,
    `TecnologyId` INTEGER NOT NULL,

    INDEX `TicketCpa_TecnologyId_fkey`(`TecnologyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tecnology` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameTecnology` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CompensationCurrency` ADD CONSTRAINT `CompensationCurrency_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicesCPH` ADD CONSTRAINT `ServicesCPH_TecnologyId_fkey` FOREIGN KEY (`TecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicesCpa` ADD CONSTRAINT `ServicesCpa_TecnologyId_fkey` FOREIGN KEY (`TecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketCpa` ADD CONSTRAINT `TicketCpa_TecnologyId_fkey` FOREIGN KEY (`TecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
