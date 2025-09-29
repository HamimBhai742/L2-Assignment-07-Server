-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "about" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "facebookUrl" TEXT,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "linkedInUrl" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "website" TEXT;
