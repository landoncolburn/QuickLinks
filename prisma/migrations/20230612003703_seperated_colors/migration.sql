/*
  Warnings:

  - You are about to drop the column `color` on the `Card` table. All the data in the column will be lost.
  - Added the required column `backgroundColor` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconColor` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Card" ("createdAt", "description", "icon", "id", "link", "name", "updatedAt") SELECT "createdAt", "description", "icon", "id", "link", "name", "updatedAt" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
