/*
  Warnings:

  - The `processus` column on the `Produit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Produit" DROP COLUMN "processus",
ADD COLUMN     "processus" JSONB;
