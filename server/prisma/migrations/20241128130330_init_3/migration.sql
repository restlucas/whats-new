/*
  Warnings:

  - You are about to alter the column `role` on the `teammember` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `teammember` MODIFY `role` ENUM('READER', 'EDITOR', 'OWNER') NOT NULL DEFAULT 'READER';
