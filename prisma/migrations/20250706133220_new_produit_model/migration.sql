-- CreateTable
CREATE TABLE `Produit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `sousTitre` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,
    `prix` JSON NOT NULL,
    `prixOriginal` VARCHAR(191) NULL,
    `niveauPriorite` INTEGER NULL,
    `cible` VARCHAR(191) NULL,
    `conceptFondateur` JSON NULL,
    `contenu` TEXT NULL,
    `processus` TEXT NULL,
    `duree` VARCHAR(191) NULL,
    `livrablesDetailles` TEXT NULL,
    `supportsInclus` VARCHAR(191) NULL,
    `temoignages` VARCHAR(191) NULL,
    `argumentsCommerciaux` VARCHAR(191) NULL,
    `imageHero` VARCHAR(191) NULL,
    `videoUrl` VARCHAR(191) NULL,
    `gifSolution` VARCHAR(191) NULL,
    `entonnoirNaturel` VARCHAR(191) NULL,
    `urgence` VARCHAR(191) NULL,
    `scriptType` VARCHAR(191) NULL,
    `format` VARCHAR(191) NULL,
    `QuestionReponse` JSON NULL,
    `conditionsPaiement` VARCHAR(191) NULL,
    `garantie` VARCHAR(191) NULL,
    `statut` VARCHAR(191) NOT NULL DEFAULT 'actif',
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Produit_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `answers` JSON NOT NULL,
    `personality` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
