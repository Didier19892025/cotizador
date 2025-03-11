/*
  Warnings:

  - You are about to drop the column `RolesId` on the `Proyect` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Proyect` DROP FOREIGN KEY `Proyect_RolesId_fkey`;

-- DropIndex
DROP INDEX `Proyect_RolesId_fkey` ON `Proyect`;

-- AlterTable
ALTER TABLE `Proyect` DROP COLUMN `RolesId`;
