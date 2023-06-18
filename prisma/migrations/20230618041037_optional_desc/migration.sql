-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "iconColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "groupId" TEXT,
    CONSTRAINT "Card_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Card_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("backgroundColor", "createdAt", "dashboardId", "description", "groupId", "icon", "iconColor", "id", "link", "name", "updatedAt") SELECT "backgroundColor", "createdAt", "dashboardId", "description", "groupId", "icon", "iconColor", "id", "link", "name", "updatedAt" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
