/*
  Warnings:

  - You are about to drop the `AuthLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AuthLog` DROP FOREIGN KEY `AuthLog_userId_fkey`;

-- DropTable
DROP TABLE `AuthLog`;

-- CreateTable
CREATE TABLE `activity_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NULL,
    `ip` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL DEFAULT 'SUCCESS',

    INDEX `activity_logs_timestamp_idx`(`timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activity_logs` ADD CONSTRAINT `activity_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
