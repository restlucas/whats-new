/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CommentLike_userId_commentId_key` ON `CommentLike`(`userId`, `commentId`);
