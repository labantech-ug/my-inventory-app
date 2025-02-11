/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Sale` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceBought" REAL NOT NULL,
    "dateAdded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Inventory" ("dateAdded", "id", "itemName", "priceBought", "quantity") SELECT "dateAdded", "id", "itemName", "priceBought", "quantity" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
CREATE TABLE "new_Sale" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceBought" REAL NOT NULL,
    "priceSold" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remainingStock" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sale" ("date", "id", "itemName", "priceBought", "priceSold", "quantity", "remainingStock", "userId") SELECT "date", "id", "itemName", "priceBought", "priceSold", "quantity", "remainingStock", "userId" FROM "Sale";
DROP TABLE "Sale";
ALTER TABLE "new_Sale" RENAME TO "Sale";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
