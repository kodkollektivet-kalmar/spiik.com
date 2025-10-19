import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_board_members_position" AS ENUM('Ordförande', 'Vice ordförande', 'Kassör', 'Sekreterare', 'Eventansvarig', 'PR-ansvarig', 'Näringslivsansvarig', 'Studierådsansvarig', 'Webbansvarig', 'Ledamot');
  CREATE TYPE "public"."enum_board_members_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__board_members_v_version_position" AS ENUM('Ordförande', 'Vice ordförande', 'Kassör', 'Sekreterare', 'Eventansvarig', 'PR-ansvarig', 'Näringslivsansvarig', 'Studierådsansvarig', 'Webbansvarig', 'Ledamot');
  CREATE TYPE "public"."enum__board_members_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_statutes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__statutes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_programs_degree" AS ENUM('Kandidatexamen', 'Master', 'Högskoleexamen');
  CREATE TYPE "public"."enum_programs_color" AS ENUM('#FDE300', '#FF6A00', '#E43222', '#e7f0ff', '#ffe8e5', '#ecfff3', '#fff6cc', '#ffffff', '#f3f4f6');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('instagram', 'facebook', 'tiktok', 'linkedin', 'youtube', 'spotify', 'discord', 'web');
  CREATE TYPE "public"."enum_introduction_page_membership_tiers_prices_years" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_introduction_page_membership_tiers_gradient" AS ENUM('from-[#FFF4DE] via-white to-[#FFE6C8]', 'from-[#EAE9FF] via-white to-[#D9F1FF]', 'from-[#FFE8E8] via-white to-[#FFE0E0]', 'from-[#E8F5E8] via-white to-[#E0F0E0]');
  CREATE TYPE "public"."enum_membership_page_membership_tiers_prices_years" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_membership_page_membership_tiers_gradient" AS ENUM('from-[#FFF4DE] via-white to-[#FFE6C8]', 'from-[#EAE9FF] via-white to-[#D9F1FF]', 'from-[#FFE8E8] via-white to-[#FFE0E0]', 'from-[#E8F5E8] via-white to-[#E0F0E0]');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "board_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"email" varchar,
  	"position" "enum_board_members_position",
  	"studies" varchar,
  	"message" varchar,
  	"quote" varchar,
  	"merit" varchar,
  	"favorite_game" varchar,
  	"image_id" integer,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_board_members_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_board_members_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_email" varchar,
  	"version_position" "enum__board_members_v_version_position",
  	"version_studies" varchar,
  	"version_message" varchar,
  	"version_quote" varchar,
  	"version_merit" varchar,
  	"version_favorite_game" varchar,
  	"version_image_id" integer,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__board_members_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
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
  
  CREATE TABLE "programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"degree" "enum_programs_degree",
  	"description" varchar,
  	"url" varchar NOT NULL,
  	"color" "enum_programs_color" DEFAULT '#FDE300',
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"board_members_id" integer,
  	"statutes_id" integer,
  	"programs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation_main" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform" NOT NULL,
  	"label" varchar,
  	"url" varchar NOT NULL,
  	"username" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"logo_id" integer,
  	"contact_email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "board_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" jsonb,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "board_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"hero_badge" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "introduction_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" jsonb,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "introduction_page_membership_tiers_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"years" "enum_introduction_page_membership_tiers_prices_years" NOT NULL,
  	"amount" varchar NOT NULL
  );
  
  CREATE TABLE "introduction_page_membership_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"gradient" "enum_introduction_page_membership_tiers_gradient" DEFAULT 'from-[#FFF4DE] via-white to-[#FFE6C8]'
  );
  
  CREATE TABLE "introduction_page_carousel_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "introduction_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"hero_badge" varchar,
  	"membership_link" varchar,
  	"membership_link_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "housing_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" jsonb,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "housing_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"hero_badge" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "membership_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" jsonb,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "membership_page_membership_tiers_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"years" "enum_membership_page_membership_tiers_prices_years" NOT NULL,
  	"amount" varchar NOT NULL
  );
  
  CREATE TABLE "membership_page_membership_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"gradient" "enum_membership_page_membership_tiers_gradient" DEFAULT 'from-[#FFF4DE] via-white to-[#FFE6C8]'
  );
  
  CREATE TABLE "membership_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"hero_badge" varchar,
  	"membership_link" varchar,
  	"membership_link_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "sponsors_page_sponsors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"website" varchar
  );
  
  CREATE TABLE "sponsors_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"hero_badge" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "statutes_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"hero_badge" varchar,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "board_members" ADD CONSTRAINT "board_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_board_members_v" ADD CONSTRAINT "_board_members_v_parent_id_board_members_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."board_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_board_members_v" ADD CONSTRAINT "_board_members_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_statutes_v" ADD CONSTRAINT "_statutes_v_parent_id_statutes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."statutes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_board_members_fk" FOREIGN KEY ("board_members_id") REFERENCES "public"."board_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_statutes_fk" FOREIGN KEY ("statutes_id") REFERENCES "public"."statutes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_main" ADD CONSTRAINT "navigation_main_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer" ADD CONSTRAINT "navigation_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "board_page_sections" ADD CONSTRAINT "board_page_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "board_page_sections" ADD CONSTRAINT "board_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."board_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "board_page" ADD CONSTRAINT "board_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "introduction_page_sections" ADD CONSTRAINT "introduction_page_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "introduction_page_sections" ADD CONSTRAINT "introduction_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."introduction_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "introduction_page_membership_tiers_prices" ADD CONSTRAINT "introduction_page_membership_tiers_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."introduction_page_membership_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "introduction_page_membership_tiers" ADD CONSTRAINT "introduction_page_membership_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."introduction_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "introduction_page_carousel_images" ADD CONSTRAINT "introduction_page_carousel_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "introduction_page_carousel_images" ADD CONSTRAINT "introduction_page_carousel_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."introduction_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "introduction_page" ADD CONSTRAINT "introduction_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "housing_page_sections" ADD CONSTRAINT "housing_page_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "housing_page_sections" ADD CONSTRAINT "housing_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."housing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "housing_page" ADD CONSTRAINT "housing_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "membership_page_sections" ADD CONSTRAINT "membership_page_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "membership_page_sections" ADD CONSTRAINT "membership_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."membership_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "membership_page_membership_tiers_prices" ADD CONSTRAINT "membership_page_membership_tiers_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."membership_page_membership_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "membership_page_membership_tiers" ADD CONSTRAINT "membership_page_membership_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."membership_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "membership_page" ADD CONSTRAINT "membership_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsors_page_sponsors" ADD CONSTRAINT "sponsors_page_sponsors_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsors_page_sponsors" ADD CONSTRAINT "sponsors_page_sponsors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sponsors_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sponsors_page" ADD CONSTRAINT "sponsors_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "statutes_page" ADD CONSTRAINT "statutes_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "board_members_image_idx" ON "board_members" USING btree ("image_id");
  CREATE INDEX "board_members_updated_at_idx" ON "board_members" USING btree ("updated_at");
  CREATE INDEX "board_members_created_at_idx" ON "board_members" USING btree ("created_at");
  CREATE INDEX "board_members__status_idx" ON "board_members" USING btree ("_status");
  CREATE INDEX "_board_members_v_parent_idx" ON "_board_members_v" USING btree ("parent_id");
  CREATE INDEX "_board_members_v_version_version_image_idx" ON "_board_members_v" USING btree ("version_image_id");
  CREATE INDEX "_board_members_v_version_version_updated_at_idx" ON "_board_members_v" USING btree ("version_updated_at");
  CREATE INDEX "_board_members_v_version_version_created_at_idx" ON "_board_members_v" USING btree ("version_created_at");
  CREATE INDEX "_board_members_v_version_version__status_idx" ON "_board_members_v" USING btree ("version__status");
  CREATE INDEX "_board_members_v_created_at_idx" ON "_board_members_v" USING btree ("created_at");
  CREATE INDEX "_board_members_v_updated_at_idx" ON "_board_members_v" USING btree ("updated_at");
  CREATE INDEX "_board_members_v_latest_idx" ON "_board_members_v" USING btree ("latest");
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
  CREATE INDEX "programs_updated_at_idx" ON "programs" USING btree ("updated_at");
  CREATE INDEX "programs_created_at_idx" ON "programs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_board_members_id_idx" ON "payload_locked_documents_rels" USING btree ("board_members_id");
  CREATE INDEX "payload_locked_documents_rels_statutes_id_idx" ON "payload_locked_documents_rels" USING btree ("statutes_id");
  CREATE INDEX "payload_locked_documents_rels_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("programs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_main_order_idx" ON "navigation_main" USING btree ("_order");
  CREATE INDEX "navigation_main_parent_id_idx" ON "navigation_main" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_order_idx" ON "navigation_footer" USING btree ("_order");
  CREATE INDEX "navigation_footer_parent_id_idx" ON "navigation_footer" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "board_page_sections_order_idx" ON "board_page_sections" USING btree ("_order");
  CREATE INDEX "board_page_sections_parent_id_idx" ON "board_page_sections" USING btree ("_parent_id");
  CREATE INDEX "board_page_sections_image_idx" ON "board_page_sections" USING btree ("image_id");
  CREATE INDEX "board_page_hero_image_idx" ON "board_page" USING btree ("hero_image_id");
  CREATE INDEX "introduction_page_sections_order_idx" ON "introduction_page_sections" USING btree ("_order");
  CREATE INDEX "introduction_page_sections_parent_id_idx" ON "introduction_page_sections" USING btree ("_parent_id");
  CREATE INDEX "introduction_page_sections_image_idx" ON "introduction_page_sections" USING btree ("image_id");
  CREATE INDEX "introduction_page_membership_tiers_prices_order_idx" ON "introduction_page_membership_tiers_prices" USING btree ("_order");
  CREATE INDEX "introduction_page_membership_tiers_prices_parent_id_idx" ON "introduction_page_membership_tiers_prices" USING btree ("_parent_id");
  CREATE INDEX "introduction_page_membership_tiers_order_idx" ON "introduction_page_membership_tiers" USING btree ("_order");
  CREATE INDEX "introduction_page_membership_tiers_parent_id_idx" ON "introduction_page_membership_tiers" USING btree ("_parent_id");
  CREATE INDEX "introduction_page_carousel_images_order_idx" ON "introduction_page_carousel_images" USING btree ("_order");
  CREATE INDEX "introduction_page_carousel_images_parent_id_idx" ON "introduction_page_carousel_images" USING btree ("_parent_id");
  CREATE INDEX "introduction_page_carousel_images_image_idx" ON "introduction_page_carousel_images" USING btree ("image_id");
  CREATE INDEX "introduction_page_hero_image_idx" ON "introduction_page" USING btree ("hero_image_id");
  CREATE INDEX "housing_page_sections_order_idx" ON "housing_page_sections" USING btree ("_order");
  CREATE INDEX "housing_page_sections_parent_id_idx" ON "housing_page_sections" USING btree ("_parent_id");
  CREATE INDEX "housing_page_sections_image_idx" ON "housing_page_sections" USING btree ("image_id");
  CREATE INDEX "housing_page_hero_image_idx" ON "housing_page" USING btree ("hero_image_id");
  CREATE INDEX "membership_page_sections_order_idx" ON "membership_page_sections" USING btree ("_order");
  CREATE INDEX "membership_page_sections_parent_id_idx" ON "membership_page_sections" USING btree ("_parent_id");
  CREATE INDEX "membership_page_sections_image_idx" ON "membership_page_sections" USING btree ("image_id");
  CREATE INDEX "membership_page_membership_tiers_prices_order_idx" ON "membership_page_membership_tiers_prices" USING btree ("_order");
  CREATE INDEX "membership_page_membership_tiers_prices_parent_id_idx" ON "membership_page_membership_tiers_prices" USING btree ("_parent_id");
  CREATE INDEX "membership_page_membership_tiers_order_idx" ON "membership_page_membership_tiers" USING btree ("_order");
  CREATE INDEX "membership_page_membership_tiers_parent_id_idx" ON "membership_page_membership_tiers" USING btree ("_parent_id");
  CREATE INDEX "membership_page_hero_image_idx" ON "membership_page" USING btree ("hero_image_id");
  CREATE INDEX "sponsors_page_sponsors_order_idx" ON "sponsors_page_sponsors" USING btree ("_order");
  CREATE INDEX "sponsors_page_sponsors_parent_id_idx" ON "sponsors_page_sponsors" USING btree ("_parent_id");
  CREATE INDEX "sponsors_page_sponsors_logo_idx" ON "sponsors_page_sponsors" USING btree ("logo_id");
  CREATE INDEX "sponsors_page_hero_image_idx" ON "sponsors_page" USING btree ("hero_image_id");
  CREATE INDEX "statutes_page_hero_image_idx" ON "statutes_page" USING btree ("hero_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "board_members" CASCADE;
  DROP TABLE "_board_members_v" CASCADE;
  DROP TABLE "statutes" CASCADE;
  DROP TABLE "_statutes_v" CASCADE;
  DROP TABLE "programs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "navigation_main" CASCADE;
  DROP TABLE "navigation_footer" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "board_page_sections" CASCADE;
  DROP TABLE "board_page" CASCADE;
  DROP TABLE "introduction_page_sections" CASCADE;
  DROP TABLE "introduction_page_membership_tiers_prices" CASCADE;
  DROP TABLE "introduction_page_membership_tiers" CASCADE;
  DROP TABLE "introduction_page_carousel_images" CASCADE;
  DROP TABLE "introduction_page" CASCADE;
  DROP TABLE "housing_page_sections" CASCADE;
  DROP TABLE "housing_page" CASCADE;
  DROP TABLE "membership_page_sections" CASCADE;
  DROP TABLE "membership_page_membership_tiers_prices" CASCADE;
  DROP TABLE "membership_page_membership_tiers" CASCADE;
  DROP TABLE "membership_page" CASCADE;
  DROP TABLE "sponsors_page_sponsors" CASCADE;
  DROP TABLE "sponsors_page" CASCADE;
  DROP TABLE "statutes_page" CASCADE;
  DROP TYPE "public"."enum_board_members_position";
  DROP TYPE "public"."enum_board_members_status";
  DROP TYPE "public"."enum__board_members_v_version_position";
  DROP TYPE "public"."enum__board_members_v_version_status";
  DROP TYPE "public"."enum_statutes_status";
  DROP TYPE "public"."enum__statutes_v_version_status";
  DROP TYPE "public"."enum_programs_degree";
  DROP TYPE "public"."enum_programs_color";
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  DROP TYPE "public"."enum_introduction_page_membership_tiers_prices_years";
  DROP TYPE "public"."enum_introduction_page_membership_tiers_gradient";
  DROP TYPE "public"."enum_membership_page_membership_tiers_prices_years";
  DROP TYPE "public"."enum_membership_page_membership_tiers_gradient";`)
}
