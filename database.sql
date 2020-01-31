CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT,
  "hashedpassword" TEXT,
  "admin" BOOLEAN
);

CREATE TABLE "contact_info" (
  "user_id" INT PRIMARY KEY REFERENCES "users"."id",
  "buisiness_name" TEXT,
  "industry_id" INT REFERENCES "industry"."id",
  "region_id" INT REFERENCES "region"."id",
  "phone_number" TEXT
);

CREATE TABLE "industry" (
  "id" SERIAL PRIMARY KEY,
  "industry" TEXT,
  "margin" DECIMAL(4,2)
);

CREATE TABLE "region" (
  "id" SERIAL PRIMARY KEY,
  "region" TEXT
);

CREATE TABLE "revinue_cost" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "users"."id",
  "r_c" TEXT,
  "value" INT,
  "category" TEXT
);

CREATE TABLE "calculators" (
  "id" SERIAL PRIMARY KEY,
  "calculator" TEXT
);

CREATE TABLE "inputs" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "users"."id",
  "question_id" INT REFERENCES "questions"."id",
  "value" INT
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "question" TEXT,
  "response_type" TEXT,
  "help_TEXT" TEXT,
  "sub_questions" BOOLEAN,
  "split" BOOLEAN
);

CREATE TABLE "split" (
  "id" INT,
  "question_id" INT REFERENCES "questions"."id",
  "split_text" TEXT,
  "next" INT
)

CREATE TABLE "sub_questions" (
  "id" SERIAL PRIMARY KEY,
  "question_id" INT REFERENCES "questions"."id",
  "order" INT UNIQUE,
  "question" TEXT,
  "response_type" TEXT,
  "help_text" TEXT
);

CREATE TABLE "question_calculator" (
  "id" SERIAL PRIMARY KEY,
  "calculator_id" INT REFERENCES "calculators"."id",
  "question_id" INT REFERENCES "questions"."id",
  "next" int REFERENCES "question_calculator"."id"
);

INSERT INTO "questions" ("question", "response_type", "help_text", "sub_questiosn", "split")
VALUES ()
(
  'What is your revinue?',
  'number',
  'Revinue is that amount of money you charge for a product or service',
  FALSE,
  FALSE
),
(
  'What are your direct costs?',
  'number',
  'Direct costs are costs that are specific to a sale such as labor costs and material costs',
  TRUE,
  FALSE
),
(
  'What are your indirect costs?',
  'number',
  'Indirect costs are costs that apply to all sales or services such as gas or rent',
  FALSE,
  FALSE
)