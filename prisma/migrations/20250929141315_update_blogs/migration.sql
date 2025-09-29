-- CreateEnum
CREATE TYPE "public"."BlogCategory" AS ENUM ('TECHNOLOGY', 'PROGRAMMING', 'LIFESTYLE', 'TRAVEL', 'FOOD', 'EDUCATION', 'BUSINESS');

-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "category" "public"."BlogCategory" NOT NULL DEFAULT 'TECHNOLOGY';
