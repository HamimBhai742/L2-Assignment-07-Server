-- CreateEnum
CREATE TYPE "public"."Profession" AS ENUM ('digital_marketer', 'full_stack_developer', 'front_end_developer', 'back_end_developer', 'mobile_developer', 'ui_ux_designer', 'product_designer', 'data_analyst', 'data_engineer');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "profession" "public"."Profession" NOT NULL DEFAULT 'full_stack_developer';
