/*
  Warnings:

  - You are about to drop the column `avantagesCompetitifs` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `casPratiques` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `differenciation` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `exemplesConcrets` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `faq` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `imageProblemes` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `integrationEcosysteme` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `livrable` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `objectionsAnticipees` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `optionsTarification` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `preuves` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `problemeResolu` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `resultatsAttendus` on the `Produit` table. All the data in the column will be lost.
  - You are about to alter the column `prix` on the `Produit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `processus` on the `Produit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Text`.
  - You are about to alter the column `personality` on the `TestResult` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/

-- Drop columns only if they exist
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'avantagesCompetitifs') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `avantagesCompetitifs`',
    'SELECT "Column avantagesCompetitifs does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'casPratiques') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `casPratiques`',
    'SELECT "Column casPratiques does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'description') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `description`',
    'SELECT "Column description does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'differenciation') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `differenciation`',
    'SELECT "Column differenciation does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'exemplesConcrets') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `exemplesConcrets`',
    'SELECT "Column exemplesConcrets does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'faq') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `faq`',
    'SELECT "Column faq does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'imageProblemes') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `imageProblemes`',
    'SELECT "Column imageProblemes does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'integrationEcosysteme') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `integrationEcosysteme`',
    'SELECT "Column integrationEcosysteme does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'livrable') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `livrable`',
    'SELECT "Column livrable does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'objectionsAnticipees') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `objectionsAnticipees`',
    'SELECT "Column objectionsAnticipees does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'optionsTarification') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `optionsTarification`',
    'SELECT "Column optionsTarification does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'preuves') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `preuves`',
    'SELECT "Column preuves does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'problemeResolu') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `problemeResolu`',
    'SELECT "Column problemeResolu does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Produit' AND COLUMN_NAME = 'resultatsAttendus') > 0,
    'ALTER TABLE `Produit` DROP COLUMN `resultatsAttendus`',
    'SELECT "Column resultatsAttendus does not exist" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- AlterTable
ALTER TABLE `Produit` 
    ADD COLUMN `QuestionReponse` JSON NULL,
    ADD COLUMN `format` VARCHAR(191) NULL,
    ADD COLUMN `scriptType` VARCHAR(191) NULL,
    ADD COLUMN `testPersonalityMatch` VARCHAR(191) NULL,
    ADD COLUMN `testQuestions` JSON NULL,
    ADD COLUMN `testResultsAggregated` JSON NULL,
    MODIFY `prix` JSON NOT NULL,
    MODIFY `processus` TEXT NULL;

-- AlterTable
ALTER TABLE `TestResult` ADD COLUMN `produitId` INTEGER NULL,
    MODIFY `personality` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `TestResult` ADD CONSTRAINT `TestResult_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
