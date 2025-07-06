/*
Warnings:

- You are about to drop the `produit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE IF EXISTS `Produit`;

CREATE TABLE `Produit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `livrable` VARCHAR(191) NOT NULL,
    `prix` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `imageHero` VARCHAR(191) NULL,
    `videoUrl` VARCHAR(191) NULL,
    `imageProblemes` VARCHAR(191) NULL,
    `gifSolution` VARCHAR(191) NULL,
    `sousTitre` VARCHAR(191) NULL,
    `conceptFondateur` VARCHAR(191) NULL,
    `cible` VARCHAR(191) NULL,
    `problemeResolu` VARCHAR(191) NULL,
    `niveauPriorite` INTEGER NULL,
    `contenu` VARCHAR(191) NULL,
    `processus` VARCHAR(191) NULL,
    `duree` VARCHAR(191) NULL,
    `prixOriginal` VARCHAR(191) NULL,
    `optionsTarification` JSON NULL,
    `garantie` VARCHAR(191) NULL,
    `conditionsPaiement` VARCHAR(191) NULL,
    `preuves` VARCHAR(191) NULL,
    `temoignages` VARCHAR(191) NULL,
    `resultatsAttendus` VARCHAR(191) NULL,
    `differenciation` VARCHAR(191) NULL,
    `avantagesCompetitifs` VARCHAR(191) NULL,
    `integrationEcosysteme` VARCHAR(191) NULL,
    `entonnoirNaturel` VARCHAR(191) NULL,
    `argumentsCommerciaux` VARCHAR(191) NULL,
    `urgence` VARCHAR(191) NULL,
    `exemplesConcrets` VARCHAR(191) NULL,
    `casPratiques` VARCHAR(191) NULL,
    `livrablesDetailles` VARCHAR(191) NULL,
    `supportsInclus` VARCHAR(191) NULL,
    `faq` JSON NULL,
    `objectionsAnticipees` VARCHAR(191) NULL,
    `statut` VARCHAR(191) NOT NULL DEFAULT 'actif',
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,
    UNIQUE INDEX `Produit_slug_key` (`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE TestResult (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    answers JSON NOT NULL,
    personality VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);