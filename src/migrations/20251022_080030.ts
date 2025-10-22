import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "kodkollektivet_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" jsonb,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "kodkollektivet_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"hero_badge" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "statutes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_statutes_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "statutes" CASCADE;
  DROP TABLE "_statutes_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_statutes_fk";
  
  ALTER TABLE "sponsors_page" DROP CONSTRAINT "sponsors_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "statutes_page" DROP CONSTRAINT "statutes_page_hero_image_id_media_id_fk";
  
  DROP INDEX "payload_locked_documents_rels_statutes_id_idx";
  DROP INDEX "sponsors_page_hero_image_idx";
  DROP INDEX "statutes_page_hero_image_idx";
  ALTER TABLE "kodkollektivet_page_sections" ADD CONSTRAINT "kodkollektivet_page_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kodkollektivet_page_sections" ADD CONSTRAINT "kodkollektivet_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kodkollektivet_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kodkollektivet_page" ADD CONSTRAINT "kodkollektivet_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "kodkollektivet_page_sections_order_idx" ON "kodkollektivet_page_sections" USING btree ("_order");
  CREATE INDEX "kodkollektivet_page_sections_parent_id_idx" ON "kodkollektivet_page_sections" USING btree ("_parent_id");
  CREATE INDEX "kodkollektivet_page_sections_image_idx" ON "kodkollektivet_page_sections" USING btree ("image_id");
  CREATE INDEX "kodkollektivet_page_hero_image_idx" ON "kodkollektivet_page" USING btree ("hero_image_id");
  ALTER TABLE "media" DROP COLUMN "_key";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "statutes_id";
  ALTER TABLE "sponsors_page" DROP COLUMN "hero_title";
  ALTER TABLE "sponsors_page" DROP COLUMN "hero_subtitle";
  ALTER TABLE "sponsors_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "sponsors_page" DROP COLUMN "hero_badge";
  ALTER TABLE "statutes_page" DROP COLUMN "hero_title";
  ALTER TABLE "statutes_page" DROP COLUMN "hero_subtitle";
  ALTER TABLE "statutes_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "statutes_page" DROP COLUMN "hero_badge";
  DROP TYPE "public"."enum_statutes_status";
  DROP TYPE "public"."enum__statutes_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_statutes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__statutes_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "statutes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_statutes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_statutes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__statutes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "kodkollektivet_page_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "kodkollektivet_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "kodkollektivet_page_sections" CASCADE;
  DROP TABLE "kodkollektivet_page" CASCADE;
  ALTER TABLE "media" ADD COLUMN "_key" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "statutes_id" integer;
  ALTER TABLE "sponsors_page" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "sponsors_page" ADD COLUMN "hero_subtitle" varchar;
  ALTER TABLE "sponsors_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "sponsors_page" ADD COLUMN "hero_badge" varchar;
  ALTER TABLE "statutes_page" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "statutes_page" ADD COLUMN "hero_subtitle" varchar;
  ALTER TABLE "statutes_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "statutes_page" ADD COLUMN "hero_badge" varchar;
  ALTER TABLE "_statutes_v" ADD CONSTRAINT "_statutes_v_parent_id_statutes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."statutes"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "statutes_updated_at_idx" ON "statutes" USING btree ("updated_at");
  CREATE INDEX "statutes_created_at_idx" ON "statutes" USING btree ("created_at");
  CREATE INDEX "statutes__status_idx" ON "statutes" USING btree ("_status");
  CREATE INDEX "_statutes_v_parent_idx" ON "_statutes_v" USING btree ("parent_id");
  CREATE INDEX "_statutes_v_version_version_updated_at_idx" ON "_statutes_v" USING btree ("version_updated_at");
  CREATE INDEX "_statutes_v_version_version_created_at_idx" ON "_statutes_v" USING btree ("version_created_at");
  CREATE INDEX "_statutes_v_version_version__status_idx" ON "_statutes_v" USING btree ("version__status");
  CREATE INDEX "_statutes_v_created_at_idx" ON "_statutes_v" USING btree ("created_at");
  CREATE INDEX "_statutes_v_updated_at_idx" ON "_statutes_v" USING btree ("updated_at");
  CREATE INDEX "_statutes_v_latest_idx" ON "_statutes_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_statutes_fk" FOREIGN KEY ("statutes_id") REFERENCES "public"."statutes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sponsors_page" ADD CONSTRAINT "sponsors_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "statutes_page" ADD CONSTRAINT "statutes_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_statutes_id_idx" ON "payload_locked_documents_rels" USING btree ("statutes_id");
  CREATE INDEX "sponsors_page_hero_image_idx" ON "sponsors_page" USING btree ("hero_image_id");
  CREATE INDEX "statutes_page_hero_image_idx" ON "statutes_page" USING btree ("hero_image_id");`)
}
