/*
  Warnings:

  - You are about to drop the column `expreience` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "expreience",
ADD COLUMN     "experience" TEXT;
