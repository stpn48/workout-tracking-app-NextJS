-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "age" INTEGER,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);
