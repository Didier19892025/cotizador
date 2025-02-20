/*
  Warnings:

  - You are about to alter the column `currency` on the `Roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Roles` MODIFY `currency` ENUM('USD', 'COP', 'PEN', 'CLP', 'MXN', 'ARS', 'UYU', 'PAB', 'BRL', 'EUR', 'GTQ', 'HNL', 'NIO', 'XDC', 'VEF') NOT NULL;
