import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_board_members_email" AS ENUM('ordf@spiik.com', 'viceordf@spiik.com', 'sexmaster@spiik.com', 'vordfuu@spiik.com', 'kassor@spiik.com', 'vkassor@spiik.com', 'sekreterare@spiik.com', 'socialamedier@spiik.com', 'karhus@spiik.com', 'styrelsen@spiik.com');
  CREATE TYPE "public"."enum__board_members_v_version_email" AS ENUM('ordf@spiik.com', 'viceordf@spiik.com', 'sexmaster@spiik.com', 'vordfuu@spiik.com', 'kassor@spiik.com', 'vkassor@spiik.com', 'sekreterare@spiik.com', 'socialamedier@spiik.com', 'karhus@spiik.com', 'styrelsen@spiik.com');
  ALTER TABLE "board_members" ALTER COLUMN "position" SET DATA TYPE text;
  DROP TYPE "public"."enum_board_members_position";
  CREATE TYPE "public"."enum_board_members_position" AS ENUM('Ordförande', 'Vice ordförande', 'Sexmästare', 'SSUA', 'Kassör', 'Vice kassör', 'Sekreterare', 'Informationsansvarig', 'Kårhusansvarig', 'The Big Boss');
  ALTER TABLE "board_members" ALTER COLUMN "position" SET DATA TYPE "public"."enum_board_members_position" USING "position"::"public"."enum_board_members_position";
  ALTER TABLE "_board_members_v" ALTER COLUMN "version_position" SET DATA TYPE text;
  DROP TYPE "public"."enum__board_members_v_version_position";
  CREATE TYPE "public"."enum__board_members_v_version_position" AS ENUM('Ordförande', 'Vice ordförande', 'Sexmästare', 'SSUA', 'Kassör', 'Vice kassör', 'Sekreterare', 'Informationsansvarig', 'Kårhusansvarig', 'The Big Boss');
  ALTER TABLE "_board_members_v" ALTER COLUMN "version_position" SET DATA TYPE "public"."enum__board_members_v_version_position" USING "version_position"::"public"."enum__board_members_v_version_position";
  ALTER TABLE "board_members" ALTER COLUMN "email" SET DATA TYPE "public"."enum_board_members_email" USING "email"::"public"."enum_board_members_email";
  ALTER TABLE "_board_members_v" ALTER COLUMN "version_email" SET DATA TYPE "public"."enum__board_members_v_version_email" USING "version_email"::"public"."enum__board_members_v_version_email";
  ALTER TABLE "media" ADD COLUMN "_key" varchar;
  ALTER TABLE "board_members" ADD COLUMN "studies_id" integer;
  ALTER TABLE "_board_members_v" ADD COLUMN "version_studies_id" integer;
  ALTER TABLE "board_members" ADD CONSTRAINT "board_members_studies_id_programs_id_fk" FOREIGN KEY ("studies_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_board_members_v" ADD CONSTRAINT "_board_members_v_version_studies_id_programs_id_fk" FOREIGN KEY ("version_studies_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "board_members_studies_idx" ON "board_members" USING btree ("studies_id");
  CREATE INDEX "_board_members_v_version_version_studies_idx" ON "_board_members_v" USING btree ("version_studies_id");
  ALTER TABLE "board_members" DROP COLUMN "studies";
  ALTER TABLE "_board_members_v" DROP COLUMN "version_studies";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "board_members" DROP CONSTRAINT "board_members_studies_id_programs_id_fk";
  
  ALTER TABLE "_board_members_v" DROP CONSTRAINT "_board_members_v_version_studies_id_programs_id_fk";
  
  ALTER TABLE "board_members" ALTER COLUMN "position" SET DATA TYPE text;
  DROP TYPE "public"."enum_board_members_position";
  CREATE TYPE "public"."enum_board_members_position" AS ENUM('Ordförande', 'Vice ordförande', 'Kassör', 'Sekreterare', 'Eventansvarig', 'PR-ansvarig', 'Näringslivsansvarig', 'Studierådsansvarig', 'Webbansvarig', 'Ledamot');
  ALTER TABLE "board_members" ALTER COLUMN "position" SET DATA TYPE "public"."enum_board_members_position" USING "position"::"public"."enum_board_members_position";
  ALTER TABLE "_board_members_v" ALTER COLUMN "version_position" SET DATA TYPE text;
  DROP TYPE "public"."enum__board_members_v_version_position";
  CREATE TYPE "public"."enum__board_members_v_version_position" AS ENUM('Ordförande', 'Vice ordförande', 'Kassör', 'Sekreterare', 'Eventansvarig', 'PR-ansvarig', 'Näringslivsansvarig', 'Studierådsansvarig', 'Webbansvarig', 'Ledamot');
  ALTER TABLE "_board_members_v" ALTER COLUMN "version_position" SET DATA TYPE "public"."enum__board_members_v_version_position" USING "version_position"::"public"."enum__board_members_v_version_position";
  DROP INDEX "board_members_studies_idx";
  DROP INDEX "_board_members_v_version_version_studies_idx";
  ALTER TABLE "board_members" ALTER COLUMN "email" SET DATA TYPE varchar;
  ALTER TABLE "_board_members_v" ALTER COLUMN "version_email" SET DATA TYPE varchar;
  ALTER TABLE "board_members" ADD COLUMN "studies" varchar;
  ALTER TABLE "_board_members_v" ADD COLUMN "version_studies" varchar;
  ALTER TABLE "media" DROP COLUMN "_key";
  ALTER TABLE "board_members" DROP COLUMN "studies_id";
  ALTER TABLE "_board_members_v" DROP COLUMN "version_studies_id";
  DROP TYPE "public"."enum_board_members_email";
  DROP TYPE "public"."enum__board_members_v_version_email";`)
}
