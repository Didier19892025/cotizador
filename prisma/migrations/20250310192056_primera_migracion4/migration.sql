-- CreateTable
CREATE TABLE `Proyect` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RolesId` INTEGER NOT NULL,
    `Country` ENUM('Colombia', 'Peru', 'Chile', 'Mexico', 'Argentina', 'Uruguay', 'Panama', 'United_States', 'Bolivia', 'Brasil', 'Ecuador', 'Guatemala', 'Honduras', 'Nicaragua', 'Puerto_Rico', 'Saint_Lucia', 'Venezuela') NOT NULL,
    `EmployeeId` INTEGER NOT NULL,
    `TecnologyId` INTEGER NOT NULL,
    `ProductsId` INTEGER NOT NULL,
    `TypeProyect` VARCHAR(191) NOT NULL,
    `CostTicked` DOUBLE NOT NULL,
    `CurrencyType` ENUM('USD', 'COP', 'PEN', 'CLP', 'MXN', 'ARS', 'UYU', 'PAB', 'BRL', 'EUR', 'GTQ', 'HNL', 'NIO', 'XDC', 'VEF') NOT NULL,
    `ServiceEnum` ENUM('Planning', 'Desing', 'Implementation', 'Operation', 'Optimization') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Proyect` ADD CONSTRAINT `Proyect_RolesId_fkey` FOREIGN KEY (`RolesId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proyect` ADD CONSTRAINT `Proyect_EmployeeId_fkey` FOREIGN KEY (`EmployeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proyect` ADD CONSTRAINT `Proyect_TecnologyId_fkey` FOREIGN KEY (`TecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proyect` ADD CONSTRAINT `Proyect_ProductsId_fkey` FOREIGN KEY (`ProductsId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
