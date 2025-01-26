/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,slug]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,username,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Comment_id_key` ON `Comment`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Invitation_id_key` ON `Invitation`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `News_id_slug_key` ON `News`(`id`, `slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Team_id_key` ON `Team`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_username_email_key` ON `User`(`id`, `username`, `email`);
