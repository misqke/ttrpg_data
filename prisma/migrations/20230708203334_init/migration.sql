-- CreateTable
CREATE TABLE "Ability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tier" INTEGER NOT NULL DEFAULT 1,
    "cost" INTEGER NOT NULL DEFAULT 1,
    "ranks" INTEGER NOT NULL DEFAULT 1,
    "prerequisite" TEXT,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ability_name_key" ON "Ability"("name");
