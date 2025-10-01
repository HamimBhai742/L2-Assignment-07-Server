/*
  Warnings:

  - The values [TECHNOLOGY,PROGRAMMING,LIFESTYLE,TRAVEL,FOOD,EDUCATION,BUSINESS] on the enum `BlogCategory` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."BlogCategory_new" AS ENUM ('Technology', 'Web_Development', 'Programming', 'Lifestyle', 'Travel', 'Photography', 'Food', 'Education', 'Business');
ALTER TABLE "public"."Blog" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "public"."Blog" ALTER COLUMN "category" TYPE "public"."BlogCategory_new" USING ("category"::text::"public"."BlogCategory_new");
ALTER TYPE "public"."BlogCategory" RENAME TO "BlogCategory_old";
ALTER TYPE "public"."BlogCategory_new" RENAME TO "BlogCategory";
DROP TYPE "public"."BlogCategory_old";
ALTER TABLE "public"."Blog" ALTER COLUMN "category" SET DEFAULT 'Web_Development';
COMMIT;

-- DropIndex
DROP INDEX "public"."Blog_title_key";

-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "category" SET DEFAULT 'Web_Development';

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "public"."Blog"("slug");
