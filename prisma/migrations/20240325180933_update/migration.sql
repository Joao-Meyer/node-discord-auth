-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "login" VARCHAR(150) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "azure_data" (
    "id" SERIAL NOT NULL,
    "indexName" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "blobContainer" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "azure_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "open_ai_model" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "maxTokens" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "open_ai_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_model" (
    "id" SERIAL NOT NULL,
    "deploymentId" TEXT NOT NULL,
    "openAiModelId" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ai_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_config" (
    "id" SERIAL NOT NULL,
    "maxRetries" INTEGER NOT NULL DEFAULT 1,
    "defaultPrompt" TEXT NOT NULL DEFAULT '',
    "nickname" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.7,
    "topP" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "frequencyPenalty" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "presencePenalty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stopSequence" INTEGER,
    "previewMessageIncluded" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "aiModelId" INTEGER NOT NULL,
    "azureDataId" INTEGER,

    CONSTRAINT "ai_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- AddForeignKey
ALTER TABLE "ai_model" ADD CONSTRAINT "ai_model_openAiModelId_fkey" FOREIGN KEY ("openAiModelId") REFERENCES "open_ai_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_config" ADD CONSTRAINT "ai_config_aiModelId_fkey" FOREIGN KEY ("aiModelId") REFERENCES "ai_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_config" ADD CONSTRAINT "ai_config_azureDataId_fkey" FOREIGN KEY ("azureDataId") REFERENCES "azure_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
