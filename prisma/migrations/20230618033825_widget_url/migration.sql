/*
  Warnings:

  - You are about to drop the column `config` on the `Widget` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Widget` table. All the data in the column will be lost.
  - Added the required column `size` to the `Widget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Widget` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Widget" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "size" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dashboardId" TEXT NOT NULL,
    CONSTRAINT "Widget_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Widget" ("createdAt", "dashboardId", "id", "name", "updatedAt") SELECT "createdAt", "dashboardId", "id", "name", "updatedAt" FROM "Widget";
DROP TABLE "Widget";
ALTER TABLE "new_Widget" RENAME TO "Widget";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
