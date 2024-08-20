-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "gender" VARCHAR(10) NOT NULL,
    "name" JSONB NOT NULL,
    "location" JSONB NOT NULL,
    "age" SMALLINT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DailyRecord" (
    "date" DATE NOT NULL,
    "maleCount" INTEGER NOT NULL,
    "femaleCount" INTEGER NOT NULL,
    "maleAvgAge" INTEGER NOT NULL,
    "femaleAvgAge" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyRecord_date_key" ON "DailyRecord"("date");
