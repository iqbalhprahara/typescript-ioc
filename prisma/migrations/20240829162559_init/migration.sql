-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "user" (
    "uuid" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "nat" VARCHAR(25) NOT NULL,
    "age" INTEGER NOT NULL,
    "dob" DATE NOT NULL,
    "phone" VARCHAR(100) NOT NULL,
    "cell" VARCHAR(100) NOT NULL,
    "picture" JSONB NOT NULL,
    "id" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "user_location" (
    "user_uuid" VARCHAR(255) NOT NULL,
    "country_uuid" VARCHAR(255) NOT NULL,
    "city_uuid" VARCHAR(255) NOT NULL,
    "postcode" VARCHAR(50) NOT NULL,
    "street_number" VARCHAR(50) NOT NULL,
    "street_name" TEXT NOT NULL,
    "coordinates" JSONB NOT NULL,
    "timezone" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "user_location_pkey" PRIMARY KEY ("user_uuid")
);

-- CreateTable
CREATE TABLE "m_country" (
    "uuid" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "m_country_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "m_city" (
    "uuid" VARCHAR(255) NOT NULL,
    "country_uuid" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "m_city_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "m_country_name_key" ON "m_country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "m_city_country_uuid_name_key" ON "m_city"("country_uuid", "name");

-- AddForeignKey
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_country_uuid_fkey" FOREIGN KEY ("country_uuid") REFERENCES "m_country"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_city_uuid_fkey" FOREIGN KEY ("city_uuid") REFERENCES "m_city"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_city" ADD CONSTRAINT "m_city_country_uuid_fkey" FOREIGN KEY ("country_uuid") REFERENCES "m_country"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
