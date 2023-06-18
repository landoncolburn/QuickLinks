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
    "updatedAt" DATETIME NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "groupId" TEXT,
    CONSTRAINT "Card_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Card_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("backgroundColor", "createdAt", "dashboardId", "description", "groupId", "icon", "iconColor", "id", "link", "name", "updatedAt") SELECT "backgroundColor", "createdAt", "dashboardId", "description", "groupId", "icon", "iconColor", "id", "link", "name", "updatedAt" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dashboardId" TEXT NOT NULL,
    CONSTRAINT "Group_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("createdAt", "dashboardId", "id", "name", "updatedAt") SELECT "createdAt", "dashboardId", "id", "name", "updatedAt" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE TABLE "new_Widget" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dashboardId" TEXT NOT NULL,
    CONSTRAINT "Widget_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Widget" ("config", "createdAt", "dashboardId", "id", "name", "type", "updatedAt") SELECT "config", "createdAt", "dashboardId", "id", "name", "type", "updatedAt" FROM "Widget";
DROP TABLE "Widget";
ALTER TABLE "new_Widget" RENAME TO "Widget";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
