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
  "order" INT,
  "question" TEXT,
  "response_type" TEXT,
  "help_text" TEXT,
  "sub_questions" BOOLEAN
);

CREATE TABLE "sub_questions" (
  "id" SERIAL PRIMARY KEY,
  "question_id" INT REFERENCES "questions"."id",
  "order" INT UNIQUE,
  "question" TEXT,
  "response_type" TEXT,
  "help_text" TEXT,
);

CREATE TABLE "question_calculator" (
  "question_id" INT REFERENCES "questions"."id",
  "calculator_id" INT REFERENCES "calculators"."id",
  PRIMARY KEY ("question_id", "calculator_id")
);

INSERT INTO "calculators" ("calculator") 
VALUES ('Define Your Profit Lever'),
('Break Even Point'),
('Price Setting');

INSERT INTO "questions" ("order", "question", "response_type", "help_text", "sub_questiosn")
VALUES (
  1,
  'What is your revinue?',
  'number',
  'Revinue is that amount of money you charge for a product or service',
  FALSE
),
(
  2,
  'What are your direct costs?',
  'number',
  'Direct costs are costs that are specific to a sale such as labor costs and material costs',
  TRUE
),
(
  3,
  'What are your indirect costs?',
  'number',
  'Indirect costs are costs that apply to all sales or services such as gas or rent',
  FALSE
)