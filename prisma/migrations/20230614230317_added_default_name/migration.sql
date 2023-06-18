-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dashboard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'New Dashboard',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Dashboard" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Dashboard";
DROP TABLE "Dashboard";
ALTER TABLE "new_Dashboard" RENAME TO "Dashboard";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
