-- CreateTable
CREATE TABLE "public"."Users" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Courses" (
    "id" TEXT NOT NULL,
    "users_id" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_desc" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sections" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "users_id" TEXT NOT NULL,
    "section_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Assignments" (
    "id" TEXT NOT NULL,
    "courses_id" TEXT NOT NULL,
    "assign_name" TEXT NOT NULL,
    "assign_desc" TEXT NOT NULL,
    "assign_files" BYTEA,
    "due_date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Submissions" (
    "id" TEXT NOT NULL,
    "assign_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "submission_file" BYTEA,
    "submission_desc" TEXT,
    "submission_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comments" (
    "id" TEXT NOT NULL,
    "submission_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_desc" TEXT NOT NULL,
    "comment_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- AddForeignKey
ALTER TABLE "public"."Courses" ADD CONSTRAINT "Courses_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sections" ADD CONSTRAINT "Sections_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sections" ADD CONSTRAINT "Sections_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Assignments" ADD CONSTRAINT "Assignments_courses_id_fkey" FOREIGN KEY ("courses_id") REFERENCES "public"."Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submissions" ADD CONSTRAINT "Submissions_assign_id_fkey" FOREIGN KEY ("assign_id") REFERENCES "public"."Assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submissions" ADD CONSTRAINT "Submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comments" ADD CONSTRAINT "Comments_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "public"."Submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
