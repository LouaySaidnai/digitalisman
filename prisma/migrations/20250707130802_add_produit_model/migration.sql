-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "sousTitre" TEXT,
    "slug" TEXT NOT NULL,
    "prix" JSONB NOT NULL,
    "prixOriginal" TEXT,
    "niveauPriorite" INTEGER,
    "cible" TEXT,
    "conceptFondateur" JSONB,
    "contenu" TEXT,
    "processus" TEXT,
    "duree" TEXT,
    "livrablesDetailles" TEXT,
    "supportsInclus" TEXT,
    "temoignages" TEXT,
    "argumentsCommerciaux" TEXT,
    "imageHero" TEXT,
    "videoUrl" TEXT,
    "gifSolution" TEXT,
    "entonnoirNaturel" TEXT,
    "urgence" TEXT,
    "scriptType" TEXT,
    "format" TEXT,
    "QuestionReponse" JSONB,
    "conditionsPaiement" TEXT,
    "garantie" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'actif',
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "personality" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produitId" INTEGER,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produit_slug_key" ON "Produit"("slug");

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
