/*
  Warnings:

  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "password",
ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Authentication" (
    "id" TEXT NOT NULL,
    "users_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
