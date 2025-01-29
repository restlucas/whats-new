-- CreateTable
CREATE TABLE `NewsEditHistory` (
    `id` VARCHAR(191) NOT NULL,
    `newsId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `NewsEditHistory_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NewsEditHistory` ADD CONSTRAINT `NewsEditHistory_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `News`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NewsEditHistory` ADD CONSTRAINT `NewsEditHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
