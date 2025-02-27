-- AlterTable
ALTER TABLE `Users` MODIFY `userName` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `rol` ENUM('admin', 'user') NULL;
