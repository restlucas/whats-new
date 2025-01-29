/*
  Warnings:

  - You are about to drop the column `userId` on the `newsedithistory` table. All the data in the column will be lost.
  - Added the required column `teamMemberId` to the `NewsEditHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `newsedithistory` DROP FOREIGN KEY `NewsEditHistory_userId_fkey`;

-- AlterTable
ALTER TABLE `newsedithistory` DROP COLUMN `userId`,
    ADD COLUMN `teamMemberId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `NewsEditHistory` ADD CONSTRAINT `NewsEditHistory_teamMemberId_fkey` FOREIGN KEY (`teamMemberId`) REFERENCES `TeamMember`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
