/*
  Warnings:

  - You are about to alter the column `conceptFondateur` on the `produit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `produit` MODIFY `conceptFondateur` JSON NULL;
