-- CreateEnum
CREATE TYPE "public"."BlogStatus" AS ENUM ('published', 'draft');

-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "status" "public"."BlogStatus" NOT NULL DEFAULT 'published';
