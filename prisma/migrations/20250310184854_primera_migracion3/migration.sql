-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TecnologyId` INTEGER NOT NULL,
    `TypeProduct` VARCHAR(191) NOT NULL,
    `ProductBrand` VARCHAR(191) NOT NULL,
    `ProductModel` VARCHAR(191) NOT NULL,
    `ProductClassification` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_TecnologyId_fkey` FOREIGN KEY (`TecnologyId`) REFERENCES `Tecnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
