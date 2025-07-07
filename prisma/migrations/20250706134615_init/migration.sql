/*
  Warnings:

  - You are about to drop the column `avantagesCompetitifs` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `casPratiques` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `differenciation` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `exemplesConcrets` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `faq` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `imageProblemes` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `integrationEcosysteme` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `livrable` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `objectionsAnticipees` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `optionsTarification` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `preuves` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `problemeResolu` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `resultatsAttendus` on the `produit` table. All the data in the column will be lost.
  - You are about to alter the column `prix` on the `produit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `processus` on the `produit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `personality` on the `testresult` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `produit` DROP COLUMN `avantagesCompetitifs`,
    DROP COLUMN `casPratiques`,
    DROP COLUMN `description`,
    DROP COLUMN `differenciation`,
    DROP COLUMN `exemplesConcrets`,
    DROP COLUMN `faq`,
    DROP COLUMN `imageProblemes`,
    DROP COLUMN `integrationEcosysteme`,
    DROP COLUMN `livrable`,
    DROP COLUMN `objectionsAnticipees`,
    DROP COLUMN `optionsTarification`,
    DROP COLUMN `preuves`,
    DROP COLUMN `problemeResolu`,
    DROP COLUMN `resultatsAttendus`,
    ADD COLUMN `QuestionReponse` JSON NULL,
    ADD COLUMN `format` VARCHAR(191) NULL,
    ADD COLUMN `scriptType` VARCHAR(191) NULL,
    ADD COLUMN `testPersonalityMatch` VARCHAR(191) NULL,
    ADD COLUMN `testQuestions` JSON NULL,
    ADD COLUMN `testResultsAggregated` JSON NULL,
    MODIFY `prix` JSON NOT NULL,
    MODIFY `processus` JSON NULL;

-- AlterTable
ALTER TABLE `testresult` ADD COLUMN `produitId` INTEGER NULL,
    MODIFY `personality` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `TestResult` ADD CONSTRAINT `TestResult_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
