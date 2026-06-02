-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "familyUuid" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Family" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_familyUuid_fkey" FOREIGN KEY ("familyUuid") REFERENCES "Family"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
