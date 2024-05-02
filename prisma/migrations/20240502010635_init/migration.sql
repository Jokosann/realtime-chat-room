-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(10) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "image" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
