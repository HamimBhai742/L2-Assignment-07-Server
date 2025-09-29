-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('completed', 'in_progress', 'planned');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('web', 'api', 'mobile', 'other');

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "liveUrl" TEXT NOT NULL,
    "status" "public"."ProjectStatus" NOT NULL,
    "technologies" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
